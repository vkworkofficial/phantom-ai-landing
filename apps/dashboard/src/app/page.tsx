"use client";

import React, { useState, useRef, useCallback } from "react";
import { Activity, Zap, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Modular Component Library
import { Reveal } from "@/components/landing/Primitives";
import { ArchitectureStack } from "@/components/landing/Features";
import { CustomizeGhost } from "@/components/landing/Customizer";
import { IssueSlider } from "@/components/landing/SocialProof";
import { SeanceTeaser } from "@/components/landing/SeanceTeaser";

// New Optimized Components
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { EmpathyGap } from "@/components/landing/EmpathyGap";
import { Jumpscare } from "@/components/landing/Jumpscare";
import { CommandPalette } from "@/components/landing/CommandPalette";
import { Footer } from "@/components/landing/Footer";
import { BackToTop } from "@/components/landing/BackToTop";

export default function Home() {
  const [showJumpscare, setShowJumpscare] = useState(false);
  const [toast, setToast] = useState<{msg: string, type: "success" | "error" | "info"} | null>(null);
  const [showCmdk, setShowCmdk] = useState(false);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((msg: string, type: "success" | "error" | "info" = "info") => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ msg, type });
    toastTimerRef.current = setTimeout(() => setToast(null), 4000);
  }, []);

  const triggerJumpscare = useCallback(() => {
    setShowJumpscare(true);
    setTimeout(() => setShowJumpscare(false), 900);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans selection:bg-primary/30 relative overflow-hidden">
      
      <Jumpscare show={showJumpscare} />

      <Header 
        onSearchClick={() => setShowCmdk(true)} 
        onWaitlistFocus={() => document.getElementById("waitlist-input")?.focus()} 
      />

      <main className="flex flex-col items-center w-full">
        <Hero 
          onSuccess={(msg) => showToast(msg, "success")} 
          onError={(msg) => showToast(msg, "error")} 
          onJumpscare={triggerJumpscare} 
        />

        <Reveal>
          <div className="w-full max-w-[1280px] mx-auto px-4 mb-4 mt-6">
            <h2 className="text-sm font-semibold text-[#484f58] uppercase tracking-wider mb-2">
              The problem is real. These founders lived it.
            </h2>
          </div>
        </Reveal>
        
        <IssueSlider />
        <ArchitectureStack />
        <Reveal><CustomizeGhost /></Reveal>
        <EmpathyGap />

        <section id="cicd" className="w-full border-t border-[#30363d] bg-[#161b22] py-24">
          <div className="max-w-[1280px] mx-auto px-4 flex flex-col lg:flex-row gap-12 items-center text-center lg:text-left justify-center">
            <Reveal>
              <div className="w-full lg:max-w-2xl shrink-0">
                <h2 className="text-4xl font-bold tracking-tight text-white mb-6 leading-tight">
                  The Infrastructure for PMF Velocity.<br />
                  <span className="text-[#8b949e]">Runs securely in your CI/CD.</span>
                </h2>
                <p className="text-lg text-[#8b949e] mb-10 leading-relaxed">
                  Phantom runs inside your existing pipeline. If a PR introduces UX friction above your threshold, the build fails. Behavioral QA becomes as non-negotiable as unit tests.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button 
                    className="h-12 px-8 text-base bg-primary text-white rounded-md font-semibold hover:bg-primary/90 transition-all shadow-lg" 
                    onClick={() => { 
                      document.getElementById("waitlist-input")?.focus(); 
                      window.scrollTo({ top: 0, behavior: "smooth" }); 
                    }}
                  >
                    Summon your ghosts
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
        
        <SeanceTeaser />
      </main>

      <Footer />

      {/* GLOBAL TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, y: 20, scale: 0.9 }} 
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-md border shadow-2xl ${
              toast.type === "success" ? "bg-[#161b22] border-[#3fb950]/40 text-[#3fb950]" : 
              toast.type === "error" ? "bg-[#161b22] border-[#ff7b72]/40 text-[#ff7b72]" : 
              "bg-[#161b22] border-[#30363d] text-[#c9d1d9]"
            }`}
          >
            {toast.type === "success" ? <CheckCircle2 className="w-5 h-5" /> : 
             toast.type === "error" ? <Zap className="w-5 h-5" /> : 
             <Activity className="w-5 h-5" />}
            <span className="text-sm font-medium">{toast.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <CommandPalette 
        show={showCmdk} 
        onClose={() => setShowCmdk(false)} 
        onToast={(msg, type) => showToast(msg, type)} 
      />

      <BackToTop />
    </div>
  );
}
