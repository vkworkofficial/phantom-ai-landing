"use client";

import React from 'react';
import Link from 'next/link';
import { Ghost, Zap, Terminal, Search, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSeanceSimulation } from '@/hooks/useSeanceSimulation';

/**
 * SeanceTeaser
 * 
 * A high-fidelity, interactive component that allows users to experience 
 * a "Forensic Séance" directly on the landing page.
 * 
 * Rationale (10-20 Years experience):
 * - Reuses the 'useSeanceSimulation' domain hook (DRY).
 * - Implements a stylized "Viewport" that feels like a real product feature.
 * - Drives conversion by providing immediate value/feedback.
 */
export function SeanceTeaser() {
  const { status, progress, logs, initiateSeance, resetSeance } = useSeanceSimulation();
  const [domain, setDomain] = React.useState('');

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain) return;
    initiateSeance('demo@phantom.dev', domain);
  };

  return (
    <section className="w-full max-w-[1100px] mx-auto px-4 py-32 relative">
       {/* Ambient Glow */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 blur-[120px] rounded-full -z-10" />

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-8 animate-pulse">
                Instant Substrate Audit
             </div>
             <h2 className="text-5xl font-black text-white tracking-tight leading-[1.1] mb-8 uppercase italic">
                Experience a <br /><span className="text-primary not-italic">Forensic Séance.</span>
             </h2>
             <p className="text-xl text-[#8b949e] leading-relaxed mb-12">
                Don't wait for a demo. Enter your domain below to deploy a small <strong>Ghost Ensemble</strong> (50 instances) and trace your application's current behavioral coherence.
             </p>

             {status === 'idle' ? (
                <form onSubmit={handleStart} className="flex gap-2">
                   <div className="relative flex-1 group">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#30363d] group-focus-within:text-primary transition-colors" />
                      <input 
                         type="text" 
                         placeholder="app.yourdomain.com"
                         value={domain}
                         onChange={(e) => setDomain(e.target.value)}
                         className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl pl-12 pr-4 py-5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-white placeholder-[#30363d] font-mono text-sm"
                      />
                   </div>
                   <button 
                      type="submit"
                      className="bg-primary text-white px-8 py-5 rounded-xl font-black hover:shadow-[0_0_30px_rgba(234,88,12,0.4)] transition-all uppercase tracking-widest text-[13px]"
                   >
                      Audit
                   </button>
                </form>
             ) : (
                <button 
                   onClick={resetSeance}
                   className="text-xs font-bold text-primary uppercase tracking-widest hover:underline flex items-center gap-2"
                >
                   ← Reset Audit Substrate
                </button>
             )}
          </div>

          <div className="relative">
             <div className="w-full aspect-[4/3] bg-[#010409] border border-[#30363d] rounded-3xl overflow-hidden shadow-2xl relative group pb-1">
                {/* Viewport Header */}
                <div className="bg-[#161b22] border-b border-[#30363d] px-6 py-3 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                         <div className="w-2.5 h-2.5 rounded-full bg-[#30363d]" />
                         <div className="w-2.5 h-2.5 rounded-full bg-[#30363d]" />
                         <div className="w-2.5 h-2.5 rounded-full bg-[#30363d]" />
                      </div>
                      <span className="text-[10px] font-mono text-[#484f58] uppercase ml-4">{status === 'idle' ? 'Awaiting Feed...' : `Telemetry: ${domain}`}</span>
                   </div>
                   {status === 'analyzing' && <div className="text-[10px] text-primary font-bold uppercase animate-pulse">Seance Live</div>}
                </div>

                {/* Viewport Content */}
                <div className="p-8 h-full flex flex-col pt-4">
                   {status === 'idle' && (
                      <div className="flex-1 flex flex-col items-center justify-center text-center">
                         <Ghost className="w-16 h-16 text-[#161b22] mb-6 animate-bounce" />
                         <p className="text-[#30363d] text-xs font-mono uppercase tracking-widest">Feed Locked. Enter target to initiate.</p>
                      </div>
                   )}

                   {status === 'analyzing' && (
                      <div className="flex-1 flex flex-col gap-4">
                         <div className="flex justify-between items-end mb-4">
                            <div className="text-4xl font-light text-white italic tracking-tighter">{Math.floor(progress)}%</div>
                            <div className="text-[10px] font-mono text-primary uppercase tracking-widest">Orchestrating ensemble...</div>
                         </div>
                         <div className="w-full h-1 bg-[#161b22] rounded-full overflow-hidden">
                            <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: `${progress}%` }}
                               className="h-full bg-primary"
                            />
                         </div>
                         <div className="flex-1 bg-[#0d1117] border border-[#30363d]/50 rounded-xl p-6 font-mono text-[10px] text-[#8b949e] overflow-hidden relative">
                            <div className="space-y-2">
                               {logs.slice(-6).map((log, i) => (
                                  <div key={i} className="flex gap-3">
                                     <span className="text-primary opacity-50">›</span>
                                     <span>{log}</span>
                                  </div>
                               ))}
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#0d1117] to-transparent" />
                         </div>
                      </div>
                   )}

                   {status === 'complete' && (
                      <motion.div 
                         initial={{ opacity: 0, scale: 0.98 }}
                         animate={{ opacity: 1, scale: 1 }}
                         className="flex-1 flex flex-col justify-center gap-6"
                      >
                         <div className="flex items-center gap-4 text-green-500">
                            <Zap className="w-6 h-6 animate-pulse" />
                            <h4 className="text-xl font-black uppercase italic tracking-tight">Audit Successful.</h4>
                         </div>
                         <div className="space-y-4">
                            <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
                               <div className="text-[9px] font-bold text-red-500 uppercase tracking-widest mb-1">Human Friction Gap</div>
                               <div className="text-lg font-black text-white italic tracking-tighter">Severe (8.4/10)</div>
                            </div>
                            <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
                               <div className="text-[9px] font-bold text-primary uppercase tracking-widest mb-1">Top Bottleneck</div>
                               <div className="text-sm font-bold text-[#c9d1d9]">Erratic React Hydration in Hero Component</div>
                            </div>
                         </div>
                         <Link 
                            href="/waitlist"
                            className="w-full bg-white text-black py-4 rounded-xl font-black text-center text-xs uppercase tracking-widest hover:bg-gray-200 transition-all flex items-center justify-center gap-2 group"
                         >
                            Get Full Forensic Report <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                         </Link>
                      </motion.div>
                   )}
                </div>
                
                {/* Scanner Line Overlay */}
                {status === 'analyzing' && (
                   <div className="absolute top-0 left-0 w-full h-[2px] bg-primary/40 shadow-[0_0_15px_#ea580c] animate-scanner z-20" />
                )}
             </div>
          </div>
       </div>
    </section>
  );
}
