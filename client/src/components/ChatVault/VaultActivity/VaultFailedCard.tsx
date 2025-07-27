import React from 'react';
import { XCircle } from 'lucide-react';

interface VaultFailedCardProps {
  userName?: string;
  attempt?: number;
  maxAttempts?: number;
  timestamp?: Date;
  className?: string;
}

const VaultFailedCard: React.FC<VaultFailedCardProps> = ({ 
  userName = 'Alguém',
  attempt = 1,
  maxAttempts = 3,
  timestamp = new Date(),
  className = "" 
}) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'agora';
    if (diffMins < 60) return `${diffMins}m atrás`;
    if (diffHours < 24) return `${diffHours}h atrás`;
    return `${diffDays}d atrás`;
  };

  return (
    <div className={`flex justify-center mb-4 ${className}`}>
      <div className="max-w-md px-4 py-3 rounded-2xl border border-red-500/30 bg-red-500/10">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-slate-700/50 rounded-xl flex items-center justify-center">
              <XCircle className="w-4 h-4 text-red-400" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="text-sm leading-relaxed">
              <span>
                <span className="font-medium text-red-400">{userName}</span>
                <span className="text-slate-300"> falhou ao tentar abrir o cofre </span>
                <span className="text-slate-400">({attempt}/{maxAttempts})</span>
              </span>
            </div>
            
            <div className="text-xs text-slate-500 mt-1">
              {formatTime(timestamp)} • {formatTimeAgo(timestamp)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultFailedCard;