from fastapi import APIRouter, HTTPException, BackgroundTasks
from app.models.simulation import SimulationRequest, SeanceReport
from app.engine.orchestrator import HauntOrchestrator

from typing import List, Optional
import uuid

router = APIRouter()

# Placeholder mock state
simulations_db = {}

@router.post("/", response_model=SeanceReport)
async def start_simulation(request: SimulationRequest, background_tasks: BackgroundTasks):
    sim_id = f"sim-{uuid.uuid4().hex[:6]}"
    
    # Store mock state
    report = SeanceReport(
        id=sim_id,
        url=request.target_url,
        status="running",
        ghosts_deployed=request.num_ghosts,
        friction_points=[],
        conversion_blockers=[],
        confusion_score=0.0
    )
    simulations_db[sim_id] = report
    
    # Normally we'd fire the orchestrator in the background here
    # orchestrator = HauntOrchestrator(request.target_url, request.num_ghosts, request.personas)
    # background_tasks.add_task(orchestrator.run_simulation)
    
    return report

@router.get("/{sim_id}", response_model=SeanceReport)
async def get_simulation_status(sim_id: str):
    if sim_id in simulations_db:
        return simulations_db[sim_id]
    
    # Fallback to a mock completed response if unknown (to support frontend dummy URLs)
    return SeanceReport(
        id=sim_id,
        url="https://demo.tryphantom.dev",
        status="completed",
        ghosts_deployed=50,
        friction_points=[{"element": "#btn", "issue": "Missing contrast"}],
        conversion_blockers=[],
        confusion_score=0.8
    )
