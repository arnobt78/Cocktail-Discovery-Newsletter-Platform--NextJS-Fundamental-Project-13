# Requirements — MixMaster C1

<!-- Revision: C1 | Status: draft pending Gate 1 -->

## Traceability Legend

- **Status:** `approved` | `deferred` | `deprecated` | `complete`
- All implementation tasks must reference REQ-IDs.

---

## REQ-0001 — Agile V Project Memory [C1]

**Status:** `approved`  
**Priority:** P0

Establish `.agile-v/` traceability files so future agents can resume without chat history.

**Acceptance:**
- STATE.md, REQUIREMENTS.md, TASKS.md, RISKS.md, GATES.md, DECISION_LOG.md, VALIDATION_SUMMARY.md, CHANGELOG.md exist and are accurate
- CLAUDE.md reflects verified stack facts

---

## REQ-0002 — Documentation & API Registry Accuracy [C1]

**Status:** `approved`  
**Priority:** P1

Documentation must match code (AGENTS.md source-of-truth rule).

**Known drift (verified):**

| Location | Documented | Actual |
|----------|------------|--------|
| `POST /api/newsletter` | `{ email, fullName }` | `{ firstName, lastName, email }` |
| `POST /api/admin/session/login` | `{ password }` | `{ passkey }` |

**Acceptance:**
- `src/data/project-api-registry.ts` request/response strings match route handlers and types
- README links resolve (SECURITY.md created or link removed)

**Affected files:** `src/data/project-api-registry.ts`, `README.md`, `SECURITY.md`

---

## REQ-0003 — Security Hygiene [C1]

**Status:** `approved`  
**Priority:** P1

Reduce secret exposure and document vulnerability reporting.

**Acceptance:**
- `.cursorignore` excludes `.env`, `.env.*`, credentials
- `SECURITY.md` exists with contact/reporting policy (no secrets)
- `.env.example` uses placeholders only (already true)

**Affected files:** `.cursorignore`, `SECURITY.md`

---

## REQ-0004 — Remove Dead Dependencies [C1]

**Status:** `approved`  
**Priority:** P2

Eliminate unused packages to reduce bundle audit surface.

**Verified:** `react-hot-toast` is in `package.json` but zero imports; app uses `sonner`.

**Acceptance:**
- `react-hot-toast` removed from `package.json` and lockfile
- `npm run build` still passes

---

## REQ-0005 — Production Guardrails [C1]

**Status:** `approved`  
**Priority:** P1

Align with `docs/VERCEL_PRODUCTION_GUARDRAILS.md`.

**Verified already in place:**
- Security headers in `next.config.ts` + `vercel.json`
- `/_next/static` immutable cache in `vercel.json`
- `app/robots.ts` with API disallow + AI bot rules

**Gaps:**
- No `engines.node` in `package.json` (guardrails recommend `24.x`)
- No `.nvmrc`

**Acceptance:**
- `package.json` engines + `.nvmrc` pin Node 24.x
- Vercel dashboard bot protection documented as human-action in TASKS (not code)

---

## REQ-0006 — Centralize Admin API Auth [C1]

**Status:** `approved`  
**Priority:** P2

`assertAdminSession()` exists in `src/lib/admin-api-auth.ts` but several admin routes duplicate cookie verification inline.

**Acceptance:**
- All `app/api/admin/**` routes use `assertAdminSession()` (or shared helper)
- No behavior change for valid/invalid sessions
- Existing admin flows still work

**Affected files:** `app/api/admin/control-room/*.ts`, `app/api/admin/subscribers/route.ts`, `app/api/admin/ai/composer-assist/route.ts`

---

## REQ-0007 — Sentry Error Tracking [C1]

**Status:** `approved`  
**Priority:** P1

**Verified:** `.env.example` has Sentry placeholders; no `@sentry/nextjs` in dependencies; no Sentry imports in codebase.

**Acceptance (per `docs/Redis_Sentry_PostHog_INTEGRATION_GUIDE.md` §2A):**
- `@sentry/nextjs` installed and configured
- Client, server, and edge instrumentation files present
- `next.config.ts` wrapped with `withSentryConfig`
- Errors from API routes and client boundaries reported in Sentry project
- No secrets committed; env vars documented in `.env.example` only

**Out of scope unless approved:** PostHog (REQ-0008)

---

## REQ-0008 — PostHog Analytics [C1]

**Status:** `deferred`  
**Priority:** P3

Optional product analytics per integration guide §3. Defer to C2 unless user explicitly includes in C1 scope.

---

## REQ-0009 — Test & CI Coverage [C1]

**Status:** `approved`  
**Priority:** P2

**Verified baseline:**
- Vitest: 3 tests (`tests/newsletter-routes.test.ts`)
- Playwright: 2 smoke tests (`e2e/smoke.spec.ts`)
- No CI workflow

**Acceptance:**
- GitHub Actions workflow: lint + test + build on PR/push
- At least one additional unit test for admin session guard or API registry consistency

---

## REQ-0010 — SSR Shell Improvements [C1]

**Status:** `deferred`  
**Priority:** P3

Routes `/about`, `/favorites`, `/newsletter` render client-only page components with no route-level metadata or server shell.

**Deferred rationale:** Low risk; pages work; larger refactor with limited C1 ROI. Revisit in C2 if SEO/perceived performance is a priority.

---

## Non-Requirements (explicitly out of C1 scope)

- New user-facing features
- Database migration (Redis schema is stable)
- Admin passkey UX redesign
- Replacing Resend/Upstash/TheCocktailDB
- Full E2E coverage of admin/newsletter flows (requires test env secrets)
