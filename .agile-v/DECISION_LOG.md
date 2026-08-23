# Decision Log

<!-- Append-only. Never overwrite prior entries. -->

---

## [C1] DEC-0001 — Bootstrap Cycle C1

| Field | Value |
|-------|-------|
| **Date** | 2026-08-24 |
| **Agent** | Cursor (Agile V orchestrator) |
| **Decision** | Initialize Agile V from scratch; no prior `.agile-v/` state to resume |
| **Rationale** | Repository has working application code and agent workflow docs but no traceability memory |
| **Linked REQ** | REQ-0001 |
| **Impact** | Created `.agile-v/` structure; populated from code inspection |

---

## [C1] DEC-0002 — Defer PostHog and SSR shell work to C2

| Field | Value |
|-------|-------|
| **Date** | 2026-08-24 |
| **Agent** | Cursor (Agile V orchestrator) |
| **Decision** | REQ-0008 (PostHog) and REQ-0010 (SSR shells) marked `deferred` for C1 |
| **Rationale** | Sentry + doc/security hygiene deliver higher ROI; SSR routes are functional as client shells |
| **Linked REQ** | REQ-0008, REQ-0010 |
| **Impact** | Waves 3–4 focus on Sentry + CI; PostHog excluded unless user overrides at Gate 1 |

---

## [C1] DEC-0003 — Recommended approval scope is Waves 1 + 2

| Field | Value |
|-------|-------|
| **Date** | 2026-08-24 |
| **Agent** | Cursor (Agile V orchestrator) |
| **Decision** | Default recommendation: **Recommended** scope (Waves 1 + 2) pending user choice |
| **Rationale** | Low-risk hygiene + production hardening without large integration surface |
| **Linked REQ** | REQ-0002, REQ-0003, REQ-0004, REQ-0005, REQ-0006 |
| **Impact** | Sentry (Wave 3) and CI (Wave 4) require explicit user opt-in |
