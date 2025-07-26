import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Search, Play, Square, CheckCircle, Target, Timer, Award, Radar, Crosshair } from 'lucide-react';

interface FoundVault {
  id: string;
  name: string;
  prizeAmount: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'legendary';
  location: string;
  timeFound: string;
}

interface HuntingStats {
  totalTime: number;
  vaultsFound: number;
  currentPhase: string;
  progress: number;
}

interface VaultHuntingProps {
  onVaultFound?: (vault: FoundVault) => void;
  onHuntComplete?: (stats: HuntingStats, vaults: FoundVault[]) => void;
  onHuntStart?: () => void;
  onHuntStop?: () => void;
}

// Configurações centralizadas e otimizadas
const PHASES = [
  { name: 'Caçando cofres', duration: 10000, message: 'Buscando por cofres valiosos...', area: 'HUNTING' },
  { name: 'Analisando cofres encontrados', duration: 10000, message: '25 cofres encontrados - espionando...', area: 'FOUND' },
  { name: 'Espionando os guardiões', duration: 10000, message: 'Identificando guardiões distraídos...', area: 'GUARDS' },
  { name: 'Analisando vulnerabilidade dos cofres', duration: 10000, message: 'Observando movimentações dos guardiões...', area: 'VULN' },
  { name: 'Espionando movimentação nos cofres', duration: 10000, message: 'Monitorando atividades nos cofres encontrados...', area: 'SPYING' },
  { name: 'Analisando conteúdo dos cofres', duration: 10000, message: 'descobrindo itens dos cofres...', area: 'ITEMS' },
  { name: 'Calculando valores dos itens', duration: 10000, message: 'Estimando valores dos itens encontrados...', area: 'CALC' },
  { name: 'Concluindo varredura', duration: 10000, message: 'Valor estimado: R$5.000 + itens desconhecidos', area: 'FINAL' }
];

const VAULT_DATA = {
  names: ['Cofre Oculto', 'Tesouro Perdido', 'Caixa Misteriosa', 'Cofre Abandonado', 'Segredo Corporativo', 'Baú Antigo'],
  locations: ['Setor Industrial', 'Distrito Financeiro', 'Zona Residencial', 'Centro Comercial', 'Área Portuária', 'Região Metropolitana'],
  difficulties: [
    { type: 'easy', baseValue: 1000, color: 'text-violet-400' },
    { type: 'medium', baseValue: 5000, color: 'text-violet-300' },
    { type: 'hard', baseValue: 15000, color: 'text-violet-200' },
    { type: 'legendary', baseValue: 50000, color: 'text-purple-200' }
  ]
};

// Hook personalizado para gerenciamento de intervalos
const useIntervalManager = () => {
  const intervals = useRef(new Set<NodeJS.Timeout>());

  const addInterval = useCallback((interval: NodeJS.Timeout) => {
    intervals.current.add(interval);
    return interval;
  }, []);

  const clearAll = useCallback(() => {
    intervals.current.forEach(clearInterval);
    intervals.current.clear();
  }, []);

  useEffect(() => clearAll, [clearAll]);

  return { addInterval, clearAll };
};

