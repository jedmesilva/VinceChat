import React from 'react';
import { Package, Gem, Trophy, Star } from 'lucide-react';

interface MyVaultMainProps {
  className?: string;
}

const MyVaultMain: React.FC<MyVaultMainProps> = ({ className = '' }) => {
  const myItems = [
    {
      id: '1',
      name: 'Troféu de Ouro',
      type: 'trophy',
      rarity: 'legendary',
      value: 1000,
      icon: Trophy,
      color: 'text-yellow-400'
    },
    {
      id: '2',
      name: 'Gema Rara',
      type: 'gem',
      rarity: 'epic',
      value: 500,
      icon: Gem,
      color: 'text-purple-400'
    },
    {
      id: '3',
      name: 'Coleção de Cartas',
      type: 'collection',
      rarity: 'rare',
      value: 250,
      icon: Package,
      color: 'text-blue-400'
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return 'border-yellow-400/50 bg-yellow-900/20';
      case 'epic':
        return 'border-purple-400/50 bg-purple-900/20';
      case 'rare':
        return 'border-blue-400/50 bg-blue-900/20';
      default:
        return 'border-gray-400/50 bg-gray-900/20';
    }
  };

  return (
    <div className={`h-full bg-gray-900 ${className}`}>
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Package className="w-6 h-6 text-violet-400" />
          Meu Cofre
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Seus itens coletados
        </p>
      </div>

      <div className="p-4 overflow-y-auto flex-1">
        {myItems.length === 0 ? (
          <div className="text-center py-8">
            <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">Seu cofre está vazio</p>
            <p className="text-gray-500 text-sm mt-2">
              Desbloqueie cofres para coletar itens
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {myItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-lg border-2 transition-all hover:bg-gray-800/50 ${getRarityColor(item.rarity)}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-800 rounded-lg">
                      <IconComponent className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{item.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-gray-400 capitalize">
                          {item.rarity}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 font-semibold">
                        R$ {item.value.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Total de itens:</span>
          <span className="text-white font-medium">{myItems.length}</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-2">
          <span className="text-gray-400">Valor total:</span>
          <span className="text-green-400 font-semibold">
            R$ {myItems.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MyVaultMain;