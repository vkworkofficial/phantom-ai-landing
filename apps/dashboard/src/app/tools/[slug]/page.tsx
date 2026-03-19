import React from 'react';
import { getPSEOContext, getAllPSEOKeywords } from '@/lib/pseo-engine';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { SEO } from '@/components/seo/SEO';
import { SchemaOrg } from '@/components/seo/SchemaOrg';
import { ArrowLeft, Zap, Shield, BarChart3, Binary, BrainCircuit } from 'lucide-react';
import Link from 'next/link';

export async function generateStaticParams() {
  const keywords = await getAllPSEOKeywords();
  return keywords.map((keyword) => ({ slug: keyword }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const context = await getPSEOContext(slug);
  if (!context) return {};

  return {
    title: `${context.title} | Phantom AI`,
    description: context.description,
    openGraph: {
      title: context.title,
      description: context.description,
      type: 'article',
    },
  };
}

export default async function PSEOToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const context = await getPSEOContext(slug);

  if (!context) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-purple-500/30">
      <SEO title={context.title} description={context.description} />
      <SchemaOrg 
        type="Article"
        data={{
          headline: context.title,
          description: context.description,
          author: "Phantom Labs Research"
        }}
      />

      {/* Forensic Header */}
      <nav className="border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/blog" className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Research
          </Link>
          <div className="text-[10px] tracking-[0.2em] font-mono text-zinc-500 uppercase">
            Forensic Utility Substrate v5.0.0
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <header className="space-y-6 mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-mono text-purple-400 uppercase tracking-wider mb-4">
            <Zap className="w-3 h-3" />
            Programmatic Intelligence
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
            {context.title}
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            {context.description}
          </p>
        </header>

        {/* Feature Grid */}
        <section className="grid md:grid-cols-2 gap-8 mb-20">
          <ForensicCard 
            icon={<BrainCircuit className="w-5 h-5 text-purple-400" />}
            title="Cognitive Inference"
            description="Our ghosts utilize sub-millisecond state capture to model human frustration at the neural level."
          />
          <ForensicCard 
            icon={<Binary className="w-5 h-5 text-blue-400" />}
            title="Substrate Tracing"
            description="Every interaction is forensically indexed, surviving React hydration gaps and complex SPAs."
          />
          <ForensicCard 
            icon={<Shield className="w-5 h-5 text-emerald-400" />}
            title="Lossless Telemetry"
            description="Zero-latency telemetry persistence ensures no behavioral nuance is lost during high-throughput séances."
          />
          <ForensicCard 
            icon={<BarChart3 className="w-5 h-5 text-amber-400" />}
            title="Friction Quantification"
            description="Automated Human Friction Index (HFX) scoring for instant PMF validation."
          />
        </section>

        {/* Dynamic CTA */}
        <section className="rounded-3xl border border-white/10 p-12 bg-zinc-900/40 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent" />
          <div className="relative z-10 text-center space-y-8">
            <h2 className="text-3xl font-bold">Ready to automate your conversion forensics?</h2>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link href="/" className="px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-zinc-200 transition-colors">
                Initiate a Séance
              </Link>
              <Link href="/dashboard" className="px-8 py-4 bg-zinc-800 text-white rounded-full font-semibold border border-white/10 hover:bg-zinc-700 transition-colors">
                View Live Demo
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-900 py-12">
        <div className="max-w-5xl mx-auto px-6 text-center text-zinc-600 text-[10px] tracking-widest uppercase font-mono">
          &copy; 2026 Phantom Labs. Forensic Engineering Standards.
        </div>
      </footer>
    </div>
  );
}

function ForensicCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl border border-white/5 bg-zinc-900/20 hover:bg-zinc-900/40 hover:border-white/10 transition-all group">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-400 transition-colors">{title}</h3>
      <p className="text-zinc-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
