// client/src/components/Sidbar/Sidebar.tsx
import React, { useState } from 'react';
import UserHeader from '@/components/Sidbar/UserHeader';
import VaultSidebar from '@/components/Sidbar/VaultSidebar';
import Footer from '@/components/Sidbar/Footer';

const Sidebar = () => {
  // Estados que podem ser compartilhados entre componentes
  const [showItems, setShowItems] = useState(true);
  const [userSectionPressed, setUserSectionPressed] = useState(false);

  const [user] = useState({
    name: "João Lukas",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face&auto=format",
    vaultItems: 10,
    titles: ["guardião", "saqueador"]
  });

  const [prizes] = useState([
    { id: 1, amount: "R$5.000" },
    { id: 2, amount: "R$5.000" },
    { id: 3, amount: "R$5.000" },
    { id: 4, amount: "R$5.000" },
    { id: 5, amount: "R$5.000" }
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
    <div className="min-h-screen bg-gray-900 relative overflow-hidden w-full max-w-none">
      {/* Background Effect */}
      <div className="absolute inset-0 w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-800/20 to-slate-900/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform skew-x-12" />
      </div>

      {/* User Header Component */}
      <UserHeader 
        user={user}
        userSectionPressed={userSectionPressed}
        onUserClick={handleUserClick}
        onCloseSidebar={handleCloseSidebar}
      />

      {/* Vault Sidebar Component */}
      <VaultSidebar 
        user={user}
        prizes={prizes}
        showItems={showItems}
        onToggleShowItems={toggleShowItems}
      />

      {/* Footer Component */}
      <Footer 
        onViewItemsClick={handleViewItemsClick}
      />
    </div>
  );
};

export default Sidebar;