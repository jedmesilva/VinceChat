import React from 'react';
import { Clock, Plus } from 'lucide-react';

interface InsufficientTimeCardProps {
  onAddTime?: () => void;
  className?: string;
  vaultName?: string;
}

const InsufficientTimeCard: React.FC<InsufficientTimeCardProps> = ({ 
  onAddTime = () => {},
  className = "",
  vaultName = "Tesouro Pirata"
}) => {
  return (
    <div className={`p-4 bg-slate-800 border-t border-slate-700/30 ${className}`}>
      <div className="bg-slate-700 rounded-3xl p-6">
        <div className="flex gap-3 mb-6">
          <div className="w-12 h-12 bg-red-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Clock className="w-6 h-6 text-red-400" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-base font-medium text-white mb-2">
              Tempo insuficiente
            </h3>
            
            <p className="text-slate-400 text-xs">
              Adicione mais tempo para continuar sua ofensiva ao cofre {vaultName}
            </p>
          </div>
        </div>
        
        <button
          onClick={onAddTime}
          className="w-full bg-violet-500 hover:bg-violet-400 active:bg-violet-600 text-white py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Adicionar Tempo
        </button>
      </div>
    </div>
  );
};

export default InsufficientTimeCard;