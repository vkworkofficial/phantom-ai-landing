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
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        # Simulate 5 rapid requests (the allowed limit)
        for _ in range(5):
            response = await client.post("/api/v1/simulations/", json={"target_url": "https://example.com"})
            # The exact response doesn't matter here (could be 202 or 400 depending on payload parsing),
            # but it MUST NOT be 429 yet.
            assert response.status_code != 429
            
        # The 6th request MUST be blocked by the RateLimiterMiddleware
        response_blocked = await client.post("/api/v1/simulations/", json={"target_url": "https://example.com"})
        assert response_blocked.status_code == 429
        assert "Too Many Requests" in response_blocked.json()["detail"]
