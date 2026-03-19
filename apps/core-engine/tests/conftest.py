import pytest
from fastapi.testclient import TestClient
from app.main import app

@pytest.fixture
def client():
    return TestClient(app)

@pytest.fixture(autouse=True)
def set_test_settings():
    from app.core.config import settings
    # Set a low limit for tests to verify blocking behavior quickly
    original_limit = settings.RATE_LIMIT
    settings.RATE_LIMIT = 5
    yield
    settings.RATE_LIMIT = original_limit

@pytest.fixture(autouse=True)
def reset_rate_limiter_points():
    from app.main import app
    if hasattr(app.state, 'rate_limit_points'):
        app.state.rate_limit_points.clear()
