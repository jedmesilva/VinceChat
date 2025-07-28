import React, { useState, useEffect, useCallback, useRef } from 'react';
import { CheckCircle, Skull, Target } from 'lucide-react';
import VaultHeader from './VaultHeader/VaultHeader';
import VaultItemCard from '../Item/ItemCard/ItemCard';

interface Item {
  id: string;
  type: 'money' | 'product' | 'voucher' | 'special';
  name: string;
  value: number;
  description: string;
  quantity?: number;
  image?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  status: 'available' | 'claimed' | 'expired';
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
  const [claimingItem, setClaimingItem] = useState<string | null>(null);
  const [claimProgress, setClaimProgress] = useState(0);
  const [claimedItems, setClaimedItems] = useState<Set<string>>(new Set());
  const [finalProgress, setFinalProgress] = useState<Map<string, number>>(new Map());
  
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const startPositionRef = useRef<{ x: number; y: number } | null>(null);
  const hasMoved = useRef(false);

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
        status: 'available',
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
        status: 'available',
        claimDeadline: '30 dias'
      },
      {
        id: '3',
        type: 'voucher',
        name: 'Vale Shopping',
        value: 500,
        description: 'Vale compras para qualquer loja do shopping',
        rarity: 'rare',
        status: 'available',
        claimDeadline: '60 dias'
      },
      {
        id: '4',
        type: 'money',
        name: 'Bonus Especial',
        value: 750,
        description: 'Bônus adicional por conquista rápida',
        rarity: 'rare',
        status: 'available',
        claimDeadline: '14 dias'
      },
      {
        id: '5',
        type: 'special',
        name: 'Acesso VIP',
        value: 1200,
        description: 'Acesso exclusivo a cofres premium por 1 mês',
        rarity: 'epic',
        status: 'available',
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
        status: 'available',
        claimDeadline: '15 dias'
      }
    ];
    
    setItems(sampleItems);
  }, []);

  const handleMouseDown = useCallback((itemId: string, event: React.MouseEvent | React.TouchEvent) => {
    if (claimedItems.has(itemId)) return;
    
    // Salvar posição inicial
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
    startPositionRef.current = { x: clientX, y: clientY };
    hasMoved.current = false;
    
    // Aguardar um pouco antes de iniciar o timer (evita acionamento durante scroll)
    setTimeout(() => {
      if (!hasMoved.current && startPositionRef.current) {
        startClaimTimer(itemId);
      }
    }, 150);
  }, [claimedItems]);

  const startClaimTimer = (itemId: string) => {
    setClaimingItem(itemId);
    setClaimProgress(0);
    
    // Atualizar progresso a cada 30ms (33fps)
    progressTimerRef.current = setInterval(() => {
      setClaimProgress(prev => {
        const newProgress = prev + (100 / (3000 / 30)); // 3000ms / 30ms = 100 steps
        return Math.min(newProgress, 100);
      });
    }, 30);
    
    // Timer principal de 3 segundos
    holdTimerRef.current = setTimeout(() => {
      completeClaim(itemId);
    }, 3000);
  };

  const handleMouseMove = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    if (!startPositionRef.current) return;
    
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
    
    const deltaX = Math.abs(clientX - startPositionRef.current.x);
    const deltaY = Math.abs(clientY - startPositionRef.current.y);
    
    // Se moveu mais que 10px, cancela o timer
    if (deltaX > 10 || deltaY > 10) {
      hasMoved.current = true;
      handleMouseUp();
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
    }
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
    }
    setClaimingItem(null);
    setClaimProgress(0);
    startPositionRef.current = null;
    hasMoved.current = false;
  }, []);

  const completeClaim = useCallback(async (itemId: string) => {
    // Limpar timers
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
    }
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
    }
    
    // Salvar o progresso final antes de resetar
    setFinalProgress(prev => new Map(prev).set(itemId, 100));
    
    // Marcar como saqueado imediatamente
    setClaimedItems(prev => new Set(prev).add(itemId));
    setClaimingItem(null);
    setClaimProgress(0);
    
    console.log('Item saqueado:', itemId);
    
    // Aguardar 2 segundos e depois remover o item da lista
    setTimeout(() => {
      setItems(prev => prev.filter(p => p.id !== itemId));
      setClaimedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
      // Limpar o progresso final quando remover o item
      setFinalProgress(prev => {
        const newMap = new Map(prev);
        newMap.delete(itemId);
        return newMap;
      });
    }, 2000);
  }, []);

  const handleItemClick = (item: any) => {
    // A lógica de click agora é controlada pelas funções de press-and-hold
    // Não fazemos mais nada no click simples
  };

  return (
    <div className={`min-h-full bg-gray-900 ${className}`}>
      {/* Header */}
      <VaultHeader
        vault={vault}
        onBack={onBack}
        timerLabel={timerLabel}
        closeButtonText={closeButtonText}
        instructionText={instructionText}
      />

      {/* Main Content */}
      <div className="px-4 pb-4">
        

        {/* Items Grid */}
        {items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {items.map((item) => {
              const isBeingClaimed = claimingItem === item.id;
              const isClaimed = claimedItems.has(item.id);
              const currentProgress = isBeingClaimed ? claimProgress : (finalProgress.get(item.id) || 0);

              return (
                <VaultItemCard
                  key={item.id}
                  item={item}
                  onMouseDown={isClaimed ? undefined : handleMouseDown}
                  onMouseMove={isClaimed ? undefined : handleMouseMove}
                  onMouseUp={isClaimed ? undefined : handleMouseUp}
                  onTouchStart={isClaimed ? undefined : handleMouseDown}
                  onTouchMove={isClaimed ? undefined : handleMouseMove}
                  onTouchEnd={isClaimed ? undefined : handleMouseUp}
                  claimProgress={currentProgress}
                  isBeingClaimed={isBeingClaimed}
                  isClaimed={isClaimed}
                  showProgressBar={true}
                />
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {items.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-700/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Skull className="h-12 w-12 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Cofre Saqueado!</h3>
            <p className="text-slate-400 text-lg">Você saqueou todos os itens deste cofre!</p>
          </div>
        )}
      </div>


    </div>
  );
};

export default VaultMain;