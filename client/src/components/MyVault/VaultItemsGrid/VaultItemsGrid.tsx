import React from 'react';
import VaultItemCard from '../VaultItemCard/VaultItemCard';
import { History, Package } from 'lucide-react';

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

interface VaultItemsGridProps {
  items: VaultItem[];
  showHistory: boolean;
  onItemClick?: (item: VaultItem) => void;
}

const VaultItemsGrid: React.FC<VaultItemsGridProps> = ({ 
  items, 
  showHistory, 
  onItemClick 
}) => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <VaultItemCard 
            key={item.id} 
            item={item} 
            onClick={onItemClick} 
          />
        ))}
      </div>

      {/* Empty State */}
      {items.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-slate-700/30 rounded-full flex items-center justify-center mx-auto mb-6">
            {showHistory ? (
              <History className="h-12 w-12 text-slate-400" />
            ) : (
              <Package className="h-12 w-12 text-slate-400" />
            )}
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            {showHistory ? 'Nenhum item no histórico' : 'Nenhum item disponível'}
          </h3>
          <p className="text-slate-400 text-lg">
            {showHistory 
              ? 'Seus itens resgatados aparecerão aqui' 
              : 'Saqueie cofres para obter itens!'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default VaultItemsGrid;