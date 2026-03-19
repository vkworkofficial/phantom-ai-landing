"use client";

import React, { useState, useEffect } from "react";
import { Cpu, GitBranch, Layers, Search, Activity } from "lucide-react";
import { Reveal } from "./Primitives";

/* ═══════════════════════════════════════════════════ */
/*  ARCHITECTURE LAYERS                                */
/* ═══════════════════════════════════════════════════ */

export function ArchitectureStack() {
  const layers = [
    { name: "Phantom Core Engine", desc: "Proprietary behavioral model trained on anonymized real user sessions across SaaS, e-commerce, and fintech", color: "border-primary/60 bg-primary/5", icon: <Cpu className="w-4 h-4 text-primary" /> },
    { name: "Headless Browser Orchestrator", desc: "Chromium pool with MutationObserver, IntersectionObserver, and PerformanceObserver instrumentation per agent", color: "border-[#3fb950]/40 bg-[#3fb950]/5", icon: <Layers className="w-4 h-4 text-[#3fb950]" /> },
    { name: "Multi-Agent Seance Consensus", desc: "49-ghost verification seance — no bug ships unless consensus threshold ≥ 0.85", color: "border-[#a5d6ff]/40 bg-[#a5d6ff]/5", icon: <GitBranch className="w-4 h-4 text-[#a5d6ff]" /> },
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
              <div className="flex-1">
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
/*  ANIMATED CODE SNIPPET                              */
/* ═══════════════════════════════════════════════════ */

export function AnimatedCodeSnippet() {
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
    "          seance-consensus: 0.85",
    "          behavioral-model: phantom-core-v5",
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