// Hook para geração otimizada de cofres
const useVaultGenerator = () => {
  return useCallback((): FoundVault => {
    const difficulty = VAULT_DATA.difficulties[Math.floor(Math.random() * VAULT_DATA.difficulties.length)];
    const variation = 0.75 + Math.random() * 0.5; // 75%-125% do valor base
    
    return {
      id: `vault_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      name: VAULT_DATA.names[Math.floor(Math.random() * VAULT_DATA.names.length)],
      prizeAmount: Math.floor(difficulty.baseValue * variation),
      difficulty: difficulty.type as any,
      location: VAULT_DATA.locations[Math.floor(Math.random() * VAULT_DATA.locations.length)],
      timeFound: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };
  }, []);
};

const VaultHunting: React.FC<VaultHuntingProps> = ({ 
  onVaultFound, 
  onHuntComplete, 
  onHuntStart, 
  onHuntStop 
}) => {
  // Estados principais
  const [huntState, setHuntState] = useState<'idle' | 'hunting' | 'completed' | 'interrupted'>('idle');
  const [foundVaults, setFoundVaults] = useState<FoundVault[]>([]);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [phaseProgress, setPhaseProgress] = useState(0);
  const [huntStartTime, setHuntStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Hooks personalizados
  const { addInterval, clearAll } = useIntervalManager();
  const generateVault = useVaultGenerator();

  // Formatadores memoizados
  const formatters = useMemo(() => ({
    time: (ms: number) => {
      const minutes = Math.floor(ms / 60000);
      const seconds = Math.floor((ms % 60000) / 1000);
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    },
    currency: (amount: number) => 
      new Intl.NumberFormat('pt-BR', { 
        style: 'currency', 
        currency: 'BRL', 
        minimumFractionDigits: 0 
      }).format(amount)
  }), []);

  // Cálculo do progresso total corrigido
  const totalProgress = useMemo(() => {
    if (currentPhase >= PHASES.length) return 100;
    
    // Progresso baseado na fase atual + progresso da fase
    const phaseWeight = 100 / PHASES.length;
    const currentPhaseProgress = (currentPhase * phaseWeight) + (phaseProgress * phaseWeight / 100);
    
    return Math.min(currentPhaseProgress, 100);
  }, [currentPhase, phaseProgress]);

  // Valores calculados
  const stats = useMemo(() => ({
    totalTime: elapsedTime,
    vaultsFound: foundVaults.length,
    currentPhase: PHASES[currentPhase]?.name || 'Finalizado',
    progress: totalProgress
  }), [elapsedTime, foundVaults.length, currentPhase, totalProgress]);

  const totalValue = useMemo(() => 
    foundVaults.reduce((sum, vault) => sum + vault.prizeAmount, 0), 
    [foundVaults]
  );

  // Controles da caça
  const startHunt = useCallback(() => {
    clearAll();
    setHuntState('hunting');
    setFoundVaults([]);
    setCurrentPhase(0);
    setPhaseProgress(0);
    setHuntStartTime(Date.now());
    setElapsedTime(0);
    onHuntStart?.();
  }, [clearAll, onHuntStart]);

  const stopHunt = useCallback(() => {
    clearAll();
    setHuntState('interrupted');
    setPhaseProgress(0);
    onHuntStop?.();
  }, [clearAll, onHuntStop]);

  // Sistema de fases com progresso corrigido
  useEffect(() => {
    if (huntState !== 'hunting') return;

    const phase = PHASES[currentPhase];
    if (!phase) {
      setHuntState('completed');
      return;
    }

    // Resetar progresso ao entrar na fase
    setPhaseProgress(0);

    // Timer mais preciso para o progresso
    const progressInterval = 100; // Intervalo fixo de 100ms
    const totalSteps = phase.duration / progressInterval; // Número total de steps
    
    let stepCount = 0;
    let isActive = true;
    
    const phaseTimer = setInterval(() => {
      if (!isActive) return;
      
      stepCount++;
      const newProgress = (stepCount / totalSteps) * 100;
      
      if (newProgress >= 100) {
        setPhaseProgress(100);
        // Avançar para próxima fase após um pequeno delay
        setTimeout(() => {
          if (isActive) {
            setCurrentPhase(current => current + 1);
          }
        }, 200);
        clearInterval(phaseTimer);
        return;
      }
      
      setPhaseProgress(newProgress);
    }, progressInterval);

    // Chance de descobrir cofre (70%) apenas nas primeiras fases
    if (currentPhase < 3 && Math.random() < 0.7) {
      const discoveryDelay = Math.random() * phase.duration;
      setTimeout(() => {
        if (isActive) {
          const vault = generateVault();
          setFoundVaults(prev => [...prev, vault]);
          onVaultFound?.(vault);
        }
      }, discoveryDelay);
    }

    return () => {
      isActive = false;
      clearInterval(phaseTimer);
    };
  }, [huntState, currentPhase]);

  // Finalizador separado para evitar dependências circulares
  useEffect(() => {
    if (huntState === 'hunting' && currentPhase >= PHASES.length) {
      setHuntState('completed');
      onHuntComplete?.(stats, foundVaults);
    }
  }, [huntState, currentPhase]);

  // Timer global
  useEffect(() => {
    if (huntState !== 'hunting') return;

    const timer = addInterval(setInterval(() => {
      setElapsedTime(Date.now() - huntStartTime);
    }, 100));

    return () => clearInterval(timer);
  }, [huntState, huntStartTime, addInterval]);

  // Componentes de UI reutilizáveis
  const StatCard = ({ icon: Icon, value, label }) => (
    <div className="bg-slate-700/40 rounded-xl p-3 sm:p-4 border border-slate-600/30">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 text-center sm:text-left">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-violet-500/20 rounded-lg flex items-center justify-center shrink-0">
          <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-violet-300" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-lg sm:text-xl font-bold text-violet-100 truncate">{value}</div>
          <div className="text-slate-400 text-xs sm:text-sm leading-tight">{label}</div>
        </div>
      </div>
    </div>
  );

  const ProgressBar = ({ progress }) => {
    const getProgressIntensity = (prog) => {
      if (prog >= 90) return 'full';
      if (prog >= 75) return 'high';
      if (prog >= 60) return 'medium';
      if (prog >= 40) return 'low';
      return 'minimal';
    };

    const getGradientClass = (intensity) => {
      const gradients = {
        full: 'from-violet-500 to-violet-600',
        high: 'from-violet-400 to-violet-500',
        medium: 'from-violet-300 to-violet-400',
        low: 'from-violet-200 to-violet-300',
        minimal: 'from-violet-100 to-violet-200'
      };
      return gradients[intensity] || gradients.full;
    };

    const intensity = getProgressIntensity(progress);
    const gradientClass = getGradientClass(intensity);

    return (
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-slate-600/50 rounded-full h-3 overflow-hidden">
          <div 
            className={`bg-gradient-to-r ${gradientClass} h-full rounded-full transition-all duration-1000 ease-out relative`}
            style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-60" />
          </div>
        </div>
        <span className="text-slate-400 text-sm font-medium min-w-[3rem]">
          {Math.round(Math.max(0, Math.min(100, progress)))}%
        </span>
      </div>
    );
  };

  const ActionButton = ({ onClick, variant = 'primary', children, icon: Icon }) => {
    const variants = {
      primary: 'bg-violet-500 hover:bg-violet-600 text-white transform hover:scale-105',
      danger: 'bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 border border-violet-500/30'
    };

    return (
      <button
        onClick={onClick}
        className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${variants[variant]}`}
      >
        {Icon && <Icon className="h-4 w-4" />}
        {children}
      </button>
    );
  };

  // Renderização condicional otimizada
  if (huntState === 'idle') {
    return (
      <div className="bg-slate-800 rounded-2xl border border-violet-500/20 p-6">
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-slate-700/50 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <Crosshair className="h-10 w-10 text-slate-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-200 mb-2">Caça aos Cofres</h3>
          <p className="text-slate-400 mb-6 max-w-md mx-auto">
            Inicie uma varredura para descobrir cofres ocultos na região. Use estrategicamente!
          </p>
          <ActionButton onClick={startHunt} icon={Crosshair}>
            Iniciar Caça aos Cofres
          </ActionButton>
        </div>
      </div>
    );
  }

  if (huntState === 'hunting') {
    const phase = PHASES[currentPhase];
    
    return (
      <div className="bg-slate-800 rounded-2xl border border-violet-500/20 overflow-hidden hunting-active">
        <style dangerouslySetInnerHTML={{
          __html: `
            .hunting-active {
              box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
              border-color: rgba(139, 92, 246, 0.5);
            }
            .scan-line {
              background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.5), rgba(139, 92, 246, 0.8), rgba(139, 92, 246, 0.5), transparent);
              animation: scanMove 3s linear infinite;
            }
            @keyframes scanMove {
              0% { transform: translateX(-100px); }
              100% { transform: translateX(calc(100vw + 100px)); }
            }
          `
        }} />

        <div className="p-6 space-y-6">
          {/* Status da caça com animação melhorada */}
          <div className="bg-slate-700/30 rounded-xl p-5 relative overflow-hidden border border-violet-500/20">
            <div className="scan-line absolute inset-y-0 w-16 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-violet-200 font-semibold text-lg">{phase?.name}</span>
                <div className="ml-auto flex items-center gap-2">
                  <span className="text-violet-300 font-mono text-sm">ATIVO</span>
                  <div className="flex space-x-1">
                    {[0, 1, 2].map(i => (
                      <div 
                        key={i}
                        className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse" 
                        style={{animationDelay: `${i * 0.3}s`}}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <ProgressBar progress={stats.progress} />
              
              {phase && (
                <p className="text-slate-300 text-sm mt-3">{phase.message}</p>
              )}
            </div>
          </div>

          {/* Estatísticas em tempo real */}
          <div className="grid grid-cols-2 gap-4">
            <StatCard icon={Target} value={stats.vaultsFound} label="Cofres Encontrados" />
            <StatCard icon={Timer} value={formatters.time(stats.totalTime)} label="Tempo Decorrido" />
          </div>

          <div className="flex justify-center">
            <ActionButton onClick={stopHunt} variant="danger" icon={Square}>
              Interromper Caça
            </ActionButton>
          </div>
        </div>
      </div>
    );
  }

  // Estado de conclusão com layout responsivo melhorado
  return (
    <div className="bg-slate-800 rounded-2xl border border-violet-500/20 p-6">
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-2xl mx-auto mb-4 flex items-center justify-center border border-violet-500/30">
            <CheckCircle className="h-8 w-8 text-violet-400" />
          </div>
          <h3 className="text-2xl font-bold text-violet-100 mb-2">
            {huntState === 'interrupted' ? 'Caça Interrompida!' : 'Caça Finalizada!'}
          </h3>
          <p className="text-slate-400">
            {huntState === 'interrupted' ? 'Varredura realizada parcialmente' : 'Varredura completa realizada com sucesso'}
          </p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          <StatCard icon={Target} value={foundVaults.length} label="Cofres Encontrados" />
          <StatCard icon={Timer} value={formatters.time(stats.totalTime)} label="Tempo Total" />
          <StatCard icon={Award} value={formatters.currency(totalValue)} label="Valor Estimado" />
        </div>

        <div className="flex justify-center">
          <ActionButton onClick={startHunt} icon={Crosshair}>
            Caçar mais cofres
          </ActionButton>
        </div>
      </div>
    </div>
  );
};

export default VaultHunting;