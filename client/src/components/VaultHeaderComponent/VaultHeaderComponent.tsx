import React from 'react';
import { Crown, MessageCircle, Square } from 'lucide-react';

interface VaultHeaderComponentProps {
  vaultName: string;
  vaultIcon?: React.ComponentType<{ className?: string }>;
  chatLabel?: string;
  backgroundColor?: string;
  borderColor?: string;
  onAbandon?: () => void;
  showAbandonButton?: boolean;
}

const VaultHeaderComponent: React.FC<VaultHeaderComponentProps> = ({
  vaultName,
  vaultIcon: VaultIcon = Crown,
  chatLabel = "Chat Convince",
  backgroundColor = "bg-slate-800",
  borderColor = "border-slate-700/50",
  onAbandon = () => {},
  showAbandonButton = true
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
          
          {/* Botão Abandonar */}
          {showAbandonButton && (
            <button
              onClick={onAbandon}
              className="bg-red-500/70 hover:bg-red-500/80 active:bg-red-500/90 text-white px-2 rounded text-xs font-medium transition-all duration-200 flex items-center gap-1 flex-shrink-0 leading-none"
              style={{ height: '28px', minHeight: '28px', maxHeight: '28px' }}
            >
              <Square size={9} fill="currentColor" />
              Abandonar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export { VaultHeaderComponent };
export default VaultHeaderComponent;