import React from 'react';
import { Gem } from 'lucide-react';

interface ItemLootedCardProps {
  userName?: string;
  itemName?: string;
  itemIcon?: string;
  itemRarity?: 'common' | 'rare' | 'epic' | 'legendary';
  timestamp?: Date;
  className?: string;
}

const ItemLootedCard: React.FC<ItemLootedCardProps> = ({ 
  userName = 'Alguém',
  itemName = 'um item',
  itemIcon = '📦',
  itemRarity = 'common',
  timestamp = new Date(),
  className = "" 
}) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'agora';
    if (diffMins < 60) return `${diffMins}m atrás`;
    if (diffHours < 24) return `${diffHours}h atrás`;
    return `${diffDays}d atrás`;
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-slate-400 bg-slate-500/20';
      case 'rare': return 'text-blue-400 bg-blue-500/20';
      case 'epic': return 'text-purple-400 bg-purple-500/20';
      case 'legendary': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-slate-400 bg-slate-500/20';
    }
  };

  return (
    <div className={`flex justify-center mb-4 ${className}`}>
      <div className="max-w-md px-4 py-3 rounded-2xl border border-violet-500/30 bg-violet-500/10">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-slate-700/50 rounded-xl flex items-center justify-center">
              <Gem className="w-4 h-4 text-violet-400" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="text-sm leading-relaxed">
              <span>
                <span className="font-medium text-violet-400">{userName}</span>
                <span className="text-slate-300"> saqueou </span>
                <span className={`font-medium ${getRarityColor(itemRarity).split(' ')[0]}`}>
                  {itemName}
                </span>
              </span>
            </div>
            
            <div className="mt-2 flex items-center gap-2">
              <div className={`
                px-2 py-1 rounded-lg text-xs font-medium
                ${getRarityColor(itemRarity)}
              `}>
                {itemIcon} {itemRarity.toUpperCase()}
              </div>
            </div>
            
            <div className="text-xs text-slate-500 mt-1">
              {formatTime(timestamp)} • {formatTimeAgo(timestamp)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemLootedCard;