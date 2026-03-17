"use client";

import { useState, useEffect } from 'react';

/**
 * Persists and recovers Séance state in localStorage.
 * Ensures that if a user refreshes the dashboard during an active run,
 * the status and metrics are not lost.
 */
export function useSeanceRecovery(simId: string | null) {
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        if (!simId) return;

        // Try to recover from local storage
        const saved = localStorage.getItem(`phantom_sim_${simId}`);
        if (saved) {
            try {
                setState(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to recover séance state:", e);
            }
        }
    }, [simId]);

    const persistState = (newState: any) => {
        if (!simId) return;
        setState(newState);
        localStorage.setItem(`phantom_sim_${simId}`, JSON.stringify(newState));
    };

    const clearState = () => {
        if (!simId) return;
        localStorage.removeItem(`phantom_sim_${simId}`);
    };

    return { state, persistState, clearState };
}
