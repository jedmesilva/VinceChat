import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import VaultHeader from './VaultHeader/VaultHeader';
import VaultItemsGrid from './VaultItemsGrid/VaultItemsGrid';

interface Item {
  id: string;
  type: 'money' | 'product' | 'voucher' | 'special';
  name: string;
  value: number;
  description: string;
  quantity?: number;
  image?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  claimed?: boolean;
  claimDeadline?: string;
}

interface VaultMainProps {
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

const VaultMain: React.FC<VaultMainProps> = ({
  vault,
  onBack,
  timerLabel = "Cofre aberto",
  closeButtonText = "Sair",
  instructionText = "Mantenha pressionado por 3 segundos para saquear o item",
  className = ""
}) => {
  const [items, setItems] = useState<Item[]>([]);

  // Carregar itens de exemplo
  useEffect(() => {
    const sampleItems: Item[] = [
      {
        id: '1',
        type: 'money',
        name: 'Item em Dinheiro',
        value: 2500,
        description: 'Valor em dinheiro para saque imediato',
        rarity: 'epic',
        claimDeadline: '7 dias'
      },
      {
        id: '2',
        type: 'product',
        name: 'Smartphone Premium',
        value: 1800,
        description: 'iPhone 15 Pro Max 256GB na cor titânio natural',
        rarity: 'legendary',
        quantity: 1,
        claimDeadline: '30 dias'
      },
      {
        id: '3',
        type: 'voucher',
        name: 'Vale Shopping',
        value: 500,
        description: 'Vale compras para qualquer loja do shopping',
        rarity: 'rare',
        claimDeadline: '60 dias'
      },
      {
        id: '4',
        type: 'money',
        name: 'Bonus Especial',
        value: 750,
        description: 'Bônus adicional por conquista rápida',
        rarity: 'rare',
        claimDeadline: '14 dias'
      },
      {
        id: '5',
        type: 'special',
        name: 'Acesso VIP',
        value: 1200,
        description: 'Acesso exclusivo a cofres premium por 1 mês',
        rarity: 'epic',
        claimDeadline: '3 dias'
      },
      {
        id: '6',
        type: 'product',
        name: 'Fone Bluetooth',
        value: 350,
        description: 'AirPods Pro 2ª geração com cancelamento de ruído',
        rarity: 'common',
        quantity: 1,
        claimDeadline: '15 dias'
      }
    ];
    
    setItems(sampleItems);
  }, []);

  const handleItemClaimed = (itemId: string) => {
    // Aguardar 2 segundos e depois remover o item da lista
    setTimeout(() => {
      setItems(prev => prev.filter(item => item.id !== itemId));
    }, 2000);
  };

  return (
    <div className={`min-h-screen bg-gray-900 ${className}`}>
      {/* Header */}
      <VaultHeader
        vault={vault}
        onBack={onBack}
        timerLabel={timerLabel}
        closeButtonText={closeButtonText}
        instructionText={instructionText}
      />

      {/* Main Content */}
      <div className="px-6 pb-6">
        <div className="max-w-6xl mx-auto">
          {/* Items Grid */}
          <VaultItemsGrid
            items={items}
            onItemClaimed={handleItemClaimed}
          />

          {/* Empty State */}
          {items.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-slate-700/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-12 w-12 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Cofre Saqueado!</h3>
              <p className="text-slate-400 text-lg">Você saqueou todos os itens deste cofre!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VaultMain;