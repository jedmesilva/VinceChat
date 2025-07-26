import React, { useState, useEffect, useCallback } from 'react';
import { 
  Lock, 
  LockOpen, 
  Star, 
  Zap, 
  Trophy, 
  Crown, 
  DollarSign, 
  Gift, 
  Gem, 
  Award, 
  Package, 
  EyeOff, 
  HelpCircle, 
  Clock, 
  Target, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';

// ===== INTERFACES E TIPOS =====

interface Item {
  id: string;
  name: string;
  type: 'money' | 'item' | 'trophy' | 'gift';
  value?: number;
}

interface Vault {
  id: string;
  name: string;
  items: Item[];
  isLocked: boolean;
  difficulty: 'easy' | 'medium' | 'hard' | 'legendary';
  expiresIn?: string;
  description?: string;
  isNew?: boolean;
  isPopular?: boolean;
  itemsVisible?: boolean;
}

interface VaultCardProps {
  vault: Vault;
  onVaultClick: (vault: Vault) => void;
  index: number;
}

interface VaultGridProps {
  vaults: Vault[];
  onVaultClick: (vault: Vault) => void;
  title?: string;
  emptyStateConfig?: {
    title: string;
    description: string;
    icon?: React.ReactNode;
  };
  gridConfig?: {
    cols?: {
      sm?: number;
      md?: number;
      lg?: number;
      xl?: number;
    };
    gap?: number;
  };
  showBackground?: boolean;
  className?: string;
}

// ===== CONFIGURAÇÕES DE DIFICULDADE =====

const difficultyConfig = {
  easy: {
    color: 'from-slate-500 to-slate-600',
    border: 'border-slate-400/50',
    glow: 'shadow-slate-500/30',
    bg: 'bg-slate-500/10',
    text: 'text-slate-300',
    icon: <Star className="h-4 w-4" />,
    label: 'Fácil'
  },
  medium: {
    color: 'from-blue-500 to-blue-600',
    border: 'border-blue-400/50',
    glow: 'shadow-blue-500/30',
    bg: 'bg-blue-500/10',
    text: 'text-blue-300',
    icon: <Zap className="h-4 w-4" />,
    label: 'Médio'
  },
  hard: {
    color: 'from-purple-500 to-purple-600',
    border: 'border-purple-400/50',
    glow: 'shadow-purple-500/30',
    bg: 'bg-purple-500/10',
    text: 'text-purple-300',
    icon: <Trophy className="h-4 w-4" />,
    label: 'Difícil'
  },
  legendary: {
    color: 'from-amber-400 to-yellow-500',
    border: 'border-yellow-400/50',
    glow: 'shadow-yellow-500/30',
    bg: 'bg-yellow-500/10',
    text: 'text-yellow-300',
    icon: <Crown className="h-4 w-4" />,
    label: 'Lendário'
  }
};

// ===== UTILITÁRIOS =====

const getItemIcon = (type: string) => {
  switch (type) {
    case 'money':
      return DollarSign;
    case 'trophy':
      return Trophy;
    case 'gift':
      return Gift;
    case 'item':
      return Gem;
    default:
      return Award;
  }
};

const getItemDisplay = (item: Item) => {
  if (item.type === 'money' && item.value) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0
    }).format(item.value);
  }
  return item.name;
};

// ===== COMPONENTE VAULT CARD =====

