'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface RippleProps {
  x: number;
  y: number;
  intensity: number;
}

export function FrustrationRipple({ x, y, intensity }: RippleProps) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0.8 }}
      animate={{ scale: 4, opacity: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 20 * intensity,
        height: 20 * intensity,
        borderRadius: '50%',
        backgroundColor: 'rgba(239, 68, 68, 0.4)', // Tailwind red-500
        border: '1px solid rgba(239, 68, 68, 0.8)',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999
      }}
    />
  );
}
