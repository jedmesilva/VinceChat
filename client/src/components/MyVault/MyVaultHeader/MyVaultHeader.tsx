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
      <div className="w-full px-3 py-4">
        {/* Mobile-first responsive layout */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Left side - Icon, Title, Subtitle */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-violet-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-violet-400" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl font-bold text-white truncate">Meu Cofre</h1>
              <p className="text-xs sm:text-sm text-slate-400 truncate">Gerencie seus itens</p>
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button 
              onClick={handleSearch}
              className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm"
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Buscar</span>
            </button>
            <button 
              onClick={handleFilter}
              className="bg-violet-600 hover:bg-violet-700 text-white px-3 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm"
            >
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filtrar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyVaultHeader;