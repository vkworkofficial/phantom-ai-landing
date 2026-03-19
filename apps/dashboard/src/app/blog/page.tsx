import React from 'react';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { BookOpen, Calendar, User, ArrowRight } from 'lucide-react';

// Server Component helper
async function getPosts() {
  const blogDir = path.join(process.cwd(), "../../content/blog");
  if (!fs.existsSync(blogDir)) return [];
  
  const files = fs.readdirSync(blogDir);
  const posts = files.map(filename => {
    const slug = filename.replace('.md', '');
    const content = fs.readFileSync(path.join(blogDir, filename), 'utf8');
    
    // Simple frontmatter parser
    const titleMatch = content.match(/title: "(.*)"/);
    const dateMatch = content.match(/date: "(.*)"/);
    const excerptMatch = content.match(/excerpt: "(.*)"/);
    
    return {
      slug,
      title: titleMatch ? titleMatch[1] : slug,
      date: dateMatch ? dateMatch[1] : '',
      excerpt: excerptMatch ? excerptMatch[1] : 'No excerpt available.'
    };
  });
  
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default async function BlogListPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans selection:bg-primary/30">
      <header className="sticky top-0 z-40 bg-[#010409]/95 backdrop-blur-sm border-b border-[#30363d]">
        <div className="max-w-[1000px] mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-white tracking-tighter text-[22px] flex items-center gap-2">
            <div className="w-5 h-5 bg-primary rounded-sm" /> Phantom Blog
          </Link>
          <div className="text-[11px] font-mono text-[#484f58] uppercase tracking-widest">Substrate Protocol Insights</div>
        </div>
      </header>

      <main className="max-w-[1000px] mx-auto px-4 py-20">
        <div className="mb-20 text-center">
          <h1 className="text-5xl font-bold text-white tracking-tight mb-4">Engineering PMF Velocity</h1>
          <p className="text-xl text-[#8b949e]">Deep dives into synthetic user behavior, high-fidelity browser instrumentation, and the math of product-market fit.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group p-8 rounded-xl bg-[#161b22] border border-[#30363d] hover:border-[#484f58] transition-all hover:shadow-[0_0_20px_rgba(234,88,12,0.1)] satin-border">
              <div className="flex items-center gap-4 text-[11px] font-mono text-primary uppercase tracking-widest mb-6">
                <Calendar className="w-3.5 h-3.5" /> {post.date}
              </div>
              <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{post.title}</h2>
              <p className="text-[#8b949e] text-[15px] leading-relaxed mb-8">{post.excerpt}</p>
              <div className="flex items-center gap-2 text-[13px] font-bold text-white group-hover:gap-4 transition-all">
                Read full transmission <ArrowRight className="w-4 h-4 text-primary" />
              </div>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-24 bg-[#161b22] rounded-xl border border-dashed border-[#30363d]">
            <BookOpen className="w-12 h-12 text-[#484f58] mx-auto mb-4" />
            <p className="text-[#8b949e]">Transmission silence. New insights are being compiled in the substrate.</p>
          </div>
        )}
      </main>
      
      <footer className="border-t border-[#30363d] py-12 mt-20">
        <div className="max-w-[1000px] mx-auto px-4 flex justify-between items-center">
          <div className="text-[12px] text-[#484f58] font-mono">&copy; 2026 Phantom AI Blog</div>
          <Link href="/" className="text-[12px] text-primary hover:underline uppercase tracking-widest font-bold">Back to base</Link>
        </div>
      </footer>
    </div>
  );
}
