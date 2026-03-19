import React from 'react';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { ArrowLeft, Calendar, User, Clock, Share2 } from 'lucide-react';

// Server Component helper
async function getPost(slug: string) {
  const blogDir = path.join(process.cwd(), "../../content/blog");
  const filePath = path.join(blogDir, `${slug}.md`);
  
  if (!fs.existsSync(filePath)) return null;
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Simple frontmatter parser
  const titleMatch = content.match(/title: "(.*)"/);
  const dateMatch = content.match(/date: "(.*)"/);
  const authorMatch = content.match(/author: "(.*)"/);
  
  // Remove frontmatter for content rendering
  const body = content.replace(/^---[\s\S]*?---/, '').trim();
  
  return {
    title: titleMatch ? titleMatch[1] : slug,
    date: dateMatch ? dateMatch[1] : '',
    author: authorMatch ? authorMatch[1] : 'Phantom Team',
    body
  };
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const post = await getPost(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0d1117] text-white flex flex-col items-center justify-center font-mono">
        <h1 className="text-4xl mb-4">404: Signal Lost</h1>
        <p className="text-[#8b949e] mb-8 uppercase tracking-widest">The transmission for slug &quot;{slug}&quot; could not be found.</p>
        <Link href="/blog" className="text-primary hover:underline border border-primary/30 px-6 py-2 rounded-full uppercase tracking-widest font-bold">Back to Transmission List</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans selection:bg-primary/30">
      <header className="sticky top-0 z-40 bg-[#010409]/95 backdrop-blur-sm border-b border-[#30363d]">
        <div className="max-w-[800px] mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/blog" className="flex items-center gap-3 text-[#8b949e] hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" /> <span className="text-[13px] font-bold uppercase tracking-widest">Transmissions</span>
          </Link>
          <div className="flex items-center gap-4">
            <Share2 className="w-4 h-4 text-[#8b949e] cursor-pointer hover:text-white transition-colors" />
          </div>
        </div>
      </header>

      <main className="max-w-[800px] mx-auto px-4 py-20">
        <div className="mb-12">
          <div className="flex items-center gap-6 text-[12px] font-mono text-primary uppercase tracking-widest mb-6">
            <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
            <span className="flex items-center gap-2"><User className="w-3.5 h-3.5" /> {post.author}</span>
            <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> 5 min read</span>
          </div>
          <h1 className="text-5xl font-bold text-white tracking-tight leading-[1.1] mb-8">{post.title}</h1>
          <div className="w-full h-[1px] bg-gradient-to-r from-primary to-transparent mb-12" />
        </div>

        <article className="prose prose-invert prose-lg max-w-none">
          {/* Very basic MD rendering via mapping (could use a real lib like react-markdown) */}
          {post.body.split('\n\n').map((para, i) => {
            if (para.startsWith('# ')) return <h1 key={i} className="text-4xl font-bold text-white mb-6 mt-12">{para.replace('# ', '')}</h1>;
            if (para.startsWith('## ')) return <h2 key={i} className="text-3xl font-bold text-white mb-4 mt-10">{para.replace('## ', '')}</h2>;
            if (para.startsWith('### ')) return <h3 key={i} className="text-2xl font-bold text-white mb-4 mt-8">{para.replace('### ', '')}</h3>;
            if (para.startsWith('- ')) return (
              <ul key={i} className="list-disc pl-6 mb-6 space-y-2">
                {para.split('\n').map((li, liIdx) => <li key={liIdx} className="text-[#8b949e]">{li.replace('- ', '')}</li>)}
              </ul>
            );
            if (para.startsWith('**')) return <p key={i} className="text-[#8b949e] leading-relaxed mb-6 font-bold">{para.replace(/\*\*/g, '')}</p>;
            return <p key={i} className="text-[#8b949e] leading-relaxed mb-6 text-[18px]">{para}</p>;
          })}
        </article>
        
        <div className="mt-20 pt-12 border-t border-[#30363d]">
          <div className="bg-[#161b22] p-8 rounded-xl border border-[#30363d] satin-border text-center">
            <h3 className="text-xl font-bold text-white mb-4 italic uppercase tracking-widest">The Phantom Engine Awaits</h3>
            <p className="text-[#8b949e] mb-8">Stop guessing how your users feel. Launch a Séance and see the truth with AI Forensic Traces.</p>
            <Link href="/" className="bg-primary text-white px-8 py-3 rounded-md font-bold hover:shadow-[0_0_20px_rgba(234,88,12,0.4)] transition-all uppercase tracking-widest">Initiate Command</Link>
          </div>
        </div>
      </main>

      <footer className="py-12 border-t border-[#30363d] mt-20">
        <div className="max-w-[800px] mx-auto px-4 flex justify-between items-center text-[12px] font-mono text-[#484f58]">
          <div>Phantom blog signal v1.0</div>
          <Link href="/blog" className="text-primary hover:underline">Back to all transmissions</Link>
        </div>
      </footer>
    </div>
  );
}
