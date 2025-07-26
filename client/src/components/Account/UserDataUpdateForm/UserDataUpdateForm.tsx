import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  ArrowLeft,
  Save,
  X,
  Camera
} from 'lucide-react';
import PasswordFormUpdate from '../PasswordFormUpdate/PasswordFormUpdate';

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  joinDate: string;
}

interface UserDataUpdateFormProps {
  userData: UserData;
  onUpdateUserData: (updatedData: Partial<UserData>) => Promise<void>;
  onAvatarUpdate: (newAvatarUrl: string) => Promise<void>;
  isLoading: boolean;
}

const UserDataUpdateForm: React.FC<UserDataUpdateFormProps> = ({
  userData: initialUserData,
  onUpdateUserData,
  onAvatarUpdate,
  isLoading: externalLoading
}) => {
  const [userData, setUserData] = useState<UserData>(initialUserData);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof UserData, value: string) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!userData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (userData.name.trim().length < 2) {
      newErrors.name = 'Nome deve ter pelo menos 2 caracteres';
    }

    if (!userData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!userData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (!/^\+55\s\d{2}\s\d{4,5}-\d{4}$/.test(userData.phone)) {
      newErrors.phone = 'Formato: +55 11 99999-9999';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      await onUpdateUserData(userData);
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Tem certeza que deseja cancelar? As alterações não salvas serão perdidas.')) {
      alert('Edição cancelada');
    }
  };

  const handleAvatarChange = async () => {
    // Simular seleção de nova imagem - em uma implementação real, seria um file picker
    const newAvatarUrl = prompt('Digite a URL do novo avatar:');
    if (newAvatarUrl) {
      try {
        await onAvatarUpdate(newAvatarUrl);
        setUserData(prev => ({ ...prev, avatar: newAvatarUrl }));
      } catch (error) {
        console.error('Erro ao atualizar avatar:', error);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="space-y-6">

        {/* Form */}
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/30">
          
          {/* Avatar Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-4">
              <img 
                src={userData.avatar} 
                alt="Avatar"
                className="w-24 h-24 rounded-full object-cover border-2 border-violet-500/50"
              />
              <button
                onClick={handleAvatarChange}
                className="absolute -bottom-1 -right-1 w-8 h-8 bg-violet-500 hover:bg-violet-600 rounded-full flex items-center justify-center transition-all duration-200 border-2 border-slate-800"
              >
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>
            <p className="text-sm text-slate-400 text-center">Clique no ícone para alterar sua foto</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            
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
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full pl-11 pr-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.name 
                      ? 'border-red-400/50 focus:ring-red-400/50' 
                      : 'border-slate-600/30 focus:ring-violet-400/50'
                  }`}
                  placeholder="Digite seu nome completo"
                />
              </div>
              {errors.name && (
                <p className="mt-2 text-sm text-red-400 flex items-center space-x-1">
                  <X className="w-4 h-4" />
                  <span>{errors.name}</span>
                </p>
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
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full pl-11 pr-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.email 
                      ? 'border-red-400/50 focus:ring-red-400/50' 
                      : 'border-slate-600/30 focus:ring-violet-400/50'
                  }`}
                  placeholder="Digite seu email"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-400 flex items-center space-x-1">
                  <X className="w-4 h-4" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Telefone */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Telefone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="tel"
                  value={userData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`w-full pl-11 pr-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.phone 
                      ? 'border-red-400/50 focus:ring-red-400/50' 
                      : 'border-slate-600/30 focus:ring-violet-400/50'
                  }`}
                  placeholder="+55 11 99999-9999"
                />
              </div>
              {errors.phone && (
                <p className="mt-2 text-sm text-red-400 flex items-center space-x-1">
                  <X className="w-4 h-4" />
                  <span>{errors.phone}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Password Update Section - Movido para entre o card e os botões */}
        <PasswordFormUpdate />

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleSave}
            disabled={externalLoading}
            className="w-full flex items-center justify-center space-x-2 py-3 bg-violet-500 hover:bg-violet-600 disabled:bg-violet-500/50 rounded-xl transition-all duration-200 disabled:cursor-not-allowed"
          >
            {externalLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span className="text-white font-medium">Salvando...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5 text-white" />
                <span className="text-white font-medium">Salvar Alterações</span>
              </>
            )}
          </button>
          
          <button
            onClick={handleCancel}
            disabled={externalLoading}
            className="w-full flex items-center justify-center space-x-2 py-3 bg-slate-700/50 hover:bg-slate-700/70 disabled:bg-slate-700/30 rounded-xl border border-slate-600/30 transition-all duration-200 disabled:cursor-not-allowed"
          >
            <X className="w-5 h-5 text-slate-300" />
            <span className="text-slate-300 font-medium">Cancelar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDataUpdateForm;