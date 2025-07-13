import React from 'react';
import { ChevronRight, PanelLeft, Shield, Skull } from 'lucide-react';

interface UserHeaderProps {
  user: {
    name: string;
    avatar: string;
    titles: string[];
  };
  userSectionPressed: boolean;
  onUserClick: () => void;
  onCloseSidebar: () => void;
  showSidebarButton?: boolean;
}

const UserHeader: React.FC<UserHeaderProps> = ({ 
  user, 
  userSectionPressed, 
  onUserClick, 
  onCloseSidebar,
  showSidebarButton = false
}) => {

  const getTitleIcon = (title) => {
    switch(title) {
      case 'guardião':
        return <Shield className="w-3 h-3 text-violet-400" />;
      case 'saqueador':
        return <Skull className="w-3 h-3 text-violet-400" />;
      default:
        return null;
    }
  };

  const getTitleColor = (title) => {
    switch(title) {
      case 'guardião':
        return 'bg-violet-500/20 text-violet-300 border-violet-400/30';
      case 'saqueador':
        return 'bg-violet-500/20 text-violet-300 border-violet-400/30';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-400/30';
    }
  };

  return (
    <div className="bg-slate-800 flex w-full relative z-10">
      {/* Left side - User info */}
      <div className={`flex-1 px-4 py-6 flex items-center min-h-24 transition-all duration-150 ${userSectionPressed ? 'bg-slate-700' : 'bg-slate-800'} min-w-0`}>
        <button 
          onClick={onUserClick}
          className="w-full flex items-center justify-between"
        >
          <div className="flex items-start space-x-3 min-w-0">
            <div className="relative flex-shrink-0">
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-violet-500/50"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/20 to-purple-500/20" />
            </div>
            <div className="text-left min-w-0 flex-1">
              <h3 className="text-base font-semibold text-white truncate">{user.name}</h3>
              <div className="flex flex-wrap items-center gap-1 mt-1">
                {user.titles.map((title, index) => (
                  <div key={index} className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-medium border ${getTitleColor(title)}`}>
                    {getTitleIcon(title)}
                    <span className="capitalize">{title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* Divider */}
      <div className="w-px bg-slate-600/50"></div>

      {/* Right side - User arrow button area */}
      <div className={`w-16 flex items-center justify-center transition-all duration-150 ${userSectionPressed ? 'bg-slate-700' : 'bg-slate-800'}`}>
        <button 
          onClick={onUserClick}
          className="w-9 h-9 flex items-center justify-center hover:bg-slate-700 rounded-xl transition-all duration-200"
        >
          <ChevronRight className="w-5 h-5 text-slate-300" />
        </button>
      </div>

      {showSidebarButton && (
        <>
          {/* Divider */}
          <div className="w-px bg-slate-600/50"></div>

          {/* Right side - Close button area */}
          <div className="w-16 bg-slate-800 flex items-center justify-center">
            <button 
              onClick={onCloseSidebar}
              className="w-9 h-9 bg-slate-700 rounded-xl flex items-center justify-center hover:bg-slate-600 transition-all duration-200 border border-slate-600"
            >
              <PanelLeft className="w-5 h-5 text-slate-300" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserHeader;