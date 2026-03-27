# Security Policy — Phantom AI

> **Classification**: Internal / Investor-Ready  
> **Last Updated**: 2026-03-27  
> **Compliance Target**: SOC 2 Type II Readiness

---

## 1. Data Encryption

### In Transit
- All public endpoints enforce **HTTPS** via Vercel Edge (automatic TLS 1.3).
- WebSocket connections use **WSS** in production.
- HSTS header: `max-age=31536000; includeSubDomains`.

### At Rest
- Database credentials stored in environment variables (`.env.local`), excluded from version control via `.gitignore`.
- Production database (Neon PostgreSQL) uses **SSL** by default (`DATABASE_SSL=true`).
- No PII is stored in the simulation engine — ghost personas are synthetic.

---

## 2. Access Control

### Authentication
- **NextAuth v4** with dual-provider authentication:
  - **Credentials Provider**: Gated by `PHANTOM_ADMIN_KEY` environment variable.
  - **Google OAuth**: For approved team members only (`PHANTOM_APPROVED_EMAILS`).
- JWT-based sessions with configurable expiry.

### API Authorization
- **M2M (Machine-to-Machine)**: `X-Phantom-Key` header validated against `PHANTOM_MASTER_KEY`.
- **Workspace**: JWT tokens with HS256 signing, validated per-request via `get_forensic_auth` dependency.
- All API routes require one of the above authentication methods.

### RBAC
- Dashboard routes (`/dashboard/*`, `/onboarding/*`) protected by NextAuth middleware.
- Unauthenticated requests receive HTTP 302 redirect to `/login`.

---

## 3. Input Validation & Injection Prevention

### Server-Side
- All API inputs validated via **Pydantic v2** schemas (type-safe, schema-enforced).
- URL targets validated by `GhostFirewall` before browser navigation.
- SQL injection prevented by **SQLAlchemy ORM** (parameterized queries only).

### Client-Side
- Waitlist API uses **honeypot fields** and **origin validation** to detect bots.
- CSP headers configured in `vercel.json` restrict script sources.

---

## 4. SSRF Protection

The `GhostFirewall` class actively prevents Server-Side Request Forgery:

- **Blocked networks**: RFC 1918 (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`), loopback (`127.0.0.0/8`), cloud metadata (`169.254.169.254/32`), multicast.
- All target URLs are validated before any headless browser navigates to them.
- Domain allowlisting available for enterprise deployments.

---

## 5. Rate Limiting

- **Global**: 60 requests/minute per IP address (configurable via `RATE_LIMIT` setting).
- **Proxy-aware**: Extracts real client IP from `X-Forwarded-For` header.
- **Response**: HTTP 429 with structured JSON including limit details.
- Implemented as FastAPI middleware (`RateLimitMiddleware`).

---

## 6. Security Headers

### Core Engine (FastAPI)
| Header | Value |
|--------|-------|
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` |
| `X-XSS-Protection` | `1; mode=block` |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), payment=()` |
| `X-Permitted-Cross-Domain-Policies` | `none` |

### Dashboard (Vercel/Next.js)
- CSP configured in `vercel.json` with script-src, style-src, and connect-src directives.
- Additional security headers applied via Vercel deployment config.

---

## 7. Audit Logging

- All simulation launches, report downloads, and API key operations are logged via `PostgresStorage.log_action()`.
- Logs include: action type, actor ID, resource ID, status, and timestamp.
- Structured JSON logging via Python `logging` module with custom `substrate_logger`.

---

## 8. Secrets Management

| Secret | Storage | Rotation Policy |
|--------|---------|-----------------|
| `PHANTOM_MASTER_KEY` | Environment variable | Manual, on compromise |
| `NEXTAUTH_SECRET` | Environment variable | Per-deployment |
| `DATABASE_URL` | Environment variable | Via Neon dashboard |
| `GEMINI_API_KEY` | Environment variable | Per Google AI Studio |
| `GOOGLE_CLIENT_SECRET` | Environment variable | Via GCP Console |

**Policy**: All secrets are stored in `.env.local` (dashboard) or `.env` (engine), both excluded from git via `.gitignore`. Production secrets are configured in Vercel environment settings.

---

## 9. Vulnerability Reporting

If you discover a security vulnerability, please report it responsibly:

- **Email**: security@tryphantom.dev
- **Response time**: 48 hours for initial acknowledgment.
- **Do NOT** open public GitHub issues for security vulnerabilities.

---

## 10. Compliance Roadmap

| Control | Status | Target |
|---------|--------|--------|
| Encryption in transit (TLS) | ✅ Active | — |
| Encryption at rest | ✅ Active (Neon SSL) | — |
| Access control (AuthN/AuthZ) | ✅ Active | — |
| Input validation | ✅ Active | — |
| SSRF protection | ✅ Active | — |
| Rate limiting | ✅ Active | — |
| Audit logging | ✅ Active | — |
| Secrets management | ⚠️ Env-based | Vault integration (Q3) |
| Penetration testing | 🔲 Planned | Q3 2026 |
| SOC 2 Type II audit | 🔲 Planned | Q4 2026 |

---

*Maintained by the Phantom Engineering Team. This document is updated with each security-relevant release.*
