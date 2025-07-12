import React from 'react';
import { Lock, DollarSign, Eye, EyeOff } from 'lucide-react';

interface Prize {
  id: number;
  amount: string;
  type: string;
  rarity: string;
}

interface VaultSidebarProps {
  user: {
    name: string;
    vaultItems?: number;
  };
  prizes: Prize[];
  showItems: boolean;
  onToggleShowItems: () => void;
}

const VaultSidebar: React.FC<VaultSidebarProps> = ({ 
  user, 
  prizes, 
  showItems, 
  onToggleShowItems 
}) => {

  return (
    <div className="h-full flex flex-col relative z-10 bg-slate-800">

      {/* Header - Fixed */}
      <div className="flex-shrink-0 bg-slate-800 border-b border-slate-700 p-4 w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-violet-500/20 rounded-xl flex items-center justify-center border border-violet-500/30">
              <Lock className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">Meu Cofre</h1>
              <p className="text-sm text-slate-400">{prizes.length} itens</p>
            </div>
          </div>

          <button 
            onClick={onToggleShowItems}
            className="w-9 h-9 bg-slate-700 rounded-full flex items-center justify-center hover:bg-slate-600 border border-slate-600"
          >
            {showItems ? (
              <Eye className="w-5 h-5 text-white" />
            ) : (
              <EyeOff className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Items List - Scrollable */}
      <div className="flex-1 overflow-y-auto relative z-10">
        <div className="p-4">
          <div className="space-y-3">
            {prizes.map((prize) => (
              <div 
                key={prize.id}
                className="relative bg-slate-700 rounded-2xl p-4 border border-violet-500/30"
              >
                {!showItems ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="flex items-center space-x-2">
                      <EyeOff className="w-5 h-5 text-white" />
                      <span className="text-white font-medium">Item escondido</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-violet-500 rounded-xl flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white">{prize.amount}</h3>
                      <p className="text-sm text-slate-400">{prize.type}</p>
                    </div>

                    {/* Rarity badge */}
                    <div className="px-3 py-1 rounded-full text-xs font-bold bg-violet-500 text-white">
                      {prize.rarity}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default VaultSidebar;