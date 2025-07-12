import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Lock, LockOpen, Trophy, Users, Clock, Zap, Eye, Star, Crown, X, Filter } from 'lucide-react';

interface Vault {
  id: string;
  name: string;
  itemAmount: number;
  isLocked: boolean;
  attempts: number;
  winners: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'legendary';
  lastActivity?: string;
  description?: string;
  isNew?: boolean;
  isPopular?: boolean;
}

interface VaultCardProps {
  vault: Vault;
  onVaultClick: (vault: Vault) => void;
  index: number;
}

const VaultCard: React.FC<VaultCardProps> = React.memo(({ vault, onVaultClick, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const formattedItem = useMemo(() => 
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0
    }).format(vault.itemAmount),
    [vault.itemAmount]
  );

  const difficultyConfig = useMemo(() => ({
    easy: {
      color: 'bg-slate-600/40 border border-slate-500/30 text-slate-300',
      icon: <Star className="h-4 w-4" />,
      label: 'Fácil'
    },
    medium: {
      color: 'bg-violet-500/20 border border-violet-500/30 text-violet-300',
      icon: <Zap className="h-4 w-4" />,
      label: 'Médio'
    },
    hard: {
      color: 'bg-red-500/20 border border-red-500/30 text-red-300',
      icon: <Trophy className="h-4 w-4" />,
      label: 'Difícil'
    },
    legendary: {
      color: 'bg-yellow-500/20 border border-yellow-500/30 text-yellow-300',
      icon: <Crown className="h-4 w-4" />,
      label: 'Lendário'
    }
  }), []);

  const handleClick = useCallback(() => {
    onVaultClick(vault);
  }, [vault, onVaultClick]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }, [handleClick]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div 
      className={`transform transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      <div 
        className={`relative bg-slate-800 rounded-2xl p-6 border border-violet-500/20 hover:border-violet-500/40 transition-all duration-300 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${
          isHovered ? 'scale-105 shadow-2xl' : 'hover:scale-102'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        onKeyDown={handleKeyPress}
        tabIndex={0}
        role="button"
        aria-label={`Cofre ${vault.name}, item de ${formattedItem}, dificuldade ${difficultyConfig[vault.difficulty].label}`}
      >
        {/* Badges otimizados */}
        {(vault.isNew || vault.isPopular) && (
          <div className="absolute top-4 right-4 flex gap-2" aria-label="Etiquetas do cofre">
            {vault.isNew && (
              <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded-full text-xs font-medium">
                Novo
              </span>
            )}
            {vault.isPopular && (
              <span className="bg-orange-500/20 text-orange-300 px-2 py-1 rounded-full text-xs font-medium">
                Popular
              </span>
            )}
          </div>
        )}

        {/* Dificuldade com ícone */}
        <div className="mb-6">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${difficultyConfig[vault.difficulty].color}`}>
            {difficultyConfig[vault.difficulty].icon}
            {difficultyConfig[vault.difficulty].label}
          </div>
        </div>

        {/* Ícone do cadeado central */}
        <div className="flex justify-center mb-6">
          <div className={`relative w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 ${
            vault.isLocked 
              ? 'bg-gradient-to-br from-slate-700 to-slate-600 border-2 border-slate-500' 
              : 'bg-gradient-to-br from-green-500/20 to-emerald-600/20 border-2 border-green-500/50'
          } ${isHovered ? 'scale-110 shadow-lg' : ''}`}>
            {vault.isLocked ? (
              <Lock className="h-10 w-10 text-slate-300 group-hover:text-violet-300 transition-colors" />
            ) : (
              <LockOpen className="h-10 w-10 text-green-400 group-hover:text-green-300 transition-colors" />
            )}
            
            {/* Efeito de brilho */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              isHovered ? 'animate-pulse' : ''
            }`} />
          </div>
        </div>

        {/* Nome do cofre */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-violet-100 group-hover:text-violet-200 transition-colors">
            {vault.name}
          </h3>
          {vault.description && (
            <p className="text-sm text-slate-400 mt-2 line-clamp-2">
              {vault.description}
            </p>
          )}
        </div>

        {/* Valor do item */}
        <div className="text-center mb-6">
          <div className="bg-slate-700/50 rounded-xl p-4">
            <div className="text-2xl font-bold text-violet-200">
              {formattedItem}
            </div>
          </div>
        </div>

        {/* Botão de ação */}
        <button 
          className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 ${
            vault.isLocked 
              ? 'bg-violet-500 text-white hover:bg-violet-400 focus:ring-violet-500/50' 
              : 'bg-green-500 text-white hover:bg-green-400 focus:ring-green-500/50'
          } group-hover:scale-105`}
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          aria-label={vault.isLocked ? 'Tentar abrir cofre' : 'Visualizar cofre aberto'}
        >
          {vault.isLocked ? 'Tentar Abrir' : 'Cofre Aberto'}
        </button>

        {/* Última atividade - apenas se muito recente */}
        {vault.lastActivity && (
          <div className="mt-3 text-center">
            <div className="flex items-center justify-center gap-1 text-slate-500 text-xs">
              <Clock className="h-3 w-3" />
              <span>Ativo há {vault.lastActivity}</span>
            </div>
          </div>
        )}

        {/* Efeito de hover no card */}
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </div>
  );
});

VaultCard.displayName = 'VaultCard';

type FilterType = 'all' | 'available' | 'conquered';

const VaultGrid: React.FC = () => {
  const [vaults, setVaults] = useState<Vault[]>([]);
  const [selectedVault, setSelectedVault] = useState<Vault | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');
  const [isLoading, setIsLoading] = useState(true);

  const filteredVaults = useMemo(() => {
    switch (filter) {
      case 'available':
        return vaults.filter(vault => vault.isLocked);
      case 'conquered':
        return vaults.filter(vault => !vault.isLocked);
      default:
        return vaults;
    }
  }, [vaults, filter]);

  const stats = useMemo(() => ({
    total: vaults.length,
    available: vaults.filter(v => v.isLocked).length,
    conquered: vaults.filter(v => !v.isLocked).length,
    totalItem: vaults.reduce((sum, v) => sum + v.itemAmount, 0)
  }), [vaults]);

  // Dados de exemplo
  useEffect(() => {
    const loadVaults = async () => {
      setIsLoading(true);
      
      // Simular delay de carregamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const sampleVaults: Vault[] = [
        {
          id: '1',
          name: 'Cofre do Iniciante',
          itemAmount: 1000,
          isLocked: true,
          attempts: 45,
          winners: 12,
          difficulty: 'easy',
          description: 'Perfeito para começar sua jornada na conquista de cofres',
          isNew: true,
          lastActivity: '2h'
        },
        {
          id: '2',
          name: 'Tesouro Perdido',
          itemAmount: 5000,
          isLocked: true,
          attempts: 123,
          winners: 5,
          difficulty: 'medium',
          description: 'Um mistério antigo aguarda ser desvendado pelos corajosos',
          isPopular: true,
          lastActivity: '1h'
        },
        {
          id: '3',
          name: 'Cofre do Mestre',
          itemAmount: 15000,
          isLocked: true,
          attempts: 234,
          winners: 2,
          difficulty: 'hard',
          description: 'Apenas os mais habilidosos conseguem abrir este desafio',
          lastActivity: '30m'
        },
        {
          id: '4',
          name: 'Lendário Dourado',
          itemAmount: 50000,
          isLocked: true,
          attempts: 567,
          winners: 1,
          difficulty: 'legendary',
          description: 'O cofre mais desafiador de todos os tempos',
          lastActivity: '5m'
        },
        {
          id: '5',
          name: 'Cofre Conquistado',
          itemAmount: 2500,
          isLocked: false,
          attempts: 89,
          winners: 8,
          difficulty: 'easy',
          description: 'Já foi aberto por alguém especial como você',
          lastActivity: '3h'
        },
        {
          id: '6',
          name: 'Segredo Corporativo',
          itemAmount: 8000,
          isLocked: true,
          attempts: 156,
          winners: 3,
          difficulty: 'medium',
          description: 'Informações valiosas esperam por você neste cofre',
          lastActivity: '45m'
        }
      ];
      
      setVaults(sampleVaults);
      setIsLoading(false);
    };

    loadVaults();
  }, []);

  const handleVaultClick = useCallback((vault: Vault) => {
    setSelectedVault(vault);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedVault(null);
  }, []);

  const handleFilterChange = useCallback((newFilter: FilterType) => {
    setFilter(newFilter);
  }, []);

  const handleModalClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  }, [handleCloseModal]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && selectedVault) {
      handleCloseModal();
    }
  }, [selectedVault, handleCloseModal]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin mb-4"></div>
          <p className="text-violet-300">Carregando cofres...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      {/* Grid de cofres */}
      <div className="max-w-7xl mx-auto">
        {filteredVaults.length === 0 ? (
          <div className="text-center py-12">
            <Filter className="h-16 w-16 text-slate-500 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">Nenhum cofre encontrado para este filtro</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVaults.map((vault, index) => (
              <VaultCard 
                key={vault.id} 
                vault={vault} 
                onVaultClick={handleVaultClick}
                index={index}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal de cofre selecionado */}
      {selectedVault && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleModalClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="bg-slate-800 rounded-2xl p-6 max-w-md w-full border border-violet-500/20 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500/50 rounded-lg p-1"
              aria-label="Fechar modal"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="text-center mb-6">
              <h3 id="modal-title" className="text-2xl font-bold text-violet-100 mb-2">
                {selectedVault.name}
              </h3>
              <div className="bg-slate-700/50 rounded-lg p-3 mb-4">
                <div className="text-3xl font-bold text-violet-200">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 0
                  }).format(selectedVault.itemAmount)}
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <button 
                className="w-full py-3 px-4 bg-violet-500 text-white rounded-xl font-medium hover:bg-violet-400 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                onClick={handleCloseModal}
              >
                {selectedVault.isLocked ? 'Iniciar Desafio' : 'Ver Detalhes'}
              </button>
              <button 
                onClick={handleCloseModal}
                className="w-full py-3 px-4 bg-slate-700 text-slate-300 rounded-xl font-medium hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500/50"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VaultDiscovery;