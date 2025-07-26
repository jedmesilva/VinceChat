import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLocation } from 'wouter';

// Importação do componente de atualização de dados
import UserDataUpdateForm from '@/components/Account/UserDataUpdateForm/UserDataUpdateForm';

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  joinDate: string;
}

const UserDataUpdateScreen: React.FC = () => {
  const [, setLocation] = useLocation();
  const [userData, setUserData] = useState<UserData>({
    id: 'user123',
    name: 'João Lukas',
    email: 'joao.lukas@email.com',
    phone: '+55 11 99999-9999',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face&auto=format',
    joinDate: '2024-01-15'
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    setLocation('/account');
  };

  const handleUpdateUserData = async (updatedData: Partial<UserData>) => {
    setIsLoading(true);
    
    try {
      // Simular chamada para API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Atualizar os dados localmente
      setUserData(prev => ({
        ...prev,
        ...updatedData
      }));
      
      alert('Dados atualizados com sucesso!');
    } catch (error) {
      alert('Erro ao atualizar dados. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarUpdate = async (newAvatarUrl: string) => {
    setIsLoading(true);
    
    try {
      // Simular upload de imagem
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setUserData(prev => ({
        ...prev,
        avatar: newAvatarUrl
      }));
      
      alert('Avatar atualizado com sucesso!');
    } catch (error) {
      alert('Erro ao atualizar avatar. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleBack}
            className="w-10 h-10 bg-slate-800/80 hover:bg-slate-700/80 rounded-xl flex items-center justify-center transition-all duration-200 border border-slate-600/30"
            disabled={isLoading}
          >
            <ArrowLeft className="w-5 h-5 text-slate-300" />
          </button>
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white text-left ml-4">Atualizar Dados</h1>
          </div>
        </div>

        {/* User Data Update Form Component */}
        <UserDataUpdateForm 
          userData={userData}
          onUpdateUserData={handleUpdateUserData}
          onAvatarUpdate={handleAvatarUpdate}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default UserDataUpdateScreen;