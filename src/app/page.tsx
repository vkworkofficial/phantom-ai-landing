"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal, Activity, Zap, CheckCircle2, Shield, Search, Loader2, Cpu, GitBranch, Layers } from "lucide-react";
import { motion, useInView } from "framer-motion";

/* ═══════════════════════════════════════════════════ */
/*  REVEAL                                             */
/* ═══════════════════════════════════════════════════ */

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} initial={{ y: 30, opacity: 0 }} animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }} transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}>
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════ */
/*  REDDIT DATA                                        */
/* ═══════════════════════════════════════════════════ */

const REDDIT_COMMENTS = [
  { user: "danielmtl", sub: "r/startups", text: "We posted everywhere — Reddit, Indie Hackers, Product Hunt. Got 200 signups. Exactly 6 people actually used the product. Two of them were my co-founder's mom.", upvotes: 1847, time: "2 years ago" },
  { user: "jmhacks_", sub: "r/SaaS", text: "Beta testing is the tax you pay for building in a vacuum. We recruited 50 testers, 4 gave feedback, and 3 said 'looks nice'. We shipped a broken auth flow to 2000 real users a week later.", upvotes: 2312, time: "1 year ago" },
  { user: "rachelnguyen92", sub: "r/QualityAssurance", text: "Manual QA is the single biggest bottleneck in our release cycle. We ship code in hours but testing every edge case takes literal days. Nobody wants to admit it but most startups just... don't test.", upvotes: 3891, time: "8 months ago" },
  { user: "alexk_dev", sub: "r/startups", text: "I'm so tired of tweeting 'looking for beta testers!' into the void. Everyone ignores it. The people who DO sign up never open the app. Is there literally any way to automate this?", upvotes: 1104, time: "3 years ago" },
  { user: "supriya_builds", sub: "r/Entrepreneur", text: "The silence after launching is genuinely terrifying. You have no idea if users hate it, can't figure it out, or just never came back after signup. We needed 100 testers and got 0 useful reports.", upvotes: 688, time: "1 month ago" },
];

/* ═══════════════════════════════════════════════════ */
/*  PRIMITIVES                                         */
/* ═══════════════════════════════════════════════════ */

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

/* ═══════════════════════════════════════════════════ */
/*  HERO TERMINAL — DEEP TECH OUTPUT                   */
/* ═══════════════════════════════════════════════════ */

function HeroTerminalAnimation() {
  const lines = [
    { type: "sys", text: "[core] Bootstrapping Phantom Engine v4.2.0 (Chromium 131)" },
    { type: "sys", text: "[core] Loading behavioral heuristic model..." },
    { type: "sys", text: "[orchestrator] Spawning 500 headless browser instances across 12 geos..." },
    { type: "success", text: "[orchestrator] Agent pool ready — 500/500 browsers instrumented" },
    { type: "sys", text: "[dom-observer] Attaching MutationObserver + IntersectionObserver to 2,847 DOM nodes" },
    { type: "warn", text: "[agent-017] Friction detected: /signup — CLS 0.42, interaction-to-next-paint: 1,847ms" },
    { type: "err", text: "[agent-017] RAGE_CLICK on <button#submit> — 7 clicks in 2.1s, no state change" },
    { type: "sys", text: "[consensus] Dispatching 49 verification agents to reproduce..." },
    { type: "success", text: "[consensus] 47/49 agents confirmed — friction score: 0.91 (critical)" },
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
            <span className="text-[#484f58] shrink-0 select-none">›</span><span>{l.text}</span>
          </motion.div>
        ))}
        {visibleIdx < lines.length && (<div className="flex items-start gap-2"><span className="text-[#484f58] shrink-0">›</span><span className="inline-block w-2 h-4 bg-primary animate-pulse align-middle" /></div>)}
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

/* ═══════════════════════════════════════════════════ */
/*  ANIMATED CODE SNIPPET                              */
/* ═══════════════════════════════════════════════════ */

