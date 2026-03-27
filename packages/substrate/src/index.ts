/**
 * @phantom-labs/substrate
 * The Forensic Substrate for Human Behavior.
 */

import { initRageClickForensics, ForensicEvent } from './RageClickForensics';
import { GhostInspector } from './GhostInspector';

export { initRageClickForensics, GhostInspector };
export type { ForensicEvent };

// Auto-initialize behavioral tracers if in a browser environment
if (typeof window !== 'undefined') {
  initRageClickForensics((event) => {
    // Dispatch a custom event for the GhostInspector HUD
    const customEvent = new CustomEvent('phantom-forensic-event', { detail: event });
    window.dispatchEvent(customEvent);
  });
}
