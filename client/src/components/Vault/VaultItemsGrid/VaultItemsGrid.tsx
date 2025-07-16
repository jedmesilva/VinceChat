import React, { useState, useCallback, useRef } from 'react';
import { CheckCircle } from 'lucide-react';
import VaultItemCard from 'client/src/components/Vault/VaultItemCard/VaultItemCard.tsx';

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

interface VaultItemsGridProps {
  items: VaultItem[];
  onItemClaimed: (itemId: string) => void;
  onItemsUpdated: (items: VaultItem[]) => void;
}

const VaultItemsGrid: React.FC<VaultItemsGridProps> = ({
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
      {items.map((item) => (
        <VaultItemCard
          key={item.id}
          item={item}
          isBeingClaimed={claimingItem === item.id}
          isClaimed={claimedItems.has(item.id)}
          claimProgress={claimProgress}
          finalProgress={finalProgress.get(item.id) || 0}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
      ))}
    </div>
  );
};

export default VaultItemsGrid;