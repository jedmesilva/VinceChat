import React from 'react';
import { ChevronRight } from 'lucide-react';

const Footer = () => {
  const handleViewItemsClick = () => {
    alert('Ver itens');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 w-full max-w-none">
      {/* Ver itens button */}
      <div className="px-4 py-3 bg-slate-800 w-full">
        <button 
          onClick={handleViewItemsClick}
          className="w-full max-w-none flex items-center justify-center space-x-2 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl border border-slate-600 transition-all duration-200"
        >
          <span className="text-base font-medium text-white">Ver itens</span>
          <ChevronRight className="w-5 h-5 text-slate-400" />
        </button>
      </div>
    </div>
  );
};

export default Footer;