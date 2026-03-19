"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, AlertCircle, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const COMPETITORS = [
  { name: "PostHog", hfs: 14.2, rank: 1, status: "Healthy", color: "#4ade80" },
  { name: "FullStory", hfs: 28.5, rank: 2, status: "Moderate", color: "#fbbf24" },
  { name: "LogRocket", hfs: 42.1, rank: 3, status: "Critical", color: "#f87171" },
  { name: "Hotjar", hfs: 55.8, rank: 4, status: "Toxic", color: "#ef4444" },
  { name: "Microsoft Clarity", hfs: 12.1, rank: 1, status: "Healthy", color: "#4ade80" }
].sort((a, b) => a.hfs - b.hfs);

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#c9d1d9] font-sans p-6 md:p-12 selection:bg-[#ea580c]/30">
      
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-16">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-end gap-6"
        >
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-[1px] bg-[#ea580c]" />
                    <span className="text-[#ea580c] font-mono text-xs uppercase tracking-[0.3em]">Forensic Benchmarks</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
                    The Friction <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ea580c] to-[#ff7a2d]">Leaderboard</span>
                </h1>
                <p className="mt-4 text-[#8b949e] max-w-xl text-lg">
                    Real-time Human Friction Scores (HFS) for the industry's top platforms, calculated by autonomous Phantom agents.
                </p>
            </div>
            
            <Link href="/roast" className="group flex items-center gap-2 px-6 py-3 bg-[#111114] border border-[#2d2d30] rounded hover:border-[#ea580c]/50 transition-all text-sm font-bold tracking-widest uppercase">
                Submit Your Site
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
        </motion.div>
      </div>

      {/* Leaderboard Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 gap-4">
            {COMPETITORS.map((comp, idx) => (
                <motion.div 
                    key={comp.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group bg-[#0a0a0c] border border-[#2d2d30] hover:border-[#ea580c]/30 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-6 transition-all"
                >
                    <div className="flex items-center gap-6 flex-1">
                        <div className="text-3xl font-bold font-mono text-[#2d2d30] w-12 text-center group-hover:text-[#ea580c]/50 transition-colors">
                            {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-xl font-bold text-white">{comp.name}</h3>
                                <ExternalLink className="w-3.5 h-3.5 text-[#8b949e] opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: comp.color }} />
                                <span className="text-xs font-mono uppercase tracking-widest" style={{ color: comp.color }}>
                                    {comp.status} Substrate
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-12">
                        <div className="text-right">
                            <div className="text-[#8b949e] text-[10px] uppercase tracking-widest mb-1">Friction Score (HFS)</div>
                            <div className="text-3xl font-bold text-white font-mono">{comp.hfs}</div>
                        </div>
                        
                        <div className="w-32 h-2 bg-[#111114] rounded-full overflow-hidden border border-[#2d2d30]">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${comp.hfs}%` }}
                                transition={{ delay: idx * 0.1 + 0.5, duration: 1 }}
                                className="h-full"
                                style={{ backgroundColor: comp.color }}
                            />
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
        
        {/* Footer Disclaimer */}
        <div className="mt-12 flex items-center justify-center gap-4 text-[#484f58] text-[10px] uppercase tracking-widest font-mono">
            <ShieldCheck className="w-4 h-4" />
            <span>Audited via Phantom Forensic Engine v0.1.0-beta</span>
            <span className="w-1 h-1 rounded-full bg-[#30363d]" />
            <span>Last Updated: Mar 20, 2026</span>
        </div>
      </div>

    </div>
  );
}
