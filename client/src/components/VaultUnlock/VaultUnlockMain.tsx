import React, { useState } from 'react';
import { Crown, Gift } from 'lucide-react';
import VaultUnlockForm from './VaultUnlockForm/VaultUnlockForm';
import VaultItemsListUnlock from './VaultItemsListUnlock/VaultItemsListUnlock';

interface VaultUnlockProps {
  vault: {
    id: string;
    name: string;
    prizeAmount: number;
    difficulty: 'easy' | 'medium' | 'hard' | 'legendary';
    prizes: Array<{
      id: string;
      name: string;
      type: 'money' | 'item' | 'trophy' | 'gift';
      value?: number;
    }>;
  };
  onBack: () => void;
  onSuccess: () => void;
}

const VaultUnlockMain: React.FC<VaultUnlockProps> = ({ vault, onBack, onSuccess }) => {
  const [isPressed, setIsPressed] = useState(false);

  const difficultyConfig = {
    easy: { 
      color: 'from-emerald-600 to-emerald-700', 
      border: 'border-emerald-400/50',
      glow: 'shadow-emerald-500/30',
      label: 'Fácil',
      bgAccent: 'bg-emerald-500/10'
    },
    medium: { 
      color: 'from-violet-600 to-violet-700', 
      border: 'border-violet-400/50',
      glow: 'shadow-violet-500/30',
      label: 'Médio',
      bgAccent: 'bg-violet-500/10'
    },
    hard: { 
      color: 'from-red-600 to-red-700', 
      border: 'border-red-400/50',
      glow: 'shadow-red-500/30',
      label: 'Difícil',
      bgAccent: 'bg-red-500/10'
    },
    legendary: { 
      color: 'from-amber-500 to-yellow-600', 
      border: 'border-yellow-400/50',
      glow: 'shadow-yellow-500/30',
      label: 'Lendário',
      bgAccent: 'bg-yellow-500/10'
    }
  };

  const currentConfig = difficultyConfig[vault.difficulty];

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Background - Simples sem efeitos */}
      <div className="absolute inset-0 bg-gray-900" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen p-4 md:p-6 max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8 md:mb-12 pt-4 md:pt-8">
          {/* Mobile: Layout em coluna */}
          <div className="block md:hidden">
            {/* Ícone centralizado no mobile */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-violet-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Crown className="h-8 w-8 text-white" />
              </div>
            </div>
            
            {/* Difficulty Badge centralizado */}
            <div className="flex justify-center mb-4">
              <div className={`px-3 py-1.5 rounded-full border ${currentConfig.border} ${currentConfig.bgAccent} backdrop-blur-sm`}>
                <div className="flex items-center gap-2">
                  <Gift className="h-4 w-4 text-slate-300" />
                  <span className="text-sm font-medium text-slate-300">{currentConfig.label}</span>
                </div>
              </div>
            </div>
            
            {/* Título centralizado */}
            <h1 className="text-3xl font-bold text-white mb-4 leading-tight text-center">
              {vault.name}
            </h1>
            
            {/* Descrição mais compacta no mobile */}
            <p className="text-base text-slate-400 leading-relaxed text-center px-2">
              Um cofre misterioso repleto de tesouros antigos e prêmios valiosos.
            </p>
          </div>

          {/* Desktop: Layout centralizado */}
          <div className="hidden md:flex flex-col items-center text-center">
            {/* Ícone do cofre */}
            <div className="flex-shrink-0 mb-6">
              <div className="w-20 h-20 bg-violet-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Crown className="h-10 w-10 text-white" />
              </div>
            </div>
            
            {/* Difficulty Badge centralizado */}
            <div className={`mb-4 px-4 py-2 rounded-full border ${currentConfig.border} ${currentConfig.bgAccent} backdrop-blur-sm w-fit`}>
              <div className="flex items-center gap-2">
                <Gift className="h-4 w-4 text-slate-300" />
                <span className="text-sm font-medium text-slate-300">{currentConfig.label}</span>
              </div>
            </div>
            
            {/* Título centralizado */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {vault.name}
            </h1>
            
            {/* Descrição centralizada */}
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-4xl">
              Um cofre misterioso repleto de tesouros antigos e prêmios valiosos. Cada item 
              foi cuidadosamente selecionado para proporcionar uma experiência única de 
              descoberta.
            </p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col lg:flex-row gap-4 lg:gap-6 items-start lg:items-center justify-center max-w-5xl mx-auto">
          
          {/* Left Side - Formulário de Desbloqueio (principal) */}
          <div className="w-full lg:flex-1 max-w-md lg:max-w-lg">
            <VaultUnlockForm
              vault={vault}
              onSuccess={onSuccess}
              onBack={onBack}
            />
          </div>

          {/* Right Side - Lista de Prêmios */}
          <div className="w-full lg:flex-1 max-w-md lg:max-w-lg">
            <VaultItemsListUnlock 
              prizes={vault.prizes}
              difficulty={vault.difficulty}
            />
          </div>
        </div>
      </div>

      {/* CSS personalizado para animações */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10% { transform: translateX(-8px); }
            20% { transform: translateX(8px); }
            30% { transform: translateX(-8px); }
            40% { transform: translateX(8px); }
            50% { transform: translateX(-8px); }
            60% { transform: translateX(8px); }
            70% { transform: translateX(-8px); }
            80% { transform: translateX(8px); }
            90% { transform: translateX(-8px); }
          }
          
          /* Otimizações para mobile */
          @media (max-width: 768px) {
            button {
              min-height: 48px;
              -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            }
          }
        `
      }} />
    </div>
  );
};

export default VaultUnlockMain;