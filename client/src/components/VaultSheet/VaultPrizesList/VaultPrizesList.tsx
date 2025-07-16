import React, { useState } from 'react';
import { Gift, DollarSign, Trophy, Award, ChevronDown, ChevronUp } from 'lucide-react';

interface Prize {
  id: string;
  name: string;
  type: 'money' | 'item' | 'trophy' | 'gift';
  value?: number;
}

interface VaultPrizesListProps {
  prizes: Prize[];
}

const VaultPrizesList: React.FC<VaultPrizesListProps> = ({ prizes }) => {
  const [showAllPrizes, setShowAllPrizes] = useState(false);

  const getPrizeIcon = (type: string) => {
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

  const getPrizeDisplay = (prize: Prize) => {
    if (prize.type === 'money' && prize.value) {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0
      }).format(prize.value);
    }
    return prize.name;
  };

  const visiblePrizes = showAllPrizes ? prizes : prizes.slice(0, 3);
  const hasMorePrizes = prizes.length > 3;

  return (
    <div className="bg-slate-800/50 backdrop-blur-md rounded-3xl p-6 border border-slate-700/50">
      <h3 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center gap-2">
        <Gift className="h-6 w-6 text-violet-400" />
        Prêmios Disponíveis
      </h3>
      
      <div className="space-y-4">
        {visiblePrizes.map((prize) => {
          const PrizeIcon = getPrizeIcon(prize.type);
          return (
            <div key={prize.id} className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-2xl border border-slate-600/30">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center">
                  <PrizeIcon className="h-6 w-6 text-violet-400" />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="text-lg font-semibold text-white">
                  {getPrizeDisplay(prize)}
                </div>
                {prize.type === 'money' && (
                  <div className="text-sm text-slate-400">
                    Valor em dinheiro
                  </div>
                )}
              </div>
            </div>
          );
        })}
        
        {hasMorePrizes && (
          <button
            onClick={() => setShowAllPrizes(!showAllPrizes)}
            className="w-full mt-4 py-3 bg-slate-700/50 hover:bg-slate-700/70 active:bg-slate-700/90 text-slate-300 hover:text-white rounded-xl transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95"
          >
            {showAllPrizes ? (
              <>
                Ver menos
                <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                Ver mais ({prizes.length - 3} prêmios)
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default VaultPrizesList;