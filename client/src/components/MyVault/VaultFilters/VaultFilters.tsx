import React from 'react';
import { Search } from 'lucide-react';

interface VaultFiltersProps {
  searchTerm: string;
  selectedRarity: string;
  selectedType: string;
  onSearchChange: (term: string) => void;
  onRarityChange: (rarity: string) => void;
  onTypeChange: (type: string) => void;
}

const VaultFilters: React.FC<VaultFiltersProps> = ({
  searchTerm,
  selectedRarity,
  selectedType,
  onSearchChange,
  onRarityChange,
  onTypeChange
}) => {
  return (
    <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-3 border border-slate-600/30 mb-4">
      <div className="flex flex-wrap gap-3 items-center">
        {/* Search */}
        <div className="flex-1 min-w-48">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar itens..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-violet-500/50 focus:bg-slate-700/80 text-sm"
            />
          </div>
        </div>

        {/* Rarity Filter */}
        <select
          value={selectedRarity}
          onChange={(e) => onRarityChange(e.target.value)}
          className="px-3 py-2 bg-slate-700/50 border border-slate-600/30 rounded-lg text-white focus:outline-none focus:border-violet-500/50 text-sm"
        >
          <option value="all">Todas Raridades</option>
          <option value="common">Comum</option>
          <option value="rare">Raro</option>
          <option value="epic">Épico</option>
          <option value="legendary">Lendário</option>
        </select>

        {/* Type Filter */}
        <select
          value={selectedType}
          onChange={(e) => onTypeChange(e.target.value)}
          className="px-3 py-2 bg-slate-700/50 border border-slate-600/30 rounded-lg text-white focus:outline-none focus:border-violet-500/50 text-sm"
        >
          <option value="all">Todos os Tipos</option>
          <option value="money">Dinheiro</option>
          <option value="product">Produto</option>
          <option value="voucher">Vale</option>
          <option value="special">Especial</option>
        </select>
      </div>
    </div>
  );
};

export default VaultFilters;