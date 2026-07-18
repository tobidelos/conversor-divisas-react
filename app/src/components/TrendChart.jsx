import React, { useMemo } from 'react';
import { AreaChart, Area, ResponsiveContainer, YAxis, Tooltip } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const val = payload[0].value;
    return (
      <div className="p-3 border shadow-xl bg-slate-900/80 backdrop-blur-md border-white/10 rounded-xl">
        <p className="mb-1 text-xs font-semibold text-slate-400">{payload[0].payload.time}</p>
        <p className="text-sm font-bold text-white">
          {val > 10 ? val.toFixed(2) : val.toFixed(6)}
        </p>
      </div>
    );
  }
  return null;
};

export const TrendChart = ({ currentRate, fromCurrency, toCurrency }) => {
  // Generamos una curva ficticia pero realista basada en el currentRate para el WOW factor del portfolio.
  // En un entorno de producción real, esto se obtendría de un endpoint histórico.
  const data = useMemo(() => {
    if (!currentRate) return [];
    const points = 24; // Últimas 24 horas/puntos
    const base = currentRate;
    const volatility = 0.02; // 2% volatilidad
    
    let current = base * (1 - volatility); 
    const result = [];
    const now = new Date();
    
    for (let i = 0; i < points; i++) {
      const pointTime = new Date(now.getTime() - (points - 1 - i) * 60 * 60 * 1000); // 1 hora de diferencia por punto
      const timeString = pointTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

      if (i === points - 1) {
        result.push({ time: timeString, value: base });
      } else {
        const change = (Math.random() - 0.45) * volatility * base;
        current += change;
        result.push({ time: timeString, value: current });
      }
    }
    return result;
  }, [currentRate, fromCurrency, toCurrency]);

  if (!currentRate) return <div className="w-full h-12"></div>;

  const isUp = data.length > 0 && data[data.length - 1].value >= data[0].value;
  const color = isUp ? '#10b981' : '#ef4444'; // Emerald for up, Red for down

  return (
    <div className="w-full h-24 mt-2 opacity-80 hover:opacity-100 transition-opacity">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <YAxis hide domain={['dataMin', 'dataMax']} />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.2)', strokeWidth: 1, strokeDasharray: '4 4' }} />
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.4}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke={color} 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorValue)" 
            isAnimationActive={true}
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
