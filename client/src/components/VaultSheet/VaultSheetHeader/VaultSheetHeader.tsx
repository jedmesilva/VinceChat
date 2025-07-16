import React from 'react';
import { X, Shield, Zap, AlertCircle, Star } from 'lucide-react';

interface VaultSheetHeaderProps {
  vaultName: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'legendary';
  onClose: () => void;
}

const VaultSheetHeader: React.FC<VaultSheetHeaderProps> = ({ 
  vaultName, 
  difficulty, 
  onClose 
}) => {
  const difficultyConfig = {
    easy: { 
      color: 'from-emerald-600 to-emerald-700', 
      border: 'border-emerald-400/50',
      glow: 'shadow-emerald-500/30',
      icon: Shield,
      label: 'Fácil',
      bgAccent: 'bg-emerald-500/10'
    },
    medium: { 
      color: 'from-violet-600 to-violet-700', 
      border: 'border-violet-400/50',
      glow: 'shadow-violet-500/30',
      icon: Zap,
      label: 'Médio',
      bgAccent: 'bg-violet-500/10'
    },
    hard: { 
      color: 'from-red-600 to-red-700', 
      border: 'border-red-400/50',
      glow: 'shadow-red-500/30',
      icon: AlertCircle,
      label: 'Difícil',
      bgAccent: 'bg-red-500/10'
    },
    legendary: { 
      color: 'from-amber-500 to-yellow-600', 
      border: 'border-yellow-400/50',
      glow: 'shadow-yellow-500/30',
      icon: Star,
      label: 'Lendário',
      bgAccent: 'bg-yellow-500/10'
    }
  };

  const currentConfig = difficultyConfig[difficulty];

  return (
    <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
      <div className="flex items-center gap-3">
        <div className={`px-3 py-1.5 rounded-full border ${currentConfig.border} ${currentConfig.bgAccent} backdrop-blur-sm`}>
          <div className="flex items-center gap-2">
            <currentConfig.icon className="h-4 w-4 text-slate-300" />
            <span className="text-sm font-medium text-slate-300">{currentConfig.label}</span>
          </div>
        </div>
        <h2 className="text-xl font-bold text-white">{vaultName}</h2>
      </div>
      
      <button
        onClick={onClose}
        className="w-8 h-8 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg flex items-center justify-center transition-colors"
      >
        <X className="w-5 h-5 text-slate-300" />
      </button>
    </div>
  );
};

export default VaultSheetHeader;