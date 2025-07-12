import { useState, useEffect, useCallback, useMemo } from 'react';
import { Lock, LockOpen, Trophy, Users, Clock, Zap, Star, Crown } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Vault } from '@shared/schema';

interface VaultCardProps {
  vault: Vault;
  onVaultClick: (vault: Vault) => void;
  index: number;
}

export function VaultCard({ vault, onVaultClick, index }: VaultCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const formattedItem = useMemo(() => 
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0
    }).format(vault.itemAmount),
    [vault.itemAmount]
  );

  const difficultyConfig = useMemo(() => ({
    easy: {
      color: 'bg-slate-600/40 border border-slate-500/30 text-slate-300',
      icon: <Star className="h-4 w-4" />,
      label: 'Fácil'
    },
    medium: {
      color: 'bg-violet-500/20 border border-violet-500/30 text-violet-300',
      icon: <Zap className="h-4 w-4" />,
      label: 'Médio'
    },
    hard: {
      color: 'bg-red-500/20 border border-red-500/30 text-red-300',
      icon: <Trophy className="h-4 w-4" />,
      label: 'Difícil'
    },
    legendary: {
      color: 'bg-yellow-500/20 border border-yellow-500/30 text-yellow-300',
      icon: <Crown className="h-4 w-4" />,
      label: 'Lendário'
    }
  }), []);

  const handleClick = useCallback(() => {
    onVaultClick(vault);
  }, [vault, onVaultClick]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }, [handleClick]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div 
        className={`relative bg-slate-800 rounded-2xl p-6 border border-violet-500/20 hover:border-violet-500/40 transition-all duration-300 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${
          isHovered ? 'scale-105 shadow-2xl' : 'hover:scale-[1.02]'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        onKeyDown={handleKeyPress}
        tabIndex={0}
        role="button"
        aria-label={`Cofre ${vault.name}, item de ${formattedItem}, dificuldade ${difficultyConfig[vault.difficulty].label}`}
      >
        {/* Badges */}
        {(vault.isNew || vault.isPopular) && (
          <div className="absolute top-4 right-4 flex gap-2" aria-label="Etiquetas do cofre">
            {vault.isNew && (
              <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded-full text-xs font-medium">
                Novo
              </span>
            )}
            {vault.isPopular && (
              <span className="bg-orange-500/20 text-orange-300 px-2 py-1 rounded-full text-xs font-medium">
                Popular
              </span>
            )}
          </div>
        )}

        {/* Dificuldade com ícone */}
        <div className="mb-6">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${difficultyConfig[vault.difficulty].color}`}>
            {difficultyConfig[vault.difficulty].icon}
            {difficultyConfig[vault.difficulty].label}
          </div>
        </div>

        {/* Ícone do cadeado central */}
        <div className="flex justify-center mb-6">
          <motion.div 
            className={`relative w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 ${
              vault.isLocked 
                ? 'bg-gradient-to-br from-slate-700 to-slate-600 border-2 border-slate-500' 
                : 'bg-gradient-to-br from-green-500/20 to-emerald-600/20 border-2 border-green-500/50'
            }`}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {vault.isLocked ? (
              <Lock className="h-10 w-10 text-slate-300 group-hover:text-violet-300 transition-colors" />
            ) : (
              <LockOpen className="h-10 w-10 text-green-400 group-hover:text-green-300 transition-colors" />
            )}
            
            {/* Efeito de brilho */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              isHovered ? 'animate-pulse' : ''
            }`} />
          </motion.div>
        </div>

        {/* Nome do cofre */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-violet-100 group-hover:text-violet-200 transition-colors">
            {vault.name}
          </h3>
          {vault.description && (
            <p className="text-sm text-slate-400 mt-2 line-clamp-2">
              {vault.description}
            </p>
          )}
        </div>

        {/* Valor do item */}
        <div className="text-center mb-6">
          <div className="bg-slate-700/50 rounded-xl p-4">
            <div className={`text-2xl font-bold ${
              vault.difficulty === 'legendary' ? 'text-yellow-300' : 'text-violet-200'
            }`}>
              {formattedItem}
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="flex justify-between text-xs text-slate-400 mb-6">
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{vault.attempts} tentativas</span>
          </div>
          <div className="flex items-center gap-1">
            <Trophy className="h-3 w-3" />
            <span>{vault.winners} vencedores</span>
          </div>
        </div>

        {/* Botão de ação */}
        <button 
          className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 ${
            vault.isLocked 
              ? vault.difficulty === 'legendary'
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-400 hover:to-orange-400 focus:ring-yellow-500/50'
                : 'bg-violet-500 text-white hover:bg-violet-400 focus:ring-violet-500/50'
              : 'bg-green-500 text-white hover:bg-green-400 focus:ring-green-500/50'
          } group-hover:scale-105`}
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          aria-label={vault.isLocked ? 'Tentar abrir cofre' : 'Visualizar cofre aberto'}
        >
          {vault.isLocked 
            ? vault.difficulty === 'legendary' 
              ? 'Aceitar Desafio' 
              : 'Tentar Abrir' 
            : 'Cofre Aberto'
          }
        </button>

        {/* Última atividade */}
        {vault.lastActivity && (
          <div className="mt-3 text-center">
            <div className="flex items-center justify-center gap-1 text-slate-500 text-xs">
              <Clock className="h-3 w-3" />
              <span>Ativo há {vault.lastActivity}</span>
            </div>
          </div>
        )}

        {/* Efeito de hover no card */}
        <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
          vault.difficulty === 'legendary' 
            ? 'bg-gradient-to-r from-yellow-500/5 to-orange-500/5'
            : vault.isLocked
              ? 'bg-gradient-to-r from-violet-500/5 to-purple-500/5'
              : 'bg-gradient-to-r from-green-500/5 to-emerald-500/5'
        }`} />
      </div>
    </motion.div>
  );
}
