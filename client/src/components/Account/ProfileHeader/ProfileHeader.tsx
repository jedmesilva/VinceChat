import React from 'react';
import { Shield, Skull, Crown, Star, Trophy } from 'lucide-react';

interface Title {
  id: string;
  name: string;
  type: 'guardian' | 'raider' | 'owner' | 'special';
  icon: string;
  earnedAt: string;
}

interface ProfileHeaderProps {
  name: string;
  email: string;
  avatar: string;
  titles: Title[];
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  name, 
  email, 
  avatar, 
  titles 
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
    <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/30 mb-6">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img 
            src={avatar} 
            alt={name}
            className="w-20 h-20 rounded-full object-cover border-2 border-violet-500/50"
          />
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-white">{name}</h2>
          <p className="text-slate-400">{email}</p>
          <div className="flex items-center space-x-2 mt-2">
            {titles.map((title) => (
              <div key={title.id} className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-medium border ${getTitleColor(title.type)}`}>
                {getTitleIcon(title.type)}
                <span>{title.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;