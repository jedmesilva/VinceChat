import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const vaults = pgTable("vaults", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  itemAmount: integer("item_amount").notNull(),
  isLocked: boolean("is_locked").notNull().default(true),
  attempts: integer("attempts").notNull().default(0),
  winners: integer("winners").notNull().default(0),
  difficulty: text("difficulty", { enum: ["easy", "medium", "hard", "legendary"] }).notNull(),
  lastActivity: text("last_activity"),
  isNew: boolean("is_new").notNull().default(false),
  isPopular: boolean("is_popular").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertVaultSchema = createInsertSchema(vaults).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertVault = z.infer<typeof insertVaultSchema>;
export type Vault = typeof vaults.$inferSelect;
