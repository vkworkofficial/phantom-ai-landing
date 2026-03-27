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

## Code Style

### TypeScript / React
- Use Server Components by default; add `"use client"` only when necessary.
- Follow the existing design system (dark theme, mono fonts, uppercase tracking).
- Use `lucide-react` for icons.

### Python
- Type hints on all function signatures.
- Pydantic models for all API inputs/outputs.
- Structured logging via `substrate_logger`.

## Security

- **Never** commit secrets, API keys, or `.env` files.
- Report security vulnerabilities via `security@tryphantom.dev` — **not** via GitHub issues.
- See [SECURITY.md](./SECURITY.md) for the full security policy.

## License

This project is licensed under the Forensic Engineering License. See [LICENSE](./LICENSE) for details.
