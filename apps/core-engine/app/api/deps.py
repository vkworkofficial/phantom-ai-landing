from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, APIKeyHeader
import jwt
from typing import Optional
from app.core.config import settings

api_key_header = APIKeyHeader(name="X-Phantom-Key", auto_error=False)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token", auto_error=False)

def get_forensic_auth(
    api_key: Optional[str] = Depends(api_key_header),
    token: Optional[str] = Depends(oauth2_scheme)
):
    """
    Forensic Auth Substrate: Allows EITHER a Master API Key (M2M) OR a JWT (Workspace).
    """
    if api_key:
        if api_key == settings.PHANTOM_MASTER_KEY:
            return {"type": "m2m", "id": "master"}
        raise HTTPException(status_code=403, detail="Invalid Forensic Key.")
    
    if token:
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            return {"type": "user", "id": payload.get("sub"), "data": payload}
        except jwt.PyJWTError:
            raise HTTPException(status_code=401, detail="Invalid Séance Token.")

    raise HTTPException(status_code=401, detail="Authentication required. No substrate key or token found.")

def get_current_ghost(auth = Depends(get_forensic_auth)):
    return auth
