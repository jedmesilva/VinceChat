import React from 'react';
import VaultItemCard from '../../Item/ItemCard/ItemCard';

interface ItemListProps {
  items: any[];
  onItemClick?: (item: any) => void;
  className?: string;
  gridCols?: 'auto' | '1' | '2' | '3' | '4' | '5' | '6';
  gap?: 'small' | 'medium' | 'large';
}

const ItemList: React.FC<ItemListProps> = ({
  items,
  onItemClick,
  className = '',
  gridCols = 'auto',
  gap = 'medium'
}) => {
  // Configurações de grid responsivo
  const gridConfig = {
    auto: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    '1': 'grid-cols-1',
    '2': 'grid-cols-1 sm:grid-cols-2',
    '3': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    '4': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    '5': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5',
    '6': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6'
  };

  // Configurações de espaçamento
  const gapConfig = {
    small: 'gap-4',
    medium: 'gap-6',
    large: 'gap-8'
  };

  const gridClasses = gridConfig[gridCols];
  const gapClasses = gapConfig[gap];

  if (!items || items.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-slate-400 text-lg">
          Nenhum item encontrado
        </div>
      </div>
    );
  }

  return (
    <div className={`grid ${gridClasses} ${gapClasses} w-full ${className}`}>
      {items.map((item) => (
        <VaultItemCard
          key={item.id}
          item={item}
          onItemClick={onItemClick}
          className="w-full"
        />
      ))}
    </div>
  );
};

export default ItemList;