import React, { useState } from 'react';
import { X } from 'lucide-react';
import CheckoutSelectorTime from './CheckoutComponents/CheckoutSelectorTime';
import PaymentForm from './CheckoutComponents/PaymentForm';
import PaymentConfirmation from './CheckoutComponents/PaymentConfirmation';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  onTimeAdded?: (timeInSeconds: number) => void;
}

type CheckoutStep = 'time-selection' | 'payment' | 'confirmation';

const Checkout: React.FC<CheckoutProps> = ({ isOpen, onClose, onTimeAdded }) => {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('time-selection');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const handleTimeSelected = (time: string, price: number) => {
    setSelectedTime(time);
    setTotalPrice(price);
    setCurrentStep('payment');
  };

  const handlePaymentCompleted = () => {
    setCurrentStep('confirmation');
    
    // Converter tempo para segundos e adicionar ao timer
    const timeInSeconds = convertTimeStringToSeconds(selectedTime);
    if (onTimeAdded) {
      onTimeAdded(timeInSeconds);
    }
  };

  const convertTimeStringToSeconds = (timeString: string): number => {
    // Converte strings como "5min", "2h 30min", "1h 5min 30s" para segundos
    let totalSeconds = 0;
    
    const hourMatch = timeString.match(/(\d+)h/);
    const minMatch = timeString.match(/(\d+)min/);
    const secMatch = timeString.match(/(\d+)s/);
    
    if (hourMatch) totalSeconds += parseInt(hourMatch[1]) * 3600;
    if (minMatch) totalSeconds += parseInt(minMatch[1]) * 60;
    if (secMatch) totalSeconds += parseInt(secMatch[1]);
    
    return totalSeconds;
  };

  const handleClose = () => {
    setCurrentStep('time-selection');
    setSelectedTime('');
    setTotalPrice(0);
    onClose();
  };

  const handleConfirmationClose = () => {
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto scrollbar-hide">
      <div className="min-h-full flex flex-col">
        {/* Header com botão de fechar - fixo no topo */}
        <div className="flex-shrink-0 flex justify-end p-4">
          <button
            onClick={handleClose}
            className="w-10 h-10 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center text-slate-300 hover:text-white transition-all duration-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Container principal - centralizado e responsivo */}
        <div className="flex-1 flex items-center justify-center px-4 pb-8">
          <div className="w-full max-w-md">
            {/* Conteúdo dinâmico baseado no step */}
            {currentStep === 'time-selection' && (
              <CheckoutSelectorTime onPurchase={handleTimeSelected} className="w-full" />
            )}

            {currentStep === 'payment' && (
              <PaymentForm 
                selectedTime={selectedTime}
                totalPrice={totalPrice}
                onPaymentCompleted={handlePaymentCompleted}
                onBack={() => setCurrentStep('time-selection')}
                className="w-full"
              />
            )}

            {currentStep === 'confirmation' && (
              <PaymentConfirmation 
                selectedTime={selectedTime}
                totalPrice={totalPrice}
                onClose={handleConfirmationClose}
                className="w-full"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;