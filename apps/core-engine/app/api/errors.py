from fastapi import Request
from fastapi.responses import JSONResponse
from typing import Any, Dict, Optional

class PhantomBaseException(Exception):
    """Base exception for all Phantom Substrate errors."""
    def __init__(self, message: str, forensic_data: Optional[Dict[str, Any]] = None, status_code: int = 400):
        self.message = message
        self.forensic_data = forensic_data or {}
        self.status_code = status_code
        super().__init__(self.message)

class SimulationError(PhantomBaseException):
    """Raised when a simulation fails to initialize or execute."""
    def __init__(self, message: str, simulation_id: str, forensic_data: Optional[Dict[str, Any]] = None):
        data = forensic_data or {}
        data["simulation_id"] = simulation_id
        super().__init__(message, data, status_code=500)

class AuthenticationError(PhantomBaseException):
    """Raised during workspace or M2M authentication failures."""
    def __init__(self, message: str):
        super().__init__(message, status_code=401)

async def phantom_exception_handler(request: Request, exc: PhantomBaseException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": exc.__class__.__name__,
            "message": exc.message,
            "forensic_payload": exc.forensic_data,
            "trace_id": request.headers.get("X-Phantom-Trace-Id", "not-available")
        }
    )
