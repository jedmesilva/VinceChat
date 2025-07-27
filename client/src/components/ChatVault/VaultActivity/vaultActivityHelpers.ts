import { VaultActivity, VaultActivityType } from './VaultActivityMain';

// Utilitários para criar atividades de forma mais fácil
export class VaultActivityFactory {
  // Cria uma atividade de cofre aberto
  static createVaultOpened(
    userName: string,
    timestamp: Date = new Date(),
    id: string = `vault_opened_${Date.now()}`
  ): VaultActivity {
    return {
      id,
      type: 'vault_opened',
      userName,
      timestamp,
    };
  }

  // Cria uma atividade de falha no cofre
  static createVaultFailed(
    userName: string,
    attempt: number,
    maxAttempts: number = 3,
    timestamp: Date = new Date(),
    id: string = `vault_failed_${Date.now()}`
  ): VaultActivity {
    return {
      id,
      type: 'vault_failed',
      userName,
      attempt,
      maxAttempts,
      timestamp,
    };
  }

  // Cria uma atividade de ofensiva encerrada
  static createOffensiveEnded(
    timestamp: Date = new Date(),
    id: string = `offensive_ended_${Date.now()}`
  ): VaultActivity {
    return {
      id,
      type: 'offensive_ended',
      timestamp,
    };
  }

  // Cria uma atividade de item saqueado
  static createItemLooted(
    userName: string,
    itemName: string,
    itemIcon: string = '📦',
    itemRarity: 'common' | 'rare' | 'epic' | 'legendary' = 'common',
    timestamp: Date = new Date(),
    id: string = `item_looted_${Date.now()}`
  ): VaultActivity {
    return {
      id,
      type: 'item_looted',
      userName,
      itemName,
      itemIcon,
      itemRarity,
      timestamp,
    };
  }
}

// Dados de exemplo para testes
export const sampleVaultActivities: VaultActivity[] = [
  VaultActivityFactory.createVaultOpened(
    'João',
    new Date(Date.now() - 30 * 60 * 1000) // 30 minutos atrás
  ),
  VaultActivityFactory.createVaultFailed(
    'Maria',
    2,
    3,
    new Date(Date.now() - 15 * 60 * 1000) // 15 minutos atrás
  ),
  VaultActivityFactory.createItemLooted(
    'Pedro',
    'Espada Lendária',
    '⚔️',
    'legendary',
    new Date(Date.now() - 10 * 60 * 1000) // 10 minutos atrás
  ),
  VaultActivityFactory.createOffensiveEnded(
    new Date(Date.now() - 5 * 60 * 1000) // 5 minutos atrás
  ),
  VaultActivityFactory.createItemLooted(
    'Ana',
    'Poção de Cura',
    '🧪',
    'rare',
    new Date(Date.now() - 2 * 60 * 1000) // 2 minutos atrás
  ),
];

// Função para filtrar atividades por tipo
export const filterActivitiesByType = (
  activities: VaultActivity[],
  type: VaultActivityType
): VaultActivity[] => {
  return activities.filter(activity => activity.type === type);
};

// Função para ordenar atividades por timestamp (mais recente primeiro)
export const sortActivitiesByTimestamp = (activities: VaultActivity[]): VaultActivity[] => {
  return [...activities].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

// Função para obter as atividades mais recentes
export const getRecentActivities = (
  activities: VaultActivity[],
  limit: number = 10
): VaultActivity[] => {
  return sortActivitiesByTimestamp(activities).slice(0, limit);
};