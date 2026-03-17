from pydantic import BaseModel, Field
from typing import Optional

class PersonaRazor(BaseModel):
    """Granular demographic and behavioral metadata for a synthetic ghost."""
    age_range: str = Field(..., description="e.g., '18-24', '45-54', '65+'")
    country: str = Field(..., description="ISO 3166-1 alpha-2 code or full name")
    tech_savviness: int = Field(50, ge=0, le=100, description="0 (Novice) to 100 (Expert)")
    patience_level: float = Field(0.5, ge=0.0, le=1.0, description="0.0 (Impatience/Chaos) to 1.0 (Methodical)")
    device_preference: str = Field("desktop", description="'desktop', 'mobile', or 'tablet'")
    
    class Config:
        json_schema_extra = {
            "example": {
                "age_range": "25-34",
                "country": "US",
                "tech_savviness": 85,
                "patience_level": 0.3,
                "device_preference": "mobile"
            }
        }
