import React, { useState } from 'react';
import { Lock, DollarSign, ChevronRight, Eye, EyeOff, PanelLeft, Shield, Skull } from 'lucide-react';

interface SidbarProps {
  onClose?: () => void;
}

const Sidbar: React.FC<SidbarProps> = ({ onClose }) => {
  const [user] = useState({
    name: "João Lukas",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face&auto=format",
    vaultItems: 10,
    titles: ["guardião", "saqueador"] // Títulos conquistados
  });

  const [showItems, setShowItems] = useState(true);
  const [userSectionPressed, setUserSectionPressed] = useState(false);

  const [prizes] = useState([
    { id: 1, amount: "R$5.000" },
    { id: 2, amount: "R$5.000" },
    { id: 3, amount: "R$5.000" },
    { id: 4, amount: "R$5.000" },
    { id: 5, amount: "R$5.000" }
  ]);

  const handleBackClick = () => {
    alert('Voltar');
  };

  const handleUserClick = () => {
    setUserSectionPressed(true);
    setTimeout(() => setUserSectionPressed(false), 150);
    alert('Acessar conta');
  };

  const handleViewItemsClick = () => {
    alert('Ver itens');
  };

  const toggleShowItems = () => {
    setShowItems(!showItems);
  };

  const handleCloseSidebar = () => {
    if (onClose) {
      onClose();
    }
  };

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
    <div className="min-h-screen w-full bg-gray-900 relative overflow-hidden">
      {/* Immersive Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black" />

        {/* Vault Interior Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-800/20 to-slate-900/40" />

        {/* Metallic shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform skew-x-12" />
      </div>

      {/* User Section - Fixed Top */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-gray-800 flex w-full">
        {/* Left side - User info */}
        <div className={`flex-1 px-4 py-6 flex items-center min-h-24 transition-all duration-150 ${userSectionPressed ? 'bg-gray-700' : 'bg-gray-800'}`}>
          <button 
            onClick={handleUserClick}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-violet-500/50"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/20 to-purple-500/20" />
              </div>
              <div className="text-left">
                <h3 className="text-base font-semibold text-white">{user.name}</h3>
                <div className="flex items-center space-x-2 mt-1">
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
        <div className={`w-16 flex items-center justify-center transition-all duration-150 ${userSectionPressed ? 'bg-gray-700' : 'bg-gray-800'}`}>
          <button 
            onClick={handleUserClick}
            className="w-9 h-9 flex items-center justify-center hover:bg-slate-700/50 rounded-xl transition-all duration-200"
          >
            <ChevronRight className="w-5 h-5 text-slate-300" />
          </button>
        </div>

        {/* Divider */}
        <div className="w-px bg-slate-600/50"></div>

        {/* Right side - Close button area */}
        <div className="w-16 bg-slate-800 flex items-center justify-center">
          <button 
            onClick={handleCloseSidebar}
            className="w-9 h-9 bg-slate-700/50 rounded-xl flex items-center justify-center hover:bg-slate-600/70 transition-all duration-200 border border-slate-600/20"
          >
            <PanelLeft className="w-5 h-5 text-slate-300" />
          </button>
        </div>
      </div>

      {/* Header - Fixed Top (abaixo do usuário) */}
      <div className="fixed top-24 left-0 right-0 z-10 bg-slate-800 border-t border-slate-700/50 w-full">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-violet-500/20 rounded-xl flex items-center justify-center border border-violet-500/30">
              <Lock className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">Meu cofre</h1>
              <p className="text-sm text-slate-400">{user.vaultItems} itens</p>
            </div>
          </div>

          <button 
            onClick={toggleShowItems}
            className="w-9 h-9 bg-slate-700 rounded-full flex items-center justify-center hover:bg-slate-600 transition-all duration-200 border border-slate-600/30"
          >
            {showItems ? (
              <Eye className="w-5 h-5 text-white" />
            ) : (
              <EyeOff className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Prize List - Scrollable Content */}
      <div className="fixed top-44 bottom-20 left-0 right-0 px-4 py-4 overflow-y-auto z-0 w-full">
        <div className="space-y-3 w-full">
          {prizes.map((prize) => (
            <div 
              key={prize.id}
              className="relative w-full bg-slate-800 rounded-2xl p-4 border border-violet-500/30 hover:scale-[1.02] transition-all duration-300 group shadow-lg hover:shadow-violet-500/20"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

              {/* Content */}
              <div className={`flex items-center space-x-3 relative z-0 ${!showItems ? 'blur-md' : ''}`}>
                <div className="w-12 h-12 bg-violet-500 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/30">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">{prize.amount}</h3>
                  <p className="text-sm text-slate-400">Prêmio em dinheiro</p>
                </div>

                {/* Rarity badge */}
                <div className="px-3 py-1 rounded-full text-xs font-bold bg-violet-500/20 text-violet-300 border border-violet-400/30">
                  Épico
                </div>
              </div>

              {/* Hidden item message */}
              {!showItems && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs rounded-2xl">
                  <div className="flex items-center space-x-2">
                    <EyeOff className="w-5 h-5 text-white" />
                    <span className="text-white font-medium">Item escondido</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section - Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-10 w-full">
        {/* Ver itens button */}
        <div className="px-4 py-3 bg-slate-800">
          <button 
            onClick={handleViewItemsClick}
            className="w-full flex items-center justify-center space-x-2 py-3 bg-slate-700/80 hover:bg-slate-600/80 backdrop-blur-sm rounded-xl border border-slate-600/30 transition-all duration-200"
          >
            <span className="text-base font-medium text-white">Ver itens</span>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidbar;