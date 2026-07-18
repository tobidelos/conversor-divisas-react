import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, RefreshCw, Globe, ShieldCheck, Clock, Info, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

import { useExchangeRates } from './hooks/useExchangeRates';
import { CurrencyField } from './components/CurrencyField';
import { TransparencyModal } from './components/TransparencyModal';
import { TrendChart } from './components/TrendChart';

export default function App() {
  const [amount, setAmount] = useState('1'); 
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR'); // Change default to EUR for variety
  const [showModal, setShowModal] = useState(false);
  
  const { exchangeRate, isLoading, lastUpdated, error, fetchRates } = useExchangeRates(fromCurrency, toCurrency);

  useEffect(() => {
    document.title = "Conversor de divisas";
  }, []);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) setAmount(value);
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const numericAmount = parseFloat(amount);
  const resultValue = (amount === '' || isNaN(numericAmount) || !exchangeRate) 
    ? '' 
    : numericAmount * exchangeRate;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 font-sans antialiased text-white glass-bg md:p-8">
      <TransparencyModal isOpen={showModal} onClose={() => setShowModal(false)} />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl"
      >
        {/* Header Premium */}
        <div className="relative p-8 overflow-hidden bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border-b border-white/10">
          <div className="absolute top-0 right-0 p-4 opacity-20 mix-blend-overlay pointer-events-none">
             <Activity size={160} strokeWidth={1} />
          </div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative z-10"
          >
            <h1 className="flex items-center gap-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-md">
              <div className="p-2 bg-indigo-500 rounded-xl shadow-lg shadow-indigo-500/30">
                <Globe className="w-6 h-6 text-white" />
              </div>
              Conversor de divisas
            </h1>
            <p className="mt-2 text-sm font-medium text-indigo-200/80">Tasas de mercado en tiempo real</p>
          </motion.div>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          
          {/* Input From */}
          <CurrencyField 
            label="Monto a convertir"
            amount={amount}
            currency={fromCurrency}
            onAmountChange={handleAmountChange}
            onCurrencyChange={setFromCurrency}
            isReadOnly={false}
          />

          {/* Swap Button */}
          <div className="relative z-20 flex justify-center -my-5">
            <motion.button 
              initial={{ rotate: 90 }}
              whileHover={{ scale: 1.1, rotate: 270 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSwap}
              className="p-3 text-white transition-shadow bg-indigo-600 rounded-full shadow-xl shadow-indigo-900/50 hover:bg-indigo-500 border-2 border-indigo-400/30 backdrop-blur-md"
              title="Invertir monedas"
            >
              <ArrowRightLeft size={20} />
            </motion.button>
          </div>

          {/* Result To */}
          <CurrencyField 
            label="Resultado estimado"
            amount={resultValue}
            currency={toCurrency}
            onCurrencyChange={setToCurrency}
            isReadOnly={true}
            isLoading={isLoading}
          />

          {/* Trend Chart (Visual Wow Factor) */}
          <motion.div 
             initial={{ opacity: 0 }} 
             animate={{ opacity: 1 }} 
             transition={{ delay: 0.4 }}
             className="pt-4"
          >
             <div className="flex items-center justify-between px-1 mb-2">
               <span className="text-xs font-semibold tracking-wider uppercase text-slate-400/80 drop-shadow-sm">
                 Tendencia (Últimas 24h)
               </span>
               <span className="text-[10px] font-medium tracking-wide uppercase text-slate-500/50">
                 Simulado
               </span>
             </div>
             <TrendChart currentRate={exchangeRate} fromCurrency={fromCurrency} toCurrency={toCurrency} />
          </motion.div>

          {/* Info Card Glass */}
          <div className="p-5 border bg-white/5 border-white/10 rounded-2xl backdrop-blur-sm shadow-inner">
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <span className="text-xs font-semibold uppercase text-slate-300/80 tracking-wider">Tasa de cambio</span>
              {exchangeRate && (
                <span className="px-3 py-1.5 text-sm font-bold bg-indigo-500/20 border border-indigo-400/30 rounded-lg shadow-sm text-indigo-100 whitespace-nowrap">
                  1 {fromCurrency} = {exchangeRate > 1 ? exchangeRate.toFixed(4) : exchangeRate.toFixed(8)} {toCurrency}
                </span>
              )}
            </div>
            
            <div className="flex flex-col items-start justify-between gap-4 pt-5 mt-5 border-t border-white/10 sm:flex-row sm:items-end">
               <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                 <Clock size={14} className="text-indigo-400" />
                 <span>
                    Actualizado: {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                 </span>
               </div>
               <button 
                 onClick={fetchRates}
                 disabled={isLoading}
                 className={`flex items-center gap-2 text-xs font-bold text-white bg-white/10 border border-white/20 px-4 py-2 rounded-xl hover:bg-white/20 transition-all ${isLoading ? 'opacity-50 cursor-not-allowed' : ''} w-full sm:w-auto justify-center`}
               >
                 <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
                 {isLoading ? 'Actualizando...' : 'Refrescar'}
               </button>
            </div>
          </div>
          
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex items-start gap-3 p-4 text-sm border bg-red-500/20 border-red-500/30 text-red-200 rounded-xl backdrop-blur-md"
            >
              <Info size={18} className="mt-0.5 shrink-0 text-red-400" />
              {error}
            </motion.div>
          )}

        </div>
        
        {/* Footer */}
        <div className="p-6 text-center border-t bg-white/5 border-white/10 backdrop-blur-md">
            <button 
              onClick={() => setShowModal(true)}
              className="flex items-center justify-center gap-2 mx-auto mb-4 text-sm font-bold text-indigo-300 transition-all hover:text-indigo-200 group"
            >
                <ShieldCheck size={18} className="group-hover:scale-110 transition-transform" />
                <span className="border-b border-indigo-400/30 group-hover:border-indigo-300 pb-0.5">Transparencia de Datos</span>
            </button>
            
            <p className="text-xs font-medium text-slate-400/70">
              Desarrollado por <a href="https://github.com/tobidelos" target="_blank" rel="noopener noreferrer" className="font-bold text-indigo-400 hover:text-indigo-300 transition-colors">ttobidelos</a>
            </p>
        </div>
      </motion.div>
    </div>
  );
}
