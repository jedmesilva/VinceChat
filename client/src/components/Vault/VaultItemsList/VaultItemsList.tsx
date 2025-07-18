import React, { useState, useCallback, useRef } from 'react';
import { CheckCircle } from 'lucide-react';

interface VaultItem {
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

interface VaultItemsListProps {
  items: VaultItem[];
  onItemClaimed: (itemId: string) => void;
  onItemsUpdated?: (items: VaultItem[]) => void;
}

const VaultItemsList: React.FC<VaultItemsListProps> = ({
  items,
  onItemClaimed,
  onItemsUpdated
}) => {
  const [claimingItem, setClaimingItem] = useState<string | null>(null);
  const [claimProgress, setClaimProgress] = useState(0);
  const [claimedItems, setClaimedItems] = useState<Set<string>>(new Set());
  const [finalProgress, setFinalProgress] = useState<Map<string, number>>(new Map());
  
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const startPositionRef = useRef<{ x: number; y: number } | null>(null);
  const hasMoved = useRef(false);

  const handleMouseDown = useCallback((itemId: string, event: React.MouseEvent | React.TouchEvent) => {
    if (claimedItems.has(itemId)) return;
    
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
    startPositionRef.current = { x: clientX, y: clientY };
    hasMoved.current = false;
    
    setTimeout(() => {
      if (!hasMoved.current && startPositionRef.current) {
        startClaimTimer(itemId);
      }
    }, 150);
  }, [claimedItems]);

  const startClaimTimer = (itemId: string) => {
    setClaimingItem(itemId);
    setClaimProgress(0);
    
    progressTimerRef.current = setInterval(() => {
      setClaimProgress(prev => {
        const newProgress = prev + (100 / (3000 / 30));
        return Math.min(newProgress, 100);
      });
    }, 30);
    
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
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
    }
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
    }
    
    setFinalProgress(prev => new Map(prev).set(itemId, 100));
    setClaimedItems(prev => new Set(prev).add(itemId));
    setClaimingItem(null);
    setClaimProgress(0);
    
    // Chamar callback para notificar que o item foi saqueado
    onItemClaimed(itemId);
    
    setTimeout(() => {
      const updatedItems = items.filter(item => item.id !== itemId);
      onItemsUpdated(updatedItems);
      
      setClaimedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
      
      setFinalProgress(prev => {
        const newMap = new Map(prev);
        newMap.delete(itemId);
        return newMap;
      });
    }, 2000);
  }, [items, onItemClaimed, onItemsUpdated]);

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-slate-700/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-12 w-12 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Cofre Saqueado!</h3>
        <p className="text-slate-400 text-lg">Você saqueou todos os itens deste cofre!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => {
        const isBeingClaimed = claimingItem === item.id;
        const isClaimed = claimedItems.has(item.id);
        const progress = finalProgress.get(item.id) || claimProgress;
        
        return (
          <div
            key={item.id}
            className={`relative p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
              isClaimed 
                ? 'border-green-500 bg-green-500/10' 
                : 'border-gray-600 bg-gray-800 hover:border-violet-500'
            }`}
            onMouseDown={(e) => handleMouseDown(item.id, e)}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={(e) => handleMouseDown(item.id, e)}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
          >
            {/* Progress Bar */}
            {isBeingClaimed && (
              <div className="absolute top-0 left-0 w-full h-1 bg-gray-700 rounded-t-lg">
                <div 
                  className="h-full bg-violet-500 transition-all duration-100 rounded-t-lg"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            {/* Item Content */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.rarity === 'legendary' 
                      ? 'bg-yellow-500/20 text-yellow-400' 
                      : item.rarity === 'epic'
                      ? 'bg-purple-500/20 text-purple-400'
                      : item.rarity === 'rare'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {item.rarity}
                  </span>
                  {item.claimDeadline && (
                    <span className="text-xs text-gray-500">
                      {item.claimDeadline}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-green-400 font-bold text-lg">
                  R$ {item.value.toLocaleString()}
                </div>
                {item.quantity && (
                  <div className="text-gray-400 text-sm">
                    Qtd: {item.quantity}
                  </div>
                )}
              </div>
            </div>

            {/* Claimed Overlay */}
            {isClaimed && (
              <div className="absolute inset-0 bg-green-500/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default VaultItemsList;