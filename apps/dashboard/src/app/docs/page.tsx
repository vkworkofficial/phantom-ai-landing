import React from "react";
import { ArrowLeft, Book, Code, Shield, Zap, Terminal, Search } from "lucide-react";
import Link from "next/link";
import fs from 'fs';
import path from 'path';

// Server Component helper
async function getDocs() {
  const docsDir = path.join(process.cwd(), "../../content/docs");
  if (!fs.existsSync(docsDir)) return [];
  
  const files = fs.readdirSync(docsDir);
  return files.map(filename => {
    const slug = filename.replace('.md', '');
    const content = fs.readFileSync(path.join(docsDir, filename), 'utf8');
    const titleMatch = content.match(/title: "(.*)"/);
    return {
      slug,
      title: titleMatch ? titleMatch[1] : slug,
      body: content.replace(/^---[\s\S]*?---/, '').trim()
    };
  });
}

export default async function DocsPage() {
  const docs = await getDocs();
  const activeDoc = docs[0] || { title: "Documentation", body: "No content available." };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans selection:bg-primary/30">
      <header className="sticky top-0 z-40 bg-[#010409]/95 backdrop-blur-sm border-b border-[#30363d]">
        <div className="max-w-[1280px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <span className="font-bold text-white tracking-tighter text-[20px]">Substrate Protocol v4.2</span>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center gap-2 border border-[#30363d] bg-[#161b22] px-3 py-1.5 rounded-md text-[13px] text-[#8b949e]">
                <Search className="w-3.5 h-3.5" /> <span>Search docs...</span>
             </div>
             <div className="text-[11px] font-mono text-[#484f58] uppercase tracking-widest">Documentation</div>
          </div>
        </div>
      </header>

      <main className="max-w-[1280px] mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Sidebar Nav */}
        <aside className="md:col-span-1 space-y-8">
          <div>
            <h3 className="text-[11px] font-bold text-[#484f58] uppercase tracking-widest mb-4">Core Concepts</h3>
            <ul className="space-y-3 text-[13px]">
              {docs.map(doc => (
                <li key={doc.slug} className={`${doc.slug === activeDoc.slug ? 'text-primary font-bold' : 'text-[#8b949e] hover:text-[#c9d1d9]'} cursor-pointer transition-colors flex items-center gap-2`}>
                   <div className={`w-1 h-1 rounded-full ${doc.slug === activeDoc.slug ? 'bg-primary animate-pulse' : 'bg-transparent'}`} />
                   {doc.title}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[11px] font-bold text-[#484f58] uppercase tracking-widest mb-4">Reference</h3>
            <ul className="space-y-3 text-[13px]">
              <li className="text-[#8b949e] hover:text-[#c9d1d9] cursor-pointer">API Specification</li>
              <li className="text-[#8b949e] hover:text-[#c9d1d9] cursor-pointer">Ghost Heuristics v2</li>
              <li className="text-[#8b949e] hover:text-[#c9d1d9] cursor-pointer">Compliance & Safety</li>
            </ul>
          </div>
        </aside>

        {/* Content Area */}
        <div className="md:col-span-3 space-y-12 pb-24">
          <section className="prose prose-invert prose-lg max-w-none">
             {activeDoc.body.split('\n\n').map((para, i) => {
                if (para.startsWith('# ')) return <h1 key={i} className="text-5xl font-bold text-white mb-8 tracking-tight">{para.replace('# ', '')}</h1>;
                if (para.startsWith('## ')) return <h2 key={i} className="text-3xl font-bold text-white mb-6 mt-12 border-b border-[#30363d] pb-4">{para.replace('## ', '')}</h2>;
                if (para.startsWith('### ')) return <h3 key={i} className="text-2xl font-bold text-white mb-4 mt-8">{para.replace('### ', '')}</h3>;
                if (para.startsWith('```')) return (
                   <div key={i} className="bg-[#010409] p-6 rounded-xl border border-[#30363d] font-mono text-[14px] overflow-hidden my-8">
                      <pre className="text-primary">{para.replace(/```[a-z]*/g, '').trim()}</pre>
                   </div>
                );
                return <p key={i} className="text-[#8b949e] leading-relaxed mb-6 text-[18px]">{para}</p>;
             })}
          </section>
          
          <div className="pt-12 border-t border-[#30363d] flex justify-between items-center text-sm">
             <div className="flex items-center gap-2 text-[#484f58]">
                <span>Last updated: March 19, 2026</span>
             </div>
             <Link href="https://github.com/vkworkofficial/phantom-ai-landing" className="text-[#8b949e] hover:text-white transition-colors flex items-center gap-2">
                <Code className="w-4 h-4" /> Edit this page on GitHub
             </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
