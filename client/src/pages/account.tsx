import React, { useState } from 'react';
import AccountHeader from '@/components/Account/AccountHeader/AccountHeader';
import ProfileHeader from '@/components/Account/ProfileHeader/ProfileHeader';
import PersonalInfo from '@/components/Account/PersonalInfo/PersonalInfo';
import BillingSection from '@/components/Account/BillingSection/BillingSection';
import SavedCards from '@/components/Account/SavedCards/SavedCards';
import Achievements from '@/components/Account/Achievements/Achievements';
import Preferences from '@/components/Account/Preferences/Preferences';
import ActionButtons from '@/components/Account/ActionButtons/ActionButtons';
import UserUpdateForm from '@/components/Account/UserUpdateForm/UserUpdateForm';

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

const AccountPage: React.FC = () => {
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

  // Estados para controlar seções expandidas
  const [showPersonalInfo, setShowPersonalInfo] = useState(true);
  const [showAchievements, setShowAchievements] = useState(true);
  const [showBilling, setShowBilling] = useState(true);
  const [showCards, setShowCards] = useState(true);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  // Handlers
  const handleBack = () => {
    alert('Voltar para o menu principal');
  };

  const handleEditProfile = () => {
    setShowUpdateForm(true);
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

  const handleUpdateSubmit = (updatedData: any) => {
    setUserData(prev => ({
      ...prev,
      name: updatedData.name,
      email: updatedData.email
    }));
    setShowUpdateForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-800/20 to-slate-900/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform skew-x-12" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-4">
        <AccountHeader onBack={handleBack} />
        
        <ProfileHeader 
          name={userData.name}
          email={userData.email}
          avatar={userData.avatar}
          titles={userData.titles}
        />

        <PersonalInfo 
          email={userData.email}
          phone={userData.phone}
          joinDate={userData.joinDate}
          isExpanded={showPersonalInfo}
          onToggle={() => setShowPersonalInfo(!showPersonalInfo)}
        />

        <BillingSection 
          transactions={userData.transactions}
          isExpanded={showBilling}
          onToggle={() => setShowBilling(!showBilling)}
        />

        <SavedCards 
          cards={userData.savedCards}
          isExpanded={showCards}
          onToggle={() => setShowCards(!showCards)}
          onAddCard={handleAddCard}
          onRemoveCard={handleRemoveCard}
          onSetDefaultCard={handleSetDefaultCard}
        />

        <Achievements 
          achievements={userData.achievements}
          isExpanded={showAchievements}
          onToggle={() => setShowAchievements(!showAchievements)}
        />

        <Preferences 
          preferences={userData.preferences}
          onToggleNotifications={handleToggleNotifications}
          onToggleEmailUpdates={handleToggleEmailUpdates}
        />

        <ActionButtons 
          onEditProfile={handleEditProfile}
          onLogout={handleLogout}
        />
      </div>

      {/* Modal de atualização */}
      {showUpdateForm && (
        <UserUpdateForm 
          currentUser={{
            name: userData.name,
            email: userData.email,
            nickname: ''
          }}
          onUpdateSubmit={handleUpdateSubmit}
          onClose={() => setShowUpdateForm(false)}
        />
      )}
    </div>
  );
};

export default AccountPage;