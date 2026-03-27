import time
from collections import defaultdict
from fastapi import Request
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from app.core.config import settings
from app.core.logging import substrate_logger

class RateLimitMiddleware(BaseHTTPMiddleware):
    """
    Forensic Rate-Limiting Substrate.
    Detects and throttles high-velocity access to the Forensic Engine.
    Proxy-aware via X-Forwarded-For header.
    """
    def __init__(self, app):
        super().__init__(app)
        self.points_map = defaultdict(list)
        self.window = 60  # seconds

    async def dispatch(self, request: Request, call_next):
        # 1. Identify Client Substrate (Proxy-aware)
        forwarded = request.headers.get("X-Forwarded-For")
        if forwarded:
            client_ip = forwarded.split(",")[0].strip()
        else:
            client_ip = request.client.host if request.client else "unknown"

        current_time = time.time()
        
        # 2. Forensic Threshold Check
        limit = settings.RATE_LIMIT
        
        # Prune expired points for this IP
        if client_ip in self.points_map:
            activity = [t for t in self.points_map[client_ip] if t > current_time - self.window]
            if not activity:
                # IMPORTANT: Delete the key if no longer active to prevent memory leak
                del self.points_map[client_ip]
            else:
                self.points_map[client_ip] = activity

        # 3. Frequency Assertion
        if client_ip in self.points_map and len(self.points_map[client_ip]) >= limit:
            substrate_logger.warning(f"Forensic velocity threshold exceeded for IP: {client_ip} (Limit: {limit}/min).")
            return JSONResponse(
                status_code=429,
                content={
                    "detail": "Rate limit exceeded on Forensic Substrate. Please decelerate.",
                    "limit_per_minute": limit,
                    "client_substrate": client_ip
                }
            )

        self.points_map[client_ip].append(current_time)
        return await call_next(request)
