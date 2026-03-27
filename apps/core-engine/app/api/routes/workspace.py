from fastapi import APIRouter, Depends
from typing import List
from pydantic import BaseModel
from app.api.deps import get_current_ghost

router = APIRouter()

class APIKeyInfo(BaseModel):
    id: str
    name: str
    key_fragment: str
    last_used: str
    created: str

class WorkspaceInfo(BaseModel):
    id: str
    name: str
    members_count: int
    api_keys: List[APIKeyInfo]

@router.get("/me", response_model=WorkspaceInfo)
async def get_workspace_info(current_user=Depends(get_current_ghost)):
    # In a full multi-tenant system, we'd lookup by current_user.org_id
    # For the YC S26 bootstrap, we utilize the 'Phantom Core' substrate
    org_id = "org-phantom-core"
    
    # Mock data for Phase 4 synchronization (to be replaced by DB queries)
    api_keys = [
        APIKeyInfo(
            id="pk_1", 
            name="Production CI/CD Runner", 
            key_fragment="phantom_live_8f92...", 
            last_used="2 mins ago", 
            created="Oct 12, 2023"
        ),
        APIKeyInfo(
            id="pk_2", 
            name="Local Dev (S6)", 
            key_fragment="phantom_live_c142...", 
            last_used="5 hours ago", 
            created="Nov 01, 2023"
        )
    ]
    
    return WorkspaceInfo(
        id=org_id,
        name="Phantom Core Labs",
        members_count=3,
        api_keys=api_keys
    )

@router.post("/keys")
async def create_api_key(name: str, current_user=Depends(get_current_ghost)):
    # Logic to generate and store a new secure key
    # return {"key": f"phantom_live_{os.urandom(16).hex()}"}
    return {"id": "pk_new", "name": name, "key": "phantom_live_newly_generated_secret_key"}

@router.delete("/keys/{key_id}")
async def revoke_api_key(key_id: str, current_user=Depends(get_current_ghost)):
    # Logic to revoke key from DB
    return {"status": "revoked", "id": key_id}
