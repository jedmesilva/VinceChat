import React, { useState } from 'react';
import { 
  CreditCard,
  X,
  User,
  Calendar,
  Lock,
  CheckCircle,
  AlertCircle,
  Plus
} from 'lucide-react';

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCard: (cardData: any) => void;
}

const AddCardModal: React.FC<AddCardModalProps> = ({
  isOpen,
  onClose,
  onAddCard
}) => {
  const [cardData, setCardData] = useState({
    number: '',
    holder: '',
    expiry: '',
    cvv: ''
  });
  const [saveAsDefault, setSaveAsDefault] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  // Formatação do número do cartão
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  // Formatação da data de validade
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  // Validação dos dados do cartão
  const validateCard = () => {
    const newErrors: Record<string, string> = {};

    // Validar número do cartão
    const cardNumber = cardData.number.replace(/\s/g, '');
    if (!cardNumber) {
      newErrors.number = 'Número do cartão é obrigatório';
    } else if (cardNumber.length < 13 || cardNumber.length > 19) {
      newErrors.number = 'Número do cartão inválido';
    }

    // Validar nome do portador
    if (!cardData.holder.trim()) {
      newErrors.holder = 'Nome do portador é obrigatório';
    } else if (cardData.holder.trim().length < 2) {
      newErrors.holder = 'Nome muito curto';
    }

    // Validar data de validade
    if (!cardData.expiry) {
      newErrors.expiry = 'Data de validade é obrigatória';
    } else {
      const [month, year] = cardData.expiry.split('/');
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;

      if (!month || !year || month.length !== 2 || year.length !== 2) {
        newErrors.expiry = 'Formato inválido (MM/AA)';
      } else {
        const monthNum = parseInt(month);
        const yearNum = parseInt(year);
        
        if (monthNum < 1 || monthNum > 12) {
          newErrors.expiry = 'Mês inválido';
        } else if (yearNum < currentYear || (yearNum === currentYear && monthNum < currentMonth)) {
          newErrors.expiry = 'Cartão expirado';
        }
      }
    }

    // Validar CVV
    if (!cardData.cvv) {
      newErrors.cvv = 'CVV é obrigatório';
    } else if (cardData.cvv.length < 3 || cardData.cvv.length > 4) {
      newErrors.cvv = 'CVV deve ter 3 ou 4 dígitos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCardInputChange = (field: string, value: string) => {
    let formattedValue = value;

    switch (field) {
      case 'number':
        formattedValue = formatCardNumber(value);
        break;
      case 'expiry':
        formattedValue = formatExpiry(value);
        break;
      case 'cvv':
        formattedValue = value.replace(/[^0-9]/g, '').substring(0, 4);
        break;
      case 'holder':
        formattedValue = value.replace(/[^a-zA-Z\s]/g, '').toUpperCase();
        break;
    }

    setCardData(prev => ({
      ...prev,
      [field]: formattedValue
    }));

    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async () => {
    if (!validateCard()) return;

    setIsProcessing(true);

    try {
      // Simular processamento
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Extrair dados para criar o cartão
      const [month, year] = cardData.expiry.split('/');
      const last4 = cardData.number.replace(/\s/g, '').slice(-4);
      
      // Detectar bandeira do cartão baseado no número
      const cardNumber = cardData.number.replace(/\s/g, '');
      let brand = 'Unknown';
      if (cardNumber.startsWith('4')) brand = 'Visa';
      else if (cardNumber.startsWith('5') || cardNumber.startsWith('2')) brand = 'Mastercard';
      else if (cardNumber.startsWith('3')) brand = 'American Express';

      const newCard = {
        id: Date.now().toString(),
        last4,
        brand,
        expiryMonth: parseInt(month),
        expiryYear: 2000 + parseInt(year),
        isDefault: saveAsDefault
      };

      onAddCard(newCard);
      onClose();
      
      // Resetar formulário
      setCardData({
        number: '',
        holder: '',
        expiry: '',
        cvv: ''
      });
      setSaveAsDefault(false);
      
    } catch (error) {
      console.error('Erro ao adicionar cartão:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800/95 backdrop-blur-sm rounded-2xl border border-slate-600/30 w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-600/30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-violet-500/20 rounded-xl flex items-center justify-center">
              <Plus className="w-5 h-5 text-violet-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Adicionar Cartão</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-slate-700/50 hover:bg-slate-700/80 rounded-lg flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Número do Cartão */}
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Número do Cartão
            </label>
            <div className="relative">
              <input
                type="text"
                value={cardData.number}
                onChange={(e) => handleCardInputChange('number', e.target.value)}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className={`w-full px-4 py-3 pl-12 bg-slate-700/80 border rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all duration-200 ${
                  errors.number ? 'border-red-500' : 'border-slate-600'
                }`}
              />
              <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            </div>
            {errors.number && (
              <div className="flex items-center gap-1 mt-2 text-red-400 text-sm">
                <AlertCircle className="h-4 w-4" />
                {errors.number}
              </div>
            )}
          </div>

          {/* Nome do Portador */}
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Nome do Portador
            </label>
            <div className="relative">
              <input
                type="text"
                value={cardData.holder}
                onChange={(e) => handleCardInputChange('holder', e.target.value)}
                placeholder="NOME COMO ESTÁ NO CARTÃO"
                className={`w-full px-4 py-3 pl-12 bg-slate-700/80 border rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all duration-200 ${
                  errors.holder ? 'border-red-500' : 'border-slate-600'
                }`}
              />
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            </div>
            {errors.holder && (
              <div className="flex items-center gap-1 mt-2 text-red-400 text-sm">
                <AlertCircle className="h-4 w-4" />
                {errors.holder}
              </div>
            )}
          </div>

          {/* Data de Validade e CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Validade
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={cardData.expiry}
                  onChange={(e) => handleCardInputChange('expiry', e.target.value)}
                  placeholder="MM/AA"
                  maxLength={5}
                  className={`w-full px-4 py-3 pl-12 bg-slate-700/80 border rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all duration-200 ${
                    errors.expiry ? 'border-red-500' : 'border-slate-600'
                  }`}
                />
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              </div>
              {errors.expiry && (
                <div className="flex items-center gap-1 mt-2 text-red-400 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  {errors.expiry}
                </div>
              )}
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                CVV
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={cardData.cvv}
                  onChange={(e) => handleCardInputChange('cvv', e.target.value)}
                  placeholder="123"
                  maxLength={4}
                  className={`w-full px-4 py-3 pl-12 bg-slate-700/80 border rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all duration-200 ${
                    errors.cvv ? 'border-red-500' : 'border-slate-600'
                  }`}
                />
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              </div>
              {errors.cvv && (
                <div className="flex items-center gap-1 mt-2 text-red-400 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  {errors.cvv}
                </div>
              )}
            </div>
          </div>

          {/* Opção de cartão padrão */}
          <div className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-xl">
            <input
              type="checkbox"
              id="saveAsDefault"
              checked={saveAsDefault}
              onChange={(e) => setSaveAsDefault(e.target.checked)}
              className="w-4 h-4 text-violet-500 bg-slate-700 border-slate-600 rounded focus:ring-violet-500/50 focus:ring-2"
            />
            <label htmlFor="saveAsDefault" className="text-slate-300 text-sm cursor-pointer">
              Definir como cartão padrão
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-slate-600/30">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-700/50 hover:bg-slate-700/80 text-slate-300 rounded-lg transition-colors font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={isProcessing}
            className={`px-4 py-2 rounded-lg transition-colors font-medium flex items-center space-x-2 ${
              isProcessing
                ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                : 'bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 border border-violet-400/30'
            }`}
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                <span>Processando...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Adicionar Cartão</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCardModal;