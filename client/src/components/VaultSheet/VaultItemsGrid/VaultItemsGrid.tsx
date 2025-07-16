
import React, { useState, useRef } from 'react';
import { Banknote, Gift, CreditCard, Crown, CheckCircle } from 'lucide-react';

interface Item {
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
  items: Item[];
  onClaimItem?: (itemId: string) => void;
  claimingItem?: string | null;
  claimProgress?: number;
  claimedItems?: Set<string>;
  finalProgress?: Map<string, number>;
}

const VaultItemsGrid: React.FC<VaultItemsGridProps> = ({
  items,
  onClaimItem,
  claimingItem,
  claimProgress = 0,
  claimedItems = new Set(),
  finalProgress = new Map()
}) => {
  const [holdingItem, setHoldingItem] = useState<string | null>(null);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const startPositionRef = useRef<{ x: number; y: number } | null>(null);
  const hasMoved = useRef(false);

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

  const handleMouseDown = (e: React.MouseEvent, itemId: string) => {
    if (claimedItems.has(itemId) || claimingItem === itemId) return;
    
    startPositionRef.current = { x: e.clientX, y: e.clientY };
    hasMoved.current = false;
    setHoldingItem(itemId);
    
    holdTimerRef.current = setTimeout(() => {
      if (!hasMoved.current && onClaimItem) {
        onClaimItem(itemId);
      }
    }, 1000);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (startPositionRef.current && holdingItem) {
      const distance = Math.sqrt(
        Math.pow(e.clientX - startPositionRef.current.x, 2) + 
        Math.pow(e.clientY - startPositionRef.current.y, 2)
      );
      
      if (distance > 10) {
        hasMoved.current = true;
        handleMouseUp();
      }
    }
  };

  const handleMouseUp = () => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
    }
    setHoldingItem(null);
    startPositionRef.current = null;
    hasMoved.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent, itemId: string) => {
    if (claimedItems.has(itemId) || claimingItem === itemId) return;
    
    const touch = e.touches[0];
    startPositionRef.current = { x: touch.clientX, y: touch.clientY };
    hasMoved.current = false;
    setHoldingItem(itemId);
    
    holdTimerRef.current = setTimeout(() => {
      if (!hasMoved.current && onClaimItem) {
        onClaimItem(itemId);
      }
    }, 1000);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startPositionRef.current && holdingItem) {
      const touch = e.touches[0];
      const distance = Math.sqrt(
        Math.pow(touch.clientX - startPositionRef.current.x, 2) + 
        Math.pow(touch.clientY - startPositionRef.current.y, 2)
      );
      
      if (distance > 10) {
        hasMoved.current = true;
        handleTouchEnd();
      }
    }
  };

  const handleTouchEnd = () => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
    }
    setHoldingItem(null);
    startPositionRef.current = null;
    hasMoved.current = false;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {items.map((item) => {
        const ItemIcon = typeConfig[item.type].icon;
        const rarity = rarityConfig[item.rarity];
        const isClaimed = claimedItems.has(item.id);
        const isClaiming = claimingItem === item.id;
        const isHolding = holdingItem === item.id;
        const progress = finalProgress.get(item.id) || (isClaiming ? claimProgress : 0);
        
        return (
          <div
            key={item.id}
            className={`relative bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 border-2 ${rarity.border} transition-all duration-300 cursor-pointer group ${rarity.glow} ${
              isHolding ? 'scale-95 shadow-2xl' : 'hover:scale-105'
            } ${isClaimed ? 'opacity-60' : ''}`}
            onMouseDown={(e) => handleMouseDown(e, item.id)}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={(e) => handleTouchStart(e, item.id)}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Progress Circle */}
            {(isClaiming || progress > 0) && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl z-10">
                <div className="relative w-16 h-16">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      className="text-slate-700"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 28}`}
                      strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
                      className="text-violet-400 transition-all duration-100"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
                    {Math.round(progress)}%
                  </div>
                </div>
              </div>
            )}

            {/* Claimed Overlay */}
            {isClaimed && (
              <div className="absolute inset-0 flex items-center justify-center bg-green-500/20 rounded-2xl z-10">
                <div className="bg-green-500 rounded-full p-3">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
              </div>
            )}
            
            {/* Rarity Badge */}
            <div className={`absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-bold ${rarity.bg} ${rarity.text} border ${rarity.border} z-20`}>
              {rarity.label}
            </div>
            
            {/* Item Icon */}
            <div className={`w-16 h-16 rounded-xl ${typeConfig[item.type].bg} flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}>
              <ItemIcon className={`h-8 w-8 ${typeConfig[item.type].color}`} />
            </div>
            
            {/* Item Info */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
              <div className="text-2xl font-bold text-violet-400 mb-3">
                R$ {item.value.toLocaleString()}
              </div>
              <p className="text-slate-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                {item.description}
              </p>
              
              {item.quantity && (
                <div className="text-xs text-slate-500 mb-2">
                  Quantidade: {item.quantity}
                </div>
              )}
              
              {item.claimDeadline && !isClaimed && (
                <div className="text-xs text-orange-400">
                  Válido por {item.claimDeadline}
                </div>
              )}
            </div>
            
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
          </div>
        );
      })}
    </div>
  );
};

export default VaultItemsGrid;
