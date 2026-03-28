"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Terminal, Activity, Zap, CheckCircle2, Shield, Search, Loader2, Cpu, GitBranch, Layers, Check, Copy, ArrowUp, ExternalLink } from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ */
/*  REVEAL                                             */
/* ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ */

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} initial={{ y: 30, opacity: 0 }} animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }} transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}>
      {children}
    </motion.div>
  );
}

/* ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ */
/*  REDDIT DATA                                        */
/* ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ */

const REDDIT_COMMENTS = [
  { user: "danielmtl", sub: "r/startups", text: "We posted everywhere ΓÇö Reddit, Indie Hackers, Product Hunt. Got 200 signups. Exactly 6 people actually used the product. Two of them were my co-founder's mom.", upvotes: 1847, time: "2 years ago" },
  { user: "jmhacks_", sub: "r/SaaS", text: "Beta testing is the tax you pay for building in a vacuum. We recruited 50 testers, 4 gave feedback, and 3 said 'looks nice'. We shipped a broken auth flow to 2000 real users a week later.", upvotes: 2312, time: "1 year ago" },
  { user: "rachelnguyen92", sub: "r/QualityAssurance", text: "Manual QA is the single biggest bottleneck in our release cycle. We ship code in hours but testing every edge case takes literal days. Nobody wants to admit it but most startups just... don't test.", upvotes: 3891, time: "8 months ago" },
  { user: "alexk_dev", sub: "r/startups", text: "I'm so tired of tweeting 'looking for beta testers!' into the void. Everyone ignores it. The people who DO sign up never open the app. Is there literally any way to automate this?", upvotes: 1104, time: "3 years ago" },
  { user: "supriya_builds", sub: "r/Entrepreneur", text: "The silence after launching is genuinely terrifying. You have no idea if users hate it, can't figure it out, or just never came back after signup. We needed 100 testers and got 0 useful reports.", upvotes: 688, time: "1 month ago" },
];

/* ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ */
/*  PRIMITIVES                                         */
/* ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ */

