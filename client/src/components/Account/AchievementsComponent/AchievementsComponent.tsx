import React, { useState } from 'react';
import { 
  Award,
  ChevronRight,
  Trophy,
  Crown,
  Gem,
  Star,
  Target,
  Zap
} from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt: string;
}

interface AchievementsComponentProps {
  achievements?: Achievement[];
  showCollapsed?: boolean;
}

const AchievementsComponent: React.FC<AchievementsComponentProps> = ({ 
  achievements = [],
  showCollapsed = true 
}) => {
  const [showAchievements, setShowAchievements] = useState(!showCollapsed);

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getRarityText = (rarity: string) => {
    switch(rarity) {
      case 'common':
        return 'Comum';
      case 'rare':
        return 'Rara';
      case 'epic':
        return 'Épica';
      case 'legendary':
        return 'Lendária';
      default:
        return 'Comum';
    }
  };

  return (
    <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-600/30 mb-6">
      {showCollapsed ? (
        <div 
          className="flex items-center justify-between p-4 cursor-pointer"
          onClick={() => setShowAchievements(!showAchievements)}
        >
          <div className="flex items-center space-x-3">
            <Award className="w-5 h-5 text-violet-400" />
            <h3 className="text-lg font-semibold text-white">Conquistas</h3>
            <span className="px-2 py-1 bg-violet-500/20 text-violet-300 rounded-full text-xs font-medium">
              {achievements.length}
            </span>
          </div>
          <ChevronRight className={`w-5 h-5 text-slate-400 transform transition-transform ${showAchievements ? 'rotate-90' : ''}`} />
        </div>
      ) : (
        <div className="flex items-center space-x-3 p-4 border-b border-slate-600/30">
          <Award className="w-5 h-5 text-violet-400" />
          <h3 className="text-lg font-semibold text-white">Conquistas</h3>
          <span className="px-2 py-1 bg-violet-500/20 text-violet-300 rounded-full text-xs font-medium">
            {achievements.length}
          </span>
        </div>
      )}
      
      {showAchievements && (
        <div className="px-4 pb-4 space-y-3">
          {achievements.length === 0 ? (
            <div className="text-center py-8">
              <Trophy className="w-12 h-12 text-slate-500 mx-auto mb-3" />
              <p className="text-slate-400">Nenhuma conquista desbloqueada ainda</p>
              <p className="text-slate-500 text-sm mt-2">Continue jogando para desbloquear conquistas!</p>
            </div>
          ) : (
            achievements.map((achievement) => (
              <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-colors">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getAchievementColor(achievement.rarity)}`}>
                  {getAchievementIcon(achievement.icon)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-white">{achievement.name}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAchievementColor(achievement.rarity)}`}>
                      {getRarityText(achievement.rarity)}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">{achievement.description}</div>
                  <div className="text-xs text-slate-500 mt-1">Desbloqueado em {formatDate(achievement.unlockedAt)}</div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AchievementsComponent;