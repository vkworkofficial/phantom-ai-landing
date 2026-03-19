/**
 * Ghost Inspector v1.0 (Phantom AI)
 * 
 * A forensic HUD overlay for real-time behavioral diagnostics.
 * Run this snippet in your browser console to see through 'Ghost Eyes'.
 */

(function() {
    console.log("%c[Phantom] 👻 Ghost Inspector Activated.", "color: #ea580c; font-weight: bold; font-size: 16px; font-style: italic;");
    
    // Create UI Substrate
    const hud = document.createElement('div');
    hud.id = 'phantom-forensic-hud';
    hud.style.cssText = `
        position: fixed; top: 20px; right: 20px; z-index: 999999;
        width: 320px; background: rgba(1, 4, 9, 0.95); backdrop-filter: blur(12px);
        border: 1px solid #30363d; border-radius: 12px; font-family: 'JetBrains Mono', monospace;
        color: #c9d1d9; padding: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.8);
        user-select: none; pointer-events: none;
    `;
    
    const header = `
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #30363d; padding-bottom: 8px; margin-bottom: 12px;">
            <div style="font-weight: 800; color: #fff; font-size: 11px; letter-spacing: 0.2em;">PHANTOM // HUD</div>
            <div style="font-size: 9px; color: #ea580c; font-weight: bold;">LIVE_SEANCE</div>
        </div>
    `;
    
    const stats = `
        <div style="display: grid; grid-template-cols: 1fr 1fr; gap: 8px; margin-bottom: 16px;">
            <div style="background: #161b22; padding: 8px; border-radius: 6px;">
                <div style="font-size: 8px; color: #8b949e; margin-bottom: 4px;">HFS SCORE</div>
                <div id="phantom-hfs" style="font-size: 20px; font-weight: 900; color: #3fb950; font-style: italic;">--</div>
            </div>
            <div style="background: #161b22; padding: 8px; border-radius: 6px;">
                <div style="font-size: 8px; color: #8b949e; margin-bottom: 4px;">RAGE_PROB</div>
                <div id="phantom-rage" style="font-size: 20px; font-weight: 900; color: #f85149; font-style: italic;">0%</div>
            </div>
        </div>
    `;
    
    const logArea = `
        <div id="phantom-logs" style="font-size: 10px; color: #8b949e; line-height: 1.6; height: 100px; overflow: hidden; position: relative;">
            <div style="opacity: 0.5;">Awaiting cognitive events...</div>
        </div>
    `;
    
    hud.innerHTML = header + stats + logArea;
    document.body.appendChild(hud);

    // Simulation logic
    const logs = document.getElementById('phantom-logs');
    const hfsEl = document.getElementById('phantom-hfs');
    const rageEl = document.getElementById('phantom-rage');
    
    const addLog = (msg) => {
        const line = document.createElement('div');
        line.innerHTML = `<span style="color: #ea580c; margin-right: 6px;">›</span> ${msg}`;
        logs.prepend(line);
        if (logs.children.length > 8) logs.removeChild(logs.lastChild);
    };

    // Instrumentation loop
    let hfs = 100;
    setInterval(() => {
        const events = [
            "Intercepted React Hydration delta: 4.2ms",
            "Ghost-32 encountered DOM friction in #btn-cta",
            "Cognitive inference: High intent detected",
            "Layout shift captured: 0.002",
            "Tracing human cursor trajectory...",
            "Shadow-state desync: Minimal"
        ];
        
        if (Math.random() > 0.7) {
            addLog(events[Math.floor(Math.random() * events.length)]);
            hfs -= Math.random() * 0.5;
            hfsEl.innerText = Math.floor(hfs);
        }
    }, 1500);

    // Rage click listener
    document.addEventListener('click', (e) => {
        addLog(`Click event forensic: ${e.target.tagName}#${e.target.id || 'none'}`);
        if (hfs < 80) rageEl.innerText = (Math.random() * 20).toFixed(1) + '%';
    });

})();
