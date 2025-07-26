import React from 'react';
import { 
  CreditCard,
  Trash2,
  X,
  AlertTriangle
} from 'lucide-react';

interface SavedCard {
  id: string;
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}

interface CardDeleteConfirmationProps {
  card: SavedCard;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const CardDeleteConfirmation: React.FC<CardDeleteConfirmationProps> = ({
  card,
  isOpen,
  onConfirm,
  onCancel
}) => {
  if (!isOpen) return null;

  const getCardBrandColor = (brand: string) => {
    switch(brand.toLowerCase()) {
      case 'visa':
        return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
      case 'mastercard':
        return 'bg-red-500/20 text-red-300 border-red-400/30';
      case 'american express':
        return 'bg-green-500/20 text-green-300 border-green-400/30';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-400/30';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800/95 backdrop-blur-sm rounded-2xl border border-slate-600/30 w-full max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-600/30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Remover Cartão</h3>
          </div>
          <button
            onClick={onCancel}
            className="w-8 h-8 bg-slate-700/50 hover:bg-slate-700/80 rounded-lg flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-slate-300 text-sm leading-relaxed">
            Tem certeza que deseja remover este cartão? Esta ação não pode ser desfeita.
          </p>

          {/* Card Preview */}
          <div className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-xl">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getCardBrandColor(card.brand)}`}>
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-white">{card.brand} •••• {card.last4}</span>
                {card.isDefault && (
                  <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-medium">
                    Padrão
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-400">
                Expira em {card.expiryMonth.toString().padStart(2, '0')}/{card.expiryYear}
              </div>
            </div>
          </div>

          {card.isDefault && (
            <div className="flex items-center space-x-2 p-3 bg-yellow-500/10 border border-yellow-400/20 rounded-xl">
              <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
              <p className="text-yellow-300 text-xs">
                Este é seu cartão padrão. Após removê-lo, você precisará definir outro cartão como padrão.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-slate-600/30">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-slate-700/50 hover:bg-slate-700/80 text-slate-300 rounded-lg transition-colors font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-400/30 rounded-lg transition-colors font-medium flex items-center space-x-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Remover</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardDeleteConfirmation;