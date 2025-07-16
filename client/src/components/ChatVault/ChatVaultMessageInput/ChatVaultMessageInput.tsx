import React, { useState, useRef } from 'react';
import { ArrowUp, Skull, Crown, Shield } from 'lucide-react';

interface UserRole {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

interface ChatVaultMessageInputProps {
  onSendMessage?: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  maxHeight?: number;
  userRole?: UserRole;
  onRoleClick?: () => void;
}

const ChatVaultMessageInput: React.FC<ChatVaultMessageInputProps> = ({ 
  onSendMessage = () => {}, 
  placeholder = "Digite sua mensagem...",
  disabled = false,
  className = "",
  maxHeight = 128,
  userRole = { name: "Saqueador", icon: Skull, description: "Especialista em invasões e pilhagem de cofres ancestrais" },
  onRoleClick = () => {}
}) => {
  const [inputText, setInputText] = useState('');
  const [roleClicked, setRoleClicked] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTextareaInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleSendMessage = () => {
    if (inputText.trim() && !disabled) {
      onSendMessage(inputText.trim());
      setInputText('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const RoleIcon = userRole.icon;

  return (
    <div className={`p-4 bg-slate-800 border-t border-slate-700/30 ${className}`}>
      <style dangerouslySetInnerHTML={{
        __html: `
          .scrollbar-none {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .scrollbar-none::-webkit-scrollbar {
            display: none;
          }
        `
      }} />
      <div 
        className="bg-slate-700 rounded-3xl p-4 cursor-text"
        onClick={() => textareaRef.current?.focus()}
      >
        <textarea
          ref={textareaRef}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          onInput={handleTextareaInput}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full bg-transparent text-white placeholder-slate-400 focus:outline-none text-base mb-3 resize-none min-h-[24px] overflow-y-auto disabled:opacity-50 disabled:cursor-not-allowed scrollbar-none"
          rows={1}
          style={{ 
            height: 'auto',
            minHeight: '24px',
            maxHeight: `${maxHeight}px`
          }}
        />
        <div className="flex justify-between items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setRoleClicked(true);
              setTimeout(() => setRoleClicked(false), 200);
              onRoleClick();
            }}
            disabled={disabled}
            className={`flex items-center gap-2 px-4 bg-slate-800/60 hover:bg-slate-800/80 active:bg-violet-500/30 rounded-lg transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 leading-none ${
              roleClicked ? 'scale-95 bg-violet-500/20' : ''
            }`}
            style={{ height: '36px', minHeight: '36px', maxHeight: '36px' }}
            title={userRole.description}
          >
            <div className={`w-4 h-4 transition-colors flex-shrink-0 ${
              roleClicked ? 'text-violet-400' : 'text-slate-400 group-hover:text-slate-300'
            }`}>
              <RoleIcon className="w-4 h-4" />
            </div>
            <span className={`text-sm font-medium transition-colors whitespace-nowrap ${
              roleClicked ? 'text-violet-400' : 'text-slate-400 group-hover:text-slate-300'
            }`}>
              {userRole.name}
            </span>
          </button>

          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || disabled}
            className="bg-violet-500 hover:bg-violet-400 active:bg-violet-600 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 flex items-center justify-center"
            style={{ height: '40px', minHeight: '40px', maxHeight: '40px', width: '40px', minWidth: '40px', maxWidth: '40px' }}
          >
            <ArrowUp className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatVaultMessageInput;