
import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface AbandonConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  vaultName?: string;
}

const AbandonConfirmationModal: React.FC<AbandonConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  vaultName = "Cofre"
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-slate-800 rounded-2xl p-6 mx-4 max-w-md w-full border border-slate-700/50 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-300 hover:bg-slate-700/50 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-red-400" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-white text-center mb-2">
          Abandonar {vaultName}?
        </h2>

        {/* Description */}
        <p className="text-slate-400 text-center mb-6">
          Você tem certeza que deseja abandonar este cofre? Todo o progresso de convencimento será perdido e você precisará começar novamente.
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 py-3 px-4 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors font-medium"
          >
            Abandonar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AbandonConfirmationModal;
