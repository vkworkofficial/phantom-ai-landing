"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function HeroTerminalAnimation() {
  const lines = [
    { type: "sys", text: "[core] Bootstrapping Phantom Engine v5.0.0 (Chromium 131)" },
    { type: "sys", text: "[core] Loading behavioral heuristic model..." },
    { type: "sys", text: "[orchestrator] Orchestrating 500 synthetic user instances across 12 regions..." },
    { type: "success", text: "[orchestrator] Agent pool ready — 500/500 browsers instrumented" },
    { type: "sys", text: "[dom-observer] Attaching MutationObserver + IntersectionObserver to 2,847 nodes" },
    { type: "warn", text: "[agent-017] Friction detected: /signup — CLS 0.42, INP: 1,847ms" },
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
