/**
 * Phantom AI: Next.js Hydration Tracer
 * Detects the "Uncanny Valley" in Next.js applications (visible but non-interactive UI).
 */

export class HydrationTracer {
  private static startTime = Date.now();
  private static isHydrated = false;

  static init(onHydrationLag: (lagMs: number) => void) {
    if (typeof window === 'undefined') return;

    // Track when React actually hydrates
    const checkHydration = () => {
      if (document.body && !this.isHydrated) {
        this.isHydrated = true;
        const lag = Date.now() - this.startTime;
        
        // If lag is significant (> 1s), it's a forensic event
        if (lag > 1000) {
          onHydrationLag(lag);
        }
      }
    };

    if (document.readyState === 'complete') {
      checkHydration();
    } else {
      window.addEventListener('load', checkHydration);
    }

    // High-fidelity check: Try to intercept early clicks before hydration
    window.addEventListener('click', (e) => {
      if (!this.isHydrated) {
        console.warn("[Phantom Forensic] Interaction attempted before hydration completed.");
        // Signal event to parent tracker
      }
    }, { capture: true });
  }
}
