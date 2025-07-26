import React from 'react';
import { Shield, Crown, Skull, Star, Trophy } from 'lucide-react';

interface Title {
  id: string;
  name: string;
  type: 'guardian' | 'raider' | 'owner' | 'special';
  icon: string;
  earnedAt: string;
}

interface UserCardProps {
  name: string;
  email: string;
  avatar?: string;
  titles?: Title[];
  className?: string;
  children?: React.ReactNode;
}

const UserCard: React.FC<UserCardProps> = ({
  name,
  email,
  avatar,
  titles = [],
  className = '',
  children
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

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  };

  return (
    <div className={`bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/30 ${className}`}>
      <div className="flex items-center space-x-4">
        <div className="relative">
          {avatar ? (
            <img 
              src={avatar} 
              alt={name}
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-slate-600 flex items-center justify-center">
              <span className="text-xl font-bold text-slate-200">
                {getInitials(name)}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white">{name}</h2>
          <p className="text-slate-400">{email}</p>
          {titles.length > 0 && (
            <div className="flex items-center space-x-2 mt-2 flex-wrap gap-1">
              {titles.map((title) => (
                <div 
                  key={title.id} 
                  className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-medium border ${getTitleColor(title.type)}`}
                >
                  {getTitleIcon(title.type)}
                  <span>{title.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {children && (
        <div className="mt-4 pt-4 border-t border-slate-600/30">
          {children}
        </div>
      )}
    </div>
  );
};

export default UserCard;