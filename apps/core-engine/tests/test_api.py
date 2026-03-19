import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app

@pytest.mark.asyncio
async def test_health_check_returns_200():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get("/health")
        assert response.status_code == 200
        assert response.json()["status"] == "ok"

@pytest.mark.asyncio
async def test_rate_limiter_blocks_abuse():
    from app.core.config import settings
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        # The middleware limit is settings.RATE_LIMIT (default 100).
        # We send up to limit + 1 requests to verify the block.
        # This is resilient to points consumed by previous tests in the same session.
        
        found_429 = False
        for i in range(settings.RATE_LIMIT + 5):
            response = await client.get("/health")
            if response.status_code == 429:
                found_429 = True
                break
            assert response.status_code == 200
            
        assert found_429 is True
        # The error message should contain the forensic substrate signature
        assert "Forensic Substrate" in response.json()["detail"]
