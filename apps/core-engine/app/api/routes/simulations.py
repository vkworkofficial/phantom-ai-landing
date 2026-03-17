from fastapi import APIRouter, HTTPException, BackgroundTasks
from app.models.simulation import SimulationRequest, SeanceReport
from app.engine.orchestrator import HauntOrchestrator

from typing import List, Optional
from datetime import datetime, timezone
import uuid

router = APIRouter()

from app.services.database import simulation_storage

@router.get("/", response_model=List[SeanceReport])
async def list_simulations():
    return list(simulation_storage.list_reports().values())

@router.post("/", response_model=SeanceReport)
async def start_simulation(request: SimulationRequest, background_tasks: BackgroundTasks):
    sim_id = f"sim-{uuid.uuid4().hex[:6]}"
    
    # Store mock state
    report = SeanceReport(
        id=sim_id,
        target_url=request.target_url,
        status="running",
        ghosts_deployed=request.num_ghosts,
        friction_points=[],
        conversion_blockers=[],
        confusion_score=0.0,
        created_at=datetime.now(timezone.utc)
    )
    simulation_storage.save_report(report)
    
    # Generate a temporary token for the WebSocket connection
    import jwt
    from app.core.config import settings
    token = jwt.encode({"sub": sim_id, "type": "seance_telemetry"}, settings.SECRET_KEY, algorithm="HS256")
    
    # Store token in report temporarily (for frontend pickup)
    report.seance_token = token
    
    # Fire the orchestrator in the background
    orchestrator = HauntOrchestrator(
        target_url=str(request.target_url), 
        num_ghosts=request.num_ghosts, 
        personas=request.personas,
        industry=request.industry,
        primary_goal=request.primary_goal,
        variant_url=str(request.variant_url) if request.variant_url else None,
        is_ab_test=request.is_ab_test
    )
    # Set the same sim_id so orchestrator broadcasts to the correct room
    orchestrator.sim_id = sim_id
    background_tasks.add_task(orchestrator.run_simulation)
    
    return report

@router.get("/{sim_id}", response_model=SeanceReport)
async def get_simulation_status(sim_id: str):
    report = simulation_storage.get_report(sim_id)
    if report:
        return report
    
    # Fallback to a mock completed response if unknown (to support frontend dummy URLs)
    return SeanceReport(
        id=sim_id,
        target_url="https://demo.tryphantom.dev",
        status="completed",
        ghosts_deployed=50,
        friction_points=[{"element": "#btn", "issue": "Missing contrast"}],
        conversion_blockers=[],
        confusion_score=0.8,
        created_at=datetime.now()
    )

@router.get("/share/{sim_id}", response_model=SeanceReport)
async def get_public_report(sim_id: str):
    """
    Public, read-only endpoint for sharing PMF Readiness.
    """
    report = simulation_storage.get_report(sim_id)
    if not report:
        raise HTTPException(status_code=404, detail="Seance report not found or expired.")
    
    return report
