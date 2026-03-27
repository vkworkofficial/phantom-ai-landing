from fastapi.testclient import TestClient
from app.main import app
from app.core.config import settings
from app.services.firewall import ghost_firewall

client = TestClient(app)

# CTO Mandate: Forensic Security Verification Suite
# Targets: Auth Bypass, SSRF, Rate-Limiting, Header Integrity

def test_auth_unauthorized_access():
    """
    [CRITICAL] Verify that the substrate blocks unauthorized access to the ensemble.
    """
    response = client.post(f"{settings.API_V1_STR}/simulations/ensemble", json={})
    assert response.status_code == 401
    assert "Authentication required" in response.json()["detail"]

def test_auth_invalid_key():
    """
    [CRITICAL] Verify that an incorrect forensic key is rejected.
    """
    headers = {"X-Phantom-Key": "malicious_fake_key"}
    response = client.post(f"{settings.API_V1_STR}/simulations/ensemble", json={}, headers=headers)
    assert response.status_code == 403
    assert "Invalid Forensic Key" in response.json()["detail"]

def test_ghost_firewall_ssrf_block():
    """
    [EXPERIMENT] Verify that the Ghost Firewall blocks internal metadata navigation.
    """
    # Test the firewall service directly
    assert ghost_firewall.validate_target("https://google.com") is True
    assert ghost_firewall.validate_target("http://169.254.169.254/latest/meta-data") is False
    assert ghost_firewall.validate_target("http://127.0.0.1:8080/admin") is False
    assert ghost_firewall.validate_target("http://192.168.1.1/config") is False

def test_security_headers_integrity():
    """
    [HARDENING] Verify that all API responses contain the Strict Security Substrate headers.
    """
    response = client.get("/health")
    assert response.headers["X-Content-Type-Options"] == "nosniff"
    assert response.headers["X-Frame-Options"] == "DENY"
    assert "max-age=31536000" in response.headers["Strict-Transport-Security"]

def test_audit_logging_flow(monkeypatch):
    """
    [PROVENANCE] Verify that security events are piped to the audit log.
    """
    # Patch the specific instance used in simulations route
    from app.api.routes import simulations
    logs = []
    
    def mock_log_action(action, actor_id, resource_id=None, status="success", ip=None):
        logs.append(action)

    monkeypatch.setattr(simulations.simulation_storage, "log_action", mock_log_action)
    
    # Trigger an action
    headers = {"X-Phantom-Key": settings.PHANTOM_MASTER_KEY}
    client.post(f"{settings.API_V1_STR}/simulations/ensemble", 
                json={"target_url": "https://valid-target.com", "num_ghosts": 1, "personas": ["standard"]}, 
                headers=headers)
    
    assert "START_ENSEMBLE" in logs

if __name__ == "__main__":
    print("Executing CTO Forensic Pen-test Substrate...")
    # In a real environment, we'd run: pytest tests/pen_test_substrate.py
