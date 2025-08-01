import React, { useState } from 'react';
import { 
  User,
  Mail,
  Phone,
  Calendar,
  ChevronRight
} from 'lucide-react';

interface PersonalInfo {
  email: string;
  phone: string;
  joinDate: string;
}

interface PersonalInfoComponentProps {
  personalInfo: PersonalInfo;
  showCollapsed?: boolean;
}

const PersonalInfoComponent: React.FC<PersonalInfoComponentProps> = ({ 
  personalInfo,
  showCollapsed = true 
}) => {
  const [showPersonalInfo, setShowPersonalInfo] = useState(!showCollapsed);

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
      {showCollapsed ? (
        <div 
          className="flex items-center justify-between p-4 cursor-pointer"
          onClick={() => setShowPersonalInfo(!showPersonalInfo)}
        >
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-violet-400" />
            <h3 className="text-lg font-semibold text-white">Informações Pessoais</h3>
          </div>
          <ChevronRight className={`w-5 h-5 text-slate-400 transform transition-transform ${showPersonalInfo ? 'rotate-90' : ''}`} />
        </div>
      ) : (
        <div className="flex items-center space-x-3 p-4 border-b border-slate-600/30">
          <User className="w-5 h-5 text-violet-400" />
          <h3 className="text-lg font-semibold text-white">Informações Pessoais</h3>
        </div>
      )}
      
      {showPersonalInfo && (
        <div className="px-4 pb-4 space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-colors">
            <Mail className="w-5 h-5 text-slate-400" />
            <div>
              <div className="text-sm font-medium text-white">{personalInfo.email}</div>
              <div className="text-xs text-slate-400">Email</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-colors">
            <Phone className="w-5 h-5 text-slate-400" />
            <div>
              <div className="text-sm font-medium text-white">{personalInfo.phone}</div>
              <div className="text-xs text-slate-400">Telefone</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-colors">
            <Calendar className="w-5 h-5 text-slate-400" />
            <div>
              <div className="text-sm font-medium text-white">{formatDate(personalInfo.joinDate)}</div>
              <div className="text-xs text-slate-400">Membro desde</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInfoComponent;