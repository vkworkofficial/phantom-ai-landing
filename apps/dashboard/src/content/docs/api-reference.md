# Phantom AI: API Reference (v4.2.0)

The Phantom Core Engine exposes a high-performance orchestration API for synthetic user simulations. All endpoints are secured via JWT and validated against the Immortal Substrate.

## 1. Simulation Orchestration

### `POST /api/simulations/`
Triggers a new Séance via authenticated user session.
- **Request Body**: `SimulationRequest` (Target URL, Personas, Ghosts, A/B Parameters)
- **Response**: `SeanceReport` (Initial tracking state)

### `POST /api/simulations/ensemble`
Headless M2M endpoint for CI/CD integration. Requires `X-Phantom-Key`.
- **Headers**: `X-Phantom-Key: <api_key>`
- **Request Body**: `SimulationRequest`
- **Response**: `SeanceReport`

### `GET /api/simulations/{id}`
Retrieves the real-time or historical state of a Séance.
- **Response**: `SeanceReport` including `telemetry` and `matrix` data.

### `GET /api/simulations/`
Lists all Séances persisted in the Immortal Substrate.

## 2. Public Advocacy & Viral Proof

### `GET /api/simulations/share/{id}`
Public, read-only endpoint for shared reports. No authentication required.
- **Use Case**: Founders sharing PMF validation with investors.

## 3. Real-time Cognitive Stream

### `WS /ws/{sim_id}`
Establishes a WebSocket for live Ghost cognition.
- **Events**:
  - `log`: Raw engine signals.
  - `thought`: Persona-driven cognitive inference (with `aha` flag).
  - `metric_friction`: Live PMF and friction telemetry.

## 4. Models

### `SeanceReport`
```json
{
  "id": "sim-xxxxxx",
  "status": "completed",
  "pmf_score": 0.58,
  "aha_moment_detected": true,
  "telemetry": {
     "matrix": {
       "variant_comparison": { "vA_friction": 0.6, "vB_friction": 0.2 }
     }
  }
}
```
**Description:** Fetches current metrics, logs, and consensus status for a live test.

### Path Parameters
- `id` (string): The UUID returned by the trigger endpoint.

Returns the updated `SeanceReport` model. If the status transitions to `completed` or `failed`, the frontend should stop polling.

```json
{
  "id": "sim-a1b2c3d",
  "url": "https://example.com/login",
  "status": "analyzing",
  "ghosts_deployed": 50,
  "friction_points": [
    {
      "element": "button#submit-payment",
      "issue": "Invisible overlay blocking click events. 42 agents triggered rage-click heuristic."
    }
  ],
  "conversion_blockers": [],
  "confusion_score": 0.92
}
```

## Security Posture
- All `/api/v1/*` endpoints currently lack auth in the local MVP. 
- In production, Next.js Middleware applies a JWT signed by NextAuth to the `Authorization` header of all requests sent to FastAPI.
