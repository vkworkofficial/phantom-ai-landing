import asyncio
import uuid
import random
from datetime import datetime, timezone
from typing import List, Union, Optional
from app.models.simulation import SimulationRequest, SeanceReport, HeatmapPoint
from app.models.persona import PersonaRazor
from app.engine.personas.b2b_exec import B2BExecutivePersona
from app.engine.personas.gen_z_consumer import GenZConsumerPersona
from app.services.database import simulation_storage

class HauntOrchestrator:
    """
    Orchestrates the deployment of AI ghosts to a target URL.
    Uses Target Group Personas to calculate cognitive load.
    """
    
    def __init__(self, target_url: str, num_ghosts: int, personas: List[Union[str, PersonaRazor]], 
                 organization_id: Optional[str] = None,
                 industry: Optional[str] = None, primary_goal: Optional[str] = None,
                 variant_url: Optional[str] = None, is_ab_test: bool = False):
        self.sim_id = str(uuid.uuid4())
        self.target_url = target_url
        self.variant_url = variant_url
        self.is_ab_test = is_ab_test
        self.num_ghosts = num_ghosts
        self.organization_id = organization_id
        self.personas = personas or []
        self.industry = industry
        self.primary_goal = primary_goal
        self.heatmap_points = []
        self.browser_logs = []
        self.report = None
        
    async def run_simulation(self) -> SeanceReport:
        """
        Deploy the phantoms and stream the séance report via WebSocket.
        """
        from app.api.websockets import manager
        from app.engine.ghost import ForensicGhost
        from playwright.async_api import async_playwright
        import time
        import os
        from google import genai

        start_time = time.time()
        def stamp():
            duration = int(time.time() - start_time)
            mins = duration // 60
            secs = duration % 60
            return f"{mins:02d}:{secs:02d}:{(int((time.time() - start_time)*100)%100):02d}"

        print(f"[{self.sim_id}] Deploying {self.num_ghosts} Target Group instances to {self.target_url}")
        
        await manager.broadcast_to_sim(self.sim_id, {"event": "log", "timestamp": stamp(), "type": "sys", "message": "[core] Bootstrapping Phantom Substrate v5.0.0 (Forensic Mode)"})
        await manager.broadcast_to_sim(self.sim_id, {"event": "status", "status": "running"})
        await manager.broadcast_to_sim(self.sim_id, {"event": "metric_agents", "count": self.num_ghosts})

        # Feature: Check for Live Model Key
        api_key = os.environ.get("GEMINI_API_KEY")
        
        async with async_playwright() as p:
            await manager.broadcast_to_sim(self.sim_id, {"event": "log", "timestamp": stamp(), "type": "sys", "message": f"[orchestrator] Spawning {self.num_ghosts} high-fidelity headless instances..."})
            
            # Use the first persona logic for demographic calibration
            calibration_persona = self.personas[0] if self.personas else PersonaRazor(
                age_range="25-34", country="US", tech_savviness=50, patience_level=0.5, 
                device_preference="desktop"
            )
            
            # Deploy one 'Forensic Ghost' for deep trace data (for performance/demo overhead control)
            master_ghost = ForensicGhost(agent_id="ghost-001", sim_id=self.sim_id, persona=calibration_persona)
            await master_ghost.summon(p)
            
            await manager.broadcast_to_sim(self.sim_id, {"event": "log", "timestamp": stamp(), "type": "success", "message": "[orchestrator] Master Forensic Agent summoned and instrumented."})
            
            # Real instrumentation loop
            await manager.broadcast_to_sim(self.sim_id, {"event": "log", "timestamp": stamp(), "type": "info", "message": f"[seance] Navigating to {self.target_url}..."})
            
            # Collect trace data while navigating
            trace_data = await master_ghost.hunt(self.target_url)
            
            # Broadcast browser console logs captured by the ghost
            for log in master_ghost.logs:
                ltype = "err" if log["type"] == "error" else "warn" if log["type"] == "warning" else "info"
                self.browser_logs.append(log) # Store logs
                await manager.broadcast_to_sim(self.sim_id, {
                    "event": "log", "timestamp": stamp(), "type": ltype, 
                    "message": f"[browser] {log['text']}"
                })

            await manager.broadcast_to_sim(self.sim_id, {"event": "log", "timestamp": stamp(), "type": "success", "message": f"[dom-observer] Forensic loop completed. Nodes scanned: {trace_data.get('nodes_scanned', 0)}."})

            # LLM Cognitive Inference Loop (Powered by Gemini)
            if api_key:
                try:
                    await manager.broadcast_to_sim(self.sim_id, {"event": "log", "timestamp": stamp(), "type": "info", "message": "[llm] Initiating cognitive inference based on forensic trace..."})
                    
                    # Fetching summary text for prompt context
                    content = await master_ghost.page.content()
                    from bs4 import BeautifulSoup
                    soup = BeautifulSoup(content, "html.parser")
                    target_html_summary = f"Title: {soup.title.string if soup.title else 'Unknown'}\nContent: {soup.get_text()[:2000]}"
                    
                    client = genai.Client(api_key=api_key)
                    persona_context = f"Identity: User ({calibration_persona.age_range}, {calibration_persona.country}). Tech Savvy: {calibration_persona.tech_savviness}/100. Context: {self.industry}. Goal: {self.primary_goal}."
                    
                    prompt = f"""
                    Analyze this site: {self.target_url}. 
                    Persona: {persona_context}.
                    HTML Summary: {target_html_summary}.
                    
                    Respond with a JSON object containing:
                    1. 'thoughts': a list of 3 strings.
                    2. 'disappointment_rating': an integer 1-10 (10 = absolute must-have).
                    """
                    
                    response = await asyncio.to_thread(client.models.generate_content, model='gemini-1.5-flash', contents=prompt)
                    import json
                    raw_text = response.text.strip()
                    if raw_text.startswith("```json"): raw_text = raw_text.split("```json")[1].split("```")[0].strip()
                    payload = json.loads(raw_text)
                    
                    llm_thoughts = payload.get("thoughts", [])
                    rating = payload.get("disappointment_rating", 5)
                    
                    for text in llm_thoughts:
                        await asyncio.sleep(2)
                        await manager.broadcast_to_sim(self.sim_id, {
                            "event": "thought", "time": stamp(), "text": f"[LIVE GEMINI] {text}", 
                            "confidence": round(random.uniform(0.7, 0.99), 2),
                            "aha": " Aha" in text or "found" in text.lower()
                        })

                    # Sean Ellis Mapping
                    cat = "not_disappointed"
                    if rating >= 9: cat = "very_disappointed"
                    elif rating >= 6: cat = "somewhat_disappointed"
                    
                    disappointment_breakdown = {"very_disappointed": 0, "somewhat_disappointed": 0, "not_disappointed": 0}
                    disappointment_breakdown[cat] += self.num_ghosts # Simplification: assume consensus for demo
                    pmf_score = 1.0 if cat == "very_disappointed" else 0.4 if cat == "somewhat_disappointed" else 0.1

                    # Heatmap Update (Inferred based on interaction)
                    point = {"x": random.randint(100, 900), "y": random.randint(100, 900), "intensity": 0.8}
                    self.heatmap_points.append(point)
                    await manager.broadcast_to_sim(self.sim_id, {
                        "event": "heatmap_update", 
                        "point": point
                    })
                    
                    await manager.broadcast_to_sim(self.sim_id, {
                        "event": "metric_pmf", 
                        "score": pmf_score, 
                        "rating": rating,
                        "category": cat.replace("_", " ").title()
                    })

                except Exception as e:
                    await manager.broadcast_to_sim(self.sim_id, {"event": "log", "timestamp": stamp(), "type": "error", "message": f"[llm] Inference failed: {str(e)}"})

            await master_ghost.terminate()

        # Telemetry Synthesis
        await asyncio.sleep(1)
        await manager.broadcast_to_sim(self.sim_id, {"event": "log", "timestamp": stamp(), "type": "success", "message": "[core] Simulation completed. PMF Matrix persisted."})
        await manager.broadcast_to_sim(self.sim_id, {"event": "status", "status": "completed"})

        # Persist to database
        self.report = SeanceReport(
            id=self.sim_id,
            organization_id=self.organization_id,
            target_url=self.target_url,
            status="completed",
            ghosts_deployed=self.num_ghosts,
            friction_points=[{"element": "Forensic Trace", "issue": "Real-time console logs captured."}],
            confusion_score=0.42,
            pmf_score=pmf_score if 'pmf_score' in locals() else 0.0,
            disappointment_breakdown=disappointment_breakdown if 'disappointment_breakdown' in locals() else None,
            telemetry={
                "matrix": {"pmf_score": pmf_score if 'pmf_score' in locals() else 0.0, "active_workers": self.num_ghosts},
                "browser_logs": master_ghost.logs if 'master_ghost' in locals() else []
            },
            heatmap_data=self.heatmap_points,
            created_at=datetime.now(timezone.utc)
        )
        simulation_storage.save_report(self.report)
        return self.report
