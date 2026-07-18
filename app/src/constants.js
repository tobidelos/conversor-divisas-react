export const TYPE_FIAT = 'fiat';
export const TYPE_CRYPTO = 'crypto';
export const TYPE_METAL = 'metal';
export const TYPE_ENERGY = 'energy';

export const CURRENCIES = [
  { code: 'USD', name: 'Dólar Estadounidense', country: 'US', symbol: '$', type: TYPE_FIAT },
  { code: 'EUR', name: 'Euro', country: 'EU', symbol: '€', type: TYPE_FIAT },
  { code: 'GBP', name: 'Libra Esterlina', country: 'GB', symbol: '£', type: TYPE_FIAT },
  { code: 'JPY', name: 'Yen Japonés', country: 'JP', symbol: '¥', type: TYPE_FIAT },
  { code: 'ARS', name: 'Peso Argentino', country: 'AR', symbol: '$', type: TYPE_FIAT },
  { code: 'BRL', name: 'Real Brasileño', country: 'BR', symbol: 'R$', type: TYPE_FIAT },
  { code: 'MXN', name: 'Peso Mexicano', country: 'MX', symbol: '$', type: TYPE_FIAT },
  { code: 'CLP', name: 'Peso Chileno', country: 'CL', symbol: '$', type: TYPE_FIAT },
  { code: 'COP', name: 'Peso Colombiano', country: 'CO', symbol: '$', type: TYPE_FIAT },
  { code: 'PEN', name: 'Sol Peruano', country: 'PE', symbol: 'S/', type: TYPE_FIAT },
  { code: 'UYU', name: 'Peso Uruguayo', country: 'UY', symbol: '$', type: TYPE_FIAT },
  { code: 'BOB', name: 'Boliviano', country: 'BO', symbol: 'Bs', type: TYPE_FIAT },
  { code: 'PYG', name: 'Guaraní Paraguayo', country: 'PY', symbol: '₲', type: TYPE_FIAT },
  { code: 'VES', name: 'Bolívar Venezolano', country: 'VE', symbol: 'Bs', type: TYPE_FIAT },
  { code: 'CAD', name: 'Dólar Canadiense', country: 'CA', symbol: 'C$', type: TYPE_FIAT },
  { code: 'AUD', name: 'Dólar Australiano', country: 'AU', symbol: 'A$', type: TYPE_FIAT },
  { code: 'CHF', name: 'Franco Suizo', country: 'CH', symbol: 'Fr', type: TYPE_FIAT },
  { code: 'CNY', name: 'Yuan Chino', country: 'CN', symbol: '¥', type: TYPE_FIAT },
  { code: 'RUB', name: 'Rublo Ruso', country: 'RU', symbol: '₽', type: TYPE_FIAT },
  { code: 'INR', name: 'Rupia India', country: 'IN', symbol: '₹', type: TYPE_FIAT },
  { code: 'KRW', name: 'Won Surcoreano', country: 'KR', symbol: '₩', type: TYPE_FIAT },
  { code: 'TRY', name: 'Lira Turca', country: 'TR', symbol: '₺', type: TYPE_FIAT },
  { code: 'ZAR', name: 'Rand Sudafricano', country: 'ZA', symbol: 'R', type: TYPE_FIAT },
  { code: 'NZD', name: 'Dólar Neozelandés', country: 'NZ', symbol: '$', type: TYPE_FIAT },
  { code: 'SGD', name: 'Dólar Singapur', country: 'SG', symbol: '$', type: TYPE_FIAT },

  { code: 'XAU', name: 'Oro (Onza troy)', symbol: 'Au', type: TYPE_METAL, cryptoId: 'pax-gold' }, 
  { code: 'XAG', name: 'Plata (Onza troy)', symbol: 'Ag', type: TYPE_METAL, cryptoId: 'kinesis-silver' }, 
  { code: 'XPT', name: 'Platino (Onza troy)', symbol: 'Pt', type: TYPE_METAL }, 
  { code: 'WTI', name: 'Petróleo WTI', symbol: 'Oil', type: TYPE_ENERGY, cryptoId: 'wti-usd' }, 
  { code: 'BRENT', name: 'Petróleo Brent', symbol: 'Oil', type: TYPE_ENERGY },
  
  { code: 'BTC', name: 'Bitcoin', symbol: '₿', type: TYPE_CRYPTO, cryptoId: 'bitcoin' },
  { code: 'ETH', name: 'Ethereum', symbol: 'Ξ', type: TYPE_CRYPTO, cryptoId: 'ethereum' },
  { code: 'USDT', name: 'Tether', symbol: '₮', type: TYPE_CRYPTO, cryptoId: 'tether' },
  { code: 'BNB', name: 'Binance Coin', symbol: 'Bn', type: TYPE_CRYPTO, cryptoId: 'binance-coin' },
  { code: 'SOL', name: 'Solana', symbol: '◎', type: TYPE_CRYPTO, cryptoId: 'solana' },
];

export const BACKUP_RATES_USD = {
  XAU: 2350.50, XAG: 28.20, XPT: 980.00, WTI: 78.50, BRENT: 82.30, BTC: 65000.00, ETH: 3500.00
};
