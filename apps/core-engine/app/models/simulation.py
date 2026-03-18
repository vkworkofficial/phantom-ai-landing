from pydantic import BaseModel, HttpUrl
from typing import List, Optional, Union
from .persona import PersonaRazor
from datetime import datetime

class HeatmapPoint(BaseModel):
    x: float
    y: float
    intensity: float = 1.0
    label: Optional[str] = None

class SimulationRequest(BaseModel):
    target_url: HttpUrl
    num_ghosts: int = 100
    personas: List[Union[str, PersonaRazor]] = ["standard_user"]
    industry: Optional[str] = None
    primary_goal: Optional[str] = None
    variant_url: Optional[HttpUrl] = None
    is_ab_test: bool = False

class NodeTelemetry(BaseModel):
    id: str
    region: str
    v8_heap_usage_mb: float
    dom_nodes_parsed: int
    proxy_rotations: int
    headless_flags: List[str]
    # Synthetic Reality Metrics
    scan_path_entropy: float = 0.0
    cognitive_load: float = 0.0
    frustration_index: float = 0.0
    engagement_velocity: float = 0.0

class GranularMatrix(BaseModel):
    """Aggregated behavioral analytics across the entire seance."""
    avg_scan_path_entropy: float
    avg_cognitive_load: float
    peak_frustration: float
    median_engagement: float
    anomalies_detected: int
    pmf_score: float = 0.0  # Sean Ellis % (Very Disappointed)
    aha_moment_detected: bool = False
    variant_comparison: Optional[dict] = None  # Metrics map if is_ab_test

class SystemTelemetry(BaseModel):
    chromium_version: str
    active_workers: int
    nodes: List[NodeTelemetry]
    matrix: Optional[GranularMatrix] = None

class GhostActivity(BaseModel):
    timestamp: datetime
    action: str
    element: str
    success: bool
    friction_score: float
    position: Optional[HeatmapPoint] = None

class SeanceReport(BaseModel):
    id: str
    target_url: HttpUrl
    status: str
    ghosts_deployed: int
    friction_points: List[dict]
    conversion_blockers: List[dict]
    confusion_score: float
    telemetry: Optional[SystemTelemetry] = None
    heatmap_data: List[HeatmapPoint] = []
    created_at: datetime
    seance_token: Optional[str] = None
    # Persisted metadata for session recovery
    personas: Optional[List[Union[str, PersonaRazor]]] = None
    industry: Optional[str] = None
    primary_goal: Optional[str] = None

