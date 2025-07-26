import React, { useState } from 'react';
import { 
  ArrowLeft,
  Edit,
  LogOut
} from 'lucide-react';

// Importação dos componentes modulares
import UserCard from '../components/Account/UserCard/UserCard';
import PersonalInfoComponent from '../components/Account/PersonalInfoComponent/PersonalInfoComponent';
import AchievementsComponent from '../components/Account/AchievementsComponent/AchievementsComponent';
import SavedCard from '../components/Account/SavedCard/SavedCard';
import BillingComponent from '../components/Account/BillingComponent/BillingComponent';
import PreferencesComponent from '../components/Account/PreferencesComponent/PreferencesComponent';

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  joinDate: string;
  titles: Array<{
    id: string;
    name: string;
    type: 'guardian' | 'raider' | 'owner' | 'special';
    icon: string;
    earnedAt: string;
  }>;
  achievements: Array<{
    id: string;
    name: string;
    description: string;
    icon: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    unlockedAt: string;
  }>;
  preferences: {
    notifications: boolean;
    emailUpdates: boolean;
  };
  savedCards: Array<{
    id: string;
    last4: string;
    brand: string;
    expiryMonth: number;
    expiryYear: number;
    isDefault: boolean;
  }>;
  transactions: Array<{
    id: string;
    amount: number;
    timeAmount: number;
    status: 'completed' | 'pending' | 'failed';
    date: string;
    paymentMethod: string;
    description: string;
  }>;
}

const AccountScreen: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    id: 'user123',
    name: 'João Lukas',
    email: 'joao.lukas@email.com',
    phone: '+55 11 99999-9999',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face&auto=format',
    joinDate: '2024-01-15',
    titles: [
      {
        id: '1',
        name: 'Guardião',
        type: 'guardian',
        icon: 'shield',
        earnedAt: '2024-03-20'
      },
      {
        id: '2',
        name: 'Saqueador',
        type: 'raider',
        icon: 'skull',
        earnedAt: '2024-05-15'
      }
    ],
    achievements: [
      {
        id: '1',
        name: 'Primeiro Saque',
        description: 'Completou seu primeiro saque com sucesso',
        icon: 'trophy',
        rarity: 'common',
        unlockedAt: '2024-01-20'
      },
      {
        id: '2',
        name: 'Mestre dos Cofres',
        description: 'Abriu 100 cofres diferentes',
        icon: 'crown',
        rarity: 'epic',
        unlockedAt: '2024-06-15'
      },
      {
        id: '3',
        name: 'Fortuna Dourada',
        description: 'Acumulou mais de R$ 50.000 em prêmios',
        icon: 'gem',
        rarity: 'legendary',
        unlockedAt: '2024-07-01'
      }
    ],
    preferences: {
      notifications: true,
      emailUpdates: false
    },
    savedCards: [
      {
        id: '1',
        last4: '4242',
        brand: 'Visa',
        expiryMonth: 12,
        expiryYear: 2026,
        isDefault: true
      },
      {
        id: '2',
        last4: '8888',
        brand: 'Mastercard',
        expiryMonth: 8,
        expiryYear: 2027,
        isDefault: false
      }
    ],
    transactions: [
      {
        id: '1',
        amount: 29.90,
        timeAmount: 60,
        status: 'completed',
        date: '2024-07-10',
        paymentMethod: 'Visa •••• 4242',
        description: 'Compra de 60 minutos'
      },
      {
        id: '2',
        amount: 49.90,
        timeAmount: 120,
        status: 'completed',
        date: '2024-07-08',
        paymentMethod: 'Mastercard •••• 8888',
        description: 'Compra de 120 minutos'
      },
      {
        id: '3',
        amount: 99.90,
        timeAmount: 300,
        status: 'pending',
        date: '2024-07-12',
        paymentMethod: 'Visa •••• 4242',
        description: 'Compra de 300 minutos'
      },
      {
        id: '4',
        amount: 19.90,
        timeAmount: 30,
        status: 'failed',
        date: '2024-07-05',
        paymentMethod: 'Mastercard •••• 8888',
        description: 'Compra de 30 minutos'
      }
    ]
  });

  const handleBack = () => {
    alert('Voltar para o menu principal');
  };

  const handleEditProfile = () => {
    alert('Editar perfil - Abrir modal de edição');
  };

  const handleLogout = () => {
    if (window.confirm('Tem certeza que deseja sair da sua conta?')) {
      alert('Logout realizado com sucesso');
    }
  };

  const handleToggleNotifications = () => {
    setUserData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        notifications: !prev.preferences.notifications
      }
    }));
  };

  const handleToggleEmailUpdates = () => {
    setUserData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        emailUpdates: !prev.preferences.emailUpdates
      }
    }));
  };

  const handleAddCard = () => {
    alert('Adicionar novo cartão - Abrir modal');
  };

  const handleRemoveCard = (cardId: string) => {
    if (window.confirm('Tem certeza que deseja remover este cartão?')) {
      setUserData(prev => ({
        ...prev,
        savedCards: prev.savedCards.filter(card => card.id !== cardId)
      }));
    }
  };

  const handleSetDefaultCard = (cardId: string) => {
    setUserData(prev => ({
      ...prev,
      savedCards: prev.savedCards.map(card => ({
        ...card,
        isDefault: card.id === cardId
      }))
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-800/20 to-slate-900/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform skew-x-12" />
      </div>

      {/* Header */}
      <div className="relative z-10 p-4">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleBack}
            className="w-10 h-10 bg-slate-800/80 hover:bg-slate-700/80 rounded-xl flex items-center justify-center transition-all duration-200 border border-slate-600/30"
          >
            <ArrowLeft className="w-5 h-5 text-slate-300" />
          </button>
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white text-left ml-4">Minha Conta</h1>
          </div>
        </div>

        {/* Profile Header - UserCard Component */}
        <UserCard 
          userData={{
            name: userData.name,
            email: userData.email,
            avatar: userData.avatar,
            titles: userData.titles
          }}
        />

        {/* Personal Information Component */}
        <PersonalInfoComponent 
          userData={{
            email: userData.email,
            phone: userData.phone,
            joinDate: userData.joinDate
          }}
        />

        {/* Billing Component */}
        <BillingComponent 
          transactions={userData.transactions}
        />

        {/* Saved Cards Component */}
        <SavedCard 
          savedCards={userData.savedCards}
          onAddCard={handleAddCard}
          onRemoveCard={handleRemoveCard}
          onSetDefaultCard={handleSetDefaultCard}
        />

        {/* Achievements Component */}
        <AchievementsComponent 
          achievements={userData.achievements}
        />

        {/* Preferences Component */}
        <PreferencesComponent 
          preferences={userData.preferences}
          onToggleNotifications={handleToggleNotifications}
          onToggleEmailUpdates={handleToggleEmailUpdates}
        />

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleEditProfile}
            className="w-full flex items-center justify-center space-x-2 py-3 bg-violet-500/20 hover:bg-violet-500/30 rounded-xl border border-violet-400/30 transition-all duration-200"
          >
            <Edit className="w-5 h-5 text-violet-400" />
            <span className="text-white font-medium">Atualizar Dados</span>
          </button>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 py-3 bg-red-500/20 hover:bg-red-500/30 rounded-xl border border-red-400/30 transition-all duration-200"
          >
            <LogOut className="w-5 h-5 text-red-400" />
            <span className="text-red-400 font-medium">Sair da Conta</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountScreen;