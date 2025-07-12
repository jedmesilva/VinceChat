import { users, vaults, type User, type InsertUser, type Vault, type InsertVault } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllVaults(): Promise<Vault[]>;
  getVault(id: number): Promise<Vault | undefined>;
  createVault(vault: InsertVault): Promise<Vault>;
  updateVault(id: number, vault: Partial<InsertVault>): Promise<Vault | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private vaults: Map<number, Vault>;
  private currentUserId: number;
  private currentVaultId: number;

  constructor() {
    this.users = new Map();
    this.vaults = new Map();
    this.currentUserId = 1;
    this.currentVaultId = 1;
    
    // Inicializar com dados de exemplo
    this.initializeVaults();
  }

  private initializeVaults() {
    const sampleVaults: InsertVault[] = [
      {
        name: 'Cofre do Iniciante',
        description: 'Perfeito para começar sua jornada na conquista de cofres',
        itemAmount: 1000,
        isLocked: true,
        attempts: 45,
        winners: 12,
        difficulty: 'easy',
        lastActivity: '2h',
        isNew: true,
        isPopular: false,
      },
      {
        name: 'Tesouro Perdido',
        description: 'Um mistério antigo aguarda ser desvendado pelos corajosos',
        itemAmount: 5000,
        isLocked: true,
        attempts: 123,
        winners: 5,
        difficulty: 'medium',
        lastActivity: '1h',
        isNew: false,
        isPopular: true,
      },
      {
        name: 'Cofre do Mestre',
        description: 'Apenas os mais habilidosos conseguem abrir este desafio',
        itemAmount: 15000,
        isLocked: true,
        attempts: 234,
        winners: 2,
        difficulty: 'hard',
        lastActivity: '30m',
        isNew: false,
        isPopular: false,
      },
      {
        name: 'Lendário Dourado',
        description: 'O cofre mais desafiador de todos os tempos',
        itemAmount: 50000,
        isLocked: true,
        attempts: 567,
        winners: 1,
        difficulty: 'legendary',
        lastActivity: '5m',
        isNew: false,
        isPopular: false,
      },
      {
        name: 'Cofre Conquistado',
        description: 'Já foi aberto por alguém especial como você',
        itemAmount: 2500,
        isLocked: false,
        attempts: 89,
        winners: 8,
        difficulty: 'easy',
        lastActivity: '3h',
        isNew: false,
        isPopular: false,
      },
      {
        name: 'Segredo Corporativo',
        description: 'Informações valiosas esperam por você neste cofre',
        itemAmount: 8000,
        isLocked: true,
        attempts: 156,
        winners: 3,
        difficulty: 'medium',
        lastActivity: '45m',
        isNew: false,
        isPopular: false,
      }
    ];

    sampleVaults.forEach(vault => {
      this.createVault(vault);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllVaults(): Promise<Vault[]> {
    return Array.from(this.vaults.values());
  }

  async getVault(id: number): Promise<Vault | undefined> {
    return this.vaults.get(id);
  }

  async createVault(insertVault: InsertVault): Promise<Vault> {
    const id = this.currentVaultId++;
    const vault: Vault = { 
      name: insertVault.name,
      description: insertVault.description ?? null,
      itemAmount: insertVault.itemAmount,
      isLocked: insertVault.isLocked ?? true,
      attempts: insertVault.attempts ?? 0,
      winners: insertVault.winners ?? 0,
      difficulty: insertVault.difficulty,
      lastActivity: insertVault.lastActivity ?? null,
      isNew: insertVault.isNew ?? false,
      isPopular: insertVault.isPopular ?? false,
      id,
      createdAt: new Date()
    };
    this.vaults.set(id, vault);
    return vault;
  }

  async updateVault(id: number, updates: Partial<InsertVault>): Promise<Vault | undefined> {
    const vault = this.vaults.get(id);
    if (!vault) return undefined;

    const updatedVault = { ...vault, ...updates };
    this.vaults.set(id, updatedVault);
    return updatedVault;
  }
}

export const storage = new MemStorage();