function Button({ children, primary = false, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { primary?: boolean }) {
  return (
    <button className={`px-3 py-1.5 text-sm font-semibold rounded-md border transition-all duration-300 ${primary ? "bg-primary text-white border-primary hover:bg-primary/90 shadow-[0_0_15px_-3px_rgba(234,88,12,0.4)] hover:shadow-[0_0_25px_-5px_rgba(234,88,12,0.6)]" : "bg-[#21262d] text-[#c9d1d9] border-[#30363d] hover:bg-[#30363d] hover:border-[#8b949e]"} ${className}`} {...props}>{children}</button>
  );
}

function Input({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-sm text-[#c9d1d9] placeholder:text-[#8b949e] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-inner transition-all duration-300 ${className}`} {...props} />;
}

function Badge({ children, className = "", showDot = false }: { children: React.ReactNode; className?: string; showDot?: boolean }) {
  return <span className={`inline-flex items-center rounded-full border border-[#30363d] bg-transparent px-2.5 py-0.5 text-xs font-medium text-[#8b949e] ${className}`}>{showDot && <span className="w-1.5 h-1.5 rounded-full bg-[#e3b341] animate-[pulse_2s_ease-in-out_infinite] mr-2" />}{children}</span>;
}

/* ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ */
/*  HERO TERMINAL ΓÇö DEEP TECH OUTPUT                   */
/* ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ */

function HeroTerminalAnimation() {
  const lines = [
    { type: "sys", text: "[core] Bootstrapping Phantom Engine v4.2.0 (Chromium 131)" },
    { type: "sys", text: "[core] Loading behavioral heuristic model..." },
    { type: "sys", text: "[orchestrator] summoning 500 ghost instances across 12 geos..." },
    { type: "success", text: "[orchestrator] Agent pool ready ΓÇö 500/500 browsers instrumented" },
    { type: "sys", text: "[dom-observer] Attaching MutationObserver + IntersectionObserver to 2,847 DOM nodes" },
    { type: "warn", text: "[agent-017] Friction detected: /signup ΓÇö CLS 0.42, interaction-to-next-paint: 1,847ms" },
    { type: "err", text: "[agent-017] RAGE_CLICK on <button#submit> ΓÇö 7 clicks in 2.1s, no state change" },
    { type: "sys", text: "[consensus] Dispatching 49 ghost seance instances to reproduce..." },
    { type: "success", text: "[consensus] 47/49 agents confirmed ΓÇö friction score: 0.91 (critical)" },
    { type: "success", text: "[reporter] Auto-filed: GH-1847 with session replay + DOM diff attached" },
  ];

  const [visibleIdx, setVisibleIdx] = useState(0);

  useEffect(() => {
    if (visibleIdx < lines.length) {
      const wait = visibleIdx === 6 ? 1200 : visibleIdx === 7 ? 800 : 400;
      const timer = setTimeout(() => setVisibleIdx((prev) => prev + 1), wait);
      return () => clearTimeout(timer);
    }
  }, [visibleIdx, lines.length]);

  const colorMap: Record<string, string> = { sys: "text-[#8b949e]", success: "text-[#3fb950]", warn: "text-[#d2a8ff]", err: "text-[#ff7b72]" };

  return (
    <div className="w-full md:w-[620px] shrink-0 border border-[#30363d] rounded-md bg-[#161b22] shadow-[0_0_80px_-20px_rgba(234,88,12,0.12)] relative overflow-hidden group hover:border-[#8b949e] transition-colors duration-300">
      <div className="border-b border-[#30363d] bg-[#010409] px-4 py-3 flex items-center justify-between">
        <div className="flex gap-2"><div className="w-3 h-3 rounded-full bg-[#ff5f56]" /><div className="w-3 h-3 rounded-full bg-[#ffbd2e]" /><div className="w-3 h-3 rounded-full bg-[#27c93f]" /></div>
        <span className="text-xs font-mono text-[#484f58]">phantom run --agents=500 --consensus=true</span>
      </div>
      <div className="p-4 space-y-2 font-mono text-[12px] min-h-[300px]">
        {lines.slice(0, visibleIdx).map((l, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className={`flex items-start gap-2 ${colorMap[l.type] || "text-[#c9d1d9]"}`}>
            <span className="text-[#484f58] shrink-0 select-none">ΓÇ║</span><span>{l.text}</span>
          </motion.div>
        ))}
        {visibleIdx < lines.length && (<div className="flex items-start gap-2"><span className="text-[#484f58] shrink-0">ΓÇ║</span><span className="inline-block w-2 h-4 bg-primary animate-pulse align-middle" /></div>)}
        {visibleIdx >= lines.length && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 pt-3 border-t border-[#30363d]">
            <div className="flex justify-between text-xs text-[#8b949e] mb-1.5"><span>Multi-agent consensus verification</span><span className="text-primary font-semibold">47/49 confirmed</span></div>
            <div className="w-full bg-[#21262d] rounded-full h-1.5 overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: "96%" }} transition={{ duration: 2, ease: "easeOut" }} className="bg-primary h-full rounded-full" /></div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ */
/*  ANIMATED CODE SNIPPET                              */
/* ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ */

function AnimatedCodeSnippet() {
  const codeLines = [
    "name: Phantom UX S├⌐ance",
    "",
    "on:",
    "  pull_request:",
    "    types: [opened, synchronize]",
    "",
    "jobs:",
    "  haunt:",
    "    runs-on: ubuntu-latest",
    "    steps:",
    "      - uses: actions/checkout@v4",
    "      ",
    "      - name: Summon Ghosts",
    "        uses: phantom-ai/action@v2",
    "        with:",
    "          ghosts: 500",
    "          seance-consensus: 0.85",
    "          behavioral-model: phantom-core-v4",
    "          fail-on-friction: \">0.7\"",
    '          personas: "first-timer, power-user"',
  ];

  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setVisibleLines((prev) => (prev < codeLines.length ? prev + 1 : prev)), 150);
    return () => clearInterval(interval);
  }, [codeLines.length]);

  return (
    <div className="w-full rounded-md border border-[#30363d] bg-[#0d1117] overflow-hidden hover:border-[#8b949e] transition-colors duration-300">
      <div className="flex items-center px-4 py-2 border-b border-[#30363d] bg-[#161b22]"><div className="text-xs text-[#8b949e] font-mono select-none">.github/workflows/phantom.yml</div></div>
      <div className="p-4 overflow-x-auto min-h-[320px] md:min-h-[380px]">
        <pre className="text-[13px] leading-relaxed font-mono"><code>
          {codeLines.slice(0, visibleLines).map((line, i) => {
            let color = "text-[#c9d1d9]";
            if (line.includes("uses:")) color = "text-[#7ee787]";
            else if (line.includes("name:") || line.includes("behavioral-model")) color = "text-[#a5d6ff]";
            else if (line.includes("with:") || line.includes("on:") || line.includes("fail-on")) color = "text-[#ff7b72]";
            return <span key={i} className={`block whitespace-pre ${color}`}>{line || " "}</span>;
          })}
          {visibleLines < codeLines.length && <span className="inline-block w-2 h-4 bg-primary animate-pulse align-middle ml-1" />}
        </code></pre>
      </div>
    </div>
  );
}

/* ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ */
/*  ARCHITECTURE LAYERS                                */
/* ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ */

function ArchitectureStack() {
  const layers = [
    { name: "Phantom Core Engine", desc: "Proprietary behavioral model trained on anonymized real user sessions across SaaS, e-commerce, and fintech", color: "border-primary/60 bg-primary/5", icon: <Cpu className="w-4 h-4 text-primary" /> },
    { name: "Headless Browser Orchestrator", desc: "Chromium pool with MutationObserver, IntersectionObserver, and PerformanceObserver instrumentation per agent", color: "border-[#3fb950]/40 bg-[#3fb950]/5", icon: <Layers className="w-4 h-4 text-[#3fb950]" /> },
    { name: "Multi-Agent Seance Consensus", desc: "49-ghost verification seance ΓÇö no bug ships unless consensus threshold ΓëÑ 0.85", color: "border-[#a5d6ff]/40 bg-[#a5d6ff]/5", icon: <GitBranch className="w-4 h-4 text-[#a5d6ff]" /> },
    { name: "DOM Graph Analyzer", desc: "Real-time subtree diffing, accessibility tree validation, CLS/INP/LCP telemetry", color: "border-[#d2a8ff]/40 bg-[#d2a8ff]/5", icon: <Search className="w-4 h-4 text-[#d2a8ff]" /> },
    { name: "Session Replay & Reporter", desc: "Lossless DOM-level recordings with annotated friction heatmaps, auto-filed to GitHub/Linear", color: "border-[#8b949e]/40 bg-[#8b949e]/10", icon: <Activity className="w-4 h-4 text-[#8b949e]" /> },
  ];

  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 py-24 border-t border-[#30363d]">
      <Reveal>
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-semibold text-white mb-3">Under the hood</h2>
          <p className="text-[#8b949e]">This isn&apos;t a prompt wrapper. It&apos;s a distributed browser infrastructure with a proprietary behavioral engine trained on millions of real user sessions.</p>
        </div>
      </Reveal>
      <div className="space-y-3">
        {layers.map((layer, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div className={`flex items-start gap-4 p-5 rounded-md border ${layer.color} hover:scale-[1.01] transition-transform duration-200`}>
              <div className="mt-0.5 shrink-0">{layer.icon}</div>
              <div>
                <h3 className="font-semibold text-white text-sm mb-1">{layer.name}</h3>
                <p className="text-xs text-[#8b949e] leading-relaxed">{layer.desc}</p>
              </div>
              <span className="ml-auto text-[10px] font-mono text-[#484f58] shrink-0 mt-1">L{i}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ */
/*  GHOST CUSTOMIZER                                   */
/* ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ */

function CustomizeGhost() {
  const [techSavvy, setTechSavvy] = useState(30);
  const [patience, setPatience] = useState(40);
  const [chaosMode, setChaosMode] = useState(false);
  const [screenReader, setScreenReader] = useState(false);
  const [gender, setGender] = useState("Any");
  const [age, setAge] = useState("18-24");
  const [location, setLocation] = useState("Global");
  const [device, setDevice] = useState("Desktop");
  const [network, setNetwork] = useState("Fast (5G)");
  const [language, setLanguage] = useState("English");
  const [copied, setCopied] = useState(false);
  const [blinking, setBlinking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => { setBlinking(true); setTimeout(() => setBlinking(false), 200); }, 3000);
    return () => clearInterval(interval);
  }, []);

  const personaName = chaosMode ? "Rage-Tester (Chaos Mode)" : techSavvy > 70 ? patience < 40 ? "Impatient Power User" : "Methodical Engineer" : techSavvy < 30 ? patience > 70 ? "Patient First-Timer" : "Frustrated Novice" : screenReader ? "Blindfolded User (A11y)" : device === "Mobile" ? "Mobile-First Scroller" : "Average Explorer";

  const sel = "w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-sm text-[#c9d1d9] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-inner appearance-none cursor-pointer";

  return (
    <section id="customizer" className="w-full max-w-[1280px] mx-auto px-4 py-24 border-t border-[#30363d]">
      <div className="mb-8 flex flex-col items-center text-center">
        <h2 className="text-3xl font-semibold text-white mb-3">Define your agent persona</h2>
        <p className="text-[#8b949e] max-w-xl">Each agent runs an independent headless Chromium instance with its own behavioral profile. Configure the heuristic weights and environment constraints below.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch bg-[#161b22] border border-[#30363d] rounded-md overflow-hidden relative hover:border-[#484f58] transition-colors duration-300">
        {/* Controls */}
        <div className="lg:col-span-5 p-6 md:p-8 space-y-5 border-b lg:border-b-0 lg:border-r border-[#30363d]">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-xs font-semibold text-[#8b949e] block mb-2 uppercase tracking-wide">Gender</label><motion.select whileTap={{ scale: 0.97 }} value={gender} onChange={(e) => setGender(e.target.value)} className={sel}><option>Any</option><option>Male</option><option>Female</option><option>Non-binary</option></motion.select></div>
            <div><label className="text-xs font-semibold text-[#8b949e] block mb-2 uppercase tracking-wide">Age Range</label><motion.select whileTap={{ scale: 0.97 }} value={age} onChange={(e) => setAge(e.target.value)} className={sel}><option>18-24</option><option>25-34</option><option>35-44</option><option>45-54</option><option>55+</option></motion.select></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-xs font-semibold text-[#8b949e] block mb-2 uppercase tracking-wide">Geo Region</label><motion.select whileTap={{ scale: 0.97 }} value={location} onChange={(e) => setLocation(e.target.value)} className={sel}><option>Global</option><option>US / Canada</option><option>EU / UK</option><option>APAC</option><option>LATAM</option><option>MEA</option></motion.select></div>
            <div><label className="text-xs font-semibold text-[#8b949e] block mb-2 uppercase tracking-wide">Device</label><motion.select whileTap={{ scale: 0.97 }} value={device} onChange={(e) => setDevice(e.target.value)} className={sel}><option>Desktop</option><option>Mobile</option><option>Tablet</option></motion.select></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-xs font-semibold text-[#8b949e] block mb-2 uppercase tracking-wide">Network</label><motion.select whileTap={{ scale: 0.97 }} value={network} onChange={(e) => setNetwork(e.target.value)} className={sel}><option>Fast (5G)</option><option>Moderate (4G)</option><option>Slow (3G)</option><option>Offline-first</option></motion.select></div>
            <div><label className="text-xs font-semibold text-[#8b949e] block mb-2 uppercase tracking-wide">Locale</label><motion.select whileTap={{ scale: 0.97 }} value={language} onChange={(e) => setLanguage(e.target.value)} className={sel}><option>English</option><option>Spanish</option><option>Japanese</option><option>Arabic (RTL)</option><option>Hindi</option><option>Portuguese</option></motion.select></div>
          </div>
          <div className="pt-2">
            <div className="flex justify-between mb-2"><label className="text-sm font-semibold text-[#c9d1d9]">Heuristic: Tech Savviness</label><span className="text-sm text-[#8b949e] font-mono">{techSavvy}%</span></div>
            <motion.input whileTap={{ scale: 0.98 }} type="range" min="0" max="100" value={techSavvy} onChange={(e) => setTechSavvy(parseInt(e.target.value))} className="w-full h-2 bg-[#0d1117] rounded-lg appearance-none cursor-pointer border border-[#30363d] accent-primary" />
          </div>
          <div>
            <div className="flex justify-between mb-2"><label className="text-sm font-semibold text-[#c9d1d9]">Heuristic: Patience Threshold</label><span className="text-sm text-[#8b949e] font-mono">{patience}%</span></div>
            <motion.input whileTap={{ scale: 0.98 }} type="range" min="0" max="100" value={patience} onChange={(e) => setPatience(parseInt(e.target.value))} className="w-full h-2 bg-[#0d1117] rounded-lg appearance-none cursor-pointer border border-[#30363d] accent-primary" />
          </div>
          <div className="space-y-3">
            <ToggleRow label="Rage-Testing Mode" description="Agent will aggressively submit malformed forms, rage-click buttons, and attempt XSS injection." active={chaosMode} onToggle={() => setChaosMode(!chaosMode)} />
            <ToggleRow label="Blindfolded Mode (A11y)" description="Agent relies strictly on screen reader tree (WCAG AA). Fails if focus traps or missing ARIA tags exist." active={screenReader} onToggle={() => setScreenReader(!screenReader)} />
          </div>
        </div>

        {/* Ghost SVG */}
        <div className="lg:col-span-3 bg-[#0d1117] border-b lg:border-b-0 lg:border-r border-[#30363d] flex flex-col items-center justify-center p-8 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none animate-[glow-pulse_4s_ease-in-out_infinite]" />
          <div className={`relative w-32 h-32 mb-4 animate-[float_4s_ease-in-out_infinite] ${chaosMode ? "animate-[glitch_0.3s_ease-in-out_infinite]" : ""}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_25px_rgba(234,88,12,0.2)] transition-all duration-500">
              {/* Base Ghost Shape */}
              <path d="M 23 50 C 23 20, 77 20, 77 50 L 77 90 L 68 81 L 59 90 L 50 81 L 41 90 L 32 81 L 23 90 Z" fill={chaosMode ? "#ea580c" : "#c9d1d9"} className="transition-all duration-300 ease-out" />
              
              {/* Eyes & Glasses */}
              {chaosMode ? (
                 <g><path d="M 35 42 L 45 48" stroke="#0d1117" strokeWidth="3" strokeLinecap="round" /><path d="M 45 42 L 35 48" stroke="#0d1117" strokeWidth="3" strokeLinecap="round" /><path d="M 55 42 L 65 48" stroke="#0d1117" strokeWidth="3" strokeLinecap="round" /><path d="M 65 42 L 55 48" stroke="#0d1117" strokeWidth="3" strokeLinecap="round" /></g>
              ) : screenReader ? (
                 <g>
                   {/* Blindfold */}
                   <path d="M 16 43 L 84 45 L 83 53 L 17 51 Z" fill="#161b22" />
                   <path d="M 12 45 L 18 51 M 88 45 L 82 53" stroke="#161b22" strokeWidth="3" strokeLinecap="round" />
                   <path d="M 16 43 C 35 40, 65 48, 83 53" stroke="#0d1117" strokeWidth="1" fill="none" />
                 </g>
              ) : techSavvy > 70 ? (
                 <g>
                   {/* VR Headset / Cyber Visor */}
                   <rect x="28" y="38" width="44" height="15" rx="4" fill="#0d1117" stroke={chaosMode ? "#ea580c" : "#3fb950"} strokeWidth="2" style={{ filter: `drop-shadow(0px 0px 8px ${chaosMode ? "#ea580c" : "#3fb950"})` }} />
                   <path d="M 33 45.5 L 67 45.5" stroke={chaosMode ? "#ea580c" : "#3fb950"} strokeWidth="2" strokeDasharray="4 2" className="animate-pulse" />
                   <path d="M 23 45 L 28 45 M 72 45 L 77 45" stroke="#0d1117" strokeWidth="4" />
                 </g>
              ) : techSavvy < 30 ? (
                 <g>
                   {/* Confused / Oval eyes with Sweat Drop */}
                   <ellipse cx="39" cy="45" rx="4" ry="6" fill="#0d1117" />
                   <ellipse cx="61" cy="45" rx="4" ry="6" fill="#0d1117" />
                   <circle cx="39" cy="43" r="1.5" fill="white" opacity="0.8" />
                   <circle cx="61" cy="43" r="1.5" fill="white" opacity="0.8" />
                   {/* Sweat Drop */}
                   <path d="M 73 35 C 73 42, 80 42, 80 35 C 80 28, 76.5 25, 76.5 25 C 76.5 25, 73 28, 73 35 Z" fill="#79c0ff" opacity="0.8" className="animate-bounce" />
                 </g>
              ) : patience > 80 ? (
                 <g>
                   {/* Happy / Cute Anime Eyes */}
                   <circle cx="39" cy="45" r="6" fill="#0d1117" />
                   <circle cx="61" cy="45" r="6" fill="#0d1117" />
                   <circle cx="37" cy="43" r="2.5" fill="white" />
                   <circle cx="59" cy="43" r="2.5" fill="white" />
                   <circle cx="41" cy="47" r="1" fill="white" opacity="0.5" />
                   <circle cx="63" cy="47" r="1" fill="white" opacity="0.5" />
                 </g>
              ) : patience < 40 ? (
                 <g>
                   {/* Angry Eyes */}
                   <path d="M 31 40 L 45 45 L 45 48 L 31 46 Z" fill="#0d1117" />
                   <path d="M 69 40 L 55 45 L 55 48 L 69 46 Z" fill="#0d1117" />
                   <circle cx="39" cy="46" r="2" fill="#ea580c" style={{ filter: "drop-shadow(0px 0px 4px #ea580c)" }} />
                   <circle cx="61" cy="46" r="2" fill="#ea580c" style={{ filter: "drop-shadow(0px 0px 4px #ea580c)" }} />
                 </g>
              ) : blinking ? (
                 <g>
                   <rect x="34" y="44" width="10" height="2" fill="#0d1117" rx="1" />
                   <rect x="56" y="44" width="10" height="2" fill="#0d1117" rx="1" />
                 </g>
              ) : (
                 <g>
                   {/* Default Eyes */}
                   <circle cx="39" cy="45" r="5" fill="#0d1117" />
                   <circle cx="61" cy="45" r="5" fill="#0d1117" />
                   <circle cx="41" cy="43" r="1.5" fill="white" opacity="0.6" />
                   <circle cx="63" cy="43" r="1.5" fill="white" opacity="0.6" />
                 </g>
              )}

              {/* Mouth */}
              {chaosMode ? (
                 <path d="M 40 60 L 44 55 L 50 62 L 56 55 L 60 60 L 56 65 L 50 58 L 44 65 Z" fill="#0d1117" />
              ) : techSavvy < 30 ? (
                 <path d="M 45 61 Q 50 58 55 61" stroke="#0d1117" strokeWidth="2.5" fill="none" strokeLinecap="round" /> /* Worried */
              ) : patience > 80 ? (
                 <path d="M 44 58 Q 50 65 56 58" stroke="#0d1117" strokeWidth="2.5" fill="none" strokeLinecap="round" /> /* Big Smile */
              ) : patience < 40 ? (
                 <path d="M 45 62 L 55 62" stroke="#0d1117" strokeWidth="2.5" fill="none" strokeLinecap="round" /> /* Flat / Angry */
              ) : (
                 <path d="M 47 60 Q 50 62 53 60" stroke="#0d1117" strokeWidth="2" fill="none" strokeLinecap="round" /> /* Default small smile */
              )}

              {/* Device Props */}
              <motion.g key={"device-"+device} initial={{ scale: 0, y: 10 }} animate={{ scale: 1, y: 0 }} transition={{ type: "spring", bounce: 0.6 }}>
                {device === "Mobile" ? (
                   <g transform="translate(68, 55)">
                     <rect x="0" y="0" width="16" height="26" rx="3" fill="#161b22" stroke="#8b949e" strokeWidth="1" />
                     <rect x="1.5" y="1.5" width="13" height="23" rx="1.5" fill="#0d1117" />
                     {/* Phone Screen glowing if tech savvy */}
                     <rect x="3" y="4" width="10" height="15" fill={techSavvy > 50 ? "#3fb950" : "#30363d"} opacity="0.2" />
                     {techSavvy > 50 && <rect x="4" y="6" width="8" height="2" fill="#3fb950" className="animate-pulse" />}
                     {techSavvy > 50 && <rect x="4" y="10" width="6" height="1.5" fill="#3fb950" />}
                     <circle cx="8" cy="21.5" r="1.5" fill="#30363d" />
                   </g>
                ) : device === "Tablet" ? (
                   <g transform="translate(60, 50)">
                     <rect x="0" y="0" width="30" height="22" rx="2" fill="#161b22" stroke="#8b949e" strokeWidth="1" />
                     <rect x="1.5" y="1.5" width="27" height="19" rx="1" fill="#0d1117" />
                     <rect x="5" y="4" width="20" height="14" fill={techSavvy > 50 ? "#3fb950" : "#30363d"} opacity="0.2" />
                   </g>
                ) : (
                   <g transform="translate(30, 75)">
                     {/* Floating Keyboard for Desktop */}
                     <rect x="0" y="0" width="40" height="12" rx="2" fill="#161b22" stroke="#30363d" strokeWidth="1" transform="skewX(-15)" style={{ filter: "drop-shadow(0px 10px 10px rgba(0,0,0,0.5))" }} />
                     <g transform="skewX(-15)" fill="#30363d">
                       <rect x="4" y="2" width="4" height="3" rx="0.5" /><rect x="10" y="2" width="4" height="3" rx="0.5" /><rect x="16" y="2" width="4" height="3" rx="0.5" /><rect x="22" y="2" width="4" height="3" rx="0.5" /><rect x="28" y="2" width="4" height="3" rx="0.5" />
                       <rect x="6" y="7" width="24" height="3" rx="0.5" fill={chaosMode ? "#ea580c" : "#8b949e"} className={chaosMode ? "animate-pulse" : ""} />
                     </g>
                   </g>
                )}
              </motion.g>

              {/* Gender Props */}
              <motion.g key={"gender-"+gender} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.6 }}>
                {gender === "Female" && (
                   <g>
                     <ellipse cx="32" cy="48" rx="3" ry="1.5" fill="#ff7b72" opacity="0.6" />
                     <ellipse cx="68" cy="48" rx="3" ry="1.5" fill="#ff7b72" opacity="0.6" />
                   </g>
                )}
                {gender === "Male" && !chaosMode && (
                   <g>
                     <path d="M 45 66 L 40 61 L 40 71 Z" fill="#0d1117" />
                     <path d="M 55 66 L 60 61 L 60 71 Z" fill="#0d1117" />
                     <circle cx="50" cy="66" r="2.5" fill="#0d1117" />
                   </g>
                )}
                {gender === "Non-binary" && (
                   <path d="M 50 63 L 52 68 L 57 68 L 53 71 L 54 76 L 50 73 L 46 76 L 47 71 L 43 68 L 48 68 Z" fill="#d2a8ff" opacity="0.5" />
                )}
              </motion.g>

              {/* Age Props */}
              <motion.g key={"age-"+age} initial={{ scale: 0, y: -10 }} animate={{ scale: 1, y: 0 }} transition={{ type: "spring", bounce: 0.5 }}>
                {age === "18-24" && (
                   <g>
                     <path d="M 22 45 C 22 10, 78 10, 78 45" stroke="#30363d" strokeWidth="3" fill="none" />
                     <rect x="18" y="38" width="6" height="14" rx="3" fill="#8b949e" />
                     <rect x="76" y="38" width="6" height="14" rx="3" fill="#8b949e" />
                   </g>
                )}
                {age === "25-34" && (
                   <g transform="translate(13, 55)">
                     <rect x="0" y="0" width="10" height="14" rx="1" fill="#c9d1d9" stroke="#0d1117" strokeWidth="1" />
                     <path d="M 10 3 C 14 3, 14 9, 10 9" fill="none" stroke="#c9d1d9" strokeWidth="1.5" />
                     <path d="M 3 0 Q 5 -4 3 -8" stroke="white" strokeWidth="1" fill="none" className="animate-pulse" />
                     <path d="M 7 0 Q 9 -4 7 -8" stroke="white" strokeWidth="1" fill="none" className="animate-pulse" style={{ animationDelay: "0.2s" }} />
                     <rect x="0" y="5" width="10" height="4" fill="#3fb950" />
                   </g>
                )}
                {age === "35-44" && techSavvy <= 70 && !chaosMode && !screenReader && (
                   <g>
                     <path d="M 32 45 L 46 45 M 54 45 L 68 45 M 46 45 C 48 42, 52 42, 54 45" stroke="#0d1117" strokeWidth="1.5" fill="none" />
                     <rect x="30" y="42" width="16" height="7" rx="1" fill="none" stroke="#0d1117" strokeWidth="1.5" />
                     <rect x="54" y="42" width="16" height="7" rx="1" fill="none" stroke="#0d1117" strokeWidth="1.5" />
                   </g>
                )}
                {age === "45-54" && (
                   <g>
                     <path d="M 47 64 L 53 64 L 51 77 L 50 80 L 49 77 Z" fill="#30363d" />
                     <path d="M 47 64 L 50 67 L 53 64 Z" fill="#161b22" />
                   </g>
                )}
                {age === "55+" && !chaosMode && (
                   <g>
                     <path d="M 30 58 Q 40 55 46 62 Q 50 55 60 58" fill="none" stroke="#8b949e" strokeWidth="2" strokeLinecap="round" />
                     <circle cx="61" cy="45" r="7" fill="none" stroke="#0d1117" strokeWidth="1.5" />
                     <path d="M 68 45 C 75 45, 75 55, 70 60" fill="none" stroke="#e3b341" strokeWidth="1.5" />
                   </g>
                )}
              </motion.g>

              {/* Geo Region */}
              <motion.g key={"loc-"+location} initial={{ scale: 0, x: -10 }} animate={{ scale: 1, x: 0 }} transition={{ type: "spring", bounce: 0.6 }}>
                {location === "Global" && (
                   <g transform="translate(10, 15)">
                     <circle cx="5" cy="5" r="5" fill="#1f6feb" />
                     <path d="M 1 3 Q 5 0 9 3 M 1 7 Q 5 10 9 7 M 5 0 L 5 10 M 0 5 L 10 5" stroke="#a5d6ff" strokeWidth="0.5" fill="none" />
                   </g>
                )}
                {location === "US / Canada" && (
                   <g transform="translate(8, 15)">
                     <path d="M 0 5 Q 5 0 10 5" fill="#d29922"/>
                     <rect x="0" y="6" width="10" height="2" fill="#3fb950" />
                     <rect x="0" y="9" width="10" height="3" fill="#a42e2b" />
                     <path d="M 0 13 Q 5 18 10 13" fill="#d29922"/>
                   </g>
                )}
                {location === "EU / UK" && (
                   <g transform="translate(8, 15)">
                     <path d="M 0 7 A 4 4 0 0 1 8 7 A 4 4 0 0 1 16 7" fill="#8b949e" />
                     <circle cx="4" cy="7" r="4" fill="#8b949e" />
                     <circle cx="12" cy="7" r="4" fill="#8b949e" />
                     <path d="M 4 12 L 2 16 M 8 12 L 6 16 M 12 12 L 10 16" stroke="#a5d6ff" strokeWidth="1" className="animate-pulse" />
                   </g>
                )}
                {location === "APAC" && (
                   <g transform="translate(8, 15)">
                     <path d="M 0 8 Q 6 16 12 8 Z" fill="#c9d1d9" stroke="#0d1117" />
                     <path d="M -2 0 L 4 8 M 2 0 L 6 8" stroke="#d29922" strokeWidth="1" />
                   </g>
                )}
                {location === "LATAM" && (
                   <g transform="translate(15, 18)">
                     <circle cx="0" cy="0" r="4" fill="#e3b341" />
                     <path d="M 0 -6 L 0 -8 M 0 6 L 0 8 M -6 0 L -8 0 M 6 0 L 8 0 M -4 -4 L -6 -6 M 4 4 L 6 6 M 4 -4 L 6 -6 M -4 4 L -6 6" stroke="#e3b341" strokeWidth="1.5" className="animate-spin" style={{transformOrigin: "0 0", animationDuration: "10s"}} />
                   </g>
                )}
                {location === "MEA" && (
                   <g transform="translate(8, 15)">
                     <path d="M 6 14 A 6 6 0 1 0 10 2 A 4.5 4.5 0 1 1 6 14" fill="#d2a8ff" className="animate-pulse" />
                   </g>
                )}
              </motion.g>

              {/* Locale / Language */}
              <motion.g key={"lang-"+language} initial={{ scale: 0, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} transition={{ type: "spring", bounce: 0.6 }}>
                <g transform="translate(70, 7)">
                  <path d="M 0 10 C 0 0, 25 0, 25 10 C 25 20, 15 20, 10 25 L 5 30 L 5 20 C 2 18, 0 15, 0 10 Z" fill="#161b22" stroke="#30363d" strokeWidth="1" />
                  <text x="12.5" y="13" textAnchor="middle" fill="#c9d1d9" fontSize="6" fontWeight="bold">
                    {language === "English" ? "Hi" : language === "Spanish" ? "Hola" : language === "Japanese" ? "πéäπüé" : language === "Arabic (RTL)" ? "╪ú┘ç┘ä╪º" : language === "Hindi" ? "αñ¿αñ«αñ╕αÑìαññαÑç" : "Ol├í"}
                  </text>
                </g>
              </motion.g>

              {/* Network / Status */}
              <motion.g key={"net-"+network} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.6 }}>
                {network === "Offline-first" && (
                   <g transform="translate(80, 45)">
                     <path d="M 0 10 Q 6 4 12 10" fill="none" stroke="#f85149" strokeWidth="1.5" />
                     <path d="M 3 13 Q 6 10 9 13" fill="none" stroke="#f85149" strokeWidth="1.5" />
                     <circle cx="6" cy="16" r="1.5" fill="#f85149" />
                     <path d="M -2 -2 L 14 18" stroke="#f85149" strokeWidth="1.5" />
                   </g>
                )}
                {network === "Slow (3G)" && (
                   <g transform="translate(80, 45)">
                     <circle cx="0" cy="0" r="6" fill="none" stroke="#ff7b72" strokeWidth="2" strokeDasharray="6 4" className="animate-spin" style={{ transformOrigin: "center" }} />
                     <text x="0" y="1" textAnchor="middle" dominantBaseline="middle" fill="#ff7b72" fontSize="5" fontWeight="bold">!</text>
                   </g>
                )}
                {network === "Moderate (4G)" && (
                   <g transform="translate(80, 45)">
                     <rect x="0" y="8" width="2" height="4" fill="#3fb950" />
                     <rect x="3" y="5" width="2" height="7" fill="#3fb950" />
                     <rect x="6" y="2" width="2" height="10" fill="#3fb950" />
                     <rect x="9" y="0" width="2" height="12" fill="#30363d" />
                   </g>
                )}
                {network === "Fast (5G)" && (
                   <g transform="translate(80, 45)">
                     <path d="M 6 0 L 0 7 L 5 7 L 3 14 L 10 6 L 5 6 Z" fill="#e3b341" className="animate-pulse" style={{ filter: "drop-shadow(0px 0px 4px #e3b341)" }} />
                   </g>
                )}
              </motion.g>
            </svg>
          </div>
          <div className="text-center w-full relative z-10">
            <h4 className="font-semibold text-white text-sm">Agent Persona</h4>
            <p className="text-xs text-primary font-mono mt-1 w-full truncate px-2">{personaName}</p>
          </div>
        </div>

        {/* JSON */}
        <div className="lg:col-span-4 bg-[#0d1117] h-full p-6 md:p-8 relative group">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2"><Terminal className="w-4 h-4 text-[#8b949e]" /><div className="text-xs text-[#8b949e] font-mono uppercase tracking-wider">agent.config.json</div></div>
            <button onClick={() => { 
                navigator.clipboard.writeText(JSON.stringify({ engine: "phantom-core-v4", persona: personaName, runtime: { browser: "chromium-131", device, network, locale: language, geo: location, accessibility_audit: screenReader }, heuristics: { tech_savviness: techSavvy/100, patience_threshold: patience/100, adversarial_fuzzing: chaosMode }, consensus: { verification_agents: 49, threshold: 0.85, auto_file_issues: true } }, null, 2));
                setCopied(true); setTimeout(() => setCopied(false), 2000);
            }} className="p-1.5 rounded bg-[#161b22] border border-[#30363d] text-[#8b949e] hover:text-white hover:border-[#8b949e] transition-colors" title="Copy to clipboard">
              {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <pre className="text-[11px] font-mono leading-relaxed overflow-x-auto text-[#c9d1d9] bg-[#161b22] border border-[#30363d] p-4 rounded-md">
{`{
  "engine": "phantom-core-v4",
  "persona": "${personaName}",
  "runtime": {
    "browser": "chromium-131",
    "device": "${device}",
    "network": "${network}",
    "locale": "${language}",
    "geo": "${location}",
    "accessibility_audit": ${screenReader}
  },
  "heuristics": {
    "tech_savviness": ${(techSavvy / 100).toFixed(2)},
    "patience_threshold": ${(patience / 100).toFixed(2)},
    "adversarial_fuzzing": ${chaosMode}
  },
  "consensus": {
    "verification_agents": 49,
    "threshold": 0.85,
    "auto_file_issues": true
  }
}`}
          </pre>
        </div>
      </div>
    </section>
  );
}

function ToggleRow({ label, description, active, onToggle }: { label: string; description: string; active: boolean; onToggle: () => void }) {
  return (
    <div className="flex items-center justify-between border border-[#30363d] p-3 rounded-md bg-[#0d1117] hover:border-[#484f58] transition-colors duration-300">
      <div><div className="text-sm font-semibold text-[#c9d1d9]">{label}</div><div className="text-xs text-[#8b949e]">{description}</div></div>
      <motion.button whileTap={{ scale: 0.8 }} onClick={onToggle} className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full focus:outline-none transition-all duration-300 ${active ? "bg-primary shadow-[0_0_10px_rgba(234,88,12,0.4)]" : "bg-[#30363d]"}`}><span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-300 ${active ? "translate-x-4" : "translate-x-1"}`} /></motion.button>
    </div>
  );
}

/* ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ */
/*  REDDIT SLIDER                                      */
/* ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ */

interface RC { user: string; time: string; upvotes: number; text: string; sub: string; }

function GitHubIssueCard({ comment }: { comment: RC }) {
  return (
    <div className="block w-[420px] shrink-0 outline-none group">
      <div className="rounded-md border border-[#30363d] bg-[#161b22] text-left transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-[0_0_20px_-5px_rgba(234,88,12,0.2)]">
        <div className="px-3 py-2 border-b border-[#30363d] bg-[#161b22] flex items-center justify-between rounded-t-md group-hover:border-primary/20 transition-colors duration-300">
          <div className="flex items-center gap-2">
            <svg className="text-primary shrink-0" viewBox="0 0 16 16" width="16" height="16"><path fill="currentColor" d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" /><path fill="currentColor" fillRule="evenodd" d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z" /></svg>
            <span className="text-xs font-semibold text-[#c9d1d9] max-w-[160px] truncate">{comment.user}</span><span className="text-xs text-[#484f58]">{comment.sub}</span><span className="text-xs text-[#484f58]">ΓÇó</span><span className="text-xs text-[#484f58]">{comment.time}</span>
          </div>
          <span className="text-xs text-primary border border-primary/20 bg-primary/5 px-1.5 py-0.5 rounded flex gap-1 items-center font-mono font-medium">Γû▓ {comment.upvotes}</span>
        </div>
        <div className="p-3 text-[13px] text-[#c9d1d9] leading-relaxed bg-[#0d1117] rounded-b-md line-clamp-3">{comment.text}</div>
      </div>
    </div>
  );
}

function IssueSlider() {
  return (
    <div className="w-full relative overflow-hidden py-12 border-y border-[#30363d] shrink-0 bg-[#0d1117]">
      <div className="absolute left-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-r from-[#0d1117] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-l from-[#0d1117] to-transparent z-10 pointer-events-none" />
      <div className="flex w-[200vw] sm:w-[150vw] xl:w-[100vw]">
        <div className="flex animate-[scroll_45s_linear_infinite] w-full items-center gap-4 pr-4 hover:[animation-play-state:paused]">
          {[...REDDIT_COMMENTS, ...REDDIT_COMMENTS, ...REDDIT_COMMENTS].map((c, i) => <GitHubIssueCard key={i} comment={c} />)}
        </div>
      </div>
    </div>
  );
}

/* ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ */
/*  PAGE                                               */
/* ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ */

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
        showToast("You're in. We'll haunt your inbox soon. ≡ƒæ╗", "success");
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
            <button onClick={() => setShowCmdk(true)} className="hidden md:flex items-center gap-3 text-[13px] text-[#8b949e] border border-[#30363d] bg-[#161b22] px-3 py-1.5 rounded-md hover:border-[#484f58] transition-colors"><Search className="w-3.5 h-3.5" /> <span>Search...</span> <kbd className="font-mono bg-[#0d1117] px-1.5 py-0.5 rounded border border-[#30363d] text-[10px]">ΓîÿK</kbd></button>
            <Button primary onClick={() => document.getElementById("waitlist-input")?.focus()}>Summon your ghosts</Button>
          </div>
        </div>
      </header>

      <main className="flex flex-col items-center w-full">
        {/* HERO */}
        <section id="hero" className="w-full max-w-[1280px] mx-auto px-4 pt-24 pb-20 flex flex-col md:flex-row items-center gap-12 relative">
          <div className="flex-1 text-left z-10 w-full">
            <Reveal delay={0.1}><Badge className="mb-6 border-primary/30 text-primary" showDot>Private Beta ΓÇö we&apos;re still slightly haunted ourselves</Badge></Reveal>
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
                  <Input id="waitlist-input" type="email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} placeholder="you@company.com" required className="h-10 text-[15px] px-3 w-full" disabled={loading} />
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
      </main>

      <footer className="w-full border-t border-[#30363d] bg-[#010409] py-12">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-2 text-[#484f58]">
              <svg width="20" height="20" viewBox="0 0 32 32" fill="none" className="opacity-50"><path d="M16 2C10.477 2 6 6.477 6 12v14l3-3 3 3 3-3 3 3 3-3 3 3V12c0-5.523-4.477-10-10-10z" fill="currentColor" /><circle cx="12" cy="13" r="2" fill="hsl(var(--background))" /><circle cx="20" cy="13" r="2" fill="hsl(var(--background))" /></svg>
              <span className="text-[12px]">┬⌐ 2026 Phantom AI ΓÇö Built by ghosts, for ghosts. Γÿá∩╕Å</span>
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
                <button onClick={() => { setShowCmdk(false); document.getElementById("waitlist-input")?.focus(); document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" }); }} className="w-full text-left flex items-center justify-between px-4 py-3 rounded-md hover:bg-[#21262d] text-[#c9d1d9] hover:text-white transition-colors group"><div className="flex items-center gap-3"><Zap className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" /> Join Private Beta Waitlist</div><kbd className="hidden group-hover:block font-mono text-[10px] text-[#8b949e]">Γå╡ Enter</kbd></button>
                <button onClick={() => { setShowCmdk(false); navigator.clipboard.writeText("https://tryphantom.dev"); showToast("URL copied to clipboard", "success"); }} className="w-full text-left flex items-center justify-between px-4 py-3 rounded-md hover:bg-[#21262d] text-[#c9d1d9] hover:text-white transition-colors group"><div className="flex items-center gap-3"><Layers className="w-4 h-4 text-[#a5d6ff] group-hover:scale-110 transition-transform" /> Copy Share Link</div><kbd className="hidden group-hover:block font-mono text-[10px] text-[#8b949e]">Γå╡ Enter</kbd></button>
                
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

