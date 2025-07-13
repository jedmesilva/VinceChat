import React, { useState, useEffect } from 'react';
import { Clock, Square, Play } from 'lucide-react';

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
  const [isActive, setIsActive] = useState(false);
  const totalTime = initialTime;

  useEffect(() => {
    let interval = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      onTimeUp();
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeLeft, onTimeUp]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (timeLeft / totalTime) * 100;

  const handleAbandon = () => {
    setIsActive(false);
    setTimeLeft(0);
    onAbandon();
  };

  const handleStart = () => {
    setIsActive(true);
    onStart();
  };

  return (
    <div 
      className="relative overflow-hidden border-b border-slate-700/50"
      style={{
        background: `linear-gradient(to right, rgba(139, 92, 246, 0.2) ${progressPercentage}%, #1e293b ${progressPercentage}%)`
      }}
    >
      <div className="flex items-center justify-between px-4 py-2 relative z-10">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <div className="w-6 h-6 bg-violet-500/20 rounded-lg flex items-center justify-center">
              <Clock size={14} className="text-violet-400" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-base font-mono font-bold text-white">
            {formatTime(timeLeft)}
            <span className="text-slate-400 font-sans font-normal text-sm">Disponível</span>
          </div>
        </div>

        {isActive && timeLeft > 0 ? (
          <button
            onClick={handleAbandon}
            className="bg-red-500 hover:bg-red-400 active:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5"
          >
            <Square size={12} fill="currentColor" />
            Abandonar
          </button>
        ) : (
          <button
            onClick={handleStart}
            className="bg-violet-500 hover:bg-violet-400 active:bg-violet-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5"
          >
            <Play size={12} fill="currentColor" />
            Começar
          </button>
        )}
      </div>
    </div>
  );
};

export default Timer;