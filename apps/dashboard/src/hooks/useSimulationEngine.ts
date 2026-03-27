import { useState, useCallback } from 'react';

export type SimulationStatus = 'idle' | 'analyzing' | 'complete';

interface UseSimulationEngine {
  status: SimulationStatus;
  progress: number;
  logs: string[];
  initiateSimulation: (email: string, domain: string) => Promise<void>;
  resetSimulation: () => void;
}

const SIMULATION_STEPS = [
  "Initializing Platform Engine...",
  "Orchestrating Synthetic User Instances...",
  "Monitoring DOM Mutation Events...",
  "Analyzing UI Interaction Latency...",
  "Measuring Client-Side State Consistency...",
  "Calculating Conversion Friction Score...",
  "Compiling Simulation Report v1.0..."
];

/**
 * useSimulationEngine
 * 
 * Encapsulates the synthetic user behavioral simulation logic.
 * Decoupled from the UI to ensure the simulation can be reused across different entry points.
 */
export function useSimulationEngine(): UseSimulationEngine {
  const [status, setStatus] = useState<SimulationStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const initiateSimulation = useCallback(async (email: string, domain: string) => {
    if (!email || !domain) return;

    setStatus('analyzing');
    setProgress(0);
    setLogs([]);

    // We simulate a sequential audit process.
    // In production, this would coordinate with a background worker or a WebSocket stream.
    for (let i = 0; i < SIMULATION_STEPS.length; i++) {
      setLogs(prev => [...prev, SIMULATION_STEPS[i]]);
      setProgress(((i + 1) / SIMULATION_STEPS.length) * 100);
      
      // Simulate network latency and processing gaps
      await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 800));
    }

    setStatus('complete');
  }, []);

  const resetSimulation = useCallback(() => {
    setStatus('idle');
    setProgress(0);
    setLogs([]);
  }, []);

  return {
    status,
    progress,
    logs,
    initiateSimulation,
    resetSimulation
  };
}
