import React, { useState } from 'react';
import { CreditCard, Smartphone, User, Calendar, Lock, QrCode, CheckCircle, AlertCircle, Shield, X } from 'lucide-react';

interface PaymentFormProps {
  selectedTime?: string;
  totalPrice?: number;
  amount?: number;
  onPaymentCompleted?: () => void;
  onPaymentSubmit?: (paymentData: any) => void;
  onBack?: () => void;
  onClose?: () => void;
  className?: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ 
  selectedTime, 
  totalPrice, 
  amount = 299.99, 
  onPaymentCompleted, 
  onPaymentSubmit, 
  onBack,
  onClose,
  className = '' 
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix'>('card');
  const [cardData, setCardData] = useState({
    number: '',
    holder: '',
    expiry: '',
    cvv: ''
  });
  const [pixData, setPixData] = useState({});
  const [saveCard, setSaveCard] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  // Formatação do CPF
  const formatCPF = (value: string) => {
    const v = value.replace(/\D/g, '');
    return v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  // Formatação do telefone
  const formatPhone = (value: string) => {
    const v = value.replace(/\D/g, '');
    return v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  // Validação
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (paymentMethod === 'card') {
      if (!cardData.number || cardData.number.replace(/\s/g, '').length < 13) {
        newErrors.number = 'Número do cartão inválido';
      }
      if (!cardData.holder || cardData.holder.length < 2) {
        newErrors.holder = 'Nome do titular é obrigatório';
      }
      if (!cardData.expiry || cardData.expiry.length < 5) {
        newErrors.expiry = 'Data de validade inválida';
      }
      if (!cardData.cvv || cardData.cvv.length < 3) {
        newErrors.cvv = 'CVV inválido';
      }
    }
    // PIX não precisa de validação - só gera o código

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      // Simular processamento
      await new Promise(resolve => setTimeout(resolve, 2000));

      const paymentData = {
        method: paymentMethod,
        amount: amount || 0,
        data: paymentMethod === 'card' ? cardData : { pixCode: 'PIX_CODE_' + Date.now() },
        saveCard: paymentMethod === 'card' ? saveCard : false,
        timestamp: new Date().toISOString()
      };

      if (onPaymentSubmit) {
        onPaymentSubmit(paymentData);
      } else {
        console.log('Dados do pagamento:', paymentData);
        let message = `Pagamento processado com sucesso!\nMétodo: ${paymentMethod === 'card' ? 'Cartão' : 'PIX'}\nValor: R$ ${(amount || 0).toFixed(2)}`;
        if (paymentMethod === 'card' && saveCard) {
          message += '\nCartão salvo para compras futuras!';
        }
        alert(message);
      }
    } catch (error) {
      console.error('Erro no processamento:', error);
      alert('Erro ao processar pagamento. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCardInputChange = (field: keyof typeof cardData, value: string) => {
    let formattedValue = value;

    if (field === 'number') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'expiry') {
      formattedValue = formatExpiry(value);
    } else if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
    }

    setCardData(prev => ({ ...prev, [field]: formattedValue }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePixInputChange = (field: string, value: string) => {
    // PIX não precisa de inputs - removido
  };

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <div className="bg-slate-800/95 backdrop-blur-md rounded-3xl p-8 border border-slate-700/50 shadow-2xl shadow-black/50">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Finalizar Pagamento</h3>
              <p className="text-sm text-slate-400">Complete sua compra de tempo</p>
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

        {/* Valor */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-slate-400 text-sm">Total a pagar</span>
          <div className="text-xl font-bold text-violet-400">
            R$ {(amount || 0).toFixed(2)}
          </div>
        </div>

        {/* Seletor de Método de Pagamento */}
        <div className="mb-6">
          <label className="block text-slate-300 text-sm font-medium mb-3">
            Método de Pagamento
          </label>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setPaymentMethod('card')}
              className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 ${
                paymentMethod === 'card'
                  ? 'border-violet-500 bg-violet-500/10 text-violet-400'
                  : 'border-slate-700 bg-slate-700/50 text-slate-400 hover:border-slate-600'
              }`}
            >
              <CreditCard className="h-5 w-5" />
              <span className="font-medium">Cartão</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('pix')}
              className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 ${
                paymentMethod === 'pix'
                  ? 'border-violet-500 bg-violet-500/10 text-violet-400'
                  : 'border-slate-700 bg-slate-700/50 text-slate-400 hover:border-slate-600'
              }`}
            >
              <QrCode className="h-5 w-5" />
              <span className="font-medium">PIX</span>
            </button>
          </div>
        </div>

        {/* Formulário */}
        <div className="space-y-4">
          {paymentMethod === 'card' ? (
            <>
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

              {/* Nome do Titular */}
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Nome do Titular
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardData.holder}
                    onChange={(e) => handleCardInputChange('holder', e.target.value.toUpperCase())}
                    placeholder="JOÃO DA SILVA"
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

              {/* Opção de Salvar Cartão */}
              <div className="mt-6 p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={saveCard}
                      onChange={(e) => setSaveCard(e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                      saveCard 
                        ? 'bg-violet-500 border-violet-500' 
                        : 'border-slate-500 group-hover:border-slate-400'
                    }`}>
                      {saveCard && (
                        <CheckCircle className="h-3 w-3 text-white" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-slate-300 text-sm font-medium">
                        Salvar cartão para compras futuras
                      </span>
                      <Shield className="h-4 w-4 text-violet-400" />
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      Seus dados serão criptografados e armazenados com segurança. Você poderá gerenciar seus cartões salvos a qualquer momento.
                    </p>
                  </div>
                </label>
              </div>
            </>
          ) : (
            <>
              {/* Informação PIX */}
              <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
                <div className="flex items-start gap-3">
                  <QrCode className="h-6 w-6 text-violet-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-violet-400 font-medium text-sm mb-2">
                      Pagamento via PIX
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed mb-3">
                      Após confirmar, você receberá um QR Code para efetuar o pagamento instantâneo.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <CheckCircle className="h-4 w-4" />
                      <span>Aprovação automática</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Botões de Ação */}
          <div className="flex gap-3">
            {/* Botão Voltar */}
            <button
              type="button"
              onClick={onBack}
              disabled={isProcessing}
              className="flex-1 py-3 px-4 bg-slate-700 hover:bg-slate-600 active:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-base font-medium transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-slate-500/50 hover:scale-105 active:scale-95"
            >
              Voltar
            </button>

            {/* Botão de Pagamento */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isProcessing}
              className={`flex-[2] py-3 px-6 rounded-xl text-base font-bold transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${
                isProcessing
                  ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                  : 'bg-violet-500 hover:bg-violet-400 active:bg-violet-600 text-white hover:scale-105 active:scale-95'
              }`}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                  Processando...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  {paymentMethod === 'card' ? 'Pagar com Cartão' : 'Gerar PIX'}
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;