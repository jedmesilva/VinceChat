import React from 'react';
import { Crown, MessageCircle } from 'lucide-react';

interface VaultHeaderComponentProps {
  vaultName: string;
  vaultIcon?: React.ComponentType<{ className?: string }>;
  chatLabel?: string;
  backgroundColor?: string;
  borderColor?: string;
}

const VaultHeaderComponent: React.FC<VaultHeaderComponentProps> = ({
  vaultName,
  vaultIcon: VaultIcon = Crown,
  chatLabel = "Chat Convince",
  backgroundColor = "bg-slate-800",
  borderColor = "border-slate-700/50"
}) => {
  return (
    <div className={`${backgroundColor} border-b ${borderColor}`}>
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-violet-500 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/25">
                  <VaultIcon className="h-6 w-6 text-white" />
                </div>
              </div>
              
              <div className="flex flex-col">
                <h2 className="text-lg font-bold text-white leading-tight">
                  {vaultName}
                </h2>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <MessageCircle className="h-3 w-3" />
                  <span>{chatLabel}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { VaultHeaderComponent };
export default VaultHeaderComponent;