function AnimatedCodeSnippet() {
  const codeLines = [
    "name: Phantom UX Séance",
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
    "          consensus-threshold: 0.85",
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

/* ═══════════════════════════════════════════════════ */
/*  ARCHITECTURE LAYERS                                */
/* ═══════════════════════════════════════════════════ */

function ArchitectureStack() {
  const layers = [
    { name: "Phantom Core Engine", desc: "Proprietary behavioral model trained on anonymized real user sessions across SaaS, e-commerce, and fintech", color: "border-primary/60 bg-primary/5", icon: <Cpu className="w-4 h-4 text-primary" /> },
    { name: "Headless Browser Orchestrator", desc: "Chromium pool with MutationObserver, IntersectionObserver, and PerformanceObserver instrumentation per agent", color: "border-[#3fb950]/40 bg-[#3fb950]/5", icon: <Layers className="w-4 h-4 text-[#3fb950]" /> },
    { name: "Multi-Agent Consensus Layer", desc: "49-agent verification swarm — no bug ships unless consensus threshold ≥ 0.85", color: "border-[#a5d6ff]/40 bg-[#a5d6ff]/5", icon: <GitBranch className="w-4 h-4 text-[#a5d6ff]" /> },
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

/* ═══════════════════════════════════════════════════ */
/*  GHOST CUSTOMIZER                                   */
/* ═══════════════════════════════════════════════════ */

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
  const [blinking, setBlinking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => { setBlinking(true); setTimeout(() => setBlinking(false), 200); }, 3000);
    return () => clearInterval(interval);
  }, []);

  const personaName = chaosMode ? "Adversarial Fuzzer" : techSavvy > 70 ? patience < 40 ? "Impatient Power User" : "Methodical Engineer" : techSavvy < 30 ? patience > 70 ? "Patient First-Timer" : "Frustrated Novice" : screenReader ? "Accessibility Auditor" : device === "Mobile" ? "Mobile-First User" : "Average Explorer";

  const sel = "w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-sm text-[#c9d1d9] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-inner appearance-none cursor-pointer";

  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 py-24 border-t border-[#30363d]">
      <div className="mb-8 flex flex-col items-center text-center">
        <h2 className="text-3xl font-semibold text-white mb-3">Define your agent persona</h2>
        <p className="text-[#8b949e] max-w-xl">Each agent runs an independent headless Chromium instance with its own behavioral profile. Configure the heuristic weights and environment constraints below.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch bg-[#161b22] border border-[#30363d] rounded-md overflow-hidden relative hover:border-[#484f58] transition-colors duration-300">
        {/* Controls */}
        <div className="lg:col-span-5 p-6 md:p-8 space-y-5 border-b lg:border-b-0 lg:border-r border-[#30363d]">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-xs font-semibold text-[#8b949e] block mb-2 uppercase tracking-wide">Gender</label><select value={gender} onChange={(e) => setGender(e.target.value)} className={sel}><option>Any</option><option>Male</option><option>Female</option><option>Non-binary</option></select></div>
            <div><label className="text-xs font-semibold text-[#8b949e] block mb-2 uppercase tracking-wide">Age Range</label><select value={age} onChange={(e) => setAge(e.target.value)} className={sel}><option>18-24</option><option>25-34</option><option>35-44</option><option>45-54</option><option>55+</option></select></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-xs font-semibold text-[#8b949e] block mb-2 uppercase tracking-wide">Geo Region</label><select value={location} onChange={(e) => setLocation(e.target.value)} className={sel}><option>Global</option><option>US / Canada</option><option>EU / UK</option><option>APAC</option><option>LATAM</option><option>MEA</option></select></div>
            <div><label className="text-xs font-semibold text-[#8b949e] block mb-2 uppercase tracking-wide">Device</label><select value={device} onChange={(e) => setDevice(e.target.value)} className={sel}><option>Desktop</option><option>Mobile</option><option>Tablet</option></select></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-xs font-semibold text-[#8b949e] block mb-2 uppercase tracking-wide">Network</label><select value={network} onChange={(e) => setNetwork(e.target.value)} className={sel}><option>Fast (5G)</option><option>Moderate (4G)</option><option>Slow (3G)</option><option>Offline-first</option></select></div>
            <div><label className="text-xs font-semibold text-[#8b949e] block mb-2 uppercase tracking-wide">Locale</label><select value={language} onChange={(e) => setLanguage(e.target.value)} className={sel}><option>English</option><option>Spanish</option><option>Japanese</option><option>Arabic (RTL)</option><option>Hindi</option><option>Portuguese</option></select></div>
          </div>
          <div className="pt-2">
            <div className="flex justify-between mb-2"><label className="text-sm font-semibold text-[#c9d1d9]">Heuristic: Tech Savviness</label><span className="text-sm text-[#8b949e] font-mono">{techSavvy}%</span></div>
            <input type="range" min="0" max="100" value={techSavvy} onChange={(e) => setTechSavvy(parseInt(e.target.value))} className="w-full h-2 bg-[#0d1117] rounded-lg appearance-none cursor-pointer border border-[#30363d] accent-primary" />
          </div>
          <div>
            <div className="flex justify-between mb-2"><label className="text-sm font-semibold text-[#c9d1d9]">Heuristic: Patience Threshold</label><span className="text-sm text-[#8b949e] font-mono">{patience}%</span></div>
            <input type="range" min="0" max="100" value={patience} onChange={(e) => setPatience(parseInt(e.target.value))} className="w-full h-2 bg-[#0d1117] rounded-lg appearance-none cursor-pointer border border-[#30363d] accent-primary" />
          </div>
          <div className="space-y-3">
            <ToggleRow label="Adversarial Fuzzing" description="Inject malformed inputs, SQL strings, XSS payloads, rage-click patterns." active={chaosMode} onToggle={() => setChaosMode(!chaosMode)} />
            <ToggleRow label="Accessibility Audit" description="Enforce WCAG 2.2 AA. Test ARIA, focus traps, keyboard nav." active={screenReader} onToggle={() => setScreenReader(!screenReader)} />
          </div>
        </div>

        {/* Ghost SVG */}
        <div className="lg:col-span-3 bg-[#0d1117] border-b lg:border-b-0 lg:border-r border-[#30363d] flex flex-col items-center justify-center p-8 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none animate-[glow-pulse_4s_ease-in-out_infinite]" />
          <div className={`relative w-32 h-32 mb-4 animate-[float_4s_ease-in-out_infinite] ${chaosMode ? "animate-[glitch_0.3s_ease-in-out_infinite]" : ""}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_25px_rgba(234,88,12,0.2)] transition-all duration-500">
              <path d="M 20 50 C 20 20, 80 20, 80 50 L 80 90 L 70 80 L 60 90 L 50 80 L 40 90 L 30 80 L 20 90 Z" fill={chaosMode ? "#ea580c" : "#c9d1d9"} className="transition-colors duration-500" />
              {chaosMode ? (<g><path d="M 35 42 L 45 48" stroke="#0d1117" strokeWidth="3" strokeLinecap="round" /><path d="M 45 42 L 35 48" stroke="#0d1117" strokeWidth="3" strokeLinecap="round" /><path d="M 55 42 L 65 48" stroke="#0d1117" strokeWidth="3" strokeLinecap="round" /><path d="M 65 42 L 55 48" stroke="#0d1117" strokeWidth="3" strokeLinecap="round" /></g>) : blinking ? (<g><rect x="35" y="44" width="10" height="2" fill="#0d1117" rx="1" /><rect x="55" y="44" width="10" height="2" fill="#0d1117" rx="1" /></g>) : (<g><circle cx="40" cy="45" r="5" fill="#0d1117" /><circle cx="60" cy="45" r="5" fill="#0d1117" /><circle cx="42" cy="43" r="2" fill="#ea580c" style={{ filter: "drop-shadow(0px 0px 4px #ea580c)" }} /><circle cx="62" cy="43" r="2" fill="#ea580c" style={{ filter: "drop-shadow(0px 0px 4px #ea580c)" }} /></g>)}
              {chaosMode ? <path d="M 42 60 L 45 56 L 48 60 L 51 56 L 54 60 L 57 56" stroke="#0d1117" strokeWidth="2" fill="none" /> : <path d="M 45 58 Q 50 62 55 58" stroke="#0d1117" strokeWidth="2" fill="none" strokeLinecap="round" />}
              {screenReader && !chaosMode && (<g><ellipse cx="30" cy="35" rx="8" ry="6" fill="none" stroke="#8b949e" strokeWidth="2" /><ellipse cx="70" cy="35" rx="8" ry="6" fill="none" stroke="#8b949e" strokeWidth="2" /><path d="M 38 35 Q 50 28 62 35" fill="none" stroke="#8b949e" strokeWidth="2" /></g>)}
              {device === "Mobile" && (<g transform="translate(75, 55)"><rect x="0" y="0" width="10" height="16" rx="2" fill="#30363d" stroke="#8b949e" strokeWidth="1" /><rect x="2" y="2" width="6" height="9" fill="#161b22" rx="0.5" /></g>)}
              {network === "Slow (3G)" && (<g transform="translate(50, 18)"><circle cx="0" cy="0" r="3" fill="none" stroke="#ff7b72" strokeWidth="1.5" strokeDasharray="2 2" className="animate-spin" style={{ transformOrigin: "center" }} /></g>)}
            </svg>
          </div>
          <div className="text-center w-full relative z-10">
            <h4 className="font-semibold text-white text-sm">Agent Persona</h4>
            <p className="text-xs text-primary font-mono mt-1 w-full truncate px-2">{personaName}</p>
          </div>
        </div>

        {/* JSON */}
        <div className="lg:col-span-4 bg-[#0d1117] h-full p-6 md:p-8">
          <div className="flex items-center gap-2 mb-4"><Terminal className="w-4 h-4 text-[#8b949e]" /><div className="text-xs text-[#8b949e] font-mono uppercase tracking-wider">agent.config.json</div></div>
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
      <button onClick={onToggle} className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full focus:outline-none transition-all duration-300 ${active ? "bg-primary shadow-[0_0_10px_rgba(234,88,12,0.4)]" : "bg-[#30363d]"}`}><span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-300 ${active ? "translate-x-4" : "translate-x-1"}`} /></button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════ */
/*  REDDIT SLIDER                                      */
/* ═══════════════════════════════════════════════════ */

interface RC { user: string; time: string; upvotes: number; text: string; sub: string; }

function GitHubIssueCard({ comment }: { comment: RC }) {
  return (
    <div className="block w-[420px] shrink-0 outline-none group">
      <div className="rounded-md border border-[#30363d] bg-[#161b22] text-left transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-[0_0_20px_-5px_rgba(234,88,12,0.2)]">
        <div className="px-3 py-2 border-b border-[#30363d] bg-[#161b22] flex items-center justify-between rounded-t-md group-hover:border-primary/20 transition-colors duration-300">
          <div className="flex items-center gap-2">
            <svg className="text-primary shrink-0" viewBox="0 0 16 16" width="16" height="16"><path fill="currentColor" d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" /><path fill="currentColor" fillRule="evenodd" d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z" /></svg>
            <span className="text-xs font-semibold text-[#c9d1d9] max-w-[160px] truncate">{comment.user}</span><span className="text-xs text-[#484f58]">{comment.sub}</span><span className="text-xs text-[#484f58]">•</span><span className="text-xs text-[#484f58]">{comment.time}</span>
          </div>
          <span className="text-xs text-primary border border-primary/20 bg-primary/5 px-1.5 py-0.5 rounded flex gap-1 items-center font-mono font-medium">▲ {comment.upvotes}</span>
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

/* ═══════════════════════════════════════════════════ */
/*  PAGE                                               */
/* ═══════════════════════════════════════════════════ */

export default function Home() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/waitlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      const data = await res.json();
      if (res.ok) setSuccess(true); else setError(data.error || "Something went wrong.");
    } catch { setError("Network error. Please try again."); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans selection:bg-primary/30">
      <header className="sticky top-0 z-40 bg-[#010409]/95 backdrop-blur-sm border-b border-[#30363d]">
        <div className="max-w-[1280px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M16 2C10.477 2 6 6.477 6 12v14l3-3 3 3 3-3 3 3 3-3 3 3V12c0-5.523-4.477-10-10-10z" fill="hsl(var(--primary))" /><circle cx="12" cy="13" r="2" fill="hsl(var(--background))" /><circle cx="20" cy="13" r="2" fill="hsl(var(--background))" /></svg>
            <span className="font-semibold text-white tracking-tight text-lg">Phantom AI</span>
          </div>
          <Button primary onClick={() => document.getElementById("waitlist-input")?.focus()}>Summon your ghosts</Button>
        </div>
      </header>

      <main className="flex flex-col items-center w-full">
        {/* HERO */}
        <section className="w-full max-w-[1280px] mx-auto px-4 pt-24 pb-20 flex flex-col md:flex-row items-center gap-12 relative">
          <div className="flex-1 text-left z-10 w-full">
            <Reveal delay={0.1}><Badge className="mb-6 border-primary/30 text-primary" showDot>Private Beta — we&apos;re still slightly haunted ourselves</Badge></Reveal>
            <Reveal delay={0.2}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
                AI that <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#ffbd2e]">haunts</span> your product <br className="hidden md:block" /><span className="text-[#8b949e]">before users do.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-xl md:text-2xl text-[#8b949e] max-w-2xl font-normal leading-relaxed mb-10">
                Stop begging strangers on Reddit to test your app. Deploy 500 AI agents that find every broken flow and rage-quit moment — in 30 minutes.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="w-full max-w-md">
                {!success ? (
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                    <Input id="waitlist-input" type="email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} placeholder="you@company.com" required className="h-10 text-[15px] px-3 w-full" disabled={loading} />
                    <Button primary type="submit" className="h-10 px-6 shrink-0 text-[15px]" disabled={loading}>{loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Join waitlist"}</Button>
                  </form>
                ) : (
                  <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="inline-flex items-center gap-2 px-4 py-2 border border-[#3fb950]/30 bg-[#3fb950]/10 rounded-md text-[#3fb950] font-medium text-sm w-full"><CheckCircle2 className="w-4 h-4" />You&apos;re in. We&apos;ll haunt your inbox soon. 👻</motion.div>
                )}
                {error && <p className="text-xs text-[#ff7b72] mt-2">{error}</p>}
                <div className="mt-6">
                  <p className="text-[12px] text-[#484f58] mb-3">Backed by</p>
                  <div className="flex items-center gap-6 opacity-50 hover:opacity-70 transition-opacity duration-300">
                    <div className="flex items-center gap-1"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="#F26522"><rect width="24" height="24" rx="2" /><path fill="white" d="M12 13.5l3.5-5.5h-2L12 11l-1.5-3h-2l3.5 5.5v4.5h2v-4.5z" /></svg><span className="font-bold tracking-tight text-white text-sm">Y Combinator</span></div>
                    <div className="flex items-center gap-1"><svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L22 20H2z" /></svg><span className="font-bold tracking-tight text-white text-sm">Vercel</span></div>
                    <div className="flex items-center gap-1"><svg className="w-4 h-4 text-[#5E6AD2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 20L20 4M4 4l16 16" /></svg><span className="font-bold tracking-tighter text-white text-sm">Linear</span></div>
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

        {/* FEATURES */}
        <section className="w-full max-w-[1280px] mx-auto px-4 py-24">
          <Reveal><div className="mb-8"><h2 className="text-2xl font-semibold text-white mb-2">Why this is hard</h2><p className="text-[#8b949e]">Anyone can open a browser. Building a system that thinks like a user, coordinates across 500 instances, and reaches consensus on what&apos;s actually broken — that&apos;s the hard part.</p></div></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <Reveal delay={0.1}>
              <div className="h-full col-span-1 lg:col-span-2 rounded-md border border-[#30363d] bg-[#0d1117] p-5 hover:border-primary/40 hover:shadow-[0_0_30px_-5px_rgba(234,88,12,0.15)] transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-3"><Activity className="w-5 h-5 text-[#8b949e] group-hover:text-primary transition-colors duration-300 drop-shadow-none group-hover:drop-shadow-[0_0_8px_rgba(234,88,12,0.8)]" /><h3 className="font-semibold text-white text-[16px]">DOM-Level Friction Telemetry</h3></div>
                <p className="text-sm text-[#8b949e] mb-6">We instrument every DOM node with MutationObserver, IntersectionObserver, and PerformanceObserver. Each agent computes per-element friction scores based on CLS, Interaction-to-Next-Paint, and behavioral heuristics — not vibes.</p>
                <div className="flex gap-4 border-t border-[#30363d] pt-5">
                  <div className="flex-1"><div className="text-xs text-[#484f58] mb-1 font-mono">/signup — CLS: 0.42</div><div className="text-sm font-semibold text-[#ff7b72] flex items-center gap-1.5"><Zap className="w-4 h-4" /> Layout Shift → Rage Click</div></div>
                  <div className="w-px bg-[#30363d]" />
                  <div className="flex-1"><div className="text-xs text-[#484f58] mb-1 font-mono">/pricing — INP: 1847ms</div><div className="text-sm font-semibold text-[#d2a8ff] flex items-center gap-1.5"><Activity className="w-4 h-4" /> 42% Agent Abandonment</div></div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="h-full rounded-md border border-[#30363d] bg-[#0d1117] p-5 hover:border-primary/40 hover:shadow-[0_0_30px_-5px_rgba(234,88,12,0.15)] transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-3"><Cpu className="w-5 h-5 text-[#8b949e] group-hover:text-primary transition-colors duration-300 drop-shadow-none group-hover:drop-shadow-[0_0_8px_rgba(234,88,12,0.8)]" /><h3 className="font-semibold text-white text-[16px]">Multi-Agent Consensus</h3></div>
                <p className="text-sm text-[#8b949e]">Every detected issue triggers a 49-agent verification swarm. Bugs only ship if consensus exceeds 85%. This eliminates the false-positive noise that makes most automated testing tools useless.</p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="h-full rounded-md border border-[#30363d] bg-[#0d1117] p-5 hover:border-primary/40 hover:shadow-[0_0_30px_-5px_rgba(234,88,12,0.15)] transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-3"><Shield className="w-5 h-5 text-[#8b949e] group-hover:text-primary transition-colors duration-300 drop-shadow-none group-hover:drop-shadow-[0_0_8px_rgba(234,88,12,0.8)]" /><h3 className="font-semibold text-white text-[16px]">Zero-Trust Session Injection</h3></div>
                <p className="text-sm text-[#8b949e]">Agents authenticate via ephemeral session tokens scoped to isolated browser contexts. No customer PII ever leaves your infra. SOC 2 Type II compliance on our roadmap.</p>
              </div>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="h-full col-span-1 lg:col-span-2 rounded-md border border-[#30363d] bg-[#0d1117] p-5 hover:border-primary/40 hover:shadow-[0_0_30px_-5px_rgba(234,88,12,0.15)] transition-all duration-300 group">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3"><Search className="w-5 h-5 text-[#8b949e] group-hover:text-primary transition-colors duration-300 drop-shadow-none group-hover:drop-shadow-[0_0_8px_rgba(234,88,12,0.8)]" /><h3 className="font-semibold text-white text-[16px]">Proprietary Behavioral Model</h3></div>
                </div>
                <p className="text-sm text-[#8b949e] mb-4">Phantom Core is trained on anonymized user sessions across SaaS, e-commerce, and fintech verticals. It doesn&apos;t follow a script — it makes decisions the way humans do, with all the impatience, confusion, and edge-case creativity.</p>
                <div className="bg-[#161b22] border border-[#30363d] p-3 rounded text-[13px] font-mono text-[#8b949e]">
                  <span className="text-[#79c0ff]">model</span>: <span className="text-[#a5d6ff]">phantom-core-v4</span><br />
                  <span className="text-[#79c0ff]">inference</span>: <span className="text-[#a5d6ff]">behavioral heuristic engine</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CI/CD */}
        <section className="w-full border-t border-[#30363d] bg-[#161b22] py-24">
          <div className="max-w-[1280px] mx-auto px-4 flex flex-col lg:flex-row gap-12 items-start">
            <Reveal>
              <div className="w-full lg:w-[380px] shrink-0">
                <h2 className="text-3xl font-semibold tracking-tight text-white mb-4">Ships as a CI/CD gate.<br /><span className="text-[#8b949e]">Not a dashboard you forget about.</span></h2>
                <p className="text-sm text-[#8b949e] max-w-lg mb-8 leading-relaxed">Phantom runs inside your existing pipeline. If a PR introduces UX friction above your threshold, the build fails. Behavioral QA becomes as non-negotiable as unit tests.</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-sm text-[#c9d1d9]"><CheckCircle2 className="w-4 h-4 text-[#3fb950]" /> Native GitHub Actions integration</li>
                  <li className="flex items-center gap-2 text-sm text-[#c9d1d9]"><CheckCircle2 className="w-4 h-4 text-[#3fb950]" /> Auto-comments friction reports on PRs</li>
                  <li className="flex items-center gap-2 text-sm text-[#c9d1d9]"><CheckCircle2 className="w-4 h-4 text-[#3fb950]" /> Session replays attached to every issue</li>
                  <li className="flex items-center gap-2 text-sm text-[#c9d1d9]"><CheckCircle2 className="w-4 h-4 text-[#3fb950]" /> Configurable friction-score thresholds</li>
                </ul>
                <Button primary onClick={() => { document.getElementById("waitlist-input")?.focus(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Summon your ghosts</Button>
              </div>
            </Reveal>
            <Reveal delay={0.2}><div className="flex-1 w-full min-w-0 relative"><div className="absolute -inset-4 bg-primary/5 blur-3xl -z-10 rounded-full" /><AnimatedCodeSnippet /></div></Reveal>
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-[#30363d] bg-[#010409] py-12">
        <div className="max-w-[1280px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[#484f58]">
            <svg width="20" height="20" viewBox="0 0 32 32" fill="none" className="opacity-50"><path d="M16 2C10.477 2 6 6.477 6 12v14l3-3 3 3 3-3 3 3 3-3 3 3V12c0-5.523-4.477-10-10-10z" fill="currentColor" /><circle cx="12" cy="13" r="2" fill="hsl(var(--background))" /><circle cx="20" cy="13" r="2" fill="hsl(var(--background))" /></svg>
            <span className="text-[12px]">© 2026 Phantom AI — Built by ghosts, for ghosts. ☠️</span>
          </div>
          <p className="text-[11px] text-[#30363d] italic">Made with insomnia and an unreasonable amount of espresso.</p>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(calc(-33.333%)); } }
        @keyframes float { 0%, 100% { transform: translateY(0) rotate(0deg); } 25% { transform: translateY(-6px) rotate(1deg); } 75% { transform: translateY(-3px) rotate(-1deg); } }
        @keyframes glitch { 0%, 100% { transform: translateX(0); } 20% { transform: translateX(-3px); } 40% { transform: translateX(3px); } 60% { transform: translateX(-2px); } 80% { transform: translateX(2px); } }
        @keyframes glow-pulse { 0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); } 50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.1); } }
      ` }} />
    </div>
  );
}
