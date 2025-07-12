import { LayoutGrid, Lock, Trophy, Filter } from "lucide-react";

export type FilterType = 'all' | 'available' | 'conquered' | 'difficulty';

interface VaultFiltersProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export function VaultFilters({ activeFilter, onFilterChange }: VaultFiltersProps) {
  const filters = [
    {
      id: 'all' as FilterType,
      label: 'Todos os Cofres',
      icon: LayoutGrid,
    },
    {
      id: 'available' as FilterType,
      label: 'Disponíveis',
      icon: Lock,
    },
    {
      id: 'conquered' as FilterType,
      label: 'Conquistados',
      icon: Trophy,
    },
    {
      id: 'difficulty' as FilterType,
      label: 'Por Dificuldade',
      icon: Filter,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="flex flex-wrap gap-3 mb-8">
        {filters.map((filter) => {
          const Icon = filter.icon;
          const isActive = activeFilter === filter.id;
          
          return (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                isActive
                  ? 'bg-violet-500 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              <Icon className="h-4 w-4" />
              {filter.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
