"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from 'next/link';
import { Search, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

// Modular Components
import { Reveal, PhantomLogo, Button, Input, Badge } from "@/components/landing/Primitives";
import { HeroTerminalAnimation } from "@/components/landing/Terminal";
import { CustomizeGhost } from "@/components/landing/Customizer";
import { ArchitectureStack, AnimatedCodeSnippet } from "@/components/landing/Features";
import { IssueSlider } from "@/components/landing/SocialProof";
import { SeanceTeaser } from "@/components/landing/SeanceTeaser";

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{msg: string, type: "success" | "error" | "info"} | null>(null);
  const [showCmdk, setShowCmdk] = useState(false);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  // Removed unprofessional jumpscare logic to ensure S26 production standards.
  const triggerWaitlistSuccess = () => {
    showToast("You're in. We'll haunt your inbox soon. 👻", "success");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      showToast("Please enter a valid email address.", "error");
      return;
    }

    const honeypot = (document.getElementById("company_url") as HTMLInputElement)?.value;
    setLoading(true);

    try {
      const res = await fetch("/api/waitlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, company_url: honeypot }) });
      if (res.ok) {
        triggerWaitlistSuccess();
        setEmail("");
      } else {
        const data = await res.json();
        showToast(data.error || "Something went wrong.", "error");
      }
    } catch { showToast("Network error. Please try again.", "error"); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans selection:bg-primary/30 relative overflow-hidden">
      
      {/* Jumpscare Purged for S26 Excellence */}

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
            <button onClick={() => setShowCmdk(true)} className="hidden md:flex items-center gap-3 text-[13px] text-[#8b949e] border border-[#30363d] bg-[#161b22] px-3 py-1.5 rounded-md hover:border-[#484f58] transition-colors"><Search className="w-3.5 h-3.5" /> <span>Search...</span> <kbd className="font-mono bg-[#0d1117] px-1.5 py-0.5 rounded border border-[#30363d] text-[10px]">⌘K</kbd></button>
            <Button primary onClick={() => document.getElementById("waitlist-input")?.focus()}>Summon your ghosts</Button>
          </div>
        </div>
      </header>

      <main className="flex flex-col items-center w-full">
        <section id="hero" className="w-full max-w-[1280px] mx-auto px-4 pt-24 pb-20 flex flex-col md:flex-row items-center gap-12 relative">
          <div className="flex-1 text-left z-10 w-full">
            <Reveal delay={0.1}><Badge className="mb-6 border-primary/30 text-primary" showDot>Private Beta — we&apos;re still slightly haunted ourselves</Badge></Reveal>
            <Reveal delay={0.2}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
                Achieve <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">PMF Velocity</span> <br className="hidden md:block" /><span className="text-[#8b949e]">100x faster.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-xl md:text-2xl text-[#8b949e] max-w-3xl font-normal leading-relaxed mb-10">
                Stop begging strangers to validate your broken MVP. Hook the <strong className="text-white font-semibold">Phantom Engine</strong> into your CI/CD and spawn infinite <strong className="text-white font-semibold">AI Ghosts</strong> that think, click, and rage-quit exactly like your Target Group.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="w-full max-w-md">
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 relative">
                  <input type="text" name="company_url" id="company_url" className="hidden" tabIndex={-1} autoComplete="off" />
                  <Input id="waitlist-input" type="email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} placeholder="you@company.com" required className="h-10 text-[15px] px-3 w-full" disabled={loading} />
                  <Button primary type="submit" className="h-10 px-6 shrink-0 text-[15px] group" disabled={loading}>{loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Join waitlist"}</Button>
                </form>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.5}>
            <div className="relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/10 blur-[100px] -z-10 rounded-full" />
              <HeroTerminalAnimation />
            </div>
          </Reveal>
        </section>

        <Reveal><div className="w-full max-w-[1280px] mx-auto px-4 mb-4 mt-6"><h2 className="text-sm font-semibold text-[#484f58] uppercase tracking-wider mb-2">The problem is real. These founders lived it.</h2></div></Reveal>
        <IssueSlider />
        <SeanceTeaser />

        <ArchitectureStack />
        <CustomizeGhost />

        <section className="w-full max-w-[1280px] mx-auto px-4 py-24 border-t border-[#30363d]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <Reveal>
                <h2 className="text-3xl font-semibold text-white mb-6">CI/CD for Human Behavior</h2>
                <p className="text-[#8b949e] text-lg leading-relaxed mb-8">
                  Integrate your synthetic testing directly into your deployment pipeline. Every PR spawns a verification séance to ensure no regression in UX quality or conversion velocity.
                </p>
                <ul className="space-y-4">
                  {[
                    "Auto-detect rage clicks and logic loops",
                    "Accessibility (A11y) tree verification",
                    "Regional latency simulation",
                    "PMF Sean Ellis disappointing score prediction"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-[#c9d1d9]">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <AnimatedCodeSnippet />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#30363d] py-20 bg-[#010409]">
        <div className="max-w-[1280px] mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-6">
              <PhantomLogo className="w-5 h-5" />
              <span className="font-bold text-white tracking-tighter text-[20px]">Phantom AI</span>
            </div>
            <p className="text-[#8b949e] text-sm max-w-sm mb-8 leading-relaxed">Achieving PMF Velocity via high-fidelity synthetic user simulation. Substrate Protocol v4.3 hardened for enterprise scaling.</p>
            <div className="text-[11px] font-mono text-[#484f58] uppercase tracking-widest">© 2026 Phantom Substrate Protocol | Silicon Valley</div>
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-white uppercase tracking-widest mb-6 underline decoration-primary decoration-2 underline-offset-8">Intelligence</h4>
            <ul className="space-y-4 text-[13px] text-[#8b949e] font-medium">
              <li><Link href="/blog" className="hover:text-primary transition-colors">Transmission Log (Blog)</Link></li>
              <li><Link href="/docs" className="hover:text-primary transition-colors">Substrate Protocol Docs</Link></li>
              <li><Link href="/status" className="hover:text-primary transition-colors">Ghost Health Status</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-white uppercase tracking-widest mb-6 underline decoration-primary decoration-2 underline-offset-8">Solutions</h4>
            <ul className="space-y-4 text-[13px] text-[#8b949e] font-medium">
              <li><Link href="/solutions/ai-user-testing" className="hover:text-primary transition-colors italic">User Testing</Link></li>
              <li><Link href="/solutions/synthetic-qa-agents" className="hover:text-primary transition-colors italic">QA Agents</Link></li>
              <li><Link href="/solutions/pmf-velocity-tracking" className="hover:text-primary transition-colors italic">PMF Tracking</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
