"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Activity, Cpu, Shield, Globe, Terminal, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StatusPage() {
  const [nodes, setNodes] = useState([
    { id: "ghost-engine-us-east-1", name: "Forensic Engine (US-East)", region: "VA, USA", status: "operational", latency: "12ms" },
    { id: "substrate-pg-01", name: "Postgres Substrate", region: "London, UK", status: "operational", latency: "45ms" },
    { id: "consensus-node-alpha", name: "Consensus Node Alpha", region: "Tokyo, JP", status: "degraded", latency: "180ms" },
    { id: "websocket-bridge", name: "Telemetry WebSocket Bridge", region: "Edge", status: "operational", latency: "8ms" },
  ]);

  const [lastUpdate, setLastUpdate] = useState(new Date().toLocaleTimeString());

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#c9d1d9] font-sans selection:bg-primary/30">
      <header className="h-20 border-b border-[#2d2d30] bg-[#111114] flex items-center justify-between px-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-bold text-white tracking-tighter text-[22px] flex items-center gap-2">
            <div className="w-5 h-5 bg-white rounded-sm" /> Phantom AI
          </Link>
          <div className="h-6 w-[1px] bg-[#2d2d30]" />
          <span className="text-[14px] font-mono text-[#8b949e] uppercase tracking-widest">Public Status Page</span>
        </div>
        <div className="flex items-center gap-4">
           <span className="text-[11px] font-mono text-[#484f58]">Last transmission: {lastUpdate}</span>
           <button onClick={() => setLastUpdate(new Date().toLocaleTimeString())} className="p-2 rounded hover:bg-[#161b22] transition-colors"><RefreshCw className="w-4 h-4 text-primary" /></button>
        </div>
      </header>

      <main className="max-w-[1000px] mx-auto px-4 py-20">
        <div className="p-10 rounded-2xl bg-[#111114] border border-[#3fb950]/30 shadow-[0_0_50px_rgba(63,185,80,0.1)] mb-12 flex items-center justify-between">
           <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-[#3fb950]/10 flex items-center justify-center border border-[#3fb950]/30">
                 <CheckCircle2 className="w-8 h-8 text-[#3fb950]" />
              </div>
              <div>
                 <h1 className="text-3xl font-bold text-white mb-1 tracking-tight">All Systems Operational</h1>
                 <p className="text-[#8b949e]">Phantom AI Substrate is performing within normal cognitive parameters.</p>
              </div>
           </div>
           <div className="text-right hidden md:block">
              <span className="text-4xl font-bold text-[#3fb950]">99.98%</span>
              <p className="text-[11px] font-mono text-[#484f58] uppercase tracking-widest mt-1">30-day uptime</p>
           </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
           {nodes.map(node => (
             <div key={node.id} className="p-6 rounded-xl bg-[#111114] border border-[#2d2d30] flex items-center justify-between hover:border-[#484f58] transition-colors satin-border">
                <div className="flex items-center gap-4">
                   <div className={`p-2 rounded ${node.status === 'operational' ? 'bg-[#3fb950]/10' : 'bg-[#e3b341]/10'}`}>
                      {node.id.includes('engine') ? <Cpu className="w-5 h-5" /> : node.id.includes('pg') ? <Shield className="w-5 h-5" /> : <Globe className="w-5 h-5" />}
                   </div>
                   <div>
                      <h3 className="font-bold text-white">{node.name}</h3>
                      <p className="text-xs text-[#484f58] font-mono uppercase tracking-widest">{node.region}</p>
                   </div>
                </div>
                <div className="flex items-center gap-8">
                   <div className="hidden sm:block text-right">
                      <span className="text-[12px] font-mono text-[#8b949e]">{node.latency}</span>
                      <p className="text-[9px] uppercase tracking-widest text-[#484f58]">latency</p>
                   </div>
                   <span className={`px-2 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-widest border
                      ${node.status === 'operational' ? 'bg-[#3fb950]/10 border-[#3fb950]/30 text-[#3fb950]' : 'bg-[#e3b341]/10 border-[#e3b341]/30 text-[#e3b341]'}`}>
                      {node.status}
                   </span>
                </div>
             </div>
           ))}
        </div>

        <section className="mt-20 pt-12 border-t border-[#2d2d30]">
           <h2 className="text-[11px] font-bold text-white uppercase tracking-[0.2em] mb-8">Historical Transmissions</h2>
           <div className="space-y-6">
              {[
                { date: "March 18", event: "Maintenance", desc: "Successfully upgraded Forensic Engine to Substrate Protocol v4.2." },
                { date: "March 12", event: "Issue", desc: "Degraded performance observed in Consensus Node Alpha (Tokyo) due to spectral drift." }
              ].map((update, i) => (
                <div key={i} className="flex gap-10">
                   <div className="text-[11px] font-mono text-[#484f58] w-20 shrink-0">{update.date}</div>
                   <div>
                      <h4 className="font-bold text-white text-[14px] mb-1">{update.event}</h4>
                      <p className="text-sm text-[#8b949e]">{update.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </section>
      </main>
      
      <footer className="py-20 border-t border-[#2d2d30] mt-20 text-center">
         <Link href="/" className="text-primary hover:underline font-bold uppercase tracking-widest text-xs">Return to Hive Mind</Link>
      </footer>
    </div>
  );
}
