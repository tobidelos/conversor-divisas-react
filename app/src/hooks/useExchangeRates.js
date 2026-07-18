import { useState, useEffect, useCallback } from 'react';
import { CURRENCIES, BACKUP_RATES_USD, TYPE_CRYPTO, TYPE_METAL, TYPE_ENERGY } from '../constants';

export function useExchangeRates(fromCurrency, toCurrency) {
  const [exchangeRate, setExchangeRate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [error, setError] = useState(null);

  const fetchAssetFallback = async (missingCode) => {
    const asset = CURRENCIES.find(c => c.code === missingCode);
    if (asset && asset.cryptoId) {
        try {
          const res = await fetch(`https://api.coincap.io/v2/assets/${asset.cryptoId}`);
          if (res.ok) {
            const json = await res.json();
            const price = parseFloat(json.data.priceUsd);
            if (price) return 1 / price;
          }
        } catch (e) { console.warn("CoinCap error", e); }

        try {
           let geckoId = asset.cryptoId;
           if (geckoId === 'binance-coin') geckoId = 'binancecoin'; 
           const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${geckoId}&vs_currencies=usd`);
           if (res.ok) {
               const json = await res.json();
               const price = json[geckoId]?.usd;
               if (price) return 1 / price;
           }
        } catch (e) { console.warn("CoinGecko error", e); }
    }
    if (BACKUP_RATES_USD[missingCode]) {
        console.warn(`Usando valor de respaldo para ${missingCode}`);
        return 1 / BACKUP_RATES_USD[missingCode];
    }
    return null;
  };

  const fetchRates = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      let rates = {};
      let fetchSuccess = false;

      const apiSources = [
        'https://open.er-api.com/v6/latest/USD',
        'https://api.exchangerate-api.com/v4/latest/USD'
      ];

      for (const url of apiSources) {
        try {
          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            rates = data.rates;
            fetchSuccess = true;
            break; 
          }
        } catch (e) { console.warn(`API Error: ${url}`, e); }
      }

      if (!fetchSuccess) {
          rates = { USD: 1 }; 
          setError("Modo offline: Usando estimaciones.");
      }

      let rateFrom = rates[fromCurrency];
      let rateTo = rates[toCurrency];
      const fromAsset = CURRENCIES.find(c => c.code === fromCurrency);
      const toAsset = CURRENCIES.find(c => c.code === toCurrency);

      const needsFallback = (type) => type === TYPE_CRYPTO || type === TYPE_METAL || type === TYPE_ENERGY;

      if (!rateFrom && (needsFallback(fromAsset?.type) || !rateFrom)) {
         const fallbackRate = await fetchAssetFallback(fromCurrency);
         if (fallbackRate) rateFrom = fallbackRate;
      }
      if (!rateTo && (needsFallback(toAsset?.type) || !rateTo)) {
         const fallbackRate = await fetchAssetFallback(toCurrency);
         if (fallbackRate) rateTo = fallbackRate;
      }

      if (!rateFrom || !rateTo) {
          const backupFrom = BACKUP_RATES_USD[fromCurrency] ? (1/BACKUP_RATES_USD[fromCurrency]) : null;
          const backupTo = BACKUP_RATES_USD[toCurrency] ? (1/BACKUP_RATES_USD[toCurrency]) : null;
          
          if (!rateFrom && fromCurrency === 'USD') rateFrom = 1;
          if (!rateTo && toCurrency === 'USD') rateTo = 1;

          if (!rateFrom && backupFrom) rateFrom = backupFrom;
          if (!rateTo && backupTo) rateTo = backupTo;
      }

      if (!rateFrom || !rateTo) {
          throw new Error(`Cotización no disponible: ${!rateFrom ? fromCurrency : toCurrency}`);
      }

      const calculatedRate = rateTo / rateFrom;
      setExchangeRate(calculatedRate);
      setLastUpdated(new Date());

    } catch (err) {
      console.error(err);
      setError('Error de conexión. Reintentando...');
    } finally {
      setIsLoading(false);
    }
  }, [fromCurrency, toCurrency]);

  useEffect(() => { fetchRates(); }, [fetchRates]);
  useEffect(() => { 
    const interval = setInterval(fetchRates, 60000); 
    return () => clearInterval(interval);
  }, [fetchRates]);

  return { exchangeRate, isLoading, lastUpdated, error, fetchRates };
}
