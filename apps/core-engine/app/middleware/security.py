from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi.responses import JSONResponse
import logging

logger = logging.getLogger("phantom.security")

class StrictSecuritySubstrateMiddleware(BaseHTTPMiddleware):
    """
    Enterprise-grade security middleware for the Phantom Substrate.
    SOC 2 Type II compliant header injection and client validation.
    """
    async def dispatch(self, request: Request, call_next):
        # 1. Block Legacy Browser User-Agents BEFORE processing (security gate)
        ua = request.headers.get("user-agent", "")
        if "MSIE" in ua or "Trident" in ua:
             return JSONResponse(
                 status_code=403,
                 content={"detail": "Incompatible client substrate. Please use a modern evergreen browser."}
             )

        # 2. Process request
        response = await call_next(request)
        
        # 3. Inject Hardened Forensic Headers (SOC 2 aligned)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=(), payment=()"
        response.headers["X-Permitted-Cross-Domain-Policies"] = "none"
        response.headers["X-Phantom-Substrate"] = "v4.3-hardened"

        return response
