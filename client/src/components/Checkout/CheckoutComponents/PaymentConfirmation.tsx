import React, { useState, useEffect } from 'react';
import { QrCode, Copy, Clock, CheckCircle, AlertCircle, CreditCard, RefreshCw, X } from 'lucide-react';

interface PaymentConfirmationProps {
  paymentData?: {
    method: 'card' | 'pix';
    amount: number;
    pixCode?: string;
    qrCodeData?: string;
    transactionId?: string;
    timestamp: string;
  };
  onPaymentConfirmed?: () => void;
  onPaymentFailed?: () => void;
  onCancel?: () => void;
  className?: string;
}

const PaymentConfirmation: React.FC<PaymentConfirmationProps> = ({
  paymentData,
  onPaymentConfirmed,
  onPaymentFailed,
  onCancel,
  className = ''
}) => {
  // Dados de teste padrão caso não sejam fornecidos
  const defaultPaymentData = {
    method: 'pix' as const,
    amount: 299.99,
    pixCode: 'PIX_CODE_' + Date.now(),
    transactionId: 'TXN_' + Date.now(),
    timestamp: new Date().toISOString()
  };

  // Usar dados fornecidos ou dados de teste
  const payment = paymentData || defaultPaymentData;

  const [status, setStatus] = useState<'pending' | 'confirmed' | 'failed'>('pending');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutos em segundos
  const [copied, setCopied] = useState(false);

  // Simula o QR Code para PIX (normalmente viria da API)
  const mockQRCode = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    payment.pixCode || 'PIX_CODE_EXAMPLE'
  )}`;

  // Código PIX para cópia
  const pixCopyCode = payment.pixCode || '00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-426614174000520400005303986540510.005802BR5913EMPRESA TESTE6008BRASILIA62070503***63041D3D';

  // Timer para expiração
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setStatus('failed');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simula confirmação de pagamento aleatória (para demonstração)
  useEffect(() => {
    if (status === 'pending') {
      const randomDelay = Math.random() * 20000 + 10000; // 10-30 segundos
      const confirmationTimer = setTimeout(() => {
        if (Math.random() > 0.2) { // 80% chance de sucesso
          setStatus('confirmed');
          onPaymentConfirmed?.();
        } else {
          setStatus('failed');
          onPaymentFailed?.();
        }
      }, randomDelay);

      return () => clearTimeout(confirmationTimer);
    }
  }, [status, onPaymentConfirmed, onPaymentFailed]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopyPix = async () => {
    try {
      await navigator.clipboard.writeText(pixCopyCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return {
          icon: Clock,
          title: 'Aguardando Confirmação',
          subtitle: 'Processando seu pagamento...',
          color: 'text-violet-400',
          bg: 'bg-violet-500/10',
          border: 'border-violet-500/20'
        };
      case 'confirmed':
        return {
          icon: CheckCircle,
          title: 'Pagamento Confirmado',
          subtitle: 'Seu pagamento foi processado com sucesso!',
          color: 'text-green-400',
          bg: 'bg-green-500/10',
          border: 'border-green-500/20'
        };
      case 'failed':
        return {
          icon: AlertCircle,
          title: 'Pagamento Expirado',
          subtitle: 'O tempo limite foi atingido. Tente novamente.',
          color: 'text-red-400',
          bg: 'bg-red-500/10',
          border: 'border-red-500/20'
        };
      default:
        return {
          icon: Clock,
          title: 'Aguardando',
          subtitle: '',
          color: 'text-slate-400',
          bg: 'bg-slate-500/10',
          border: 'border-slate-500/20'
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <div className="bg-slate-800/95 backdrop-blur-md rounded-3xl p-8 border border-slate-700/50 shadow-2xl shadow-black/50">
        
        {/* Header com Status */}
        <div className="mb-6">
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 ${statusConfig.bg} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 ${statusConfig.border} border-2`}>
              <statusConfig.icon className={`h-6 w-6 ${statusConfig.color}`} />
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white mb-2 leading-tight">
                {statusConfig.title}
              </h1>
              <p className="text-slate-400 text-base leading-relaxed">
                {statusConfig.subtitle}
              </p>
            </div>

            {/* Botão de Fechar */}
            <button
              onClick={onCancel}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-xl transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Informações do Pagamento */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {payment.method === 'card' ? (
                <CreditCard className="h-5 w-5 text-violet-400" />
              ) : (
                <QrCode className="h-5 w-5 text-violet-400" />
              )}
              <span className="text-slate-300 text-sm">
                {payment.method === 'card' ? 'Cartão de Crédito' : 'PIX'}
              </span>
            </div>
            <div className="text-xl font-bold text-violet-400">
              R$ {payment.amount.toFixed(2)}
            </div>
          </div>
          
          {payment.transactionId && (
            <p className="text-slate-500 text-xs mt-2">
              ID: {payment.transactionId}
            </p>
          )}
        </div>

        {/* Timer */}
        {status === 'pending' && (
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-slate-400">Tempo restante</span>
              <span className="text-violet-400 font-mono font-bold">
                {formatTime(timeLeft)}
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-violet-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${(timeLeft / 600) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Conteúdo específico do método */}
        {payment.method === 'pix' && status === 'pending' && (
          <div className="space-y-4">
            {/* QR Code */}
            <div className="bg-white p-4 rounded-xl mx-auto w-fit">
              <img 
                src={mockQRCode} 
                alt="QR Code PIX" 
                className="w-40 h-40 mx-auto"
              />
            </div>
            
            {/* Instruções */}
            <div className="text-center">
              <p className="text-slate-300 text-sm mb-4">
                Escaneie o QR Code com seu app bancário ou copie o código PIX
              </p>
            </div>

            {/* Código PIX para cópia */}
            <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm font-medium">
                  Código PIX
                </span>
                <button
                  onClick={handleCopyPix}
                  className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    copied 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-violet-500/20 text-violet-400 border border-violet-500/30 hover:bg-violet-500/30'
                  }`}
                >
                  {copied ? (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copiar
                    </>
                  )}
                </button>
              </div>
              <div className="bg-slate-800 rounded-lg p-3 text-xs text-slate-300 font-mono break-all">
                {pixCopyCode}
              </div>
            </div>
          </div>
        )}

        {/* Cartão - Status de processamento */}
        {payment.method === 'card' && status === 'pending' && (
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-slate-700 border-t-violet-500 rounded-full animate-spin"></div>
                <CreditCard className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-violet-400" />
              </div>
              <div className="text-center">
                <p className="text-slate-300 text-sm mb-2">
                  Processando pagamento...
                </p>
                <p className="text-slate-500 text-xs">
                  Aguarde enquanto confirmamos com a operadora
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Status Final */}
        {status === 'confirmed' && (
          <div className="bg-green-900/30 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
              <div className="text-center">
                <p className="text-green-400 font-medium mb-1">
                  Pagamento Confirmado!
                </p>
                <p className="text-slate-400 text-sm">
                  Obrigado pela sua compra
                </p>
              </div>
            </div>
          </div>
        )}

        {status === 'failed' && (
          <div className="bg-red-900/30 backdrop-blur-sm rounded-xl p-6 border border-red-500/30">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                <AlertCircle className="h-8 w-8 text-red-400" />
              </div>
              <div className="text-center">
                <p className="text-red-400 font-medium mb-1">
                  Pagamento Expirado
                </p>
                <p className="text-slate-400 text-sm">
                  Tente novamente ou escolha outro método
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Botões de Ação */}
        <div className="mt-6 space-y-3">
          {status === 'pending' && (
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 px-6 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="h-5 w-5" />
              Verificar Status
            </button>
          )}
          
          {status === 'failed' && (
            <button
              onClick={onCancel}
              className="w-full py-3 px-6 bg-violet-500 hover:bg-violet-400 text-white rounded-xl transition-colors"
            >
              Tentar Novamente
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;