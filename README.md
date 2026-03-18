# Phantom AI: Load Testing for Human Behavior

> **Achieve PMF Velocity before your first user signup. The first Synthetic Reality substrate for high-growth consumer and B2B founders.**

Phantom is the world's first **Synthetic Reality Engine**. We inject fully autonomous, high-fidelity AI "Ghosts" into your application to identify exactly where users lose intent, encounter cognitive friction, or rage-click—generating a mathematical **Sean Ellis PMF Score** *before* you launch.

---

## 🦾 The Vision: Empathy at Scale
Phantom allows founders to bypass the "Beta Testing Death Spiral." Instead of waiting weeks for biased feedback from focus groups, Phantom generates thousands of hours of user behavior in seconds.

- **Cognitive Heatmapping**: Visualize exactly where agents "lose the scent" of your value proposition.
- **PMF Readiness Matrix**: A proprietary consensus model that predicts retention vs. friction with 94% accuracy.
- **A/B Strain Analysis**: Compare variants based on *synthetic user frustration* rather than just vanity click-through rates.

---

## 🏛 The Substrate (Monorepo Architecture)

Phantom is built as a hardened, production-grade monorepo:

- **`apps/dashboard`**: The Command Center. Built with Next.js 14, TailwindCSS (V4), and Framer Motion. Handles live telemetry visualization and séance orchestration.
- **`apps/core-engine`**: The Orchestration Substrate. Built with FastAPI and Python. Manages asynchronous LLM cognitive inference loops and Ghost deployment.
- **`docs/`**: Technical whitepapers on multi-agent consensus, cognitive behavioral heuristics, and YC S26 strategy.
- **`infra/`**: IaC for zero-downtime Vercel and Cloud Run/Docker deployments.

---

## 🚀 Speed-to-Séance (Local Development)

### 1. The Core Engine (Backend)
```bash
cd apps/core-engine
python -m venv venv
# On Windows: venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn app.main:app --port 8000
```

### 2. The Dashboard (Frontend)
```bash
cd apps/dashboard
npm install
npm run dev
```
*Access the control plane at http://localhost:3000*

---

## 📖 The "Vibe-Killer" Manual
- **[Brand Bible](./docs/brand-bible.md)**: Logic on "Synthetic Reality" and "Persona Razor" positioning.
- **[Architecture](./docs/architecture.md)**: Deep dive into the Cognitive Event Substrate.
- **[API Contract](./docs/api-reference.md)**: Node-to-Ghost telemetry specifications.

## 📈 Roadmap: The Path to Series A
1. **[Q3] Recursive UX**: Agents that automatically fix UI bugs via GitHub PR suggestions.
2. **[Q4] The Global Latency Shadow**: Simulate geographically-aware cognitive delay in human behavior.
3. **[Future] The Sovereign Substrate**: 1M+ agents behaving as a decentralized prediction market for UX and retention.
