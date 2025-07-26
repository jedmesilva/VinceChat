import React, { useState } from 'react';
import { Lock, AlertCircle, Eye, EyeOff, X } from 'lucide-react';

interface PasswordFormUpdateData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface PasswordFormUpdateProps {
  onSubmit?: (passwordData: PasswordFormUpdateData) => void | Promise<void>;
  onToggle?: (isVisible: boolean) => void;
  initiallyVisible?: boolean;
  className?: string;
  toggleButtonText?: {
    show: string;
    hide: string;
  };
  submitButtonText?: string;
  validationRules?: {
    minLength?: number;
    requireDifferentPassword?: boolean;
  };
}

const PasswordFormUpdate: React.FC<PasswordFormUpdateProps> = ({
  onSubmit,
  onToggle,
  initiallyVisible = false,
  className = '',
  toggleButtonText = {
    show: 'Alterar Senha',
    hide: 'Ocultar Formulário de Senha'
  },
  submitButtonText = 'Alterar Senha',
  validationRules = {
    minLength: 8,
    requireDifferentPassword: true
  }
}) => {
  const [passwordData, setPasswordData] = useState<PasswordFormUpdateData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPasswordFormUpdate, setShowPasswordFormUpdate] = useState(initiallyVisible);
  const [isProcessing, setIsProcessing] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handlePasswordChange = (field: keyof PasswordFormUpdateData, value: string) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
    
    // Limpar erro quando o usuário começa a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const togglePasswordFormUpdate = () => {
    const newVisibility = !showPasswordFormUpdate;
    setShowPasswordFormUpdate(newVisibility);
    
    if (!newVisibility) {
      // Limpar campos de senha quando ocultar o formulário
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      // Limpar erros relacionados à senha
      setErrors({});
      // Reset password visibility
      setShowCurrentPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);
    }

    // Chamar callback se fornecido
    if (onToggle) {
      onToggle(newVisibility);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const { minLength, requireDifferentPassword } = validationRules;

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Senha atual é obrigatória';
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = 'Nova senha é obrigatória';
    } else if (minLength && passwordData.newPassword.length < minLength) {
      newErrors.newPassword = `A senha deve ter pelo menos ${minLength} caracteres`;
    }

    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }

    if (
      requireDifferentPassword &&
      passwordData.currentPassword && 
      passwordData.newPassword && 
      passwordData.currentPassword === passwordData.newPassword
    ) {
      newErrors.newPassword = 'A nova senha deve ser diferente da atual';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    
    try {
      if (onSubmit) {
        await onSubmit(passwordData);
      } else {
        // Comportamento padrão se nenhum callback for fornecido
        console.log('Dados da senha:', passwordData);
        alert('Senha alterada com sucesso!');
      }
      
      // Limpar formulário após sucesso
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setErrors({});
    } catch (error) {
      console.error('Erro ao alterar senha:', error);
      alert('Erro ao alterar senha. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      
      {/* Botão para Mostrar/Ocultar Formulário de Senha */}
      <button
        type="button"
        onClick={togglePasswordFormUpdate}
        className={`w-full py-3 px-4 rounded-xl text-base font-medium transition-all duration-200 border-2 border-dashed ${
          showPasswordFormUpdate 
            ? 'border-violet-500 bg-violet-500/10 text-violet-400' 
            : 'border-slate-600 bg-slate-700/50 text-slate-400 hover:border-slate-500 hover:text-slate-300'
        }`}
      >
        <div className="flex items-center justify-center gap-2">
          <Lock className="h-5 w-5" />
          <span>
            {showPasswordFormUpdate ? toggleButtonText.hide : toggleButtonText.show}
          </span>
        </div>
      </button>

      {/* Formulário de Senha (Condicional) */}
      {showPasswordFormUpdate && (
        <div className="animate-in slide-in-from-top-5 duration-300">
          <div className="space-y-4 bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/30">
            <div className="flex items-center gap-2 mb-3">
              <Lock className="h-5 w-5 text-violet-400" />
              <h3 className="text-violet-400 font-medium">Alterar Senha</h3>
            </div>

            {/* Senha Atual */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Senha Atual
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={passwordData.currentPassword}
                  onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                  placeholder="Sua senha atual"
                  className={`w-full pl-11 pr-12 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.currentPassword 
                      ? 'border-red-400/50 focus:ring-red-400/50' 
                      : 'border-slate-600/30 focus:ring-violet-400/50'
                  }`}
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                >
                  {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.currentPassword && (
                <p className="mt-2 text-sm text-red-400 flex items-center space-x-1">
                  <X className="w-4 h-4" />
                  <span>{errors.currentPassword}</span>
                </p>
              )}
            </div>

            {/* Nova Senha */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Nova Senha
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={passwordData.newPassword}
                  onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                  placeholder="Sua nova senha"
                  className={`w-full pl-11 pr-12 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.newPassword 
                      ? 'border-red-400/50 focus:ring-red-400/50' 
                      : 'border-slate-600/30 focus:ring-violet-400/50'
                  }`}
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                >
                  {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="mt-2 text-sm text-red-400 flex items-center space-x-1">
                  <X className="w-4 h-4" />
                  <span>{errors.newPassword}</span>
                </p>
              )}
            </div>

            {/* Confirmar Nova Senha */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Confirmar Nova Senha
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={passwordData.confirmPassword}
                  onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                  placeholder="Confirme sua nova senha"
                  className={`w-full pl-11 pr-12 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.confirmPassword 
                      ? 'border-red-400/50 focus:ring-red-400/50' 
                      : 'border-slate-600/30 focus:ring-violet-400/50'
                  }`}
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-400 flex items-center space-x-1">
                  <X className="w-4 h-4" />
                  <span>{errors.confirmPassword}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Botão Salvar (só aparece quando o formulário está visível) */}
      {showPasswordFormUpdate && (
        <button
          onClick={handleSubmit}
          disabled={isProcessing}
          className="w-full flex items-center justify-center space-x-2 py-3 bg-violet-500 hover:bg-violet-600 disabled:bg-violet-500/50 rounded-xl transition-all duration-200 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span className="text-white font-medium">Processando...</span>
            </>
          ) : (
            <>
              <Lock className="w-5 h-5 text-white" />
              <span className="text-white font-medium">{submitButtonText}</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default PasswordFormUpdate;
export type { PasswordFormUpdateData, PasswordFormUpdateProps };