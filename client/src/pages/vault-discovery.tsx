import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'wouter';
import { VaultGrid, type Vault } from '@/components/VaultsGridDiscovery/VaultsGridDiscovery';
import VaultHunting from '@/components/VaultHunting/VaultHunting';
import MyVaultMain from '@/components/MyVault/MyVaultMain';
import Navbar from '@/components/Navbar';

const VaultDiscovery: React.FC = () => {
  const [, setLocation] = useLocation();
  const [vaults, setVaults] = useState<Vault[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [myVaultVisible, setMyVaultVisible] = useState(true);

  // Mock user data - replace with real user data from authentication
  const mockUser = {
    name: "João Silva",
    email: "joao@exemplo.com",
    avatar: undefined
  };

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

  // Handlers para sidebar
  const handleToggleMyVault = useCallback(() => {
    setMyVaultVisible(prev => !prev);
  }, []);

  const handleOpenSidebar = useCallback(() => {
    setSidebarOpen(true);
  }, []);

  const handleCloseSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  // Handler para quando um cofre é clicado
  const handleVaultClick = useCallback((vault: Vault) => {
    console.log('Navegando para o cofre:', vault.name);
    // Navega para a página do chat do cofre específico
    setLocation(`/${vault.id}`);
  }, [setLocation]);

  // Handlers para o componente de caça de cofres
  const handleVaultFound = useCallback((vault: any) => {
    console.log('Cofre encontrado:', vault);
    // Adicionar o cofre encontrado à lista de cofres
    setVaults(prevVaults => [...prevVaults, {
      id: vault.id,
      name: vault.name,
      items: [{ id: '1', name: `Recompensa de R$${vault.prizeAmount}`, type: 'money' as const, value: vault.prizeAmount }],
      isLocked: true,
      difficulty: vault.difficulty,
      description: `Cofre encontrado em ${vault.location}`,
      isNew: true
    }]);
  }, []);

  const handleHuntComplete = useCallback((stats: any, foundVaults: any[]) => {
    console.log('Caçada completa:', stats, foundVaults);
  }, []);

  const handleHuntStart = useCallback(() => {
    console.log('Caçada iniciada');
  }, []);

  const handleHuntStop = useCallback(() => {
    console.log('Caçada parada');
  }, []);

  const handleProfileClick = useCallback(() => {
    setLocation('/account');
  }, [setLocation]);

  const handleSettingsClick = useCallback(() => {
    console.log('Configurações clicadas');
  }, []);

  const handleLogoutClick = useCallback(() => {
    console.log('Logout clicado');
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
    <div className="min-h-screen bg-gray-900">
      {/* Navbar */}
      <Navbar 
        onOpenSidebar={handleToggleMyVault} 
        isMyVaultVisible={myVaultVisible}
        user={mockUser}
        onProfileClick={handleProfileClick}
        onSettingsClick={handleSettingsClick}
        onLogoutClick={handleLogoutClick}
      />
      
      {/* Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={handleCloseSidebar} />
          <div className="fixed left-0 top-0 h-full w-80 bg-slate-800">
            {/* Conteúdo do sidebar pode ser adicionado aqui */}
            <div className="p-4">
              <h2 className="text-white text-lg font-semibold">Menu</h2>
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo principal */}
      <div className="pt-[72px] h-screen flex overflow-hidden"> {/* Espaço para navbar fixa - ajustado para py-3 (12px top + 12px bottom) + altura do conteúdo */}
        {/* MyVault - Desktop: lado esquerdo | Mobile: tela completa quando visível */}
        <div className={`
          min-w-0 flex-shrink-0 border-r border-slate-700/50 transition-all duration-300 overflow-hidden
          md:${myVaultVisible ? 'w-1/3' : 'w-0'}
          ${myVaultVisible ? 'w-full md:w-1/3' : 'w-0'}
        `}>
          <MyVaultMain 
            onChatToggle={() => {}}
            showChatToggle={false}
          />
        </div>

        {/* Discovery Content - Desktop: lado direito | Mobile: tela completa quando MyVault oculto */}
        <div className={`
          min-w-0
          md:flex-1
          ${myVaultVisible ? 'hidden md:flex md:flex-col' : 'flex-1'}
        `}>
          <div className="h-full overflow-y-auto">
            {/* Componente de caça de cofres no topo */}
            <div className="p-4">
              <VaultHunting
                onVaultFound={handleVaultFound}
                onHuntComplete={handleHuntComplete}
                onHuntStart={handleHuntStart}
                onHuntStop={handleHuntStop}
              />
            </div>

            {/* Grid de cofres abaixo */}
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
              showBackground={false} // Removemos o background do grid já que a página tem seu próprio background
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultDiscovery;