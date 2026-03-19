"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Play, Activity, SplitSquareHorizontal, Settings2, Globe, Terminal, Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function NewRun() {
  const { data: session } = useSession();
  const router = useRouter();
  const [targetUrl, setTargetUrl] = useState('');
  const [isSplitTest, setIsSplitTest] = useState(false);
  const [variantUrl, setVariantUrl] = useState('');
  const [observeMode, setObserveMode] = useState(false);
  const [numGhosts, setNumGhosts] = useState(50);
  const [industry, setIndustry] = useState('SaaS / B2B');
  const [goal, setGoal] = useState('Complete Sign Up');
  const [loading, setLoading] = useState(false);
  
  const handleHaunt = async () => {
    if (!targetUrl) return;
    setLoading(true);

    try {
      const response = await fetch('/api/v1/simulations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          target_url: targetUrl,
          organization_id: (session?.user as any)?.organization_id,
          num_ghosts: numGhosts,
          industry,
          primary_goal: goal,
          variant_url: isSplitTest ? variantUrl : null,
          is_ab_test: isSplitTest,
          personas: ["standard_user"] // Default for dashboard quick-run
        })
      });

      if (!response.ok) throw new Error('Failed to initiate simulation');
      const data = await response.json();

      const queryParams = new URLSearchParams({
        observe: observeMode.toString(),
        is_ab: isSplitTest.toString(),
        token: data.seance_token || ''
      });
      
      router.push(`/dashboard/simulations/${data.id}?${queryParams.toString()}`);
    } catch (e) {
      console.error("Simulation trigger failed substrate connection:", e);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-light text-white tracking-widest uppercase mb-3 flex items-center gap-3">
          <Terminal className="w-8 h-8 text-[#ea580c]" /> Initiate Séance
        </h1>
        <p className="text-sm font-mono tracking-wider text-[#8b949e]">Configure and deploy a cognitive payload against your staging or production environment.</p>
      </div>

      <div className="space-y-8">
        {/* Core Target */}
        <div className="rounded border border-[#2d2d30] bg-[#111114] p-8 shadow-[0_0_20px_rgba(0,0,0,0.5)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#ea580c]" />
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-5 h-5 text-[#ea580c]" />
            <h2 className="text-sm font-bold tracking-widest uppercase text-white">Target Vector</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-[#8b949e] uppercase tracking-widest mb-2">Primary URI</label>
              <input 
                type="url" 
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                placeholder="https://staging.your-app.com"
                className="w-full bg-[#0a0a0c] border border-[#2d2d30] rounded text-lg px-6 py-4 text-[#c9d1d9] font-mono focus:border-[#ea580c] focus:outline-none transition-colors placeholder:text-[#5c646c]"
              />
            </div>

            <label className="flex items-center gap-3 cursor-pointer group mt-4">
              <input 
                type="checkbox" 
                checked={isSplitTest}
                onChange={(e) => setIsSplitTest(e.target.checked)}
                className="w-4 h-4 rounded-sm border-[#2d2d30] text-[#8a2be2] focus:ring-[#8a2be2] bg-[#0a0a0c] outline-none" 
              />
              <span className="text-[11px] font-bold text-[#8b949e] uppercase tracking-widest group-hover:text-white transition-colors flex items-center gap-2">
                <SplitSquareHorizontal className="w-4 h-4" /> Enable A/B Strain Testing
              </span>
            </label>

            {isSplitTest && (
              <div className="pt-4 animate-in fade-in slide-in-from-top-4 duration-300">
                <label className="block text-[10px] font-bold text-[#8a2be2] uppercase tracking-widest mb-2">Variant URI (Strain B)</label>
                <input 
                  type="url" 
                  value={variantUrl}
                  onChange={(e) => setVariantUrl(e.target.value)}
                  placeholder="https://staging-b.your-app.com"
                  className="w-full bg-[#0a0a0c] border border-[#2d2d30] rounded text-lg px-6 py-4 text-[#c9d1d9] font-mono focus:border-[#8a2be2] focus:outline-none transition-colors placeholder:text-[#5c646c]"
                />
              </div>
            )}
          </div>
        </div>

        {/* Configuration Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded border border-[#2d2d30] bg-[#111114] p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Activity className="w-5 h-5 text-[#8b949e]" />
              <h2 className="text-sm font-bold tracking-widest uppercase text-white">Seance Volume</h2>
            </div>
            <div className="space-y-6">
              <div>
                 <div className="flex justify-between items-center mb-2">
                    <label className="text-[10px] font-bold text-[#8b949e] uppercase tracking-widest">Concurrent Agents</label>
                    <span className="text-xs font-mono text-[#ea580c] bg-[#ea580c]/10 px-2 py-0.5 rounded border border-[#ea580c]/20">50 Ghosts</span>
                 </div>
                 <input 
                   type="range" min="10" max="500" 
                   value={numGhosts}
                   onChange={(e) => setNumGhosts(parseInt(e.target.value))}
                   className="w-full accent-[#ea580c] cursor-pointer" 
                 />
              </div>
              <p className="text-[10px] font-mono text-[#5c646c] leading-relaxed uppercase tracking-wider">
                Determines the volume of headless chromium instances provisioned for this payload. High volume may induce artificial latency on the target DB.
              </p>
            </div>
          </div>

          <div className="rounded border border-[#2d2d30] bg-[#111114] p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Settings2 className="w-5 h-5 text-[#8b949e]" />
              <h2 className="text-sm font-bold tracking-widest uppercase text-white">Cognitive Profile</h2>
            </div>
            <div className="space-y-4">
               <div>
                  <label className="block text-[10px] font-bold text-[#8b949e] uppercase tracking-widest mb-2">Target Demographic</label>
                  <select 
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full bg-[#0a0a0c] border border-[#2d2d30] rounded text-xs px-4 py-3 text-[#c9d1d9] font-mono focus:border-[#ea580c] outline-none appearance-none"
                  >
                    <option>SaaS / B2B</option>
                    <option>E-commerce</option>
                    <option>Fintech</option>
                  </select>
               </div>
               
               <div className="mt-4">
                  <label className="block text-[10px] font-bold text-[#8b949e] uppercase tracking-widest mb-2">Primary Goal</label>
                  <input 
                    type="text"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full bg-[#0a0a0c] border border-[#2d2d30] rounded text-xs px-4 py-3 text-[#c9d1d9] font-mono focus:border-[#ea580c] outline-none"
                  />
               </div>
               
               <label className="flex items-start gap-4 cursor-pointer p-4 rounded border border-[#8a2be2]/30 bg-[#8a2be2]/5 hover:bg-[#8a2be2]/10 transition-colors group mt-6">
                 <input 
                   type="checkbox" 
                   checked={observeMode}
                   onChange={(e) => setObserveMode(e.target.checked)}
                   className="mt-0.5 w-4 h-4 rounded-sm border-[#8a2be2] text-[#8a2be2] focus:ring-[#8a2be2] bg-[#0a0a0c] outline-none" 
                 />
                 <div>
                   <div className="text-[11px] font-bold uppercase tracking-widest text-[#9f7aea] mb-1 group-hover:text-white transition-colors">Live Observation Mode</div>
                   <div className="text-[10px] font-mono text-[#8b949e] leading-relaxed">Stream real-time agent cognition, viewport telemetry, and DOM mutation events from a sample node in the fleet.</div>
                 </div>
               </label>
            </div>
          </div>
        </div>

        {/* Action */}
        <div className="pt-8 border-t border-[#2d2d30] flex justify-end">
          <button 
            onClick={handleHaunt}
            disabled={!targetUrl || loading}
            className={`flex items-center gap-3 px-8 py-4 rounded text-sm font-bold uppercase tracking-widest transition-all ${
              targetUrl && !loading
                ? 'bg-[#ea580c] text-white hover:bg-[#ff7a2d] shadow-[0_0_20px_rgba(234,88,12,0.4)] hover:shadow-[0_0_30px_rgba(234,88,12,0.6)]' 
                : 'bg-[#2d2d30] text-[#5c646c] cursor-not-allowed'
            }`}
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
            {loading ? 'Executing...' : 'Execute Payload'}
          </button>
        </div>
      </div>
    </div>
  );
}
