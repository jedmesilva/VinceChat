import React from 'react';
import { Award, ChevronRight, Trophy, Crown, Gem, Star, Target, Zap } from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt: string;
}

interface AchievementsProps {
  achievements: Achievement[];
  isExpanded: boolean;
  onToggle: () => void;
}

const Achievements: React.FC<AchievementsProps> = ({ 
  achievements, 
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

  const getAchievementColor = (rarity: string) => {
    switch(rarity) {
      case 'common':
        return 'bg-slate-500/20 text-slate-300 border-slate-400/30';
      case 'rare':
        return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
      case 'epic':
        return 'bg-purple-500/20 text-purple-300 border-purple-400/30';
      case 'legendary':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-400/30';
    }
  };

  const getAchievementIcon = (icon: string) => {
    switch(icon) {
      case 'trophy':
        return <Trophy className="w-5 h-5" />;
      case 'crown':
        return <Crown className="w-5 h-5" />;
      case 'gem':
        return <Gem className="w-5 h-5" />;
      case 'star':
        return <Star className="w-5 h-5" />;
      case 'target':
        return <Target className="w-5 h-5" />;
      case 'zap':
        return <Zap className="w-5 h-5" />;
      default:
        return <Award className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-600/30 mb-6">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center space-x-3">
          <Award className="w-5 h-5 text-violet-400" />
          <h3 className="text-lg font-semibold text-white">Conquistas</h3>
          <span className="px-2 py-1 bg-violet-500/20 text-violet-300 rounded-full text-xs font-medium">
            {achievements.length}
          </span>
        </div>
        <ChevronRight className={`w-5 h-5 text-slate-400 transform transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
      </div>
      
      {isExpanded && (
        <div className="px-4 pb-4 space-y-3">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-xl">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getAchievementColor(achievement.rarity)}`}>
                {getAchievementIcon(achievement.icon)}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-white">{achievement.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAchievementColor(achievement.rarity)}`}>
                    {achievement.rarity}
                  </span>
                </div>
                <div className="text-xs text-slate-400">{achievement.description}</div>
                <div className="text-xs text-slate-500">Desbloqueado em {formatDate(achievement.unlockedAt)}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Achievements;