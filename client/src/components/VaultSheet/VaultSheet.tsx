import React, { useState } from 'react';
import VaultUnlockMain from './VaultUnlock/VaultUnlockMain';
import VaultMain from './Vault/VaultMain';

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
  onClose: () => void;
}

const VaultSheet: React.FC<VaultSheetProps> = ({ vault, onClose }) => {
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

  return (
    <>
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
    </>
  );
};

export default VaultSheet;