# Phantom Labs: Deferred Features Manifest

This document tracks features and pages that were removed in the v4.3-hardened cleanup (S26 production standards) to focus on the core Landing Page and Dashboard experience.

## Feature Overview

### 1. Blog System
- **Path**: `apps/dashboard/src/app/blog/`
- **Content**: `apps/dashboard/src/content/blog/`
- **Descriptions**:
    - `aha-moment-simulation`: Predicting user "activation" via synthetic session analysis.
    - `headless-commerce`: Testing checkout flows in headless environments.
    - `pmf-velocity-sean-ellis`: Sean Ellis test methodology implementation.
    - `pmf-velocity`: High-level metrics for measuring fit speed.
    - `rage-click-forensics`: Analyzing the root cause of digital frustration.
    - `retention-cohort`: Cohort-based retention prediction models.

### 2. Programmatic SEO (pSEO)
- **Engine**: `apps/dashboard/src/lib/pseo-engine.ts`
- **Page Types**: 
    - `Compare`: `apps/dashboard/src/app/compare/[slug]` (e.g., Phantom vs. Hotjar)
    - `Tools`: `apps/dashboard/src/app/tools/[slug]` (e.g., Rage-Click Forensics)
- **Rationale**: Deferred to focus on direct conversion before long-tail keyword scaling.

### 3. Solutions Framework
- **Path**: `apps/dashboard/src/app/solutions/[slug]`
- **Specific Pages**:
    - `AI User Testing`: Automated behavioral simulation for product validation.
    - `Synthetic QA Agents`: Regression-free deployment via ghost ensemble verification.
    - `PMF Velocity Tracking`: Quantitative measurement of product-market fit.

### 4. Executive Dashboards
- **CEO Dashboard**: `apps/dashboard/src/app/ceo/` (Executive metrics & strategy)
- **CMO Dashboard**: `apps/dashboard/src/app/cmo/` (Marketing & SEO pipeline)
- **CTO Dashboard**: `apps/dashboard/src/app/cto/` (Infrastructure & substrate health)

### 5. Specialized Interaction Pages
- **Roast**: `apps/dashboard/src/app/roast/` (AI-powered UX audits)
- **Leaderboard**: `apps/dashboard/src/app/leaderboard/` (Competitive benchmarking)
- **Toolkit**: `apps/dashboard/src/app/toolkit/` (Utility collection)

### 6. Operational & Legal
- **Docs**: `apps/dashboard/src/app/docs/` (Substrate Protocol technical reference)
- **Status**: `apps/dashboard/src/app/status/` (System health monitoring)
- **Waitlist**: `apps/dashboard/src/app/waitlist/` (Redundant with landing page form)
- **Verify-Deploy**: `apps/dashboard/src/app/verify-deploy/` (CI/CD integration status)
- **Legal**: `privacy`, `terms`, `cookies` (Standard compliance boilerplate)

---
*Note: All logic and components for these features remain in the Git history for easy restoration.*
