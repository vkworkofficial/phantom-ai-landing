import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app
from app.core.config import settings
import jwt

@pytest.mark.asyncio
async def test_simulations_route_requires_auth():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        # Request WITHOUT Authorization header
        response = await client.post("/api/v1/simulations/", json={"target_url": "https://example.com"})
        assert response.status_code == 401
        assert "unauthorized" in response.json()["detail"].lower()

@pytest.mark.asyncio
async def test_simulations_route_accepts_valid_jwt():
    transport = ASGITransport(app=app)
    # Generate a valid token
    token_data = {"sub": "ghost_123"}
    token = jwt.encode(token_data, settings.SECRET_KEY, algorithm="HS256")
    
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        # Request WITH valid Authorization header
        response = await client.post(
            "/api/v1/simulations/", 
            json={"target_url": "https://example.com"},
            headers={"Authorization": f"Bearer {token}"}
        )
        # It shouldn't be 401. It might be 422 if payload is wrong, 
        # but 401 means auth failed.
        assert response.status_code != 401
