"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from 'next/link';
import { Search, Loader2, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Modular Components
import { Reveal, PhantomLogo, Button, Badge } from "@/components/landing/Primitives";
import { HeroTerminalAnimation } from "@/components/landing/Terminal";
import { useConsentState } from "@/components/CookieConsent";

export default function Home() {
  const [toast, setToast] = useState<{msg: string, type: "success" | "error" | "info"} | null>(null);
  const [showCmdk, setShowCmdk] = useState(false);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const consent = useConsentState();

  const showToast = useCallback((msg: string, type: "success" | "error" | "info" = "info") => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ msg, type });
    toastTimerRef.current = setTimeout(() => setToast(null), 4000);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowCmdk(prev => !prev);
      }
      if (e.key === "Escape") setShowCmdk(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans selection:bg-primary/30 relative overflow-hidden flex flex-col">
      
      <header className="sticky top-0 z-40 bg-[#010409]/95 backdrop-blur-sm border-b border-[#30363d]">
        <div className="max-w-[1280px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5">
              <PhantomLogo />
              <span className="font-bold text-white tracking-tighter text-[22px]">Phantom AI</span>
            </div>
            <div className="hidden md:flex items-center gap-2 border border-[#3fb950]/30 bg-[#3fb950]/5 px-2.5 py-1 rounded-full text-[11px] font-mono text-[#3fb950] tracking-wide">
                <span className="relative flex h-1.5 w-1.5 shadow-[0_0_8px_#3fb950]"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3fb950] opacity-75" /><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#3fb950]" /></span>
                Systems Operational
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button aria-label="Search command menu" onClick={() => setShowCmdk(true)} className="hidden md:flex items-center gap-3 text-[13px] text-[#8b949e] border border-[#30363d] bg-[#161b22] px-3 py-1.5 rounded-md hover:border-[#484f58] transition-colors"><Search className="w-3.5 h-3.5" /> <span>Search...</span> <kbd className="font-mono bg-[#0d1117] px-1.5 py-0.5 rounded border border-[#30363d] text-[10px]">⌘K</kbd></button>
            <Button primary onClick={() => window.location.href = 'https://app.tryphantom.dev'}>Launch Product</Button>
          </div>
        </div>
      </header>

      <main className="flex flex-col items-center w-full grow justify-center">
        <section id="hero" className="w-full max-w-[1280px] mx-auto px-4 py-32 flex flex-col items-center text-center gap-12 relative">
          <div className="z-10 w-full max-w-4xl">
            <Reveal delay={0.1}>
              <Badge className="mb-6 border-primary/30 text-primary" showDot>S26 Production Engine Active</Badge>
            </Reveal>
            <Reveal delay={0.2}>
              <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-10 uppercase italic">
                Achieve <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">Product-Market Fit</span> <br className="hidden md:block" /><span className="text-[#8b949e] not-italic">at Terminal Velocity.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-xl md:text-2xl text-[#8b949e] max-w-2xl mx-auto font-medium leading-relaxed mb-14">
                Deploy high-fidelity synthetic users that think, click, and convert exactly like your target audience. Stop guessing and start scaling.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button primary className="h-14 px-10 text-lg uppercase tracking-widest font-black group transition-all" onClick={() => window.location.href = 'https://app.tryphantom.dev'}>
                  Launch Product
                </Button>
                <Link href="/dashboard" className="text-sm font-bold text-[#8b949e] hover:text-white uppercase tracking-widest transition-colors flex items-center gap-2 group">
                  Access Local Dashboard <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Reveal>
          </div>
          
          <Reveal delay={0.5}>
            <div className="relative mt-12 scale-95 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
               <HeroTerminalAnimation />
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-[#30363d] py-20 bg-[#010409]">
        <div className="max-w-[1280px] mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-6">
              <PhantomLogo className="w-5 h-5" />
              <span className="font-bold text-white tracking-tighter text-[20px]">Phantom AI</span>
            </div>
            <p className="text-[#8b949e] text-sm max-w-sm mb-8 leading-relaxed">Achieving PMF Velocity via high-fidelity synthetic user simulation. Engine v4.3 hardened for enterprise scaling.</p>
            <div className="text-[11px] font-mono text-[#484f58] uppercase tracking-widest">© 2026 Phantom AI | Silicon Valley</div>
          </div>
          <div className="col-span-2 flex flex-col items-end justify-center">
            <Button primary onClick={() => window.location.href = 'https://app.tryphantom.dev'}>Launch Product</Button>
            <div className="mt-4 text-[10px] font-mono text-[#484f58] uppercase tracking-widest">v4.3-hardened engine</div>
          </div>
        </div>
      </footer>

      {/* Accessible Toast Notification System */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl ${
              toast?.type === "success" 
                ? "bg-[#0d1117] border-[#3fb950]/30 text-[#3fb950] shadow-[0_4px_20px_rgba(63,185,80,0.1)]"
                : toast?.type === "error"
                ? "bg-[#0d1117] border-[#ff7b72]/30 text-[#ff7b72] shadow-[0_4px_20px_rgba(255,123,114,0.1)]"
                : "bg-[#161b22] border-[#30363d] text-[#c9d1d9]"
            }`}
            role="alert"
            aria-live="assertive"
          >
            {toast?.type === "success" && <CheckCircle2 className="w-5 h-5 flex-shrink-0" aria-hidden="true" />}
            {toast?.type === "error" && <AlertCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />}
            <span className="text-sm font-medium">{toast?.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
