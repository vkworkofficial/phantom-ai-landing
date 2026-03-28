"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, Check, Copy } from "lucide-react";

export function CustomizeGhost() {
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
              <path d="M 23 50 C 23 20, 77 20, 77 50 L 77 90 L 68 81 L 59 90 L 50 81 L 41 90 L 32 81 L 23 90 Z" fill={chaosMode ? "#ea580c" : "#c9d1d9"} className="transition-all duration-300 ease-out" />
              {chaosMode ? (
                 <g><path d="M 35 42 L 45 48" stroke="#0d1117" strokeWidth="3" strokeLinecap="round" /><path d="M 45 42 L 35 48" stroke="#0d1117" strokeWidth="3" strokeLinecap="round" /><path d="M 55 42 L 65 48" stroke="#0d1117" strokeWidth="3" strokeLinecap="round" /><path d="M 65 42 L 55 48" stroke="#0d1117" strokeWidth="3" strokeLinecap="round" /></g>
              ) : screenReader ? (
                 <g><path d="M 16 43 L 84 45 L 83 53 L 17 51 Z" fill="#161b22" /><path d="M 12 45 L 18 51 M 88 45 L 82 53" stroke="#161b22" strokeWidth="3" strokeLinecap="round" /><path d="M 16 43 C 35 40, 65 48, 83 53" stroke="#0d1117" strokeWidth="1" fill="none" /></g>
              ) : techSavvy > 70 ? (
                 <g><rect x="28" y="38" width="44" height="15" rx="4" fill="#0d1117" stroke={chaosMode ? "#ea580c" : "#3fb950"} strokeWidth="2" style={{ filter: `drop-shadow(0px 0px 8px ${chaosMode ? "#ea580c" : "#3fb950"})` }} /><path d="M 33 45.5 L 67 45.5" stroke={chaosMode ? "#ea580c" : "#3fb950"} strokeWidth="2" strokeDasharray="4 2" className="animate-pulse" /><path d="M 23 45 L 28 45 M 72 45 L 77 45" stroke="#0d1117" strokeWidth="4" /></g>
              ) : techSavvy < 30 ? (
                 <g><ellipse cx="39" cy="45" rx="4" ry="6" fill="#0d1117" /><ellipse cx="61" cy="45" rx="4" ry="6" fill="#0d1117" /><circle cx="39" cy="43" r="1.5" fill="white" opacity="0.8" /><circle cx="61" cy="43" r="1.5" fill="white" opacity="0.8" /><path d="M 73 35 C 73 42, 80 42, 80 35 C 80 28, 76.5 25, 76.5 25 C 76.5 25, 73 28, 73 35 Z" fill="#79c0ff" opacity="0.8" className="animate-bounce" /></g>
              ) : patience > 80 ? (
                 <g><circle cx="39" cy="45" r="6" fill="#0d1117" /><circle cx="61" cy="45" r="6" fill="#0d1117" /><circle cx="37" cy="43" r="2.5" fill="white" /><circle cx="59" cy="43" r="2.5" fill="white" /><circle cx="41" cy="47" r="1" fill="white" opacity="0.5" /><circle cx="63" cy="47" r="1" fill="white" opacity="0.5" /></g>
              ) : patience < 40 ? (
                 <g><path d="M 31 40 L 45 45 L 45 48 L 31 46 Z" fill="#0d1117" /><path d="M 69 40 L 55 45 L 55 48 L 69 46 Z" fill="#0d1117" /><circle cx="39" cy="46" r="2" fill="#ea580c" style={{ filter: "drop-shadow(0px 0px 4px #ea580c)" }} /><circle cx="61" cy="46" r="2" fill="#ea580c" style={{ filter: "drop-shadow(0px 0px 4px #ea580c)" }} /></g>
              ) : blinking ? (
                 <g><rect x="34" y="44" width="10" height="2" fill="#0d1117" rx="1" /><rect x="56" y="44" width="10" height="2" fill="#0d1117" rx="1" /></g>
              ) : (
                 <g><circle cx="39" cy="45" r="5" fill="#0d1117" /><circle cx="61" cy="45" r="5" fill="#0d1117" /><circle cx="41" cy="43" r="1.5" fill="white" opacity="0.6" /><circle cx="63" cy="43" r="1.5" fill="white" opacity="0.6" /></g>
              )}
              {chaosMode ? (
                 <path d="M 40 60 L 44 55 L 50 62 L 56 55 L 60 60 L 56 65 L 50 58 L 44 65 Z" fill="#0d1117" />
              ) : techSavvy < 30 ? (
                 <path d="M 45 61 Q 50 58 55 61" stroke="#0d1117" strokeWidth="2.5" fill="none" strokeLinecap="round" /> 
              ) : patience > 80 ? (
                 <path d="M 44 58 Q 50 65 56 58" stroke="#0d1117" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              ) : patience < 40 ? (
                 <path d="M 45 62 L 55 62" stroke="#0d1117" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              ) : (
                 <path d="M 47 60 Q 50 62 53 60" stroke="#0d1117" strokeWidth="2" fill="none" strokeLinecap="round" />
              )}
              <motion.g key={"device-"+device} initial={{ scale: 0, y: 10 }} animate={{ scale: 1, y: 0 }} transition={{ type: "spring", bounce: 0.6 }}>
                {device === "Mobile" ? (
                   <g transform="translate(68, 55)"><rect x="0" y="0" width="16" height="26" rx="3" fill="#161b22" stroke="#8b949e" strokeWidth="1" /><rect x="1.5" y="1.5" width="13" height="23" rx="1.5" fill="#0d1117" /><rect x="3" y="4" width="10" height="15" fill={techSavvy > 50 ? "#3fb950" : "#30363d"} opacity="0.2" />{techSavvy > 50 && <rect x="4" y="6" width="8" height="2" fill="#3fb950" className="animate-pulse" />}{techSavvy > 50 && <rect x="4" y="10" width="6" height="1.5" fill="#3fb950" />}<circle cx="8" cy="21.5" r="1.5" fill="#30363d" /></g>
                ) : device === "Tablet" ? (
                   <g transform="translate(60, 50)"><rect x="0" y="0" width="30" height="22" rx="2" fill="#161b22" stroke="#8b949e" strokeWidth="1" /><rect x="1.5" y="1.5" width="27" height="19" rx="1" fill="#0d1117" /><rect x="5" y="4" width="20" height="14" fill={techSavvy > 50 ? "#3fb950" : "#30363d"} opacity="0.2" /></g>
                ) : (
                   <g transform="translate(30, 75)"><rect x="0" y="0" width="40" height="12" rx="2" fill="#161b22" stroke="#30363d" strokeWidth="1" transform="skewX(-15)" style={{ filter: "drop-shadow(0px 10px 10px rgba(0,0,0,0.5))" }} /><g transform="skewX(-15)" fill="#30363d"><rect x="4" y="2" width="4" height="3" rx="0.5" /><rect x="10" y="2" width="4" height="3" rx="0.5" /><rect x="16" y="2" width="4" height="3" rx="0.5" /><rect x="22" y="2" width="4" height="3" rx="0.5" /><rect x="28" y="2" width="4" height="3" rx="0.5" /><rect x="6" y="7" width="24" height="3" rx="0.5" fill={chaosMode ? "#ea580c" : "#8b949e"} className={chaosMode ? "animate-pulse" : ""} /></g></g>
                )}
              </motion.g>
              <motion.g key={"gender-"+gender} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.6 }}>
                {gender === "Female" && (<g><ellipse cx="32" cy="48" rx="3" ry="1.5" fill="#ff7b72" opacity="0.6" /><ellipse cx="68" cy="48" rx="3" ry="1.5" fill="#ff7b72" opacity="0.6" /></g>)}
                {gender === "Male" && !chaosMode && (<g><path d="M 45 66 L 40 61 L 40 71 Z" fill="#0d1117" /><path d="M 55 66 L 60 61 L 60 71 Z" fill="#0d1117" /><circle cx="50" cy="66" r="2.5" fill="#0d1117" /></g>)}
                {gender === "Non-binary" && (<path d="M 50 63 L 52 68 L 57 68 L 53 71 L 54 76 L 50 73 L 46 76 L 47 71 L 43 68 L 48 68 Z" fill="#d2a8ff" opacity="0.5" />)}
              </motion.g>
              <motion.g key={"age-"+age} initial={{ scale: 0, y: -10 }} animate={{ scale: 1, y: 0 }} transition={{ type: "spring", bounce: 0.5 }}>
                {age === "18-24" && (<g><path d="M 22 45 C 22 10, 78 10, 78 45" stroke="#30363d" strokeWidth="3" fill="none" /><rect x="18" y="38" width="6" height="14" rx="3" fill="#8b949e" /><rect x="76" y="38" width="6" height="14" rx="3" fill="#8b949e" /></g>)}
                {age === "25-34" && (<g transform="translate(13, 55)"><rect x="0" y="0" width="10" height="14" rx="1" fill="#c9d1d9" stroke="#0d1117" strokeWidth="1" /><path d="M 10 3 C 14 3, 14 9, 10 9" fill="none" stroke="#c9d1d9" strokeWidth="1.5" /><path d="M 3 0 Q 5 -4 3 -8" stroke="white" strokeWidth="1" fill="none" className="animate-pulse" /><path d="M 7 0 Q 9 -4 7 -8" stroke="white" strokeWidth="1" fill="none" className="animate-pulse" style={{ animationDelay: "0.2s" }} /><rect x="0" y="5" width="10" height="4" fill="#3fb950" /></g>)}
                {age === "35-44" && techSavvy <= 70 && !chaosMode && !screenReader && (<g><path d="M 32 45 L 46 45 M 54 45 L 68 45 M 46 45 C 48 42, 52 42, 54 45" stroke="#0d1117" strokeWidth="1.5" fill="none" /><rect x="30" y="42" width="16" height="7" rx="1" fill="none" stroke="#0d1117" strokeWidth="1.5" /><rect x="54" y="42" width="16" height="7" rx="1" fill="none" stroke="#0d1117" strokeWidth="1.5" /></g>)}
                {age === "45-54" && (<g><path d="M 47 64 L 53 64 L 51 77 L 50 80 L 49 77 Z" fill="#30363d" /><path d="M 47 64 L 50 67 L 53 64 Z" fill="#161b22" /></g>)}
                {age === "55+" && !chaosMode && (<g><path d="M 30 58 Q 40 55 46 62 Q 50 55 60 58" fill="none" stroke="#8b949e" strokeWidth="2" strokeLinecap="round" /><circle cx="61" cy="45" r="7" fill="none" stroke="#0d1117" strokeWidth="1.5" /><path d="M 68 45 C 75 45, 75 55, 70 60" fill="none" stroke="#e3b341" strokeWidth="1.5" /></g>)}
              </motion.g>

              {/* Locale / Language - Encoding Corrected */}
              <motion.g key={"lang-"+language} initial={{ scale: 0, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} transition={{ type: "spring", bounce: 0.6 }}>
                <g transform="translate(70, 7)">
                  <path d="M 0 10 C 0 0, 25 0, 25 10 C 25 20, 15 20, 10 25 L 5 30 L 5 20 C 2 18, 0 15, 0 10 Z" fill="#161b22" stroke="#30363d" strokeWidth="1" />
                  <text x="12.5" y="13" textAnchor="middle" fill="#c9d1d9" fontSize="6" fontWeight="bold">
                    {language === "English" ? "Hi" : language === "Spanish" ? "Hola" : language === "Japanese" ? "こんにちは" : language === "Arabic (RTL)" ? "أهلاً" : language === "Hindi" ? "नमस्ते" : "Olá"}
                  </text>
                </g>
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
                navigator.clipboard.writeText(JSON.stringify({ engine: "phantom-core-v5", persona: personaName, runtime: { browser: "chromium-131", device, network, locale: language, geo: location, accessibility_audit: screenReader }, heuristics: { tech_savviness: techSavvy/100, patience_threshold: patience/100, adversarial_fuzzing: chaosMode }, consensus: { verification_agents: 49, threshold: 0.85, auto_file_issues: true } }, null, 2));
                setCopied(true); setTimeout(() => setCopied(false), 2000);
            }} className="p-1.5 rounded bg-[#161b22] border border-[#30363d] text-[#8b949e] hover:text-white hover:border-[#8b949e] transition-colors" title="Copy to clipboard">
              {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <pre className="text-[11px] font-mono leading-relaxed overflow-x-auto text-[#c9d1d9] bg-[#161b22] border border-[#30363d] p-4 rounded-md">
{`{
  "engine": "phantom-core-v5",
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
