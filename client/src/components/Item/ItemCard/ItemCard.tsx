import React, { useState } from 'react';
import { 
  Banknote, 
  Gift, 
  CreditCard,
  Crown,
  CheckCircle,
  Clock,
  X,
  Calendar,
  Package,
  Shield,
  Zap,
  Star
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

interface VaultItemCardProps {
  item: VaultItem;
  onItemClick?: (item: VaultItem) => void;
  className?: string;
}

const VaultItemCard: React.FC<VaultItemCardProps> = ({
  item,
  onItemClick,
  className = ''
}) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const toggleDescription = () => {
    setIsDescriptionExpanded(prev => !prev);
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleItemClick = () => {
    if (onItemClick && item.status === 'available') {
      onItemClick(item);
    }
  };

  const ItemIcon = typeConfig[item.type].icon;
  const rarity = rarityConfig[item.rarity];
  const status = statusConfig[item.status];
  const isExpired = item.status === 'expired';
  const isClaimed = item.status === 'claimed';
  const isClickable = onItemClick && item.status === 'available';

  return (
    <div
      onClick={handleItemClick}
      className={`bg-slate-800/95 backdrop-blur-md rounded-3xl p-6 border ${rarity.border} ${isClickable ? 'cursor-pointer hover:scale-105' : isExpired || isClaimed ? 'cursor-not-allowed' : 'cursor-default'} transition-all duration-300 group relative ${className}`}
    >
      {/* Claimed/Expired Overlay */}
      {(isClaimed || isExpired) && (
        <div className="absolute inset-0 rounded-3xl flex items-center justify-center z-20">
          <div 
            className={`${isClaimed ? 'bg-purple-600' : 'bg-red-600'} rounded-xl px-3 py-2 flex items-center gap-2`}
          >
            {isClaimed ? (
              <CheckCircle className="h-5 w-5 text-white" />
            ) : (
              <X className="h-5 w-5 text-white" />
            )}
            <div className="text-white font-bold text-sm">
              {isClaimed ? 'RESGATADO' : 'EXPIRADO'}
            </div>
          </div>
        </div>
      )}

      {/* Item Visual */}
      <div className={`flex justify-center mb-6 ${isExpired || isClaimed ? 'opacity-30' : ''}`}>
        {item.image ? (
          <img 
            src={item.image} 
            alt={item.name}
            className={`w-24 h-24 rounded-2xl object-cover border-2 ${rarity.border}`}
          />
        ) : (
          <div className={`w-24 h-24 rounded-2xl ${typeConfig[item.type].bg} flex items-center justify-center`}>
            <ItemIcon className={`h-12 w-12 ${typeConfig[item.type].color}`} />
          </div>
        )}
      </div>

      {/* Item Info */}
      <div className={`text-center ${isExpired || isClaimed ? 'opacity-30' : ''}`}>
        <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
        
        <div className="flex items-center justify-center gap-3 text-sm text-slate-400 mb-3">
          <span className={`px-3 py-1 rounded-lg ${typeConfig[item.type].bg} ${typeConfig[item.type].color} font-medium`}>
            {typeConfig[item.type].label}
          </span>

          {item.vaultSource && (
            <span className="text-slate-500">
              • {item.vaultSource}
            </span>
          )}
        </div>

        {/* Descrição */}
        <div className="space-y-3 mb-4">
          <p className="text-slate-300 leading-relaxed text-sm">
            {isDescriptionExpanded ? item.description : `${item.description.substring(0, 100)}...`}
          </p>
          {item.description.length > 100 && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                toggleDescription();
              }}
              className="text-violet-400 hover:text-violet-300 text-sm font-medium transition-all duration-200"
            >
              {isDescriptionExpanded ? 'Ver menos' : 'Ver mais'}
            </button>
          )}
        </div>

        {/* Informações adicionais */}
        {(item.expiresAt || item.quantity || item.claimedAt) && (
          <div className="pt-4 border-t border-slate-700/50">
            <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400">
              {item.status === 'available' && item.expiresAt && (
                <span className="flex items-center gap-1 text-orange-400">
                  <Clock className="h-3 w-3" />
                  Válido até {formatDate(item.expiresAt)}
                </span>
              )}
              
              {item.status === 'claimed' && item.claimedAt && (
                <span className="flex items-center gap-1 text-green-400">
                  <Calendar className="h-3 w-3" />
                  Resgatado em {formatDate(item.claimedAt)}
                </span>
              )}
              
              {item.quantity && (
                <span className="flex items-center gap-1">
                  <Package className="h-3 w-3" />
                  Qtd: {item.quantity}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Demo component to showcase the VaultItemCard
const Demo = () => {
  const sampleItems: VaultItem[] = [
    {
      id: '1',
      type: 'money',
      name: 'Baú de Moedas',
      value: 1000,
      description: 'Uma quantia generosa em moedas douradas coletadas dos cofres mais raros do reino. Perfeito para expandir seu inventário.',
      rarity: 'common',
      status: 'available',
      vaultSource: 'Cofre Básico',
      expiresAt: '2025-08-15'
    },
    {
      id: '2',
      type: 'product',
      name: 'Smartphone Premium',
      value: 2500,
      description: 'O mais recente modelo com todas as funcionalidades avançadas, incluindo câmera profissional e processamento de última geração.',
      rarity: 'epic',
      status: 'claimed',
      vaultSource: 'Cofre Épico',
      claimedAt: '2025-07-10'
    },
    {
      id: '3',
      type: 'voucher',
      name: 'Vale Compras',
      value: 500,
      description: 'Válido em diversas lojas parceiras para você escolher exatamente o que precisa.',
      rarity: 'rare',
      status: 'available',
      vaultSource: 'Cofre Raro',
      expiresAt: '2025-12-31'
    },
    {
      id: '4',
      type: 'special',
      name: 'Coroa Dourada',
      value: 5000,
      description: 'Item especial de prestígio único que demonstra sua habilidade e sorte excepcionais.',
      rarity: 'legendary',
      status: 'expired',
      vaultSource: 'Cofre Lendário'
    }
  ];

  const handleItemClick = (item: VaultItem) => {
    alert(`Você clicou em: ${item.name}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          VaultItemCard - Componente Individual
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleItems.map((item) => (
            <VaultItemCard
              key={item.id}
              item={item}
              onItemClick={handleItemClick}
            />
          ))}
        </div>
        
        <div className="mt-12 bg-slate-800/50 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Como usar:</h2>
          <div className="bg-slate-900 rounded-lg p-4 text-sm">
            <pre className="text-green-400 whitespace-pre-wrap">
{`import VaultItemCard from './VaultItemCard';

// Uso básico
<VaultItemCard 
  item={vaultItem} 
  onItemClick={(item) => console.log('Clicou em:', item.name)}
/>

// Com className customizada
<VaultItemCard 
  item={vaultItem} 
  className="shadow-lg"
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;