
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Banknote, 
  Gift, 
  Gem, 
  Trophy, 
  Crown, 
  Star, 
  Zap, 
  LockOpen,
  Eye,
  ShoppingBag,
  CreditCard,
  Coins,
  Sparkles,
  ChevronDown,
  CheckCircle,
  Clock,
  X,
  Info,
  Target,
  Skull
} from 'lucide-react';

interface InteriorItem {
  id: string;
  type: 'money' | 'product' | 'voucher' | 'special';
  name: string;
  value: number;
  description: string;
  quantity?: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  claimed?: boolean;
  claimDeadline?: string;
}

interface VaultItemsGridProps {
  items: InteriorItem[];
  onClaimItem: (itemId: string) => void;
  claimingItem: string | null;
  claimProgress: number;
  claimedItems: Set<string>;
  finalProgress: Map<string, number>;
}

const VaultItemsGrid: React.FC<VaultItemsGridProps> = ({
  items,
  onClaimItem,
  claimingItem,
  claimProgress,
  claimedItems,
  finalProgress
}) => {
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const startPositionRef = useRef<{ x: number; y: number } | null>(null);
  const hasMoved = useRef(false);
  const [localClaimProgress, setLocalClaimProgress] = useState(0);
  const [localClaimingItem, setLocalClaimingItem] = useState<string | null>(null);
  const [localClaimedItems, setLocalClaimedItems] = useState<Set<string>>(new Set());
  const [localFinalProgress, setLocalFinalProgress] = useState<Map<string, number>>(new Map());

  const rarityConfig = {
    common: {
      color: 'from-slate-500 to-slate-600',
      border: 'border-slate-400/50',
      glow: 'shadow-slate-500/30',
      bg: 'bg-slate-500/10',
      text: 'text-slate-300',
      label: 'Comum'
    },
    rare: {
      color: 'from-blue-500 to-blue-600',
      border: 'border-blue-400/50',
      glow: 'shadow-blue-500/30',
      bg: 'bg-blue-500/10',
      text: 'text-blue-300',
      label: 'Raro'
    },
    epic: {
      color: 'from-purple-500 to-purple-600',
      border: 'border-purple-400/50',
      glow: 'shadow-purple-500/30',
      bg: 'bg-purple-500/10',
      text: 'text-purple-300',
      label: 'Épico'
    },
    legendary: {
      color: 'from-amber-400 to-yellow-500',
      border: 'border-yellow-400/50',
      glow: 'shadow-yellow-500/30',
      bg: 'bg-yellow-500/10',
      text: 'text-yellow-300',
      label: 'Lendário'
    }
  };

  const typeConfig = {
    money: {
      icon: Banknote,
      label: 'Dinheiro',
      color: 'text-green-400',
      bg: 'bg-green-500/10'
    },
    product: {
      icon: Gift,
      label: 'Produto',
      color: 'text-violet-400',
      bg: 'bg-violet-500/10'
    },
    voucher: {
      icon: CreditCard,
      label: 'Vale',
      color: 'text-orange-400',
      bg: 'bg-orange-500/10'
    },
    special: {
      icon: Crown,
      label: 'Especial',
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10'
    }
  };

  const handleMouseDown = useCallback((itemId: string, event: React.MouseEvent | React.TouchEvent) => {
    if (localClaimedItems.has(itemId)) return;
    
    // Salvar posição inicial
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
    startPositionRef.current = { x: clientX, y: clientY };
    hasMoved.current = false;
    
    // Aguardar um pouco antes de iniciar o timer (evita acionamento durante scroll)
    setTimeout(() => {
      if (!hasMoved.current && startPositionRef.current) {
        startClaimTimer(itemId);
      }
    }, 150);
  }, [localClaimedItems]);

  const startClaimTimer = (itemId: string) => {
    setLocalClaimingItem(itemId);
    setLocalClaimProgress(0);
    
    // Atualizar progresso a cada 30ms (33fps)
    progressTimerRef.current = setInterval(() => {
      setLocalClaimProgress(prev => {
        const newProgress = prev + (100 / (3000 / 30)); // 3000ms / 30ms = 100 steps
        return Math.min(newProgress, 100);
      });
    }, 30);
    
    // Timer principal de 3 segundos
    holdTimerRef.current = setTimeout(() => {
      completeClaim(itemId);
    }, 3000);
  };

  const handleMouseMove = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    if (!startPositionRef.current) return;
    
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
    
    const deltaX = Math.abs(clientX - startPositionRef.current.x);
    const deltaY = Math.abs(clientY - startPositionRef.current.y);
    
    // Se moveu mais que 10px, cancela o timer
    if (deltaX > 10 || deltaY > 10) {
      hasMoved.current = true;
      handleMouseUp();
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
    }
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
    }
    setLocalClaimingItem(null);
    setLocalClaimProgress(0);
    startPositionRef.current = null;
    hasMoved.current = false;
  }, []);

  const completeClaim = useCallback(async (itemId: string) => {
    // Limpar timers
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
    }
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
    }
    
    // Salvar o progresso final antes de resetar
    setLocalFinalProgress(prev => new Map(prev).set(itemId, 100));
    
    // Marcar como saqueado imediatamente
    setLocalClaimedItems(prev => new Set(prev).add(itemId));
    setLocalClaimingItem(null);
    setLocalClaimProgress(0);
    
    // Chamar callback do parent
    onClaimItem(itemId);
  }, [onClaimItem]);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (holdTimerRef.current) {
        clearTimeout(holdTimerRef.current);
      }
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Instruction Card */}
      <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-violet-500/20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-violet-500/20 rounded-full flex items-center justify-center flex-shrink-0">
            <Target className="h-6 w-6 text-violet-400" />
          </div>
          <div>
            <p className="text-slate-300 text-sm">
              Mantenha pressionado por <span className="font-bold text-violet-400">3 segundos</span> para saquear o item
            </p>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => {
          const ItemIcon = typeConfig[item.type].icon;
          const rarity = rarityConfig[item.rarity];
          const isBeingClaimed = localClaimingItem === item.id;
          const isClaimed = localClaimedItems.has(item.id);
          
          // Calcular o progresso atual: se está sendo reivindicado, usa localClaimProgress; se foi reivindicado, usa localFinalProgress
          const currentProgress = isBeingClaimed ? localClaimProgress : (localFinalProgress.get(item.id) || 0);
          
          return (
            <div
              key={item.id}
              className={`relative ${isClaimed ? 'bg-slate-800/30' : 'bg-slate-800/90'} backdrop-blur-sm rounded-3xl p-6 border-2 ${isClaimed ? 'border-slate-600/30' : rarity.border} ${isClaimed ? '' : 'hover:scale-105'} transition-all duration-300 ${isClaimed ? 'cursor-not-allowed' : 'cursor-pointer'} group ${isClaimed ? 'shadow-slate-500/10' : rarity.glow} select-none`}
              onMouseDown={isClaimed ? undefined : (e) => handleMouseDown(item.id, e)}
              onMouseMove={isClaimed ? undefined : handleMouseMove}
              onMouseUp={isClaimed ? undefined : handleMouseUp}
              onMouseLeave={isClaimed ? undefined : handleMouseUp}
              onTouchStart={isClaimed ? undefined : (e) => handleMouseDown(item.id, e)}
              onTouchMove={isClaimed ? undefined : handleMouseMove}
              onTouchEnd={isClaimed ? undefined : handleMouseUp}
            >
              {/* Progress Bar Background */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden z-5">
                <div 
                  className={`absolute inset-y-0 left-0 bg-gradient-to-r ${rarity.color} opacity-30 transition-all duration-75 ease-linear`}
                  style={{ width: `${currentProgress}%` }}
                />
              </div>
              
              {/* Claimed Overlay - VERSÃO HORIZONTAL COM ESCALA */}
              {isClaimed && (
                <div className="absolute inset-0 rounded-3xl flex items-center justify-center z-20">
                  <div 
                    className="bg-purple-600 rounded-xl px-3 py-2 flex items-center gap-2 animate-[scale-up_0.5s_ease-out]"
                    style={{ 
                      animationFillMode: 'both'
                    }}
                  >
                    <Skull className="h-5 w-5 text-white" />
                    <div className="text-white font-bold text-sm">SAQUEADO</div>
                  </div>
                </div>
              )}
              
              {/* Rarity badge */}
              <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${rarity.bg} ${rarity.text} border ${rarity.border} z-10 ${isClaimed ? 'opacity-30' : ''}`}>
                {rarity.label}
              </div>
              
              {/* Item icon */}
              <div className={`relative z-10 w-16 h-16 rounded-2xl ${typeConfig[item.type].bg} flex items-center justify-center mb-4 mx-auto ${isClaimed ? 'opacity-30' : 'group-hover:scale-110'} transition-transform`}>
                <ItemIcon className={`h-8 w-8 ${typeConfig[item.type].color} ${isClaimed ? 'opacity-30' : ''}`} />
              </div>
              
              {/* Item info */}
              <div className={`relative z-10 text-center ${isClaimed ? 'opacity-30' : ''}`}>
                <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                <div className="text-2xl font-bold text-violet-400 mb-3">
                  R$ {item.value.toLocaleString()}
                </div>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>
                
                {/* Quantity and deadline */}
                <div className="flex items-center justify-between text-xs text-slate-500">
                  {item.quantity && (
                    <span>Qtd: {item.quantity}</span>
                  )}
                  {item.claimDeadline && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{item.claimDeadline}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Claim Progress Indicator */}
              {isBeingClaimed && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-black/70 backdrop-blur-sm rounded-full px-4 py-2">
                    <div className="text-white text-sm font-medium">
                      {localClaimProgress >= 100 ? 'SAQUEANDO...' : `${Math.round(localClaimProgress)}%`}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Shine effect */}
              {!isClaimed && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
              )}
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {items.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-slate-700/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Cofre Saqueado!</h3>
          <p className="text-slate-400 text-lg">Você saqueou todos os itens deste cofre!</p>
        </div>
      )}
      
      {/* CSS for scale-up animation */}
      <style jsx>{`
        @keyframes scale-up {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default VaultItemsGrid;
