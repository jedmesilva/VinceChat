import React, { useState, useEffect, useRef } from 'react';
import VaultSheetHeader from './VaultSheetHeader/VaultSheetHeader';
import VaultSheetBackground from './VaultSheetBackground/VaultSheetBackground';
import VaultUnlockForm from './VaultUnlockForm/VaultUnlockForm';
import VaultPrizesList from './VaultPrizesList/VaultPrizesList';
import VaultInteriorGrid from './VaultInteriorGrid/VaultInteriorGrid';

interface VaultData {
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
}

interface InteriorPrize {
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
  const [interiorPrizes, setInteriorPrizes] = useState<InteriorPrize[]>([]);
  const [claimingPrize, setClaimingPrize] = useState<string | null>(null);
  const [claimProgress, setClaimProgress] = useState(0);
  const [claimedPrizes, setClaimedPrizes] = useState<Set<string>>(new Set());
  const [finalProgress, setFinalProgress] = useState<Map<string, number>>(new Map());
  const [openTime, setOpenTime] = useState(0);
  
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer para cofre aberto
  useEffect(() => {
    if (isUnlocked) {
      const timer = setInterval(() => {
        setOpenTime(prev => prev + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isUnlocked]);

  // Carregar prêmios do interior quando desbloqueado
  useEffect(() => {
    if (isUnlocked && interiorPrizes.length === 0) {
      const loadInteriorPrizes = async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const samplePrizes: InteriorPrize[] = [
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
        
        setInteriorPrizes(samplePrizes);
      };
      
      loadInteriorPrizes();
    }
  }, [isUnlocked, interiorPrizes.length]);

  const handleUnlockSuccess = () => {
    setIsUnlocked(true);
  };

  const handleClaimPrize = (prizeId: string) => {
    if (claimedPrizes.has(prizeId) || claimingPrize) return;
    
    setClaimingPrize(prizeId);
    setClaimProgress(0);
    
    // Simular progresso de claim
    progressTimerRef.current = setInterval(() => {
      setClaimProgress(prev => {
        if (prev >= 100) {
          if (progressTimerRef.current) {
            clearInterval(progressTimerRef.current);
          }
          
          // Atualizar estado final
          setFinalProgress(prevMap => {
            const newMap = new Map(prevMap);
            newMap.set(prizeId, 100);
            return newMap;
          });
          
          setTimeout(() => {
            setClaimedPrizes(prevSet => new Set(prevSet).add(prizeId));
            setClaimingPrize(null);
            setClaimProgress(0);
          }, 500);
          
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    };
  }, []);

  // Reset state when closing
  useEffect(() => {
    if (!isOpen) {
      setIsUnlocked(false);
      setIsSubmitting(false);
      setInteriorPrizes([]);
      setClaimingPrize(null);
      setClaimProgress(0);
      setClaimedPrizes(new Set());
      setFinalProgress(new Map());
      setOpenTime(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

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
          {!isUnlocked ? (
            <div className="flex flex-col lg:flex-row gap-8 p-6 items-center justify-center min-h-full">
              <div className="flex-1 max-w-md">
                <VaultPrizesList prizes={vault.prizes} />
              </div>
              
              <div className="flex-1 max-w-md">
                <div className="bg-slate-800/95 backdrop-blur-md rounded-3xl border border-slate-700/50 shadow-2xl shadow-black/50">
                  <VaultUnlockForm
                    onSuccess={handleUnlockSuccess}
                    onChatClick={onChatClick}
                    isSubmitting={isSubmitting}
                    setIsSubmitting={setIsSubmitting}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4">
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold text-white mb-2">Interior do Cofre</h3>
                <p className="text-slate-400">Mantenha pressionado em um item para resgatá-lo</p>
                <div className="text-sm text-slate-500 mt-2">
                  Cofre aberto há {Math.floor(openTime / 60)}:{(openTime % 60).toString().padStart(2, '0')}
                </div>
              </div>
              
              <VaultInteriorGrid
                prizes={interiorPrizes}
                onClaimPrize={handleClaimPrize}
                claimingPrize={claimingPrize}
                claimProgress={claimProgress}
                claimedPrizes={claimedPrizes}
                finalProgress={finalProgress}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VaultSheet;