import React, { useState, useEffect } from 'react';
import { Clock, LockOpen } from 'lucide-react';

interface VaultTimerProps {
  onClose: () => void;
  closeButtonText?: string;
  timerLabel?: string;
  className?: string;
}

const VaultTimer: React.FC<VaultTimerProps> = ({ 
  onClose, 
  closeButtonText = "Sair",
  timerLabel = "Cofre aberto",
  className = ""
}) => {
  const [openTime, setOpenTime] = useState(0);

  // Timer para cofre aberto
  useEffect(() => {
    const timer = setInterval(() => {
      setOpenTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-slate-600/30 ${className}`}>
      <div className="flex justify-between items-center">
        {/* Status Section */}
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-violet-400" />
          <span className="text-sm font-mono font-medium text-violet-400">
            {formatTime(openTime)}
          </span>
          <span className="text-sm font-medium text-slate-300">- {timerLabel}</span>
        </div>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="flex items-center gap-2 bg-slate-700/80 hover:bg-slate-600/80 text-slate-300 hover:text-white px-3 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500/50"
        >
          <LockOpen className="h-4 w-4" />
          <span className="text-sm font-medium">{closeButtonText}</span>
        </button>
      </div>
    </div>
  );
};

export default VaultTimer;