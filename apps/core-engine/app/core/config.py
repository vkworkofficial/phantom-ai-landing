from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "Phantom Core Engine"
    VERSION: str = "0.1.0"
    API_V1_STR: str = "/api/v1"
    
    # Database (Production Data Substrate)
    DATABASE_URL: str = ""
    DATABASE_SSL: bool = True

    # Auth & Platform
    SECRET_KEY: str = "phantom_substrate_default_secret_32chars"
    SUPABASE_URL: str = ""
    SUPABASE_KEY: str = ""
    
    # AI Platform (Forensic Brains)
    OPENAI_API_KEY: str = ""
    ANTHROPIC_API_KEY: str = ""
    PLAYWRIGHT_WS_ENDPOINT: str = ""
    
    # Billing
    STRIPE_API_KEY: str = ""

    # Substrate Rate Limits
    RATE_LIMIT: int = 100

    # Forensic Security Substrate
    PHANTOM_MASTER_KEY: str = "phantom_master_forensic_key"
    SECURITY_AUDIT_LOGS_ENABLED: bool = True

    # CORS (tighten for production)
    ALLOWED_ORIGINS: list[str] = ["http://localhost:3000", "https://tryphantom.dev", "https://frontend-pi-wine-58.vercel.app"]

    # Observability
    LOG_LEVEL: str = "INFO"

    # Notion Integration
    NOTION_TOKEN: str = ""
    NOTION_PARENT_PAGE_ID: str = ""
    
    # Name.com Integrated Substrate
    NAMECOM_USERNAME: str = ""
    NAMECOM_TOKEN: str = ""
    
    model_config = SettingsConfigDict(case_sensitive=True, env_file=".env", extra="ignore")

settings = Settings()
