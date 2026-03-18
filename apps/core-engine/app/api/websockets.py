import json
import logging
import jwt
from fastapi import APIRouter, WebSocket, WebSocketDisconnect, status, Query
from app.core.config import settings

logger = logging.getLogger(__name__)
router = APIRouter()

class ConnectionManager:
    def __init__(self):
        # Maps sim_id to a list of active WebSockets
        self.active_connections: Dict[str, List[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, sim_id: str):
        await websocket.accept()
        if sim_id not in self.active_connections:
            self.active_connections[sim_id] = []
        self.active_connections[sim_id].append(websocket)
        logger.info(f"WebSocket connected for simulation {sim_id}")

    def disconnect(self, websocket: WebSocket, sim_id: str):
        if sim_id in self.active_connections:
            self.active_connections[sim_id].remove(websocket)
            if not self.active_connections[sim_id]:
                del self.active_connections[sim_id]

    async def broadcast_to_sim(self, sim_id: str, message: dict):
        if sim_id in self.active_connections:
            for connection in self.active_connections[sim_id]:
                try:
                    await connection.send_json(message)
                except Exception as e:
                    logger.error(f"Error sending message to {sim_id}: {e}")

manager = ConnectionManager()

@router.websocket("/simulations/{sim_id}")
async def websocket_endpoint(websocket: WebSocket, sim_id: str, token: str = Query(None)):
    # JWT Authentication Hardening
    if not token:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
        return

    try:
        jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
    except jwt.PyJWTError:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
        return

    await manager.connect(websocket, sim_id)
    
    await manager.connect(websocket, sim_id)
    
    # Simulation is triggered via BackgroundTasks in simulations.py route
    # WebSocket now serves as a live telemetry pipe for the simulation room
    
    try:
        # Keep connection alive
        while True:
            data = await websocket.receive_text()
            # We don't really expect client data, but we listen to keep the socket from closing
    except WebSocketDisconnect:
        manager.disconnect(websocket, sim_id)
        logger.info(f"WebSocket disconnected for simulation {sim_id}")
