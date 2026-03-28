"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Shield, Target } from "lucide-react";
import { Reveal } from "./Primitives";

export function SeanceTeaser() {
  const features = [
    {
      title: "Behavioral Consensus",
      desc: "No issue is reported unless at least 85% of our synthetic swarm reproduces the same friction point across varied environments.",
      icon: <Target className="w-5 h-5 text-primary" />,
    },
    {
      title: "HFX Instrumentation",
      desc: "Quantify the Human Friction Index (HFX) of every interaction, from silent logic loops to expensive rage-click cycles.",
      icon: <Zap className="w-5 h-5 text-primary" />,
    },
    {
      title: "Hardened v4.3 Substrate",
      desc: "Built on a resilient, high-fidelity browser pool optimized for low-latency behavioral capture and DOM transformation tracking.",
      icon: <Shield className="w-5 h-5 text-primary" />,
    },
  ];

  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 py-24 border-t border-[#30363d]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {features.map((feature, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div className="group relative">
              <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 group-hover:border-primary/40 transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-[#8b949e] leading-relaxed">
                {feature.desc}
              </p>
              
              {/* Subtle hover glow */}
              <div className="absolute -inset-2 bg-primary/5 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.4}>
        <div className="mt-20 p-8 rounded-2xl bg-gradient-to-b from-[#161b22] to-[#0d1117] border border-[#30363d] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-primary/10 transition-colors duration-700" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to bridge the <span className="text-primary italic">disappointment gap</span>?
              </h2>
              <p className="text-[#8b949e] leading-relaxed">
                Phantom AI is Currently in private beta. We are slowly onboarding founders who prioritize high-fidelity behavioral engineering over simple analytics.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById("waitlist-input")?.focus()}
              className="px-8 py-3 rounded-md bg-white text-black font-bold text-sm hover:bg-[#c9d1d9] transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              Request Beta Access
            </motion.button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
