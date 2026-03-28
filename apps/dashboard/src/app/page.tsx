"use client";

import React from "react";
import Link from 'next/link';
import { Terminal, Shield, Cpu, ArrowRight } from "lucide-react";
import { Reveal, PhantomLogo, Button } from "@/components/landing/Primitives";
import { useConsentState } from "@/components/CookieConsent";

export default function Home() {
  const consent = useConsentState();

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans selection:bg-primary/30 relative overflow-hidden flex flex-col">
      
      <header className="sticky top-0 z-40 bg-[#010409]/95 backdrop-blur-sm border-b border-[#30363d]">
        <div className="max-w-[1280px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5">
              <PhantomLogo />
              <span className="font-bold text-white tracking-tighter text-[22px]">Phantom AI</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button primary onClick={() => window.location.href = 'https://app.tryphantom.dev'}>Launch Product</Button>
          </div>
        </div>
      </header>

      <main className="flex flex-col items-center w-full grow justify-center">
        <section id="hero" className="w-full max-w-[1280px] mx-auto px-4 py-32 flex flex-col items-center text-center gap-12 relative">
          <div className="z-10 w-full max-w-4xl">
            <Reveal delay={0.2}>
              <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-10 uppercase italic">
                Advanced <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">Substrate</span> <br className="hidden md:block" /><span className="text-[#8b949e] not-italic">Infrastructure.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-xl md:text-2xl text-[#8b949e] max-w-2xl mx-auto font-medium leading-relaxed mb-14">
                The stealth behavioral engine. High-fidelity autonomy at scale. Deploy complex forensic agents into any environment with zero-latency overhead.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button primary className="h-14 px-10 text-lg uppercase tracking-widest font-black group transition-all" onClick={() => window.location.href = 'https://app.tryphantom.dev'}>
                  Get Started
                </Button>
                <Link href="/dashboard" className="text-sm font-bold text-[#8b949e] hover:text-white uppercase tracking-widest transition-colors flex items-center gap-2 group">
                  Local Access <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mt-24">
            <Reveal delay={0.5}>
              <div className="p-8 rounded-2xl bg-[#161b22] border border-[#30363d] text-left">
                <Terminal className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">Behavioral Console</h3>
                <p className="text-sm text-[#8b949e]">Direct kernel access to high-fidelity synthetic logic. Managed at the substrate level.</p>
              </div>
            </Reveal>
            <Reveal delay={0.6}>
              <div className="p-8 rounded-2xl bg-[#161b22] border border-[#30363d] text-left">
                <Shield className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">Forensic Security</h3>
                <p className="text-sm text-[#8b949e]">Encrypted state synchronization between global edge nodes. Zero-leak environment hardening.</p>
              </div>
            </Reveal>
            <Reveal delay={0.7}>
              <div className="p-8 rounded-2xl bg-[#161b22] border border-[#30363d] text-left">
                <Cpu className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">Simulation Mesh</h3>
                <p className="text-sm text-[#8b949e]">Orchestration for multi-agent behavioral clusters. Optimized for high-velocity simulation.</p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#30363d] py-20 bg-[#010409]">
        <div className="max-w-[1280px] mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center lg:text-left">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-6 justify-center lg:justify-start">
              <PhantomLogo className="w-5 h-5" />
              <span className="font-bold text-white tracking-tighter text-[20px]">Phantom AI</span>
            </div>
            <p className="text-[#8b949e] text-sm max-w-sm mb-8 leading-relaxed mx-auto lg:mx-0">Behavioral Autonomy and Stealth Substrate Infrastructure. v4.3-Hardened.</p>
            <div className="text-[11px] font-mono text-[#484f58] uppercase tracking-widest">© 2026 Phantom Labs | Silicon Valley</div>
          </div>
          <div className="col-span-2 flex flex-col items-center lg:items-end justify-center">
            <Button primary onClick={() => window.location.href = 'https://app.tryphantom.dev'}>Launch Substrate</Button>
            <div className="mt-4 text-[10px] font-mono text-[#484f58] uppercase tracking-widest">Enterprise behavioral engine</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
