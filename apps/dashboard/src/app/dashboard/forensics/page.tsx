"use client";

import React, { useState } from 'react';
import { 
  Layers, 
  Terminal, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Ghost, 
  Copy, 
  CheckCircle2, 
  AlertTriangle,
  ArrowUpRight,
  Fingerprint
} from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * ForensicDashboard
 * 
 * The command center for Phase 3 Reliability Substrate.
 * Orchestrates HFS telemetry, M2M keys, and live HUD instrumentation.
 */
export default function ForensicDashboard() {
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const M2M_KEY = "phm_forensic_7af2b9c1";
  const GHOST_SNIPPET = `fetch('https://tryphantom.dev/scripts/ghost-inspector.js').then(r=>r.text()).then(eval)`;

  const copyToClipboard = (text: string, setter: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  const seanceHistory = [
    { id: "ens-a7b8c2d100", target: "checkout.stripe.com", hfs: 98.4, status: "stable", time: "2h ago" },
    { id: "ens-f1e9b2c3a4", target: "vercel.com/dashboard", hfs: 95.1, status: "optimizing", time: "5h ago" },
    { id: "ens-d8e2f1c0b9", target: "linear.app/inbox", hfs: 92.8, status: "stable", time: "12h ago" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-widest mb-4">
             Substrate Phase 3
          </div>
          <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">Forensic Diagnostics</h1>
          <p className="text-[#8b949e] mt-2">Observing the ethereal substrate of human interaction across your stack.</p>
        </div>
        <div className="flex gap-4">
           <div className="text-right">
              <div className="text-[10px] font-bold text-[#484f58] uppercase tracking-widest mb-1">Global Health</div>
              <div className="flex items-center gap-2 text-green-500 font-mono text-xs">
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                 IMMORTAL_SUBSTRATE_UP
              </div>
           </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-2xl bg-[#111114] border border-[#2d2d30] shadow-xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <ShieldCheck className="w-16 h-16 text-primary" />
           </div>
           <div className="text-xs font-bold text-[#484f58] uppercase tracking-widest mb-6 flex items-center gap-2">
              <Fingerprint className="w-3.5 h-3.5 text-primary" /> Mean HFS Velocity
           </div>
           <div className="text-5xl font-black text-white italic tracking-tighter mb-2">92.4 <span className="text-xs text-[#3fb950] not-italic ml-2">+4.2%</span></div>
           <div className="text-[10px] text-[#8b949e] font-mono">Last 72 hours / 500k interactions</div>
        </div>

        <div className="p-8 rounded-2xl bg-[#111114] border border-[#2d2d30] shadow-xl relative overflow-hidden group border-l-primary/50 border-l-4">
           <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Ghost className="w-16 h-16 text-primary" />
           </div>
           <div className="text-xs font-bold text-[#484f58] uppercase tracking-widest mb-6">Active Ghost Ensembles</div>
           <div className="text-5xl font-black text-white italic tracking-tighter mb-2">12 <span className="text-xs text-primary not-italic ml-2">LIVE</span></div>
           <div className="text-[10px] text-[#8b949e] font-mono">Headless CI/CD nodes currently surveying</div>
        </div>

        <div className="p-8 rounded-2xl bg-[#111114] border border-[#2d2d30] shadow-xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <AlertTriangle className="w-16 h-16 text-red-500" />
           </div>
           <div className="text-xs font-bold text-[#484f58] uppercase tracking-widest mb-6">Friction Alerts</div>
           <div className="text-5xl font-black text-white italic tracking-tighter mb-2">0 <span className="text-xs text-[#8b949e] not-italic ml-2">NOMINAL</span></div>
           <div className="text-[10px] text-[#8b949e] font-mono">No intent-fractures detected in last 24h</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         {/* Séance List */}
         <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
               <h2 className="text-lg font-bold text-white uppercase tracking-widest flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-primary" /> Recent Ensembles
               </h2>
               <button className="text-[10px] font-bold text-[#484f58] hover:text-white transition-colors uppercase tracking-widest">Clear Logs</button>
            </div>
            
            <div className="rounded-2xl bg-[#111114] border border-[#2d2d30] overflow-hidden shadow-2xl">
               <table className="w-full text-left">
                  <thead>
                     <tr className="bg-[#0a0a0c] text-[10px] font-bold text-[#484f58] uppercase tracking-[0.2em] border-b border-[#2d2d30]">
                        <th className="px-6 py-4">Forensic ID</th>
                        <th className="px-6 py-4">Target Substrate</th>
                        <th className="px-6 py-4 text-center">HFS Score</th>
                        <th className="px-6 py-4">Status</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2d2d30]">
                     {seanceHistory.map(row => (
                        <tr key={row.id} className="group hover:bg-white/[0.02] transition-colors cursor-crosshair">
                           <td className="px-6 py-5 font-mono text-[11px] text-primary">{row.id}</td>
                           <td className="px-6 py-5">
                              <div className="text-sm font-bold text-white">{row.target}</div>
                              <div className="text-[10px] text-[#484f58] mt-1 uppercase tracking-widest">{row.time}</div>
                           </td>
                           <td className="px-6 py-5 text-center">
                              <div className="text-xl font-black italic text-white group-hover:text-primary transition-colors">{row.hfs}</div>
                           </td>
                           <td className="px-6 py-5">
                              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#8b949e]">
                                 <div className="w-1.5 h-1.5 rounded-full bg-[#3fb950]" /> {row.status}
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>

         {/* Settings & Keys */}
         <div className="space-y-10">
            <div className="space-y-6">
               <h2 className="text-lg font-bold text-white uppercase tracking-widest flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary" /> M2M Authorization
               </h2>
               <div className="p-8 rounded-2xl bg-[#111114] border border-[#2d2d30] shadow-xl flex flex-col gap-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent" />
                  <p className="text-xs text-[#8b949e] leading-relaxed">
                     Developer access key for the **Ghost Ensemble API**. Required for CI/CD behavior validation.
                  </p>
                  <div className="p-4 bg-[#0a0a0c] border border-[#2d2d30] rounded-xl flex items-center justify-between group">
                     <code className="text-[12px] font-mono text-primary font-bold tracking-wider">{M2M_KEY}</code>
                     <button 
                       onClick={() => copyToClipboard(M2M_KEY, setCopiedKey)}
                       className="p-1.5 hover:bg-[#111114] rounded transition-colors text-[#8b949e] hover:text-white"
                     >
                        {copiedKey ? <CheckCircle2 className="w-4 h-4 text-[#3fb950]" /> : <Copy className="w-4 h-4" />}
                     </button>
                  </div>
                  <button className="text-[10px] font-black text-[#484f58] hover:text-primary transition-colors uppercase tracking-widest text-center mt-2 group flex items-center justify-center gap-2">
                     Rotatate Substrate Key <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
               </div>
            </div>

            <div className="space-y-6">
               <h2 className="text-lg font-bold text-white uppercase tracking-widest flex items-center gap-2">
                  <Ghost className="w-4 h-4 text-primary" /> Ghost Inspector
               </h2>
               <div className="p-8 rounded-2xl bg-gradient-to-br from-[#161b22] to-[#0d1114] border border-primary/20 shadow-xl space-y-6">
                  <p className="text-xs text-[#8b949e] leading-relaxed">
                     Inject a forensic HUD directly into your staging site to see ghost telemetry in real-time.
                  </p>
                  <div className="p-4 bg-[#0a0a0c] border border-primary/10 rounded-xl font-mono text-[10px] text-[#484f58] break-all leading-relaxed relative">
                     {GHOST_SNIPPET}
                     <button 
                       onClick={() => copyToClipboard(GHOST_SNIPPET, setCopiedSnippet)}
                       className="absolute top-2 right-2 p-1.5 bg-[#111114] hover:bg-[#161b22] rounded transition-colors text-[#8b949e] hover:text-primary"
                     >
                        {copiedSnippet ? <CheckCircle2 className="w-3 h-3 text-[#3fb950]" /> : <Copy className="w-3 h-3" />}
                     </button>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest animate-pulse">
                     <Zap className="w-3 h-3" /> Live Telemetry Enabled
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
