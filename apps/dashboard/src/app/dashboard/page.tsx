"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Activity, ShieldAlert, Cpu, Server, Globe, Terminal, GitBranch, Box, Database, Zap, CheckCircle2, User, Download, Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function DashboardOverview() {
  const { data: session } = useSession();
  const [recentRuns, setRecentRuns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user) return;
    
    const fetchSims = async () => {
      try {
        const orgId = (session.user as any).organization_id;
        const response = await fetch(`/api/v1/simulations?organization_id=${orgId}`);
        if (response.ok) {
          const data = await response.json();
          setRecentRuns(data);
        }
      } catch (e) {
        console.error("Failed to fetch simulations", e);
      } finally {
        setLoading(false);
      }
    };

    fetchSims();
  }, [session]);

  const activeNodes = [
    { region: 'us-east-1', id: 'node-01', status: 'healthy', load: '42%' },
    { region: 'eu-west-3', id: 'node-02', status: 'healthy', load: '68%' },
    { region: 'ap-northeast-2', id: 'node-03', status: 'provisioning', load: '--' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between phantom-glass p-6 rounded-lg border border-[#2d2d30]">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-xl font-bold text-white tracking-tight">Phantom Dashboard</h1>
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#3fb950]/10 border border-[#3fb950]/20 text-[10px] font-bold uppercase text-[#3fb950]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#3fb950]" />
              Operational
            </span>
          </div>
          <p className="text-xs text-[#8b949e] font-mono mt-1">S26 PRODUCTION ENGINE | VERSION 4.3.0</p>
        </div>
        <div className="flex items-center gap-3">
            <Link href="/dashboard/settings" className="px-4 py-2 text-xs font-bold rounded border border-[#2d2d30] bg-[#0a0a0c] text-[#8b949e] hover:bg-[#111114] hover:text-white transition-all">
            Settings
            </Link>
            <Link href="/dashboard/new" className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded bg-primary text-white hover:bg-primary/80 transition-all">
            <Terminal className="w-4 h-4" /> Start Simulation
            </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Active Users", value: "1,204", sub: "current sessions", icon: <User className="w-4 h-4 text-primary" /> },
          { label: "Total Runs", value: "842", sub: "this month", icon: <Activity className="w-4 h-4 text-primary" /> },
          { label: "Avg Friction", value: "0.12", sub: "low friction", icon: <ShieldAlert className="w-4 h-4 text-primary" /> },
          { label: "Uptime", value: "99.98%", sub: "engine stability", icon: <Server className="w-4 h-4 text-primary" /> },
        ].map((stat, i) => (
          <div key={i} className="rounded-lg border border-[#2d2d30] bg-[#0a0a0c] p-5 flex flex-col justify-between hover:bg-white/5 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold text-[#8b949e] uppercase tracking-wider">{stat.label}</span>
              {stat.icon}
            </div>
            <div>
              <div className="text-2xl font-bold text-white font-mono mb-1">{stat.value}</div>
              <div className="text-[10px] text-[#5c646c] font-mono uppercase">{stat.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Runs */}
        <div className="col-span-1 lg:col-span-2 space-y-4">
            <h2 className="text-xs font-bold text-white uppercase tracking-widest pl-1">Recent Simulations</h2>
            <div className="rounded-lg border border-[#2d2d30] bg-[#0a0a0c] overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-[#2d2d30] bg-[#111114] text-[10px] font-bold text-[#8b949e] uppercase tracking-widest">
                            <th className="p-4">Run ID</th>
                            <th className="p-4">Target URL</th>
                            <th className="p-4">Strategy</th>
                            <th className="p-4">Metric</th>
                            <th className="p-4 text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-[#2d2d30]">
                        {loading ? (
                          <tr>
                            <td colSpan={5} className="p-12 text-center text-[#5c646c]">
                              <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 opacity-20" />
                              <span className="text-[10px] uppercase tracking-widest">Querying Engine...</span>
                            </td>
                          </tr>
                        ) : recentRuns.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="p-12 text-center text-[#5c646c]">
                              <p className="text-[10px] uppercase tracking-widest font-mono mb-1 text-[#8b949e]">No Simulations Found</p>
                              <Link href="/dashboard/new" className="text-[9px] text-primary hover:underline uppercase tracking-widest">Start First Run</Link>
                            </td>
                          </tr>
                        ) : (
                          recentRuns.map((run, i) => (
                            <tr 
                              key={i} 
                              className="hover:bg-[#1a1a1f] transition-colors group cursor-pointer bg-[#0a0a0c]"
                              onClick={() => {
                                const tokenParam = run.simulation_token ? `?token=${run.simulation_token}` : '';
                                window.location.href = `/dashboard/simulations/${run.id}${tokenParam}`;
                              }}
                            >
                                <td className="p-4 font-mono text-[11px] text-primary">{run.id}</td>
                                <td className="p-4">
                                    <div className="text-[#c9d1d9] font-medium text-sm mb-0.5">{run.target_url}</div>
                                    <div className="text-[10px] text-[#8b949e] font-mono tracking-wider"><GitBranch className="w-3 h-3 inline mr-1" /> {run.industry || 'General'}</div>
                                </td>
                                <td className="p-4">
                                    <span className="inline-flex px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest bg-[#1a1a1f] border border-[#2d2d30] text-[#c9d1d9]">
                                        {run.is_ab_test ? 'A/B Split' : 'Standard'}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-16 h-1 bg-[#2d2d30] rounded-full">
                                            <div className="h-full bg-primary" style={{ width: `${Math.min((run.pmf_score || 0) * 10, 100)}%` }} />
                                        </div>
                                        <span className="font-mono text-xs text-[#8b949e]">{run.pmf_score || '0.0'}</span>
                                    </div>
                                </td>
                                <td className="p-4 text-right flex items-center justify-end gap-3">
                                    <span className="text-[10px] font-mono text-[#5c646c]">{new Date(run.created_at).toLocaleDateString()}</span>
                                    {run.status === 'completed' ? <CheckCircle2 className="w-4 h-4 text-[#3fb950]" /> : <Loader2 className="w-4 h-4 text-primary animate-spin" />}
                                </td>
                            </tr>
                          ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Nodes / Infrastructure */}
        <div className="col-span-1 space-y-4">
            <h2 className="text-xs font-bold text-white uppercase tracking-widest pl-1">Engine Nodes</h2>
            <div className="rounded-lg border border-[#2d2d30] bg-[#0a0a0c] p-5 space-y-5">
                {activeNodes.map((node, i) => (
                    <div key={i} className="pb-4 border-b border-[#2d2d30] last:border-0 last:pb-0">
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-mono text-xs text-[#c9d1d9]">{node.id}</span>
                            <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${node.status === 'healthy' ? 'bg-[#3fb950]/10 text-[#3fb950]' : 'bg-primary/10 text-primary animate-pulse'}`}>
                              {node.status === 'healthy' ? 'Active' : 'Booting'}
                            </span>
                        </div>
                        <div className="flex justify-between text-[10px] text-[#8b949e] font-mono uppercase">
                            <span>Region: {node.region}</span>
                            <span>Load: {node.load}</span>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="rounded border border-primary/20 bg-primary/5 p-4 flex items-start gap-3">
                <Zap className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                    <h3 className="text-xs font-bold text-white mb-1">Engine Update</h3>
                    <p className="text-[11px] text-[#8b949e] leading-relaxed">Scaling infrastructure for optimized regional latency across 3 clusters.</p>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}
