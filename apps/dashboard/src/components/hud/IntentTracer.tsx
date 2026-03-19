'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TraceProps {
  points: { x: number; y: number }[];
}

export function IntentTracer({ points }: TraceProps) {
  if (points.length < 2) return null;

  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <svg className="absolute inset-0 pointer-events-none z-[9998] w-full h-full">
      <motion.path
        d={path}
        fill="none"
        stroke="rgba(138, 43, 226, 0.3)" // Purple-500/30
        strokeWidth="2"
        strokeDasharray="5,5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "linear", repeat: Infinity }}
      />
    </svg>
  );
}
