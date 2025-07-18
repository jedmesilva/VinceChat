import React, { useState } from 'react';
import { 
  Banknote, 
  Gift, 
  Crown, 
  Star, 
  CreditCard,
  Package,
  Shield,
  Zap
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
  status: 'available' | 'claimed' | 'expired';
  claimDeadline?: string;
  claimedAt?: string;
  vaultSource?: string;
  expiresAt?: string;
}

interface ItemCardProps {
  item: VaultItem;
  className?: string;
  showFullDescription?: boolean;
  onToggleDescription?: (show: boolean) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ 
  item, 
  className = "",
  showFullDescription = false,
  onToggleDescription
}) => {
  const [internalShowDescription, setInternalShowDescription] = useState(false);

  // Usar estado interno se não for controlado externamente
  const isDescriptionExpanded = onToggleDescription ? showFullDescription : internalShowDescription;
  
  const handleToggleDescription = () => {
    const newState = !isDescriptionExpanded;
    if (onToggleDescription) {
      onToggleDescription(newState);
    } else {
      setInternalShowDescription(newState);
    }
  };

  // Configurações de raridade
  const rarityConfig = {
    common: {
      color: 'from-slate-600 to-slate-700',
      border: 'border-slate-400/50',
      bg: 'bg-slate-500/10',
      text: 'text-slate-300',
      label: 'Comum',
      icon: Shield
    },
    rare: {
      color: 'from-violet-600 to-violet-700',
      border: 'border-violet-400/50',
      bg: 'bg-violet-500/10',
      text: 'text-violet-300',
      label: 'Raro',
      icon: Shield
    },
    epic: {
      color: 'from-violet-600 to-violet-700',
      border: 'border-violet-400/50',
      bg: 'bg-violet-500/10',
      text: 'text-violet-300',
      label: 'Épico',
      icon: Zap
    },
    legendary: {
      color: 'from-violet-600 to-violet-700',
      border: 'border-violet-400/50',
      bg: 'bg-violet-500/10',
      text: 'text-violet-300',
      label: 'Lendário',
      icon: Star
    }
  };

  // Configurações de tipo
  const typeConfig = {
    money: {
      icon: Banknote,
      label: 'Dinheiro',
      color: 'text-violet-400',
      bg: 'bg-violet-500/10'
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
      color: 'text-violet-400',
      bg: 'bg-violet-500/10'
    },
    special: {
      icon: Crown,
      label: 'Especial',
      color: 'text-violet-400',
      bg: 'bg-violet-500/10'
    }
  };

  // Configurações de status
  const statusConfig = {
    available: {
      label: 'Disponível',
      color: 'text-violet-400',
      bg: 'bg-violet-500/10',
      border: 'border-violet-400/50'
    },
    claimed: {
      label: 'Resgatado',
      color: 'text-violet-400',
      bg: 'bg-violet-500/10',
      border: 'border-violet-400/50'
    },
    expired: {
      label: 'Expirado',
      color: 'text-slate-400',
      bg: 'bg-slate-500/10',
      border: 'border-slate-400/50'
    }
  };

  const ItemIcon = typeConfig[item.type].icon;
  const rarity = rarityConfig[item.rarity];
  const status = statusConfig[item.status];

  const formatValue = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className={`bg-slate-800/95 backdrop-blur-md rounded-3xl p-6 md:p-8 border ${rarity.border} ${className}`}>
      {/* Badges */}
      <div className="flex justify-between items-center mb-6">
        <div className={`px-4 py-2 rounded-full border ${status.border} ${status.bg} backdrop-blur-sm`}>
          <span className={`text-sm font-medium ${status.color}`}>{status.label}</span>
        </div>
        <div className={`px-4 py-2 rounded-full border ${rarity.border} ${rarity.bg} backdrop-blur-sm`}>
          <div className="flex items-center gap-2">
            <rarity.icon className={`h-4 w-4 ${rarity.text}`} />
            <span className={`text-sm font-medium ${rarity.text}`}>{rarity.label}</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Item Visual */}
        <div className="flex-shrink-0">
          <div className="relative">
            {item.image ? (
              <img 
                src={item.image} 
                alt={item.name}
                className={`w-40 h-40 rounded-2xl object-cover border-2 ${rarity.border}`}
              />
            ) : (
              <div className={`w-40 h-40 rounded-2xl ${typeConfig[item.type].bg} flex items-center justify-center border-2 ${rarity.border}`}>
                <ItemIcon className={`h-20 w-20 ${typeConfig[item.type].color}`} />
              </div>
            )}
          </div>
        </div>

        {/* Item Info */}
        <div className="flex-1">
          <div className="mb-4">
            <h2 className="text-3xl font-bold text-white mb-2">{item.name}</h2>
            <div className="flex items-center gap-3 text-sm text-slate-400 mb-3">
              <span className={`px-3 py-1 rounded-lg ${typeConfig[item.type].bg} ${typeConfig[item.type].color} font-medium`}>
                {typeConfig[item.type].label}
              </span>
              {item.quantity && (
                <span className="flex items-center gap-1">
                  <Package className="h-3 w-3" />
                  Qtd: {item.quantity}
                </span>
              )}
              {item.vaultSource && (
                <span className="text-slate-500">
                  • {item.vaultSource}
                </span>
              )}
            </div>
          </div>

          {/* Descrição */}
          <div className="space-y-3">
            <p className="text-slate-300 leading-relaxed">
              {isDescriptionExpanded ? item.description : `${item.description.substring(0, 200)}...`}
            </p>
            {item.description.length > 200 && (
              <button 
                onClick={handleToggleDescription}
                className="text-violet-400 hover:text-violet-300 text-sm font-medium transition-all duration-200"
              >
                {isDescriptionExpanded ? 'Ver menos' : 'Ver mais'}
              </button>
            )}
          </div>

          {/* Informações adicionais */}
          {item.expiresAt && (
            <div className="mt-4 pt-4 border-t border-slate-700/50">
              <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1">
                  <Package className="h-3 w-3" />
                  Expira: {new Date(item.expiresAt).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
export type { VaultItem, ItemCardProps };