import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Search, Play, Square, CheckCircle, Target, Timer, Award } from 'lucide-react';

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

const HUNTING_PHASES = [
  { name: 'Inicializando Varredura', duration: 2000, message: 'Preparando equipamentos de detecção...' },
  { name: 'Escaneando Área Norte', duration: 3000, message: 'Analisando sinais electromagnéticos...' },
  { name: 'Escaneando Área Sul', duration: 3000, message: 'Verificando anomalias estruturais...' },
  { name: 'Escaneando Área Leste', duration: 2500, message: 'Detectando padrões de segurança...' },
  { name: 'Escaneando Área Oeste', duration: 2500, message: 'Mapeando sistemas de proteção...' },
  { name: 'Varredura Profunda', duration: 4000, message: 'Realizando análise detalhada...' },
  { name: 'Finalizando Busca', duration: 1500, message: 'Compilando resultados encontrados...' }
];

const VaultHunting: React.FC<VaultHuntingProps> = ({
  onVaultFound,
  onHuntComplete,
  onHuntStart,
  onHuntStop
}) => {
  const [isHunting, setIsHunting] = useState(false);
  const [foundVaults, setFoundVaults] = useState<FoundVault[]>([]);
  const [huntingStats, setHuntingStats] = useState<HuntingStats>({
    totalTime: 0,
    vaultsFound: 0,
    currentPhase: '',
    progress: 0
  });
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  
  // Refs para controlar os intervalos
  const phaseIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const statsIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const vaultTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const huntStartTimeRef = useRef<number>(0);

  // Função para limpar todos os intervalos
  const clearAllIntervals = useCallback(() => {
    if (phaseIntervalRef.current) {
      clearInterval(phaseIntervalRef.current);
      phaseIntervalRef.current = null;
    }
    if (statsIntervalRef.current) {
      clearInterval(statsIntervalRef.current);
      statsIntervalRef.current = null;
    }
    if (vaultTimeoutRef.current) {
      clearTimeout(vaultTimeoutRef.current);
      vaultTimeoutRef.current = null;
    }
  }, []);

  // Função para gerar cofres encontrados aleatoriamente
  const generateRandomVault = useCallback((): FoundVault => {
    const difficulties: ('easy' | 'medium' | 'hard' | 'legendary')[] = ['easy', 'medium', 'hard', 'legendary'];
    const locations = [
      'Setor Industrial', 'Distrito Financeiro', 'Zona Residencial', 
      'Centro Comercial', 'Área Portuária', 'Região Metropolitana',
      'Complexo Empresarial', 'Bairro Histórico', 'Zona Norte',
      'Área Tecnológica', 'Distrito Cultural', 'Setor Bancário'
    ];
    
    const vaultNames = [
      'Cofre Oculto', 'Tesouro Perdido', 'Caixa Misteriosa', 
      'Cofre Abandonado', 'Segredo Corporativo', 'Baú Antigo',
      'Cofre Militar', 'Tesouro Enterrado', 'Caixa Forte',
      'Cofre do Banco', 'Tesouro Pirata', 'Cofre Digital'
    ];

    const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
    const basePrize = difficulty === 'easy' ? 1000 : 
                     difficulty === 'medium' ? 5000 : 
                     difficulty === 'hard' ? 15000 : 50000;
    
    const variation = Math.random() * 0.5 + 0.75; // 75% a 125% do valor base
    const prizeAmount = Math.floor(basePrize * variation);

    return {
      id: `vault_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: vaultNames[Math.floor(Math.random() * vaultNames.length)],
      prizeAmount,
      difficulty,
      location: locations[Math.floor(Math.random() * locations.length)],
      timeFound: new Date().toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
  }, []);

  // Iniciar caça
  const startHunting = useCallback(() => {
    clearAllIntervals();
    setIsHunting(true);
    setFoundVaults([]);
    setCurrentPhaseIndex(0);
    huntStartTimeRef.current = Date.now();
    setHuntingStats({
      totalTime: 0,
      vaultsFound: 0,
      currentPhase: HUNTING_PHASES[0].name,
      progress: 0
    });
    
    onHuntStart?.();
  }, [clearAllIntervals, onHuntStart]);

  // Interromper caça
  const stopHunting = useCallback(() => {
    clearAllIntervals();
    setIsHunting(false);
    setCurrentPhaseIndex(0);
    setTimeRemaining(0);
    
    // Calcular tempo final preciso
    const finalTime = Date.now() - huntStartTimeRef.current;
    const finalStats = {
      totalTime: finalTime,
      vaultsFound: foundVaults.length,
      currentPhase: 'Caça Interrompida',
      progress: 0
    };
    
    setHuntingStats(finalStats);
    onHuntStop?.();
  }, [clearAllIntervals, foundVaults.length, onHuntStop]);

  // Lógica principal da caça
  useEffect(() => {
    if (!isHunting) return;

    const currentPhase = HUNTING_PHASES[currentPhaseIndex];
    if (!currentPhase) {
      // Finalizar caça
      clearAllIntervals();
      setIsHunting(false);
      const finalTime = Date.now() - huntStartTimeRef.current;
      const finalStats = {
        totalTime: finalTime,
        vaultsFound: foundVaults.length,
        currentPhase: 'Caça Finalizada',
        progress: 100
      };
      setHuntingStats(finalStats);
      onHuntComplete?.(finalStats, foundVaults);
      return;
    }

    setTimeRemaining(currentPhase.duration);
    
    // Controle de fase
    phaseIntervalRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 100) {
          // Fase completa, avançar para próxima
          setCurrentPhaseIndex(prevIndex => prevIndex + 1);
          return 0;
        }
        return prev - 100;
      });
    }, 100);

    // Simular descoberta de cofres durante a fase
    vaultTimeoutRef.current = setTimeout(() => {
      // Chance de encontrar cofre (70% de chance)
      if (Math.random() < 0.7) {
        const newVault = generateRandomVault();
        setFoundVaults(prev => {
          const updatedVaults = [...prev, newVault];
          onVaultFound?.(newVault);
          return updatedVaults;
        });
        setHuntingStats(prev => ({
          ...prev,
          vaultsFound: prev.vaultsFound + 1
        }));
      }
    }, Math.random() * currentPhase.duration);

    return () => {
      clearAllIntervals();
    };
  }, [isHunting, currentPhaseIndex, generateRandomVault, clearAllIntervals, foundVaults.length, onVaultFound, onHuntComplete]);

  // Cronômetro independente
  useEffect(() => {
    if (!isHunting) return;

    const timerInterval = setInterval(() => {
      const currentTime = Date.now() - huntStartTimeRef.current;
      setHuntingStats(prev => ({
        ...prev,
        totalTime: currentTime
      }));
    }, 100);

    return () => clearInterval(timerInterval);
  }, [isHunting]);

  // Atualizar progresso baseado nas fases completadas
  useEffect(() => {
    if (!isHunting) return;

    const totalPhases = HUNTING_PHASES.length;
    const completedPhases = currentPhaseIndex;
    const currentPhaseDuration = HUNTING_PHASES[currentPhaseIndex]?.duration || 0;
    const currentPhaseProgress = currentPhaseDuration > 0 ? 
      Math.max(0, (currentPhaseDuration - timeRemaining) / currentPhaseDuration) : 0;
    
    // Progresso = (fases completas + progresso da fase atual) / total de fases
    const totalProgress = ((completedPhases + currentPhaseProgress) / totalPhases) * 100;
    
    setHuntingStats(prev => ({
      ...prev,
      currentPhase: HUNTING_PHASES[currentPhaseIndex]?.name || 'Finalizando...',
      progress: Math.min(totalProgress, 100)
    }));
  }, [isHunting, currentPhaseIndex, timeRemaining]);

  // Limpeza geral quando o componente é desmontado
  useEffect(() => {
    return () => {
      clearAllIntervals();
    };
  }, [clearAllIntervals]);

  const formatTime = (milliseconds: number): string => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const currentPhase = HUNTING_PHASES[currentPhaseIndex];
  const totalValue = foundVaults.reduce((sum, vault) => sum + vault.prizeAmount, 0);

  return (
    <div className="bg-slate-800 rounded-2xl border border-violet-500/20 overflow-hidden">
      {/* Header */}
      <div className="p-6 pb-0">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center border border-violet-500/30">
              <Search className="h-7 w-7 text-violet-300" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-violet-100">Caça aos Cofres</h2>
              <p className="text-slate-400">Explore e descubra cofres ocultos para saquear</p>
            </div>
          </div>
          
          {/* Estatísticas compactas no header quando ativo */}
          {isHunting && (
            <div className="flex items-center gap-6 bg-slate-700/30 rounded-xl px-4 py-3 self-start lg:self-auto">
              <div className="text-center">
                <div className="text-violet-200 font-bold text-lg">{huntingStats.vaultsFound}</div>
                <div className="text-slate-400 text-xs">Cofres</div>
              </div>
              <div className="w-px h-8 bg-slate-600"></div>
              <div className="text-center">
                <div className="text-violet-200 font-bold text-lg">{formatTime(huntingStats.totalTime)}</div>
                <div className="text-slate-400 text-xs">Tempo</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="p-6">
        {/* Estado inicial - sem caça ativa */}
        {!isHunting && foundVaults.length === 0 && (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-slate-700/50 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <Search className="h-10 w-10 text-slate-400" />
            </div>
            <p className="text-slate-300 mb-6 max-w-md mx-auto">
              Inicie uma caça para descobrir cofres ocultos. Cada varredura consome tempo, então use com estratégia!
            </p>
            <button
              onClick={startHunting}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl font-medium hover:from-violet-400 hover:to-purple-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transform hover:scale-105"
            >
              <Play className="h-5 w-5" />
              Iniciar Caça aos Cofres
            </button>
          </div>
        )}

        {/* Estado de caça ativa */}
        {isHunting && (
          <div className="space-y-4">
            {/* Status da caça */}
            <div className="bg-slate-700/30 rounded-xl p-5">
              {/* Barra de progresso com percentual */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 bg-slate-600/50 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-violet-500 to-purple-500 h-3 rounded-full transition-all duration-300 shadow-lg"
                    style={{ width: `${huntingStats.progress}%` }}
                  />
                </div>
                <span className="text-slate-400 text-sm font-medium min-w-[3rem]">{Math.round(huntingStats.progress)}%</span>
              </div>
              
              {/* Mensagem da fase atual */}
              {currentPhase && (
                <p className="text-slate-300 text-sm">{currentPhase.message}</p>
              )}
            </div>

            {/* Botão de interromper */}
            <div className="flex justify-center">
              <button
                onClick={stopHunting}
                className="flex items-center gap-2 px-6 py-3 bg-red-500/20 text-red-300 rounded-xl font-medium hover:bg-red-500/30 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/50 border border-red-500/30"
              >
                <Square className="h-4 w-4" />
                Interromper Caça
              </button>
            </div>
          </div>
        )}

        {/* Estado pós-caça - resultado final */}
        {!isHunting && foundVaults.length > 0 && (
          <div className="space-y-6">
            {/* Header do resultado com ícone de sucesso */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-2xl mx-auto mb-4 flex items-center justify-center border border-emerald-500/30">
                <CheckCircle className="h-8 w-8 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-emerald-100 mb-2">Caça Finalizada!</h3>
              <p className="text-slate-400">Sua caça aos cofres foi concluída</p>
            </div>

            {/* Resumo dos resultados em grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-700/40 rounded-xl p-5 border border-slate-600/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-violet-500/20 rounded-lg flex items-center justify-center">
                    <Target className="h-5 w-5 text-violet-300" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-violet-100">{foundVaults.length}</div>
                    <div className="text-slate-400 text-sm">Cofres Encontrados</div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-700/40 rounded-xl p-5 border border-slate-600/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Timer className="h-5 w-5 text-blue-300" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-100">{formatTime(huntingStats.totalTime)}</div>
                    <div className="text-slate-400 text-sm">Tempo de Caça</div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-700/40 rounded-xl p-5 border border-slate-600/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <Award className="h-5 w-5 text-emerald-300" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-emerald-100">{formatCurrency(totalValue)}</div>
                    <div className="text-slate-400 text-sm">Valor estimado</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Botões de ação */}
            <div className="flex justify-center">
              <button
                onClick={startHunting}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl font-medium hover:from-violet-400 hover:to-purple-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transform hover:scale-105"
              >
                <Play className="h-5 w-5" />
                Nova Caça
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VaultHunting;