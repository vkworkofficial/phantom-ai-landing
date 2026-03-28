# Contributing to Phantom AI

Thank you for your interest in contributing to Phantom AI. This document outlines the process for contributing to this repository.

## Getting Started

### Prerequisites
- **Node.js** 22.x
- **Python** 3.12+
- **npm** 10+

### Local Setup

```bash
# Clone the repository
git clone https://github.com/vkworkofficial/phantom-ai-landing.git
cd phantom-ai-landing

# Install dashboard dependencies
npm install

# Setup core engine
cd apps/core-engine
python -m venv venv_new
.\venv_new\Scripts\pip.exe install -r requirements.txt
python -m playwright install chromium

# Start both services
npm run dev:dashboard  # Terminal 1 - http://localhost:3000
.\venv_new\Scripts\uvicorn.exe app.main:app --reload --port 8000  # Terminal 2
```

## Development Workflow

### Branch Naming
- `feat/description` — New features
- `fix/description` — Bug fixes
- `chore/description` — Maintenance, dependencies, config
- `docs/description` — Documentation updates

### Commit Messages
We follow [Conventional Commits](https://www.conventionalcommits.org/):
```
feat(dashboard): add persona comparison matrix
fix(engine): resolve SSRF bypass in ghost firewall
chore(deps): update Next.js to 16.2.1
docs(security): update SOC 2 compliance roadmap
```

### Pull Request Process
1. Create a feature branch from `main`.
2. Make your changes. Ensure the dashboard builds (`npm run build --workspace=@phantom-labs/dashboard`).
3. Open a PR against `main` with a clear description.
4. CI will run automatically (build + engine verification).
5. Request review from a maintainer.

## 🏛 Component Architecture

We follow a strict modular pattern for the Forensic HUD (Dashboard). New UI features should be added to `apps/dashboard/src/components/landing/` and exported as self-contained units.

### Modular Patterns
- **Header**: Navigation and operational status HUD.
- **Hero**: Top-of-page conversion substrate.
- **EmpathyGap**: Qualitative problem framing.
- **BackToTop**: Accessibility & navigation utility.

## 🧬 Engineering Standards

### TypeScript / React
- **Server-First**: Use React Server Components (RCS) by default.
- **Type Safety**: No `any` types in forensic logic. Use the root `tsconfig.json` paths.
- **Styling**: Enforced via `.prettierrc.json` and Utility-First Tailwind.

### Python
- **Engine Rules**: Enforced via `.ruff.toml`.
- **Typing**: Strict type hints on all signatures.
- **Forensics**: Structured logging via `substrate_logger` only.

## 🚀 CI Substrate

Every PR triggers the **Phantom Substrate CI**. Ensure your changes pass:
1. `npx turbo lint`
2. `npx turbo typecheck`
3. `npx turbo build`

## License

This project is licensed under the Forensic Engineering License. See [LICENSE](./LICENSE) for details.
