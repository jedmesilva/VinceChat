import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertVaultSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all vaults
  app.get("/api/vaults", async (req, res) => {
    try {
      const vaults = await storage.getAllVaults();
      res.json(vaults);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar cofres" });
    }
  });

  // Get single vault
  app.get("/api/vaults/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
      }

      const vault = await storage.getVault(id);
      if (!vault) {
        return res.status(404).json({ message: "Cofre não encontrado" });
      }

      res.json(vault);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar cofre" });
    }
  });

  // Create new vault
  app.post("/api/vaults", async (req, res) => {
    try {
      const validatedData = insertVaultSchema.parse(req.body);
      const vault = await storage.createVault(validatedData);
      res.status(201).json(vault);
    } catch (error) {
      res.status(400).json({ message: "Dados inválidos para criação do cofre" });
    }
  });

  // Update vault (for attempts, etc.)
  app.patch("/api/vaults/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
      }

      const updates = insertVaultSchema.partial().parse(req.body);
      const vault = await storage.updateVault(id, updates);
      
      if (!vault) {
        return res.status(404).json({ message: "Cofre não encontrado" });
      }

      res.json(vault);
    } catch (error) {
      res.status(400).json({ message: "Dados inválidos para atualização do cofre" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
