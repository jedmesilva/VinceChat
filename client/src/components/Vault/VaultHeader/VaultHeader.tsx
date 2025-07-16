import React from 'react';
import { Crown, Target } from 'lucide-react';
import VaultTimer from '../../../components/Vault/VaultTimer/VaultTimer';

interface VaultHeaderProps {
  vault: {
    id: string;
    name: string;
    prizeAmount: number;
    difficulty: 'easy' | 'medium' | 'hard' | 'legendary';
    description?: string;
  };
  onBack: () => void;
  timerLabel?: string;
  closeButtonText?: string;
  instructionText?: string;
  className?: string;
}

const VaultHeader: React.FC<VaultHeaderProps> = ({
  vault,
  onBack,
  timerLabel = "Cofre aberto",
  closeButtonText = "Sair",
  instructionText = "Mantenha pressionado por 3 segundos para saquear o item",
  className = ""
}) => {
  return (
    <div className={`relative z-10 p-6 ${className}`}>
      {/* Title and Description */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-violet-500 rounded-lg flex items-center justify-center">
            <Crown className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">
            {vault.name}
          </h1>
        </div>
        {vault.description && (
          <p className="text-slate-400 text-base max-w-3xl leading-relaxed ml-11">
            {vault.description}
          </p>
        )}
      </div>
      
      {/* Divider */}
      <div className="border-t border-slate-700/50 mb-6"></div>
      
      {/* Vault Timer */}
      <div className="mb-6">
        <VaultTimer 
          onClose={onBack}
          closeButtonText={closeButtonText}
          timerLabel={timerLabel}
        />
      </div>
      
      {/* Instruction Card */}
      <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-6 border border-violet-500/20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-violet-500/20 rounded-full flex items-center justify-center flex-shrink-0">
            <Target className="h-6 w-6 text-violet-400" />
          </div>
          <div>
            <p className="text-slate-300 text-sm">
              {instructionText.split('3 segundos').map((part, index) => (
                <span key={index}>
                  {part}
                  {index === 0 && <span className="font-bold text-violet-400">3 segundos</span>}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultHeader;