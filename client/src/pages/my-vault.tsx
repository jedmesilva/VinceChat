import React, { useState, useEffect } from 'react';
import VaultBackground from '@/components/MyVault/VaultBackground/VaultBackground';
import VaultHeader from '@/components/MyVault/VaultHeader/VaultHeader';
import VaultFilters from '@/components/MyVault/VaultFilters/VaultFilters';
import VaultItemsGrid from '@/components/MyVault/VaultItemsGrid/VaultItemsGrid';

interface VaultItem {
  id: string;
  type: 'money' | 'product' | 'voucher' | 'special';
  name: string;
  value: number;
  description: string;
  quantity?: number;
  image?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  status: 'available' | 'claimed' | 'expired';
  claimDeadline?: string;
  claimedAt?: string;
  vaultSource?: string;
  expiresAt?: string;
}

const MyVaultPage: React.FC = () => {
  const [items, setItems] = useState<VaultItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<VaultItem[]>([]);
  const [selectedRarity, setSelectedRarity] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  // Carregar dados de exemplo
  useEffect(() => {
    const loadItems = async () => {
      const sampleItems: VaultItem[] = [
        // Itens disponíveis
        {
          id: '1',
          type: 'money',
          name: 'Prêmio em Dinheiro',
          value: 2500,
          description: 'Valor em dinheiro para saque imediato',
          rarity: 'epic',
          status: 'available',
          claimDeadline: '7 dias',
          vaultSource: 'Cofre do Tesouro',
          expiresAt: '2025-07-18'
        },
        {
          id: '2',
          type: 'product',
          name: 'Smartphone Premium',
          value: 1800,
          description: 'iPhone 15 Pro Max 256GB na cor titânio natural',
          rarity: 'legendary',
          status: 'available',
          quantity: 1,
          claimDeadline: '30 dias',
          vaultSource: 'Cofre Tecnológico',
          expiresAt: '2025-08-10'
        },
        {
          id: '3',
          type: 'voucher',
          name: 'Vale Shopping',
          value: 500,
          description: 'Vale compras para qualquer loja do shopping',
          rarity: 'rare',
          status: 'available',
          claimDeadline: '60 dias',
          vaultSource: 'Cofre da Sorte',
          expiresAt: '2025-09-10'
        },
        {
          id: '4',
          type: 'special',
          name: 'Acesso VIP',
          value: 1200,
          description: 'Acesso exclusivo a cofres premium por 1 mês',
          rarity: 'epic',
          status: 'available',
          claimDeadline: '3 dias',
          vaultSource: 'Cofre Especial',
          expiresAt: '2025-07-14'
        },
        
        // Itens do histórico
        {
          id: '5',
          type: 'money',
          name: 'Bonus Especial',
          value: 750,
          description: 'Bônus adicional por conquista rápida',
          rarity: 'rare',
          status: 'claimed',
          claimedAt: '2025-07-05',
          vaultSource: 'Cofre da Velocidade'
        },
        {
          id: '6',
          type: 'product',
          name: 'Fone Bluetooth',
          value: 350,
          description: 'AirPods Pro 2ª geração com cancelamento de ruído',
          rarity: 'common',
          status: 'claimed',
          quantity: 1,
          claimedAt: '2025-07-03',
          vaultSource: 'Cofre Básico'
        },
        {
          id: '7',
          type: 'voucher',
          name: 'Vale Combustível',
          value: 200,
          description: 'Vale para abastecimento em qualquer posto',
          rarity: 'common',
          status: 'claimed',
          claimedAt: '2025-06-28',
          vaultSource: 'Cofre Diário'
        },
        {
          id: '8',
          type: 'money',
          name: 'Prêmio Consolação',
          value: 100,
          description: 'Valor adicional por participação',
          rarity: 'common',
          status: 'expired',
          vaultSource: 'Cofre da Tentativa'
        },
        {
          id: '9',
          type: 'special',
          name: 'Multiplicador 2x',
          value: 500,
          description: 'Dobra os ganhos por 24 horas',
          rarity: 'rare',
          status: 'claimed',
          claimedAt: '2025-06-20',
          vaultSource: 'Cofre Mágico'
        },
        {
          id: '10',
          type: 'product',
          name: 'Smartwatch',
          value: 800,
          description: 'Apple Watch Series 9 GPS 45mm',
          rarity: 'epic',
          status: 'claimed',
          quantity: 1,
          claimedAt: '2025-06-15',
          vaultSource: 'Cofre Premium'
        }
      ];
      
      setItems(sampleItems);
    };

    loadItems();
  }, []);

  // Filtrar itens
  useEffect(() => {
    let filtered = items;

    // Mostrar apenas itens disponíveis na tela principal
    if (!showHistory) {
      filtered = filtered.filter(item => item.status === 'available');
    } else {
      // No histórico, mostrar apenas claimed e expired
      filtered = filtered.filter(item => item.status === 'claimed' || item.status === 'expired');
    }

    // Filtro por raridade
    if (selectedRarity !== 'all') {
      filtered = filtered.filter(item => item.rarity === selectedRarity);
    }

    // Filtro por tipo
    if (selectedType !== 'all') {
      filtered = filtered.filter(item => item.type === selectedType);
    }

    // Filtro por busca
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  }, [items, showHistory, selectedRarity, selectedType, searchTerm]);

  const handleItemClick = (item: VaultItem) => {
    alert(`Clicou no item: ${item.name}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      <VaultBackground />

      {/* Header */}
      <div className="relative z-10 p-4">
        <VaultHeader 
          showHistory={showHistory}
          onToggleHistory={() => setShowHistory(!showHistory)}
        />

        <VaultFilters 
          searchTerm={searchTerm}
          selectedRarity={selectedRarity}
          selectedType={selectedType}
          onSearchChange={setSearchTerm}
          onRarityChange={setSelectedRarity}
          onTypeChange={setSelectedType}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 pb-4">
        <VaultItemsGrid 
          items={filteredItems}
          showHistory={showHistory}
          onItemClick={handleItemClick}
        />
      </div>
    </div>
  );
};

export default MyVaultPage;