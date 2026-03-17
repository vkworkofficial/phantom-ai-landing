from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "Phantom Core Engine"
    VERSION: str = "0.1.0"
    API_V1_STR: str = "/api/v1"
    
    # Database
    DATABASE_URL: str = ""
    
    # Auth
    SECRET_KEY: str = ""
    SUPABASE_URL: str = ""
    SUPABASE_KEY: str = ""
    
    # AI Platform
    OPENAI_API_KEY: str = ""
    PLAYWRIGHT_WS_ENDPOINT: str = ""
    
    # Billing
    STRIPE_API_KEY: str = ""
    
    model_config = SettingsConfigDict(case_sensitive=True, env_file=".env")

settings = Settings()
