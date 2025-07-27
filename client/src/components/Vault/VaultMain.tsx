import React, { useState, useEffect, useCallback, useRef } from 'react';
import { CheckCircle, Skull, Target } from 'lucide-react';
import VaultHeader from './VaultHeader/VaultHeader';

interface Item {
  id: string;
  type: 'money' | 'product' | 'voucher' | 'special';
  name: string;
  value: number;
  description: string;
  quantity?: number;
  image?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  claimed?: boolean;
  claimDeadline?: string;
}

interface VaultMainProps {
  vault: {
    id: string;
    name: string;
    prizeAmount: number;
    difficulty: 'easy' | 'medium' | 'hard' | 'legendary';
    description?: string;
  };
  onBack: () => void;
  timerLabel?: string;
  closeButtonText?: string;
  instructionText?: string;
  className?: string;
}

const VaultMain: React.FC<VaultMainProps> = ({
  vault,
  onBack,
  timerLabel = "Cofre aberto",
  closeButtonText = "Sair",
  instructionText = "Mantenha pressionado por 3 segundos para saquear o item",
  className = ""
}) => {
  const [items, setItems] = useState<Item[]>([]);
  const [claimingItem, setClaimingItem] = useState<string | null>(null);
  const [claimProgress, setClaimProgress] = useState(0);
  const [claimedItems, setClaimedItems] = useState<Set<string>>(new Set());
  const [finalProgress, setFinalProgress] = useState<Map<string, number>>(new Map());
  
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const startPositionRef = useRef<{ x: number; y: number } | null>(null);
  const hasMoved = useRef(false);

  // Carregar itens de exemplo
  useEffect(() => {
    const sampleItems: Item[] = [
      {
        id: '1',
        type: 'money',
        name: 'Item em Dinheiro',
        value: 2500,
        description: 'Valor em dinheiro para saque imediato',
        rarity: 'epic',
        claimDeadline: '7 dias'
      },
      {
        id: '2',
        type: 'product',
        name: 'Smartphone Premium',
        value: 1800,
        description: 'iPhone 15 Pro Max 256GB na cor titânio natural',
        rarity: 'legendary',
        quantity: 1,
        claimDeadline: '30 dias'
      },
      {
        id: '3',
        type: 'voucher',
        name: 'Vale Shopping',
        value: 500,
        description: 'Vale compras para qualquer loja do shopping',
        rarity: 'rare',
        claimDeadline: '60 dias'
      },
      {
        id: '4',
        type: 'money',
        name: 'Bonus Especial',
        value: 750,
        description: 'Bônus adicional por conquista rápida',
        rarity: 'rare',
        claimDeadline: '14 dias'
      },
      {
        id: '5',
        type: 'special',
        name: 'Acesso VIP',
        value: 1200,
        description: 'Acesso exclusivo a cofres premium por 1 mês',
        rarity: 'epic',
        claimDeadline: '3 dias'
      },
      {
        id: '6',
        type: 'product',
        name: 'Fone Bluetooth',
        value: 350,
        description: 'AirPods Pro 2ª geração com cancelamento de ruído',
        rarity: 'common',
        quantity: 1,
        claimDeadline: '15 dias'
      }
    ];
    
    setItems(sampleItems);
  }, []);

  const handleMouseDown = useCallback((itemId: string, event: React.MouseEvent | React.TouchEvent) => {
    if (claimedItems.has(itemId)) return;
    
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
  }, [claimedItems]);

  const startClaimTimer = (itemId: string) => {
    setClaimingItem(itemId);
    setClaimProgress(0);
    
    // Atualizar progresso a cada 30ms (33fps)
    progressTimerRef.current = setInterval(() => {
      setClaimProgress(prev => {
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
    setClaimingItem(null);
    setClaimProgress(0);
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
    setFinalProgress(prev => new Map(prev).set(itemId, 100));
    
    // Marcar como saqueado imediatamente
    setClaimedItems(prev => new Set(prev).add(itemId));
    setClaimingItem(null);
    setClaimProgress(0);
    
    console.log('Item saqueado:', itemId);
    
    // Aguardar 2 segundos e depois remover o item da lista
    setTimeout(() => {
      setItems(prev => prev.filter(p => p.id !== itemId));
      setClaimedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
      // Limpar o progresso final quando remover o item
      setFinalProgress(prev => {
        const newMap = new Map(prev);
        newMap.delete(itemId);
        return newMap;
      });
    }, 2000);
  }, []);

  const handleItemClick = (item: any) => {
    // A lógica de click agora é controlada pelas funções de press-and-hold
    // Não fazemos mais nada no click simples
  };

  return (
    <div className={`min-h-full bg-gray-900 ${className}`}>
      {/* Header */}
      <VaultHeader
        vault={vault}
        onBack={onBack}
        timerLabel={timerLabel}
        closeButtonText={closeButtonText}
        instructionText={instructionText}
      />

      {/* Main Content */}
      <div className="px-4 pb-4">
        

        {/* Items Grid */}
        {items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {items.map((item) => {
              const isBeingClaimed = claimingItem === item.id;
              const isClaimed = claimedItems.has(item.id);
              const currentProgress = isBeingClaimed ? claimProgress : (finalProgress.get(item.id) || 0);

              // Configurações de raridade
              const rarityConfig = {
                common: {
                  color: 'from-violet-400 to-violet-500',
                  border: 'border-violet-400/30',
                  glow: 'shadow-violet-500/20',
                  bg: 'bg-violet-500/10',
                  text: 'text-violet-300',
                  label: 'Comum'
                },
                rare: {
                  color: 'from-violet-500 to-violet-600',
                  border: 'border-violet-400/40',
                  glow: 'shadow-violet-500/25',
                  bg: 'bg-violet-500/15',
                  text: 'text-violet-300',
                  label: 'Raro'
                },
                epic: {
                  color: 'from-purple-500 to-purple-600',
                  border: 'border-purple-400/50',
                  glow: 'shadow-purple-500/30',
                  bg: 'bg-purple-500/20',
                  text: 'text-purple-300',
                  label: 'Épico'
                },
                legendary: {
                  color: 'from-violet-600 to-purple-700',
                  border: 'border-violet-400/60',
                  glow: 'shadow-violet-500/40',
                  bg: 'bg-violet-500/25',
                  text: 'text-violet-200',
                  label: 'Lendário'
                }
              };

              // Configurações de tipo
              const typeConfig = {
                money: {
                  icon: () => <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>,
                  label: 'Dinheiro',
                  color: 'text-violet-400',
                  bg: 'bg-violet-500/10'
                },
                product: {
                  icon: () => <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
                  label: 'Produto',
                  color: 'text-violet-400',
                  bg: 'bg-violet-500/10'
                },
                voucher: {
                  icon: () => <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>,
                  label: 'Vale',
                  color: 'text-violet-400',
                  bg: 'bg-violet-500/10'
                },
                special: {
                  icon: () => <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24"><path d="M5 16L3 5l5.5 2L12 4l3.5 3L21 5l-2 11H5zm2.7-2h8.6l.9-5.4-2.1-.8L12 9l-3.1-1.2-2.1.8L7.7 14z"/></svg>,
                  label: 'Especial',
                  color: 'text-violet-400',
                  bg: 'bg-violet-500/10'
                }
              };

              const rarity = rarityConfig[item.rarity];
              const typeInfo = typeConfig[item.type];
              const ItemIcon = typeInfo.icon;

              return (
                <div
                  key={item.id}
                  className={`relative ${isClaimed ? 'bg-slate-800/30' : 'bg-slate-800/90'} backdrop-blur-sm rounded-3xl p-6 border-2 ${isClaimed ? 'border-slate-600/30' : rarity.border} transition-all duration-300 ${isClaimed ? 'cursor-not-allowed' : 'cursor-pointer'} group ${isClaimed ? 'shadow-slate-500/10' : rarity.glow} select-none`}
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

                  {/* Claimed Overlay */}
                  {isClaimed && (
                    <div className="absolute inset-0 rounded-3xl flex items-center justify-center z-20">
                      <div className="bg-purple-600 rounded-xl px-3 py-2 flex items-center gap-2 animate-[scale-up_0.5s_ease-out]">
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
                  <div className={`relative z-10 w-16 h-16 rounded-2xl ${typeInfo.bg} flex items-center justify-center mb-4 mx-auto ${isClaimed ? 'opacity-30' : ''} transition-transform`}>
                    <div className={`${typeInfo.color} ${isClaimed ? 'opacity-30' : ''}`}>
                      <ItemIcon />
                    </div>
                  </div>

                  {/* Item info */}
                  <div className={`relative z-10 text-center ${isClaimed ? 'opacity-30' : ''}`}>
                    {item.type === 'money' ? (
                      <h3 className="text-2xl font-bold text-violet-400 mb-5">
                        R$ {item.value.toLocaleString()}
                      </h3>
                    ) : (
                      <h3 className="text-xl font-bold text-white mb-5">{item.name}</h3>
                    )}
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    {/* Deadline */}
                    {item.claimDeadline && (
                      <div className="flex items-center justify-center gap-1 text-xs text-slate-500">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z"/>
                        </svg>
                        <span>{item.claimDeadline}</span>
                      </div>
                    )}
                  </div>

                  {/* Claim Progress Indicator */}
                  {isBeingClaimed && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-black/70 backdrop-blur-sm rounded-full px-4 py-2">
                        <div className="text-white text-sm font-medium">
                          {claimProgress >= 100 ? 'SAQUEANDO...' : `${Math.round(claimProgress)}%`}
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
        )}

        {/* Empty State */}
        {items.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-700/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Skull className="h-12 w-12 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Cofre Saqueado!</h3>
            <p className="text-slate-400 text-lg">Você saqueou todos os itens deste cofre!</p>
          </div>
        )}
      </div>

      {/* CSS for scale-up animation */}
      <style>{`
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

export default VaultMain;