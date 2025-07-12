import React from 'react';
import { X, User, Trophy, Settings, HelpCircle, Star, Target, Zap, Gift, Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Link } from 'wouter';

interface SidbarProps {
  onClose: () => void;
}

const Sidbar: React.FC<SidbarProps> = ({ onClose }) => {
  // Mock user data - in a real app this would come from context/API
  const userData = {
    name: 'Explorer',
    level: 15,
    experiencePoints: 2450,
    coinsCollected: 18500,
    vaultsOpened: 23,
    trophiesEarned: 7
  };

  const menuItems = [
    {
      icon: Home,
      label: 'Início',
      href: '/',
      active: true
    },
    {
      icon: Search,
      label: 'Descobrir Cofres',
      href: '/vault-discovery',
      active: false
    },
    {
      icon: Trophy,
      label: 'Troféus',
      href: '/trophies',
      badge: userData.trophiesEarned
    },
    {
      icon: Target,
      label: 'Missões',
      href: '/missions',
      badge: 3
    },
    {
      icon: Gift,
      label: 'Recompensas',
      href: '/rewards'
    }
  ];

  const quickStats = [
    {
      icon: Star,
      label: 'Nível',
      value: userData.level,
      color: 'text-yellow-400'
    },
    {
      icon: Zap,
      label: 'XP',
      value: userData.experiencePoints.toLocaleString(),
      color: 'text-blue-400'
    },
    {
      icon: Trophy,
      label: 'Cofres',
      value: userData.vaultsOpened,
      color: 'text-purple-400'
    }
  ];

  return (
    <div className="h-full bg-slate-800 border-r border-slate-700/50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">{userData.name}</h3>
            <p className="text-slate-400 text-sm">Nível {userData.level}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-slate-400 hover:text-white hover:bg-slate-700/50"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="p-4 space-y-3">
        <h4 className="text-slate-300 font-medium text-sm">Estatísticas</h4>
        <div className="grid grid-cols-3 gap-2">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-slate-700/30 rounded-lg p-3 text-center">
              <stat.icon className={`w-4 h-4 mx-auto mb-1 ${stat.color}`} />
              <div className="text-white font-semibold text-sm">{stat.value}</div>
              <div className="text-slate-400 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Progress bar for next level */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>Progresso do Nível</span>
            <span>{userData.experiencePoints % 1000}/1000 XP</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-violet-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(userData.experiencePoints % 1000) / 10}%` }}
            />
          </div>
        </div>
      </div>

      <Separator className="bg-slate-700/50" />

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <h4 className="text-slate-300 font-medium text-sm mb-3">Menu</h4>
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link href={item.href}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-left px-3 py-2 h-auto ${
                    item.active 
                      ? 'bg-violet-500/20 text-violet-300 hover:bg-violet-500/30' 
                      : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <Badge 
                      variant="secondary" 
                      className="ml-2 bg-violet-500/20 text-violet-300 text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <Separator className="bg-slate-700/50" />

      {/* Achievements Section */}
      <div className="p-4">
        <h4 className="text-slate-300 font-medium text-sm mb-3">Conquistas Recentes</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 p-2 bg-slate-700/30 rounded-lg">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <div className="flex-1">
              <p className="text-white text-xs font-medium">Explorador Dedicado</p>
              <p className="text-slate-400 text-xs">Abriu 20 cofres</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 p-2 bg-slate-700/30 rounded-lg">
            <Star className="w-4 h-4 text-purple-400" />
            <div className="flex-1">
              <p className="text-white text-xs font-medium">Caçador de Tesouros</p>
              <p className="text-slate-400 text-xs">Coletou 15.000 moedas</p>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-slate-700/50" />

      {/* Footer */}
      <div className="p-4 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-400 hover:text-white hover:bg-slate-700/50"
        >
          <Settings className="w-5 h-5 mr-3" />
          Configurações
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-400 hover:text-white hover:bg-slate-700/50"
        >
          <HelpCircle className="w-5 h-5 mr-3" />
          Ajuda
        </Button>
      </div>
    </div>
  );
};

export default Sidbar;