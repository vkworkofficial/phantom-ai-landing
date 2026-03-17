"use client";

import React from 'react';
import { Ghost, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function WaitlistPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-[#161b22] border border-[#30363d] rounded-2xl p-12 shadow-2xl relative overflow-hidden">
        {/* Ambient background effect */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full -mr-32 -mt-32" />
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-8 border border-primary/20">
            <Ghost className="w-10 h-10 text-primary" />
          </div>
          
          <h1 className="text-4xl font-bold text-white tracking-tight mb-4">
            Substrate Access Restricted
          </h1>
          
          <p className="text-[#8b949e] text-lg max-w-md mb-12">
            The Phantom Substrate is currently in private preview for YC-backed founders and select engineering teams.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-12">
            <div className="bg-[#0d1117] border border-[#30363d] p-6 rounded-xl text-left hover:border-[#484f58] transition-colors">
              <ShieldCheck className="w-6 h-6 text-[#3fb950] mb-3" />
              <h3 className="text-white font-semibold mb-1">Approved Founders</h3>
              <p className="text-xs text-[#5c646c]">Log in with your whitelisted organization email.</p>
            </div>
            <div className="bg-[#0d1117] border border-[#30363d] p-6 rounded-xl text-left hover:border-[#484f58] transition-colors">
              <Mail className="w-6 h-6 text-primary mb-3" />
              <h3 className="text-white font-semibold mb-1">Join the Seance</h3>
              <p className="text-xs text-[#5c646c]">Apply for priority access to the synthetic reality engine.</p>
            </div>
          </div>

          <div className="w-full space-y-4">
            <Link 
              href="/login"
              className="w-full flex justify-center items-center gap-2 px-6 py-4 bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition-all text-sm uppercase tracking-widest"
            >
              Back to Login
            </Link>
            <button 
              className="w-full flex justify-center items-center gap-2 px-6 py-4 border border-[#30363d] text-[#8b949e] rounded-lg font-bold hover:bg-white/5 transition-all text-sm uppercase tracking-widest"
            >
              Request Access <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-12 pt-8 border-t border-[#30363d] w-full">
            <p className="text-[#484f58] text-[10px] uppercase tracking-widest font-mono italic">
              Phantom AI // Priority Consensus Protocol v4.2
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
