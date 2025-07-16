import React, { useState } from 'react';
import { Lock, Crown } from 'lucide-react';

interface VaultSectionChatProps {
  isLocked?: boolean;
  onVaultClick?: () => void;
  actionLabel?: string;
  vaultName?: string;
}

const VaultSectionChat: React.FC<VaultSectionChatProps> = ({ 
  isLocked = true, 
  onVaultClick = () => {},
  actionLabel = "Saquear",
  vaultName = "Cofre Atual"
}) => {
  const [isLockHovered, setIsLockHovered] = useState(false);

  return (
    <div className="bg-violet-500/5 backdrop-blur-sm border-t border-slate-700/30 py-4">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center">
          <button
            onClick={onVaultClick}
            onMouseEnter={() => setIsLockHovered(true)}
            onMouseLeave={() => setIsLockHovered(false)}
            className={`
              bg-slate-700 hover:bg-slate-600 w-10 h-10 rounded-xl 
              flex items-center justify-center transition-all duration-200
              ${isLockHovered ? 'scale-105' : 'scale-100'}
            `}
          >
            {isLocked ? (
              <Lock className="w-4 h-4 text-slate-300" />
            ) : (
              <Crown className="w-4 h-4 text-yellow-400" />
            )}
          </button>
          <div className="ml-3">
            <div className="text-slate-300 text-sm font-medium">{vaultName}</div>
            <div className="text-slate-400 text-xs">
              {isLocked ? 'Cofre fechado' : 'Cofre aberto'}
            </div>
          </div>
        </div>
        <button 
          onClick={onVaultClick}
          className="bg-violet-500 hover:bg-violet-400 active:bg-violet-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
        >
          {actionLabel}
        </button>
      </div>
    </div>
  );
};

export default VaultSectionChat;