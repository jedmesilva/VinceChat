import React from 'react';
import { PanelLeftOpen, PanelLeftClose } from 'lucide-react';
import UserCardNavbar from '@/components/UserCardNavbar/UserCardNavbar';

interface NavbarProps {
  onOpenSidebar?: () => void;
  isMyVaultVisible?: boolean;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLogoutClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onOpenSidebar, 
  isMyVaultVisible = true,
  user,
  onProfileClick,
  onSettingsClick,
  onLogoutClick
}) => {
  const handleTogglePanel = () => {
    if (onOpenSidebar) {
      onOpenSidebar();
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-20 bg-slate-800 border-b border-slate-700/50">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Toggle MyVault panel button */}
        <div className="flex items-center">
          <button 
            onClick={handleTogglePanel}
            className="w-9 h-9 min-w-[36px] min-h-[36px] max-w-[36px] max-h-[36px] bg-slate-700/50 rounded-xl flex items-center justify-center hover:bg-slate-600/70 transition-all duration-200 border border-slate-600/20"
            title={isMyVaultVisible ? "Ocultar Meu Cofre" : "Mostrar Meu Cofre"}
            style={{ aspectRatio: '1' }}
          >
            {isMyVaultVisible ? (
              <PanelLeftClose className="w-5 h-5 text-slate-300 flex-shrink-0" />
            ) : (
              <PanelLeftOpen className="w-5 h-5 text-slate-300 flex-shrink-0" />
            )}
          </button>
        </div>
        
        {/* User card on the right */}
        <div className="flex items-center">
          <UserCardNavbar 
            user={user}
            onProfileClick={onProfileClick}
            onSettingsClick={onSettingsClick}
            onLogoutClick={onLogoutClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;