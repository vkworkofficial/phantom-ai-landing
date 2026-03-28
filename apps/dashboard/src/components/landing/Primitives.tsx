"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* =================================================== */
/*  REVEAL                                             */
/* =================================================== */

export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} initial={{ y: 30, opacity: 0 }} animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }} transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}>
      {children}
    </motion.div>
  );
}

/* =================================================== */
/*  LOGO                                               */
/* =================================================== */

export function PhantomLogo({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      <rect x="25" y="25" width="50" height="50" rx="8" stroke="hsl(var(--primary))" strokeWidth="8" />
      <path d="M 40 50 L 60 50 M 50 40 L 50 60" stroke="hsl(var(--primary))" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}

/* =================================================== */
/*  BUTTONS                                            */
/* =================================================== */

export function Button({ children, primary = false, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { primary?: boolean }) {
  return (
    <button className={`px-3 py-1.5 text-sm font-semibold rounded-md border transition-all duration-300 ${primary ? "bg-primary text-white border-primary hover:bg-primary/90 shadow-[0_0_15px_-3px_rgba(234,88,12,0.4)] hover:shadow-[0_0_25px_-5px_rgba(234,88,12,0.6)]" : "bg-[#21262d] text-[#c9d1d9] border-[#30363d] hover:bg-[#30363d] hover:border-[#8b949e]"} ${className}`} {...props}>{children}</button>
  );
}

/* =================================================== */
/*  INPUTS                                             */
/* =================================================== */

export function Input({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-sm text-[#c9d1d9] placeholder:text-[#8b949e] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-inner transition-all duration-300 ${className}`} {...props} />;
}

/* =================================================== */
/*  BADGE                                              */
/* =================================================== */

export function Badge({ children, className = "", showDot = false }: { children: React.ReactNode; className?: string; showDot?: boolean }) {
  return <span className={`inline-flex items-center rounded-full border border-[#30363d] bg-transparent px-2.5 py-0.5 text-xs font-medium text-[#8b949e] ${className}`}>{showDot && <span className="w-1.5 h-1.5 rounded-full bg-[#e3b341] animate-[pulse_2s_ease-in-out_infinite] mr-2" />}{children}</span>;
}
