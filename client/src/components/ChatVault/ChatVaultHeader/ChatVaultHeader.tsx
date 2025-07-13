import React from 'react';
import { VaultHeaderComponent } from '../components/VaultHeaderComponent/VaultHeaderComponent';
import { ConvictionBar } from '../components/ConvictionBar/ConvictionBar';
import { OffensiveBar } from '../components/OffensiveBar/OffensiveBar';

interface ChatVaultHeaderProps {
  vaultName: string;
  vaultIcon?: React.ComponentType<{ className?: string }>;
  conviction?: number;
  offensiveCount?: number;
}

const ChatVaultHeader: React.FC<ChatVaultHeaderProps> = ({
  vaultName,
  vaultIcon,
  conviction = 75,
  offensiveCount = 5
}) => {
  return (
    <div className="bg-slate-800 border-b border-slate-700/50">
      {/* Cabeçalho principal com nome do cofre e texto "chat convince" */}
      <VaultHeaderComponent 
        vaultName={vaultName}
        vaultIcon={vaultIcon}
      />

      {/* Barra de convencimento */}
      <div className="border-t border-slate-700/30 bg-slate-800">
        <ConvictionBar
          conviction={conviction}
          animated={true}
          label="Convencimento"
          showIcon={true}
          showPercentage={true}
          size="sm"
        />
      </div>

      {/* Barra de ofensivas em andamento */}
      <OffensiveBar 
        offensiveCount={offensiveCount}
      />
    </div>
  );
};

export default ChatVaultHeader;