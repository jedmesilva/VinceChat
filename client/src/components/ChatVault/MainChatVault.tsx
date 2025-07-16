import React, { useState } from 'react';
import { Crown } from 'lucide-react';
import ChatVaultHeader from './ChatVaultHeader/ChatVaultHeader';
import ChatVaultMessageInput from './ChatVaultMessageInput/ChatVaultMessageInput';
import ChatVaultHistory from './ChatVaultHistory/ChatVaultHistory';
import VaultSectionChat from '../VaultSectionChat/VaultSectionChat';
import VaultSheet from '../VaultSheet/VaultSheet';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isTyping?: boolean;
  authorName: string;
  authorAvatar?: string;
  authorColor?: string;
}

interface MainChatVaultProps {
  vaultName?: string;
  vaultIcon?: React.ComponentType<{ className?: string }>;
  conviction?: number;
  offensiveCount?: number;
  initialMessages?: Message[];
  onSendMessage?: (message: string) => void;
  onVaultAction?: () => void;
  isVaultLocked?: boolean;
  vaultActionLabel?: string;
  inputPlaceholder?: string;
  onAbandon?: () => void;
}

const MainChatVault: React.FC<MainChatVaultProps> = ({
  vaultName = "Cofre Misterioso",
  vaultIcon = Crown,
  conviction = 75,
  offensiveCount = 5,
  initialMessages = [],
  onSendMessage,
  onVaultAction,
  isVaultLocked = true,
  vaultActionLabel = "Saquear",
  inputPlaceholder = "Digite sua mensagem para convencer...",
  onAbandon
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [currentConviction, setCurrentConviction] = useState(conviction);
  const [isVaultSheetOpen, setIsVaultSheetOpen] = useState(false);

  // Dados de exemplo do cofre
  const vaultData = {
    id: '1',
    name: vaultName,
    prizeAmount: 5000,
    difficulty: 'medium' as const,
    prizes: [
      {
        id: '1',
        name: 'Prêmio em Dinheiro',
        type: 'money' as const,
        value: 2500
      },
      {
        id: '2',
        name: 'Troféu de Ouro',
        type: 'trophy' as const
      },
      {
        id: '3',
        name: 'Caixa Misteriosa',
        type: 'gift' as const
      }
    ]
  };

  const handleSendMessage = (message: string) => {
    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
      timestamp: new Date(),
      isTyping: false,
      authorName: 'Você',
      authorColor: 'bg-slate-600'
    };

    setMessages(prev => [...prev, newUserMessage]);

    // Chamar callback personalizado se fornecido
    if (onSendMessage) {
      onSendMessage(message);
    } else {
      // Comportamento padrão: simular resposta da IA
      setTimeout(() => {
        const responses = [
          "Hmm, interessante argumento. Mas preciso de mais detalhes...",
          "Você está sendo persuasivo, mas ainda não me convenceu completamente.",
          "Essa é uma abordagem inteligente. Continue tentando...",
          "Estou começando a considerar sua proposta. Me diga mais...",
          "Sua persistência é admirável, mas preciso de garantias..."
        ];

        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: responses[Math.floor(Math.random() * responses.length)],
          isUser: false,
          timestamp: new Date(),
          isTyping: true,
          authorName: 'IA Guardian',
          authorColor: 'bg-violet-600/80'
        };

        setMessages(prev => [...prev, aiResponse]);
        
        // Atualizar convencimento aleatoriamente
        setCurrentConviction(prev => Math.min(100, prev + Math.floor(Math.random() * 10) + 1));
      }, 1000);
    }
  };

  const handleVaultAction = () => {
    if (onVaultAction) {
      onVaultAction();
    } else {
      setIsVaultSheetOpen(true);
    }
  };

  const handleCloseVaultSheet = () => {
    setIsVaultSheetOpen(false);
  };

  const handleChatClick = () => {
    setIsVaultSheetOpen(false);
    // Focar no input de mensagem
    const messageInput = document.querySelector('input[placeholder*="Digite sua mensagem"]') as HTMLInputElement;
    if (messageInput) {
      messageInput.focus();
    }
  };

  const handleAbandon = () => {
    if (onAbandon) {
      onAbandon();
    } else {
      // Comportamento padrão: resetar estado do chat
      setMessages([]);
      setCurrentConviction(conviction);
      console.log('Chat abandonado - reiniciando...');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header sticky no topo - vai ficar abaixo do Timer */}
      <div className="sticky top-0 z-40">
        <ChatVaultHeader 
          vaultName={vaultName}
          vaultIcon={vaultIcon}
          conviction={currentConviction}
          offensiveCount={offensiveCount}
          onAbandon={handleAbandon}
        />
      </div>
      
      {/* Histórico do Chat com scroll */}
      <div className="flex-1 pb-44 overflow-hidden">
        <ChatVaultHistory messages={messages} />
      </div>

      {/* Seção fixa inferior com VaultSectionChat e Input */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <VaultSectionChat
          isLocked={isVaultLocked}
          onVaultClick={handleVaultAction}
          actionLabel={vaultActionLabel}
          vaultName={vaultName}
        />
        <ChatVaultMessageInput
          onSendMessage={handleSendMessage}
          placeholder={inputPlaceholder}
          disabled={!isVaultLocked}
        />
      </div>

      {/* VaultSheet Modal */}
      <VaultSheet
        vault={vaultData}
        isOpen={isVaultSheetOpen}
        onClose={handleCloseVaultSheet}
        onChatClick={handleChatClick}
      />
    </div>
  );
};

export default MainChatVault;