"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, RefreshCw, Copy, Check } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [traceId, setTraceId] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // In a real substrate, we'd pull the trace ID from the last failed request or cookie
    const lastTrace = localStorage.getItem('phantom_last_trace') || 
                      `PHNTM-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    setTraceId(lastTrace);
    console.error('Substrate interruption:', error, { traceId: lastTrace });
  }, [error]);

  const copyTrace = () => {
    navigator.clipboard.writeText(traceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center p-6 font-mono">
      <div className="max-w-md w-full text-center space-y-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="phantom-glass p-12 rounded-2xl satin-border shadow-2xl space-y-8 border-[#ea580c]/10"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#ea580c]/10 border border-[#ea580c]/20 mb-2 shadow-[0_0_40px_rgba(234,88,12,0.1)]">
            <Zap className="w-10 h-10 text-[#ea580c] animate-pulse" />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-xl font-bold tracking-tighter text-white uppercase">Neural Vault Interruption</h1>
            
            <div className="bg-black/60 border border-white/5 p-4 rounded-lg text-[10px] text-[#ff7b72] break-all leading-relaxed opacity-80 satin-border">
              {error.message || 'Unknown substrate anomaly detected during seance.'}
            </div>

            <div className="space-y-2">
              <p className="text-[10px] text-[#8b949e] uppercase tracking-widest opacity-60">Forensic Trace ID</p>
              <div 
                onClick={copyTrace}
                className="flex items-center justify-between px-3 py-2 bg-white/5 border border-white/10 rounded cursor-pointer hover:bg-white/10 transition-colors group"
              >
                <span className="text-[10px] text-[#8b949e]">{traceId}</span>
                {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3 text-white/40 group-hover:text-white" />}
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button 
              onClick={() => {
                sessionStorage.clear();
                reset();
              }}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#ea580c] text-white rounded font-bold text-xs uppercase tracking-widest hover:bg-[#ff7a2d] transition-all shadow-[0_10px_30px_rgba(234,88,12,0.2)]"
            >
              <RefreshCw className="w-3 h-3" /> Purge & Re-Initialize
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
