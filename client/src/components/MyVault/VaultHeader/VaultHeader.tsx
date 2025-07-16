import React from 'react';
import { Lock, History, X } from 'lucide-react';

interface VaultHeaderProps {
  showHistory: boolean;
  onToggleHistory: () => void;
}

const VaultHeader: React.FC<VaultHeaderProps> = ({ 
  showHistory, 
  onToggleHistory 
}) => {
  return (
    <div className="flex items-center justify-between mb-4 gap-4">
      {/* Left side with icon and title */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-7 h-7 bg-violet-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <Lock className="h-4 w-4 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white leading-tight">
          {showHistory ? 'Histórico do Cofre' : 'Meu Cofre'}
        </h1>
      </div>
      
      {/* Right side with button */}
      <div className="flex-shrink-0">
        <button
          onClick={onToggleHistory}
          className="p-2 bg-slate-800/80 hover:bg-slate-700/80 rounded-lg transition-all duration-200 border border-slate-600/30 hover:border-slate-500/50"
          title={showHistory ? 'Voltar aos prêmios' : 'Ver histórico'}
        >
          {showHistory ? (
            <X className="h-4 w-4 text-slate-400 hover:text-white" />
          ) : (
            <History className="h-4 w-4 text-slate-400 hover:text-white" />
          )}
        </button>
      </div>
    </div>
  );
};

export default VaultHeader;