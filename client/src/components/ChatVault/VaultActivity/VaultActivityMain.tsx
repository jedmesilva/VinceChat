import React from 'react';
import VaultOpenedCard from './VaultOpenedCard';
import VaultFailedCard from './VaultFailedCard';
import OffensiveEndedCard from './OffensiveEndedCard';
import ItemLootedCard from './ItemLootedCard';

// Tipos de atividade que podem ocorrer no chat
export type VaultActivityType = 'vault_opened' | 'vault_failed' | 'offensive_ended' | 'item_looted';

// Interface base para todas as atividades
export interface BaseVaultActivity {
  id: string;
  type: VaultActivityType;
  timestamp: Date;
  className?: string;
}

// Interfaces específicas para cada tipo de atividade
export interface VaultOpenedActivity extends BaseVaultActivity {
  type: 'vault_opened';
  userName: string;
}

export interface VaultFailedActivity extends BaseVaultActivity {
  type: 'vault_failed';
  userName: string;
  attempt: number;
  maxAttempts: number;
}

export interface OffensiveEndedActivity extends BaseVaultActivity {
  type: 'offensive_ended';
}

export interface ItemLootedActivity extends BaseVaultActivity {
  type: 'item_looted';
  userName: string;
  itemName: string;
  itemIcon: string;
  itemRarity: 'common' | 'rare' | 'epic' | 'legendary';
}

// Union type para todas as atividades
export type VaultActivity = 
  | VaultOpenedActivity 
  | VaultFailedActivity 
  | OffensiveEndedActivity 
  | ItemLootedActivity;

// Props do componente principal
interface VaultActivityMainProps {
  activity: VaultActivity;
}

const VaultActivityMain: React.FC<VaultActivityMainProps> = ({ activity }) => {
  // Renderiza o componente apropriado baseado no tipo de atividade
  switch (activity.type) {
    case 'vault_opened':
      return (
        <VaultOpenedCard
          userName={activity.userName}
          timestamp={activity.timestamp}
          className={activity.className}
        />
      );

    case 'vault_failed':
      return (
        <VaultFailedCard
          userName={activity.userName}
          attempt={activity.attempt}
          maxAttempts={activity.maxAttempts}
          timestamp={activity.timestamp}
          className={activity.className}
        />
      );

    case 'offensive_ended':
      return (
        <OffensiveEndedCard
          timestamp={activity.timestamp}
          className={activity.className}
        />
      );

    case 'item_looted':
      return (
        <ItemLootedCard
          userName={activity.userName}
          itemName={activity.itemName}
          itemIcon={activity.itemIcon}
          itemRarity={activity.itemRarity}
          timestamp={activity.timestamp}
          className={activity.className}
        />
      );

    default:
      // TypeScript garantirá que todos os casos sejam cobertos
      const exhaustiveCheck: never = activity;
      console.warn('Tipo de atividade não reconhecido:', exhaustiveCheck);
      return null;
  }
};

export default VaultActivityMain;