/**
 * RageClickForensics.ts
 * Captures the Behavioral Fingerprint of digital frustration.
 */

export interface ForensicEvent {
  timestamp: number;
  type: "rage-click" | "dead-click" | "heavy-scroll";
  elementId?: string;
  elementTag: string;
  xpath: string;
  viewPort: { w: number; h: number };
  mousePos: { x: number; y: number };
}

class RageClickTracker {
  private clickHistory: { t: number; x: number; y: number; target: HTMLElement }[] = [];
  private readonly CLICK_THRESHOLD = 4; // clicks
  private readonly TIME_WINDOW = 1000; // ms
  private readonly DISTANCE_THRESHOLD = 50; // px
  private onForensicEvent?: (event: ForensicEvent) => void;

  constructor(callback?: (event: ForensicEvent) => void) {
    this.onForensicEvent = callback;
    if (typeof window !== "undefined") {
      window.addEventListener("click", this.handleClick.bind(this), true);
    }
  }

  private handleClick(e: MouseEvent) {
    const now = Date.now();
    const target = e.target as HTMLElement;

    // Filter old clicks
    this.clickHistory = this.clickHistory.filter(c => now - c.t < this.TIME_WINDOW);

    // Filter by distance (rage clicks usually happen in the same spot)
    const recentNearClicks = this.clickHistory.filter(c => 
      Math.abs(c.x - e.clientX) < this.DISTANCE_THRESHOLD && 
      Math.abs(c.y - e.clientY) < this.DISTANCE_THRESHOLD
    );

    this.clickHistory.push({ t: now, x: e.clientX, y: e.clientY, target });

    if (recentNearClicks.length >= this.CLICK_THRESHOLD - 1) {
      this.triggerForensic(e, target);
      this.clickHistory = []; // Reset after trigger
    }
  }

  private triggerForensic(e: MouseEvent, target: HTMLElement) {
    const event: ForensicEvent = {
      timestamp: Date.now(),
      type: "rage-click",
      elementId: target.id || undefined,
      elementTag: target.tagName,
      xpath: this.getXPath(target),
      viewPort: { w: window.innerWidth, h: window.innerHeight },
      mousePos: { x: e.clientX, y: e.clientY }
    };

    console.warn("[Phantom Forensics] Rage Click Detected:", event);
    this.onForensicEvent?.(event);
  }

  private getXPath(element: HTMLElement | null): string {
    if (!element) return "";
    if (element.id !== "") return `//*[@id="${element.id}"]`;
    if (element === document.body) return element.tagName;

    let ix = 0;
    const siblings = element.parentNode?.childNodes || [];
    for (let i = 0; i < siblings.length; i++) {
      const sibling = siblings[i] as HTMLElement;
      if (sibling === element) return `${this.getXPath(element.parentNode as HTMLElement)}/${element.tagName}[${ix + 1}]`;
      if (sibling.nodeType === 1 && sibling.tagName === element.tagName) ix++;
    }
    return "";
  }

  public destroy() {
    if (typeof window !== "undefined") {
      window.removeEventListener("click", this.handleClick.bind(this), true);
    }
  }
}

export const initRageClickForensics = (cb?: (e: ForensicEvent) => void) => new RageClickTracker(cb);
