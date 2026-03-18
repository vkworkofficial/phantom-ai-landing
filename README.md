# Phantom AI: Load Testing for Human Behavior

> **The first Synthetic Reality substrate. Simulate thousands of autonomous AI personas to find Product-Market Fit velocity before your first user signup.**

Phantom isn't a QA tool. It's an **Empathy Substrate**. It injects high-fidelity, cognitive AI "Ghosts" into your application to identify exactly where users get confused, drop off, or rage-click—generating a mathematical "Sean Ellis" PMF score *before* you launch.

---

## 🦾 The Vision: Empathy at Scale
Phantom allows founders to bypass the "Beta Testing Death Spiral." 
- **Cognitive Heatmapping**: See exactly where agents "lose the scent" of your value proposition.
- **PMF Readiness Matrix**: A proprietary multi-agent consensus model that predicts retention vs. friction.
- **A/B Strain Analysis**: Compare variants based on *synthetic user frustration* rather than just CTR.

---

## 🏛 Substrate Architecture (Monorepo)

Phantom is built as a hardened, scalable monorepo:

- **`apps/dashboard`**: The Command Center. Built with Next.js, TailwindCSS (V4), and Framer Motion. Handles live telemetry visualization and séance orchestration.
- **`apps/core-engine`**: The Orchestration Substrate. Built with FastAPI and Python. Manages asynchronous LLM cognitive inference loops and Ghost deployment.
- **`docs`**: Technical whitepapers on multi-agent consensus and cognitive behavioral heuristics.
- **`infra`**: IaC for Vercel and Cloud Run/Docker deployments.

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
- **[Brand Bible](./docs/brand-bible.md)**: Logic on "Synthetic Reality" positioning.
- **[Architecture](./docs/architecture.md)**: Deep dive into the Cognitive Event Substrate.
- **[API Contract](./docs/api-reference.md)**: Node-to-Ghost telemetry specifications.

## 🚀 The Path to Series A
1. **[Q3] Recursive UX**: Agents that automatically fix UI bugs via GitHub PRs.
2. **[Q4] The Global Latency Shadow**: Simulate geographically-aware cognitive delay.
3. **[Future] The Sovereign Substrate**: 1M+ agents behaving as a decentralized prediction market for UX.
