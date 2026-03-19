import uuid
import jwt
import logging
from typing import List, Optional
from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException, BackgroundTasks, Depends
from app.models.simulation import SimulationRequest, SeanceReport
from app.engine.orchestrator import HauntOrchestrator
from app.services.database import simulation_storage
from app.core.config import settings
from app.api.deps import get_current_ghost
from app.services.case_studies import case_story_generator

# Structured Forensic Logging
logger = logging.getLogger("phantom.forensics")
router = APIRouter()

@router.post("/ensemble", response_model=SeanceReport)
async def start_ensemble(
    request: SimulationRequest, 
    background_tasks: BackgroundTasks,
    auth: dict = Depends(get_current_ghost)
):
    """
    Headless M2M endpoint for CI/CD integration.
    """
    sim_id = f"ens-{uuid.uuid4().hex[:10]}"
    logger.info(f"Initiating Headless Ensemble {sim_id} for target: {request.target_url}")
    
    report = SeanceReport(
        id=sim_id,
        organization_id=request.organization_id or "org-headless",
        target_url=request.target_url,
        status="running",
        ghosts_deployed=request.num_ghosts,
        friction_points=[],
        conversion_blockers=[],
        confusion_score=0.0,
        created_at=datetime.now(timezone.utc),
        personas=request.personas,
        industry=request.industry,
        primary_goal=request.primary_goal
    )
    simulation_storage.save_report(report)
    
    # Security Audit: Log the initiation of a headless ensemble
    simulation_storage.log_action(
        action="START_ENSEMBLE",
        actor_id=auth["id"],
        resource_id=sim_id,
        status="success"
    )
    
    orchestrator = HauntOrchestrator(
        target_url=str(request.target_url), 
        num_ghosts=request.num_ghosts, 
        personas=request.personas,
        organization_id=report.organization_id,
        industry=request.industry,
        primary_goal=request.primary_goal
    )
    orchestrator.sim_id = sim_id
    background_tasks.add_task(orchestrator.run_simulation)
    
    return report

@router.get("/", response_model=List[SeanceReport])
async def list_simulations():
    return list(simulation_storage.list_reports().values())

@router.post("/", response_model=SeanceReport)
async def start_simulation(request: SimulationRequest, background_tasks: BackgroundTasks):
    sim_id = f"sim-{uuid.uuid4().hex[:8]}"
    logger.info(f"Initiating Séance {sim_id} for target: {request.target_url}")
    
    # Initialize the high-fidelity report substrate
    report = SeanceReport(
        id=sim_id,
        organization_id=request.organization_id,
        target_url=request.target_url,
        status="running",
        ghosts_deployed=request.num_ghosts,
        friction_points=[],
        conversion_blockers=[],
        confusion_score=0.0,
        created_at=datetime.now(timezone.utc),
        personas=request.personas,
        industry=request.industry,
        primary_goal=request.primary_goal
    )
    simulation_storage.save_report(report)
    
    # Generate telemetry authorization token
    # Forensic context is baked into the JWT for WebSocket provenance
    token = jwt.encode(
        {"sub": sim_id, "type": "seance_telemetry", "iat": datetime.now(timezone.utc)}, 
        settings.SECRET_KEY, 
        algorithm="HS256"
    )
    report.seance_token = token
    
    # Delegate to the Orchestrator with background task execution.
    # Non-blocking IO ensures the API responds with sub-100ms latency.
    orchestrator = HauntOrchestrator(
        target_url=str(request.target_url), 
        num_ghosts=request.num_ghosts, 
        personas=request.personas,
        organization_id=request.organization_id,
        industry=request.industry,
        primary_goal=request.primary_goal,
        variant_url=str(request.variant_url) if request.variant_url else None,
        is_ab_test=request.is_ab_test
    )
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
