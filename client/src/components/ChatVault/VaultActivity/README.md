# VaultActivity System

Este sistema centraliza todos os componentes de atividade do chat de cofres através do componente `VaultActivityMain`.

## Como usar

### 1. Importar apenas o VaultActivityMain

```tsx
import VaultActivityMain, { VaultActivity } from '@/components/ChatVault/VaultActivity/VaultActivityMain';
```

### 2. Usar no histórico do chat

```tsx
// No seu componente de chat
const ChatHistory: React.FC = () => {
  const [activities, setActivities] = useState<VaultActivity[]>([]);

  return (
    <div className="chat-history">
      {activities.map((activity) => (
        <VaultActivityMain 
          key={activity.id} 
          activity={activity} 
        />
      ))}
    </div>
  );
};
```

### 3. Criar atividades facilmente

```tsx
import { VaultActivityFactory } from '@/components/ChatVault/VaultActivity/vaultActivityHelpers';

// Cofre aberto
const openedActivity = VaultActivityFactory.createVaultOpened('João');

// Falha no cofre
const failedActivity = VaultActivityFactory.createVaultFailed('Maria', 2, 3);

// Item saqueado
const lootedActivity = VaultActivityFactory.createItemLooted(
  'Pedro', 
  'Espada Lendária', 
  '⚔️', 
  'legendary'
);

// Ofensiva encerrada
const endedActivity = VaultActivityFactory.createOffensiveEnded();
```

## Tipos de Atividade

- **vault_opened**: Quando alguém consegue abrir o cofre
- **vault_failed**: Quando alguém falha ao tentar abrir o cofre
- **item_looted**: Quando alguém saqueia um item
- **offensive_ended**: Quando uma ofensiva é encerrada por tempo

## Vantagens desta abordagem

1. **Centralização**: Um único componente para importar no chat
2. **Type Safety**: TypeScript garante que todos os casos sejam cobertos
3. **Facilidade**: Factory methods para criar atividades rapidamente
4. **Manutenibilidade**: Adicionar novos tipos é simples
5. **Consistência**: Todos os componentes seguem o mesmo padrão