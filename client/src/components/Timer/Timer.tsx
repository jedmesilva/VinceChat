import React, { useState, useEffect, useCallback } from 'react';
import { Clock, Plus } from 'lucide-react';

interface TimerProps {
  initialTime?: number;
  onStart?: () => void;
  onAbandon?: () => void;
  onTimeUp?: () => void;
}

const Timer: React.FC<TimerProps> = ({ 
  initialTime = 300, 
  onStart = () => {}, 
  onAbandon = () => {}, 
  onTimeUp = () => {} 
}) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(true);
  const totalTime = initialTime;

  const handleTimeUp = useCallback(() => {
    onTimeUp();
  }, [onTimeUp]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      handleTimeUp();
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, timeLeft]);

  const addTime = () => {
    setTimeLeft(prevTime => prevTime + 60); // Adiciona 1 minuto
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (timeLeft / totalTime) * 100;

  return (
    <div 
      className="relative overflow-hidden border-b border-slate-700/50"
      style={{
        background: `linear-gradient(to right, rgba(139, 92, 246, 0.2) ${progressPercentage}%, #1e293b ${progressPercentage}%)`
      }}
    >
      <div className="flex items-center justify-between px-4 py-1 relative z-10">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <div className="w-6 h-6 bg-violet-500/20 rounded-lg flex items-center justify-center">
              <Clock size={14} className="text-violet-400" />
            </div>
          </div>
          <div className="text-base font-mono font-bold text-white">
            {formatTime(timeLeft)}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-slate-400 font-sans font-normal text-sm">
            Seu tempo
          </div>
          <button
            onClick={addTime}
            className="bg-violet-500 hover:bg-violet-600 rounded-lg flex items-center justify-center gap-1 px-2 py-0 transition-colors group transform scale-75"
            title="Adicionar 1 minuto"
          >
            <Plus size={12} className="text-white group-hover:text-gray-100" />
            <span className="text-white text-xs font-medium">Adicionar tempo</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;