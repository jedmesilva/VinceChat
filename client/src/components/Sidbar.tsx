// client/src/components/Sidbar/Sidebar.tsx
import React, { useState } from 'react';
import UserHeader from '@/components/Sidbar/UserHeader';
import VaultSidebar from '@/components/Sidbar/VaultSidebar';
import Footer from '@/components/Sidbar/Footer';

const Sidebar = () => {
  // Estados que podem ser compartilhados entre componentes
  const [showItems, setShowItems] = useState(true);
  const [userSectionPressed, setUserSectionPressed] = useState(false);
  const [showSidebarButton, setShowSidebarButton] = useState(false);

  const [user] = useState({
    name: "João Lukas",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face&auto=format",
    vaultItems: 10,
    titles: ["guardião", "saqueador"]
  });

  const [prizes] = useState([
    { id: 1, amount: "R$5.000", type: "Prêmio em dinheiro", rarity: "Épico" },
    { id: 2, amount: "R$5.000", type: "Prêmio em dinheiro", rarity: "Épico" },
    { id: 3, amount: "R$5.000", type: "Prêmio em dinheiro", rarity: "Épico" },
    { id: 4, amount: "R$5.000", type: "Prêmio em dinheiro", rarity: "Épico" },
    { id: 5, amount: "R$5.000", type: "Prêmio em dinheiro", rarity: "Épico" }
  ]);

  // Handlers que podem ser passados para os componentes filhos
  const handleUserClick = () => {
    setUserSectionPressed(true);
    setTimeout(() => setUserSectionPressed(false), 150);
    alert('Acessar conta');
  };

  const handleCloseSidebar = () => {
    alert('Abrir sidebar');
  };

  const toggleShowItems = () => {
    setShowItems(!showItems);
  };

  const handleViewItemsClick = () => {
    alert('Ver itens');
  };

  return (
    <div className="h-full bg-slate-800 relative overflow-hidden w-full max-w-none flex flex-col">
      {/* Background Effect */}
      <div className="absolute inset-0 w-full">
        <div className="absolute inset-0 bg-slate-800" />
      </div>

      {/* User Header Component - Fixed at top */}
      <div className="flex-shrink-0">
        <UserHeader 
          user={user}
          userSectionPressed={userSectionPressed}
          onUserClick={handleUserClick}
          onCloseSidebar={handleCloseSidebar}
        />
      </div>



      {/* Vault Sidebar Component - Scrollable middle section */}
      <div className="flex-1 overflow-hidden">
        <VaultSidebar 
          user={user}
          prizes={prizes}
          showItems={showItems}
          onToggleShowItems={toggleShowItems}
        />
      </div>

      {/* Footer Component - Fixed at bottom */}
      <div className="flex-shrink-0">
        <Footer 
          onViewItemsClick={handleViewItemsClick}
        />
      </div>
    </div>
  );
};

export default Sidebar;