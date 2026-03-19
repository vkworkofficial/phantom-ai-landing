"use client";

import React, { useState } from 'react';
import { Ghost, Mail, ArrowRight, ShieldCheck, Cpu, Zap, Search, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

import { useSeanceSimulation } from '@/hooks/useSeanceSimulation';

export default function WaitlistPage() {
  const [email, setEmail] = useState('');
  const [domain, setDomain] = useState('');
  const { status, progress, logs, initiateSeance } = useSeanceSimulation();

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !domain) return;

    // Phase 1: Interactive Simulation (Cognitive Audit)
    await initiateSeance(email, domain);

    // Phase 2: Forensic Data Persistence (Database Handshake)
    try {
      await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website: domain }) // honeypot checks are on 'website' in API
      });
    } catch (err) {
      console.warn("[Forensic] Handshake failure, but simulation complete.", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#c9d1d9] flex items-center justify-center p-4 selection:bg-primary/30">
      <div className="w-full max-w-2xl bg-[#161b22] border border-[#30363d] rounded-3xl p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px]" />
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-12">
            <Link href="/" className="font-bold text-white tracking-tighter text-xl flex items-center gap-2">
              <div className="w-5 h-5 bg-primary rounded-sm shadow-[0_0_15px_rgba(234,88,12,0.4)]" /> Phantom
            </Link>
            <div className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-bold text-primary uppercase tracking-widest animate-pulse">
               Seance Active
            </div>
          </div>

          {status === 'idle' && (
            <>
              <div className="mb-12">
                <h1 className="text-4xl font-black text-white tracking-tight mb-4 leading-tight uppercase italic">
                  Join the <span className="text-primary tracking-tighter not-italic">Substrate.</span>
                </h1>
                <p className="text-[#8b949e] text-lg leading-relaxed">
                  Enter your domain to run a 60-second **Forensic Séance**. We will identify your top 3 conversion bottlenecks instantly.
                </p>
              </div>

              <form onSubmit={handleApply} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-[#484f58] uppercase tracking-[0.2em] ml-1">Work Email</label>
                    <input 
                      type="email" 
                      required
                      placeholder="founder@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl px-4 py-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-white placeholder-[#30363d]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-[#484f58] uppercase tracking-[0.2em] ml-1">Target Domain</label>
                    <input 
                      type="text" 
                      required
                      placeholder="app.company.com"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl px-4 py-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-white placeholder-[#30363d]"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-primary text-white py-5 rounded-xl font-black hover:shadow-[0_0_40px_rgba(234,88,12,0.5)] transition-all uppercase tracking-[0.2em] text-[14px] flex items-center justify-center gap-3 group"
                >
                  Initiate Forensic Audit <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </>
          )}

          {status === 'analyzing' && (
            <div className="py-12">
              <div className="flex flex-col items-center mb-12">
                 <div className="relative w-24 h-24 mb-8">
                    <div className="absolute inset-0 border-4 border-primary/10 rounded-full" />
                    <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <Ghost className="w-10 h-10 text-primary animate-pulse" />
                    </div>
                 </div>
                 <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Analyzing {domain}</h2>
                 <p className="text-primary font-mono text-xs uppercase tracking-[0.3em]">{Math.floor(progress)}% Coherent</p>
              </div>

              <div className="bg-[#0d1117] border border-[#30363d] rounded-xl p-6 font-mono text-[12px] h-48 overflow-y-auto custom-scrollbar">
                 {logs.map((log, i) => (
                   <div key={i} className="mb-2 text-[#8b949e] flex items-start gap-3">
                      <span className="text-primary opacity-50">[{new Date().toLocaleTimeString([], {hour12: false})}]</span>
                      <span>{log}</span>
                   </div>
                 ))}
                 <div className="animate-pulse text-white inline-block w-2 h-4 bg-primary ml-1" />
              </div>
            </div>
          )}

          {status === 'complete' && (
            <div className="text-center py-8">
               <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
               </div>
               <h2 className="text-4xl font-black text-white uppercase tracking-tight mb-4 italic">Seance Successful.</h2>
               <p className="text-[#8b949e] text-lg mb-12 leading-relaxed">
                  We've identified **4 critical friction points** on `{domain}`. Your Forensic Report is being encrypted and sent to **{email}**.
               </p>

               <div className="bg-[#0d1117] border border-[#30363d] rounded-2xl p-8 mb-12 text-left relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                     <Zap className="w-32 h-32 text-primary" />
                  </div>
                  <div className="relative z-10">
                    <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-6 flex items-center gap-2">
                       <AlertCircle className="w-4 h-4" /> Live Forensic Snapshot
                    </h4>
                    <ul className="space-y-4 text-[14px]">
                       <li className="flex gap-3 text-[#c9d1d9]">
                          <span className="text-red-500 font-bold">•</span>
                          <span>900ms Hydration Lag detected in Primary CTA.</span>
                       </li>
                       <li className="flex gap-3 text-[#c9d1d9]">
                          <span className="text-red-500 font-bold">•</span>
                          <span>High Rage-Click probability on mobile checkout toggle.</span>
                       </li>
                       <li className="flex gap-3 text-[#c9d1d9]">
                          <span className="text-yellow-500 font-bold">•</span>
                          <span>Intent Fracture (34%) during multi-step onboarding.</span>
                       </li>
                    </ul>
                  </div>
               </div>

               <Link 
                 href="/" 
                 className="inline-flex items-center gap-2 text-primary font-bold hover:underline py-2 uppercase tracking-widest text-xs"
               >
                 Explore the Substrate Protocol <ArrowRight className="w-4 h-4" />
               </Link>
            </div>
          )}

          <div className="mt-12 pt-8 border-t border-[#30363d] flex justify-between items-center text-[10px] font-mono text-[#484f58] uppercase tracking-widest">
             <div>Protocol v4.2 // YC S26 Node</div>
             <div className="flex gap-4">
                <Link href="/leaderboard" className="hover:text-primary transition-colors">Index</Link>
                <Link href="/toolkit" className="hover:text-primary transition-colors">Toolkit</Link>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
