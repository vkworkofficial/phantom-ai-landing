import React from 'react';
import Link from 'next/link';
import { Search, Loader2, Zap, Shield, Target, Cpu, ArrowRight, Gauge, Layers, BrainCircuit } from "lucide-react";
import { Reveal, Button, Badge } from "@/components/landing/Primitives";

const SOLUTIONS_DATA: Record<string, any> = {
  "ai-user-testing": {
    title: "AI User Testing for Fast-Moving Teams",
    description: "Stop waiting for users to find bugs. Spawn 500 AI Ghosts to stress-test your UI before you even merge the PR.",
    features: ["Automated rage-click detection", "Deep behavioral heuristics", "100x faster than UserTesting.com"],
    cta: "Launch AI Séance"
  },
  "synthetic-qa-agents": {
    title: "Next-Gen Synthetic QA: Beyond Assertions",
    description: "Traditional tests check if code works. Synthetic QA checks if users thrive. Deploy forensic ghosts that think like your customer.",
    features: ["Playwright-driven high fidelity", "Console & Network telemetry", "Full DOM regression detection"],
    cta: "Harden Your QA"
  },
  "pmf-velocity-tracking": {
    title: "Maximize PMF Velocity with Quantitative Empathy",
    description: "Measure the exact 'disappointment gap' of your features. Our AI predicts your Sean Ellis score with 94% accuracy.",
    features: ["Sean Ellis loop simulation", "Consumer friction mapping", "Feature value-drift analysis"],
    cta: "Track PMF Now"
  },
  "rage-click-detection-sim": {
    title: "Simulate Rage-Clicking Before It Happens",
    description: "High-latency ghosts detect confusing UX patterns and rage-click loops on staging, not in production.",
    features: ["Frustration marker identification", "Dead-end detection", "UI friction heatmapping"],
    cta: "Audit My UX"
  }
};

export default async function SolutionsPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const data = SOLUTIONS_DATA[slug];

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0d1117] text-white flex flex-col items-center justify-center font-mono">
        <h1 className="text-4xl mb-4">404: Unknown Solution</h1>
        <p className="text-[#8b949e] mb-8 uppercase tracking-widest">The solution &quot;{slug}&quot; is not yet mapped in our substrate.</p>
        <Link href="/" className="text-primary hover:underline border border-primary/30 px-6 py-2 rounded-full uppercase tracking-widest font-bold">Back to Base</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans selection:bg-primary/30">
      <header className="sticky top-0 z-40 bg-[#010409]/95 backdrop-blur-sm border-b border-[#30363d]">
        <div className="max-w-[1280px] mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-5 h-5 bg-primary rounded-sm" />
            <span className="font-bold text-white tracking-tighter text-[22px]">Phantom AI</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/blog" className="text-xs font-bold uppercase tracking-widest text-[#8b949e] hover:text-white transition-colors">Blog</Link>
            <Link href="/docs" className="text-xs font-bold uppercase tracking-widest text-[#8b949e] hover:text-white transition-colors">Docs</Link>
          </div>
        </div>
      </header>

      <main className="max-w-[1280px] mx-auto px-4 py-24 flex flex-col items-center text-center">
        <Reveal>
          <Badge className="mb-8 border-primary/30 text-primary uppercase tracking-[0.2em] font-mono">Solution Substrate: {slug}</Badge>
        </Reveal>
        
        <Reveal delay={0.2}>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-8 max-w-4xl">
            {data.title}
          </h1>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="text-xl md:text-2xl text-[#8b949e] max-w-2xl font-normal leading-relaxed mb-12">
            {data.description}
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-4 mb-20">
            <Button primary className="h-12 px-10 text-[16px] uppercase tracking-widest">{data.cta}</Button>
            <Button className="h-12 px-10 text-[16px] uppercase tracking-widest border-[#30363d] text-[#8b949e]">View Ghost Performance</Button>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {data.features.map((feature: string, i: number) => (
            <Reveal key={i} delay={0.5 + i * 0.1}>
              <div className="p-8 rounded-xl bg-[#161b22] border border-[#30363d] satin-border text-left hover:border-primary/50 transition-all">
                <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center mb-6">
                  {i === 0 ? <Zap className="w-5 h-5 text-primary" /> : i === 1 ? <Shield className="w-5 h-5 text-primary" /> : <Layers className="w-5 h-5 text-primary" />}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature}</h3>
                <p className="text-sm text-[#8b949e]">Integrated into the Forensic Ghost Engine for 1:1 human equivalence.</p>
              </div>
            </Reveal>
          ))}
        </div>

        <section className="mt-32 w-full p-12 rounded-2xl bg-[#010409] border border-[#30363d] relative overflow-hidden text-left">
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -z-10 rounded-full" />
           <div className="flex flex-col md:flex-row justify-between items-center gap-12">
             <div className="flex-1">
                <h2 className="text-3xl font-bold text-white mb-4 italic tracking-widest uppercase">The Substrate Awaits</h2>
                <p className="text-[#8b949e] text-lg leading-relaxed">Join 500+ YC founders who use Phantom to iterate faster than their competition. Not built for regular apps — built for unicorns.</p>
             </div>
             <div className="w-full md:w-auto">
                <Link href="/" className="bg-primary text-white h-14 px-12 rounded-lg font-bold flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(234,88,12,0.4)] transition-all uppercase tracking-widest">
                   Initiate Séance <ArrowRight className="w-5 h-5" />
                </Link>
             </div>
           </div>
        </section>
      </main>

      <footer className="border-t border-[#30363d] py-20 bg-[#010409]">
        <div className="max-w-[1280px] mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-5 h-5 bg-white rounded-sm" />
              <span className="font-bold text-white tracking-tighter text-[20px]">Phantom AI</span>
            </div>
            <p className="text-[#8b949e] text-sm max-w-sm mb-8">Achieving PMF Velocity via high-fidelity synthetic user simulation. Substrate Protocol v4.2 hardened.</p>
            <div className="text-[11px] font-mono text-[#484f58] uppercase tracking-widest">© 2026 Phantom Labs | Silicon Valley</div>
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-white uppercase tracking-widest mb-6">Intelligence</h4>
            <ul className="space-y-4 text-[13px] text-[#8b949e] font-medium">
              <li><Link href="/blog" className="hover:text-primary transition-colors">Transmission Log</Link></li>
              <li><Link href="/docs" className="hover:text-primary transition-colors">Substrate Protocol Docs</Link></li>
              <li><Link href="/status" className="hover:text-primary transition-colors">Ghost Health Status</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-white uppercase tracking-widest mb-6">Solutions</h4>
            <ul className="space-y-4 text-[13px] text-[#8b949e] font-medium">
              <li><Link href="/solutions/ai-user-testing" className="hover:text-primary transition-colors">User Testing</Link></li>
              <li><Link href="/solutions/synthetic-qa-agents" className="hover:text-primary transition-colors">QA Agents</Link></li>
              <li><Link href="/solutions/pmf-velocity-tracking" className="hover:text-primary transition-colors">PMF Tracking</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
