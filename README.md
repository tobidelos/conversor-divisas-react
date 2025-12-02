# 💱 Conversor de Divisas 

Una aplicación web moderna y reactiva para la conversión de divisas, criptomonedas y materias primas en tiempo real. Diseñada con un enfoque en la experiencia de usuario (UX), precisión de datos y transparencia.

## 🚀 Características Principales

**Multi-Activos**: Soporte para más de 20 divisas fiat (USD, EUR, ARS, etc.), principales criptomonedas (BTC, ETH, SOL) y materias primas (Oro, Plata, Petróleo WTI/Brent).

**Actualizaciones en Tiempo Real**: Sistema de polling automático que actualiza las tasas cada 60 segundos.

**Arquitectura de Redundancia Híbrida**: Sistema robusto que consulta múltiples APIs (ExchangeRate-API, CoinCap, Binance, CoinGecko) en cascada para garantizar que el servicio nunca se detenga, incluso si una fuente falla.

**Diseño Adaptativo (Responsive)**: Interfaz limpia y simétrica construida con Tailwind CSS, optimizada para móviles y escritorio.

**Transparencia**: Modal integrado que explica detalladamente las fuentes de datos utilizadas.

**Localización**: Detección automática de la zona horaria del usuario para mostrar la hora de última actualización correcta.

## 🛠️ Tecnologías Utilizadas

**Frontend**: React.js (Hooks: useState, useEffect, useCallback)

**Estilos**: Tailwind CSS (Diseño utility-first)

**Iconografía**: Lucide React

**APIs**: Integración asíncrona con múltiples endpoints financieros públicos.

### 📦 Instalación y Uso

**1. Clonar el repositorio**:

```git clone https://github.com/tobidelos/conversor-divisas-react```

```cd conversor-divisas-react```


**2. Instalar dependencias**:

```npm install```


**3. Iniciar servidor de desarrollo**:

```npm run dev```


**4. Abrir en el navegador (usualmente ```http://localhost:5173```).**

#### 🤝 Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir lo que te gustaría cambiar.

<p class="text-xs text-slate-500 font-medium">
  Desarrollado por <a href="https://github.com/tobidelos" target="_blank" rel="noopener noreferrer" class="text-indigo-500 hover:text-indigo-700 underline font-bold">ttobidelos</a>
</p>
