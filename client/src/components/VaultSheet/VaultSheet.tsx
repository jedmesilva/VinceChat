import React, { useState } from 'react';
import VaultUnlockMain from '../VaultUnlock/VaultUnlockMain';
import VaultMain from '../Vault/VaultMain';

interface VaultSheetProps {
  vault: {
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
  };
  isOpen: boolean;
  onClose: () => void;
  onChatClick?: () => void;
}

const VaultSheet: React.FC<VaultSheetProps> = ({ vault, isOpen, onClose, onChatClick }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleUnlockSuccess = () => {
    setIsUnlocked(true);
  };

  const handleBack = () => {
    if (isUnlocked) {
      // Se estiver dentro do cofre, volta para a tela de desbloqueio
      setIsUnlocked(false);
    } else {
      // Se estiver na tela de desbloqueio, fecha o sheet
      onClose();
    }
  };

  // Se não estiver aberto, não renderiza nada
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm">
      <div className="absolute inset-0 overflow-y-auto overflow-x-hidden">
        <div className="min-h-full">
          {!isUnlocked ? (
            // Tela de acesso ao cofre (exterior)
            <VaultUnlockMain
              vault={vault}
              onBack={handleBack}
              onSuccess={handleUnlockSuccess}
            />
          ) : (
            // Tela do interior do cofre
            <VaultMain
              vault={vault}
              onBack={handleBack}
              onClose={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default VaultSheet;