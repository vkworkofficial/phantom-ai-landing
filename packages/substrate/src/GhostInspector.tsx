import React, { useState, useEffect } from 'react';
import { ForensicEvent } from './RageClickForensics';

/**
 * GhostInspector HUD
 * A ghostly overlay for real-time behavioral diagnostics.
 */
export function GhostInspector() {
  const [events, setEvents] = useState<ForensicEvent[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hfxScore, setHfxScore] = useState(0.0);

  useEffect(() => {
    const handleForensic = (e: Event) => {
      const customEvent = e as CustomEvent<ForensicEvent>;
      setEvents((prev: ForensicEvent[]) => [customEvent.detail, ...prev].slice(0, 10));
      // Increase Human Friction Index (HFX) simulation
      setHfxScore((prev: number) => Math.min(1.0, prev + 0.05));
    };

    window.addEventListener('phantom-forensic-event', handleForensic);
    return () => window.removeEventListener('phantom-forensic-event', handleForensic);
  }, []);

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#0d1117',
          border: '1px solid #3fb950',
          boxShadow: '0 0 10px rgba(63, 185, 80, 0.3)',
          cursor: 'pointer',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#3fb950',
          fontSize: '20px'
        }}
        title="Open Ghost Inspector"
      >
        👻
      </button>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '320px',
      maxHeight: '400px',
      backgroundColor: '#0d1117',
      border: '1px solid #30363d',
      borderRadius: '12px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      fontFamily: 'monospace',
      color: '#c9d1d9',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      <div style={{
        padding: '12px',
        borderBottom: '1px solid #30363d',
        display: 'flex',
        justifyContent: 'between',
        alignItems: 'center',
        background: '#161b22'
      }}>
        <span style={{ color: '#3fb950', fontWeight: 'bold' }}>GHOST INSPECTOR v1.0</span>
        <button 
          onClick={() => setIsOpen(false)}
          style={{ background: 'none', border: 'none', color: '#8b949e', cursor: 'pointer', marginLeft: 'auto' }}
        >
          ✕
        </button>
      </div>

      <div style={{ padding: '16px', flex: 1, overflowY: 'auto' }}>
        <div style={{ marginBottom: '16px', padding: '8px', border: '1px dashed #3fb950', borderRadius: '4px' }}>
          <div style={{ fontSize: '10px', color: '#8b949e', marginBottom: '4px' }}>HUMAN FRICTION INDEX (HFX)</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: hfxScore > 0.5 ? '#f85149' : '#3fb950' }}>
            {hfxScore.toFixed(3)}
          </div>
        </div>

        <div style={{ fontSize: '10px', color: '#8b949e', marginBottom: '8px' }}>FORENSIC LOG</div>
        {events.length === 0 ? (
          <div style={{ fontStyle: 'italic', color: '#484f58', fontSize: '11px' }}>Waiting for behavioral drift...</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {events.map((ev: ForensicEvent, i: number) => (
              <div key={i} style={{ fontSize: '10px', padding: '4px', borderLeft: '2px solid #3fb950', background: 'rgba(63, 185, 80, 0.05)' }}>
                <div style={{ color: '#3fb950' }}>[{ev.type.toUpperCase()}]</div>
                <div style={{ color: '#8b949e' }}>Target: {ev.elementTag}</div>
                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ev.xpath}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ padding: '8px', fontSize: '10px', textAlign: 'center', borderTop: '1px solid #30363d', color: '#484f58' }}>
        Substrate Protocol v4.3 Hardened
      </div>
    </div>
  );
}
