from pydantic import BaseModel
from typing import List, Optional

class CognitiveProfile(BaseModel):
    name: str
    description: str
    patience_score: float  # 0.0 to 1.0 (Higher = more patient)
    technical_literacy: float # 0.0 to 1.0
    mobile_user: bool = False
    frustration_threshold: float = 0.7 
    goals: List[str] = ["checkout", "sign_up"]

# Forensic Persona Library - YC S26 Standard
PERSONA_LIBRARY = {
    "impatient_founder": CognitiveProfile(
        name="The Impatient Founder",
        description="High urgency, low patience for layout shifts or slow LCP.",
        patience_score=0.2,
        technical_literacy=0.8,
        frustration_threshold=0.4,
        goals=["pricing", "demo_request"]
    ),
    "skeptical_engineer": CognitiveProfile(
        name="The Skeptical Engineer",
        description="Scrutinizes documentation and API reliability. Sensitive to hydration lags.",
        patience_score=0.9,
        technical_literacy=1.0,
        frustration_threshold=0.8,
        goals=["docs", "api_reference"]
    ),
    "indiscreet_buyer": CognitiveProfile(
        name="The Indiscreet Buyer",
        description="Focuses on trust signals and security certificates. Easily spooked by 404s.",
        patience_score=0.5,
        technical_literacy=0.4,
        frustration_threshold=0.6,
        goals=["checkout", "security_page"]
    )
}

def get_persona_profile(name: str) -> CognitiveProfile:
    return PERSONA_LIBRARY.get(name, PERSONA_LIBRARY["impatient_founder"])
