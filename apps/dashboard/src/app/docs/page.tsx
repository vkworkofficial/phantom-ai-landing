"use client";

import React from "react";
import { ArrowLeft, Book, Code, Shield, Zap, Terminal } from "lucide-react";
import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans">
      <header className="sticky top-0 z-40 bg-[#010409]/95 backdrop-blur-sm border-b border-[#30363d]">
        <div className="max-w-[1000px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <span className="font-bold text-white tracking-tighter text-[20px]">Substrate Protocol v4.2</span>
          </div>
          <div className="text-[11px] font-mono text-[#484f58] uppercase tracking-widest">Documentation</div>
        </div>
      </header>

      <main className="max-w-[1000px] mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Sidebar Nav */}
        <aside className="md:col-span-1 space-y-8">
          <div>
            <h3 className="text-[11px] font-bold text-[#484f58] uppercase tracking-widest mb-4">Core Concepts</h3>
            <ul className="space-y-3 text-[13px]">
              <li className="text-primary font-medium">Synthetic Reality Engine</li>
              <li className="text-[#8b949e] hover:text-[#c9d1d9] cursor-pointer">Ghost Cognition Model</li>
              <li className="text-[#8b949e] hover:text-[#c9d1d9] cursor-pointer">Seance Consensus Layer</li>
            </ul>
          </div>
          <div>
            <h3 className="text-[11px] font-bold text-[#484f58] uppercase tracking-widest mb-4">Integration</h3>
            <ul className="space-y-3 text-[13px]">
              <li className="text-[#8b949e] hover:text-[#c9d1d9] cursor-pointer">CI/CD Orchestration</li>
              <li className="text-[#8b949e] hover:text-[#c9d1d9] cursor-pointer">API Reference</li>
              <li className="text-[#8b949e] hover:text-[#c9d1d9] cursor-pointer">Webhook Triggers</li>
            </ul>
          </div>
        </aside>

        {/* Content */}
        <div className="md:col-span-3 space-y-12 pb-24">
          <section>
            <h1 className="text-4xl font-bold text-white mb-6">Synthetic Reality Engine</h1>
            <p className="text-[#8b949e] text-lg leading-relaxed mb-8">
              Phantom AI differs from traditional QA automation by using <strong>Ghost Instances</strong>—independent headless Chromium actors driven by our proprietary behavioral heuristic models. 
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#161b22] border border-[#30363d] p-5 rounded-lg">
                <Zap className="w-5 h-5 text-primary mb-3" />
                <h4 className="text-white font-semibold mb-2">Cognitive Latency</h4>
                <p className="text-xs text-[#8b949e]">Ghosts simulate real human decision-making delays based on technical savviness and UI complexity.</p>
              </div>
              <div className="bg-[#161b22] border border-[#30363d] p-5 rounded-lg">
                <Terminal className="w-5 h-5 text-primary mb-3" />
                <h4 className="text-white font-semibold mb-2">Subtree Analysis</h4>
                <p className="text-xs text-[#8b949e]">Real-time DOMSubtreeModified surveillance to detect subtle visual regressions that standard tests miss.</p>
              </div>
            </div>
          </section>

          <section className="pt-8 border-t border-[#30363d]">
            <h2 className="text-2xl font-bold text-white mb-4">Orchestration API</h2>
            <p className="text-[#8b949e] mb-6">Deploy a Séance across your entire infrastructure substrate with a single POST request.</p>
            <div className="bg-[#010409] rounded-lg p-6 font-mono text-[13px] border border-[#30363d] overflow-x-auto">
              <div className="text-[#7ee787]">POST /api/v1/simulations</div>
              <div className="text-[#8b949e] mt-4">{`{`}</div>
              <div className="pl-4">
                <span className="text-[#a5d6ff]">&quot;target_url&quot;</span>: <span className="text-[#7ee787]">&quot;https://app.example.com&quot;</span>, <br />
                <span className="text-[#a5d6ff]">&quot;ghosts&quot;</span>: <span className="text-[#d2a8ff]">500</span>, <br />
                <span className="text-[#a5d6ff]">&quot;consensus_threshold&quot;</span>: <span className="text-[#d2a8ff]">0.85</span> <br />
              </div>
              <div className="text-[#8b949e]">{`}`}</div>
            </div>
          </section>

          <section className="pt-8 border-t border-[#30363d]">
              <h2 className="text-2xl font-bold text-white mb-4">Vibe-Killer: Forensic Logging</h2>
              <p className="text-[#8b949e] mb-6">Every Séance generates a high-fidelity trace of interaction events, frustration markers, and cognitive load heatmaps.</p>
              <div className="bg-primary/5 border border-primary/20 p-6 rounded-lg">
                  <h4 className="text-primary font-semibold mb-2 flex items-center gap-2">
                      <Shield className="w-4 h-4" /> Hardened Compliance
                  </h4>
                  <p className="text-sm text-[#8b949e]">All logs are cryptographically signed and stored in our immutable Postgres substrate for forensic auditing during board reviews or YC due diligence.</p>
              </div>
          </section>
        </div>
      </main>
    </div>
  );
}
