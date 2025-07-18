import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'wouter';
import MainChatVault from '../components/ChatVault/MainChatVault';
import MyVaultMain from '../components/MyVault/MyVaultMain';
import Timer from '../components/Timer/Timer';
import { Crown, Gem, Shield, Trophy, Gift } from 'lucide-react';

interface VaultData {
  id: string;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'legendary';
  description: string;
  isLocked: boolean;
}

const ChatVaultPage: React.FC = () => {
  const { vaultId } = useParams<{ vaultId: string }>();
  const [, setLocation] = useLocation();
  const [vault, setVault] = useState<VaultData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    const loadVault = async () => {
      try {
        // Simula carregamento dos dados do cofre baseado no ID
        // Em uma aplicação real, isso viria de uma API
        const sampleVaults: Record<string, VaultData> = {
          '1': {
            id: '1',
            name: 'Cofre do Iniciante',
            difficulty: 'easy',
            description: 'Perfeito para começar sua jornada na conquista de cofres',
            isLocked: true
          },
          '2': {
            id: '2',
            name: 'Tesouro Perdido',
            difficulty: 'medium',
            description: 'Um mistério antigo aguarda ser desvendado pelos corajosos',
            isLocked: true
          },
          '3': {
            id: '3',
            name: 'Cofre do Mestre',
            difficulty: 'hard',
            description: 'Apenas os mais habilidosos conseguem abrir este desafio',
            isLocked: true
          },
          '4': {
            id: '4',
            name: 'Lendário Dourado',
            difficulty: 'legendary',
            description: 'O cofre mais desafiador de todos os tempos - seus segredos são inestimáveis',
            isLocked: true
          },
          '5': {
            id: '5',
            name: 'Cofre Conquistado',
            difficulty: 'easy',
            description: 'Já foi aberto por alguém especial como você',
            isLocked: false
          },
          '6': {
            id: '6',
            name: 'Segredo Corporativo',
            difficulty: 'medium',
            description: 'Informações confidenciais que podem mudar tudo',
            isLocked: true
          }
        };

        const vaultData = sampleVaults[vaultId || ''];
        if (vaultData) {
          setVault(vaultData);
        } else {
          // Redireciona para a página inicial se o cofre não for encontrado
          setLocation('/');
        }
      } catch (error) {
        console.error('Erro ao carregar cofre:', error);
        setLocation('/');
      } finally {
        setLoading(false);
      }
    };

    loadVault();
  }, [vaultId, setLocation]);

  const getVaultIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return Gift;
      case 'medium':
        return Gem;
      case 'hard':
        return Shield;
      case 'legendary':
        return Crown;
      default:
        return Trophy;
    }
  };

  const getConvictionLevel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 25;
      case 'medium':
        return 50;
      case 'hard':
        return 75;
      case 'legendary':
        return 90;
      default:
        return 50;
    }
  };

  const getOffensiveCount = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 3;
      case 'medium':
        return 5;
      case 'hard':
        return 8;
      case 'legendary':
        return 12;
      default:
        return 5;
    }
  };

  // Removido handleVaultAction - deixar MainChatVault usar comportamento padrão

  const handleBackToVaults = () => {
    setLocation('/');
  };

  const handleTimerStart = () => {
    setTimerActive(true);
  };

  const handleTimerAbandon = () => {
    setTimerActive(false);
    setLocation('/');
  };

  const handleTimerTimeUp = () => {
    setTimerActive(false);
    // Aqui você pode adicionar lógica para quando o tempo acabar
    console.log('Tempo esgotado!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Carregando cofre...</p>
        </div>
      </div>
    );
  }

  if (!vault) {
    return null; // Já redirecionou para a página inicial
  }

  return (
    <div 
      className="w-full bg-gray-900 flex flex-col overflow-hidden"
      style={{ height: '100dvh' }}
    >
      {/* Timer no topo - altura automática */}
      <div className="flex-shrink-0">
        <Timer
          initialTime={300}
          onStart={handleTimerStart}
          onAbandon={handleTimerAbandon}
          onTimeUp={handleTimerTimeUp}
        />
      </div>

      {/* Container principal com MyVault e Chat lado a lado */}
      <div className="flex-1 min-h-0 w-full flex overflow-hidden">
        {/* MyVault - lado esquerdo */}
        <div className="w-1/3 min-w-0 flex-shrink-0 border-r border-slate-700/50">
          <MyVaultMain />
        </div>

        {/* MainChatVault - lado direito */}
        <div className="flex-1 min-w-0">
          <MainChatVault
            vaultName={vault.name}
            vaultIcon={getVaultIcon(vault.difficulty)}
            conviction={getConvictionLevel(vault.difficulty)}
            offensiveCount={getOffensiveCount(vault.difficulty)}
            isVaultLocked={vault.isLocked}
            vaultActionLabel={vault.isLocked ? "Saquear" : "Conquistado"}
            inputPlaceholder={vault.isLocked ? "Digite sua mensagem para convencer..." : "Este cofre já foi conquistado!"}
            initialMessages={[
              {
                id: 'welcome',
                text: `Bem-vindo ao ${vault.name}! ${vault.description}`,
                isUser: false,
                timestamp: new Date(),
                authorName: 'IA Guardian',
                authorColor: 'bg-violet-600/80',
                userType: 'guardian'
              }
            ]}
            items={[{id: 'item1', name: 'Gold', type: 'money', value: 100}]}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatVaultPage;