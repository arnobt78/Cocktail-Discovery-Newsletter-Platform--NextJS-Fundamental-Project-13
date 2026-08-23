# Tasks — MixMaster C1

<!-- Revision: C1 | Gate: pending approval -->

## Prioritized Plan

Execute in order. **Do not start until Human Gate 1 approves scope.**

---

### Wave 1 — Bootstrap & Doc Hygiene (low risk)

| ID | Task | REQ | Priority | Est. | Affected Files |
|----|------|-----|----------|------|----------------|
| TASK-0001 | Finalize `.agile-v/` + `CLAUDE.md` | REQ-0001 | P0 | Done | `.agile-v/*`, `CLAUDE.md` |
| TASK-0002 | Add `.cursorignore` (exclude `.env*`) | REQ-0003 | P1 | S | `.cursorignore` |
| TASK-0003 | Create `SECURITY.md` | REQ-0003 | P1 | S | `SECURITY.md` |
| TASK-0004 | Fix API registry doc strings | REQ-0002 | P1 | S | `src/data/project-api-registry.ts` |
| TASK-0005 | Remove unused `react-hot-toast` | REQ-0004 | P2 | S | `package.json`, `package-lock.json` |

**Wave 1 validation:** `npm run lint && npm run test && npm run build`

---

### Wave 2 — Production Hardening

| ID | Task | REQ | Priority | Est. | Affected Files |
|----|------|-----|----------|------|----------------|
| TASK-0006 | Pin Node 24.x (`engines` + `.nvmrc`) | REQ-0005 | P1 | S | `package.json`, `.nvmrc` |
| TASK-0007 | Consolidate admin routes on `assertAdminSession()` | REQ-0006 | P2 | M | `app/api/admin/**/*.ts` |
| TASK-0008 | Human-action checklist: Vercel bot protection | REQ-0005 | P1 | S | `docs/` note in VALIDATION_SUMMARY only |

**Wave 2 validation:** manual admin login + one protected API call; full build

---

### Wave 3 — Observability (requires explicit approval)

| ID | Task | REQ | Priority | Est. | Affected Files |
|----|------|-----|----------|------|----------------|
| TASK-0009 | Integrate `@sentry/nextjs` per integration guide §2A | REQ-0007 | P1 | L | `sentry.*.config.ts`, `instrumentation.ts`, `next.config.ts`, `app/global-error.tsx`, etc. |
| TASK-0010 | Verify Sentry captures API + client errors in dev | REQ-0007 | P1 | S | manual + VALIDATION_SUMMARY |

**Wave 3 validation:** trigger test error; confirm event in Sentry dashboard

---

### Wave 4 — Quality & CI

| ID | Task | REQ | Priority | Est. | Affected Files |
|----|------|-----|----------|------|----------------|
| TASK-0011 | Add GitHub Actions (lint, test, build) | REQ-0009 | P2 | M | `.github/workflows/ci.yml` |
| TASK-0012 | Add unit test for admin auth helper or registry | REQ-0009 | P2 | M | `tests/*.test.ts` |

**Wave 4 validation:** CI green on PR

---

### Deferred (C2 candidates)

| ID | Task | REQ | Notes |
|----|------|-----|-------|
| TASK-D01 | PostHog integration | REQ-0008 | User must approve C2 scope |
| TASK-D02 | SSR shells for About/Favorites/Newsletter | REQ-0010 | SEO/perf polish |
| TASK-D03 | E2E admin + newsletter with mocked Redis/Resend | REQ-0009 | Needs test harness |

---

## Recommended Approval Scopes

| Scope | Includes | Excludes |
|-------|----------|----------|
| **Minimal** | Wave 1 | Waves 2–4 |
| **Recommended** | Waves 1 + 2 | Waves 3–4 |
| **Full C1** | Waves 1–4 | Deferred only |
| **Full C1 + Sentry** | Waves 1–3 + 4 | PostHog, SSR shells |

---

## Dependency Graph

```
Wave 1 (docs/hygiene)
    ↓
Wave 2 (Node pin, admin auth)
    ↓
Wave 3 (Sentry) — optional branch
    ↓
Wave 4 (CI/tests)
```

Wave 1 has no blockers. Wave 3 requires Sentry env vars in deployment (user-managed; never commit).
