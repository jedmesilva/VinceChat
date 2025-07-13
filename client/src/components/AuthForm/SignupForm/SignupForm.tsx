import React, { useState } from 'react';
import { User, Mail, Lock, ArrowRight, ArrowLeft, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';

interface SignupFormProps {
  onSignupSubmit?: (userData: any) => void;
  className?: string;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSignupSubmit, className = '' }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validação de email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validação de senha
  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  // Validação da primeira etapa
  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

    if (!userData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!validateEmail(userData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!userData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (!validatePassword(userData.password)) {
      newErrors.password = 'Senha deve ter pelo menos 8 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validação da segunda etapa
  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};

    if (!userData.name || userData.name.trim().length < 2) {
      newErrors.name = 'Nome completo é obrigatório (mínimo 2 caracteres)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Avançar para próxima etapa
  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  // Voltar para etapa anterior
  const handlePrevStep = () => {
    setStep(1);
    setErrors({});
  };

  // Submeter formulário
  const handleSubmit = async () => {
    if (!validateStep2()) return;

    setIsProcessing(true);
    
    try {
      // Simular processamento
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const finalUserData = {
        email: userData.email,
        password: userData.password,
        name: userData.name.trim(),
        timestamp: new Date().toISOString()
      };

      if (onSignupSubmit) {
        onSignupSubmit(finalUserData);
      } else {
        console.log('Dados do usuário:', finalUserData);
        alert(`Cadastro realizado com sucesso!\nNome: ${finalUserData.name}\nEmail: ${finalUserData.email}`);
      }
    } catch (error) {
      console.error('Erro no cadastro:', error);
      alert('Erro ao realizar cadastro. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (field: keyof typeof userData, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700">
        
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-violet-500 rounded-2xl flex items-center justify-center flex-shrink-0">
              <User className="h-6 w-6 text-white" />
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white mb-2 leading-tight">
                {step === 1 ? 'Criar Conta' : 'Quase Pronto!'}
              </h1>
              <p className="text-slate-400 text-base leading-relaxed">
                {step === 1 ? 'Preencha seus dados de acesso' : 'Agora só precisamos do seu nome'}
              </p>
            </div>
          </div>
        </div>

        {/* Formulário */}
        <div className="space-y-4">
          {step === 1 ? (
            <>
              {/* Email */}
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={userData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="seu@email.com"
                    className={`w-full px-4 py-3 pl-12 bg-slate-700 border rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-200 ${
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
                    value={userData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Sua senha"
                    className={`w-full px-4 py-3 pl-12 pr-12 bg-slate-700 border rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-200 ${
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

              {/* Botão Próximo */}
              <button
                type="button"
                onClick={handleNextStep}
                className="w-full py-3 px-6 rounded-xl text-base font-bold transition-all duration-200 bg-violet-500 hover:bg-violet-400 active:bg-violet-600 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <div className="flex items-center justify-center gap-2">
                  <span>Continuar</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </button>
            </>
          ) : (
            <>
              {/* Nome Completo */}
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Nome Completo
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={userData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Seu nome completo"
                    className={`w-full px-4 py-3 pl-12 bg-slate-700 border rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-200 ${
                      errors.name ? 'border-red-500' : 'border-slate-600'
                    }`}
                  />
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                </div>
                {errors.name && (
                  <div className="flex items-center gap-1 mt-2 text-red-400 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    {errors.name}
                  </div>
                )}
              </div>

              {/* Resumo */}
              <div className="bg-slate-900 rounded-xl p-4 border border-slate-700">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-violet-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-violet-400 font-medium text-sm mb-2">
                      Dados de Acesso Confirmados
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Email: {userData.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Botões */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="flex-1 py-3 px-6 rounded-xl text-base font-bold transition-all duration-200 bg-slate-700 hover:bg-slate-600 active:bg-slate-800 text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-500"
                >
                  <div className="flex items-center justify-center gap-2">
                    <ArrowLeft className="h-5 w-5" />
                    <span>Voltar</span>
                  </div>
                </button>
                
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className={`flex-1 py-3 px-6 rounded-xl text-base font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                    isProcessing
                      ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                      : 'bg-violet-500 hover:bg-violet-400 active:bg-violet-600 text-white'
                  }`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                      Criando...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Criar Conta
                    </div>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupForm;