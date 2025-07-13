import React, { useState } from 'react';
import { Mail, ArrowLeft, Send, AlertCircle } from 'lucide-react';

interface PasswordRecoveryFormProps {
  onRecoverySubmit?: (email: string) => void;
  onBackToLogin?: () => void;
  className?: string;
}

const PasswordRecoveryForm: React.FC<PasswordRecoveryFormProps> = ({ 
  onRecoverySubmit, 
  onBackToLogin, 
  className = '' 
}) => {
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  // Validação de email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Submeter formulário
  const handleSubmit = async () => {
    if (!email) {
      setError('Email é obrigatório');
      return;
    }

    if (!validateEmail(email)) {
      setError('Email inválido');
      return;
    }

    setIsProcessing(true);
    setError('');
    
    try {
      // Simular processamento
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (onRecoverySubmit) {
        onRecoverySubmit(email);
      } else {
        console.log('Email para recuperação:', email);
        alert(`Instruções de recuperação enviadas para: ${email}`);
      }
    } catch (error) {
      console.error('Erro na recuperação:', error);
      setError('Erro ao enviar email. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (error) {
      setError('');
    }
  };

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <div className="bg-slate-800 backdrop-blur-md rounded-3xl p-8 border border-slate-700/50">
        
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-violet-500 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Mail className="h-6 w-6 text-white" />
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white mb-2 leading-tight">
                Recuperar Senha
              </h1>
              <p className="text-slate-400 text-base leading-relaxed">
                Informe seu email para receber as instruções de recuperação
              </p>
            </div>
          </div>
        </div>

        {/* Formulário */}
        <div className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                placeholder="seu@email.com"
                className={`w-full px-4 py-3 pl-12 bg-slate-700/80 border rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all duration-200 ${
                  error ? 'border-red-500' : 'border-slate-600'
                }`}
              />
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            </div>
            {error && (
              <div className="flex items-center gap-1 mt-2 text-red-400 text-sm">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}
          </div>

          {/* Botão de Recuperação */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isProcessing}
            className={`w-full py-3 px-6 rounded-xl text-base font-bold transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${
              isProcessing
                ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                : 'bg-violet-500 hover:bg-violet-400 active:bg-violet-600 text-white hover:scale-105 active:scale-95'
            }`}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                Enviando...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Send className="h-5 w-5" />
                Enviar Instruções
              </div>
            )}
          </button>

          {/* Divisor */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-slate-800 text-slate-400">ou</span>
            </div>
          </div>

          {/* Voltar para Login */}
          <div className="text-center">
            <button
              type="button"
              onClick={onBackToLogin}
              className="flex items-center justify-center gap-2 text-violet-400 hover:text-violet-300 font-medium transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordRecoveryForm