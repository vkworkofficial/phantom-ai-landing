import { useState, useCallback } from 'react';

export type SimulationStatus = 'idle' | 'analyzing' | 'complete';

interface UseSeanceSimulation {
  status: SimulationStatus;
  progress: number;
  logs: string[];
  initiateSeance: (email: string, domain: string) => Promise<void>;
  resetSeance: () => void;
}

const SEANCE_STEPS = [
  "Initializing Substrate Connection...",
  "Deploying Cognitive Ghost Ensemble...",
  "Injecting Forensic Tracers into DOM...",
  "Analyzing React Hydration Timings...",
  "Measuring Client-Side State Desync...",
  "Calculating Human Friction Score...",
  "Compiling Forensic Report v1.0..."
];

/**
 * useSeanceSimulation
 * 
 * Encapsulates the behavioral forensic simulation logic.
 * Decoupled from the UI to ensure the simulation can be reused across different entry points.
 */
export function useSeanceSimulation(): UseSeanceSimulation {
  const [status, setStatus] = useState<SimulationStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const initiateSeance = useCallback(async (email: string, domain: string) => {
    if (!email || !domain) return;

    setStatus('analyzing');
    setProgress(0);
    setLogs([]);

    // We simulate a sequential audit process.
    // In production, this would coordinate with a background worker or a WebSocket stream.
    for (let i = 0; i < SEANCE_STEPS.length; i++) {
      setLogs(prev => [...prev, SEANCE_STEPS[i]]);
      setProgress(((i + 1) / SEANCE_STEPS.length) * 100);
      
      // Simulate network latency and forensic processing gaps
      await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 800));
    }

    setStatus('complete');
  }, []);

  const resetSeance = useCallback(() => {
    setStatus('idle');
    setProgress(0);
    setLogs([]);
  }, []);

  return {
    status,
    progress,
    logs,
    initiateSeance,
    resetSeance
  };
}
