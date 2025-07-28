import React, { useState } from 'react';
import { Lock, LockOpen, MessageCircle, ChevronRight } from 'lucide-react';

// Componente do Formulário de Senha
const PasswordForm: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<'success' | 'failed' | null>(null);
  const [shake, setShake] = useState(false);
  const [isButtonShaking, setIsButtonShaking] = useState(false);
  const [showAccessDenied, setShowAccessDenied] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const correctPassword = 'TESOURO123'; // Senha de exemplo

  const handleSubmit = async (e: React.FormEvent | React.KeyboardEvent) => {
    e.preventDefault();
    
    if (password.length < 3) return;
    
    setIsSubmitting(true);
    
    // Simular verificação
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (password.toUpperCase() === correctPassword) {
      setResult('success');
      setTimeout(() => {
        alert('Parabéns! Você desbloqueou o cofre!');
      }, 1500);
    } else {
      setResult('failed');
      setPassword('');
      setShake(true);
      
      // Ativa animação de vibração no botão APENAS quando a senha está errada
      setIsButtonShaking(true);
      setShowAccessDenied(true);
      
      // Vibração física do dispositivo (se suportado)
      if (navigator.vibrate) {
        navigator.vibrate(200);
      }
      
      // Remove o estado de vibração após a animação
      setTimeout(() => {
        setShake(false);
        setIsButtonShaking(false);
        setShowAccessDenied(false);
        setResult(null); // Limpa o resultado para voltar ao normal
      }, 2000); // Aumentei para 2 segundos para dar tempo de ver o "Acesso negado"
    }
    
    setIsSubmitting(false);
  };

  // Função para lidar com o clique no chat
  const handleChatClick = () => {
    alert('Redirecionando para o chat com Vince...');
    // Aqui você pode adicionar a lógica para navegar para o chat
  };

  // Estilo da animação de shake
  const shakeStyle = {
    animation: isButtonShaking ? 'shake 0.6s ease-in-out' : 'none'
  };

  return (
    <>
      <div className="bg-slate-800/95 backdrop-blur-md rounded-3xl p-8 border border-slate-700/50 max-w-md mx-auto">
        {/* Título e descrição centralizados */}
        <div className="mb-8 text-center">
          <div className={`w-12 h-12 ${
            result === 'success' ? 'bg-green-500/20' : 'bg-slate-700/50'
          } rounded-lg flex items-center justify-center mx-auto mb-3`}>
            {result === 'success' ? (
              <LockOpen className="h-6 w-6 text-green-400" />
            ) : (
              <Lock className="h-6 w-6 text-slate-300" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">
            {result === 'success' ? 'Cofre aberto' : 'Cofre fechado'}
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            {result === 'success' ? 'Clique para entrar' : 'Digite a senha para abrir'}
          </p>
        </div>
        
        <div className="space-y-6">
          <div className="relative">
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite a senha..."
              disabled={isSubmitting}
              className={`w-full px-6 py-4 bg-slate-700/80 border-2 ${
                result === 'failed' ? 'border-red-500/50' : 'border-slate-600/50'
              } rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-0 focus:border-violet-500/50 disabled:opacity-50 disabled:cursor-not-allowed text-center text-xl font-mono tracking-widest transition-all duration-300`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && password.length >= 3 && !isSubmitting) {
                  handleSubmit(e);
                }
              }}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={password.length < 3 || isSubmitting}
            style={shakeStyle}
            className={`w-full py-4 ${
              showAccessDenied 
                ? 'bg-red-500 hover:bg-red-400 active:bg-red-600' 
                : result === 'success' 
                  ? 'bg-green-600 hover:bg-green-500 active:bg-green-700' 
                  : 'bg-violet-500 hover:bg-violet-400 active:bg-violet-600'
            } disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500/50 flex items-center justify-center gap-3 text-lg transform hover:scale-105 active:scale-95`}
          >
            {isSubmitting ? (
              <>
                <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                Verificando...
              </>
            ) : showAccessDenied ? (
              <>
                <Lock className="h-6 w-6" />
                Acesso negado
              </>
            ) : result === 'success' ? (
              <>
                <LockOpen className="h-6 w-6" />
                Entrar no cofre
              </>
            ) : (
              <>
                <Lock className="h-6 w-6" />
                Abrir o cofre
              </>
            )}
          </button>
        </div>

        {/* Result Messages */}
        {result && (
          <div className="mt-6">
            {result === 'success' ? (
              <div className="flex items-center gap-3 text-green-400 bg-green-500/10 p-4 rounded-2xl border border-green-500/20">
                <LockOpen className="h-6 w-6" />
                <div>
                  <div className="font-bold text-lg">Parabéns!</div>
                  <div className="text-sm text-green-300">Cofre aberto com sucesso!</div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-red-400 bg-red-500/10 p-4 rounded-2xl border border-red-500/20">
                <Lock className="h-6 w-6" />
                <div>
                  <div className="font-bold text-lg">Senha incorreta!</div>
                  <div className="text-sm text-red-300">Tente novamente</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Chat Card - OTIMIZADO PARA MOBILE */}
        <div className="mt-6">
          <button 
            onClick={handleChatClick}
            onTouchStart={() => setIsPressed(true)}
            onTouchEnd={() => setIsPressed(false)}
            className={`w-full p-4 bg-violet-500/10 hover:bg-violet-500/20 active:bg-violet-500/30 border border-violet-500/30 hover:border-violet-500/50 active:border-violet-500/70 rounded-2xl transition-all duration-200 group transform hover:scale-[1.02] active:scale-[0.98] active:shadow-xl ${
              isPressed ? 'scale-95 bg-violet-500/30 border-violet-500/70' : ''
            }`}
            style={{
              touchAction: 'manipulation',
              userSelect: 'none',
              WebkitTouchCallout: 'none',
              WebkitUserSelect: 'none',
              KhtmlUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none'
            }}
          >
            <div className="flex items-center gap-4">
              {/* Ícone de chat à esquerda */}
              <div className="flex-shrink-0">
                <div className={`w-12 h-12 bg-violet-500/20 rounded-xl flex items-center justify-center group-hover:bg-violet-500/30 group-active:bg-violet-500/40 transition-all duration-200 ${
                  isPressed ? 'bg-violet-500/40' : ''
                }`}>
                  <MessageCircle className={`h-6 w-6 text-violet-300 group-hover:text-violet-200 group-active:text-violet-100 transition-all duration-200 ${
                    isPressed ? 'text-violet-100' : ''
                  }`} />
                </div>
              </div>
              
              {/* Conteúdo central */}
              <div className="flex-1 text-left">
                <div className={`text-lg font-bold text-violet-100 group-hover:text-white group-active:text-white transition-all duration-200 ${
                  isPressed ? 'text-white' : ''
                }`}>
                  Não tem a senha?
                </div>
                <div className={`text-sm text-violet-300 group-hover:text-violet-200 group-active:text-violet-100 transition-all duration-200 leading-relaxed ${
                  isPressed ? 'text-violet-100' : ''
                }`}>
                  Tente convencer o <span className="font-bold text-violet-400">Vince</span> a lhe dar a senha do cofre
                </div>
              </div>
              
              {/* Seta à direita */}
              <div className="flex-shrink-0">
                <ChevronRight className={`h-5 w-5 text-violet-300 group-hover:text-violet-200 group-active:text-violet-100 group-hover:translate-x-1 group-active:translate-x-2 transition-all duration-200 ${
                  isPressed ? 'text-violet-100 translate-x-2' : ''
                }`} />
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* CSS personalizado para animações */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10% { transform: translateX(-8px); }
            20% { transform: translateX(8px); }
            30% { transform: translateX(-8px); }
            40% { transform: translateX(8px); }
            50% { transform: translateX(-8px); }
            60% { transform: translateX(8px); }
            70% { transform: translateX(-8px); }
            80% { transform: translateX(8px); }
            90% { transform: translateX(-8px); }
          }
          
          /* Otimizações para mobile */
          @media (max-width: 768px) {
            button {
              min-height: 48px;
              -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            }
          }
        `
      }} />
    </>
  );
};

export default PasswordForm;