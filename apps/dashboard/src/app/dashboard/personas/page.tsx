"use client";

import React, { useState } from 'react';
import { Plus, Users, Search, MoreHorizontal, Cpu, CheckCircle2, MessageSquare, Settings2, ShieldAlert } from 'lucide-react';

interface Persona {
  id: string;
  name: string;
  role: string;
  baseLatency: number;
  jitter: number;
  domObservability: number;
  timeoutMs: number;
  chaosMode: boolean;
  status: string;
}

export default function PersonasManagement() {
  const [personas, setPersonas] = useState<Persona[]>([
    { 
      id: 'tgt-vp-eng', 
      name: 'B2B Executive', 
      role: 'VP of Engineering',
      baseLatency: 150,
      jitter: 25,
      domObservability: 100,
      timeoutMs: 8000,
      chaosMode: false,
      status: 'active'
    },
    { 
      id: 'tgt-genz-cns', 
      name: 'Gen-Z Consumer', 
      role: '19yo College Student',
      baseLatency: 50,
      jitter: 10,
      domObservability: 70,
      timeoutMs: 3000,
      chaosMode: false,
      status: 'active'
    },
    { 
      id: 'tgt-fuzzer', 
      name: 'Automated Fuzzer', 
      role: 'System Fuzzer',
      baseLatency: 0,
      jitter: 0,
      domObservability: 100,
      timeoutMs: 30000,
      chaosMode: true,
      status: 'active'
    },
  ]);
  const [showBuilder, setShowBuilder] = useState(false);
  const [builderMode, setBuilderMode] = useState<'conversational' | 'technical'>('technical');
  const [search, setSearch] = useState('');

  const filteredPersonas = personas.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.role.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="w-full max-w-7xl mx-auto">
      {!showBuilder ? (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-white tracking-widest uppercase mb-1 flex items-center gap-2">
                Cognitive Profiles
              </h1>
              <p className="text-xs text-[#8b949e] font-mono tracking-wider">Configure the precise latency, constraints, and payloads governing the synthetic seance.</p>
            </div>
            <button 
              onClick={() => setShowBuilder(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-widest uppercase rounded bg-[#ea580c] text-white hover:bg-[#ff7a2d] transition-all shadow-[0_0_15px_rgba(234,88,12,0.3)]"
            >
              <Plus className="w-4 h-4" /> Initialize Profile
            </button>
          </div>

          {/* Data Table */}
          <div className="rounded border border-[#2d2d30] bg-[#111114] overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            <div className="p-3 border-b border-[#2d2d30] flex items-center justify-between bg-[#0a0a0c]">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5c646c]" />
                <input 
                  type="text" 
                  placeholder="Query profiles..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-[#111114] border border-[#2d2d30] rounded pl-9 pr-3 py-1.5 text-xs font-mono text-[#c9d1d9] placeholder:text-[#5c646c] focus:outline-none focus:border-[#ea580c] transition-colors"
                />
              </div>
              <div className="hidden sm:block text-[10px] text-[#5c646c] font-mono tracking-widest uppercase">{filteredPersonas.length} Signatures</div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-[#111114] border-b border-[#2d2d30] text-[#8b949e] font-bold text-[10px] tracking-widest uppercase">
                  <tr>
                    <th className="px-4 py-3">Codename</th>
                    <th className="px-4 py-3">Heuristic Base</th>
                    <th className="px-4 py-3">Latency Matrix</th>
                    <th className="px-4 py-3">State</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2d2d30]">
                  {filteredPersonas.map((persona) => (
                    <tr key={persona.id} className="hover:bg-[#1a1a1f] transition-colors group bg-[#111114]">
                      <td className="px-4 py-3">
                        <div className="font-mono text-[11px] text-[#ea580c] bg-[#ea580c]/10 px-2 py-1 rounded inline-block border border-[#ea580c]/20">
                          {persona.id}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded flex items-center justify-center shrink-0 border ${persona.chaosMode ? 'bg-[#ff7b72]/10 text-[#ff7b72] border-[#ff7b72]/30 shadow-[0_0_8px_rgba(255,123,114,0.3)]' : 'bg-[#8a2be2]/10 text-[#8a2be2] border-[#8a2be2]/30'}`}>
                            {persona.chaosMode ? <ShieldAlert className="w-4 h-4" /> : <Users className="w-4 h-4" />}
                          </div>
                          <div>
                            <div className="font-bold text-[#c9d1d9] tracking-wide text-xs">{persona.name}</div>
                            <div className="text-[10px] text-[#8b949e] mt-0.5 font-mono uppercase tracking-wider">{persona.role}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-1 text-[10px] text-[#c9d1d9] font-mono tracking-wider">
                          <div><span className="text-[#5c646c]">BASE:</span> {persona.baseLatency}ms</div>
                          <div><span className="text-[#5c646c]">JITTER:</span> ±{persona.jitter}%</div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {persona.status === 'active' ? (
                          <span className="inline-flex items-center gap-1.5 text-[10px] text-[#3fb950] font-bold uppercase tracking-widest">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#3fb950] shadow-[0_0_5px_#3fb950]"></span> ACTV
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-[10px] text-[#5c646c] font-bold uppercase tracking-widest">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#5c646c]"></span> DRFT
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button className="p-1.5 text-[#5c646c] hover:text-white rounded hover:bg-[#2d2d30] transition-all">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredPersonas.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-4 py-12 text-center text-[#5c646c] font-bold text-xs uppercase tracking-widest border-t border-[#2d2d30]">
                        No matching signatures isolated.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 z-50 bg-[#0a0a0c] overflow-y-auto flex flex-col items-center">
          <header className="h-16 border-b border-[#2d2d30] bg-[#111114] flex items-center justify-between px-8 shrink-0 sticky top-0 z-20 w-full shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-4">
              <button onClick={() => setShowBuilder(false)} className="text-[#8b949e] hover:text-white font-mono text-[10px] font-bold tracking-widest uppercase transition-colors px-3 py-1.5 rounded hover:bg-[#2d2d30]">&larr; Abort</button>
              <div className="h-6 w-px bg-[#2d2d30]" />
              <h2 className="text-sm font-bold text-white tracking-widest uppercase">Cognitive Profile Matrix Editor</h2>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-bold font-mono text-[#ea580c] uppercase tracking-widest animate-pulse">Uncommitted Payload</span>
              <button 
                onClick={() => {
                  setPersonas([{ 
                    id: `tgt-new-${Date.now().toString().slice(-4)}`, 
                    name: 'Custom Profile', 
                    role: 'Unknown', 
                    baseLatency: 200, 
                    jitter: 10, 
                    domObservability: 80, 
                    timeoutMs: 5000, 
                    chaosMode: false, 
                    status: 'draft' 
                  }, ...personas]);
                  setShowBuilder(false);
                }} 
                className="px-5 py-2 text-xs font-bold tracking-widest uppercase rounded bg-[#ea580c] text-white hover:bg-[#ff7a2d] transition-colors shadow-[0_0_15px_rgba(234,88,12,0.3)]"
               >
                Compile Signature
              </button>
            </div>
          </header>

          <div className="flex-1 flex flex-col lg:flex-row max-w-[1400px] w-full p-6 lg:p-12 gap-10 justify-center">
            {/* Left Column - Mode Toggle & Heuristic UI */}
            <div className="w-full lg:w-[400px] shrink-0 flex flex-col gap-6">
              <div className="flex bg-[#0a0a0c] border border-[#2d2d30] rounded p-1 shadow-inner">
                <button onClick={() => setBuilderMode('technical')} className={`flex-1 flex items-center justify-center gap-2 py-2 text-[10px] font-bold uppercase tracking-widest rounded transition-colors ${builderMode === 'technical' ? 'bg-[#2d2d30] text-white' : 'text-[#5c646c] hover:text-[#8b949e]'}`}>
                  <Settings2 className="w-3.5 h-3.5" /> Granular Matrix
                </button>
                <button onClick={() => setBuilderMode('conversational')} className={`flex-1 flex items-center justify-center gap-2 py-2 text-[10px] font-bold uppercase tracking-widest rounded transition-colors ${builderMode === 'conversational' ? 'bg-[#2d2d30] text-white' : 'text-[#5c646c] hover:text-[#8b949e]'}`}>
                  <MessageSquare className="w-3.5 h-3.5" /> NLP Synthesis
                </button>
              </div>

              <div className={`flex-1 rounded border border-[#2d2d30] bg-[#111114] overflow-hidden flex flex-col ${builderMode === 'technical' ? 'opacity-30 pointer-events-none grayscale' : ''} transition-all duration-500`}>
                <div className="p-4 border-b border-[#2d2d30] bg-[#0a0a0c] flex items-center gap-3">
                   <Cpu className="w-4 h-4 text-[#ea580c]" />
                   <div className="font-bold tracking-widest uppercase text-white text-[10px]">Heuristic Engine</div>
                </div>
                
                <div className="flex-1 p-5 overflow-y-auto space-y-4">
                   <div className="flex gap-3">
                     <div className="text-[11px] font-mono tracking-wider text-[#8b949e] leading-relaxed bg-[#0a0a0c] p-4 rounded border border-[#2d2d30]">
                       Input qualitative parameters of the target organism. The orchestrator will compile behavioral patterns into rigorous node constraints for the seance.
                     </div>
                   </div>
                </div>

                <div className="p-4 bg-[#0a0a0c] border-t border-[#2d2d30]">
                   <div className="relative">
                     <textarea 
                        rows={3}
                        placeholder="e.g. Low patience B2C teen, high bounce probability..."
                        className="w-full bg-[#111114] border border-[#2d2d30] rounded pl-4 pr-12 py-3 text-xs font-mono text-[#c9d1d9] focus:outline-none focus:border-[#ea580c] resize-none transition-colors placeholder:text-[#5c646c]"
                     />
                     <button className="absolute bottom-3 right-3 p-2 bg-[#ea580c] text-white rounded hover:bg-[#ff7a2d] transition-colors">
                        <CheckCircle2 className="w-4 h-4" />
                     </button>
                   </div>
                </div>
              </div>
            </div>

            {/* Right Column - Deep Technical Configuration Matrix */}
            <div className={`flex-1 rounded border border-[#2d2d30] bg-[#111114] p-8 lg:p-10 overflow-y-auto relative ${builderMode === 'conversational' ? 'opacity-30 pointer-events-none grayscale' : ''} transition-all duration-500 h-[calc(100vh-10rem)] shadow-[0_0_30px_rgba(0,0,0,0.8)]`}>
               <div className="max-w-3xl mx-auto md:ml-0 space-y-12 pb-8">
                  
                  <div>
                    <h2 className="text-lg font-bold text-white tracking-widest uppercase flex items-center gap-2 mb-1">Matrix Overrides</h2>
                    <p className="text-[10px] font-mono tracking-wider text-[#8b949e] uppercase">Hardcode behavioral thresholds into node memory.</p>
                  </div>

                  <div className="space-y-10">
                    {/* Identity Base */}
                    <div className="space-y-5">
                      <h3 className="text-[10px] font-bold text-[#8b949e] uppercase tracking-widest border-b border-[#2d2d30] pb-2">1. Identity & Network Tunnel</h3>
                      <div className="grid grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-[#c9d1d9]">Profile Codename</label>
                          <input type="text" placeholder="tgt-vp-eng" className="w-full bg-[#0a0a0c] border border-[#2d2d30] rounded text-xs px-4 py-2.5 text-[#ea580c] font-mono focus:border-[#ea580c] focus:outline-none transition-colors placeholder:text-[#5c646c]" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-[#c9d1d9]">Endpoint Region</label>
                          <select className="w-full bg-[#0a0a0c] border border-[#2d2d30] rounded text-xs px-4 py-2.5 text-[#8b949e] font-mono focus:border-[#ea580c] outline-none appearance-none"><option>US-EAST-1 (VPC)</option><option>EU-CENTRAL-1 (VPC)</option><option>AP-SOUTH-1 (VPC)</option></select>
                        </div>
                      </div>
                    </div>

                    {/* Latency / Constraints */}
                    <div className="space-y-5">
                      <h3 className="text-[10px] font-bold text-[#8b949e] uppercase tracking-widest border-b border-[#2d2d30] pb-2">2. Execution Latency Injection</h3>
                      <div className="grid grid-cols-2 gap-5 bg-[#0a0a0c] p-6 rounded border border-[#2d2d30] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#ea580c]/5 blur-3xl rounded-full" />
                        <div className="space-y-2 relative z-10">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-[#c9d1d9]">Base Latency Frame (ms)</label>
                          <input type="number" defaultValue="150" className="w-full bg-[#111114] border border-[#2d2d30] rounded text-xs px-4 py-2.5 text-white font-mono focus:border-[#ea580c] focus:outline-none" />
                          <p className="text-[9px] font-mono uppercase text-[#5c646c]">Minimum IO Block per DOM click.</p>
                        </div>
                        <div className="space-y-2 relative z-10">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-[#c9d1d9]">Stochastic Jitter (%)</label>
                          <input type="number" defaultValue="25" max="100" className="w-full bg-[#111114] border border-[#2d2d30] rounded text-xs px-4 py-2.5 text-white font-mono focus:border-[#ea580c] focus:outline-none" />
                          <p className="text-[9px] font-mono uppercase text-[#5c646c]">Randomized variance applied to base latency.</p>
                        </div>
                        <div className="space-y-2 relative z-10">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-[#c9d1d9]">Nav Timeout Ceiling (ms)</label>
                          <input type="number" defaultValue="8000" className="w-full bg-[#111114] border border-[#2d2d30] rounded text-xs px-4 py-2.5 text-white font-mono focus:border-[#ea580c] focus:outline-none" />
                          <p className="text-[9px] font-mono uppercase text-[#5c646c]">Max TTL for DOMContentLoaded event.</p>
                        </div>
                        <div className="space-y-2 relative z-10">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-[#c9d1d9]">Synthesized WPM</label>
                          <input type="number" defaultValue="65" className="w-full bg-[#111114] border border-[#2d2d30] rounded text-xs px-4 py-2.5 text-white font-mono focus:border-[#ea580c] focus:outline-none" />
                          <p className="text-[9px] font-mono uppercase text-[#5c646c]">Keystroke throughput rate.</p>
                        </div>
                      </div>
                    </div>

                    {/* Observability */}
                    <div className="space-y-5">
                      <h3 className="text-[10px] font-bold text-[#8b949e] uppercase tracking-widest border-b border-[#2d2d30] pb-2">3. Cognitive Payload Parameters</h3>
                      <div className="grid grid-cols-2 gap-5 bg-[#0a0a0c] p-6 rounded border border-[#2d2d30]">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-[#c9d1d9]">DOM Observability Depth (%)</label>
                          <input type="number" defaultValue="100" max="100" className="w-full bg-[#111114] border border-[#2d2d30] rounded text-xs px-4 py-2.5 text-white font-mono focus:border-[#ea580c] focus:outline-none" />
                          <p className="text-[9px] font-mono uppercase text-[#5c646c]">Probability of element discovery outside focal area.</p>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-[#c9d1d9]">F-Pattern Rigidity</label>
                          <input type="number" defaultValue="0.85" step="0.05" max="1" className="w-full bg-[#111114] border border-[#2d2d30] rounded text-xs px-4 py-2.5 text-white font-mono focus:border-[#ea580c] focus:outline-none" />
                          <p className="text-[9px] font-mono uppercase text-[#5c646c]">Strictness of z-pattern eye drift.</p>
                        </div>
                      </div>
                    </div>

                    {/* Resiliency Payload */}
                    <div className="space-y-5">
                      <h3 className="text-[10px] font-bold text-[#ff7b72] uppercase tracking-widest border-b border-[#ff7b72]/20 pb-2">4. Hostile Resiliency Directives</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
                        <label className="flex items-start gap-4 cursor-pointer p-4 rounded border border-[#2d2d30] bg-[#0a0a0c] hover:border-[#ff7b72]/50 transition-colors group">
                          <input type="checkbox" className="mt-0.5 w-4 h-4 rounded-sm border-[#2d2d30] text-[#ff7b72] focus:ring-[#ff7b72] bg-[#111114] outline-none" />
                          <div>
                            <div className="text-xs font-bold uppercase tracking-widest text-[#c9d1d9] mb-1 group-hover:text-white transition-colors">Invoke Chaos Runner</div>
                            <div className="text-[10px] font-mono text-[#5c646c] leading-relaxed">Bypass React hooks, intentionally induce network packet loss and simulate heavy GC pauses.</div>
                          </div>
                        </label>
                        <label className="flex items-start gap-4 cursor-pointer p-4 rounded border border-[#2d2d30] bg-[#0a0a0c] hover:border-[#ff7b72]/50 transition-colors group">
                          <input type="checkbox" className="mt-0.5 w-4 h-4 rounded-sm border-[#2d2d30] text-[#ff7b72] focus:ring-[#ff7b72] bg-[#111114] outline-none" />
                          <div>
                            <div className="text-xs font-bold uppercase tracking-widest text-[#c9d1d9] mb-1 group-hover:text-white transition-colors">XSS Injection Vector</div>
                            <div className="text-[10px] font-mono text-[#5c646c] leading-relaxed">Agent actively attempts benign XSS exploitation via all identified form payload vectors across session.</div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
