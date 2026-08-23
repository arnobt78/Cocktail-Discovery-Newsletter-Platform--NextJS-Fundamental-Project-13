# CLAUDE.md

## Project Overview

**Project Name:** MixMaster (`cocktail-mixer`)

**Description:** Full-stack cocktail discovery app with TheCocktailDB integration, double opt-in newsletter (Resend + Upstash Redis), and an admin control room for broadcasts, subscribers, and API diagnostics.

**Current Status:** Production-deployed; C1 hardening complete and commit-ready.

**Current Agile V Cycle:** C1

**Current Gate:** Human Gate 2 (commit-ready)

**Resume from:** `.agile-v/STATE.md`

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 16 App Router, React 19, TypeScript 5.9, Tailwind CSS 3.4, Framer Motion 12, Radix UI |
| **Backend** | Next.js Route Handlers (`app/api/**`) |
| **Database** | Upstash Redis (newsletter subscribers, drafts, queue, history) |
| **Authentication** | Admin: 6-digit passkey → HMAC-signed httpOnly session cookie |
| **Email** | Resend |
| **External API** | TheCocktailDB |
| **AI (optional)** | Groq → Gemini → OpenRouter → Hugging Face (admin composer assist, server-side) |
| **Observability** | Sentry (`@sentry/nextjs`, tunnel `/api/monitoring`) |
| **Client state** | TanStack Query 5, React context (newsletter), localStorage (favorites) |
| **Infrastructure** | Vercel |
| **Deployment** | https://cocktails-newsletter.vercel.app |
| **Testing** | Vitest (unit), Playwright (smoke E2E) |

---

## Architecture

```
app/           → routes, layouts, API handlers
src/components → pages/, layout/, admin/, ui/
src/lib        → api, newsletter/*, admin-*, favorites
src/hooks      → TanStack Query wrappers
src/types      → cocktail, newsletter, admin DTOs
```

**Conventions:**
- Route `page.tsx` files stay thin; feature UI in `src/components/pages/*` or `src/components/admin/*`
- Server prefetch on `/` and `/cocktail/[id]`; client interactivity in `"use client"` components
- Admin: `getAdminShellGate()` (fast) + `getAdminDashboardGate()` (Redis summary)
- API documentation single source: `src/data/project-api-registry.ts`

Follow existing architecture. Extend; do not parallel.

---

## Rendering Rules

Prefer server-first architecture.

**Server:** auth gates, metadata, initial data, layouts, page shells

**Client:** forms, mutations, dialogs, browser APIs, TanStack Query sync

Never convert an entire page to client-only because one section is interactive.

---

## State Management

- **Server state:** TanStack Query (`src/providers/query-provider.tsx`, hooks in `src/hooks/`)
- **Query keys:** `["cocktails", term]`, `["cocktail", id]`, `["admin", "control-room", "summary"]`, subscribers key in `SubscribersAdminPanel`
- **Mutations:** invalidate `adminSummaryQueryKey()` and domain keys after admin CRUD
- **UI-only:** local component state; favorites via `favorites-storage.ts`

Do not duplicate query keys, mutation logic, or API calls.

---

## Coding Rules

- TypeScript strict
- Reuse existing components, hooks, libs, types
- No unrelated refactoring
- Record validation in `.agile-v/VALIDATION_SUMMARY.md`

---

## Validation

```bash
npm run lint
npm run test
npm run build
npm run test:e2e   # optional; needs dev server
```

---

## Project Memory

Detailed state: `.agile-v/STATE.md`

Requirements: `.agile-v/REQUIREMENTS.md`

Tasks: `.agile-v/TASKS.md`

---

## Session Workflow

1. Analyze → 2. Plan → 3. **Wait for approval** → 4. Implement → 5. Validate → 6. Update STATE.md
