import pytest
import asyncio
from app.engine.ghost import ForensicGhost
from app.models.persona import PersonaRazor
from playwright.async_api import async_playwright

@pytest.mark.asyncio
async def test_forensic_ghost_summoning():
    """Verify that a ForensicGhost can be summoned and navigate to a URL."""
    persona = PersonaRazor(
        age_range="25-34", country="US", tech_savviness=100, patience_level=1.0, 
        device_preference="desktop"
    )
    ghost = ForensicGhost(agent_id="test-agent", sim_id="test-sim", persona=persona)
    
    async with async_playwright() as p:
        await ghost.summon(p)
        assert ghost.is_active is True
        assert ghost.page is not None
        
        # Test navigation
        result = await ghost.hunt("https://example.com")
        assert result["nodes_scanned"] > 0
        
        await ghost.terminate()
        assert ghost.is_active is False

@pytest.mark.asyncio
async def test_console_log_capture():
    """Verify that ForensicGhost captures console logs from the page."""
    persona = PersonaRazor(
        age_range="25-34", country="US", tech_savviness=100, patience_level=1.0, 
        device_preference="desktop"
    )
    ghost = ForensicGhost(agent_id="test-agent", sim_id="test-sim", persona=persona)
    
    async with async_playwright() as p:
        await ghost.summon(p)
        
        # Inject a console log
        await ghost.page.evaluate("console.log('PHANTOM_TEST_LOG')")
        await asyncio.sleep(0.5)
        
        # Verify capture
        assert any(log["text"] == "PHANTOM_TEST_LOG" for log in ghost.logs)
        
        await ghost.terminate()
