import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Users, Settings, Activity, Cpu, Ghost, Layers } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#c9d1d9] font-sans selection:bg-[#ea580c]/30 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#2d2d30] bg-[#111114] flex flex-col shrink-0 sticky top-0 h-screen shadow-[4px_0_24px_rgba(0,0,0,0.5)]">
        <div className="h-16 flex items-center px-6 border-b border-[#2d2d30] bg-[#0a0a0c]">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <Ghost className="w-5 h-5 text-[#ea580c] group-hover:drop-shadow-[0_0_8px_rgba(234,88,12,0.6)] transition-all" />
            <span className="font-bold text-white tracking-widest uppercase text-sm">Phantom</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <div className="mb-6">
            <div className="px-3 text-[10px] font-bold text-[#8b949e] uppercase tracking-widest mb-2">Command Layer</div>
            <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded text-sm font-medium hover:bg-[#8a2be2]/10 hover:text-[#9f7aea] text-[#c9d1d9] transition-colors group">
              <LayoutDashboard className="w-4 h-4 text-[#8b949e] group-hover:text-[#9f7aea]" /> Telemetry
            </Link>
            <Link href="/dashboard/new" className="flex items-center gap-3 px-3 py-2 rounded text-sm font-medium hover:bg-[#ea580c]/10 hover:text-[#ff7a2d] text-[#c9d1d9] transition-colors group">
              <Activity className="w-4 h-4 text-[#8b949e] group-hover:text-[#ea580c]" /> Initiate Séance
            </Link>
          </div>
          
          <div className="mb-6">
            <div className="px-3 text-[10px] font-bold text-[#8b949e] uppercase tracking-widest mb-2">Synthesis</div>
            <Link href="/dashboard/personas" className="flex items-center gap-3 px-3 py-2 rounded text-sm font-medium hover:bg-[#8a2be2]/10 hover:text-[#9f7aea] text-[#c9d1d9] transition-colors group">
              <Users className="w-4 h-4 text-[#8b949e] group-hover:text-[#9f7aea]" /> Cognitive Profiles
            </Link>
          </div>

          <div className="mb-6">
            <div className="px-3 text-[10px] font-bold text-[#8b949e] uppercase tracking-widest mb-2">Ethereal Substrate</div>
            <Link href="/dashboard/integrations" className="flex items-center justify-between px-3 py-2 rounded text-sm font-medium hover:bg-[#2d2d30] text-[#c9d1d9] transition-colors group">
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-[#8b949e] group-hover:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M12 2v2"/><path d="M12 22v-2"/><path d="m17 20.66-1-1.73"/><path d="M11 10.27 7 3.34"/><path d="m20.66 17-1.73-1"/><path d="m3.34 7 1.73 1"/><path d="M14 12h8"/><path d="M2 12h2"/><path d="m20.66 7-1.73 1"/><path d="m3.34 17 1.73-1"/><path d="m17 3.34-1 1.73"/><path d="m11 13.73-4 6.93"/></svg>
                Core Modules
              </div>
            </Link>
          </div>
        </nav>
        
        <div className="p-4 border-t border-[#2d2d30] bg-[#0a0a0c]">
          <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2 rounded text-sm font-medium hover:bg-[#2d2d30] text-[#c9d1d9] transition-colors">
            <Settings className="w-4 h-4 text-[#8b949e]" /> Engine Settings
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-[#2d2d30] bg-[#111114] sticky top-0 z-30 px-8 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2 text-xs font-mono text-[#8b949e] uppercase tracking-wider">
            <span className="text-white">Acme Corp</span> 
            <span className="text-[#2d2d30]">/</span>
            <span className="flex items-center gap-1.5 text-[#8a2be2]"><Cpu className="w-3.5 h-3.5" /> Project Alpha Node</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded border border-[#ea580c]/30 bg-[#ea580c]/10 flex items-center justify-center text-xs font-bold text-[#ea580c] shadow-[0_0_10px_rgba(234,88,12,0.2)]">AD</div>
          </div>
        </header>
        
        <div className="flex-1 p-8 overflow-y-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#111114] via-[#0a0a0c] to-[#0a0a0c]">
          {children}
        </div>
      </main>
    </div>
  );
}
