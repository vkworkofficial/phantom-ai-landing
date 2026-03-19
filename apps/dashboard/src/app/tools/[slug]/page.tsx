import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Cpu, Globe, Rocket, Terminal, ArrowRight, Zap, Code } from 'lucide-react';
import { getPSEOData, generatePSEOMetadata } from '@/lib/pseo-engine';
import { SchemaOrg } from '@/components/seo/SchemaOrg';

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const context = await getPSEOData(slug);
  if (!context) return {};
  const { title, description } = generatePSEOMetadata(context);
  return { title, description };
}

export default async function ToolPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const context = await getPSEOData(slug);

  if (!context || (context.category !== 'Integration' && context.category !== 'Benchmark' && context.category !== 'ErrorImpact')) {
    return notFound();
  }

  const { title, description } = generatePSEOMetadata(context);

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans selection:bg-primary/30">
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
            <div className="w-5 h-5 bg-primary rounded-sm" /> Phantom <span className="text-primary italic">Protocol</span>
          </Link>
          <div className="flex gap-6 text-[12px] font-mono text-[#8b949e]">
             <Link href="/blog" className="hover:text-white">Insights</Link>
             <Link href="/docs" className="hover:text-white">Documentation</Link>
          </div>
        </div>
      </header>

      <main className="max-w-[1000px] mx-auto px-4 py-24">
        <div className="mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-6">
             Phantom {context.category} Guide
          </div>
          <h1 className="text-6xl font-black text-white tracking-tight leading-[1.05] mb-8">
            {title}
          </h1>
          <p className="text-xl text-[#8b949e] max-w-2xl leading-relaxed">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          <div className="p-8 rounded-2xl bg-[#161b22] border border-[#30363d] hover:border-primary/50 transition-all duration-300">
             <Terminal className="w-10 h-10 text-primary mb-6" />
             <h3 className="text-lg font-bold text-white mb-2">High-Fidelity Trace</h3>
             <p className="text-sm text-[#8b949e]">Capture every DOM mutation and network request during the session.</p>
          </div>
          <div className="p-8 rounded-2xl bg-[#161b22] border border-[#30363d] hover:border-primary/50 transition-all duration-300">
             <Cpu className="w-10 h-10 text-primary mb-6" />
             <h3 className="text-lg font-bold text-white mb-2">Cognitive Scoring</h3>
             <p className="text-sm text-[#8b949e]">LLM-driven analysis of user intent vs. interface delivery.</p>
          </div>
          <div className="p-8 rounded-2xl bg-[#161b22] border border-[#30363d] hover:border-primary/50 transition-all duration-300">
             <Globe className="w-10 h-10 text-primary mb-6" />
             <h3 className="text-lg font-bold text-white mb-2">Global Benchmarks</h3>
             <p className="text-sm text-[#8b949e]">Compare your results against thousands of industry-leading products.</p>
          </div>
        </div>

        <div className="prose prose-invert prose-lg max-w-none mb-32">
           <h2 className="text-3xl font-bold text-white mb-8 border-b border-[#30363d] pb-4">Getting Started</h2>
           <p className="text-[#8b949e] mb-8">
             To begin {context.category.toLowerCase()} for {context.techStack || context.industry || "your application"}, initialize a Séance using the Phantom CLI or our direct integration.
           </p>
           
           <div className="bg-[#010409] p-6 rounded-xl border border-[#30363d] font-mono text-sm text-primary mb-12">
              $ npx phantom-ai init --template={context.techStack?.toLowerCase() || 'default'}
           </div>

           <h2 className="text-3xl font-bold text-white mb-8 border-b border-[#30363d] pb-4">Forensic Benchmarks</h2>
           <p className="text-[#8b949e] mb-12">
             Our synthetic user ensembles have already mapped the behavioral substrate of {context.techStack || context.industry || "the modern web"}. Here are the typical results we find in {context.category.toLowerCase()} studies:
           </p>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
              <div className="p-6 rounded-xl bg-primary/5 border border-primary/20">
                 <div className="text-3xl font-black text-white mb-2 italic">84%</div>
                 <div className="text-sm text-primary font-bold uppercase tracking-widest">Identification Rate</div>
                 <p className="text-[12px] text-[#8b949e] mt-2">Phantom identifies behavioral friction that traditional QA misses.</p>
              </div>
              <div className="p-6 rounded-xl bg-primary/5 border border-primary/20">
                 <div className="text-3xl font-black text-white mb-2 italic">12min</div>
                 <div className="text-sm text-primary font-bold uppercase tracking-widest">Time-to-Insight</div>
                 <p className="text-[12px] text-[#8b949e] mt-2">Zero to forensic report in under 15 minutes of compute.</p>
              </div>
           </div>
        </div>

        <div className="p-12 rounded-3xl bg-gradient-to-br from-[#161b22] to-[#0d1117] border border-[#30363d] text-center">
           <h3 className="text-2xl font-black text-white mb-4 uppercase italic">Ready to see the Forensic Traces?</h3>
           <p className="text-[#8b949e] mb-10 max-w-lg mx-auto">
             Join the Substrate Protocol and begin simulating high-fidelity user journeys for {context.techStack || context.industry || "your tech stack"}.
           </p>
           <Link href="/" className="inline-flex items-center gap-3 bg-primary text-white px-10 py-4 rounded-md font-black hover:shadow-[0_0_30px_rgba(234,88,12,0.4)] transition-all uppercase tracking-widest text-[14px]">
              Initiate Séance <ArrowRight className="w-5 h-5" />
           </Link>
        </div>
      </main>

      <footer className="py-16 border-t border-[#30363d] mt-24">
        <div className="max-w-[1000px] mx-auto px-4 flex justify-between items-center text-[12px] font-mono text-[#484f58] uppercase tracking-widest">
           <div>Phantom Protocol // Signal v1.2</div>
           <div className="flex gap-6">
              <Link href="/blog" className="text-primary hover:underline">Blog</Link>
              <Link href="/compare/hotjar-vs-phantom-ai" className="hover:text-white">Compare</Link>
           </div>
        </div>
      </footer>
    </div>
  );
}
