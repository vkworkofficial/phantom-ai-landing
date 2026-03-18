# Phantom AI: Infrastructure for Human Behavior Simulation

Phantom provides the technical substrate for simulating autonomous, high-fidelity AI personas within a controlled environment. By injecting cognitive "Ghosts" into a target application, founders and engineers can identify UX friction, retention blockers, and conversion anomalies before the first real user signup.

## The Problem: The Beta Testing Death Spiral
Traditional feedback loops—focus groups, beta tests, and manual QA—are too slow, biased, and cost-prohibitive for high-velocity startups. Launching without behavior-driven validation leads to high churn and wasted engineering cycles.

## The Solution: Synthetic Reality
Phantom creates a deterministic simulation environment where multi-agent consensus models predict user behavior with high statistical accuracy.

- **Cognitive Event Capture**: Real-time telemetry monitoring of synthetic agent interactions.
- **PMF Readiness Scoring**: Heuristic-based evaluation of product-market fit velocity.
- **A/B Behavior Analysis**: Side-by-side comparison of product variants based on synthetic friction.

---

## Technical Architecture

Phantom is organized as a scalable monorepo for maximum engineering discipline:

### apps/dashboard
The centralized command plane for simulation orchestration and telemetry visualization.
- **Stack**: Next.js, Framer Motion, Tailwind (V4), Lucide.
- **Core Logic**: Live WebSocket telemetry pipes and Séance lifecycle management.

### apps/core-engine
The orchestration engine responsible for cognitive agent inference and browser deployment.
- **Stack**: FastAPI (Python), Playwright, Google Gemini Pro.
- **Core Logic**: Heuristic analysis loops, multi-agent consensus, and session persistence.

---

## Getting Started

### Local Engine Setup
```bash
cd apps/core-engine
python -m venv venv
# Windows: venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn app.main:app --port 8000
```

### Local Dashboard Setup
```bash
cd apps/dashboard
npm install
npm run dev
```

---

## Technical Documentation
Detailed specifications for the simulation protocols and multi-agent consensus can be found in the following locations:
- **Architecture Overview**: `docs/architecture.md`
- **Simulation Protocols**: `docs/api-reference.md`
- **Cognitive Heuristics**: `docs/heuristics.md`

## Engineering Roadmap
- **Q3**: Automated UI remediation via agent-driven pull requests.
- **Q4**: Geographically-distributed latency simulation for edge behavior analysis.
- **Future**: Massive multi-cloud ghost deployment for 1M+ parallel behavior simulations.
