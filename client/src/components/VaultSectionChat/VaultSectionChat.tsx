import React, { useState } from 'react';
import { Lock } from 'lucide-react';

interface VaultSectionChatProps {
  isLocked?: boolean;
  onVaultAction?: () => void;
  actionLabel?: string;
}

const VaultSectionChat: React.FC<VaultSectionChatProps> = ({ 
  isLocked = true, 
  onVaultAction = () => {},
  actionLabel = "Saquear"
}) => {
  const [isLockHovered, setIsLockHovered] = useState(false);

  return (
    <div className="bg-violet-500/5 backdrop-blur-sm border-t border-slate-700/30 py-4">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center">
          <button
            onMouseEnter={() => setIsLockHovered(true)}
            onMouseLeave={() => setIsLockHovered(false)}
            className={`
              bg-slate-700 hover:bg-slate-600 w-10 h-10 rounded-xl 
              flex items-center justify-center transition-all duration-200
              ${isLockHovered ? 'scale-105' : 'scale-100'}
            `}
          >
            <Lock className="w-4 h-4 text-slate-300" />
          </button>
          <span className="ml-3 text-slate-400 text-sm">
            {isLocked ? 'Cofre fechado' : 'Cofre aberto'}
          </span>
        </div>
        <button 
          onClick={onVaultAction}
          className="bg-violet-500 hover:bg-violet-400 active:bg-violet-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
        >
          {actionLabel}
        </button>
      </div>
    </div>
  );
};

export default VaultSectionChat;