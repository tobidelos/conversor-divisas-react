import React from 'react';
import { CURRENCIES, TYPE_FIAT, TYPE_CRYPTO, TYPE_METAL, TYPE_ENERGY } from '../constants';
import { Coins, Droplet, Hammer } from 'lucide-react';
import { cn } from '../lib/utils';

const GoldBarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 shrink-0">
    <path d="M4 8L7 6H20L17 8H4Z" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 8V16L7 18V8" fill="#FCD34D" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 18H20V8L17 6" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const getCurrencyInfo = (code) => CURRENCIES.find(c => c.code === code) || { code, name: code, symbol: '', type: TYPE_FIAT };

const renderIcon = (info) => {
  if (info.code === 'XAU') return <GoldBarIcon />;
  if (info.type === TYPE_ENERGY) return <Droplet className="w-6 h-6 text-slate-800 fill-slate-800 shrink-0" />;
  if (info.type === TYPE_METAL) return <Hammer className="w-6 h-6 text-slate-500 shrink-0" />;
  
  if (info.type === TYPE_CRYPTO) {
    if (info.code === 'BTC') return <div className="flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-orange-500 rounded-full shrink-0">₿</div>;
    if (info.code === 'ETH') return <div className="flex items-center justify-center w-6 h-6 text-xs font-bold text-white rounded-full bg-slate-700 shrink-0">Ξ</div>;
    if (info.code === 'USDT') return <div className="flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-green-500 rounded-full shrink-0">T</div>;
    return <Coins className="w-6 h-6 text-yellow-500 shrink-0" />;
  }
  return (
    <img 
      src={`https://flagsapi.com/${info.country}/flat/32.png`} 
      alt={info.country}
      className="object-contain w-6 h-6 drop-shadow-sm shrink-0"
    />
  );
};

export const CurrencySelect = ({ value, onChange, className }) => {
  const fiatList = CURRENCIES.filter(c => c.type === TYPE_FIAT);
  const cryptoList = CURRENCIES.filter(c => c.type === TYPE_CRYPTO);
  const metalList = CURRENCIES.filter(c => c.type === TYPE_METAL || c.type === TYPE_ENERGY);
  
  return (
    <select
      value={value}
      onChange={onChange}
      className={cn("w-full h-full py-3 pr-8 pl-11 text-sm font-bold transition-colors border-none outline-none appearance-none cursor-pointer bg-white/40 text-slate-800 hover:bg-white/60 focus:ring-2 focus:ring-indigo-400 rounded-2xl backdrop-blur-md", className)}
    >
      <optgroup label="Divisas">
        {fiatList.map(curr => <option key={curr.code} value={curr.code}>{curr.code} - {curr.name}</option>)}
      </optgroup>
      <optgroup label="Materias Primas">
        {metalList.map(curr => <option key={curr.code} value={curr.code}>{curr.code} - {curr.name}</option>)}
      </optgroup>
      <optgroup label="Criptomonedas">
        {cryptoList.map(curr => <option key={curr.code} value={curr.code}>{curr.code} - {curr.name}</option>)}
      </optgroup>
    </select>
  );
};

const AutoResizeInput = ({ value, onChange, placeholder, className, ...props }) => {
  return (
    <div className={`inline-grid items-center justify-items-start relative ${className}`}>
      <span className="col-start-1 row-start-1 invisible whitespace-pre px-1 opacity-0 pointer-events-none min-w-[60px]">
        {value || placeholder}
      </span>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full h-full col-start-1 row-start-1 p-0 m-0 bg-transparent border-none shadow-none outline-none focus:ring-0 focus:outline-none text-slate-800 placeholder-slate-400/70"
        style={{ boxShadow: 'none' }} 
        {...props}
      />
    </div>
  );
};

export const FormattedPrice = ({ value, currencyCode }) => {
  if (value === '' || isNaN(value)) return <span className="text-xl font-bold text-indigo-900/40 whitespace-nowrap">---</span>;

  const asset = CURRENCIES.find(c => c.code === currencyCode);
  let maxDigits = 2;
  if (asset?.type === TYPE_CRYPTO) maxDigits = 8;
  if (asset?.type === TYPE_METAL || asset?.type === TYPE_ENERGY) maxDigits = 4;

  try {
    const parts = new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: maxDigits
    }).formatToParts(value);

    const currencyPart = parts.find(p => p.type === 'currency')?.value || '';
    const numberParts = parts.filter(p => p.type !== 'currency').map(p => p.value).join('');

    const fontSizeClass = numberParts.length > 12 ? 'text-lg' : 'text-xl md:text-2xl';

    return (
      <div className="flex items-baseline whitespace-nowrap">
        <span className="mr-2 text-sm font-bold select-none text-slate-600/70">
          {currencyPart}
        </span>
        <span className={`${fontSizeClass} font-bold text-slate-800`}>
          {numberParts}
        </span>
      </div>
    );
  } catch (e) {
    return <span>{value}</span>;
  }
};

export const CurrencyField = ({ 
  label, 
  amount, 
  currency, 
  onAmountChange, 
  onCurrencyChange, 
  isReadOnly, 
  isLoading 
}) => {
  const info = getCurrencyInfo(currency);

  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold tracking-wider uppercase text-slate-500/80 drop-shadow-sm">{label}</label>
      <div className="flex flex-col w-full gap-3 md:flex-row"> 
        
        {/* Bloque Input/Result */}
        <div className={cn(
          "relative flex items-center w-full transition-all duration-300 border border-white/40 rounded-2xl md:flex-1 h-14 md:h-16 shadow-inner backdrop-blur-md overflow-hidden",
          isReadOnly ? "bg-white/20" : "bg-white/30 hover:bg-white/40 focus-within:ring-2 focus-within:ring-indigo-400 focus-within:border-transparent"
        )}>
          {isReadOnly ? (
            <div className="flex items-center w-full h-full px-4 overflow-x-auto scrollbar-hide">
              {isLoading ? (
                <div className="w-24 h-6 rounded-md animate-pulse bg-slate-400/20"></div>
              ) : (
                <FormattedPrice value={amount} currencyCode={currency} />
              )}
            </div>
          ) : (
            <>
              <span className="absolute text-sm font-medium -translate-y-1/2 pointer-events-none left-4 top-1/2 text-slate-600/70">
                {info.symbol}
              </span>
              <div className="flex items-center w-full h-full pr-4 overflow-x-auto pl-9 scrollbar-hide">
                 <AutoResizeInput 
                    value={amount}
                    onChange={onAmountChange}
                    placeholder="0.00"
                    className="w-full min-w-0 p-0 m-0 text-xl font-bold bg-transparent border-none shadow-none outline-none focus:ring-0 focus:outline-none md:text-2xl text-slate-800 placeholder-slate-500/50"
                 />
              </div>
            </>
          )}
        </div>

        {/* Bloque Selector */}
        <div className="relative w-full md:w-[280px] h-14 md:h-16 shrink-0 group">
          <CurrencySelect 
            value={currency} 
            onChange={(e) => onCurrencyChange(e.target.value)} 
            className="border border-white/30 shadow-sm group-hover:shadow-md transition-shadow"
          />
          <div className="absolute -translate-y-1/2 pointer-events-none left-3 top-1/2">
              {renderIcon(info)}
          </div>
        </div>

      </div>
      <p className="ml-1 text-sm font-medium text-slate-600/80">{info.name}</p>
    </div>
  );
};
