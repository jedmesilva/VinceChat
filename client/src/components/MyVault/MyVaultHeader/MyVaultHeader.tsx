
import React from 'react';
import VaultHeaderComponent from '../../VaultHeaderComponent/VaultHeaderComponent';
import { Lock, MessageCircle } from 'lucide-react';

interface MyVaultHeaderProps {
  className?: string;
  onChatToggle?: () => void;
}

const MyVaultHeader: React.FC<MyVaultHeaderProps> = ({
  className = '',
  onChatToggle = () => {}
}) => {
  return (
    <div className={`bg-slate-800 border-b border-slate-700/50 ${className}`}>
      {/* Cabeçalho principal usando o mesmo componente do ChatVault */}
      <VaultHeaderComponent 
        vaultName="Meu Cofre"
        vaultIcon={Lock}
        chatLabel="Gerencie seus itens"
        showAbandonButton={false}
        showChatToggle={true}
        onChatToggle={onChatToggle}
      />
    </div>
  );
};

export default MyVaultHeader;
