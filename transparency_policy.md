# Política de Transparencia y Fuentes de Datos

## **1. Introducción**

En Conversión de Divisas Pro, creemos que la precisión financiera comienza con la transparencia. Este documento detalla cómo obtenemos, procesamos y presentamos la información de tipos de cambio y precios de activos.

## **2. Nuestras Fuentes de Datos**

Para garantizar la máxima disponibilidad y precisión, utilizamos un sistema de "arquitectura de redundancia múltiple". Esto significa que no dependemos de una sola fuente.

### *A. Divisas Fiduciarias (Fiat)*

Los tipos de cambio para monedas nacionales (USD, EUR, ARS, etc.) se obtienen principalmente de:

***ExchangeRate-API***: Proveedor líder de datos de divisas en tiempo real.

***Open Exchange Rates***: Utilizado como respaldo para validación cruzada.

### *B. Criptomonedas*

Los precios de activos digitales se obtienen mediante un sistema de cascada:

***CoinCap API***: Fuente primaria para precios de mercado en tiempo real.

***Binance API***: Utilizada por su alta liquidez y precisión en pares USDT.

***CoinGecko***: Fuente de respaldo final para activos de menor capitalización.

### *C. Materias Primas (Commodities)*

Para el Oro, Plata, Petróleo y otros metales, utilizamos "Tokens de Activos" o índices de referencia digitalizados que rastrean el precio del activo físico en tiempo real (ej: PAX Gold para el oro, WTI Crude Oil tokens para el petróleo).

## **3. Frecuencia de Actualización**

***Intervalo***: Los datos se refrescan automáticamente cada 60 segundos.

***Zona Horaria*** : Todas las actualizaciones se muestran en la hora local del usuario para evitar confusiones.

## **4. Descargo de Responsabilidad**

Aunque nos esforzamos por garantizar la precisión, los mercados financieros son volátiles. Los datos presentados son para fines informativos y no deben constituir la única base para decisiones financieras de alto riesgo.

<p class="text-xs font-medium text-slate-500">
  Desarrollado por <a href="https://github.com/tobidelos" target="_blank" rel="noopener noreferrer" class="font-bold text-indigo-500 underline hover:text-indigo-700">ttobidelos</a>
</p>
