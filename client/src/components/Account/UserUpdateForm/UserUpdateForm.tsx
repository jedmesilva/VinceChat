import React, { useState } from 'react';
import { User, Mail, Lock, AlertCircle, Eye, EyeOff, Edit, Save, X } from 'lucide-react';

interface UserUpdateData {
  name: string;
  nickname: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface UserUpdateFormProps {
  currentUser?: {
    name: string;
    nickname?: string;
    email: string;
  };
  onUpdateSubmit?: (userData: any) => void;
  onClose?: () => void;
  className?: string;
}

const UserUpdateForm: React.FC<UserUpdateFormProps> = ({ 
  currentUser = { name: 'João Lukas', nickname: 'JL', email: 'joao.lukas@email.com' },
  onUpdateSubmit, 
  onClose,
  className = '' 
}) => {
  const [userData, setUserData] = useState<UserUpdateData>({
    name: currentUser.name,
    nickname: currentUser.nickname || '',
    email: currentUser.email,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  // Validação de senha
  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  // Validação completa do formulário
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validar dados pessoais
    if (!userData.name || userData.name.trim().length < 2) {
      newErrors.name = 'Nome completo é obrigatório (mínimo 2 caracteres)';
    }

    if (userData.nickname && userData.nickname.trim().length > 0 && userData.nickname.trim().length < 2) {
      newErrors.nickname = 'Apelido deve ter pelo menos 2 caracteres';
    }

    // Validar senha apenas se o formulário estiver visível
    if (showPasswordForm) {
      if (!userData.currentPassword) {
        newErrors.currentPassword = 'Senha atual é obrigatória';
      }

      if (!userData.newPassword) {
        newErrors.newPassword = 'Nova senha é obrigatória';
      } else if (!validatePassword(userData.newPassword)) {
        newErrors.newPassword = 'Nova senha deve ter pelo menos 8 caracteres';
      }

      if (!userData.confirmPassword) {
        newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
      } else if (userData.newPassword !== userData.confirmPassword) {
        newErrors.confirmPassword = 'As senhas não coincidem';
      }
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
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const finalUserData = {
        name: userData.name,
        nickname: userData.nickname,
        email: userData.email,
        ...(showPasswordForm && { passwordChanged: true })
      };

      if (onUpdateSubmit) {
        onUpdateSubmit(finalUserData);
      }
      
      alert('Dados atualizados com sucesso!');
      if (onClose) onClose();
    } catch (error) {
      alert('Erro ao atualizar dados. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 ${className}`}>
      <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-md border border-slate-600/30 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Atualizar Dados</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-slate-300" />
          </button>
        </div>

        {/* Formulário */}
        <div className="space-y-4">
          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Nome Completo
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={userData.name}
                onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-violet-500 transition-colors"
                placeholder="Digite seu nome completo"
              />
            </div>
            {errors.name && (
              <div className="flex items-center space-x-2 text-red-400 text-sm mt-1">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.name}</span>
              </div>
            )}
          </div>

          {/* Apelido */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Apelido (Opcional)
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={userData.nickname}
                onChange={(e) => setUserData(prev => ({ ...prev, nickname: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-violet-500 transition-colors"
                placeholder="Digite seu apelido"
              />
            </div>
            {errors.nickname && (
              <div className="flex items-center space-x-2 text-red-400 text-sm mt-1">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.nickname}</span>
              </div>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="email"
                value={userData.email}
                onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-violet-500 transition-colors"
                placeholder="Digite seu email"
              />
            </div>
            {errors.email && (
              <div className="flex items-center space-x-2 text-red-400 text-sm mt-1">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.email}</span>
              </div>
            )}
          </div>

          {/* Toggle para alterar senha */}
          <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-xl">
            <div>
              <div className="text-sm font-medium text-white">Alterar Senha</div>
              <div className="text-xs text-slate-400">Clique para alterar sua senha</div>
            </div>
            <button
              onClick={() => setShowPasswordForm(!showPasswordForm)}
              className={`w-12 h-6 rounded-full transition-all duration-200 ${
                showPasswordForm ? 'bg-violet-500' : 'bg-slate-600'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transform transition-transform ${
                showPasswordForm ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

          {/* Formulário de senha */}
          {showPasswordForm && (
            <div className="space-y-4 p-4 bg-slate-700/20 rounded-xl border border-slate-600/30">
              {/* Senha atual */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Senha Atual
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={userData.currentPassword}
                    onChange={(e) => setUserData(prev => ({ ...prev, currentPassword: e.target.value }))}
                    className="w-full pl-10 pr-12 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-violet-500 transition-colors"
                    placeholder="Digite sua senha atual"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                  >
                    {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.currentPassword && (
                  <div className="flex items-center space-x-2 text-red-400 text-sm mt-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.currentPassword}</span>
                  </div>
                )}
              </div>

              {/* Nova senha */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Nova Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={userData.newPassword}
                    onChange={(e) => setUserData(prev => ({ ...prev, newPassword: e.target.value }))}
                    className="w-full pl-10 pr-12 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-violet-500 transition-colors"
                    placeholder="Digite sua nova senha"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.newPassword && (
                  <div className="flex items-center space-x-2 text-red-400 text-sm mt-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.newPassword}</span>
                  </div>
                )}
              </div>

              {/* Confirmar nova senha */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Confirmar Nova Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={userData.confirmPassword}
                    onChange={(e) => setUserData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full pl-10 pr-12 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-violet-500 transition-colors"
                    placeholder="Confirme sua nova senha"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <div className="flex items-center space-x-2 text-red-400 text-sm mt-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.confirmPassword}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Botões */}
          <div className="flex space-x-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl text-white font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              disabled={isProcessing}
              className="flex-1 py-3 bg-violet-500 hover:bg-violet-400 disabled:opacity-50 rounded-xl text-white font-medium transition-colors flex items-center justify-center space-x-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processando...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Salvar</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserUpdateForm;