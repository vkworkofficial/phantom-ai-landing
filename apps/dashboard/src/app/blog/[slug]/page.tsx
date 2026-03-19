import React from 'react';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { ArrowLeft, Calendar, User, Clock, Share2, BookOpen, ArrowRight } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { SchemaOrg } from '@/components/seo/SchemaOrg';
import { Metadata } from 'next';
import { cache } from 'react';

// Enable ISR (24-hour cycle)
export const revalidate = 86400;

export async function generateStaticParams() {
  const rootDir = process.cwd();
  let blogDir = path.join(rootDir, "src/content/blog");
  if (!fs.existsSync(blogDir)) {
    blogDir = path.join(rootDir, "apps/dashboard/src/content/blog");
  }
  
  if (!fs.existsSync(blogDir)) return [];
  const files = fs.readdirSync(blogDir);
  return files.map((file) => ({
    slug: file.replace(".md", ""),
  }));
}

// Memoized getter for metadata and rendering
const getPost = cache(async (slug: string) => {
  const rootDir = process.cwd();
  let blogDir = path.join(rootDir, "src/content/blog");
  if (!fs.existsSync(blogDir)) {
    blogDir = path.join(rootDir, "apps/dashboard/src/content/blog");
  }
  const filePath = path.join(blogDir, `${slug}.md`);
  
  if (!fs.existsSync(filePath)) return null;
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Simple frontmatter parser
  const titleMatch = content.match(/title: "(.*)"/);
  const dateMatch = content.match(/date: "(.*)"/);
  const authorMatch = content.match(/author: "(.*)"/);
  const excerptMatch = content.match(/excerpt: "(.*)"/);
  const categoryMatch = content.match(/category: "(.*)"/);
  
  // Remove frontmatter for content rendering
  const body = content.replace(/^---[\s\S]*?---/, '').trim();
  
  return {
    slug,
    title: titleMatch ? titleMatch[1] : slug,
    date: dateMatch ? dateMatch[1] : '',
    author: authorMatch ? authorMatch[1] : 'Phantom Team',
    excerpt: excerptMatch ? excerptMatch[1] : '',
    category: categoryMatch ? categoryMatch[1] : 'Engineering',
    body
  };
});

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPost(slug);
  if (!post) return {};
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    }
  };
}

