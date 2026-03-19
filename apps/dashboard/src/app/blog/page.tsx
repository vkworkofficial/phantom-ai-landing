import React from 'react';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { BookOpen, Calendar, User, ArrowRight, Tag, Search, Trophy } from 'lucide-react';

// Server Component helper
async function getPosts() {
  const rootDir = process.cwd();
  let blogDir = path.join(rootDir, "src/content/blog");
  
  // Monorepo support: check apps/dashboard if not in root src
  if (!fs.existsSync(blogDir)) {
    blogDir = path.join(rootDir, "apps/dashboard/src/content/blog");
  }

  if (!fs.existsSync(blogDir)) return [];
  
  const files = fs.readdirSync(blogDir);
  const posts = files.map(filename => {
    const slug = filename.replace('.md', '');
    const content = fs.readFileSync(path.join(blogDir, filename), 'utf8');
    
    // Simple frontmatter parser
    const titleMatch = content.match(/title: "(.*)"/);
    const dateMatch = content.match(/date: "(.*)"/);
    const excerptMatch = content.match(/excerpt: "(.*)"/);
    const categoryMatch = content.match(/category: "(.*)"/);
    const authorMatch = content.match(/author: "(.*)"/);
    
    return {
      slug,
      title: titleMatch ? titleMatch[1] : slug,
      date: dateMatch ? dateMatch[1] : '',
      excerpt: excerptMatch ? excerptMatch[1] : 'No excerpt available.',
      category: categoryMatch ? categoryMatch[1] : 'Engineering',
      author: authorMatch ? authorMatch[1] : 'Phantom Team'
    };
  });
  
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default async function BlogListPage() {
  const posts = await getPosts();
  const categories = Array.from(new Set(posts.map(p => p.category)));

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans selection:bg-primary/30">
      <header className="sticky top-0 z-40 bg-[#010409]/95 backdrop-blur-sm border-b border-[#30363d]">
        <div className="max-w-[1200px] mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-white tracking-tighter text-[22px] flex items-center gap-2">
            <div className="w-5 h-5 bg-primary rounded-sm shadow-[0_0_10px_rgba(234,88,12,0.5)]" /> Phantom <span className="text-primary">Insights</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-[12px] font-mono text-[#8b949e] uppercase tracking-widest">
            <Link href="/docs" className="hover:text-white transition-colors">Documentation</Link>
            <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            <div className="w-px h-4 bg-[#30363d]" />
            <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded border border-primary/20">Forensics v1.2</span>
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-4 py-24">
        <div className="mb-24 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-bold text-primary uppercase tracking-[0.2em] mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> The Forensic Layer
          </div>
          <h1 className="text-6xl font-black text-white tracking-tight mb-8 leading-[1.05]">Engineering <br/><span className="text-primary italic">PMF Velocity</span></h1>
          <p className="text-xl text-[#8b949e] leading-relaxed">Deep dives into synthetic user behavior, high-fidelity browser instrumentation, and the forensic science of conversion optimization.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar / Categories */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-10">
              <div>
                <h3 className="text-[11px] font-bold text-[#484f58] uppercase tracking-[0.25em] mb-4">Categories</h3>
                <div className="flex flex-wrap lg:flex-col gap-2">
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#161b22] border border-primary/50 text-white text-[13px] font-medium transition-all">
                    All Transmissions
                  </button>
                  {categories.map(cat => (
                    <button key={cat} className="flex items-center gap-2 px-3 py-1.5 rounded-md text-[#8b949e] hover:text-white text-[13px] font-medium transition-all hover:bg-[#161b22]">
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Leaderboard Widget */}
              <div className="p-6 rounded-xl border border-[#30363d] bg-gradient-to-br from-[#161b22] to-[#0d1117] satin-border">
                <div className="flex items-center gap-2 mb-6">
                  <Trophy className="w-4 h-4 text-primary" />
                  <h3 className="text-[10px] font-bold text-white uppercase tracking-[0.25em]">Forensic Index</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { name: "Stripe", score: 98 },
                    { name: "Vercel", score: 95 },
                    { name: "Linear", score: 92 },
                  ].map((item, idx) => (
                    <div key={item.name} className="flex justify-between items-center group cursor-pointer">
                      <span className="text-[13px] text-[#8b949e] group-hover:text-white transition-colors">{idx + 1}. {item.name}</span>
                      <span className="text-[13px] font-black text-primary italic">{item.score}</span>
                    </div>
                  ))}
                </div>
                <Link href="/leaderboard" className="mt-6 block text-[10px] font-bold text-primary uppercase tracking-widest hover:underline flex items-center gap-2">
                  View Full Rankings <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="p-6 rounded-xl bg-[#161b22]/50 border border-[#30363d]">
                <h4 className="text-sm font-bold text-white mb-2">Subscribe to Forensics</h4>
                <p className="text-[12px] text-[#8b949e] mb-4">Get the latest simulation benchmarks delivered to your terminal.</p>
                <div className="flex gap-2">
                  <input type="text" placeholder="Email addr" className="bg-[#010409] border border-[#30363d] rounded px-3 py-1.5 text-[12px] w-full focus:outline-none focus:border-primary transition-all" />
                  <button className="bg-primary hover:bg-primary/80 transition-all p-1.5 rounded">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Post Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map(post => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group relative p-8 rounded-2xl bg-[#0d1117] border border-[#30363d] hover:border-primary/50 transition-all duration-500 overflow-hidden flex flex-col">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] group-hover:bg-primary/10 transition-all" />
                  
                  <div className="flex items-center justify-between mb-8">
                    <div className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] px-2 py-0.5 rounded border border-primary/30 bg-primary/5">
                      {post.category}
                    </div>
                    <div className="text-[11px] font-mono text-[#484f58] uppercase tracking-widest flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" /> {post.date}
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-[#8b949e] text-[15px] leading-relaxed mb-10 flex-1">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-[#30363d]/50">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#30363d] to-[#161b22] border border-[#484f58] flex items-center justify-center text-[10px] font-bold text-white uppercase">
                        {post.author.charAt(0)}
                      </div>
                      <span className="text-[12px] font-medium text-[#c9d1d9]">{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[12px] font-bold text-white group-hover:gap-3 transition-all">
                      Read <ArrowRight className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {posts.length === 0 && (
              <div className="text-center py-32 bg-[#161b22]/50 rounded-2xl border border-dashed border-[#30363d] flex flex-col items-center justify-center">
                <BookOpen className="w-12 h-12 text-[#30363d] mb-4" />
                <h3 className="text-white font-bold mb-2 uppercase tracking-widest text-sm">Transmission Silence</h3>
                <p className="text-[#484f58] max-w-sm mx-auto text-sm">New insights are being compiled in the substrate. Check back shortly for forensic traces.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <footer className="border-t border-[#30363d] py-16 mt-32">
        <div className="max-w-[1200px] mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
             <div className="w-4 h-4 bg-[#30363d] rounded-sm" />
             <div className="text-[12px] text-[#484f58] font-mono uppercase tracking-widest">&copy; 2026 Phantom Protocol</div>
          </div>
          <div className="flex items-center gap-8">
            <Link href="/" className="text-[12px] text-[#8b949e] hover:text-primary uppercase tracking-widest font-bold transition-colors">Protocol</Link>
            <Link href="/blog" className="text-[12px] text-[#8b949e] hover:text-primary uppercase tracking-widest font-bold transition-colors">Forensics</Link>
            <Link href="/" className="text-[12px] text-white bg-[#161b22] border border-[#30363d] px-4 py-2 rounded-md hover:border-primary/50 uppercase tracking-widest font-bold transition-all">Back to base</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
