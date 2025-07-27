import React, { useState, useEffect, useCallback } from 'react';
import { Clock, Plus } from 'lucide-react';
import Checkout from '../Checkout/Checkout';

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
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
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
    setIsCheckoutOpen(true);
  };

  const handleTimeAdded = (timeInSeconds: number) => {
    setTimeLeft(prevTime => prevTime + timeInSeconds);
    setIsCheckoutOpen(false);
  };

  const handleCheckoutClose = () => {
    setIsCheckoutOpen(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (timeLeft / totalTime) * 100;

  return (
    <>
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

          <div className="flex items-center justify-between gap-2 flex-1">
            <div className="text-slate-400 font-sans font-normal text-sm ml-2">
              Seu tempo
            </div>
            <button
              onClick={addTime}
              className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 text-white px-2 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1 flex-shrink-0 leading-none"
              style={{ height: '28px', minHeight: '28px', maxHeight: '28px' }}
              title="Adicionar tempo"
            >
              <Plus size={9} className="text-white" />
              Adicionar tempo
            </button>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <Checkout 
        isOpen={isCheckoutOpen}
        onClose={handleCheckoutClose}
        onTimeAdded={handleTimeAdded}
      />
    </>
  );
};

export default Timer;