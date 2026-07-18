import React from 'react';
import { ShieldCheck, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const TransparencyModal = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
      >
        <motion.div 
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
          className="bg-white/80 backdrop-blur-xl border border-white/50 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          <div className="flex items-center justify-between p-5 text-indigo-900 border-b border-white/40 bg-white/40">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <ShieldCheck size={22} className="text-indigo-600" /> Transparencia de Datos
            </h2>
            <button onClick={onClose} className="p-2 transition-colors rounded-full hover:bg-black/5">
              <X size={20} />
            </button>
          </div>
          <div className="p-6 space-y-4 overflow-y-auto text-slate-700">
            <p className="text-lg font-medium text-slate-900">¿De dónde vienen nuestros datos?</p>
            <p>Para garantizar precisión y transparencia, utilizamos un sistema de agregación de múltiples fuentes:</p>
            
            <ul className="pl-5 space-y-2 list-disc marker:text-indigo-400">
              <li><strong>Divisas (Fiat):</strong> Obtenidas a través de APIs públicas, actualizadas en tiempo real con referencia a mercados globales.</li>
              <li><strong>Criptomonedas:</strong> Precios promedio ponderados de múltiples oráculos para asegurar que no dependemos de un solo exchange.</li>
              <li><strong>Materias Primas:</strong> El Oro, Plata y Petróleo se calculan utilizando índices de tokens respaldados por activos.</li>
            </ul>

            <div className="p-5 mt-6 border shadow-inner bg-indigo-50/50 border-indigo-100/50 rounded-2xl backdrop-blur-sm">
              <p className="mb-2 font-semibold text-indigo-900">¿Por qué es importante?</p>
              <p className="text-sm leading-relaxed text-indigo-800/80">
                La transparencia ayuda a un correcto funcionamiento del mercado al permitir que los usuarios verifiquen que las tasas de cambio son justas y no incluyen márgenes ocultos excesivos. Nuestro código es abierto y las fuentes son verificables.
              </p>
            </div>
          </div>
          <div className="p-5 text-center border-t border-white/40 bg-white/40">
            <button onClick={onClose} className="px-8 py-2.5 font-bold text-white transition-all shadow-md bg-indigo-600 rounded-xl hover:bg-indigo-700 hover:shadow-lg active:scale-95">
              Entendido
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
