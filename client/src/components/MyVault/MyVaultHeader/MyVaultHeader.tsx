
import React from 'react';
import VaultHeaderComponent from '../../VaultHeaderComponent/VaultHeaderComponent';
import { Lock, MessageCircle } from 'lucide-react';

interface MyVaultHeaderProps {
  className?: string;
  onChatToggle?: () => void;
  showChatToggle?: boolean;
}

const MyVaultHeader: React.FC<MyVaultHeaderProps> = ({
  className = '',
  onChatToggle = () => {},
  showChatToggle = false
}) => {
  return (
    <div className={`bg-gray-900 ${className}`}>
      {/* Cabeçalho principal usando o mesmo componente do ChatVault */}
      <VaultHeaderComponent 
        vaultName="Meu Cofre"
        vaultIcon={Lock}
        chatLabel="Gerencie seus itens"
        backgroundColor="bg-gray-900"
        showAbandonButton={false}
        showChatToggle={showChatToggle}
        onChatToggle={onChatToggle}
      />
    </div>
  );
};

export default MyVaultHeader;
