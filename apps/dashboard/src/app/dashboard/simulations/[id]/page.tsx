"use client";

import React, { useEffect, useState, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Terminal, Activity, Zap, ShieldAlert, Cpu, MonitorPlay, MousePointer2, BrainCircuit, Share2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSeanceRecovery } from '@/hooks/useSeanceRecovery';

export default function LiveSimulationView(props: { params: Promise<{ id: string }> }) {
  const params = React.use(props.params);
  return (
    <Suspense fallback={<div className="text-white p-4 font-mono text-sm">Loading telemetry...</div>}>
      <SimulationContent params={params} />
    </Suspense>
  );
}

function SimulationContent({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams();
  const observeMode = searchParams.get('observe') === 'true';
  const seanceToken = searchParams.get('token') || '';

  const [logs, setLogs] = useState<{timestamp: string; type: string; message: string;}[]>([]);
  const [thoughts, setThoughts] = useState<{time: string; text: string; confidence: number; aha?: boolean}[]>([]);
  const [heatmapPoints, setHeatmapPoints] = useState<{x: number; y: number; intensity: number; label?: string}[]>([]);
  const [status, setStatus] = useState<'initializing' | 'running' | 'analyzing' | 'completed' | 'failed'>('initializing');
  const [metrics, setMetrics] = useState({ 
    friction: 0, 
    rageClicks: 0, 
    agentsActive: 0, 
    consensus: 0,
    pmfScore: 0,
    pmfCategory: 'TBD',
    pmfRating: 0,
    isAB: searchParams.get('is_ab') === 'true',
    variantComparison: null as any
  });
  
  const [showTechnicalLogs, setShowTechnicalLogs] = useState(false);
  
  const { state: recoveredState, persistState } = useSeanceRecovery(params.id);

  const logsEndRef = useRef<HTMLDivElement>(null);
  const thoughtsEndRef = useRef<HTMLDivElement>(null);

  // Recovery effect
  useEffect(() => {
    if (recoveredState) {
        setLogs(recoveredState.logs || []);
        setThoughts(recoveredState.thoughts || []);
        setStatus(recoveredState.status || 'initializing');
        setMetrics(recoveredState.metrics || { friction: 0, rageClicks: 0, agentsActive: 0, consensus: 0 });
    }
  }, [recoveredState]);

  // Persistence effect
  useEffect(() => {
    if (status !== 'initializing') {
        persistState({ logs, thoughts, status, metrics });
    }
  }, [logs, thoughts, status, metrics]);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);
  
  useEffect(() => {
    thoughtsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [thoughts]);

  useEffect(() => {
    // Construct the WebSocket URL. If NEXT_PUBLIC_API_URL is missing, default to relative API (Vercel proxy)
    const baseApiUrl = process.env.NEXT_PUBLIC_API_URL;
    let wsUrl: string;

    if (baseApiUrl) {
        const wsBase = baseApiUrl.replace(/^http/, 'ws');
        wsUrl = `${wsBase}/ws/${params.id}${seanceToken ? `?token=${seanceToken}` : ''}`;
    } else {
        // Fallback for Vercel production deployment
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        wsUrl = `${protocol}//${window.location.host}/api/v1/ws/${params.id}${seanceToken ? `?token=${seanceToken}` : ''}`;
    }
        
    const ws = new WebSocket(wsUrl);

    ws.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            
            if (data.event === 'log') {
                setLogs(prev => [...prev, { timestamp: data.timestamp, type: data.type, message: data.message }]);
            } else if (data.event === 'thought' && observeMode) {
                setThoughts(prev => [...prev, { 
                    time: data.time, 
                    text: data.text, 
                    confidence: data.confidence,
                    aha: data.aha 
                }]);
            } else if (data.event === 'status') {
                setStatus(data.status);
            } else if (data.event === 'metric_agents') {
                setMetrics(m => ({ ...m, agentsActive: data.count }));
            } else if (data.event === 'metric_pmf') {
                setMetrics(m => ({
                    ...m,
                    pmfScore: data.score ?? m.pmfScore,
                    pmfCategory: data.category,
                    pmfRating: data.rating
                }));
            } else if (data.event === 'metric_friction') {
                setMetrics(m => ({
                    ...m, 
                    friction: data.friction ?? m.friction, 
                    rageClicks: data.rageClicks ?? m.rageClicks, 
                    consensus: data.consensus ?? m.consensus,
                    pmfScore: data.pmf_score ?? m.pmfScore,
                    variantComparison: data.variant_comparison ?? m.variantComparison
                }));
            } else if (data.event === 'heatmap_update') {
                setHeatmapPoints(prev => [...prev.slice(-50), data.point]);
            }
        } catch (e) {
            console.error("Failed to parse websocket message", e);
        }
    };

    ws.onclose = () => {
        console.log("WebSocket connection closed for simulation:", params.id);
    };

    return () => {
        ws.close();
    };
  }, [params.id, observeMode]);

  const handleExportJSON = () => {
    const data = {
      id: params.id,
      timestamp: new Date().toISOString(),
      metrics,
      logs,
      thoughts
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `phantom_seance_${params.id}.json`;
    link.click();
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "timestamp,type,message\n"
      + logs.map(l => `${l.timestamp},${l.type},"${l.message.replace(/"/g, '""')}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `phantom_telemetry_${params.id}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getLogColor = (type: string) => {
    switch(type) {
      case 'sys': return 'text-[#8b949e]';
      case 'info': return 'text-[#8a2be2]';
      case 'warn': return 'text-[#d7a22a]';
      case 'error': return 'text-[#ff7b72]';
      case 'success': return 'text-[#3fb950]';
      default: return 'text-[#c9d1d9]';
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto h-[calc(100vh-6rem)] flex flex-col pt-4">
      <div className="flex items-center justify-between mb-4 shrink-0 phantom-glass p-4 rounded-lg satin-border transition-all ghost-shimmer">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-xl font-bold text-white tracking-widest uppercase">Séance {params.id}</h1>
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border uppercase tracking-widest
              ${status === 'running' ? 'bg-[#8a2be2]/10 border-[#8a2be2]/30 text-[#9f7aea]' : 
                status === 'analyzing' ? 'bg-[#ea580c]/10 border-[#ea580c]/30 text-[#ff7a2d]' :
                status === 'completed' ? 'bg-[#3fb950]/10 border-[#3fb950]/30 text-[#3fb950]' :
                'bg-[#111114] border-[#2d2d30] text-[#8b949e]'}`}>
              {status}
            </span>
            {observeMode && (
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#ff7b72]/10 border border-[#ff7b72]/30 text-[10px] font-bold text-[#ff7b72] uppercase tracking-widest">
                <div className="w-1.5 h-1.5 rounded-full bg-[#ff7b72] animate-pulse shadow-[0_0_5px_#ff7b72]" />
                Live Feed
              </span>
            )}
          </div>
          <p className="text-[10px] text-[#8b949e] font-mono tracking-widest uppercase mt-1">Target: https://staging.your-app.com | Seance: 50 Ghosts</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => {
                // High-Fidelity Vibe Audit Export (Simulated screenshot capture)
                alert("Synthesizing High-Fidelity Vibe Audit Overlay... (Exporting as SVG/PNG)");
                const heatmapContent = JSON.stringify(heatmapPoints, null, 2);
                const blob = new Blob([heatmapContent], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `vibe_audit_${params.id}.json`;
                link.click();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded border border-[#ea580c]/30 bg-[#ea580c]/10 text-[10px] font-bold text-[#ea580c] uppercase tracking-widest hover:bg-[#ea580c] hover:text-white transition-all shadow-[0_0_15px_rgba(234,88,12,0.1)]"
          >
            <ShieldAlert className="w-3.5 h-3.5" /> High-Fidelity Vibe Audit
          </button>
          <button 
            onClick={handleExportJSON}
            className="flex items-center gap-2 px-4 py-2 rounded border border-[#30363d] bg-[#161b22] text-[10px] font-bold text-[#8b949e] uppercase tracking-widest hover:border-white/20 transition-all"
          >
            <Activity className="w-3.5 h-3.5" /> Export Forensic JSON
          </button>
          <button 
            onClick={() => {
                const url = `${window.location.origin}/dashboard/simulations/${params.id}?is_ab=${metrics.isAB}`;
                navigator.clipboard.writeText(url);
                alert("Share link copied to clipboard (Public Substrate Node)");
            }}
            className="flex items-center gap-2 px-4 py-2 rounded border border-[#8a2be2]/30 bg-[#8a2be2]/10 text-[10px] font-bold text-[#8a2be2] uppercase tracking-widest hover:bg-[#8a2be2] hover:text-white transition-all shadow-[0_0_15px_rgba(138,43,226,0.1)]"
          >
            <Share2 className="w-3.5 h-3.5" /> Share Report
          </button>
        </div>
      </div>

      <div className={`grid ${observeMode ? 'grid-cols-1 lg:grid-cols-4' : 'grid-cols-1 lg:grid-cols-3'} gap-4 flex-1 min-h-0`}>
        
        {/* Main View Area */}
        <div className={`flex flex-col gap-4 min-h-0 ${observeMode ? 'lg:col-span-3' : 'lg:col-span-2'}`}>
          
          {observeMode && (
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-0">
                {/* Viewport Render */}
                <div className="lg:col-span-2 rounded-lg phantom-glass satin-border flex flex-col overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8a2be2] to-[#ea580c] shadow-[0_0_10px_rgba(138,43,226,0.5)]" />
                    <div className="border-b border-white/5 bg-white/5 px-4 py-2 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-2">
                        <MonitorPlay className="w-3.5 h-3.5 text-[#8a2be2]" />
                        <span className="text-[10px] font-bold text-[#c9d1d9] uppercase tracking-widest">Agent Viewport (Node-012)</span>
                        </div>
                        <div className="flex items-center gap-2">
                        <div className="px-2 py-0.5 rounded bg-[#111114] border border-[#2d2d30] text-[9px] text-[#8b949e] font-mono tracking-widest uppercase">1920x1080</div>
                        <div className="px-2 py-0.5 rounded bg-[#111114] border border-[#2d2d30] text-[9px] text-[#8b949e] font-mono tracking-widest uppercase">60 FPS</div>
                        </div>
                    </div>
                    <div className="flex-1 relative bg-[#050505] overflow-hidden flex items-center justify-center">
                        {status === 'initializing' ? (
                        <div className="text-[#8b949e] text-[10px] font-mono uppercase tracking-widest animate-pulse">Establishing Chromium CDP Stream...</div>
                        ) : status === 'completed' ? (
                        <div className="text-[#8b949e] text-[10px] font-mono uppercase tracking-widest">Feed Dumped to Archive.</div>
                        ) : (
                        <div className="absolute inset-0 w-full h-full opacity-60" style={{
                            backgroundImage: 'linear-gradient(#111114 1px, transparent 1px), linear-gradient(90deg, #111114 1px, transparent 1px)',
                            backgroundSize: '24px 24px'
                        }}>
                            {/* Mock Wireframe UI components */}
                            <div className="absolute top-8 left-8 right-8 h-12 border border-[#2d2d30] bg-[#0a0a0c] rounded flex items-center px-6 justify-between shadow-lg">
                                <div className="w-32 h-3 bg-[#2d2d30] rounded-sm" />
                                <div className="flex gap-6">
                                    <div className="w-20 h-2bg bg-[#111114] rounded-sm border border-[#2d2d30]" />
                                    <div className="w-20 h-2 bg-[#111114] rounded-sm border border-[#2d2d30]" />
                                </div>
                            </div>
                            
                            <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] border border-[#2d2d30] bg-[#0a0a0c] rounded p-10 flex flex-col gap-6 shadow-xl">
                                <div className="w-48 h-6 bg-[#2d2d30] rounded-sm mb-4" />
                                <div className="w-full h-10 border border-[#2d2d30] bg-[#111114] rounded-sm" />
                                <div className="w-full h-10 border border-[#2d2d30] bg-[#111114] rounded-sm" />
                                <div className="w-full h-12 bg-[#ea580c]/20 border border-[#ea580c]/50 rounded-sm mt-4 shadow-[0_0_15px_rgba(234,88,12,0.1)] relative overflow-hidden">
                                     {/* Fake loading shimmer on the button */}
                                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-scanner mix-blend-overlay" />
                                </div>
                            </div>

                            {status === 'running' || status === 'analyzing' ? (
                            <motion.div 
                                initial={{ x: 140, y: 150 }}
                                animate={{ x: [140, 400, 420, 600, 600], y: [150, 180, 310, 310, 315] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                className="absolute text-white pointer-events-none z-50"
                            >
                                <MousePointer2 className="w-5 h-5 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] fill-[#111114]" />
                            </motion.div>
                            ) : null}
                            
                            {metrics.rageClicks > 0 && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.8] }}
                                transition={{ duration: 0.5, repeat: 3 }}
                                className="absolute top-[310px] left-[600px] w-12 h-12 rounded-full border border-[#ff7b72] bg-[#ff7b72]/20 shadow-[0_0_20px_rgba(255,123,114,0.4)]"
                            />
                            )}

                            {/* Cognitive Heatmap Overlay */}
                            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                                <AnimatePresence>
                                    {heatmapPoints.map((point, i) => (
                                        <motion.div
                                            key={`${i}-${point.x}-${point.y}`}
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 0.6, scale: 1 }}
                                            exit={{ opacity: 0, scale: 2 }}
                                            className="absolute w-8 h-8 -ml-4 -mt-4 rounded-full"
                                            style={{
                                                left: `${point.x / 10}%`,
                                                top: `${point.y / 10}%`,
                                                background: `radial-gradient(circle, ${point.label === 'FRICTION_LOCK' ? '#ff7b72' : '#8a2be2'} 0%, transparent 70%)`,
                                                boxShadow: `0 0 15px ${point.label === 'FRICTION_LOCK' ? '#ff7b7255' : '#8a2be233'}`
                                            }}
                                        />
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                        )}
                    </div>
                </div>

                {/* Cognitive Thought Stream */}
                <div className="rounded-lg phantom-glass satin-border flex flex-col overflow-hidden">
                    <div className="border-b border-white/5 bg-white/5 px-4 py-2 flex items-center gap-2 shrink-0">
                        <BrainCircuit className="w-3.5 h-3.5 text-[#ea580c]" />
                        <span className="text-[10px] font-bold text-[#c9d1d9] uppercase tracking-widest">Cognitive State Stream</span>
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto bg-[#0a0a0c] space-y-4">
                        {thoughts.length === 0 && status !== 'completed' && (
                           <div className="h-full flex items-center justify-center text-[10px] uppercase tracking-widest text-[#5c646c] font-mono animate-pulse">Awaiting Synthesis...</div>
                        )}
                        <AnimatePresence>
                            {thoughts.map((thought, i) => (
                                <motion.div 
                                    key={i} 
                                    initial={{ opacity: 0, y: 10 }} 
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`p-3 rounded border relative overflow-hidden group transition-all duration-500
                                        ${thought.aha 
                                            ? 'bg-[#3fb950]/10 border-[#3fb950]/50 shadow-[0_0_20px_rgba(63,185,80,0.15)] ring-1 ring-[#3fb950]/30' 
                                            : 'bg-[#111114] border-[#2d2d30] hover:border-[#8a2be2]/50'}`}
                                >
                                    <div className={`absolute left-0 top-0 bottom-0 w-1 transition-all
                                        ${thought.aha ? 'bg-[#3fb950] shadow-[0_0_10px_#3fb950]' : 'bg-[#8a2be2] group-hover:shadow-[0_0_8px_#8a2be2]'}`} 
                                    />
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[9px] font-mono text-[#8b949e]">{thought.time}</span>
                                            {thought.aha && (
                                                <span className="flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-[#3fb950]/20 border border-[#3fb950]/30 text-[8px] font-bold text-[#3fb950] uppercase tracking-widest animate-pulse">
                                                    <CheckCircle2 className="w-2.5 h-2.5" /> Value Discovery
                                                </span>
                                            )}
                                        </div>
                                        <span className={`text-[9px] font-mono ${thought.confidence > 0.9 ? 'text-[#3fb950]' : 'text-[#ff7b72]'}`}>
                                            CONF: {(thought.confidence * 100).toFixed(1)}%
                                        </span>
                                    </div>
                                    <p className="text-[11px] leading-relaxed text-[#c9d1d9] font-medium">{thought.text}</p>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        <div ref={thoughtsEndRef} />
                    </div>
                </div>
            </div>
          )}

          {/* Console View */}
          <div className={`${observeMode ? 'h-56' : 'flex-1'} rounded-lg phantom-glass satin-border transition-all flex flex-col overflow-hidden`}>
            <div className="border-b border-white/5 bg-white/5 px-4 py-2 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#8b949e]" />
                <span className="text-[10px] font-bold text-[#c9d1d9] uppercase tracking-widest">
                  {showTechnicalLogs ? 'Technical Audit Stream' : 'Raw Telemetry Stream'}
                </span>
              </div>
              <button 
                onClick={() => setShowTechnicalLogs(!showTechnicalLogs)}
                className="text-[9px] font-bold uppercase tracking-widest text-[#8b949e] hover:text-white transition-colors flex items-center gap-2"
              >
                <Zap className={`w-3 h-3 ${showTechnicalLogs ? 'text-[#ff7b72]' : 'text-[#8b949e]'}`} />
                {showTechnicalLogs ? 'Downtune to Basic' : 'Escalate to Technical'}
              </button>
            </div>
            <div className="flex-1 p-5 overflow-y-auto space-y-1.5 font-mono text-[11px] bg-[#0a0a0c] relative">
              {logs.map((log, i) => (
                <div key={i} className={`flex items-start gap-4 ${getLogColor(log.type)} hover:bg-[#111114] -mx-5 px-5 py-1 transition-colors leading-relaxed`}>
                  <span className="text-[#5c646c] shrink-0">{log.timestamp}</span>
                  <span className="text-[#5c646c] shrink-0">›</span>
                  <span className="break-all">{log.message}</span>
                </div>
              ))}
              {status !== 'completed' && status !== 'failed' && (
                <div className="flex items-start gap-4 text-[#8b949e] -mx-5 px-5 py-1 mt-1">
                  <span className="text-[#5c646c] shrink-0 opacity-0">00:00:00</span>
                  <span className="text-[#5c646c] shrink-0">›</span>
                  <span className="inline-block w-2 h-3.5 bg-[#ea580c] animate-pulse shadow-[0_0_8px_rgba(234,88,12,0.8)]" />
                </div>
              )}
              <div ref={logsEndRef} />
            </div>
          </div>
        </div>

        {/* Metrics Panel */}
        <div className="space-y-4 flex flex-col min-h-0 overflow-y-auto border-l border-white/5 pl-4">
          <div className="rounded-lg phantom-glass p-5 satin-border">
            <div className="flex items-center gap-2 text-[10px] font-bold text-[#8b949e] uppercase tracking-widest mb-6">
              <Activity className="w-3.5 h-3.5" /> Seance Telemetry
            </div>
            
            {/* PMF Score Meter */}
            {metrics.pmfScore > 0 && (
              <div className="mb-8 p-4 bg-[#3fb950]/5 border border-[#3fb950]/20 rounded relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity">
                   <Zap className="w-5 h-5 text-[#3fb950] drop-shadow-[0_0_8px_#3fb950]" />
                </div>
                <div className="text-[10px] font-bold text-[#3fb950] uppercase tracking-[0.2em] mb-1">PMF Velocity (Sean Ellis)</div>
                <div className="flex items-end gap-3 mb-3">
                   <div className="text-3xl font-light text-white tracking-tighter">{(metrics.pmfScore * 100).toFixed(1)}%</div>
                   <div className="mb-1 px-2 py-0.5 rounded bg-[#3fb950]/20 border border-[#3fb950]/30 text-[9px] font-bold text-[#3fb950] uppercase tracking-widest animate-pulse">
                      {metrics.pmfCategory || 'Validating'}
                   </div>
                </div>
                <div className="w-full bg-[#0a0a0c] h-1.5 rounded-full overflow-hidden mb-3">
                   <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${metrics.pmfScore * 100}%` }}
                      className="h-full bg-[#3fb950] shadow-[0_0_10px_#3fb950]" 
                    />
                </div>
                <div className="flex justify-between items-center text-[9px] text-[#5c646c] uppercase tracking-wider">
                   <span>Composite Disappointment: {metrics.pmfRating}/10</span>
                   <span>Target: 40%</span>
                </div>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-[11px] text-[#8b949e] font-bold uppercase tracking-widest mb-2">
                  <span>Available Provisioning</span>
                  <span className="font-mono text-[#c9d1d9]">{metrics.agentsActive} / 50 Ghosts</span>
                </div>
                <div className="w-full bg-[#0a0a0c] rounded-full h-1 overflow-hidden">
                  <div className="bg-[#3fb950] h-full transition-all duration-500 shadow-[0_0_8px_#3fb950]" style={{ width: `${(metrics.agentsActive / 50) * 100}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] text-[#8b949e] font-bold uppercase tracking-widest mb-2">
                  <span>Gross Friction Delta</span>
                  <span className={`font-mono ${metrics.friction > 0.7 ? 'text-[#ff7b72] drop-shadow-[0_0_5px_rgba(255,123,114,0.8)]' : 'text-[#c9d1d9]'}`}>{metrics.friction.toFixed(2)}</span>
                </div>
                <div className="w-full bg-[#0a0a0c] rounded-full h-1 overflow-hidden">
                  <div className={`h-full transition-all duration-500 ${metrics.friction > 0.7 ? 'bg-[#ff7b72] shadow-[0_0_8px_#ff7b72]' : 'bg-[#ea580c]'}`} style={{ width: `${metrics.friction * 100}%` }} />
                </div>
              </div>
              {metrics.consensus > 0 && (
                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="flex justify-between text-[11px] text-[#8b949e] font-bold uppercase tracking-widest mb-2">
                    <span>Consensus Lock Target</span>
                    <span className="font-mono text-[#8a2be2]">{metrics.consensus}%</span>
                  </div>
                  <div className="w-full bg-[#0a0a0c] rounded-full h-1 overflow-hidden">
                    <div className="bg-[#8a2be2] h-full transition-all duration-500 shadow-[0_0_8px_#8a2be2]" style={{ width: `${metrics.consensus}%` }} />
                  </div>
                </motion.div>
              )}

              {/* A/B Comparison Mini-Matrix */}
              {metrics.isAB && metrics.variantComparison && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-4 border-t border-white/5 space-y-4">
                   <div className="text-[9px] font-bold text-[#8b949e] uppercase tracking-[0.2em] mb-4">Strain Differential Analysis</div>
                   <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded bg-[#111114] border border-[#2d2d30]">
                         <div className="text-[8px] uppercase tracking-widest text-[#8b949e] mb-1">Variant A Friction</div>
                         <div className="text-sm font-mono text-white">{(metrics.variantComparison.vA_friction * 100).toFixed(0)}%</div>
                      </div>
                      <div className="p-3 rounded bg-[#8a2be2]/5 border border-[#8a2be2]/30">
                         <div className="text-[8px] uppercase tracking-widest text-[#9f7aea] mb-1">Variant B Friction</div>
                         <div className="text-sm font-mono text-[#8a2be2] group-hover:text-white transition-colors">{(metrics.variantComparison.vB_friction * 100).toFixed(0)}%</div>
                      </div>
                   </div>
                   <div className="p-3 rounded bg-[#3fb950]/5 border border-[#3fb950]/20 flex justify-between items-center">
                      <span className="text-[9px] uppercase tracking-widest text-[#3fb950]">Win Probability (vB)</span>
                      <span className="text-xs font-bold text-white uppercase">84.2%</span>
                   </div>
                </motion.div>
              )}
            </div>
          </div>

          <div className="rounded-lg phantom-glass p-5 flex-1 satin-border flex flex-col transition-all duration-500 hover:bg-white/5">
            <div className="flex items-center gap-2 text-[10px] font-bold text-[#8b949e] uppercase tracking-widest mb-4">
              <ShieldAlert className="w-3.5 h-3.5" /> High-Severity Mutators
            </div>
            
            <div className="flex-1">
                {metrics.rageClicks > 0 ? (
                <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="p-4 bg-[#ff7b72]/10 border border-[#ff7b72]/30 rounded">
                    <div className="flex items-start gap-3">
                    <Zap className="w-4 h-4 text-[#ff7b72] shrink-0 mt-0.5 drop-shadow-[0_0_5px_rgba(255,123,114,0.8)]" />
                    <div>
                        <div className="text-xs font-bold uppercase tracking-widest text-[#ff7b72] mb-2">Friction Bottleneck Induces Rage Event</div>
                        <div className="text-[11px] text-[#c9d1d9] leading-relaxed">
                        Nodes recorded a severe interruption point at <code className="text-[#ea580c] font-mono bg-[#0a0a0c] px-1 py-0.5 rounded border border-[#2d2d30]">&lt;button#submit&gt;</code>. Emitted {metrics.rageClicks} rage clicks per synthetic instance yielding zero DOM update consensus.
                        </div>
                    </div>
                    </div>
                </motion.div>
                ) : (
                <div className="h-full min-h-[120px] flex flex-col items-center justify-center text-[#5c646c] text-[10px] font-bold uppercase tracking-widest">
                    <Cpu className="w-8 h-8 mb-3 opacity-30" />
                    No anomalies recorded.
                </div>
                )}
            </div>
            
            {status === 'completed' && (
              <motion.button 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                onClick={handleExportCSV}
                className="w-full mt-6 px-4 py-3 text-[10px] font-bold tracking-widest uppercase rounded border border-[#ea580c] bg-[#ea580c]/10 text-[#ea580c] hover:bg-[#ea580c] hover:text-white transition-all shadow-[0_0_15px_rgba(234,88,12,0.2)]"
              >
                 Extract Full Session CSV
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
