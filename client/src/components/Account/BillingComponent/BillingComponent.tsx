import React, { useState } from 'react';
import { 
  Receipt,
  ChevronRight,
  Check,
  Clock,
  X
} from 'lucide-react';

interface Transaction {
  id: string;
  amount: number;
  timeAmount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  paymentMethod: string;
  description: string;
}

interface BillingComponentProps {
  transactions?: Transaction[];
  showCollapsed?: boolean;
}

const BillingComponent: React.FC<BillingComponentProps> = ({ 
  transactions = [],
  showCollapsed = true 
}) => {
  const [showBilling, setShowBilling] = useState(!showCollapsed);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed':
        return 'bg-green-500/20 text-green-300 border-green-400/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30';
      case 'failed':
        return 'bg-red-500/20 text-red-300 border-red-400/30';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-400/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'completed':
        return <Check className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'failed':
        return <X className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'completed':
        return 'Concluído';
      case 'pending':
        return 'Pendente';
      case 'failed':
        return 'Falhou';
      default:
        return 'Desconhecido';
    }
  };

  return (
    <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-600/30 mb-6">
      {showCollapsed ? (
        <div 
          className="flex items-center justify-between p-4 cursor-pointer"
          onClick={() => setShowBilling(!showBilling)}
        >
          <div className="flex items-center space-x-3">
            <Receipt className="w-5 h-5 text-violet-400" />
            <h3 className="text-lg font-semibold text-white">Faturamento</h3>
            <span className="px-2 py-1 bg-violet-500/20 text-violet-300 rounded-full text-xs font-medium">
              {transactions.length}
            </span>
          </div>
          <ChevronRight className={`w-5 h-5 text-slate-400 transform transition-transform ${showBilling ? 'rotate-90' : ''}`} />
        </div>
      ) : (
        <div className="flex items-center space-x-3 p-4 border-b border-slate-600/30">
          <Receipt className="w-5 h-5 text-violet-400" />
          <h3 className="text-lg font-semibold text-white">Faturamento</h3>
          <span className="px-2 py-1 bg-violet-500/20 text-violet-300 rounded-full text-xs font-medium">
            {transactions.length}
          </span>
        </div>
      )}
      
      {showBilling && (
        <div className="px-4 pb-4 space-y-3">
          {transactions.length === 0 ? (
            <div className="text-center py-8">
              <Receipt className="w-12 h-12 text-slate-500 mx-auto mb-3" />
              <p className="text-slate-400">Nenhuma transação encontrada</p>
            </div>
          ) : (
            transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getStatusColor(transaction.status)}`}>
                    {getStatusIcon(transaction.status)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{transaction.description}</div>
                    <div className="text-xs text-slate-400">{transaction.paymentMethod}</div>
                    <div className="text-xs text-slate-500">{formatDate(transaction.date)}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-white">{formatCurrency(transaction.amount)}</div>
                  <div className="text-xs text-violet-400">{transaction.timeAmount} min</div>
                  <div className={`text-xs px-2 py-1 rounded-full ${getStatusColor(transaction.status)}`}>
                    {getStatusText(transaction.status)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default BillingComponent;