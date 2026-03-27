from fastapi.testclient import TestClient

def test_health_check(client: TestClient):
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"

def test_unauthorized_simulation(client: TestClient):
    # Should fail without X-Phantom-Key or auth session
    response = client.post("/api/v1/simulations", json={})
    assert response.status_code == 401 # Alignment with Forensic Substrate

def test_workspace_me_unauthorized(client: TestClient):
    response = client.get("/api/v1/workspace/me")
    assert response.status_code == 401
