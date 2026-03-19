"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, ArrowRight, ShieldAlert, Zap, MonitorPlay, Code2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RoastMyUX() {
  const [url, setUrl] = useState('');
  const [isRoasting, setIsRoasting] = useState(false);
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const roastSteps = [
    "Analyzing DOM structure...",
    "Identifying rage-click clusters...",
    "Measuring cognitive load...",
    "Mapping frustration index...",
    "Finalizing forensic teardown..."
  ];

  const handleRoast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setIsRoasting(true);
    setCurrentStep(0);

    // Incremental telemetry steps for perceived value
    const interval = setInterval(() => {
        setCurrentStep(prev => prev + 1);
    }, 600);
    
    setTimeout(() => {
        clearInterval(interval);
        router.push(`/onboarding?roast=${encodeURIComponent(url)}`);
    }, 3200);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#c9d1d9] font-sans selection:bg-[#ea580c]/30 selection:text-white relative overflow-hidden flex flex-col items-center justify-center p-6">
      
      {/* Esoteric Background Elements */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 50% 50%, #ea580c 0%, transparent 40%)',
        filter: 'blur(100px)'
      }} />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ea580c]/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#8a2be2]/50 to-transparent" />

      <div className="z-10 w-full max-w-4xl text-center flex flex-col items-center relative">
        
        {/* Top Badge */}
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-3 py-1 mb-8 rounded-full border border-[#ea580c]/30 bg-[#ea580c]/10 text-[#ea580c] font-mono text-[10px] uppercase tracking-widest shadow-[0_0_15px_rgba(234,88,12,0.15)]"
        >
            <Flame className="w-3.5 h-3.5" />
            <span>Executive Teardown Protocol</span>
        </motion.div>

        {/* Hero Copy */}
        <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6"
        >
            Drop Your URL.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ea580c] to-[#ff7a2d] drop-shadow-[0_0_15px_rgba(234,88,12,0.5)]">
               We'll Roast the Friction.
            </span>
        </motion.h1>

        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-[#8b949e] mb-12 max-w-2xl text-center leading-relaxed"
        >
            Phantom deploys an elite seance of autonomous synthetic users to tear down your staging links. We uncover rage-clicks, cognitive overload, and broken funnels before your users do.
        </motion.p>

        {/* The Capture Form */}
        <motion.form 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            onSubmit={handleRoast}
            className="w-full max-w-2xl relative"
        >
            <div className={`p-1 rounded-lg bg-gradient-to-r from-[#ea580c]/30 to-[#8a2be2]/30 transition-all duration-500 overflow-hidden ${isRoasting ? 'shadow-[0_0_30px_rgba(234,88,12,0.4)] scale-[1.02]' : 'shadow-none'}`}>
                <div className="flex flex-col md:flex-row gap-2 bg-[#0a0a0c] p-2 rounded-md">
                    <input 
                        type="url" 
                        required
                        placeholder="https://staging.your-startup.com"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        disabled={isRoasting}
                        className="flex-1 bg-[#111114] border border-[#2d2d30] rounded px-4 py-4 text-white focus:outline-none focus:border-[#ea580c]/50 font-mono tracking-wide disabled:opacity-50"
                    />
                    <button 
                        type="submit"
                        disabled={isRoasting}
                        className="bg-[#ea580c] hover:bg-[#ff7a2d] text-white px-8 py-4 rounded font-bold tracking-widest uppercase text-sm transition-all flex items-center justify-center gap-2 group disabled:opacity-50 relative overflow-hidden"
                    >
                        {isRoasting ? (
                            <span className="flex items-center gap-2">
                                <Code2 className="w-4 h-4 animate-spin text-[#ea580c]" />
                                <span className="animate-pulse">{roastSteps[currentStep] || "Deploying Ghosts..."}</span>
                            </span>
                        ) : (
                            <>
                                Initiate Séance
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </div>
                {/* Scanner bar effect when roasting */}
                <AnimatePresence>
                    {isRoasting && (
                        <motion.div 
                            initial={{ left: '-100%' }}
                            animate={{ left: '200%' }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                            className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent z-10 pointer-events-none"
                            style={{ transform: 'skewX(-20deg)' }}
                        />
                    )}
                </AnimatePresence>
            </div>
        </motion.form>

        {/* Social Proof / Metrics */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full border-t border-[#2d2d30] pt-12"
        >
            <div className="flex items-start gap-4 text-left">
                <div className="p-3 rounded bg-[#111114] border border-[#2d2d30]">
                    <ShieldAlert className="w-6 h-6 text-[#ff7b72]" />
                </div>
                <div>
                    <h3 className="font-bold text-white mb-1">Catch Rage-Clicks</h3>
                    <p className="text-sm text-[#8b949e]">Phantom agents simulate frustration and identify INP spikes instantly.</p>
                </div>
            </div>
            <div className="flex items-start gap-4 text-left">
                <div className="p-3 rounded bg-[#111114] border border-[#2d2d30]">
                    <Zap className="w-6 h-6 text-[#d7a22a]" />
                </div>
                <div>
                    <h3 className="font-bold text-white mb-1">Pre-Launch Cert</h3>
                    <p className="text-sm text-[#8b949e]">Prove to your board that your new sprint won't cannibalize conversion.</p>
                </div>
            </div>
            <div className="flex items-start gap-4 text-left">
                <div className="p-3 rounded bg-[#111114] border border-[#2d2d30]">
                    <MonitorPlay className="w-6 h-6 text-[#8a2be2]" />
                </div>
                <div>
                    <h3 className="font-bold text-white mb-1">Watch Them fail</h3>
                    <p className="text-sm text-[#8b949e]">Watch our agents try to use your site live via headless streaming.</p>
                </div>
            </div>
        </motion.div>

      </div>
    </div>
  );
}
