import { Users, Trophy, DollarSign } from "lucide-react";

interface VaultHeaderProps {
  totalVaults: number;
  conqueredVaults: number;
  totalPrize: number;
}

export function VaultHeader({ totalVaults, conqueredVaults, totalPrize }: VaultHeaderProps) {
  const formattedTotalPrize = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0
  }).format(totalPrize);

  return (
    <header className="bg-slate-800 border-b border-violet-500/20 sticky top-0 z-40 backdrop-blur-sm bg-slate-800/95">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Trophy className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-violet-100">Speek</h1>
              <p className="text-sm text-slate-400">Descoberta de Cofres</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-6 text-sm">
              <div className="text-center">
                <div className="text-violet-300 font-semibold">{totalVaults}</div>
                <div className="text-slate-400">Total de Cofres</div>
              </div>
              <div className="text-center">
                <div className="text-green-300 font-semibold">{conqueredVaults}</div>
                <div className="text-slate-400">Conquistados</div>
              </div>
              <div className="text-center">
                <div className="text-yellow-300 font-semibold">{formattedTotalPrize}</div>
                <div className="text-slate-400">Total em Prêmios</div>
              </div>
            </div>
            
            <div className="w-10 h-10 bg-violet-500/20 rounded-full flex items-center justify-center">
              <Users className="text-violet-300" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
