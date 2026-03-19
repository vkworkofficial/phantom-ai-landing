import React from 'react';
import Link from 'next/link';
import { Trophy, Shield, AlertTriangle, ArrowRight, Search, Info } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';

const leaderboardData = [
  { rank: 1, name: "Stripe", score: 98, level: "Elite", trend: "stable", tech: "React" },
  { rank: 2, name: "Vercel", score: 95, level: "Elite", trend: "up", tech: "Next.js" },
  { rank: 3, name: "Linear", score: 92, level: "High", trend: "stable", tech: "React" },
  { rank: 4, name: "Airbnb", score: 84, level: "Good", trend: "down", tech: "React" },
  { rank: 5, name: "Salesforce", score: 42, level: "Critical", trend: "down", tech: "Aura" },
];

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans selection:bg-primary/30">
      <SEO 
        title="The Forensic Leaderboard | Phantom AI" 
        description="Daily rankings of the world's top SaaS products based on Human Friction Scores and behavioral forensics." 
      />

      <header className="sticky top-0 z-40 bg-[#010409]/95 backdrop-blur-sm border-b border-[#30363d]">
        <div className="max-w-[1000px] mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-white tracking-tighter text-[20px] flex items-center gap-2">
            <div className="w-5 h-5 bg-primary rounded-sm" /> Phantom <span className="text-primary italic">Leaderboard</span>
          </Link>
          <div className="flex gap-6 text-[12px] font-mono text-[#8b949e]">
             <Link href="/blog" className="hover:text-white uppercase tracking-widest">Insights</Link>
             <Link href="/toolkit" className="hover:text-white uppercase tracking-widest">Toolkit</Link>
          </div>
        </div>
      </header>

      <main className="max-w-[1000px] mx-auto px-4 py-24">
        <div className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-6">
             Live Behavioral Rankings
          </div>
          <h1 className="text-6xl font-black text-white tracking-tight leading-[1.05] mb-8">
            The <span className="text-primary italic">Human Friction</span> Index
          </h1>
          <p className="text-xl text-[#8b949e] max-w-2xl mx-auto leading-relaxed">
            We deploy thousands of AI Ghosts to Stress-Test the world's most popular product interfaces. Who has the lowest friction?
          </p>
        </div>

        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-6 bg-[#010409]/50 border-b border-[#30363d] flex justify-between items-center">
             <div className="flex items-center gap-4">
                <div className="bg-primary/10 text-primary p-2 rounded-lg">
                   <Trophy className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">World Rankings</h3>
             </div>
             <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#484f58]" />
                <input 
                  type="text" 
                  placeholder="Filter products..." 
                  className="bg-[#010409] border border-[#30363d] rounded-md py-2 pl-10 pr-4 text-xs focus:ring-1 focus:ring-primary outline-none transition-all w-64"
                />
             </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#30363d] text-[10px] font-mono text-[#484f58] uppercase tracking-[0.2em]">
                  <th className="p-6">Rank</th>
                  <th className="p-6">Product</th>
                  <th className="p-6 text-center">HFS Score</th>
                  <th className="p-6">Status</th>
                  <th className="p-6">Architecture</th>
                  <th className="p-6"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#30363d]">
                {leaderboardData.map((item) => (
                  <tr key={item.rank} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 font-black text-2xl text-[#30363d] group-hover:text-primary transition-colors">
                      {item.rank.toString().padStart(2, '0')}
                    </td>
                    <td className="p-6">
                      <div className="font-bold text-white text-lg">{item.name}</div>
                      <div className="text-[10px] text-[#484f58] uppercase tracking-widest mt-1">SaaS Fleet // Region US-EAST-1</div>
                    </td>
                    <td className="p-6 text-center">
                      <div className={`text-4xl font-black italic tracking-tighter ${
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
                       {item.tech}
                    </td>
                    <td className="p-6">
                       <button className="p-2 hover:text-primary transition-colors">
                          <ArrowRight className="w-5 h-5" />
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="p-8 rounded-2xl border border-[#30363d] bg-[#010409]/30">
              <Shield className="w-8 h-8 text-primary mb-6" />
              <h4 className="text-white font-bold mb-4">Methodology</h4>
              <p className="text-sm text-[#8b949e] leading-relaxed">
                 HFS scores are calculated by deploying 5,000 Ghost agents with varying latencies. We measure cumulative layout shift, rage click probability, and hydration lag.
              </p>
           </div>
           <div className="p-8 rounded-2xl border border-[#30363d] bg-[#010409]/30">
              <AlertTriangle className="w-8 h-8 text-red-500 mb-6" />
              <h4 className="text-white font-bold mb-4">The Red Zone</h4>
              <p className="text-sm text-[#8b949e] leading-relaxed">
                 Scores below 60 indicate "Severe Intent Fracture." Users are 4x more likely to churn due to interface fatigue within the first 72 hours.
              </p>
           </div>
           <div className="p-8 rounded-2xl border border-[#30363d] bg-[#010409]/30">
              <Info className="w-8 h-8 text-primary mb-6" />
              <h4 className="text-white font-bold mb-4">Get Ranked</h4>
              <p className="text-sm text-[#8b949e] leading-relaxed">
                 Want your product ranked? Connect your staging environment to the Phantom Substrate and run a full Séance ensemble.
              </p>
           </div>
        </div>

        <div className="mt-32 p-12 rounded-3xl bg-gradient-to-br from-[#161b22] to-[#0d1117] border border-primary/20 text-center">
           <h2 className="text-3xl font-black text-white mb-6 uppercase italic">Don't end up in the Red Zone.</h2>
           <p className="text-[#8b949e] mb-12 max-w-xl mx-auto">
              Leading engineering teams use Phantom to keep their Human Friction Score above 90. Move from observation to forensic prevention.
           </p>
           <button className="bg-primary text-white px-10 py-5 rounded-md font-black hover:shadow-[0_0_50px_rgba(234,88,12,0.4)] transition-all uppercase tracking-widest text-[15px] flex items-center gap-3 mx-auto">
              Initiate Forensic Scan <ArrowRight className="w-5 h-5" />
           </button>
        </div>
      </main>

      <footer className="py-16 border-t border-[#30363d] mt-24">
        <div className="max-w-[1000px] mx-auto px-4 flex justify-between items-center text-[12px] font-mono text-[#484f58] uppercase tracking-widest">
           <div>Phantom Index // Signal v3.0</div>
           <div className="flex gap-8">
              <Link href="/blog" className="text-primary hover:underline">Blog</Link>
              <Link href="/toolkit" className="hover:text-white">Toolkit</Link>
           </div>
        </div>
      </footer>
    </div>
  );
}
