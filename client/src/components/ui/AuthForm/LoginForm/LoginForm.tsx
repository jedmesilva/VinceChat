import React, { useState } from 'react';
import { User, Mail, Lock, LogIn, AlertCircle, Eye, EyeOff } from 'lucide-react';

interface LoginFormProps {
  onLoginSubmit?: (loginData: any) => void;
  className?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSubmit, className = '' }) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validação de email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validação do formulário
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!loginData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!validateEmail(loginData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!loginData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (loginData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submeter formulário
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    
    try {
      // Simular processamento
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const finalLoginData = {
        email: loginData.email,
        password: loginData.password,
        timestamp: new Date().toISOString()
      };

      if (onLoginSubmit) {
        onLoginSubmit(finalLoginData);
      } else {
        console.log('Dados de login:', finalLoginData);
        alert(`Login realizado com sucesso!\nEmail: ${finalLoginData.email}`);
      }
    } catch (error) {
      console.error('Erro no login:', error);
      alert('Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (field: keyof typeof loginData, value: string) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <div className="bg-slate-800 backdrop-blur-md rounded-3xl p-8 border border-slate-700/50">
        
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-violet-500 rounded-2xl flex items-center justify-center flex-shrink-0">
              <User className="h-6 w-6 text-white" />
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white mb-2 leading-tight">
                Entrar
              </h1>
              <p className="text-slate-400 text-base leading-relaxed">
                Acesse sua conta para continuar
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
                value={loginData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="seu@email.com"
                className={`w-full px-4 py-3 pl-12 bg-slate-700/80 border rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all duration-200 ${
                  errors.email ? 'border-red-500' : 'border-slate-600'
                }`}
              />
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            </div>
            {errors.email && (
              <div className="flex items-center gap-1 mt-2 text-red-400 text-sm">
                <AlertCircle className="h-4 w-4" />
                {errors.email}
              </div>
            )}
          </div>

          {/* Senha */}
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Senha
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={loginData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Sua senha"
                className={`w-full px-4 py-3 pl-12 pr-12 bg-slate-700/80 border rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all duration-200 ${
                  errors.password ? 'border-red-500' : 'border-slate-600'
                }`}
              />
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && (
              <div className="flex items-center gap-1 mt-2 text-red-400 text-sm">
                <AlertCircle className="h-4 w-4" />
                {errors.password}
              </div>
            )}
          </div>

          {/* Link "Esqueci minha senha" */}
          <div className="text-right">
            <button
              type="button"
              className="text-violet-400 hover:text-violet-300 text-sm font-medium transition-colors"
            >
              Esqueci minha senha
            </button>
          </div>

          {/* Botão de Login */}
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
                Entrando...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <LogIn className="h-5 w-5" />
                Entrar
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

          {/* Link para criar conta */}
          <div className="text-center">
            <p className="text-slate-400 text-sm">
              Não tem uma conta?{' '}
              <button
                type="button"
                className="text-violet-400 hover:text-violet-300 font-medium transition-colors"
              >
                Criar conta
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;