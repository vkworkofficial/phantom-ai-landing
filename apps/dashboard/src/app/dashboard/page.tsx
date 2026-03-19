"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Activity, ShieldAlert, Cpu, Server, Globe, Terminal, GitBranch, Box, Database, Zap, CheckCircle2, Ghost, Download, Loader2 } from 'lucide-react';
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
    { region: 'us-east-1a', id: 'wrk-09f1a', status: 'healthy', load: '42%', v8: '1.2GB', domOps: '14.2k/s' },
    { region: 'eu-west-3c', id: 'wrk-11b2c', status: 'healthy', load: '68%', v8: '2.4GB', domOps: '28.1k/s' },
    { region: 'ap-northeast-2', id: 'wrk-77a9d', status: 'provisioning', load: '--', v8: '--', domOps: '--' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between phantom-glass p-6 rounded-lg satin-border ghost-shimmer">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-xl font-bold text-white tracking-widest uppercase">Phantom Command Center</h1>
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#3fb950]/10 border border-[#3fb950]/20 text-[10px] font-bold tracking-widest uppercase text-[#3fb950] shadow-[0_0_10px_rgba(63,185,80,0.2)]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#3fb950] shadow-[0_0_8px_#3fb950]" />
              Nominal
            </span>
          </div>
          <p className="text-xs text-[#8b949e] font-mono mt-1 tracking-wider">ENV: PROD | ENGINE: V4.2.0 (CHROMIUM 131) | UPLINK: GLOBAL</p>
        </div>
        <div className="flex items-center gap-3">
            <Link href="/dashboard/personas" className="px-4 py-2 text-xs uppercase tracking-widest font-bold rounded border border-[#2d2d30] bg-[#0a0a0c] text-[#8b949e] hover:bg-[#111114] hover:text-white transition-all">
            Configuration Profiles
            </Link>
            <Link href="/dashboard/new" className="inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-widest font-bold rounded bg-[#ea580c] text-white hover:bg-[#ff7a2d] transition-all shadow-[0_0_15px_rgba(234,88,12,0.3)]">
            <Terminal className="w-4 h-4" /> Initiate Séance
            </Link>
        </div>
      </div>

      {/* Global Telemetry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Active Ghosts", value: "1,204", sub: "across 12 regions", icon: <Ghost className="w-4 h-4 text-[#8a2be2] icon-glow-purple" /> },
          { label: "V8 Heap Sync", value: "8.4 TB", sub: "GC Nominal", icon: <Database className="w-4 h-4 text-[#ea580c] icon-glow-orange" /> },
          { label: "Proxy Shield", value: "99.98%", sub: "4.2M rotating IPs", icon: <Globe className="w-4 h-4 text-[#8a2be2] icon-glow-purple" /> },
          { label: "DOM Mutations/s", value: "142,891", sub: "Peak: 210,400", icon: <Activity className="w-4 h-4 text-[#ea580c] icon-glow-orange" /> },
        ].map((stat, i) => (
          <div key={i} className="rounded-lg phantom-glass p-5 flex flex-col justify-between relative overflow-hidden group hover:bg-white/5 transition-all duration-500 satin-border">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold text-[#8b949e] uppercase tracking-widest">{stat.label}</span>
              {stat.icon}
            </div>
            <div>
              <div className="text-3xl font-light text-white font-mono mb-1">{stat.value}</div>
              <div className="text-[10px] text-[#5c646c] font-mono tracking-wider uppercase">{stat.sub}</div>
            </div>
            {/* Esoteric scanner line effect */}
            <div className="absolute top-0 bottom-0 left-[-100%] w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-scanner mix-blend-overlay" />
          </div>
        ))}
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Workloads (Span 2) */}
        <div className="col-span-1 lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 mb-2 p-1">
                <Ghost className="w-4 h-4 text-[#8a2be2]" />
                <h2 className="text-xs font-bold text-[#8a2be2] uppercase tracking-widest">Recent Séance Workloads</h2>
            </div>
            <div className="rounded-lg phantom-glass overflow-hidden satin-border">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-[#2d2d30] bg-[#0a0a0c] text-[10px] font-bold text-[#8b949e] uppercase tracking-widest">
                            <th className="p-4">Run ID</th>
                            <th className="p-4">Target / Branch</th>
                            <th className="p-4">Strategy</th>
                            <th className="p-4">Friction Payload</th>
                            <th className="p-4 text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-[#2d2d30]">
                        {loading ? (
                          <tr>
                            <td colSpan={5} className="p-12 text-center text-[#5c646c]">
                              <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 opacity-20" />
                              <span className="text-[10px] uppercase tracking-widest font-mono">Querying Ethereal Substrate...</span>
                            </td>
                          </tr>
                        ) : recentRuns.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="p-12 text-center text-[#5c646c]">
                              <Ghost className="w-6 h-6 mx-auto mb-2 opacity-20" />
                              <p className="text-[10px] uppercase tracking-widest font-mono mb-1">No Active Séances</p>
                              <Link href="/dashboard/new" className="text-[9px] text-[#ea580c] hover:underline uppercase tracking-widest">Deploy First Payload</Link>
                            </td>
                          </tr>
                        ) : (
                          recentRuns.map((run, i) => (
                            <tr 
                              key={i} 
                              className="hover:bg-[#1a1a1f] transition-colors group cursor-pointer bg-[#111114]"
                              onClick={() => {
                                const tokenParam = run.seance_token ? `?token=${run.seance_token}` : '';
                                window.location.href = `/dashboard/simulations/${run.id}${tokenParam}`;
                              }}
                            >
                                <td className="p-4 font-mono text-[11px] text-[#ea580c]">{run.id}</td>
                                <td className="p-4">
                                    <div className="text-[#c9d1d9] font-medium text-sm mb-0.5 tracking-wide">{run.target_url}</div>
                                    <div className="text-[10px] text-[#8b949e] font-mono uppercase tracking-wider flex items-center gap-1.5"><GitBranch className="w-3 h-3" /> {run.industry || 'General'}</div>
                                </td>
                                <td className="p-4">
                                    <span className="inline-flex px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest bg-[#0a0a0c] border border-[#2d2d30] text-[#c9d1d9]">
                                        {run.is_ab_test ? 'A/B Split' : 'Standard'}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-20 h-1 bg-[#2d2d30] rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-[#ea580c] to-[#ff7a2d]" style={{ width: `${Math.min((run.pmf_score || 0) * 10, 100)}%` }} />
                                        </div>
                                        <span className="font-mono text-xs text-[#8b949e]">{run.pmf_score || '0.00'}</span>
                                    </div>
                                </td>
                                <td className="p-4 text-right flex items-center justify-end gap-3">
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        const blob = new Blob([JSON.stringify(run, null, 2)], { type: 'application/json' });
                                        const url = URL.createObjectURL(blob);
                                        const a = document.createElement('a');
                                        a.href = url;
                                        a.download = `seance-${run.id}.json`;
                                        a.click();
                                      }}
                                      className="p-1 px-1.5 rounded hover:bg-[#30363d] text-[#8b949e] hover:text-white transition-colors border border-transparent hover:border-[#484f58]"
                                      title="Download Forensic Payload"
                                    >
                                        <Download className="w-3.5 h-3.5" />
                                    </button>
                                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#5c646c]">{new Date(run.created_at).toLocaleDateString()}</span>
                                    {run.status === 'completed' ? <CheckCircle2 className="w-4 h-4 text-[#3fb950]" /> : <Loader2 className="w-4 h-4 text-[#8a2be2] animate-spin" />}
                                </td>
                            </tr>
                          ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Infrastructure & Behavioral Matrix (Span 1) */}
        <div className="col-span-1 space-y-4">
            <div className="flex items-center gap-2 mb-2 p-1">
                <Box className="w-4 h-4 text-[#ea580c]" />
                <h2 className="text-xs font-bold text-[#ea580c] uppercase tracking-widest">Granular Matrix</h2>
            </div>
            
            <div className="rounded-lg phantom-glass p-5 space-y-5 satin-border">
                <div className="pb-4 border-b border-[#2d2d30]">
                    <h3 className="text-[10px] font-bold text-[#8b949e] uppercase tracking-widest mb-3">Behavioral Telemetry</h3>
                    <div className="space-y-3">
                        {[
                            { label: "Scan-Path Entropy", val: "0.42", color: "bg-[#3fb950]" },
                            { label: "Cognitive Load", val: "0.68", color: "bg-[#ea580c]" },
                            { label: "Frustration Index", val: "0.12", color: "bg-[#3fb950]" },
                            { label: "Engagement Velocity", val: "2.44x", color: "bg-[#8a2be2]" }
                        ].map((m, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-[9px] font-mono text-[#8b949e] mb-1 uppercase">
                                    <span>{m.label}</span>
                                    <span className="text-[#c9d1d9]">{m.val}</span>
                                </div>
                                <div className="w-full h-0.5 bg-[#0a0a0c] rounded-full overflow-hidden">
                                    <div className={`h-full ${m.color}`} style={{ width: i === 1 ? '68%' : i === 0 ? '42%' : '12%' }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {activeNodes.map((node, i) => (
                    <div key={i} className="flex flex-col gap-3 pb-5 border-b border-[#2d2d30] last:border-0 last:pb-0 pt-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Cpu className="w-4 h-4 text-[#8b949e]" />
                                <span className="font-mono text-xs text-[#c9d1d9]">{node.id}</span>
                                <span className="text-[9px] text-[#5c646c] font-bold uppercase tracking-widest ml-1">{node.region}</span>
                            </div>
                            {node.status === 'healthy' ? (
                                <span className="text-[9px] font-bold tracking-widest text-[#3fb950] uppercase px-1.5 py-0.5 rounded bg-[#3fb950]/10 border border-[#3fb950]/30 shadow-[0_0_5px_rgba(63,185,80,0.3)]">ACTV</span>
                            ) : (
                                <span className="text-[9px] font-bold tracking-widest text-[#8a2be2] uppercase px-1.5 py-0.5 rounded bg-[#8a2be2]/10 border border-[#8a2be2]/30 animate-pulse">BOOT</span>
                            )}
                        </div>
                        
                        <div className="grid grid-cols-3 gap-3">
                            <div>
                                <div className="text-[9px] text-[#5c646c] font-bold uppercase tracking-widest mb-1">CPU Load</div>
                                <div className="text-xs font-mono text-[#c9d1d9]">{node.load}</div>
                            </div>
                            <div>
                                <div className="text-[9px] text-[#5c646c] font-bold uppercase tracking-widest mb-1">V8 Heap</div>
                                <div className="text-xs font-mono text-[#c9d1d9]">{node.v8}</div>
                            </div>
                            <div>
                                <div className="text-[9px] text-[#5c646c] font-bold uppercase tracking-widest mb-1">DOM Ops</div>
                                <div className="text-xs font-mono text-[#c9d1d9]">{node.domOps}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="rounded border border-[#8a2be2]/30 bg-[#8a2be2]/5 p-5 flex items-start gap-3 shadow-[0_0_15px_rgba(138,43,226,0.1)]">
                <Zap className="w-4 h-4 text-[#8a2be2] shrink-0 mt-0.5 drop-shadow-[0_0_5px_rgba(138,43,226,0.8)]" />
                <div>
                    <h3 className="text-xs font-bold tracking-widest uppercase text-[#c9d1d9] mb-1">Dynamic Scaling Event</h3>
                    <p className="text-[11px] text-[#8b949e] leading-relaxed font-mono">Engine provisioning 400 preemptible ghosts [ap-northeast-2] for incoming A/B Split workload.</p>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}
