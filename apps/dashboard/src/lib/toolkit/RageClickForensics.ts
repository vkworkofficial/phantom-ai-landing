/**
 * Phantom AI: Rage Click Forensics
 * A high-fidelity utility to detect and trace the root cause of rage clicking.
 * Copy and paste this into your project.
 */

export interface RageClickEvent {
  target: string;
  timestamp: number;
  url: string;
  clickCount: number;
  duration: number;
  isRage: boolean;
}

export class RageClickForensics {
  private static clickThreshold = 300; // ms between clicks
  private static rageCount = 3; // clicks to trigger
  private static clicks: Array<{ time: number, target: HTMLElement }> = [];

  static init(onRage: (event: RageClickEvent) => void) {
    if (typeof window === 'undefined') return;

    window.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const now = Date.now();

      // Filter out non-interactive elements if needed
      this.clicks.push({ time: now, target });

      // Clean old clicks
      this.clicks = this.clicks.filter(c => now - c.time < 1000);

      const recentClicks = this.clicks.filter(c => c.target === target);

      if (recentClicks.length >= this.rageCount) {
        const first = recentClicks[0];
        const last = recentClicks[recentClicks.length - 1];
        const duration = last.time - first.time;

        if (duration < this.clickThreshold) {
          onRage({
            target: target.tagName + (target.id ? `#${target.id}` : '') + (target.className ? `.${target.className.split(' ')[0]}` : ''),
            timestamp: now,
            url: window.location.href,
            clickCount: recentClicks.length,
            duration,
            isRage: true
          });
          // Reset after trigger to avoid double firing
          this.clicks = [];
        }
      }
    });
  }
}
