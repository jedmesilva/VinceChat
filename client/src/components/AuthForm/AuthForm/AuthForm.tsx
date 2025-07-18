import React, { useState } from 'react';
import { User, Mail, Lock, LogIn, AlertCircle, Eye, EyeOff, CheckCircle, UserPlus } from 'lucide-react';

interface AuthFormProps {
  onLoginSubmit?: (loginData: any) => void;
  onRegisterSubmit?: (registerData: any) => void;
  className?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ onLoginSubmit, onRegisterSubmit, className = '' }) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [processStatus, setProcessStatus] = useState<'checking' | 'logging-in' | 'creating' | 'created' | null>(null);

  // Simular verificação se usuário existe (substitua pela sua API)
  const checkUserExists = async (email: string) => {
    // Simular chamada à API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simular: emails com 'new' no nome são considerados novos usuários
    return !email.toLowerCase().includes('new');
  };

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
    setProcessStatus('checking');
    
    try {
      // Verificar se usuário existe
      const userExists = await checkUserExists(loginData.email);
      
      const finalData = {
        email: loginData.email,
        password: loginData.password,
        timestamp: new Date().toISOString()
      };

      if (userExists) {
        // Fazer login
        setProcessStatus('logging-in');
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        if (onLoginSubmit) {
          onLoginSubmit(finalData);
        } else {
          console.log('Login realizado:', finalData);
          alert(`Login realizado com sucesso!\nEmail: ${finalData.email}`);
        }
      } else {
        // Fazer cadastro
        setProcessStatus('creating');
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setProcessStatus('created');
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setProcessStatus('logging-in');
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (onRegisterSubmit) {
          onRegisterSubmit(finalData);
        } else {
          console.log('Cadastro realizado:', finalData);
          alert(`Conta criada com sucesso!\nEmail: ${finalData.email}\nVocê já está logado!`);
        }
      }
    } catch (error) {
      console.error('Erro na autenticação:', error);
      alert('Erro na autenticação. Tente novamente.');
    } finally {
      setIsProcessing(false);
      setProcessStatus(null);
    }
  };

  const handleInputChange = (field: keyof typeof loginData, value: string) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Renderizar card de status
  const renderStatusCard = () => {
    const statusConfig = {
      checking: {
        icon: <User className="h-8 w-8 text-slate-400" />,
        title: 'Verificando conta',
        description: 'Verificando se você já tem uma conta...',
        bgColor: 'bg-slate-500/10',
        borderColor: 'border-slate-500/30'
      },
      'logging-in': {
        icon: <LogIn className="h-8 w-8 text-violet-400" />,
        title: 'Entrando',
        description: 'Fazendo login na sua conta...',
        bgColor: 'bg-violet-500/10',
        borderColor: 'border-violet-500/30'
      },
      creating: {
        icon: <UserPlus className="h-8 w-8 text-violet-400" />,
        title: 'Criando conta',
        description: 'Criando sua nova conta...',
        bgColor: 'bg-violet-500/10',
        borderColor: 'border-violet-500/30'
      },
      created: {
        icon: <CheckCircle className="h-8 w-8 text-violet-400" />,
        title: 'Conta criada!',
        description: 'Sua conta foi criada com sucesso. Fazendo login...',
        bgColor: 'bg-violet-500/10',
        borderColor: 'border-violet-500/30'
      }
    };

    const config = statusConfig[processStatus!];

    return (
      <div className={`${config.bgColor} ${config.borderColor} border rounded-3xl p-8 text-center`}>
        <div className="flex flex-col items-center gap-4">
          {config.icon}
          <div>
            <h2 className="text-xl font-bold text-white mb-2">{config.title}</h2>
            <p className="text-slate-400">{config.description}</p>
          </div>
          <div className="w-8 h-8 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
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
                Digite seu email e senha para continuar
              </p>
            </div>
          </div>
        </div>

        {/* Mostrar card de status ou formulário */}
        {isProcessing && processStatus ? (
          renderStatusCard()
        ) : (
          <>
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
                className="w-full py-3 px-6 rounded-xl text-base font-bold transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-violet-500/50 bg-violet-500 hover:bg-violet-400 active:bg-violet-600 text-white hover:scale-105 active:scale-95"
              >
                <div className="flex items-center justify-center gap-2">
                  <LogIn className="h-5 w-5" />
                  Entrar
                </div>
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

              {/* Botão Google */}
              <button
                type="button"
                className="w-full py-3 px-6 rounded-xl text-base font-medium transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-slate-400/50 bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-700 hover:scale-105 active:scale-95 border border-gray-300"
              >
                <div className="flex items-center justify-center gap-3">
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continuar com Google
                </div>
              </button>

              {/* Informação sobre cadastro automático */}
              <div className="text-center">
                <p className="text-slate-400 text-sm leading-relaxed">
                  Se você não tiver uma conta, ela será criada automaticamente
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthForm;