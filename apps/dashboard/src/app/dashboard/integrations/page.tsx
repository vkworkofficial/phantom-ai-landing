"use client";

import React, { useState } from 'react';
import { Network, Server, Webhook, Activity, Box, ShieldCheck, Github, Slack, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export default function IntegrationsPage() {
  const [activeTab, setActiveTab] = useState<'connected' | 'catalog'>('catalog');

  const integrations = [
    {
      id: 'github',
      name: 'GitHub Actions',
      type: 'vcs',
      icon: <Github className="w-6 h-6" />,
      status: 'connected',
      uptime: '99.99%',
      latency: '24ms',
      description: 'Trigger Phantom test suites directly from CI/CD PR checks.'
    },
    {
      id: 'slack',
      name: 'Slack',
      type: 'notification',
      icon: <Slack className="w-6 h-6" />,
      status: 'connected',
      uptime: '100%',
      latency: '12ms',
      description: 'Stream live rage-click alerts and friction reports to #engineering.'
    },
    {
      id: 'discord',
      name: 'Discord',
      type: 'notification',
      icon: <MessageSquare className="w-6 h-6" />,
      status: 'available',
      uptime: '--',
      latency: '--',
      description: 'Route webhook payloads to Discord alerting channels.'
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Business API',
      type: 'notification',
      icon: <MessageSquare className="w-6 h-6 text-[#3fb950]" />,
      status: 'available',
      uptime: '--',
      latency: '--',
      description: 'Critical infrastructure SMS/WhatsApp paging for Sev-0 bugs.'
    },
    {
      id: 'datadog',
      name: 'Datadog',
      type: 'telemetry',
      icon: <Activity className="w-6 h-6 text-[#d2a8ff]" />,
      status: 'available',
      uptime: '--',
      latency: '--',
      description: 'Export structured JSON logs and APM telemetry overlays.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight mb-1 flex items-center gap-2">
            Platform Integrations
            <span className="flex items-center gap-1.5 text-[10px] font-mono font-normal bg-[#3fb950]/10 text-[#3fb950] border border-[#3fb950]/20 px-2 py-0.5 rounded text-transform: uppercase">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3fb950] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#3fb950]"></span>
              </span>
              Hub Active
            </span>
          </h1>
          <p className="text-sm text-[#8b949e]">Manage secure webhooks, bi-directional event streaming, and CI/CD pipelines.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3 space-y-6">
          <div className="flex gap-4 border-b border-[#30363d]">
            <button 
              onClick={() => setActiveTab('catalog')}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'catalog' ? 'border-[#a5d6ff] text-[#a5d6ff]' : 'border-transparent text-[#8b949e] hover:text-[#c9d1d9]'}`}
            >
              Integrations Catalog
            </button>
            <button 
              onClick={() => setActiveTab('connected')}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'connected' ? 'border-primary text-primary' : 'border-transparent text-[#8b949e] hover:text-[#c9d1d9]'}`}
            >
              Configured Sinks (2)
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {integrations.filter(i => activeTab === 'catalog' || i.status === 'connected').map((integration, idx) => (
              <motion.div 
                key={integration.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-[#010409] border border-[#30363d] rounded-xl p-5 hover:border-[#8b949e] transition-all group flex flex-col h-full"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[#161b22] border border-[#30363d] flex items-center justify-center text-[#c9d1d9] shadow-inner group-hover:scale-105 transition-transform">
                    {integration.icon}
                  </div>
                  {integration.status === 'connected' ? (
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-medium text-[#3fb950] bg-[#3fb950]/10 border border-[#3fb950]/20 px-2 py-0.5 rounded">
                      <ShieldCheck className="w-3 h-3" /> CONNECTED
                    </span>
                  ) : (
                    <button className="text-[11px] font-semibold text-white bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] px-3 py-1 rounded transition-colors">
                      Configure
                    </button>
                  )}
                </div>
                
                <h3 className="text-base font-semibold text-white mb-1">{integration.name}</h3>
                <p className="text-xs text-[#8b949e] line-clamp-2 leading-relaxed flex-1">{integration.description}</p>
                
                <div className="mt-5 pt-4 border-t border-[#30363d] flex items-center justify-between text-[10px] font-mono text-[#8b949e]">
                  <div className="flex items-center gap-1.5">
                    <Activity className="w-3 h-3" /> {integration.latency}
                  </div>
                  <div>UPTIME: {integration.uptime}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#010409] border border-[#30363d] rounded-xl p-5 shadow-lg">
            <h3 className="text-xs font-semibold text-[#8b949e] uppercase tracking-wider mb-4 border-b border-[#30363d] pb-2 flex items-center gap-2">
              <Network className="w-4 h-4" /> Global Event Router
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-[#161b22] p-3 rounded border border-[#30363d]">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#3fb950]" />
                  <span className="text-xs font-medium text-[#c9d1d9]">Ingest Pipeline</span>
                </div>
                <span className="text-[10px] font-mono text-[#3fb950]">89.2k msg/s</span>
              </div>
              
              <div className="flex justify-between items-center bg-[#161b22] p-3 rounded border border-[#30363d]">
                <div className="flex items-center gap-2">
                  <Webhook className="w-4 h-4 text-[#d2a8ff]" />
                  <span className="text-xs font-medium text-[#c9d1d9]">Active Webhooks</span>
                </div>
                <span className="text-[10px] font-mono text-white">2 Nodes</span>
              </div>

              <div className="pt-2">
                <button className="w-full py-2 bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] rounded text-xs font-semibold text-white transition-colors flex items-center justify-center gap-2">
                  <Box className="w-3.5 h-3.5" /> View Network Topography
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
