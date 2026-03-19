'use client';

import React, { useState, useEffect } from 'react';
import { FrustrationRipple } from './FrustrationRipple';
import { IntentTracer } from './IntentTracer';
import { usePathname } from 'next/navigation';

export function CognitiveHUDOverlay() {
  const [isActive, setIsActive] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number; intensity: number }[]>([]);
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const handleToggle = (e: any) => setIsActive(e.detail.active);
    window.addEventListener('phantom-hud-toggle', handleToggle);
    return () => window.removeEventListener('phantom-hud-toggle', handleToggle);
  }, []);

  // Simulation: Add periodic ripples and traces if on specific pages
  useEffect(() => {
    if (!pathname.includes('/dashboard') || !isActive) {
      setRipples([]);
      setPoints([]);
      return;
    }

    const rippleInterval = setInterval(() => {
      const id = Date.now();
      setRipples(prev => [...prev.slice(-10), { 
        id, 
        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
        y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
        intensity: Math.random() * 2 + 1
      }]);
      
      // Cleanup
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== id));
      }, 1000);
    }, 3000);

    const traceInterval = setInterval(() => {
      setPoints(prev => {
        const next = [...prev.slice(-20), { 
          x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
          y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800) 
        }];
        return next;
      });
    }, 1000);

    return () => {
      clearInterval(rippleInterval);
      clearInterval(traceInterval);
    };
  }, [pathname, isActive]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {ripples.map(r => (
        <FrustrationRipple key={r.id} x={r.x} y={r.y} intensity={r.intensity} />
      ))}
      <IntentTracer points={points} />
    </div>
  );
}
