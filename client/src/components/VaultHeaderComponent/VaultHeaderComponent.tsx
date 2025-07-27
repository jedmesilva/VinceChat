import React from 'react';
import { Crown, MessageCircle, Square, Lock } from 'lucide-react';

interface VaultHeaderComponentProps {
  vaultName: string;
  vaultIcon?: React.ComponentType<{ className?: string }>;
  chatLabel?: string;
  backgroundColor?: string;
  borderColor?: string;
  onAbandon?: () => void;
  showAbandonButton?: boolean;
  showChatToggle?: boolean;
  onChatToggle?: () => void;
  showVaultToggle?: boolean;
  onVaultToggle?: () => void;
}

const VaultHeaderComponent: React.FC<VaultHeaderComponentProps> = ({
  vaultName,
  vaultIcon: VaultIcon = Crown,
  chatLabel = "Chat Convince",
  backgroundColor = "bg-slate-800",
  borderColor = "border-slate-700/50",
  onAbandon = () => {},
  showAbandonButton = true,
  showChatToggle = false,
  onChatToggle = () => {},
  showVaultToggle = false,
  onVaultToggle = () => {}
}) => {
  return (
    <div className={`${backgroundColor} border-b ${borderColor}`}>
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-violet-500 rounded-xl flex items-center justify-center">
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

          {/* Botões do lado direito */}
          <div className="flex items-center gap-2">
            {/* Botão para alternar para Chat (apenas no MyVault no mobile) */}
            {showChatToggle && (
              <button
                onClick={onChatToggle}
                className="bg-violet-500/20 hover:bg-violet-500/30 active:bg-violet-500/40 text-violet-400 hover:text-violet-300 p-2 rounded-lg transition-all duration-200 flex items-center justify-center flex-shrink-0 md:hidden"
                style={{ width: '32px', height: '28px', minHeight: '28px', maxHeight: '28px' }}
                title="Ir para Chat"
              >
                <MessageCircle size={14} />
              </button>
            )}

            {/* Botão para alternar para MyVault (apenas no Chat no mobile) */}
            {showVaultToggle && (
              <button
                onClick={onVaultToggle}
                className="bg-violet-500/20 hover:bg-violet-500/30 active:bg-violet-500/40 text-violet-400 hover:text-violet-300 p-2 rounded-lg transition-all duration-200 flex items-center justify-center flex-shrink-0 md:hidden"
                style={{ width: '32px', height: '28px', minHeight: '28px', maxHeight: '28px' }}
                title="Ir para Cofre"
              >
                <Lock size={14} />
              </button>
            )}

            {/* Botão Abandonar */}
            {showAbandonButton && (
              <button
                onClick={onAbandon}
                className="bg-red-500/20 hover:bg-red-500/30 active:bg-red-500/40 text-red-400 hover:text-red-300 px-2 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1 flex-shrink-0 leading-none"
                style={{ height: '28px', minHeight: '28px', maxHeight: '28px' }}
              >
                <Square size={9} fill="currentColor" />
                Abandonar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { VaultHeaderComponent };
export default VaultHeaderComponent;