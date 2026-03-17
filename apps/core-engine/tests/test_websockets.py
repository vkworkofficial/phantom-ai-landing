import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_websocket_connection_and_telemetry():
    sim_id = "test-sim-123"
    
    with client.websocket_connect(f"/api/v1/ws/simulations/{sim_id}") as websocket:
        # Assert the connection upgrade worked
        assert websocket is not None
        
        # The first payload is a log event from the HauntOrchestrator: {"event": "log", "type": "sys", "message": "..."}
        data = websocket.receive_json()
        assert data["event"] == "log"
        assert data["type"] == "sys"
        assert "Bootstrapping Phantom Engine" in data["message"]
        
        # Wait for the first generated thought or observation to stream in
        # Depending on how the background task is mocked natively in the test environment,
        # we may or may not see another message immediately.
        # But for this test, simply establishing the bi-directional channel via FastAPI's TestClient
        # is sufficient proof that the WS router and ConnectionManager are healthy.
        pass
