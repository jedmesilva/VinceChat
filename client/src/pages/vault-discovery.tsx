import React, { useState, useEffect, useCallback } from 'react';
import { VaultGrid, type Vault } from 'client/src/components/VaultGrid/VaultGrid.tsx'; // Ajuste o caminho conforme necessário

const VaultDiscovery: React.FC = () => {
  const [vaults, setVaults] = useState<Vault[]>([]);
  const [loading, setLoading] = useState(true);

  // Carrega os dados dos cofres
  useEffect(() => {
    const loadVaults = async () => {
      try {
        // Simula carregamento - substitua pela sua API
        const sampleVaults: Vault[] = [
          {
            id: '1',
            name: 'Cofre do Iniciante',
            items: [
              { id: '1', name: 'Recompensa Inicial', type: 'money', value: 1000 },
              { id: '2', name: 'Troféu Bronze', type: 'trophy' },
              { id: '3', name: 'Gema Comum', type: 'item' },
              { id: '4', name: 'Bônus Extra', type: 'money', value: 500 }
            ],
            isLocked: true,
            difficulty: 'easy',
            description: 'Perfeito para começar sua jornada na conquista de cofres',
            isNew: true,
            expiresIn: '7 dias'
          },
          {
            id: '2',
            name: 'Tesouro Perdido',
            items: [
              { id: '1', name: 'Grande Recompensa', type: 'money', value: 5000 },
              { id: '2', name: 'Artefato Antigo', type: 'item' },
              { id: '3', name: 'Medalha de Prata', type: 'trophy' },
              { id: '4', name: 'Caixa Misteriosa', type: 'gift' },
              { id: '5', name: 'Bônus Secreto', type: 'money', value: 1500 }
            ],
            isLocked: true,
            difficulty: 'medium',
            description: 'Um mistério antigo aguarda ser desvendado pelos corajosos',
            isPopular: true,
            expiresIn: '3 dias',
            itemsVisible: false
          },
          {
            id: '3',
            name: 'Cofre do Mestre',
            items: [
              { id: '1', name: 'Recompensa Principal', type: 'money', value: 15000 },
              { id: '2', name: 'Troféu de Ouro', type: 'trophy' },
              { id: '3', name: 'Diamante Raro', type: 'item' },
              { id: '4', name: 'Presente Especial', type: 'gift' },
              { id: '5', name: 'Bônus Mestre', type: 'money', value: 3000 }
            ],
            isLocked: true,
            difficulty: 'hard',
            description: 'Apenas os mais habilidosos conseguem abrir este desafio',
            expiresIn: '12 horas'
          },
          {
            id: '4',
            name: 'Lendário Dourado',
            items: [
              { id: '1', name: 'Jackpot Lendário', type: 'money', value: 50000 },
              { id: '2', name: 'Coroa Imperial', type: 'trophy' },
              { id: '3', name: 'Esmeralda Lendária', type: 'item' },
              { id: '4', name: 'Tesouro Supremo', type: 'gift' },
              { id: '5', name: 'Recompensa Épica', type: 'money', value: 10000 },
              { id: '6', name: 'Relíquia Dourada', type: 'item' }
            ],
            isLocked: true,
            difficulty: 'legendary',
            description: 'O cofre mais desafiador de todos os tempos - seus segredos são inestimáveis',
            expiresIn: '2 dias',
            itemsVisible: false
          },
          {
            id: '5',
            name: 'Cofre Conquistado',
            items: [
              { id: '1', name: 'Recompensa Obtida', type: 'money', value: 2500 },
              { id: '2', name: 'Medalha Vitória', type: 'trophy' },
              { id: '3', name: 'Lembrança', type: 'gift' }
            ],
            isLocked: false,
            difficulty: 'easy',
            description: 'Já foi aberto por alguém especial como você',
            expiresIn: '30 dias'
          },
          {
            id: '6',
            name: 'Segredo Corporativo',
            items: [
              { id: '1', name: 'Bônus Corporativo', type: 'money', value: 8000 },
              { id: '2', name: 'Troféu Empresa', type: 'trophy' },
              { id: '3', name: 'Ação Valiosa', type: 'item' },
              { id: '4', name: 'Kit Executivo', type: 'gift' }
            ],
            isLocked: true,
            difficulty: 'medium',
            description: 'Informações confidenciais que podem mudar tudo',
            expiresIn: '5 dias',
            itemsVisible: false
          }
        ];

        // Simula delay de carregamento
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setVaults(sampleVaults);
      } catch (error) {
        console.error('Erro ao carregar cofres:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVaults();
  }, []);

  // Handler para quando um cofre é clicado
  const handleVaultClick = useCallback((vault: Vault) => {
    console.log('Cofre clicado:', vault.name);
    
    // Aqui você pode implementar a lógica de abertura do cofre
    // Por exemplo: abrir modal, navegar para outra página, etc.
    
    // Exemplo de navegação (se estiver usando React Router)
    // navigate(`/vault/${vault.id}`);
    
    // Exemplo de abertura de modal
    // setSelectedVault(vault);
    // setShowModal(true);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Carregando cofres...</p>
        </div>
      </div>
    );
  }

  return (
    <VaultGrid
      vaults={vaults}
      onVaultClick={handleVaultClick}
      title="Cofres Disponíveis"
      emptyStateConfig={{
        title: "Nenhum cofre encontrado",
        description: "Inicie uma caçada para encontrar cofres disponíveis, ou aguarde que eles apareçam para você esporadicamente"
      }}
      gridConfig={{
        cols: { sm: 2, md: 2, lg: 3, xl: 4 },
        gap: 6
      }}
      showBackground={true}
    />
  );
};

export default VaultDiscovery;