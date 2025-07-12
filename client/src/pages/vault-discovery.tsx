import { useState, useEffect, useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Filter } from 'lucide-react';
import { VaultCard } from '@/components/vault-card';
import { VaultModal } from '@/components/vault-modal';
import { VaultHeader } from '@/components/vault-header';
import { VaultFilters, type FilterType } from '@/components/vault-filters';
import type { Vault } from '@shared/schema';

export default function VaultDiscovery() {
  const [selectedVault, setSelectedVault] = useState<Vault | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');

  const { data: vaults = [], isLoading, error } = useQuery<Vault[]>({
    queryKey: ['/api/vaults'],
  });

  const filteredVaults = useMemo(() => {
    switch (filter) {
      case 'available':
        return vaults.filter(vault => vault.isLocked);
      case 'conquered':
        return vaults.filter(vault => !vault.isLocked);
      case 'difficulty':
        return vaults.filter(vault => vault.difficulty === 'legendary' || vault.difficulty === 'hard');
      default:
        return vaults;
    }
  }, [vaults, filter]);

  const stats = useMemo(() => ({
    total: vaults.length,
    available: vaults.filter(v => v.isLocked).length,
    conquered: vaults.filter(v => !v.isLocked).length,
    totalPrize: vaults.reduce((sum, v) => sum + v.itemAmount, 0)
  }), [vaults]);

  const handleVaultClick = useCallback((vault: Vault) => {
    setSelectedVault(vault);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedVault(null);
  }, []);

  const handleFilterChange = useCallback((newFilter: FilterType) => {
    setFilter(newFilter);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedVault) {
        handleCloseModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedVault, handleCloseModal]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-xl mb-4">Erro ao carregar cofres</div>
          <p className="text-slate-400">Não foi possível conectar ao servidor</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin mb-4"></div>
          <p className="text-violet-300">Carregando cofres...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <VaultHeader 
        totalVaults={stats.total}
        conqueredVaults={stats.conquered}
        totalPrize={stats.totalPrize}
      />
      
      <VaultFilters 
        activeFilter={filter}
        onFilterChange={handleFilterChange}
      />

      <main className="max-w-7xl mx-auto px-6 pb-12">
        {filteredVaults.length === 0 ? (
          <div className="text-center py-12">
            <Filter className="h-16 w-16 text-slate-500 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">Nenhum cofre encontrado para este filtro</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVaults.map((vault, index) => (
              <VaultCard 
                key={vault.id} 
                vault={vault} 
                onVaultClick={handleVaultClick}
                index={index}
              />
            ))}
          </div>
        )}
      </main>

      <VaultModal 
        vault={selectedVault}
        onClose={handleCloseModal}
      />
    </div>
  );
}
