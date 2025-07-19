import React from 'react';
import { PanelLeftOpen, PanelLeftClose } from 'lucide-react';

interface NavbarProps {
  onOpenSidebar?: () => void;
  isMyVaultVisible?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenSidebar, isMyVaultVisible = true }) => {
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
            className="w-9 h-9 bg-slate-700/50 rounded-xl flex items-center justify-center hover:bg-slate-600/70 transition-all duration-200 border border-slate-600/20"
            title={isMyVaultVisible ? "Ocultar Meu Cofre" : "Mostrar Meu Cofre"}
          >
            {isMyVaultVisible ? (
              <PanelLeftClose className="w-5 h-5 text-slate-300" />
            ) : (
              <PanelLeftOpen className="w-5 h-5 text-slate-300" />
            )}
          </button>
        </div>
        
        {/* Empty space to maintain layout balance */}
        <div className="flex items-center">
          {/* Space for future right-side elements */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;