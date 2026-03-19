'use client';

import React, { useState, useEffect } from 'react';
import { Activity, Zap, Cpu, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ForensicHUD() {
  const [telemetry, setTelemetry] = useState({
    latency: '0.8ms',
    throughput: '1.2k/s',
    ghosts: '12 active',
    substrate: 'Forensic v5.0'
  });

  // Simple animation for "Live" effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        ...prev,
        latency: `${(Math.random() * 0.5 + 0.5).toFixed(2)}ms`,
        throughput: `${(Math.random() * 100 + 1100).toFixed(0)}/s`
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const [isHudActive, setIsHudActive] = useState(false);

  const toggleHud = () => {
    const newState = !isHudActive;
    setIsHudActive(newState);
    window.dispatchEvent(new CustomEvent('phantom-hud-toggle', { detail: { active: newState } }));
  };

  return (
    <div className="w-full bg-[#0A0A0A] border-y border-white/5 py-2 px-6 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto flex items-center justify-between text-[10px] font-mono tracking-wider">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-zinc-400">
            <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
            LIVE FORENSIC SUBSTRATE: <span className="text-white">{telemetry.substrate}</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-zinc-400">
            <Zap className="w-3 h-3 text-amber-500" />
            LATENCY: <span className="text-white tabular-nums">{telemetry.latency}</span>
          </div>
          <div className="hidden lg:flex items-center gap-2 text-zinc-400">
            <Cpu className="w-3 h-3 text-blue-500" />
            THROUGHPUT: <span className="text-white tabular-nums">{telemetry.throughput}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleHud}
            className={`px-3 py-1 rounded border transition-all ${isHudActive ? 'bg-purple-500/20 border-purple-500 text-purple-400 shadow-[0_0_10px_rgba(138,43,226,0.3)]' : 'bg-zinc-900 border-white/10 text-zinc-500 hover:border-white/20'}`}
          >
            {isHudActive ? 'HUD: ACTIVE' : 'ACTIVATE HUD'}
          </button>
          <div className="flex items-center gap-2 text-zinc-500">
            <Terminal className="w-3 h-3" />
            <span className="animate-pulse">_</span>
          </div>
          <div className="px-2 py-0.5 rounded bg-zinc-900 border border-white/10 text-white cursor-help">
            GHOST_VIEWER: <span className="text-purple-400">{telemetry.ghosts}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
