"use client";

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Substrate interruption:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="phantom-glass p-12 rounded-2xl satin-border shadow-2xl space-y-6"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#ea580c]/10 border border-[#ea580c]/20 mb-4 shadow-[0_0_30px_rgba(234,88,12,0.2)]">
            <Zap className="w-10 h-10 text-[#ea580c] animate-pulse" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-white uppercase tracking-widest">Substrate Interruption</h1>
            <p className="text-[#8b949e] font-mono text-xs leading-relaxed uppercase tracking-tighter">
              A high-level neural fault has occurred. Telemetry dump initialized.
            </p>
            <div className="bg-black/40 border border-white/5 p-3 rounded font-mono text-[10px] text-[#ff7b72] break-all">
              {error.message || 'Unknown substrate error'}
            </div>
          </div>

          <button 
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#ea580c] text-white rounded-lg font-bold text-sm hover:bg-[#ff7a2d] transition-all shadow-[0_0_20px_rgba(234,88,12,0.4)]"
          >
            <RefreshCw className="w-4 h-4" /> Re-initialize Substrate
          </button>
        </motion.div>
      </div>
    </div>
  );
}
