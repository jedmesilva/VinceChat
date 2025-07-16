import React from 'react';
import { Banknote, Gift, CreditCard, Crown, Clock, Calendar, Package } from 'lucide-react';

interface VaultItem {
  id: string;
  type: 'money' | 'product' | 'voucher' | 'special';
  name: string;
  value: number;
  description: string;
  quantity?: number;
  image?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  status: 'available' | 'claimed' | 'expired';
  claimDeadline?: string;
  claimedAt?: string;
  vaultSource?: string;
  expiresAt?: string;
}

interface VaultItemCardProps {
  item: VaultItem;
  onClick?: (item: VaultItem) => void;
}

const VaultItemCard: React.FC<VaultItemCardProps> = ({ item, onClick }) => {
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

  const statusConfig = {
    available: {
      label: 'Disponível',
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      border: 'border-green-400/50'
    },
    claimed: {
      label: 'Resgatado',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-400/50'
    },
    expired: {
      label: 'Expirado',
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      border: 'border-red-400/50'
    }
  };

  const ItemIcon = typeConfig[item.type].icon;
  const rarity = rarityConfig[item.rarity];
  const status = statusConfig[item.status];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getRemainingDays = (expiresAt: string) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diff = expiry.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div
      onClick={() => onClick?.(item)}
      className={`relative bg-slate-800/90 backdrop-blur-sm rounded-2xl p-4 border-2 ${rarity.border} hover:scale-105 transition-all duration-300 cursor-pointer group ${rarity.glow}`}
    >
      {/* Status Badge */}
      <div className={`absolute top-3 left-3 px-2 py-1 rounded-md text-xs font-bold ${status.bg} ${status.color} border ${status.border} z-10`}>
        {status.label}
      </div>
      
      {/* Rarity Badge */}
      <div className={`absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-bold ${rarity.bg} ${rarity.text} border ${rarity.border} z-10`}>
        {rarity.label}
      </div>
      
      {/* Item Icon */}
      <div className={`w-12 h-12 rounded-xl ${typeConfig[item.type].bg} flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform mt-6`}>
        <ItemIcon className={`h-6 w-6 ${typeConfig[item.type].color}`} />
      </div>
      
      {/* Item Info */}
      <div className="text-center">
        <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
        <div className="text-xl font-bold text-violet-400 mb-2">
          R$ {item.value.toLocaleString()}
        </div>
        <p className="text-slate-400 text-xs mb-3 line-clamp-2 leading-relaxed">
          {item.description}
        </p>
        
        {/* Additional Info */}
        <div className="space-y-1">
          {item.vaultSource && (
            <div className="flex items-center justify-center gap-1 text-xs text-slate-500">
              <Crown className="h-3 w-3" />
              <span>{item.vaultSource}</span>
            </div>
          )}
          
          {item.status === 'available' && item.expiresAt && (
            <div className="flex items-center justify-center gap-1 text-xs text-orange-400">
              <Clock className="h-3 w-3" />
              <span>{getRemainingDays(item.expiresAt)} dias restantes</span>
            </div>
          )}
          
          {item.status === 'claimed' && item.claimedAt && (
            <div className="flex items-center justify-center gap-1 text-xs text-green-400">
              <Calendar className="h-3 w-3" />
              <span>Resgatado em {formatDate(item.claimedAt)}</span>
            </div>
          )}
          
          {item.quantity && (
            <div className="flex items-center justify-center gap-1 text-xs text-slate-500">
              <Package className="h-3 w-3" />
              <span>Qtd: {item.quantity}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
    </div>
  );
};

export default VaultItemCard;