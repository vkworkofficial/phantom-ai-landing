from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi.responses import JSONResponse
import logging

logger = logging.getLogger("phantom.security")

class StrictSecuritySubstrateMiddleware(BaseHTTPMiddleware):
    """
    Enterprise-grade security middleware for the Phantom Substrate.
    Optimized for YC S26 compliance targets.
    """
    async def dispatch(self, request: Request, call_next):
        # 1. Inject Hardened Forensic Headers
        response = await call_next(request)
        
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
        
        # 2. Block Legacy Browser User-Agents (Forensic filtering)
        ua = request.headers.get("user-agent", "")
        if "MSIE" in ua or "Trident" in ua:
             return JSONResponse(
                 status_code=403,
                 content={"detail": "Incompatible client substrate. Please use a modern evergreen browser."}
             )

        return response
