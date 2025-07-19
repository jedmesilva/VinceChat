
import React from 'react';
import VaultHeaderComponent from '../../VaultHeaderComponent/VaultHeaderComponent';
import { Lock } from 'lucide-react';

interface MyVaultHeaderProps {
  className?: string;
}

const MyVaultHeader: React.FC<MyVaultHeaderProps> = ({
  className = ''
}) => {
  return (
    <div className={`bg-slate-800 border-b border-slate-700/50 ${className}`}>
      {/* Cabeçalho principal usando o mesmo componente do ChatVault */}
      <VaultHeaderComponent 
        vaultName="Meu Cofre"
        vaultIcon={Lock}
        chatLabel="Gerencie seus itens"
        showAbandonButton={false}
      />
    </div>
  );
};

export default MyVaultHeader;
