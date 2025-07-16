import React from 'react';
import { User, Mail, Phone, Calendar, ChevronRight } from 'lucide-react';

interface PersonalInfoProps {
  email: string;
  phone: string;
  joinDate: string;
  isExpanded: boolean;
  onToggle: () => void;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ 
  email, 
  phone, 
  joinDate, 
  isExpanded, 
  onToggle 
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-600/30 mb-6">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center space-x-3">
          <User className="w-5 h-5 text-violet-400" />
          <h3 className="text-lg font-semibold text-white">Informações Pessoais</h3>
        </div>
        <ChevronRight className={`w-5 h-5 text-slate-400 transform transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
      </div>
      
      {isExpanded && (
        <div className="px-4 pb-4 space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-xl">
            <Mail className="w-5 h-5 text-slate-400" />
            <div>
              <div className="text-sm font-medium text-white">{email}</div>
              <div className="text-xs text-slate-400">Email</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-xl">
            <Phone className="w-5 h-5 text-slate-400" />
            <div>
              <div className="text-sm font-medium text-white">{phone}</div>
              <div className="text-xs text-slate-400">Telefone</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-xl">
            <Calendar className="w-5 h-5 text-slate-400" />
            <div>
              <div className="text-sm font-medium text-white">{formatDate(joinDate)}</div>
              <div className="text-xs text-slate-400">Membro desde</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;