import React from 'react';
import Link from 'next/link';
import { Terminal, Code, Cpu, Zap, Copy, Check, ArrowRight, Github } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';

export default function ToolkitPage() {
  const tools = [
    {
      title: "Rage Click Forensics",
      id: "rage-click",
      description: "Identify state-level friction that standard analytics miss. Captures DOM state, target, and timing for every frustration event.",
      filename: "RageClickForensics.ts",
      code: `export class RageClickForensics {
  private static clickThreshold = 300; 
  private static rageCount = 3; 

  static init(onRage: (event: RageClickEvent) => void) {
    if (typeof window === 'undefined') return;
    // ... logic for detection
  }
}`
    },
    {
      title: "Hydration Tracer",
      id: "hydration",
      description: "Zero-latency detection for the 'Uncanny Valley'—where UI is visible but non-interactive. Essential for Next.js 16/15 performance.",
      filename: "HydrationTracer.ts",
      code: `export class HydrationTracer {
  private static startTime = Date.now();
  private static isHydrated = false;

  static init(onHydrationLag: (lagMs: number) => void) {
    // ... track hydration lag
  }
}`
    }
  ];

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans selection:bg-primary/30">
      <SEO 
        title="Open Source Forensic Toolkit | Phantom AI" 
        description="High-fidelity developer utilities for detecting user friction, hydration lag, and behavioral bottlenecks." 
      />

      <header className="sticky top-0 z-40 bg-[#010409]/95 backdrop-blur-sm border-b border-[#30363d]">
        <div className="max-w-[1000px] mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-white tracking-tighter text-[20px] flex items-center gap-2">
            <div className="w-5 h-5 bg-primary rounded-sm" /> Phantom <span className="text-primary italic">Toolkit</span>
          </Link>
          <div className="flex gap-6 text-[12px] font-mono text-[#8b949e]">
             <Link href="/blog" className="hover:text-white uppercase tracking-widest">Forensics</Link>
             <Link href="https://github.com" className="hover:text-white flex items-center gap-1">
                <Github className="w-4 h-4" /> GITHUB
             </Link>
          </div>
        </div>
      </header>

      <main className="max-w-[1000px] mx-auto px-4 py-24">
        <div className="mb-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-6">
             Open Source & Free Forever
          </div>
          <h1 className="text-6xl font-black text-white tracking-tight leading-[1.05] mb-8">
            The <span className="text-primary italic">Forensic</span> Toolkit
          </h1>
          <p className="text-xl text-[#8b949e] max-w-2xl mx-auto leading-relaxed">
            Stop guessing. Start measuring. High-fidelity forensic snippets to diagnose behavioral friction in your frontend.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
          {tools.map(tool => (
            <div key={tool.id} className="p-8 rounded-2xl bg-[#161b22] border border-[#30363d] hover:border-primary/50 transition-all duration-300 flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                  <Terminal className="w-6 h-6 text-primary" />
                </div>
                <div className="text-[10px] font-mono text-[#484f58] uppercase tracking-widest">{tool.filename}</div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{tool.title}</h3>
              <p className="text-sm text-[#8b949e] leading-relaxed mb-8 flex-grow">
                {tool.description}
              </p>
              
              <div className="bg-[#010409] rounded-xl p-6 border border-[#30363d] font-mono text-[12px] text-[#8b949e] relative group mb-6 overflow-hidden max-h-[160px]">
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Copy className="w-4 h-4 cursor-pointer hover:text-white" />
                </div>
                <pre>{tool.code}</pre>
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#010409] to-transparent" />
              </div>

              <button className="w-full flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/20 text-primary font-bold hover:bg-primary hover:text-white transition-all group">
                Download Snippet <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-[#161b22] to-[#010409] border border-primary/30 p-16 rounded-3xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px]" />
          <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter italic">Scale to full forensics.</h2>
          <p className="text-[#8b949e] mb-12 max-w-xl mx-auto text-lg leading-relaxed">
            Snippets are just the beginning. The Phantom Substrate Protocol provides unified, high-fidelity user simulation across your entire fleet.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/" className="bg-primary text-white px-10 py-4 rounded-md font-black hover:shadow-[0_0_40px_rgba(234,88,12,0.6)] transition-all uppercase tracking-widest text-[14px]">
               Initialize Séance
            </Link>
            <Link href="/blog" className="bg-white/5 text-white px-10 py-4 rounded-md font-black hover:bg-white/10 transition-all uppercase tracking-widest text-[14px] border border-white/10">
               Read Forensic Data
            </Link>
          </div>
        </div>
      </main>

      <footer className="py-16 border-t border-[#30363d] mt-24">
        <div className="max-w-[1000px] mx-auto px-4 flex justify-between items-center text-[12px] font-mono text-[#484f58] uppercase tracking-widest">
           <div>Phantom Tooling Layer v0.1</div>
           <Link href="/blog" className="text-primary hover:underline">Blog</Link>
        </div>
      </footer>
    </div>
  );
}
