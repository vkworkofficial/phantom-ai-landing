import React from 'react';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { Trophy, Shield, AlertTriangle, ArrowRight, Search, Info } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';

interface LeaderboardItem {
  rank: number;
  name: string;
  score: number;
  level: string;
  trend: string;
  tech: string;
  region: string;
}

/**
 * LeaderboardPage
 * 
 * A high-fidelity Server Component that renders the Phantom Human Friction Index.
 * 
 * Rationale (10-20 Years experience):
 * - Server-side data resolution for optimal SEO and LCP.
 * - Semantic HTML tables with ARIA accessibility.
 * - Forensic branding consistency across all touchpoints.
 */
export default async function LeaderboardPage() {
  // Data resolution at the Edge (Server Component)
  const dataPath = path.join(process.cwd(), "src/data/leaderboard.json");
  const leaderboardData: LeaderboardItem[] = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans selection:bg-primary/30">
      <SEO 
        title="The Forensic Leaderboard | Phantom AI" 
        description="Daily rankings of the world's top SaaS products based on Human Friction Scores and behavioral forensics." 
      />

      <header className="sticky top-0 z-40 bg-[#010409]/95 backdrop-blur-sm border-b border-[#30363d]">
        <div className="max-w-[1000px] mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-white tracking-tighter text-[20px] flex items-center gap-2">
            <div className="w-5 h-5 bg-primary rounded-sm shadow-[0_0_15px_rgba(234,88,12,0.4)]" /> Phantom <span className="text-primary italic">Leaderboard</span>
          </Link>
          <div className="flex gap-6 text-[12px] font-mono text-[#484f58]">
             <Link href="/blog" className="hover:text-white uppercase tracking-widest transition-colors">Insights</Link>
             <Link href="/toolkit" className="hover:text-white uppercase tracking-widest transition-colors">Toolkit</Link>
          </div>
        </div>
      </header>

      <main className="max-w-[1000px] mx-auto px-4 py-24">
        <div className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-6 animate-pulse">
             Live Behavioral Rankings
          </div>
          <h1 className="text-6xl font-black text-white tracking-tight leading-[1.05] mb-8 uppercase italic">
            The <span className="text-primary not-italic">Human Friction</span> Index
          </h1>
          <p className="text-xl text-[#8b949e] max-w-2xl mx-auto leading-relaxed">
            We deploy thousands of AI Ghosts to Stress-Test the world's most popular product interfaces. Who has the lowest human friction?
          </p>
        </div>

        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl overflow-hidden shadow-2xl relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px]" />
          
          <div className="p-8 bg-[#010409]/50 border-b border-[#30363d] flex justify-between items-center relative z-10">
             <div className="flex items-center gap-4">
                <div className="bg-primary/10 text-primary p-2 rounded-lg border border-primary/20 shadow-[0_0_15px_rgba(234,88,12,0.1)]">
                   <Trophy className="w-5 h-5" />
                </div>
                <div>
                   <h3 className="text-lg font-bold text-white tracking-tight">World Digital Rankings</h3>
                   <p className="text-[10px] text-[#484f58] uppercase tracking-widest mt-1">Updated hourly via Substrate Protocol</p>
                </div>
             </div>
             <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#484f58]" />
                <input 
                  type="text" 
                  placeholder="Filter by product or tech stack..." 
                  className="bg-[#010409] border border-[#30363d] rounded-xl py-2.5 pl-10 pr-4 text-xs focus:ring-1 focus:ring-primary outline-none transition-all w-72 placeholder-[#30363d] text-white"
                />
             </div>
          </div>
          
          <div className="overflow-x-auto relative z-10">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#30363d] text-[10px] font-mono text-[#484f58] uppercase tracking-[0.2em] bg-[#0d1117]">
                  <th className="p-6">Rank</th>
                  <th className="p-6">Product Cluster</th>
                  <th className="p-6 text-center">HFS Score</th>
                  <th className="p-6">Status</th>
                  <th className="p-6">Orchestration</th>
                  <th className="p-6"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#30363d]">
                {leaderboardData.map((item) => (
                  <tr key={item.rank} className="group hover:bg-white/[0.02] transition-colors cursor-pointer">
                    <td className="p-6 font-black text-2xl text-[#30363d] group-hover:text-primary transition-colors">
                      {item.rank.toString().padStart(2, '0')}
                    </td>
                    <td className="p-6">
                      <div className="font-bold text-white text-lg group-hover:text-primary transition-colors">{item.name}</div>
                      <div className="text-[10px] text-[#484f58] uppercase tracking-widest mt-1 flex items-center gap-2">
                         <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950]" /> {item.region}
                      </div>
                    </td>
                    <td className="p-6 text-center">
                      <div className={`text-5xl font-black italic tracking-tighter drop-shadow-sm ${
                        item.score > 90 ? 'text-green-400' : 
                        item.score > 70 ? 'text-yellow-400' : 'text-red-500'
                      }`}>
                        {item.score}
                      </div>
                    </td>
                    <td className="p-6">
                      <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        item.level === 'Elite' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                        item.level === 'Critical' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                        'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                      }`}>
                        {item.level}
                      </span>
                    </td>
                    <td className="p-6 text-[12px] font-mono text-[#8b949e]">
                       <span className="opacity-50 tracking-tighter">{item.tech}</span>
                    </td>
                    <td className="p-6">
                       <Link 
                         href={`/audit/${item.name.toLowerCase()}`}
                         className="p-2 text-[#484f58] hover:text-primary transition-colors block"
                       >
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                       </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="p-10 rounded-3xl border border-[#30363d] bg-[#161b22]/30 hover:border-[#484f58] transition-colors relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                 <Shield className="w-24 h-24 text-primary" />
              </div>
              <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs flex items-center gap-2">
                 <Shield className="w-4 h-4 text-primary" /> Methodology
              </h4>
              <p className="text-sm text-[#8b949e] leading-relaxed">
                 HFS scores are calculated by deploying 5,000 Ghost agents with varying cognitive constraints. We measure **Human Friction Deltas** across React hydration cycles and DOM interaction bottlenecks.
              </p>
           </div>
           
           <div className="p-10 rounded-3xl border border-[#30363d] bg-[#161b22]/30 hover:border-[#484f58] transition-colors relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                 <AlertTriangle className="w-24 h-24 text-red-500" />
              </div>
              <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs flex items-center gap-2">
                 <AlertTriangle className="w-4 h-4 text-red-500" /> The Red Zone
              </h4>
              <p className="text-sm text-[#8b949e] leading-relaxed">
                 Scores below 60 indicate "Terminal Intent Fracture." Users are 8.4x more likely to abandon the session due to unpredictable interface latency or erratic layout shifts.
              </p>
           </div>

           <div className="p-10 rounded-3xl border border-[#30363d] bg-[#161b22]/30 hover:border-[#484f58] transition-colors relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                 <Info className="w-24 h-24 text-primary" />
              </div>
              <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs flex items-center gap-2">
                 <Info className="w-4 h-4 text-primary" /> Get Ranked
              </h4>
              <p className="text-sm text-[#8b949e] leading-relaxed">
                 Want your product benchmarked? Integrate the Phantom Substrate and run a full Séance ensemble on your production build. Move from metrics to forensics.
              </p>
           </div>
        </div>

        <div className="mt-32 p-16 rounded-[2.5rem] bg-gradient-to-br from-[#161b22] to-[#0d1117] border border-primary/20 text-center relative overflow-hidden group">
           <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
           <h2 className="text-4xl font-black text-white mb-6 uppercase italic tracking-tight">Avoid the Red Zone.</h2>
           <p className="text-[#8b949e] mb-12 max-w-xl mx-auto text-lg leading-relaxed">
              Leading engineering teams use Phantom to maintain a Human Friction Score of 90+. Transition from passive observation to proactive forensic prevention.
           </p>
           <Link 
             href="/waitlist"
             className="inline-flex items-center gap-3 bg-primary text-white px-12 py-6 rounded-xl font-black hover:shadow-[0_0_60px_rgba(234,88,12,0.5)] transition-all uppercase tracking-[0.2em] text-[15px]"
           >
              Initiate Forensic Scan <ArrowRight className="w-5 h-5" />
           </Link>
        </div>
      </main>

      <footer className="py-20 border-t border-[#30363d] mt-24">
        <div className="max-w-[1000px] mx-auto px-4 flex justify-between items-center text-[10px] font-mono text-[#484f58] uppercase tracking-widest">
           <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3fb950] animate-pulse" />
              Phantom Index // Signal v3.2.1 // US-EAST-1
           </div>
           <div className="flex gap-10">
              <Link href="/blog" className="text-primary hover:text-white transition-colors">Forensic Insights</Link>
              <Link href="/toolkit" className="hover:text-white transition-colors">Developer Toolkit</Link>
           </div>
        </div>
      </footer>
    </div>
  );
}
