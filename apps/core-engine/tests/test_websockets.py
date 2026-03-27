from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_websocket_connection_and_telemetry():
    import jwt
    from app.core.config import settings
    from app.api.websockets import manager
    
    sim_id = "test-sim-123"
    token = jwt.encode({"sub": "ghost-inspector"}, settings.SECRET_KEY, algorithm="HS256")
    
    with client.websocket_connect(f"/api/v1/ws/simulations/{sim_id}?token={token}") as websocket:
        assert websocket is not None
        # Verify the manager tracked the connection
        assert sim_id in manager.active_connections
        assert len(manager.active_connections[sim_id]) == 1
        
    # Verify the manager cleaned up
    assert sim_id not in manager.active_connections
