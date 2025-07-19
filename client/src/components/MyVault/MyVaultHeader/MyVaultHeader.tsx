import React from 'react';
import { Trophy } from 'lucide-react';

interface MyVaultHeaderProps {
  className?: string;
}

const MyVaultHeader: React.FC<MyVaultHeaderProps> = ({
  className = ''
}) => {

  return (
    <div className={`bg-slate-800 border-b border-slate-700/50 ${className}`}>
      <div className="w-full px-3 py-4">
        {/* Header content */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-violet-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-violet-400" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-xl font-bold text-white truncate">Meu Cofre</h1>
            <p className="text-xs sm:text-sm text-slate-400 truncate">Gerencie seus itens</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyVaultHeader;