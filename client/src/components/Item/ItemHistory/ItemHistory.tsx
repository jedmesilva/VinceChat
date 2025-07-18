import React, { useState } from 'react';
import { 
  History,
  ChevronDown,
  ChevronUp,
  Skull,
  Crown,
  CheckCircle,
  Package
} from 'lucide-react';

interface ItemHistoryEvent {
  date: string;
  action: string;
  details: string;
  actionType: 'origin' | 'looted' | 'claimed' | 'added';
}

interface ItemHistoryProps {
  itemHistory?: ItemHistoryEvent[];
  className?: string;
}

const ItemHistory: React.FC<ItemHistoryProps> = ({ 
  itemHistory = [], 
  className = "" 
}) => {
  const [showHistory, setShowHistory] = useState(false);

  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case 'origin':
        return (
          <div className="bg-violet-500/20 p-1.5 rounded-lg">
            <Crown className="h-4 w-4 text-violet-400" />
          </div>
        );
      case 'looted':
        return (
          <div className="bg-violet-500/20 p-1.5 rounded-lg">
            <Skull className="h-4 w-4 text-violet-400" />
          </div>
        );
      case 'claimed':
        return (
          <div className="bg-violet-500/20 p-1.5 rounded-lg">
            <CheckCircle className="h-4 w-4 text-violet-400" />
          </div>
        );
      case 'added':
        return (
          <div className="bg-violet-500/20 p-1.5 rounded-lg">
            <Package className="h-4 w-4 text-violet-400" />
          </div>
        );
      default:
        return <div className="w-2 h-2 bg-violet-400 rounded-full" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Se não há histórico, não renderiza o componente
  if (!itemHistory || itemHistory.length === 0) {
    return null;
  }

  return (
    <div className={`bg-slate-800/95 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-slate-700/50 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center">
            <History className="h-6 w-6 text-violet-400" />
          </div>
          <h3 className="text-2xl font-bold text-white">Histórico do Item</h3>
        </div>
        <button 
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center gap-2 text-violet-400 hover:text-violet-300 text-sm font-medium transition-all duration-200"
        >
          {showHistory ? (
            <>
              <span>Ocultar</span>
              <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              <span>Mostrar</span>
              <ChevronDown className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
      
      <div className="space-y-4">
        {/* Sempre mostrar a origem do item (último item do histórico) */}
        {itemHistory.length > 0 && (
          <div className="flex items-start gap-4 p-4 bg-slate-700/30 rounded-2xl border border-slate-600/30">
            <div className="mt-1 flex-shrink-0">
              {getActionIcon(itemHistory[itemHistory.length - 1].actionType)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-white text-lg">{itemHistory[itemHistory.length - 1].action}</span>
                <span className="text-xs text-slate-400 bg-slate-600/30 px-2 py-1 rounded-md">
                  {formatDate(itemHistory[itemHistory.length - 1].date)}
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed">{itemHistory[itemHistory.length - 1].details}</p>
            </div>
          </div>
        )}
        
        {/* Mostrar o resto do histórico quando expandido */}
        {showHistory && itemHistory.length > 1 && (
          <>
            {itemHistory.slice(0, -1).map((event, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-slate-700/30 rounded-2xl border border-slate-600/30">
                <div className="mt-1 flex-shrink-0">
                  {getActionIcon(event.actionType)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-white text-lg">{event.action}</span>
                    <span className="text-xs text-slate-400 bg-slate-600/30 px-2 py-1 rounded-md">
                      {formatDate(event.date)}
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{event.details}</p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ItemHistory;