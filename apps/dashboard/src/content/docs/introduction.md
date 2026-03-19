---
title: "Introduction to Substrate Protocol"
order: 1
---

# Introduction to Substrate Protocol

The **Substrate Protocol** is the underlying architectural layer that powers Phantom AI. It provides the high-fidelity persistence and orchestration required for large-scale synthetic user simulations.

## Core Concepts

### 1. Ghost Instances
Independent headless Chromium actors driven by behavioral heuristic models.

### 2. Seance Consensus
The aggregation layer that confirms if a UI friction point is a systemic issue or an outlier.

### 3. Forensic Telemetry
High-resolution tracing of console logs, network errors, and layout instability.

## API Quickstart

Deploy a Séance with a single POST request:

```bash
curl -X POST https://api.tryphantom.dev/v1/simulations \
     -H "Content-Type: application/json" \
     -d '{"target_url": "https://app.com", "ghosts": 100}'
```
