import React from 'react';

interface VaultSheetBackgroundProps {
  difficulty: 'easy' | 'medium' | 'hard' | 'legendary';
}

const VaultSheetBackground: React.FC<VaultSheetBackgroundProps> = ({ difficulty }) => {
  const difficultyConfig = {
    easy: { bgAccent: 'bg-emerald-500/10' },
    medium: { bgAccent: 'bg-violet-500/10' },
    hard: { bgAccent: 'bg-red-500/10' },
    legendary: { bgAccent: 'bg-yellow-500/10' }
  };

  const currentConfig = difficultyConfig[difficulty];

  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black" />
      
      {/* Animated background elements */}
      <div className={`absolute top-20 left-20 w-64 h-64 ${currentConfig.bgAccent} rounded-full blur-3xl animate-pulse opacity-30`} />
      <div className={`absolute bottom-20 right-20 w-48 h-48 ${currentConfig.bgAccent} rounded-full blur-3xl animate-pulse opacity-20`} 
           style={{ animationDelay: '1s' }} />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '100px 100px'
        }} />
      </div>
    </div>
  );
};

export default VaultSheetBackground;