const VaultCard: React.FC<VaultCardProps> = React.memo(({ vault, onVaultClick, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showAllItems, setShowAllItems] = useState(false);

  const difficulty = difficultyConfig[vault.difficulty];
  const visibleItems = showAllItems ? vault.items : vault.items.slice(0, 3);
  const hasMoreItems = vault.items.length > 3;

  const handleClick = useCallback(() => {
    onVaultClick(vault);
  }, [vault, onVaultClick]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }, [handleClick]);

  const handleToggleItems = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowAllItems(prev => !prev);
  }, []);

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
        className={`relative min-h-[480px] bg-slate-800/90 backdrop-blur-sm rounded-3xl p-6 border-2 ${difficulty.border} transition-all duration-300 cursor-pointer group ${difficulty.glow} flex flex-col`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        onKeyDown={handleKeyPress}
        tabIndex={0}
        role="button"
        aria-label={`Cofre ${vault.name}, dificuldade ${difficulty.label}`}
      >
        {/* Status Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {vault.isNew && (
            <span className="px-2 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-300 border border-green-400/50">
              Novo
            </span>
          )}
          {vault.isPopular && (
            <span className="px-2 py-1 rounded-full text-xs font-bold bg-orange-500/20 text-orange-300 border border-orange-400/50">
              Popular
            </span>
          )}
        </div>

        {/* Difficulty Badge */}
        <div className="absolute top-3 right-3 z-10">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${difficulty.bg} ${difficulty.text} border ${difficulty.border}`}>
            {difficulty.icon}
            {difficulty.label}
          </div>
        </div>

        {/* Lock Icon */}
        <div className="flex justify-center mb-4 mt-8">
          <div className={`relative w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 ${
            vault.isLocked 
              ? 'bg-slate-700/50 border-2 border-slate-500/50' 
              : 'bg-green-500/20 border-2 border-green-400/50'
          }`}>
            {vault.isLocked ? (
              <Lock className="h-8 w-8 text-slate-300 group-hover:text-violet-300 transition-colors" />
            ) : (
              <LockOpen className="h-8 w-8 text-green-400 group-hover:text-green-300 transition-colors" />
            )}
          </div>
        </div>

        {/* Vault Info */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-violet-200 transition-colors">
            {vault.name}
          </h3>
          
          {vault.description && (
            <p className="text-slate-400 text-sm mb-4 line-clamp-2 leading-relaxed">
              {vault.description}
            </p>
          )}
        </div>

        {/* Items Section - Flexible */}
        <div className="flex-1 bg-slate-700/30 rounded-2xl p-4 mb-4 flex flex-col min-h-[200px]">
          <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            {vault.itemsVisible === false ? (
              <EyeOff className="h-4 w-4 text-slate-400" />
            ) : (
              <Package className="h-4 w-4 text-violet-400" />
            )}
            {vault.itemsVisible === false ? 'Conteúdo Misterioso' : `Itens (${vault.items.length})`}
          </h4>
          
          <div className="flex-1 flex flex-col">
            {vault.itemsVisible === false ? (
              // Versão misteriosa
              <div className="flex flex-col h-full justify-between space-y-3">
                <div className="flex items-center justify-center p-6 bg-slate-600/20 rounded-xl border-2 border-dashed border-slate-500/40">
                  <div className="text-center">
                    <HelpCircle className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-400 mb-1">Conteúdo Desconhecido</p>
                    <p className="text-xs text-slate-500">Os itens serão revelados ao abrir o cofre</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-center p-3 bg-slate-600/20 rounded-lg border border-slate-500/30"
                    >
                      <div className="w-6 h-6 bg-slate-500/30 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="text-center">
                  <span className="text-xs text-slate-500 px-2 py-1 bg-slate-600/20 rounded-full">
                    ??? itens misteriosos
                  </span>
                </div>
              </div>
            ) : (
              // Versão normal com itens visíveis
              <div className="flex flex-col h-full">
                <div className="flex-1 min-h-[80px] space-y-2">
                  {visibleItems.map((item) => {
                    const ItemIcon = getItemIcon(item.type);
                    return (
                      <div 
                        key={item.id} 
                        className="flex items-center gap-3 p-2 bg-slate-600/30 rounded-xl"
                      >
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-violet-500/10 rounded-lg flex items-center justify-center">
                            <ItemIcon className="h-4 w-4 text-violet-400" />
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-white truncate">
                            {getItemDisplay(item)}
                          </div>
                          {item.type === 'money' && (
                            <div className="text-xs text-slate-400">
                              Dinheiro
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {hasMoreItems && (
                  <button
                    onClick={handleToggleItems}
                    onMouseDown={(e) => e.stopPropagation()}
                    onMouseUp={(e) => e.stopPropagation()}
                    className="w-full mt-3 py-2 bg-slate-600/50 hover:bg-slate-600/70 text-slate-300 hover:text-white rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm relative z-20"
                    type="button"
                  >
                    {showAllItems ? (
                      <>
                        Ver menos
                        <ChevronUp className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Ver mais (+{vault.items.length - 3})
                        <ChevronDown className="h-4 w-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Expires In */}
        {vault.expiresIn && (
          <div className="mt-4 text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
              <Clock className="h-3 w-3" />
              Expira em: {vault.expiresIn}
            </div>
          </div>
        )}

        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
      </div>
    </div>
  );
});

// ===== COMPONENTE VAULT GRID (REUTILIZÁVEL) =====

const VaultGrid: React.FC<VaultGridProps> = ({
  vaults,
  onVaultClick,
  title = "Cofres Disponíveis",
  emptyStateConfig = {
    title: "Nenhum cofre encontrado",
    description: "Inicie uma caçada para encontrar cofres disponíveis, ou aguarde que eles apareçam para você esporadicamente"
  },
  gridConfig = {
    cols: { sm: 2, md: 2, lg: 3, xl: 4 },
    gap: 6
  },
  showBackground = true,
  className = ""
}) => {
  const gridCols = `grid-cols-1 sm:grid-cols-${gridConfig.cols?.sm || 2} md:grid-cols-${gridConfig.cols?.md || 2} lg:grid-cols-${gridConfig.cols?.lg || 3} xl:grid-cols-${gridConfig.cols?.xl || 4}`;
  const gridGap = `gap-${gridConfig.gap || 6}`;

  return (
    <div className={`${showBackground ? 'min-h-screen bg-gray-900' : ''} relative overflow-hidden ${className}`}>
      {/* Background */}
      {showBackground && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-800/20 to-slate-900/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform skew-x-12 animate-pulse" />
        </div>
      )}

      {/* Header */}
      {title && (
        <div className="relative z-10 p-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 bg-violet-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Lock className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white leading-tight">
              {title}
            </h1>
          </div>
        </div>
      )}

      {/* Content */}
      <div className={`relative z-10 ${title ? 'px-4 pb-4' : 'p-4'}`}>
        <div className="max-w-7xl mx-auto">
          {vaults.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-slate-700/30 rounded-full flex items-center justify-center mx-auto mb-6">
                {emptyStateConfig.icon || <Lock className="h-12 w-12 text-slate-400" />}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {emptyStateConfig.title}
              </h3>
              <p className="text-slate-400 text-lg">
                {emptyStateConfig.description}
              </p>
            </div>
          ) : (
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr`}>
              {vaults.map((vault, index) => (
                <div className="w-full" key={vault.id}>
                  <VaultCard 
                    vault={vault} 
                    onVaultClick={onVaultClick}
                    index={index}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { VaultGrid, VaultCard, type Vault, type Item, type VaultGridProps, type VaultCardProps };