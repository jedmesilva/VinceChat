import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  Shield,
  Skull,
  Crown,
  Brain
} from 'lucide-react';

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

interface ChatVaultHistoryProps {
  messages: Message[];
  emptyStateText?: string;
  className?: string;
}

const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(!message.isTyping);
  
  useEffect(() => {
    if (message.isTyping && !message.isUser) {
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex < message.text.length) {
          setDisplayedText(message.text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          setIsTypingComplete(true);
          clearInterval(typingInterval);
        }
      }, 30);
      
      return () => clearInterval(typingInterval);
    } else {
      setDisplayedText(message.text);
      setIsTypingComplete(true);
    }
  }, [message.text, message.isTyping, message.isUser]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getAvatarColor = (authorName: string) => {
    if (message.authorColor) return message.authorColor;
    
    // Cores predefinidas baseadas no nome
    const colors = [
      'bg-slate-600', 'bg-slate-700', 'bg-gray-600', 'bg-gray-700',
      'bg-zinc-600', 'bg-zinc-700', 'bg-stone-600', 'bg-stone-700'
    ];
    
    let hash = 0;
    for (let i = 0; i < authorName.length; i++) {
      hash = authorName.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  const getUserTypeIcon = (userType?: string) => {
    switch (userType) {
      case 'guardian':
        return (
          <div className="bg-violet-500/20 p-1 rounded-md">
            <Shield size={12} className="text-violet-400" />
          </div>
        );
      case 'raider':
        return (
          <div className="bg-violet-500/20 p-1 rounded-md">
            <Skull size={12} className="text-violet-400" />
          </div>
        );
      case 'owner':
        return (
          <div className="bg-violet-500/20 p-1 rounded-md">
            <Crown size={12} className="text-violet-400" />
          </div>
        );
      case 'ai':
        return (
          <div className="bg-violet-500/20 p-1 rounded-md">
            <Shield size={12} className="text-violet-400" />
          </div>
        );
      default:
        return null;
    }
  };

  const getUserTypeColor = (userType?: string) => {
    switch (userType) {
      case 'guardian':
        return 'text-violet-400';
      case 'raider':
        return 'text-violet-400';
      case 'owner':
        return 'text-violet-400';
      case 'ai':
        return 'text-violet-400';
      default:
        return 'text-slate-500';
    }
  };

  return (
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      <div className={`flex max-w-[80%] gap-2 ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div className="flex-shrink-0 self-start">
          {message.authorAvatar ? (
            <img 
              src={message.authorAvatar} 
              alt={message.authorName}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white
              ${!message.isUser ? 'bg-violet-600/80' : getAvatarColor(message.authorName)}
            `}>
              {!message.isUser ? (
                <Brain size={14} />
              ) : (
                getInitials(message.authorName)
              )}
            </div>
          )}
        </div>

        {/* Mensagem */}
        <div className={`flex flex-col ${message.isUser ? 'items-end' : 'items-start'}`}>
          {/* Nome do autor com ícone */}
          <div className={`
            mb-1 px-1 text-xs font-medium flex items-center gap-1
            ${message.isUser ? 'flex-row-reverse' : 'flex-row-reverse'}
            ${getUserTypeColor(message.userType)}
          `}>
            {getUserTypeIcon(message.userType)}
            <span>{message.authorName}</span>
          </div>

          {/* Balão da mensagem */}
          <div
            className={`
              relative px-4 py-3 rounded-2xl shadow-sm
              ${message.isUser 
                ? 'bg-slate-800/60 text-slate-200 border border-slate-700/40' 
                : 'bg-slate-800/80 text-slate-100 border border-slate-700/60'
              }
              ${message.isUser ? 'rounded-tr-md' : 'rounded-tl-md'}
            `}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {displayedText}
              {message.isTyping && !isTypingComplete && (
                <span className="inline-block w-2 h-4 bg-slate-400 ml-1 animate-pulse rounded-sm" />
              )}
            </p>
            
            {/* Timestamp */}
            <div className={`
              text-xs mt-1 
              ${message.isUser ? 'text-slate-500' : 'text-slate-400'}
            `}>
              {formatTime(message.timestamp)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatVaultHistory: React.FC<ChatVaultHistoryProps> = ({ 
  messages, 
  emptyStateText = "Inicie uma conversa para convencer a IA",
  className = ""
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={`h-full overflow-y-auto px-4 py-6 space-y-6 ${className}`}>
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-400 text-sm">
              {emptyStateText}
            </p>
          </div>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
};



export default ChatVaultHistory;