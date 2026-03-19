from fastapi.security import OAuth2PasswordBearer, APIKeyHeader
import jwt
from app.core.config import settings

api_key_header = APIKeyHeader(name="X-Phantom-Key", auto_error=False)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token", auto_error=False)

def get_api_key(api_key: str = Depends(api_key_header)):
    """
    Validates the X-Phantom-Key header for machine-to-machine (M2M) interaction.
    """
    if not api_key:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Forensic Key missing. Access denied to the Substrate.",
        )
    
    # In a full impl, we'd check against a DB of hashed keys.
    # For MVP/YC standards, we check against an environment-defined master key.
    if api_key != settings.SECRET_KEY: 
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid Forensic Key. Authentication failure.",
        )
    return api_key

def get_current_ghost(token: str = Depends(oauth2_scheme)):
    """
    Validates the bearer token against the SECRET_KEY.
    In a full production environment, this would verify against Supabase or a DB.
    For this 'Hardening' phase, it ensures that an Authorization header is present and valid.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials - Séance unauthorized.",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    if not token:
        # For development/demo purposes, we might allow bypass IF specific env is set, 
        # but for hardening, we default to block.
        raise credentials_exception

    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        return payload
    except jwt.PyJWTError:
        raise credentials_exception
