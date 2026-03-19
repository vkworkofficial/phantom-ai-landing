import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app
from app.api.errors import PhantomBaseException

@pytest.mark.asyncio
async def test_phantom_exception_handling():
    """Verify that PhantomBaseException results in structured forensic JSON."""
    
    @app.get("/test-error")
    async def trigger_error():
        raise PhantomBaseException(
            message="Forensic Trigger Test",
            forensic_data={"test_key": "test_value"},
            status_code=418 # I'm a teapot (forensic edition)
        )

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get("/test-error")
        assert response.status_code == 418
        data = response.json()
        assert data["error"] == "PhantomBaseException"
        assert data["message"] == "Forensic Trigger Test"
        assert data["forensic_payload"]["test_key"] == "test_value"
        assert "trace_id" in data
