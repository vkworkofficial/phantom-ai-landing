"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Loader2, Search, Terminal, Activity, Zap, CheckCircle2, Cpu, Layers, ArrowUp, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Modular Component Library
import { Reveal, Button, Input, Badge } from "@/components/landing/Primitives";
import { HeroTerminalAnimation } from "@/components/landing/Terminal";
import { ArchitectureStack } from "@/components/landing/Features";
import { CustomizeGhost } from "@/components/landing/Customizer";
import { IssueSlider } from "@/components/landing/SocialProof";
import { SeanceTeaser } from "@/components/landing/SeanceTeaser";


export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showJumpscare, setShowJumpscare] = useState(false);
  const [toast, setToast] = useState<{msg: string, type: "success" | "error" | "info"} | null>(null);
  const [showCmdk, setShowCmdk] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
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

  // Back to top scroll detection
  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const playJumpscareSound = () => {
    try {
      const scream = new Audio("/fnaf.mp3");
      scream.volume = 1.0;
      scream.play().then(() => {
        setTimeout(() => {
          scream.pause();
          scream.currentTime = 0;
        }, 900);
      }).catch(e => console.error("Audio playback locked", e));
    } catch (e) { console.error("Audio playback locked", e); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Client-side regex check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      showToast("Please enter a valid email address.", "error");
      return;
    }

    const honeypot = (document.getElementById("company_url") as HTMLInputElement)?.value;

    setLoading(true);

    try {
      const res = await fetch("/api/waitlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, company_url: honeypot }) });
      const data = await res.json();
      if (res.ok) {
        setShowJumpscare(true);
        playJumpscareSound();
        setTimeout(() => setShowJumpscare(false), 900);
        showToast("You're in. We'll haunt your inbox soon. 👻", "success");
        setEmail("");
      } else showToast(data.error || "Something went wrong.", "error");
    } catch { showToast("Network error. Please try again.", "error"); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans selection:bg-primary/30 relative overflow-hidden">
      
      {/* Jumpscare Overlay */}
      {showJumpscare && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none mix-blend-lighten overflow-hidden bg-[#0d1117]">
          <div className="absolute inset-0 bg-primary opacity-10 animate-[glitch_0.1s_ease-in-out_infinite]" />
          <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 3, opacity: 0.8 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: "easeIn" }} className="w-[80vw] h-[80vh] flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full animate-[glitch_0.05s_ease-in-out_infinite]" style={{ filter: "drop-shadow(0 0 50px #ea580c)" }}>
              <path d="M 23 50 C 23 20, 77 20, 77 50 L 77 90 L 68 81 L 59 90 L 50 81 L 41 90 L 32 81 L 23 90 Z" fill="#ea580c" />
              <path d="M 35 42 L 45 48" stroke="#0d1117" strokeWidth="4" strokeLinecap="round" /><path d="M 45 42 L 35 48" stroke="#0d1117" strokeWidth="4" strokeLinecap="round" />
              <path d="M 55 42 L 65 48" stroke="#0d1117" strokeWidth="4" strokeLinecap="round" /><path d="M 65 42 L 55 48" stroke="#0d1117" strokeWidth="4" strokeLinecap="round" />
              <path d="M 42 60 L 45 56 L 48 60 L 51 56 L 54 60 L 57 56" stroke="#0d1117" strokeWidth="3" fill="none" />
            </svg>
          </motion.div>
        </div>
      )}

      <header className="sticky top-0 z-40 bg-[#010409]/95 backdrop-blur-sm border-b border-[#30363d]">
        <div className="max-w-[1280px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5">
              <svg width="28" height="28" viewBox="0 0 100 100" fill="none" className="mb-0.5"><path d="M 23 50 C 23 20, 77 20, 77 50 L 77 90 L 68 81 L 59 90 L 50 81 L 41 90 L 32 81 L 23 90 Z" fill="hsl(var(--primary))" /><circle cx="39" cy="45" r="5" fill="hsl(var(--background))" /><circle cx="61" cy="45" r="5" fill="hsl(var(--background))" /></svg>
              <span className="font-bold text-white tracking-tighter text-[22px]">Phantom AI</span>
            </div>
            <div className="hidden md:flex items-center gap-2 border border-[#3fb950]/30 bg-[#3fb950]/5 px-2.5 py-1 rounded-full text-[11px] font-mono text-[#3fb950] tracking-wide">
                <span className="relative flex h-1.5 w-1.5 shadow-[0_0_8px_#3fb950]"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3fb950] opacity-75" /><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#3fb950]" /></span>
                Systems Operational
            </div>
            <a href="/docs" className="hidden md:block text-[13px] font-medium text-[#c9d1d9] hover:text-white transition-colors ml-4">Substrate Protocol</a>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowCmdk(true)} className="hidden md:flex items-center gap-3 text-[13px] text-[#8b949e] border border-[#30363d] bg-[#161b22] px-3 py-1.5 rounded-md hover:border-[#484f58] transition-colors"><Search className="w-3.5 h-3.5" /> <span>Search...</span> <kbd className="font-mono bg-[#0d1117] px-1.5 py-0.5 rounded border border-[#30363d] text-[10px]">⌘K</kbd></button>
            <Button primary onClick={() => document.getElementById("waitlist-input")?.focus()}>Summon your ghosts</Button>
          </div>
        </div>
      </header>

      <main className="flex flex-col items-center w-full">
        {/* HERO */}
        <section id="hero" className="w-full max-w-[1280px] mx-auto px-4 pt-24 pb-20 flex flex-col md:flex-row items-center gap-12 relative">
          <div className="flex-1 text-left z-10 w-full">
            <Reveal delay={0.1}><Badge className="mb-6 border-primary/30 text-primary" showDot>Private Beta — we're still slightly haunted ourselves</Badge></Reveal>
            <Reveal delay={0.2}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
                Achieve <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">PMF Velocity</span> <br className="hidden md:block" /><span className="text-[#8b949e]">100x faster.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-xl md:text-2xl text-[#8b949e] max-w-3xl font-normal leading-relaxed mb-10">
                Stop begging strangers to validate your broken MVP. Hook the <strong className="text-white font-semibold">Phantom Engine</strong> into your CI/CD and spawn infinite <strong className="text-white font-semibold">AI Ghosts</strong> that think, click, and rage-quit exactly like your Target Group. Don&apos;t launch blind and die.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="w-full max-w-md">
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 relative">
                  <input type="text" name="company_url" id="company_url" className="hidden" tabIndex={-1} autoComplete="off" />
                  <Input id="waitlist-input" type="email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} placeholder="you@company.com" required className="h-10 text-[15px] px-3 w-full flex-1" disabled={loading} />
                  <Button primary type="submit" className="h-10 px-6 shrink-0 text-[15px] group" disabled={loading}>{loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Join waitlist"}</Button>
                </form>
                <div className="mt-6">
                  <p className="text-[12px] text-[#484f58] mb-3">Trusted by startups at</p>
                  <div className="flex items-center gap-6 opacity-60 hover:opacity-100 transition-opacity duration-300">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Y_Combinator_logo.svg" alt="Y Combinator" className="h-5 w-auto" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Andreessen_Horowitz_logo_stacked.svg" alt="a16z" className="h-7 w-auto invert brightness-0 saturate-100" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/34/Infoedgelogo.png" alt="InfoEdge" className="h-5 w-auto invert brightness-0 saturate-100" />
                  </div>
                </div>
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

        {/* REDDIT */}
        <Reveal><div className="w-full max-w-[1280px] mx-auto px-4 mb-4 mt-6"><h2 className="text-sm font-semibold text-[#484f58] uppercase tracking-wider mb-2">The problem is real. These founders lived it.</h2></div></Reveal>
        <IssueSlider />

        {/* ARCHITECTURE */}
        <ArchitectureStack />

        {/* GHOST CUSTOMIZER */}
        <Reveal><CustomizeGhost /></Reveal>

        {/* EMPATHY GAP */}
        <section className="w-full max-w-[1280px] mx-auto px-4 py-24">
          <Reveal>
            <div className="mb-8">
              <h2 className="text-3xl font-semibold text-white mb-3">The Empathy Gap: Why Startups Die</h2>
              <p className="text-[#8b949e]">The #1 reason startups fail is building the wrong thing. Achieving PMF requires relentless iteration, but traditional feedback loops are completely broken.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
            <Reveal delay={0.1}>
              <div className="h-full rounded-md border border-[#30363d] bg-[#0d1117] p-5 hover:border-primary/40 hover:shadow-[0_0_30px_-5px_rgba(234,88,12,0.15)] transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-3">
                  <Activity className="w-5 h-5 text-[#8b949e] group-hover:text-primary transition-colors duration-300" />
                  <h3 className="font-semibold text-white text-[16px]">Beta Testing is a Myth</h3>
                </div>
                <p className="text-sm text-[#8b949e]">Recruiting true Target Group (TG) users that match your ideal persona is nearly impossible. Busy professionals won&apos;t waste their high hourly rate for a $20 Amazon gift card. You end up testing with professional &quot;beta testers&quot; who aren&apos;t your customers.</p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="h-full rounded-md border border-[#30363d] bg-[#0d1117] p-5 hover:border-primary/40 hover:shadow-[0_0_30px_-5px_rgba(234,88,12,0.15)] transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-3">
                  <Zap className="w-5 h-5 text-[#8b949e] group-hover:text-primary transition-colors duration-300" />
                  <h3 className="font-semibold text-white text-[16px]">Load Scripts Lack Empathy</h3>
                </div>
                <p className="text-sm text-[#8b949e]">Writing Puppeteer or Selenium tests ensures your database doesn&apos;t crash under load, but bots don&apos;t feel frustration. They don&apos;t get confused by dark patterns or rage-quit when a button is 20px too far to the left.</p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="h-full rounded-md border border-[#30363d] bg-[#0d1117] p-5 hover:border-primary/40 hover:shadow-[0_0_30px_-5px_rgba(234,88,12,0.15)] transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-3">
                  <Layers className="w-5 h-5 text-[#8b949e] group-hover:text-primary transition-colors duration-300" />
                  <h3 className="font-semibold text-white text-[16px]">Focus Groups are Too Slow</h3>
                </div>
                <p className="text-sm text-[#8b949e]">Paying an agency $10,000 for a 3-week B2B focus group destroys PMF velocity. By the time you get the behavior report, your product has already pivoted twice. You need insights in minutes, not months.</p>
              </div>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="h-full rounded-md border border-[#30363d] bg-[#0d1117] p-5 hover:border-primary/40 hover:shadow-[0_0_30px_-5px_rgba(234,88,12,0.15)] transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-3">
                  <Cpu className="w-5 h-5 text-[#8b949e] group-hover:text-primary transition-colors duration-300" />
                  <h3 className="font-semibold text-white text-[16px]">The Synthetic Reality Solution</h3>
                </div>
                <p className="text-sm text-[#8b949e]">Phantom bridges the Empathy Gap. We give you the qualitative depth of a B2B focus group with the speed and scale of a load test. Deploy infinite AI Ghosts that think, click, and fail exactly like your users.</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CI/CD CTA */}
        <section id="cicd" className="w-full border-t border-[#30363d] bg-[#161b22] py-24">
          <div className="max-w-[1280px] mx-auto px-4 flex flex-col lg:flex-row gap-12 items-center text-center lg:text-left justify-center">
            <Reveal>
              <div className="w-full lg:max-w-2xl shrink-0">
                <h2 className="text-4xl font-bold tracking-tight text-white mb-6 leading-tight">The Infrastructure for PMF Velocity.<br /><span className="text-[#8b949e]">Runs securely in your CI/CD.</span></h2>
                <p className="text-lg text-[#8b949e] mb-10 leading-relaxed">Phantom runs inside your existing pipeline. If a PR introduces UX friction above your threshold, the build fails. Behavioral QA becomes as non-negotiable as unit tests.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button primary className="h-12 px-8 text-base" onClick={() => { document.getElementById("waitlist-input")?.focus(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Summon your ghosts</Button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
        
        <SeanceTeaser />
      </main>

      <footer className="w-full border-t border-[#30363d] bg-[#010409] py-12">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-2 text-[#484f58]">
              <svg width="20" height="20" viewBox="0 0 32 32" fill="none" className="opacity-50"><path d="M16 2C10.477 2 6 6.477 6 12v14l3-3 3 3 3-3 3 3 3-3 3 3V12c0-5.523-4.477-10-10-10z" fill="currentColor" /><circle cx="12" cy="13" r="2" fill="hsl(var(--background))" /><circle cx="20" cy="13" r="2" fill="hsl(var(--background))" /></svg>
              <span className="text-[12px]">&copy; 2026 Phantom AI &mdash; Built by ghosts, for ghosts. &#9760;&#65039;</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://twitter.com/tryphantom" target="_blank" rel="noopener noreferrer" className="text-[#484f58] hover:text-[#c9d1d9] transition-colors text-xs flex items-center gap-1">Twitter/X <ExternalLink className="w-3 h-3" /></a>
              <a href="https://github.com/phantom-ai" target="_blank" rel="noopener noreferrer" className="text-[#484f58] hover:text-[#c9d1d9] transition-colors text-xs flex items-center gap-1">GitHub <ExternalLink className="w-3 h-3" /></a>
              <span className="text-[#30363d]">|</span>
              <a href="#" className="text-[#484f58] hover:text-[#c9d1d9] transition-colors text-xs">Privacy</a>
              <a href="#" className="text-[#484f58] hover:text-[#c9d1d9] transition-colors text-xs">Terms</a>
            </div>
          </div>
          <p className="text-[11px] text-[#30363d] italic text-center md:text-left">Made with insomnia and an unreasonable amount of espresso.</p>
        </div>
      </footer>

      {/* GLOBAL TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }} className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-md border shadow-2xl ${toast.type === "success" ? "bg-[#161b22] border-[#3fb950]/40 text-[#3fb950]" : toast.type === "error" ? "bg-[#161b22] border-[#ff7b72]/40 text-[#ff7b72]" : "bg-[#161b22] border-[#30363d] text-[#c9d1d9]"}`}>
            {toast.type === "success" ? <CheckCircle2 className="w-5 h-5" /> : toast.type === "error" ? <Zap className="w-5 h-5" /> : <Activity className="w-5 h-5" />}
            <span className="text-sm font-medium">{toast.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* COMMAND PALETTE (CMD+K) */}
      <AnimatePresence>
        {showCmdk && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowCmdk(false)} className="fixed inset-0 z-[110] bg-[#010409]/80 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: -20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98, y: -10 }} transition={{ duration: 0.15, ease: "easeOut" }} className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[120] w-full max-w-xl bg-[#0d1117] border border-[#30363d] rounded-xl shadow-[0_0_80px_rgba(0,0,0,0.6)] overflow-hidden">
              <div className="flex items-center px-4 border-b border-[#30363d] bg-[#161b22]">
                <Search className="w-5 h-5 text-[#8b949e]" />
                <input autoFocus placeholder="Type a command or search..." className="w-full bg-transparent border-none text-[#c9d1d9] px-4 py-4 text-[15px] focus:outline-none focus:ring-0 placeholder:text-[#484f58]" />
                <kbd className="font-mono text-[10px] text-[#c9d1d9] bg-[#0d1117] px-2 py-1 rounded border border-[#30363d] shadow-sm">ESC</kbd>
              </div>
              <div className="max-h-[350px] overflow-y-auto p-2">
                <div className="px-4 py-2 mt-1 text-[11px] font-semibold text-[#8b949e] uppercase tracking-wider font-mono">Quick Actions</div>
                <button onClick={() => { setShowCmdk(false); document.getElementById("waitlist-input")?.focus(); document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" }); }} className="w-full text-left flex items-center justify-between px-4 py-3 rounded-md hover:bg-[#21262d] text-[#c9d1d9] hover:text-white transition-colors group"><div className="flex items-center gap-3"><Zap className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" /> Join Private Beta Waitlist</div><kbd className="hidden group-hover:block font-mono text-[10px] text-[#8b949e]">Return</kbd></button>
                <button onClick={() => { setShowCmdk(false); navigator.clipboard.writeText("https://tryphantom.dev"); showToast("URL copied to clipboard", "success"); }} className="w-full text-left flex items-center justify-between px-4 py-3 rounded-md hover:bg-[#21262d] text-[#c9d1d9] hover:text-white transition-colors group"><div className="flex items-center gap-3"><Layers className="w-4 h-4 text-[#a5d6ff] group-hover:scale-110 transition-transform" /> Copy Share Link</div><kbd className="hidden group-hover:block font-mono text-[10px] text-[#8b949e]">Return</kbd></button>
                
                <div className="px-4 py-2 mt-2 text-[11px] font-semibold text-[#8b949e] uppercase tracking-wider font-mono">Navigation</div>
                <button onClick={() => { setShowCmdk(false); document.getElementById("cicd")?.scrollIntoView({ behavior: "smooth" }); }} className="w-full text-left flex items-center px-4 py-3 rounded-md hover:bg-[#21262d] text-[#c9d1d9] hover:text-white transition-colors"><div className="flex items-center gap-3"><Terminal className="w-4 h-4 text-[#d2a8ff]" /> View CI/CD Integration</div></button>
                <button onClick={() => { setShowCmdk(false); document.getElementById("customizer")?.scrollIntoView({ behavior: "smooth" }); }} className="w-full text-left flex items-center px-4 py-3 rounded-md hover:bg-[#21262d] text-[#c9d1d9] hover:text-white transition-colors"><div className="flex items-center gap-3"><Cpu className="w-4 h-4 text-[#3fb950]" /> Configure Agent Persona</div></button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* BACK TO TOP BUTTON */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            transition={{ type: "spring", bounce: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-[#161b22] border border-[#30363d] flex items-center justify-center text-[#8b949e] hover:text-primary hover:border-primary/40 hover:shadow-[0_0_20px_-5px_rgba(234,88,12,0.3)] transition-all duration-300 group"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5 group-hover:animate-bounce" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

