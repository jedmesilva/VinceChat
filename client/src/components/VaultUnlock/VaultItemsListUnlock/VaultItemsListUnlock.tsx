import React, { useState } from 'react';
import { DollarSign, Gift, Award, Trophy, ChevronDown, ChevronUp } from 'lucide-react';

interface Item {
  id: string;
  name: string;
  type: 'money' | 'item' | 'trophy' | 'gift';
  value?: number;
}

interface VaultItemsListUnlockProps {
  prizes: Item[];
  difficulty: 'easy' | 'medium' | 'hard' | 'legendary';
}

const VaultItemsListUnlock: React.FC<VaultItemsListUnlockProps> = ({ prizes, difficulty }) => {
  const [showAllItems, setShowAllItems] = useState(false);

  // Função para obter o ícone do item
  const getItemIcon = (type: string) => {
    switch (type) {
      case 'money':
        return DollarSign;
      case 'trophy':
        return Trophy;
      case 'gift':
        return Gift;
      default:
        return Award;
    }
  };

  // Função para formatar o nome/valor do item
  const getItemDisplay = (item: Item) => {
    if (item.type === 'money' && item.value) {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0
      }).format(item.value);
    }
    return item.name;
  };

  // Determinar quantos itens mostrar
  const visibleItems = showAllItems ? prizes : prizes.slice(0, 3);
  const hasMoreItems = prizes.length > 3;

  return (
    <div className="flex-1 max-w-md w-full">
      <div className="bg-slate-800/50 backdrop-blur-md rounded-3xl p-6 border border-slate-700/50">
        <h3 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center gap-2">
          <Gift className="h-6 w-6 text-violet-400" />
          Itens Disponíveis
        </h3>
        <div className="space-y-4">
          {visibleItems.map((item, index) => {
            const ItemIcon = getItemIcon(item.type);
            return (
              <div key={item.id} className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-2xl border border-slate-600/30">
                {/* Ícone do item */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center">
                    <ItemIcon className="h-6 w-6 text-violet-400" />
                  </div>
                </div>
                
                {/* Nome/Valor do item */}
                <div className="flex-1">
                  <div className="text-lg font-semibold text-white">
                    {getItemDisplay(item)}
                  </div>
                  {item.type === 'money' && (
                    <div className="text-sm text-slate-400">
                      Valor em dinheiro
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          
          {/* Botão Ver Mais */}
          {hasMoreItems && (
            <button
              onClick={() => setShowAllItems(!showAllItems)}
              className="w-full mt-4 py-3 bg-slate-700/50 hover:bg-slate-700/70 active:bg-slate-700/90 text-slate-300 hover:text-white rounded-xl transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95"
            >
              {showAllItems ? (
                <>
                  Ver menos
                  <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Ver mais ({vault.items.length - 3} itens)
                  <ChevronDown className="h-4 w-4" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VaultItemsListUnlock;