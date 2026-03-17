from pydantic import BaseModel, HttpUrl
from typing import List, Optional
from datetime import datetime

class SimulationRequest(BaseModel):
    url: HttpUrl
    num_ghosts: int = 100
    personas: List[str] = ["first_time_visitor", "developer", "skeptic"]

class NodeTelemetry(BaseModel):
    id: str
    region: str
    v8_heap_usage_mb: float
    dom_nodes_parsed: int
    proxy_rotations: int
    headless_flags: List[str]

class SystemTelemetry(BaseModel):
    chromium_version: str
    active_workers: int
    nodes: List[NodeTelemetry]

class GhostActivity(BaseModel):
    timestamp: datetime
    action: str
    element: str
    success: bool
    friction_score: float

class SeanceReport(BaseModel):
    id: str
    url: HttpUrl
    status: str
    ghosts_deployed: int
    friction_points: List[dict]
    conversion_blockers: List[dict]
    confusion_score: float
    telemetry: Optional[SystemTelemetry] = None
    created_at: datetime

