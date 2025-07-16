import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface AccountHeaderProps {
  onBack: () => void;
  title?: string;
}

const AccountHeader: React.FC<AccountHeaderProps> = ({ 
  onBack, 
  title = "Minha Conta" 
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <button
        onClick={onBack}
        className="w-10 h-10 bg-slate-800/80 hover:bg-slate-700/80 rounded-xl flex items-center justify-center transition-all duration-200 border border-slate-600/30"
      >
        <ArrowLeft className="w-5 h-5 text-slate-300" />
      </button>
      
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-white text-left ml-4">{title}</h1>
      </div>
    </div>
  );
};

export default AccountHeader;