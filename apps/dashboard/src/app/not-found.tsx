"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center p-6 bg-[radial-gradient(circle_at_center,_rgba(234,88,12,0.05)_0%,_transparent_70%)]">
      <div className="max-w-md w-full text-center space-y-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="phantom-glass p-12 rounded-2xl satin-border shadow-2xl space-y-6"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#ff7b72]/10 border border-[#ff7b72]/20 mb-4 shadow-[0_0_30px_rgba(255,123,114,0.2)]">
            <ShieldAlert className="w-10 h-10 text-[#ff7b72]" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-white uppercase tracking-widest">Substrate Anomaly 404</h1>
            <p className="text-[#8b949e] font-mono text-sm leading-relaxed uppercase tracking-tighter">
              The requested coordinates do not exist within the current Ethereal Substrate.
            </p>
          </div>

          <Link 
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg font-bold text-sm hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            <ArrowLeft className="w-4 h-4" /> Re-sync to Command Center
          </Link>
        </motion.div>
        
        <div className="text-[10px] font-bold font-mono text-[#5c646c] uppercase tracking-[0.3em]">
          Phantom AI // Synthetic Reality Engine
        </div>
      </div>
    </div>
  );
}
