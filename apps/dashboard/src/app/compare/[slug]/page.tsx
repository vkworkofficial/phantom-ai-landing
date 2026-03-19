import React from 'react';
import { getPSEOContext, getAllPSEOKeywords } from '@/lib/pseo-engine';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { SEO } from '@/components/seo/SEO';
import { SchemaOrg } from '@/components/seo/SchemaOrg';
import { ArrowLeft, Repeat } from 'lucide-react';
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
  };
}

export default async function PSEOComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const context = await getPSEOContext(slug);

  if (!context) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <SEO title={context.title} description={context.description} />
      <SchemaOrg 
        type="Article"
        data={{
          headline: context.title,
          description: context.description,
        }}
      />

      <nav className="border-b border-white/5 bg-black/40 backdrop-blur-xl h-16 flex items-center px-6">
        <Link href="/blog" className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Forensic Lab
        </Link>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-20">
        <header className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 border border-purple-500/30">
              <Repeat className="w-6 h-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {context.title}
            </h1>
          </div>
          <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl">
            {context.description}
          </p>
        </header>

        {/* Comparison Logic Placeholder */}
        <section className="space-y-12">
          <div className="p-8 rounded-2xl border border-white/5 bg-zinc-900/20">
            <h2 className="text-2xl font-bold mb-6">Why Phantom Wins</h2>
            <ul className="space-y-4 text-zinc-400">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                <span>**Hypothesis-First Engineering**: We don't just record; we simulate specific user intents.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                <span>**Forensic Substrate**: Capturing behavioral nuance that passive recordings miss.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                <span>**YC Velocity**: Optimized for the speed required by modern founding teams.</span>
              </li>
            </ul>
          </div>
        </section>

        <footer className="mt-20 pt-12 border-t border-white/5 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold transition-colors">
            Start Your First Séance
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </footer>
      </main>
    </div>
  );
}
