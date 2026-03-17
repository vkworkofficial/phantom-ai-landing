# API Reference Contract

This document acts as the source of truth between the Next.js frontend and the FastAPI orchestration engine.

## Base URL
All internal routing flows through `http://localhost:8000/api/v1` during local dev.

---

## 1. Trigger Simulation

**Endpoint:** `POST /simulations`
**Description:** Dispatches a new swarm of agents against a target URL.

### Request Body
```json
{
  "target_url": "https://example.com/login",
  "num_ghosts": 50,
  "personas": ["Standard User", "Impatient", "Chaos Mode"]
}
```

### Response (200 OK)
```json
{
  "id": "sim-a1b2c3d",
  "url": "https://example.com/login",
  "status": "running",
  "ghosts_deployed": 50,
  "friction_points": [],
  "conversion_blockers": [],
  "confusion_score": 0.0
}
```

---

## 2. Poll Simulation Telemetry

**Endpoint:** `GET /simulations/{id}`
**Description:** Fetches current metrics, logs, and consensus status for a live test.

### Path Parameters
- `id` (string): The UUID returned by the trigger endpoint.

### Response (200 OK)
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
