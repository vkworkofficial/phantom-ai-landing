# Phantom AI : The Infrastructure for PMF Velocity

> **Simulate your true Target Group (B2B & B2C) at the speed of software. Evolve past basic load testing into cognitive UX evaluation.**

For high-velocity startups, achieving Product-Market Fit (PMF) is a race against time, but the traditional feedback loops are fundamentally broken:
- **Scripts lack empathy:** Puppeteer/Selenium load tests ensure the server doesn't crash, but they cannot tell you if a distracted VP of Sales will actually understand your new B2B dashboard.
- **Humans are too slow (and expensive):** Recruiting Gen-Z teenagers for a B2C beta test or paying $10,000 for a B2B focus group takes weeks. 
- **The Result:** Founders launch blind. They ship features riddled with UI friction, burn their early adopters, and die.

**Phantom** is the ultimate Synthetic Reality Engine. It is an orchestration platform that injects fully autonomous, persona-driven AI "Ghosts" directly into your CI/CD pipeline. 

Instead of simple bots, you trigger a cohort of visual LLM agents loaded with the exact demographic and psychological traits of your Target Group (TG). Phantom uncovers friction points, cognitive load drops, and broken funnels *before* your real users do. We compress a 3-week focus group and a rigorous QA beta test into a 3-minute GitHub action.

---

## 🏗 Core Architecture

Phantom is designed as a modular monorepo:

- **`frontend/`**: The Command Center dashboard. Built with Next.js 14, TailwindCSS, and Framer Motion. 
- **`backend/`**: The Orchestration Engine. Built with FastAPI and Python. Manages agent state, heuristic evaluation, and asynchronous browser deployment (Playwright).
- **`infra/`**: Infrastructure as Code. Contains deployment specifications for Vercel (frontend) and Docker/Render (backend).
- **`docs/`**: Master documentation repository, including deep dives into our multi-agent consensus model and architecture decisions.

---

## 🚀 Quickstart (Local Development)

Getting the entire Phantom stack running locally requires just three steps.

### 1. Backend Engine
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```
*API runs at http://localhost:8000*

### 2. Frontend Dashboard
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```
*Dashboard runs at http://app.localhost:3000*

### 3. Trigger a Séance
Navigate to `http://app.localhost:3000/new` to test the command center local flow.

---

## 📖 Essential Documentation

If you are joining the team or contributing to core features, start here:
- **[Brand & Positioning](./docs/brand-bible.md)**: Understanding the TG Simulation narrative.
- **[Architecture Deep-Dive](./docs/architecture.md)**: How the LLM swarm consensus works.
- **[API Contract](./docs/api-reference.md)**: Types and endpoints shared between the orchestration engine and the frontend.

## 🤝 Contributing

We build with extreme velocity. If you see a bottleneck in the agent orchestration or a way to optimize the React render cycle in the dashboard, open a PR. Keep it scrappy, keep it fast.
