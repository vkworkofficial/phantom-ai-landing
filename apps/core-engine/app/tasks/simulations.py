from .celery_app import celery_app
from app.engine.orchestrator import HauntOrchestrator
import asyncio

@celery_app.task(name="phantom.deploy_seance")
def deploy_seance_task(target_url: str, num_ghosts: int, personas: list, organization_id: str = None, 
                        industry: str = None, primary_goal: str = None, 
                        variant_url: str = None, is_ab_test: bool = False, sim_id: str = None):
    """
    Celery worker task for deploying a high-concurrency séance.
    Wrapping the async orchestrator in a thread loop for Celery compatibility.
    """
    orchestrator = HauntOrchestrator(
        target_url=target_url,
        num_ghosts=num_ghosts,
        personas=personas,
        organization_id=organization_id,
        industry=industry,
        primary_goal=primary_goal,
        variant_url=variant_url,
        is_ab_test=is_ab_test
    )
    if sim_id:
        orchestrator.sim_id = sim_id
        
    # Run the async orchestrator loop
    loop = asyncio.get_event_loop()
    report = loop.run_until_complete(orchestrator.run_simulation())
    
    return {
        "status": "completed",
        "sim_id": report.id,
        "pmf_score": report.pmf_score
    }
