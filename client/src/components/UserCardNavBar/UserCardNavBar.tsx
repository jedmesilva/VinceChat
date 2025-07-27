import React, { useState } from 'react';
import { Shield, Crown, Skull, Trophy } from 'lucide-react';

interface Title {
  id: string;
  name: string;
  type: 'guardian' | 'raider' | 'owner' | 'special' | 'default';
}

interface UserData {
  name: string;
  avatar?: string;
  titles: Title[];
}

interface UserCardNavBarProps {
  userData: UserData;
  onDropdownToggle?: () => void;
}

const UserCardNavBar: React.FC<UserCardNavBarProps> = ({ userData, onDropdownToggle }) => {
  const [imageError, setImageError] = useState(false);

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((word: string) => word.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  };

  const getTitleIcon = (type: string) => {
    switch(type) {
      case 'guardian':
        return <Shield className="w-3 h-3" />;
      case 'raider':
        return <Skull className="w-3 h-3" />;
      case 'owner':
        return <Crown className="w-3 h-3" />;
      case 'special':
        return <Crown className="w-3 h-3" />;
      default:
        return <Trophy className="w-3 h-3" />;
    }
  };

  const getTitleColor = (type: string): string => {
    return 'bg-violet-500/20 text-violet-300 border-violet-400/30';
  };

  return (
    <div 
      className="flex items-center space-x-3 cursor-pointer hover:bg-slate-700/30 rounded-lg px-3 py-2 transition-all duration-200"
      onClick={onDropdownToggle}
    >
      <div className="text-right">
        <h3 className="text-sm font-semibold text-white truncate max-w-[120px]">{userData.name}</h3>
        <div className="flex items-center justify-end space-x-1 mt-1">
          {userData.titles.slice(0, 2).map((title: Title) => (
            <div key={title.id} className={`flex items-center space-x-1 px-1.5 py-0.5 rounded text-xs font-medium border ${getTitleColor(title.type)}`}>
              {getTitleIcon(title.type)}
              <span className="hidden sm:inline">{title.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="relative">
        <div className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center">
          {!imageError && userData.avatar ? (
            <img 
              src={userData.avatar} 
              alt={userData.name}
              className="w-10 h-10 rounded-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <span className="text-white text-sm font-semibold">
              {getInitials(userData.name)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCardNavBar;