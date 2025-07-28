import React, { useState } from 'react';
import { Clock, Plus } from 'lucide-react';
import Checkout from '../Checkout/Checkout';

interface InsufficientTimeCardProps {
  onAddTime?: () => void;
  onTimeAdded?: (timeInSeconds: number) => void;
  className?: string;
  vaultName?: string;
}

const InsufficientTimeCard: React.FC<InsufficientTimeCardProps> = ({ 
  onAddTime = () => {},
  onTimeAdded,
  className = "",
  vaultName = "Tesouro Pirata"
}) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleAddTimeClick = () => {
    setIsCheckoutOpen(true);
    onAddTime(); // Chama o callback original se existir
  };

  const handleCheckoutClose = () => {
    setIsCheckoutOpen(false);
  };

  const handleTimeAdded = (timeInSeconds: number) => {
    setIsCheckoutOpen(false);
    if (onTimeAdded) {
      onTimeAdded(timeInSeconds);
    }
  };
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
          onClick={handleAddTimeClick}
          className="w-full bg-violet-500 hover:bg-violet-400 active:bg-violet-600 text-white py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Adicionar Tempo
        </button>
      </div>

      {/* Checkout Modal */}
      <Checkout 
        isOpen={isCheckoutOpen}
        onClose={handleCheckoutClose}
        onTimeAdded={handleTimeAdded}
      />
    </div>
  );
};

export default InsufficientTimeCard;