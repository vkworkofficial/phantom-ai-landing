"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Play, Activity, SplitSquareHorizontal, Settings2, Globe, Terminal, Loader2 } from 'lucide-react';
import { LayoutDashboard, Users, Settings, Cpu, Layers, Box } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function NewRun() {
  const { data: session } = useSession();
  const router = useRouter();
  const [targetUrl, setTargetUrl] = useState('');
  const [isSplitTest, setIsSplitTest] = useState(false);
  const [variantUrl, setVariantUrl] = useState('');
  const [observeMode, setObserveMode] = useState(false);
  const [numInstances, setNumInstances] = useState(50);
  const [industry, setIndustry] = useState('SaaS / B2B');
  const [goal, setGoal] = useState('Complete Sign Up');
  const [loading, setLoading] = useState(false);
  
  const handleLaunch = async () => {
    if (!targetUrl) return;
    setLoading(true);

    try {
      const response = await fetch('/api/v1/simulations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          target_url: targetUrl,
          organization_id: (session?.user as any)?.organization_id,
          num_instances: numInstances,
          industry,
          primary_goal: goal,
          variant_url: isSplitTest ? variantUrl : null,
          is_ab_test: isSplitTest,
          personas: ["standard_user"]
        })
      });

      if (!response.ok) throw new Error('Failed to initiate simulation');
      const data = await response.json();

      const queryParams = new URLSearchParams({
        observe: observeMode.toString(),
        is_ab: isSplitTest.toString(),
        token: data.simulation_token || ''
      });
      
      router.push(`/dashboard/simulations/${data.id}?${queryParams.toString()}`);
    } catch (e) {
      console.error("Simulation initialization failed:", e);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-light text-white tracking-widest uppercase mb-3 flex items-center gap-3">
          <Activity className="w-8 h-8 text-primary" /> Start Simulation
        </h1>
        <p className="text-sm font-mono tracking-wider text-[#8b949e]">Configure and deploy synthetic user instances against your environment to measure friction.</p>
      </div>

      <div className="space-y-8">
        {/* Core Target */}
        <div className="rounded-lg border border-[#2d2d30] bg-[#111114] p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-5 h-5 text-primary" />
            <h2 className="text-sm font-bold tracking-widest uppercase text-white">Target URI</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-[#8b949e] uppercase tracking-widest mb-2">Base URL</label>
              <input 
                type="url" 
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                placeholder="https://staging.your-app.com"
                className="w-full bg-[#0a0a0c] border border-[#2d2d30] rounded text-lg px-6 py-4 text-[#c9d1d9] font-mono focus:border-primary focus:outline-none transition-colors placeholder:text-[#5c646c]"
              />
            </div>

            <label className="flex items-center gap-3 cursor-pointer group mt-4">
              <input 
                type="checkbox" 
                checked={isSplitTest}
                onChange={(e) => setIsSplitTest(e.target.checked)}
                className="w-4 h-4 rounded-sm border-[#2d2d30] text-primary focus:ring-primary bg-[#0a0a0c] outline-none" 
              />
              <span className="text-[11px] font-bold text-[#8b949e] uppercase tracking-widest group-hover:text-white transition-colors flex items-center gap-2">
                <SplitSquareHorizontal className="w-4 h-4" /> Enable A/B Strain Testing
              </span>
            </label>

            {isSplitTest && (
              <div className="pt-4 animate-in fade-in slide-in-from-top-4 duration-300">
                <label className="block text-[10px] font-bold text-primary uppercase tracking-widest mb-2">Variant URI</label>
                <input 
                  type="url" 
                  value={variantUrl}
                  onChange={(e) => setVariantUrl(e.target.value)}
                  placeholder="https://staging-b.your-app.com"
                  className="w-full bg-[#0a0a0c] border border-[#2d2d30] rounded text-lg px-6 py-4 text-[#c9d1d9] font-mono focus:border-primary focus:outline-none transition-colors placeholder:text-[#5c646c]"
                />
              </div>
            )}
          </div>
        </div>

        {/* Configuration Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-lg border border-[#2d2d30] bg-[#111114] p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Activity className="w-5 h-5 text-[#8b949e]" />
              <h2 className="text-sm font-bold tracking-widest uppercase text-white">Simulation Volume</h2>
            </div>
            <div className="space-y-6">
              <div>
                 <div className="flex justify-between items-center mb-2">
                    <label className="text-[10px] font-bold text-[#8b949e] uppercase tracking-widest">Concurrent Instances</label>
                    <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">{numInstances} Users</span>
                 </div>
                 <input 
                   type="range" min="1" max="500" 
                   value={numInstances}
                   onChange={(e) => setNumInstances(parseInt(e.target.value))}
                   className="w-full accent-primary cursor-pointer" 
                 />
              </div>
              <p className="text-[10px] font-mono text-[#5c646c] leading-relaxed uppercase tracking-wider">
                Controls the number of high-fidelity synthetic user instances provisioned for this simulation.
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-[#2d2d30] bg-[#111114] p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Layers className="w-5 h-5 text-[#8b949e]" />
              <h2 className="text-sm font-bold tracking-widest uppercase text-white">Behavioral Profile</h2>
            </div>
            <div className="space-y-4">
               <div>
                  <label className="block text-[10px] font-bold text-[#8b949e] uppercase tracking-widest mb-2">Target Demographic</label>
                  <select 
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full bg-[#0a0a0c] border border-[#2d2d30] rounded text-xs px-4 py-3 text-[#c9d1d9] font-mono focus:border-primary outline-none appearance-none"
                  >
                    <option>SaaS / B2B</option>
                    <option>E-commerce</option>
                    <option>Fintech</option>
                  </select>
               </div>
               
               <div className="mt-4">
                  <label className="block text-[10px] font-bold text-[#8b949e] uppercase tracking-widest mb-2">Success Criteria</label>
                  <input 
                    type="text"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full bg-[#0a0a0c] border border-[#2d2d30] rounded text-xs px-4 py-3 text-[#c9d1d9] font-mono focus:border-primary outline-none"
                  />
               </div>
               
               <label className="flex items-start gap-4 cursor-pointer p-4 rounded border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors group mt-6">
                 <input 
                   type="checkbox" 
                   checked={observeMode}
                   onChange={(e) => setObserveMode(e.target.checked)}
                   className="mt-0.5 w-4 h-4 rounded-sm border-primary text-primary focus:ring-primary bg-[#0a0a0c] outline-none" 
                 />
                 <div>
                   <div className="text-[11px] font-bold uppercase tracking-widest text-primary mb-1 group-hover:text-white transition-colors">Live Visualization</div>
                   <div className="text-[10px] font-mono text-[#8b949e] leading-relaxed">View real-time synthetic user decision paths and interaction events from a sample instance.</div>
                 </div>
               </label>
            </div>
          </div>
        </div>

        {/* Action */}
        <div className="pt-8 border-t border-[#2d2d30] flex justify-end">
          <button 
            onClick={handleLaunch}
            disabled={!targetUrl || loading}
            className={`flex items-center gap-3 px-8 py-4 rounded text-sm font-bold uppercase tracking-widest transition-all ${
              targetUrl && !loading
                ? 'bg-primary text-white hover:opacity-90 shadow-[0_0_20px_rgba(234,88,12,0.4)]' 
                : 'bg-[#2d2d30] text-[#5c646c] cursor-not-allowed'
            }`}
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
            {loading ? 'Initializing...' : 'Launch Simulation'}
          </button>
        </div>
      </div>
    </div>
  );
}
