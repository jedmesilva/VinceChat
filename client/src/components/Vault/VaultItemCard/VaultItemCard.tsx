import React, { useCallback, useRef } from 'react';
import { 
  Banknote, 
  Gift, 
  CreditCard,
  Crown,
  Clock,
  Skull
} from 'lucide-react';

interface VaultItem {
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

interface VaultItemCardProps {
  item: VaultItem;
  isBeingClaimed: boolean;
  isClaimed: boolean;
  claimProgress: number;
  finalProgress: number;
  onMouseDown: (itemId: string, event: React.MouseEvent | React.TouchEvent) => void;
  onMouseMove: (event: React.MouseEvent | React.TouchEvent) => void;
  onMouseUp: () => void;
}

const VaultItemCard: React.FC<VaultItemCardProps> = ({
  item,
  isBeingClaimed,
  isClaimed,
  claimProgress,
  finalProgress,
  onMouseDown,
  onMouseMove,
  onMouseUp
}) => {
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

  const ItemIcon = typeConfig[item.type].icon;
  const rarity = rarityConfig[item.rarity];
  const currentProgress = isBeingClaimed ? claimProgress : finalProgress;

  return (
    <div
      className={`relative ${isClaimed ? 'bg-slate-800/30' : 'bg-slate-800/90'} backdrop-blur-sm rounded-3xl p-6 border-2 ${isClaimed ? 'border-slate-600/30' : rarity.border} ${isClaimed ? '' : 'hover:scale-105'} transition-all duration-300 ${isClaimed ? 'cursor-not-allowed' : 'cursor-pointer'} group ${isClaimed ? 'shadow-slate-500/10' : rarity.glow} select-none`}
      onMouseDown={isClaimed ? undefined : (e) => onMouseDown(item.id, e)}
      onMouseMove={isClaimed ? undefined : onMouseMove}
      onMouseUp={isClaimed ? undefined : onMouseUp}
      onMouseLeave={isClaimed ? undefined : onMouseUp}
      onTouchStart={isClaimed ? undefined : (e) => onMouseDown(item.id, e)}
      onTouchMove={isClaimed ? undefined : onMouseMove}
      onTouchEnd={isClaimed ? undefined : onMouseUp}
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
          <div className="bg-purple-600 rounded-xl px-3 py-2 flex items-center gap-2 animate-pulse">
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
};

export default VaultItemCard;