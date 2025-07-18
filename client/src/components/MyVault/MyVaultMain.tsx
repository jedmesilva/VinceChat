import React from 'react';
import MyVaultHeader from '../../components/MyVault/MyVaultHeader/MyVaultHeader';
import ItemList from '../../components/Item/ItemList/ItemList';

const MyVaultMain: React.FC = () => {
  // Dados de exemplo
  const vaultItems = [
    {
      id: '1',
      type: 'money',
      name: 'Baú de Moedas',
      value: 1000,
      description: 'Uma quantia generosa em moedas douradas coletadas dos cofres mais raros do reino. Perfeito para expandir seu inventário.',
      rarity: 'common',
      status: 'available',
      vaultSource: 'Cofre Básico',
      expiresAt: '2025-08-15'
    },
    {
      id: '2',
      type: 'product',
      name: 'Smartphone Premium',
      value: 2500,
      description: 'O mais recente modelo com todas as funcionalidades avançadas, incluindo câmera profissional e processamento de última geração.',
      rarity: 'epic',
      status: 'claimed',
      vaultSource: 'Cofre Épico',
      claimedAt: '2025-07-10'
    },
    {
      id: '3',
      type: 'voucher',
      name: 'Vale Compras',
      value: 500,
      description: 'Válido em diversas lojas parceiras para você escolher exatamente o que precisa.',
      rarity: 'rare',
      status: 'available',
      vaultSource: 'Cofre Raro',
      expiresAt: '2025-12-31'
    },
    {
      id: '4',
      type: 'special',
      name: 'Coroa Dourada',
      value: 5000,
      description: 'Item especial de prestígio único que demonstra sua habilidade e sorte excepcionais.',
      rarity: 'legendary',
      status: 'expired',
      vaultSource: 'Cofre Lendário'
    },
    {
      id: '5',
      type: 'money',
      name: 'Saco de Ouro',
      value: 750,
      description: 'Ouro puro extraído das minas mais profundas, refinado para máxima pureza.',
      rarity: 'rare',
      status: 'available',
      vaultSource: 'Cofre Raro',
      expiresAt: '2025-09-30'
    },
    {
      id: '6',
      type: 'product',
      name: 'Headset Gamer',
      value: 350,
      description: 'Audio de alta qualidade com microfone profissional para uma experiência imersiva.',
      rarity: 'common',
      status: 'claimed',
      vaultSource: 'Cofre Básico',
      claimedAt: '2025-07-01'
    },
    {
      id: '7',
      type: 'voucher',
      name: 'Vale Restaurante',
      value: 200,
      description: 'Desfrute de uma refeição especial em restaurantes selecionados da sua cidade.',
      rarity: 'common',
      status: 'available',
      vaultSource: 'Cofre Básico',
      expiresAt: '2025-11-15'
    },
    {
      id: '8',
      type: 'special',
      name: 'Anel Mágico',
      value: 3000,
      description: 'Artefato místico com poderes especiais que apenas os mais sortudos conseguem obter.',
      rarity: 'legendary',
      status: 'available',
      vaultSource: 'Cofre Lendário',
      expiresAt: '2025-12-25'
    }
  ];

  const handleItemClick = (item: any) => {
    if (item.status === 'available') {
      alert(`Resgatar: ${item.name}`);
      // Aqui você pode implementar a lógica de resgate do item
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Header */}
      <MyVaultHeader />

      {/* Content */}
      <div className="w-full max-w-7xl mx-auto px-6 py-8">
        <ItemList
          items={vaultItems}
          onItemClick={handleItemClick}
          gridCols="auto"
          gap="medium"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default MyVaultMain;