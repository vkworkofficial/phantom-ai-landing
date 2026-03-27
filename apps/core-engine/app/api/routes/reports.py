from fastapi import APIRouter, HTTPException, Response
from app.services.database import simulation_storage
from app.services.reporting import forensic_reporter
from app.core.logging import substrate_logger

router = APIRouter()

@router.get("/{sim_id}/report")
async def get_simulation_report(
    sim_id: str,
    # current_ghost: str = Depends(get_current_ghost) # Optional: enable auth if needed
):
    """
    Retrieves a cached simulation and generates a Forensic PDF Report on the fly.
    """
    substrate_logger.info(f"Generating Forensic Report for Simulation: {sim_id}")
    
    report = simulation_storage.get_report(sim_id)
    if not report:
        substrate_logger.error(f"Simulation {sim_id} not found in substrate.")
        raise HTTPException(status_code=404, detail="Simulation not found in forensic records.")

    # Security Audit: Log report generation/access
    simulation_storage.log_action(
        action="DOWNLOAD_REPORT",
        actor_id="guest", # Or ghost ID if authenticated
        resource_id=sim_id,
        status="success"
    )

    try:
        pdf_buffer = forensic_reporter.generate(report)
        return Response(
            content=pdf_buffer.getvalue(),
            media_type="application/pdf",
            headers={
                "Content-Disposition": f"attachment; filename=Phantom_Forensic_{sim_id}.pdf"
            }
        )
    except Exception as e:
        substrate_logger.error(f"Failed to generate forensic report: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal substrate error during report generation.")
