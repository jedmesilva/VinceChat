import React, { useState } from 'react';
import { Clock, Plus, Minus, Star, Timer, X } from 'lucide-react';

interface CheckoutSelectorTimeProps {
  onPurchase: (time: string, price: number) => void;
  onClose?: () => void;
  className?: string;
}

const CheckoutSelectorTime: React.FC<CheckoutSelectorTimeProps> = ({ onPurchase, onClose, className = '' }) => {
  const [selectedBlocks, setSelectedBlocks] = useState(1);
  const [isPressed, setIsPressed] = useState(false);
  const minutesPerBlock = 2.5;
  const pricePerBlock = 5.99;

  const totalMinutes = selectedBlocks * minutesPerBlock;
  const totalPrice = selectedBlocks * pricePerBlock;

  // Função para formatar tempo em h min s
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.floor(minutes % 60);
    const seconds = Math.round((minutes - Math.floor(minutes)) * 60);

    if (hours > 0) {
      if (seconds === 0) {
        return `${hours}h ${remainingMinutes}min`;
      }
      return `${hours}h ${remainingMinutes}min ${seconds}s`;
    } else {
      if (seconds === 0) {
        return `${remainingMinutes}min`;
      }
      return `${remainingMinutes}min ${seconds}s`;
    }
  };

  // Função para formatar tempo no formato "2:30" ou "02:30:30"
  const formatTimeShort = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.floor(minutes % 60);
    const seconds = Math.round((minutes - Math.floor(minutes)) * 60);

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      return `${remainingMinutes}:${seconds.toString().padStart(2, '0')}`;
    }
  };

  const handleDecrease = () => {
    if (selectedBlocks > 1) {
      setSelectedBlocks(selectedBlocks - 1);
    }
  };

  const handleIncrease = () => {
    setSelectedBlocks(selectedBlocks + 1);
  };

  const handlePurchase = () => {
    const timeString = formatTime(totalMinutes);

    if (onPurchase) {
      onPurchase(timeString, totalPrice);
    } else {
      console.log(`Adicionando ${timeString} por R$ ${totalPrice.toFixed(2)}`);
      alert(`Tempo adicionado com sucesso!\nTempo: ${timeString}\nValor: R$ ${totalPrice.toFixed(2)}`);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="bg-slate-800/95 backdrop-blur-md rounded-3xl p-4 sm:p-6 md:p-8 border border-slate-700/50 shadow-2xl shadow-black/50">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-violet-500/20 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Adicionar Tempo</h3>
              <p className="text-sm text-slate-400">Selecione o tempo que deseja adicionar</p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="w-8 h-8 bg-slate-700/50 hover:bg-slate-700/80 rounded-lg flex items-center justify-center text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Seletor de Tempo - Elemento Principal */}
        <div className="mb-8">
          <label className="block text-slate-300 text-sm font-medium mb-4">
            Tempo a adicionar
          </label>

          <div className="flex items-center justify-center gap-3 sm:gap-6 mb-4">
            <button
              onClick={handleDecrease}
              disabled={selectedBlocks <= 1}
              className="w-12 h-12 sm:w-14 sm:h-14 bg-slate-700/80 hover:bg-slate-600/80 disabled:bg-slate-800/50 disabled:opacity-50 rounded-2xl flex items-center justify-center transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            >
              <Minus className="w-5 h-5 sm:w-6 sm:h-6 text-slate-300" />
            </button>

            <div className="text-center px-4 py-3 sm:px-6 sm:py-4 bg-slate-900/50 rounded-2xl border border-slate-700/30 min-w-[100px] sm:min-w-[120px] flex-1 max-w-[140px]">
              <div className="text-2xl sm:text-4xl font-bold text-white mb-1">
                {formatTimeShort(totalMinutes)}
              </div>
              <div className="text-slate-400 text-xs sm:text-sm">
                {formatTime(totalMinutes)}
              </div>
            </div>

            <button
              onClick={handleIncrease}
              className="w-12 h-12 sm:w-14 sm:h-14 bg-slate-700/80 hover:bg-slate-600/80 rounded-2xl flex items-center justify-center transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            >
              <Plus className="w-6 h-6 text-slate-300" />
            </button>
          </div>
        </div>

        {/* Resumo - Seção secundária mas importante */}
        <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-slate-700/50">
          <h3 className="text-slate-300 font-bold mb-4 text-lg flex items-center gap-2">
            <Star className="h-5 w-5 text-violet-400" />
            Resumo
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400">Tempo total:</span>
              <span className="text-white font-medium">
                {formatTime(totalMinutes)}
              </span>
            </div>

            <div className="border-t border-slate-700/50 pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-300 font-bold">Total:</span>
                <span className="text-violet-400 font-bold text-lg">
                  R$ {totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Botão de Ação - CTA Principal */}
        <button
          onClick={handlePurchase}
          onTouchStart={() => setIsPressed(true)}
          onTouchEnd={() => setIsPressed(false)}
          className={`w-full py-3 sm:py-4 px-4 sm:px-6 bg-violet-500 hover:bg-violet-400 active:bg-violet-600 text-white rounded-2xl text-base sm:text-lg font-bold transition-all duration-200 shadow-lg shadow-violet-500/25 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${
            isPressed ? 'scale-95 bg-violet-600' : ''
          }`}
          style={{
            touchAction: 'manipulation',
            userSelect: 'none',
            WebkitTouchCallout: 'none',
            minHeight: '48px'
          }}
        >
          <div className="flex items-center justify-center gap-2">
            <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Adicionar {formatTime(totalMinutes)}</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default CheckoutSelectorTime;