import React from 'react';
import { Lock, LockOpen } from 'lucide-react';
import { useLocation } from 'wouter';
import UserCardNavBar from '@/components/UserCardNavBar/UserCardNavBar';

interface NavbarProps {
  onOpenSidebar?: () => void;
  isMyVaultVisible?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenSidebar, isMyVaultVisible = true }) => {
  const [, setLocation] = useLocation();
  
  const handleTogglePanel = () => {
    if (onOpenSidebar) {
      onOpenSidebar();
    }
  };

  const handleUserCardClick = () => {
    setLocation('/account');
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-20 bg-slate-800 border-b border-slate-700/50">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Toggle MyVault panel button */}
        <div className="flex items-center">
          <button 
            onClick={handleTogglePanel}
            className="flex items-center gap-2 bg-slate-700/50 rounded-xl px-3 py-2 hover:bg-slate-600/70 transition-all duration-200 border border-slate-600/20"
            title={isMyVaultVisible ? "Fechar Meu Cofre" : "Abrir Meu Cofre"}
          >
            {isMyVaultVisible ? (
              <>
                <LockOpen className="w-5 h-5 text-slate-300 flex-shrink-0" />
                <span className="text-sm font-medium text-slate-300">Fechar meu cofre</span>
              </>
            ) : (
              <>
                <Lock className="w-5 h-5 text-slate-300 flex-shrink-0" />
                <span className="text-sm font-medium text-slate-300">Abrir meu cofre</span>
              </>
            )}
          </button>
        </div>
        
        {/* User card on the right */}
        <div className="flex items-center">
          <UserCardNavBar 
            userData={{
              name: "João Silva",
              avatar: undefined,
              titles: [
                { id: "1", name: "Guardião", type: "guardian" },
                { id: "2", name: "Explorador", type: "default" }
              ]
            }}
            onDropdownToggle={handleUserCardClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;