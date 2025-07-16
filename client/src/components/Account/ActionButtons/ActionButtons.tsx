import React from 'react';
import { Edit, LogOut } from 'lucide-react';

interface ActionButtonsProps {
  onEditProfile: () => void;
  onLogout: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  onEditProfile, 
  onLogout 
}) => {
  return (
    <div className="space-y-3">
      <button
        onClick={onEditProfile}
        className="w-full flex items-center justify-center space-x-2 py-3 bg-violet-500/20 hover:bg-violet-500/30 rounded-xl border border-violet-400/30 transition-all duration-200"
      >
        <Edit className="w-5 h-5 text-violet-400" />
        <span className="text-white font-medium">Atualizar Dados</span>
      </button>
      
      <button
        onClick={onLogout}
        className="w-full flex items-center justify-center space-x-2 py-3 bg-red-500/20 hover:bg-red-500/30 rounded-xl border border-red-400/30 transition-all duration-200"
      >
        <LogOut className="w-5 h-5 text-red-400" />
        <span className="text-red-400 font-medium">Sair da Conta</span>
      </button>
    </div>
  );
};

export default ActionButtons;