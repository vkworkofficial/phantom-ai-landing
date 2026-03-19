import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Check, X, Zap, Cpu, Search, ArrowRight } from 'lucide-react';
import { getPSEOData, generatePSEOMetadata } from '@/lib/pseo-engine';
import { SEO } from '@/components/seo/SEO';
import { SchemaOrg } from '@/components/seo/SchemaOrg';

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const context = await getPSEOData(slug);
  if (!context) return {};
  const { title, description } = generatePSEOMetadata(context);
  return { title, description };
}

export default async function ComparisonPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const context = await getPSEOData(slug);

  if (!context || context.category !== 'Comparison') {
    return notFound();
  }

  const { title, description } = generatePSEOMetadata(context);

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans selection:bg-primary/30">
      <SEO title={title} description={description} />
      <SchemaOrg 
        type="Article" 
        data={{
          headline: title,
          description: description,
          author: { "@type": "Organization", "name": "Phantom AI" }
        }} 
      />

      <header className="sticky top-0 z-40 bg-[#010409]/95 backdrop-blur-sm border-b border-[#30363d]">
        <div className="max-w-[1000px] mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-white tracking-tighter text-[20px] flex items-center gap-2">
            <div className="w-5 h-5 bg-primary rounded-sm" /> Phantom <span className="text-primary italic">Forensics</span>
          </Link>
          <Link href="/blog" className="text-[12px] font-mono text-[#8b949e] uppercase tracking-widest hover:text-white transition-colors">Forensic Insights</Link>
        </div>
      </header>

      <main className="max-w-[1000px] mx-auto px-4 py-24">
        <div className="mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-6">
             Forensic Comparison Study
          </div>
          <h1 className="text-6xl font-black text-white tracking-tight leading-[1.05] mb-8">
            {context.competitor} <span className="text-[#484f58] lowercase text-4xl font-normal mx-4">vs</span> <span className="text-primary">Phantom AI</span>
          </h1>
          <p className="text-xl text-[#8b949e] max-w-2xl leading-relaxed">
            Why high-scale engineering teams are migrating from traditional session recording to Phantom's **Forensic User Simulation**.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl overflow-hidden mb-24">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#30363d] bg-[#010409]/50">
                <th className="p-6 text-[12px] font-mono text-[#484f58] uppercase tracking-widest">Capabilities</th>
                <th className="p-6 text-[14px] font-bold text-white">{context.competitor}</th>
                <th className="p-6 text-[14px] font-bold text-primary bg-primary/5 border-l border-r border-primary/20">Phantom AI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#30363d]">
              <tr>
                <td className="p-6 text-[14px] text-white font-medium">Data Strategy</td>
                <td className="p-6 text-[13px] text-[#8b949e]">Reactive (Recording)</td>
                <td className="p-6 text-[13px] text-white font-bold bg-primary/5 border-l border-r border-primary/20">Proactive (Simulation)</td>
              </tr>
              <tr>
                <td className="p-6 text-[14px] text-white font-medium">Latency Impact</td>
                <td className="p-6 text-[13px] text-[#8b949e]">Heavy (JS Injection)</td>
                <td className="p-6 text-[13px] text-white font-bold bg-primary/5 border-l border-r border-primary/20">Zero (Staging Séance)</td>
              </tr>
              <tr>
                <td className="p-6 text-[14px] text-white font-medium">Aha! Detection</td>
                <td className="p-6 text-[13px] text-[#8b949e]">Manual Analysis</td>
                <td className="p-6 text-[13px] text-white font-bold bg-primary/5 border-l border-r border-primary/20">AI Forensic Tracing</td>
              </tr>
              <tr>
                <td className="p-6 text-[14px] text-white font-medium">PMF Velocity</td>
                <td className="p-6 text-[13px] text-[#8b949e]">Weeks of Real Data</td>
                <td className="p-6 text-[13px] text-white font-bold bg-primary/5 border-l border-r border-primary/20">Minutes (Synthetic Ensembles)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-4">The Reactive Trap</h3>
            <p className="text-[#8b949e] leading-relaxed">
              Using {context.competitor} means waiting for real users to suffer before you find the friction. It's like solving a crime after the suspect has fled the state.
            </p>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-red-500/5 border border-red-500/20">
               <X className="w-5 h-5 text-red-500 mt-1" />
               <p className="text-sm text-[#8b949e]">Recordings only show symptoms, not the underlying state-machine logic that caused the failure.</p>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-4">The Forensic Advantage</h3>
            <p className="text-[#8b949e] leading-relaxed">
              Phantom AI runs 10,000 simulations per commit. We identify the behavioral fingerprints of frustration before a single real user hits your landing page.
            </p>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
               <Check className="w-5 h-5 text-primary mt-1" />
               <p className="text-sm text-white font-medium">Full state-tree reconstruction for every synthetic interaction.</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#161b22] to-[#010409] border border-primary/30 p-16 rounded-3xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px]" />
          <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter italic">Phase out {context.competitor}.<br/>Phase in the Forensic Layer.</h2>
          <p className="text-[#8b949e] mb-12 max-w-xl mx-auto text-lg leading-relaxed">
            Leading YC companies are ditching reactive analytics for pro-active human behavior simulation. Gain 100x PMF velocity today.
          </p>
          <Link href="/" className="inline-flex items-center gap-3 bg-primary text-white px-10 py-4 rounded-md font-black hover:shadow-[0_0_40px_rgba(234,88,12,0.6)] transition-all uppercase tracking-widest text-[14px]">
            Initialize Migration <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </main>

      <footer className="py-16 border-t border-[#30363d] mt-24">
        <div className="max-w-[1000px] mx-auto px-4 flex justify-between items-center text-[12px] font-mono text-[#484f58] uppercase tracking-widest">
           <div>Phantom Comparison Protocol v1.0</div>
           <Link href="/blog" className="text-primary hover:underline">Forensic Blog</Link>
        </div>
      </footer>
    </div>
  );
}
