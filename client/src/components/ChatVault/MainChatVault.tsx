import React, { useState } from 'react';
import { Crown } from 'lucide-react';
import { useLocation } from 'wouter';
import ChatVaultHeader from './ChatVaultHeader/ChatVaultHeader';
import ChatVaultMessageInput from './ChatVaultMessageInput/ChatVaultMessageInput';
import ChatVaultHistory from './ChatVaultHistory/ChatVaultHistory';
import VaultSectionChat from '../VaultSectionChat/VaultSectionChat';
import AbandonConfirmationModal from './AbandonConfirmationModal/AbandonConfirmationModal';
import InsufficientTimeCard from '../InsufficientTimeCard/InsufficientTimeCard';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isTyping?: boolean;
  authorName: string;
  authorAvatar?: string;
  authorColor?: string;
  userType?: 'guardian' | 'raider' | 'owner' | 'ai';
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
  onVaultToggle?: () => void;
  isTimeUp?: boolean;
  onAddTime?: () => void;
  onTimeAdded?: (timeInSeconds: number) => void;
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
  onAbandon,
  onVaultToggle = () => {},
  isTimeUp = false,
  onAddTime = () => {},
  onTimeAdded
}) => {
  const [, setLocation] = useLocation();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [currentConviction, setCurrentConviction] = useState(conviction);
  const [showAbandonModal, setShowAbandonModal] = useState(false);

  const handleSendMessage = (message: string) => {
    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
      timestamp: new Date(),
      isTyping: false,
      authorName: 'Você',
      authorColor: 'bg-slate-600',
      userType: 'raider'
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
          authorColor: 'bg-violet-600/80',
          userType: 'guardian'
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
    }
  };

  const handleAbandon = () => {
    setShowAbandonModal(true);
  };

  const handleConfirmAbandon = () => {
    if (onAbandon) {
      onAbandon();
    } else {
      // Comportamento padrão: voltar para a tela inicial (vault-discovery)
      setLocation('/');
    }
  };

  return (
    <div className="h-full w-full bg-gray-900 flex flex-col">
      {/* Header do Chat - altura automática */}
      <div className="flex-shrink-0">
        <ChatVaultHeader 
          vaultName={vaultName}
          vaultIcon={vaultIcon}
          conviction={currentConviction}
          offensiveCount={offensiveCount}
          onAbandon={handleAbandon}
          onVaultToggle={onVaultToggle}
        />
      </div>
      
      {/* Histórico do Chat - expande para ocupar espaço disponível */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <ChatVaultHistory messages={messages} />
      </div>

      {/* Seção inferior - altura automática */}
      <div className="flex-shrink-0">
        <VaultSectionChat
          isLocked={isVaultLocked}
          onVaultClick={handleVaultAction}
          actionLabel={vaultActionLabel}
          vaultName={vaultName}
        />
        {isTimeUp ? (
          <InsufficientTimeCard 
            onAddTime={onAddTime}
            onTimeAdded={onTimeAdded}
            vaultName={vaultName}
          />
        ) : (
          <ChatVaultMessageInput
            onSendMessage={handleSendMessage}
            placeholder={inputPlaceholder}
            disabled={!isVaultLocked}
          />
        )}
      </div>

      {/* Modal de confirmação de abandono */}
      <AbandonConfirmationModal
        isOpen={showAbandonModal}
        onClose={() => setShowAbandonModal(false)}
        onConfirm={handleConfirmAbandon}
        vaultName={vaultName}
      />
    </div>
  );
};

export default MainChatVault;