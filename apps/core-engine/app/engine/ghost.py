import asyncio
import uuid
import random
from typing import List, Dict, Any, Optional
from playwright.async_api import async_playwright, Browser, Page, ConsoleMessage
from app.models.persona import PersonaRazor

class ForensicGhost:
    """
    A high-fidelity AI agent that operates a real headless browser.
    Captures console logs, network telemetry, and detects UI friction.
    """
    
    def __init__(self, agent_id: str, sim_id: str, persona: PersonaRazor):
        self.agent_id = agent_id
        self.sim_id = sim_id
        self.persona = persona
        self.browser: Optional[Browser] = None
        self.page: Optional[Page] = None
        self.logs: List[Dict[str, Any]] = []
        self.is_active = False

    async def summon(self, playwright_instance):
        """Bootstraps the browser and instrumentors."""
        self.browser = await playwright_instance.chromium.launch(headless=True)
        # Emulate device based on persona
        is_mobile = self.persona.device_preference.lower() == "mobile"
        context = await self.browser.new_context(
            viewport={'width': 375, 'height': 667} if is_mobile else {'width': 1280, 'height': 720},
            is_mobile=is_mobile,
            user_agent="Mozilla/5.0 (Phantom/5.0; SyntheticAgent)"
        )
        self.page = await context.new_page()
        
        # Attach listeners
        self.page.on("console", self._handle_console)
        self.page.on("pageerror", self._handle_page_error)
        self.is_active = True

    async def _handle_console(self, msg: ConsoleMessage):
        log_entry = {
            "type": msg.type,
            "text": msg.text,
            "agent_id": self.agent_id,
            "location": msg.location
        }
        self.logs.append(log_entry)
        # We'll broadcast this in the orchestrator

    async def _handle_page_error(self, exc: Exception):
        self.logs.append({
            "type": "error",
            "text": str(exc),
            "agent_id": self.agent_id,
            "is_crash": True
        })

    async def hunt(self, url: str):
        """Navigates and performs the behavioral loop."""
        if not self.page:
            return
        
        await self.page.goto(url, wait_until="networkidle")
        # Simulate some interaction drift based on tech savviness
        scroll_depth = random.randint(100, 1000)
        await self.page.mouse.wheel(0, scroll_depth)
        await asyncio.sleep(random.uniform(0.5, 2.0))
        
        # Heuristic: Find and 'Think' about buttons
        buttons = await self.page.query_selector_all("button, a")
        # Just an observation for now
        return {"nodes_scanned": len(buttons), "scroll_depth": scroll_depth}

    async def terminate(self):
        self.is_active = False
        if self.browser:
            await self.browser.close()
