import React, { useState } from 'react';
import { 
  CreditCard,
  Plus,
  Trash2,
  ChevronRight
} from 'lucide-react';
import CardDeleteConfirmation from './CardDeleteConfirmation';

interface SavedCard {
  id: string;
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}

interface SavedCardsProps {
  cards: SavedCard[];
  onAddCard?: () => void;
  onRemoveCard?: (cardId: string) => void;
  onSetDefaultCard?: (cardId: string) => void;
  isCollapsible?: boolean;
  defaultExpanded?: boolean;
  title?: string;
  className?: string;
}

const SavedCards: React.FC<SavedCardsProps> = ({
  cards = [],
  onAddCard,
  onRemoveCard,
  onSetDefaultCard,
  isCollapsible = true,
  defaultExpanded = true,
  title = "Cartões Salvos",
  className = ""
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [cardToDelete, setCardToDelete] = useState<SavedCard | null>(null);

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

  const handleRemoveCard = (card: SavedCard) => {
    setCardToDelete(card);
  };

  const confirmDeleteCard = () => {
    if (cardToDelete && onRemoveCard) {
      onRemoveCard(cardToDelete.id);
      setCardToDelete(null);
    }
  };

  const cancelDeleteCard = () => {
    setCardToDelete(null);
  };

  const HeaderContent = () => (
    <div className="flex items-center space-x-3">
      <CreditCard className="w-5 h-5 text-violet-400" />
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <span className="px-2 py-1 bg-violet-500/20 text-violet-300 rounded-full text-xs font-medium">
        {cards.length}
      </span>
    </div>
  );

  const CardsContent = () => (
    <div className="px-4 pb-4 space-y-3">
      {cards.map((card) => (
        <div key={card.id} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-xl">
          <div className="flex items-center space-x-3">
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
          <div className="flex items-center space-x-2">
            {!card.isDefault && onSetDefaultCard && (
              <button
                onClick={() => onSetDefaultCard(card.id)}
                className="px-3 py-1 bg-violet-500/20 text-violet-300 rounded-lg text-xs font-medium hover:bg-violet-500/30 transition-colors"
              >
                Selecionar
              </button>
            )}
            {onRemoveCard && (
              <button
                onClick={() => handleRemoveCard(card)}
                className="w-8 h-8 bg-red-500/20 text-red-300 rounded-lg flex items-center justify-center hover:bg-red-500/30 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ))}
      
      {onAddCard && (
        <button
          onClick={onAddCard}
          className="w-full flex items-center justify-center space-x-2 p-3 bg-slate-700/30 hover:bg-slate-700/50 rounded-xl border-2 border-dashed border-slate-600/30 transition-all duration-200"
        >
          <Plus className="w-5 h-5 text-slate-400" />
          <span className="text-slate-400 font-medium">Adicionar Cartão</span>
        </button>
      )}
    </div>
  );

  if (!isCollapsible) {
    return (
      <>
        <div className={`bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-600/30 mb-6 ${className}`}>
          <div className="p-4">
            <HeaderContent />
          </div>
          <CardsContent />
        </div>

        {/* Confirmation Modal */}
        {cardToDelete && (
          <CardDeleteConfirmation
            card={cardToDelete}
            isOpen={!!cardToDelete}
            onConfirm={confirmDeleteCard}
            onCancel={cancelDeleteCard}
          />
        )}
      </>
    );
  }

  return (
    <>
      <div className={`bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-600/30 mb-6 ${className}`}>
        <div 
          className="flex items-center justify-between p-4 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <HeaderContent />
          <ChevronRight className={`w-5 h-5 text-slate-400 transform transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
        </div>
        
        {isExpanded && <CardsContent />}
      </div>

      {/* Confirmation Modal */}
      {cardToDelete && (
        <CardDeleteConfirmation
          card={cardToDelete}
          isOpen={!!cardToDelete}
          onConfirm={confirmDeleteCard}
          onCancel={cancelDeleteCard}
        />
      )}
    </>
  );
};

export default SavedCards;