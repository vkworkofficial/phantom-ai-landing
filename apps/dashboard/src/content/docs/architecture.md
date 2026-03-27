# Phantom AI: Architecture & Technical Substrate

## System Overview
Phantom is a distributed forensic engine composed of three primary layers:
1. **The Forensic Tracer (@phantom-labs/substrate)**: Client-side SDK for sub-millisecond event capture and rage-click detection.
2. **The Core Engine (Python/FastAPI)**: Headless browser orchestrator (Playwright) and behavior analysis engine.
3. **The Simulation Dashboard (Next.js)**: Management console for deploying ghosts and analyzing Human Friction Index (HFX).

## Data Flow
1. Developer installs `@phantom-labs/substrate`.
2. Tracer captures DOM mutations and behavioral signals.
3. Core Engine consumes signals to train "Ghost" models for 1:1 human equivalence.
4. Dashboard visualizes friction points.

## Security Posture
- SOC 2 compliant logging.
- JWT-based forensic provenance.
- Strict CSP and HSTS policies on all endpoints.

---
*Status: v4.3-hardened Documentation*