async function getRecentPosts(currentSlug: string) {
  const rootDir = process.cwd();
  let blogDir = path.join(rootDir, "src/content/blog");
  if (!fs.existsSync(blogDir)) {
    blogDir = path.join(rootDir, "apps/dashboard/src/content/blog");
  }
  if (!fs.existsSync(blogDir)) return [];
  const files = fs.readdirSync(blogDir);
  const posts = files.map(filename => {
    const slug = filename.replace('.md', '');
    const content = fs.readFileSync(path.join(blogDir, filename), 'utf8');
    const titleMatch = content.match(/title: "(.*)"/);
    return {
      slug,
      title: titleMatch ? titleMatch[1] : slug
    };
  }).filter(p => p.slug !== currentSlug).slice(0, 3);
  return posts;
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const post = await getPost(slug);
  const recentPosts = await getRecentPosts(slug);

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
      <SchemaOrg 
        type="Article" 
        data={{
          headline: post.title,
          datePublished: post.date,
          author: { "@type": "Person", "name": post.author },
          description: post.excerpt
        }} 
      />

      <header className="sticky top-0 z-40 bg-[#010409]/95 backdrop-blur-sm border-b border-[#30363d]">
        <div className="max-w-[800px] mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/blog" className="flex items-center gap-3 text-[#8b949e] hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" /> <span className="text-[13px] font-bold uppercase tracking-widest">Transmissions</span>
          </Link>
          <div className="flex items-center gap-4">
             <div className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] px-2 py-0.5 rounded border border-primary/30 bg-primary/5">
                {post.category}
             </div>
          </div>
        </div>
      </header>

      <main className="max-w-[800px] mx-auto px-4 py-20">
        <div className="mb-16">
          <div className="flex items-center gap-6 text-[12px] font-mono text-[#8b949e] uppercase tracking-widest mb-8">
            <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-primary" /> {post.date}</span>
            <span className="flex items-center gap-2 px-3 py-1 rounded bg-[#161b22] border border-[#30363d]"><User className="w-3.5 h-3.5 text-primary" /> {post.author}</span>
            <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-primary" /> 5 min read</span>
          </div>
          <h1 className="text-6xl font-black text-white tracking-tight leading-[1.05] mb-10">{post.title}</h1>
          <div className="w-full h-[2px] bg-gradient-to-r from-primary via-primary/20 to-transparent mb-12" />
        </div>

        <article className="prose prose-invert prose-lg max-w-none">
          {post.body.split(/\n\n+/).map((block, i) => {
            const trimmedBlock = block.trim();
            if (!trimmedBlock) return null;

            // Headers
            if (trimmedBlock.startsWith('# ')) {
              return <h1 key={i} className="text-4xl font-extrabold text-white mb-8 mt-16 tracking-tight">{renderInline(trimmedBlock.replace('# ', ''))}</h1>;
            }
            if (trimmedBlock.startsWith('## ')) {
              return <h2 key={i} className="text-3xl font-bold text-white mb-6 mt-14 tracking-tight border-b border-[#30363d] pb-4">{renderInline(trimmedBlock.replace('## ', ''))}</h2>;
            }
            if (trimmedBlock.startsWith('### ')) {
              return <h3 key={i} className="text-2xl font-bold text-white mb-4 mt-10 tracking-tight">{renderInline(trimmedBlock.replace('### ', ''))}</h3>;
            }

            // Lists
            if (trimmedBlock.startsWith('- ') || trimmedBlock.startsWith('* ')) {
              return (
                <ul key={i} className="list-none pl-0 mb-8 space-y-4">
                  {trimmedBlock.split('\n').filter(li => li.trim()).map((li, liIdx) => (
                    <li key={liIdx} className="text-[#8b949e] flex items-start gap-4 text-[18px]">
                      <span className="text-primary mt-2 font-bold select-none">/</span>
                      <span className="flex-1 leading-relaxed">{renderInline(li.replace(/^[-*]\s+/, ''))}</span>
                    </li>
                  ))}
                </ul>
              );
            }

            // Blockquote
            if (trimmedBlock.startsWith('> ')) {
              return (
                <blockquote key={i} className="border-l-4 border-primary pl-8 py-6 italic text-white text-[20px] bg-gradient-to-r from-primary/5 to-transparent my-12 rounded-r-2xl">
                  {renderInline(trimmedBlock.replace(/^>\s+/, ''))}
                </blockquote>
              );
            }

            // Paragraph
            return (
              <p key={i} className="text-[#8b949e] leading-[1.8] mb-8 text-[19px] font-normal">
                {renderInline(trimmedBlock)}
              </p>
            );
          })}
        </article>
        
        {/* Read Next Section */}
        <div className="mt-32 pt-16 border-t border-[#30363d]">
          <h3 className="text-[11px] font-bold text-[#484f58] uppercase tracking-[0.25em] mb-8">Continue the Forensic Trace</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentPosts.map((p: { slug: string; title: string }) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group p-6 rounded-xl bg-[#161b22] border border-[#30363d] hover:border-primary/50 transition-all flex items-center justify-between">
                <span className="text-white font-bold text-sm group-hover:text-primary transition-colors">{p.title}</span>
                <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <div className="bg-gradient-to-br from-[#161b22] to-[#0d1117] p-12 rounded-2xl border border-[#30363d] satin-border relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px]" />
            <div className="relative z-10">
              <h3 className="text-2xl font-black text-white mb-4 italic uppercase tracking-tighter">The Phantom Engine Awaits</h3>
              <p className="text-[#8b949e] mb-10 text-lg max-w-lg leading-relaxed">Stop guessing how your users feel. Launch a Séance and see the truth with AI Forensic Traces. Gain PMF velocity today.</p>
              <Link href="/" className="inline-flex items-center gap-3 bg-primary text-white px-10 py-4 rounded-md font-black hover:shadow-[0_0_30px_rgba(234,88,12,0.5)] transition-all uppercase tracking-[0.15em] text-[14px]">
                Initiate Command <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-16 border-t border-[#30363d] mt-24">
        <div className="max-w-[800px] mx-auto px-4 flex justify-between items-center text-[12px] font-mono text-[#484f58] uppercase tracking-widest">
          <div>Phantom Protocol // Signal v1.2</div>
          <Link href="/blog" className="text-primary hover:underline font-bold">Back to base list</Link>
        </div>
      </footer>
    </div>
  );
}

// Simple inline markdown parser
function renderInline(text: string) {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`|\[.*?\]\(.*?\))/g);
  
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-white font-black">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={i} className="italic text-[#c9d1d9]">{part.slice(1, -1)}</em>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i} className="bg-primary/10 border border-primary/20 px-2 py-0.5 rounded text-primary text-[15px] font-mono mx-1">{part.slice(1, -1)}</code>;
    }
    const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
    if (linkMatch) {
      return (
        <a key={i} href={linkMatch[2]} className="text-primary hover:underline underline-offset-4 decoration-primary/30 transition-all font-bold">
          {linkMatch[1]}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}
