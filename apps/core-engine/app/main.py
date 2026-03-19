import time
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.deps import get_current_ghost
from fastapi import Depends
from collections import defaultdict

from app.services.database import simulation_storage

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

@app.on_event("startup")
async def startup_event():
    # Bootstrap default organization for early beta/YC demo
    simulation_storage.bootstrap_org("org-phantom-core", "Phantom Core")
    print("[substrate] Default Organization 'Phantom Core' initialized.")

import signal
import sys

def handle_exit(sig, frame):
    """
    Ensures that the Phantom pool is notified of termination to prevent zombie ghosts.
    """
    print(f"\n[sys] Intercepted signal {sig}. Terminating Séance Substrate...")
    # In a full impl, we'd trigger self.orchestrator.stop_all() here
    sys.exit(0)

signal.signal(signal.SIGINT, handle_exit)
signal.signal(signal.SIGTERM, handle_exit)


# Custom IP-based Rate Limiter (5 requests per minute)
class RateLimiterMiddleware:
    def __init__(self):
        self.ip_data = defaultdict(list)
        self.rate_limit = 5
        self.time_window = 60

    async def __call__(self, request: Request, call_next):
        client_ip = request.client.host
        now = time.time()
        
        # Clean old requests
        self.ip_data[client_ip] = [ts for ts in self.ip_data[client_ip] if now - ts < self.time_window]
        
        # Only limit simulation deployments, ignore static or WS loops
        if request.url.path.startswith(f"{settings.API_V1_STR}/simulations") and request.method == "POST":
            if len(self.ip_data[client_ip]) >= self.rate_limit:
                return JSONResponse(status_code=429, content={"detail": "Too Many Requests. Max 5 simulations per minute."})
            self.ip_data[client_ip].append(now)
            
        return await call_next(request)

app.middleware("http")(RateLimiterMiddleware())

# Set CORS enabled origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://tryphantom.dev",
    ],
    allow_origin_regex=r"^https://.*\.vercel\.app$",
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/health")
def health_check():
    return {"status": "ok", "service": settings.PROJECT_NAME}

from app.api.routes import simulations
from app.api import websockets

app.include_router(
    simulations.router, 
    prefix=f"{settings.API_V1_STR}/simulations", 
    tags=["simulations"],
    dependencies=[Depends(get_current_ghost)]
)
app.include_router(
    websockets.router, 
    prefix=f"{settings.API_V1_STR}/ws", 
    tags=["websockets"]
)
