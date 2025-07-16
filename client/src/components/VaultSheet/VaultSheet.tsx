
import React, { useState, useEffect, useRef } from 'react';
import VaultSheetHeader from './VaultSheetHeader/VaultSheetHeader';
import VaultSheetBackground from './VaultSheetBackground/VaultSheetBackground';
import VaultUnlockForm from './VaultUnlockForm/VaultUnlockForm';
import VaultItemsList from './VaultItemsList/VaultItemsList';
import VaultItemsGrid from './VaultItemsGrid/VaultItemsGrid';
import { 
  Crown,
  Clock,
  LockOpen,
  Target
} from 'lucide-react';

interface VaultData {
  id: string;
  name: string;
  itemAmount: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'legendary';
  items: Array<{
    id: string;
    name: string;
    type: 'money' | 'item' | 'trophy' | 'gift';
    value?: number;
  }>;
}

interface InteriorItem {
  id: string;
  type: 'money' | 'product' | 'voucher' | 'special';
  name: string;
  value: number;
  description: string;
  quantity?: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  claimed?: boolean;
  claimDeadline?: string;
}

interface VaultSheetProps {
  vault: VaultData;
  isOpen: boolean;
  onClose: () => void;
  onChatClick: () => void;
}

const VaultSheet: React.FC<VaultSheetProps> = ({ 
  vault, 
  isOpen, 
  onClose, 
  onChatClick 
}) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [interiorItems, setInteriorItems] = useState<InteriorItem[]>([]);
  const [openTime, setOpenTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Timer para cofre aberto
  useEffect(() => {
    if (isUnlocked) {
      const timer = setInterval(() => {
        setOpenTime(prev => prev + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isUnlocked]);

  // Carregar itens do interior quando desbloqueado
  useEffect(() => {
    if (isUnlocked && interiorItems.length === 0) {
      const loadInteriorItems = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const sampleItems: InteriorItem[] = [
          {
            id: '1',
            type: 'money',
            name: 'Prêmio em Dinheiro',
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
            claimDeadline: '90 dias'
          }
        ];
        
        setInteriorItems(sampleItems);
        setIsLoading(false);
      };
      
      loadInteriorItems();
    }
  }, [isUnlocked, interiorItems.length]);

  const handleUnlockSuccess = () => {
    setIsUnlocked(true);
  };

  const handleClaimItem = (itemId: string) => {
    // Remove o item da lista após 2 segundos
    setTimeout(() => {
      setInteriorItems(prev => prev.filter(item => item.id !== itemId));
    }, 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Reset state when closing
  useEffect(() => {
    if (!isOpen) {
      setIsUnlocked(false);
      setIsSubmitting(false);
      setInteriorItems([]);
      setOpenTime(0);
      setIsLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Loading state when opening vault interior
  if (isUnlocked && isLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-gray-900 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-purple-500/5 to-pink-500/5 animate-pulse" />
        
        <div className="relative z-10 text-center">
          <div className="w-24 h-24 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin mb-6 mx-auto"></div>
          <h3 className="text-2xl font-bold text-white mb-2">Abrindo o cofre...</h3>
          <p className="text-slate-400">Prepare-se para ver o que há lá dentro!</p>
        </div>
      </div>
    );
  }

  // Vault Interior View
  if (isUnlocked && !isLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-gray-900 relative overflow-hidden">
        {/* Immersive Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black" />
          
          {/* Vault Interior Effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-800/20 to-slate-900/40" />
          
          {/* Metallic shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform skew-x-12 animate-pulse" />
        </div>

        {/* Header */}
        <div className="relative z-10 p-6">
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
            <p className="text-slate-400 text-base max-w-3xl leading-relaxed ml-11">
              Um cofre misterioso repleto de tesouros antigos e itens valiosos. Cada item foi cuidadosamente selecionado para proporcionar uma experiência única de descoberta.
            </p>
          </div>
          
          {/* Divider */}
          <div className="border-t border-slate-700/50 mb-6"></div>
          
          {/* Vault Status Card */}
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-slate-600/30">
            <div className="flex justify-between items-center">
              {/* Status Section */}
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-violet-400" />
                <span className="text-sm font-mono font-medium text-violet-400">
                  {formatTime(openTime)}
                </span>
                <span className="text-sm font-medium text-slate-300">- Cofre aberto</span>
              </div>
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="flex items-center gap-2 bg-slate-700/80 hover:bg-slate-600/80 text-slate-300 hover:text-white px-3 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500/50"
              >
                <LockOpen className="h-4 w-4" />
                <span className="text-sm font-medium">Sair</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 px-6 pb-6 flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* Instruction Card */}
            <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-violet-500/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-violet-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Target className="h-6 w-6 text-violet-400" />
                </div>
                <div>
                  <p className="text-slate-300 text-sm">
                    Mantenha pressionado por <span className="font-bold text-violet-400">3 segundos</span> para saquear o item
                  </p>
                </div>
              </div>
            </div>

            <VaultItemsGrid
              items={interiorItems}
              onClaimItem={handleClaimItem}
              claimingItem={null}
              claimProgress={0}
              claimedItems={new Set()}
              finalProgress={new Map()}
            />
          </div>
        </div>
      </div>
    );
  }

  // Unlock Form View
  return (
    <div className="fixed inset-0 z-50 bg-gray-900">
      <VaultSheetBackground difficulty={vault.difficulty} />
      
      <div className="relative z-10 flex flex-col h-full">
        <VaultSheetHeader 
          vaultName={vault.name}
          difficulty={vault.difficulty}
          onClose={onClose}
        />
        
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col items-center justify-center min-h-full p-6 gap-8 max-w-md mx-auto w-full">
            <div className="w-full">
              <div className="bg-slate-800/95 backdrop-blur-md rounded-3xl border border-slate-700/50 shadow-2xl shadow-black/50">
                <VaultUnlockForm
                  onSuccess={handleUnlockSuccess}
                  onChatClick={onChatClick}
                  isSubmitting={isSubmitting}
                  setIsSubmitting={setIsSubmitting}
                />
              </div>
            </div>
            
            <div className="w-full">
              <VaultItemsList items={vault.items || []} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultSheet;
