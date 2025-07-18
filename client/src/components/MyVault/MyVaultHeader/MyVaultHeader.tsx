import React from 'react';
import { Trophy, Search, Filter } from 'lucide-react';

interface MyVaultHeaderProps {
  onSearch?: (query: string) => void;
  onFilter?: () => void;
  className?: string;
}

const MyVaultHeader: React.FC<MyVaultHeaderProps> = ({
  onSearch,
  onFilter,
  className = ''
}) => {
  const handleSearch = () => {
    if (onSearch) {
      // Implementar lógica de busca
      const query = prompt('Digite o que você está procurando:');
      if (query) {
        onSearch(query);
      }
    }
  };

  const handleFilter = () => {
    if (onFilter) {
      onFilter();
    }
  };

  return (
    <div className={`bg-slate-800/50 backdrop-blur-md border-b border-slate-700/50 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          {/* Left side - Icon, Title, Subtitle */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-violet-500/20 rounded-2xl flex items-center justify-center">
              <Trophy className="h-6 w-6 text-violet-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Meu Cofre</h1>
              <p className="text-slate-400">Gerencie seus itens conquistados</p>
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-4">
            <button 
              onClick={handleSearch}
              className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors"
            >
              <Search className="h-4 w-4" />
              Buscar
            </button>
            <button 
              onClick={handleFilter}
              className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors"
            >
              <Filter className="h-4 w-4" />
              Filtrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyVaultHeader;