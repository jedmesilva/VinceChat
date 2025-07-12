import { useCallback } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Vault } from '@shared/schema';

interface VaultModalProps {
  vault: Vault | null;
  onClose: () => void;
}

export function VaultModal({ vault, onClose }: VaultModalProps) {
  const handleModalClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  if (!vault) return null;

  const formattedPrize = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0
  }).format(vault.itemAmount);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleModalClick}
        onKeyDown={handleKeyDown}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-slate-800 rounded-2xl p-6 max-w-md w-full border border-violet-500/20 relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500/50 rounded-lg p-1"
            aria-label="Fechar modal"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="text-center mb-6">
            <h3 id="modal-title" className="text-2xl font-bold text-violet-100 mb-2">
              {vault.name}
            </h3>
            <div className="bg-slate-700/50 rounded-lg p-3 mb-4">
              <div className={`text-3xl font-bold ${
                vault.difficulty === 'legendary' ? 'text-yellow-300' : 'text-violet-200'
              }`}>
                {formattedPrize}
              </div>
            </div>
            {vault.description && (
              <p className="text-slate-400 text-sm">
                {vault.description}
              </p>
            )}
          </div>

          {/* Estatísticas detalhadas */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-700/30 rounded-lg p-3 text-center">
              <div className="text-lg font-semibold text-violet-300">{vault.attempts}</div>
              <div className="text-xs text-slate-400">Tentativas</div>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-3 text-center">
              <div className="text-lg font-semibold text-green-300">{vault.winners}</div>
              <div className="text-xs text-slate-400">Vencedores</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <button 
              className={`w-full py-3 px-4 rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 ${
                vault.isLocked 
                  ? vault.difficulty === 'legendary'
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-400 hover:to-orange-400 focus:ring-yellow-500/50'
                    : 'bg-violet-500 text-white hover:bg-violet-400 focus:ring-violet-500/50'
                  : 'bg-green-500 text-white hover:bg-green-400 focus:ring-green-500/50'
              }`}
              onClick={onClose}
            >
              {vault.isLocked 
                ? vault.difficulty === 'legendary' 
                  ? 'Aceitar Desafio Lendário' 
                  : 'Iniciar Desafio' 
                : 'Ver Detalhes'
              }
            </button>
            <button 
              onClick={onClose}
              className="w-full py-3 px-4 bg-slate-700 text-slate-300 rounded-xl font-medium hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500/50"
            >
              Fechar
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
