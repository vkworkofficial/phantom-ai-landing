from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "Phantom Core Engine"
    VERSION: str = "0.1.0"
    API_V1_STR: str = "/api/v1"
    
    # Database
    DATABASE_URL: str = ""
    
    # Production Data Substrate
    DATABASE_SSL: bool = True
    DATABASE_URL: str = ""

    # Auth & Platform
    SECRET_KEY: str = "phantom_substrate_default_secret_32chars"
    SUPABASE_URL: str = ""
    SUPABASE_KEY: str = ""
    
    # AI Platform (Forensic Brains)
    OPENAI_API_KEY: str = ""
    GEMINI_API_KEY: str = ""
    PLAYWRIGHT_WS_ENDPOINT: str = ""
    
    # Billing
    STRIPE_API_KEY: str = ""

    # Substrate Rate Limits
    RATE_LIMIT: int = 100

    # Forensic Security Substrate
    PHANTOM_MASTER_KEY: str = "phantom_master_forensic_key"
    SECURITY_AUDIT_LOGS_ENABLED: bool = True
    
    model_config = SettingsConfigDict(case_sensitive=True, env_file=".env")

settings = Settings()
