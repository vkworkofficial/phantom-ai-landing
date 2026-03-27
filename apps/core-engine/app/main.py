# --- Standard Library ---
import os
import sys
from contextlib import asynccontextmanager
from collections import defaultdict

# --- Third-party ---
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# --- Internal Substrate ---
from app.core.config import settings
from app.core.logging import substrate_logger
from app.api.errors import PhantomBaseException, phantom_exception_handler
from app.services.database import simulation_storage
from app.middleware.security import StrictSecuritySubstrateMiddleware
from app.middleware.rate_limit import RateLimitMiddleware

# Rate Limiting & Security logic has been moved to dedicated middleware files.


def handle_exit(sig, frame):
    """
    Ensures that the Phantom pool is notified of termination to prevent zombie ghosts.
    """
    substrate_logger.warning(f"Intercepted signal {sig}. Terminating Séance Substrate...")
    # In a full impl, we'd trigger self.orchestrator.stop_all() here
    sys.exit(0)

# Register signal handlers globally
# signal.signal(signal.SIGINT, handle_exit)
# signal.signal(signal.SIGTERM, handle_exit)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Bootstrap default organization for early beta/YC demo
    simulation_storage.bootstrap_org("org-phantom-core", "Phantom Core Labs")
    substrate_logger.info(f"{settings.PROJECT_NAME} v{settings.VERSION} initialized and ready for forensic dispatch.")
    yield
    # Shutdown: Cleanup logic here
    substrate_logger.info("Deactivating Séance Substrate...")

app = FastAPI(
    title="Phantom AI: Forensic Substrate (Core Engine)",
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    description="The high-fidelity behavioral simulation and forensic analysis substrate for YC S26.",
    lifespan=lifespan
)

# Initialize Rate Limit State Substrate
app.state.rate_limit_points = defaultdict(list)

# Register Forensic Exception Substrate
app.add_exception_handler(PhantomBaseException, phantom_exception_handler)

# CORS Middleware Configuration (SOC 2 aligned)
# Added early to ensure preflight requests are caught before other logic
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_origin_regex=r"^https://.*\.vercel\.app$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rate Limiting & Security Substrate
app.add_middleware(StrictSecuritySubstrateMiddleware)
app.add_middleware(RateLimitMiddleware)

@app.get("/health")
def health_check():
    return {"status": "ok", "service": settings.PROJECT_NAME}

from app.api.routes import simulations, workspace, reports  # noqa: E402
from app.api import websockets  # noqa: E402

app.include_router(
    simulations.router, 
    prefix=f"{settings.API_V1_STR}/simulations", 
    tags=["simulations"]
)
app.include_router(
    reports.router, 
    prefix=f"{settings.API_V1_STR}/reports", 
    tags=["reports"]
)
app.include_router(
    workspace.router, 
    prefix=f"{settings.API_V1_STR}/workspace", 
    tags=["workspace"]
)
app.include_router(
    websockets.router, 
    prefix=f"{settings.API_V1_STR}/ws", 
    tags=["websockets"]
)
