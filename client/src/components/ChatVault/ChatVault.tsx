import React, { useState } from 'react';
import { Crown } from 'lucide-react';
import ChatVaultHeader from './ChatVaultHeader/ChatVaultHeader';
import ChatVaultMessageInput from './ChatVaultMessageInput/ChatVaultMessageInput';
import ChatVaultHistory from './ChatVaultHistory/ChatVaultHistory';

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

interface ChatVaultProps {
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
}

const ChatVault: React.FC<ChatVaultProps> = ({
  vaultName = "Cofre Misterioso",
  vaultIcon = Crown,
  conviction = 75,
  offensiveCount = 5,
  initialMessages = [],
  onSendMessage,
  onVaultAction,
  isVaultLocked = true,
  vaultActionLabel = "Saquear",
  inputPlaceholder = "Digite sua mensagem para convencer..."
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [currentConviction, setCurrentConviction] = useState(conviction);

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
      console.log('Ação do cofre executada');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header fixo no topo */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <ChatVaultHeader 
          vaultName={vaultName}
          vaultIcon={vaultIcon}
          conviction={currentConviction}
          offensiveCount={offensiveCount}
        />
      </div>
      
      {/* Histórico do Chat com scroll */}
      <div className="flex-1 pt-48 pb-44 overflow-hidden">
        <ChatVaultHistory messages={messages} />
      </div>

      {/* Input de mensagem fixo na parte inferior */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <ChatVaultMessageInput
          isVaultLocked={isVaultLocked}
          onVaultAction={handleVaultAction}
          onSendMessage={handleSendMessage}
          inputPlaceholder={inputPlaceholder}
          vaultActionLabel={vaultActionLabel}
        />
      </div>
    </div>
  );
};

export default ChatVault;