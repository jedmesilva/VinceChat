import React from 'react';
import { 
  Shield, 
  Crown, 
  Star,
  Skull,
  Trophy
} from 'lucide-react';

interface UserCardNavbarProps {
  userData: {
    name: string;
    avatar: string;
    titles: Array<{
      id: string;
      name: string;
      type: 'guardian' | 'raider' | 'owner' | 'special';
      icon: string;
      earnedAt: string;
    }>;
  };
  showDropdown?: boolean;
  onDropdownToggle?: () => void;
}

const UserCardNavbar: React.FC<UserCardNavbarProps> = ({ 
  userData, 
  showDropdown = false,
  onDropdownToggle 
}) => {
  const getTitleIcon = (type: string) => {
    switch(type) {
      case 'guardian':
        return <Shield className="w-3 h-3" />;
      case 'raider':
        return <Skull className="w-3 h-3" />;
      case 'owner':
        return <Crown className="w-3 h-3" />;
      case 'special':
        return <Star className="w-3 h-3" />;
      default:
        return <Trophy className="w-3 h-3" />;
    }
  };

  const getTitleColor = (type: string) => {
    switch(type) {
      case 'guardian':
        return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
      case 'raider':
        return 'bg-red-500/20 text-red-300 border-red-400/30';
      case 'owner':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30';
      case 'special':
        return 'bg-purple-500/20 text-purple-300 border-purple-400/30';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-400/30';
    }
  };

  return (
    <div 
      className="flex items-center space-x-3 cursor-pointer hover:bg-slate-700/30 rounded-lg px-3 py-2 transition-all duration-200"
      onClick={onDropdownToggle}
    >
      {/* Seção de conteúdo textual */}
      <div className="flex-1 min-w-0">
        {/* Nome do usuário */}
        <h3 className="text-sm font-semibold text-white truncate">
          {userData.name}
        </h3>
        
        {/* Container dos títulos/badges */}
        <div className="flex items-center space-x-1 mt-1">
          {userData.titles.slice(0, 2).map((title) => (
            <div 
              key={title.id} 
              className={`flex items-center space-x-1 px-1.5 py-0.5 rounded text-xs font-medium border ${getTitleColor(title.type)}`}
            >
              {getTitleIcon(title.type)}
              <span className="hidden sm:inline">{title.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Seção da imagem */}
      <div className="flex-shrink-0">
        <img 
          src={userData.avatar} 
          alt={userData.name}
          className="w-10 h-10 rounded-full object-cover border-2 border-violet-500/50"
        />
      </div>
    </div>
  );
};

export default UserCardNavbar;