# Cocktail Discovery & Email Marketing Newsletter Subscription Platform – Next.js, React, TypeScript, CocktailDB API, Tailwind CSS, Framer Motion, AI Composer Assist, TanStack Query, Project (including Admin Control Room)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-24.x-green)](https://nodejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack%20Query-5.102-ff4154)](https://tanstack.com/query/latest)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12-0055ff)](https://www.framer.com/motion/)
[![Resend](https://img.shields.io/badge/Resend-6.22-0055ff)](https://resend.com/)
[![Upstash Redis](https://img.shields.io/badge/Upstash%20Redis-1.38-0055ff)](https://upstash.com/)
[![Sentry](https://img.shields.io/badge/Sentry-Next.js-362D59)](https://sentry.io/)
[![launch with diploi badge](https://diploi.com/launch.svg)](https://diploi.com/launch/arnobt78/09-mixmaster)

**MixMaster** (`cocktail-mixer`) is a full-stack, educational cocktail discovery platform built with the **Next.js App Router**, **React 19**, and **TypeScript**. It combines public pages (search, cocktail details, favorites, newsletter signup) with a production-style **newsletter pipeline** (double opt-in, unsubscribe, rate limits) and an **Admin Control Room** for campaigns, subscribers, AI-assisted drafting, resend, cron jobs, queue management, and live API diagnostics.

Data flows from **TheCocktailDB** (no API key required) and optional **Upstash Redis** + **Resend** for email and storage—so you can run a **minimal UI-only mode** with zero `.env` secrets, or scale up to a complete “mini product” locally or on Vercel.

- **Live Demo:** [https://cocktails-newsletter.vercel.app](https://cocktails-newsletter.vercel.app)
- **Security:** Private vulnerability reports → [SECURITY.md](./SECURITY.md) · [contact@arnobmahmud.com](mailto:contact@arnobmahmud.com)
- **Author:** [Arnob Mahmud](https://www.arnobmahmud.com/) · [LinkedIn](https://www.linkedin.com/in/arnob-mahmud-05839655/) · [GitHub](https://github.com/arnobt78)

![Image 1](https://github.com/user-attachments/assets/d72d64bb-29a2-4f0c-b415-5e8e1d438bc6)
![Image 2](https://github.com/user-attachments/assets/3977a7c1-20ce-4baa-86c3-322b82fad9e4)
![Image 3](https://github.com/user-attachments/assets/375a894e-1886-483f-8981-6b768ec95626)
![Image 4](https://github.com/user-attachments/assets/d2bfcbb3-f90b-4d4c-a739-ba35720e0013)
![Image 5](https://github.com/user-attachments/assets/5595b55d-6d06-47de-bb6e-bdbe1a906555)
![Image 6](https://github.com/user-attachments/assets/7a972221-8386-4cbd-907e-674cf433893a)
![Image 7](https://github.com/user-attachments/assets/c5009a0c-e45a-455d-989c-96af14b6ce17)
![Image 8](https://github.com/user-attachments/assets/886e2e75-cf89-4753-9720-695518bf31da)
![Image 9](https://github.com/user-attachments/assets/7308e76f-d69c-43c5-8869-ad6b857ddefd)
![Image 10](https://github.com/user-attachments/assets/f0d92887-489a-4c79-9113-1b616595136a)

## Table of Contents

- [What You Will Learn](#what-you-will-learn)
- [Learning Walkthrough](#learning-walkthrough)
- [Features](#features)
- [Architecture Overview](#architecture-overview)
- [Technology Stack](#technology-stack)
- [Keywords](#keywords)
- [Prerequisites](#prerequisites)
- [Installation & Quick Start](#installation--quick-start)
- [Environment Variables](#environment-variables)
- [NPM Scripts](#npm-scripts)
- [Project Structure](#project-structure)
- [Routing & Pages](#routing--pages)
- [API Routes & Backend](#api-routes--backend)
- [Admin Control Room](#admin-control-room)
- [How Key Features Work](#how-key-features-work)
- [Observability (Sentry)](#observability-sentry)
- [Reusing Components in Other Projects](#reusing-components-in-other-projects)
- [Testing](#testing)
- [Deployment (Vercel)](#deployment-vercel)
- [Further Reading](#further-reading)
- [Contributing](#contributing)
- [Conclusion](#conclusion)
- [License](#license)
- [Happy Coding](#happy-coding-)

---

## What You Will Learn

This repository is designed as a **progressive learning lab**. You can study it layer by layer:

| Layer             | Topics                                                           | Where to look                                        |
| ----------------- | ---------------------------------------------------------------- | ---------------------------------------------------- |
| **Frontend**      | App Router, Server vs Client Components, Tailwind, Framer Motion | `app/*/page.tsx`, `src/components/`                  |
| **Data fetching** | SSR first paint, TanStack Query sync, query keys                 | `app/page.tsx`, `src/hooks/use-cocktails-query.ts`   |
| **Types**         | Shared domain models, API DTOs                                   | `src/types/cocktail.ts`, `newsletter.ts`, `admin.ts` |
| **Newsletter**    | Double opt-in, HMAC tokens, rate limits                          | `src/lib/newsletter/*`, `app/api/newsletter/*`       |
| **Admin**         | Passkey login, httpOnly cookies, gated APIs                      | `src/lib/admin-session.ts`, `app/api/admin/*`        |
| **Broadcast**     | Drafts, queue, history, CSV export                               | `BroadcastComposer.tsx`, `broadcast-dispatch.ts`     |
| **AI (optional)** | Multi-provider fallback chains                                   | `src/lib/admin/ai-provider-models.ts`                |
| **Ops**           | Sentry tunnel, CI, production guardrails                         | `docs/`, `.github/workflows/ci.yml`                  |

**Core skills:**

- **Next.js App Router** — file-based routes, nested layouts, metadata API, route handlers.
- **Server-first rendering** — thin `page.tsx` shells prefetch data; interactive bodies live in `"use client"` components.
- **TypeScript strict mode** — contracts between UI, API routes, and Redis/Resend layers.
- **Real integrations** — TheCocktailDB, Resend, Upstash Redis, optional Groq/Gemini/OpenRouter/Hugging Face.
- **Quality tooling** — ESLint, Vitest, Playwright smoke tests, GitHub Actions CI.

---

## Learning Walkthrough

### Step 1 — Run with zero configuration

```bash
git clone https://github.com/arnobt78/09-mixmaster.git
cd 09-mixmaster
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Search cocktails, open `/cocktail/[id]`, save favorites. **No `.env` file is required** for this tier—TheCocktailDB is public and defaults are baked into `src/lib/api.ts`.

### Step 2 — Understand the request flow (home page)

1. Browser requests `/` or `/?search=margarita`.
2. **Server Component** `app/page.tsx` reads `searchParams`, calls `fetchCocktails()` on the server.
3. Results pass as props into **Client Component** `HomePage` for instant interactivity and TanStack Query hydration.
4. Further client searches use `useCocktailsQuery` without a full page reload.

```tsx
// app/page.tsx — server prefetch pattern
const initialDrinks = await fetchCocktails(searchTerm);
return (
  <HomePage initialDrinks={initialDrinks} initialSearchTerm={searchTerm} />
);
```

### Step 3 — Add newsletter (Tier 1 env)

Copy `.env.example` → `.env.local`, set Resend + Upstash + signing secrets. Trace:

`NewsletterPageContent` → `POST /api/newsletter` → `subscribeToNewsletter()` → Redis pending record → Resend confirmation email → user clicks link → `POST /api/newsletter/confirm` → active subscriber.

### Step 4 — Unlock Admin Control Room (Tier 2 env)

Set `ADMIN_DASHBOARD_KEY` (e.g. `112233` for local learning only). Visit `/admin/control-room`, enter passkey, explore composer, subscribers, API docs, and API status dashboards.

### Step 5 — Optional AI composer assist (Tier 3 env)

Add any of `GROQ_API_KEY`, `GEMINI_API_KEY`, `OPENROUTER_API_KEY`, `HUGGINGFACE_API_KEY`. In the broadcast composer, use **AI assist**—the server tries providers in order with per-provider model chains. See [`docs/LLM_MODEL_SELECTION.md`](docs/LLM_MODEL_SELECTION.md).

### Step 6 — Production hardening

Configure Sentry (Tier 4), set `NEXT_PUBLIC_APP_URL` on Vercel, read [`docs/VERCEL_PRODUCTION_GUARDRAILS.md`](docs/VERCEL_PRODUCTION_GUARDRAILS.md).

---

## Features

| Area                   | What it does                                                                                       |
| ---------------------- | -------------------------------------------------------------------------------------------------- |
| **Home**               | Search cocktails by name via TheCocktailDB; SSR-friendly initial data with URL `?search=` support. |
| **Cocktail detail**    | Dynamic route `/cocktail/[id]` with ingredients, instructions, and safe image handling.            |
| **Favorites**          | Client-side persistence (`localStorage`) with hydration-safe patterns.                             |
| **About**              | Server-rendered marketing/educational copy from shared content modules.                            |
| **Newsletter**         | Public signup; confirm and unsubscribe pages; rate limiting on API routes.                         |
| **Admin overview**     | Dashboard summary (counts, health hints) when Redis/session are configured.                        |
| **Broadcast composer** | Drafts, queue, history, test send, schedule, resend, optional AI fill.                             |
| **Subscribers**        | Admin CRUD-style management for subscriber records (with auth).                                    |
| **API docs (in-app)**  | Human-readable catalog of HTTP routes from `project-api-registry.ts`.                              |
| **API status**         | Live browser + server probes, TheCocktailDB latency, integration flags.                            |
| **Error monitoring**   | Optional Sentry with same-origin `/api/monitoring` tunnel (ad-blocker resistant).                  |

---

## Architecture Overview

```text
┌─────────────────────────────────────────────────────────────────┐
│                        Browser (React 19)                        │
│  Pages (RSC shells) + Client components + TanStack Query         │
└────────────────────────────┬────────────────────────────────────┘
                             │
         ┌───────────────────┼───────────────────┐
         ▼                   ▼                   ▼
   TheCocktailDB      app/api/**/route.ts    localStorage
   (public REST)      (Next.js handlers)     (favorites)
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
         Upstash Redis    Resend API    AI providers
         (subscribers,    (email)       (Groq, Gemini,
          drafts, queue)                 OpenRouter, HF)
```

**Design conventions:**

- **Thin routes** — `app/**/page.tsx` handles metadata + server data; UI lives in `src/components/pages/*` or `src/components/admin/*`.
- **Business logic in `src/lib/`** — newsletter, admin auth, API clients—not inside route files.
- **Single API doc source** — `src/data/project-api-registry.ts` powers in-app API documentation and probe lists.
- **Mutations invalidate queries** — admin CRUD refreshes `adminSummaryQueryKey()` and related TanStack Query keys.

---

## Technology Stack

| Layer                    | Libraries / Tools                               | Role                                                   |
| ------------------------ | ----------------------------------------------- | ------------------------------------------------------ |
| **Framework**            | Next.js 16, React 19                            | App Router, RSC, routing, metadata API.                |
| **Language**             | TypeScript 5.9                                  | Types for components, API bodies, domain models.       |
| **Runtime**              | Node.js 24.x                                    | Pinned in `package.json` `engines` and `.nvmrc`.       |
| **Styling**              | Tailwind CSS 3.4, `tailwind-merge`, `clsx`, CVA | Utility-first UI, conditional classes, variants.       |
| **Motion**               | Framer Motion 12                                | Page transitions and admin micro-interactions.         |
| **Server / client data** | TanStack Query 5                                | Caching, mutations, devtools for client fetches.       |
| **UI primitives**        | Radix Tabs & Tooltip                            | Accessible tabs and tooltips in admin UI.              |
| **Icons**                | Lucide React                                    | Consistent icon set.                                   |
| **Toasts**               | Sonner                                          | User feedback for newsletter and admin actions.        |
| **Email**                | Resend                                          | Transactional and broadcast email.                     |
| **Data store**           | Upstash Redis                                   | Subscribers, drafts, queue, history (when configured). |
| **AI (optional)**        | Groq, Gemini, OpenRouter, Hugging Face          | Composer assist with ordered multi-model fallback.     |
| **Observability**        | Sentry (`@sentry/nextjs`)                       | Error tracking via same-origin tunnel.                 |
| **Testing**              | Vitest, Playwright                              | Unit + smoke E2E.                                      |
| **CI**                   | GitHub Actions                                  | Lint, test, build, audit on push/PR.                   |

### Why these libraries?

**TanStack Query** deduplicates requests, exposes `isPending` / `isError` for UI, and keeps server state in sync after mutations (e.g. after saving a draft, invalidate summary queries).

```tsx
// Pattern used in admin components:
const { data, isPending } = useQuery({
  queryKey: ["admin", "control-room", "summary"],
  queryFn: () =>
    fetch("/api/admin/control-room/summary", { credentials: "include" }).then(
      (r) => r.json(),
    ),
});
```

**Sonner** — lightweight toast notifications; replaces older toast libraries with a simpler API:

```tsx
import { toast } from "sonner";
toast.success("Draft saved.");
```

**class-variance-authority (CVA)** — defines component variants (size, intent) in one place; pairs well with Tailwind:

```tsx
// Conceptual — see src/components/ui/badge.tsx
const badgeVariants = cva("inline-flex rounded-full px-2", {
  variants: { intent: { default: "bg-slate-800", success: "bg-emerald-600" } },
});
```

**Framer Motion** — declarative animations for layout stability and polish without manual CSS keyframes.

**Upstash Redis** — serverless Redis over HTTPS REST; no persistent TCP connection needed on Vercel serverless functions.

---

## Keywords

Next.js, React, TypeScript, Tailwind CSS, Framer Motion, TanStack Query, TheCocktailDB, cocktail recipes, newsletter, double opt-in, Resend, Upstash Redis, App Router, server components, educational project, full-stack, admin dashboard, API routes, rate limiting, broadcast email, Sentry, Groq, Gemini, OpenRouter, Hugging Face, MIT License, Arnob Mahmud, MixMaster, Vercel, Playwright, Vitest, SEO, accessibility, Node.js 24.

---

## Prerequisites

- **Node.js** 24.x (see `.nvmrc`; `nvm use` recommended).
- **npm** 10+ (ships with Node 24).
- A modern browser for local development.
- Optional accounts: [Resend](https://resend.com), [Upstash](https://upstash.com), [Groq](https://console.groq.com), [Google AI Studio](https://aistudio.google.com), [OpenRouter](https://openrouter.ai), [Hugging Face](https://huggingface.co), [Sentry](https://sentry.io).

---

## Installation & Quick Start

```bash
git clone https://github.com/arnobt78/09-mixmaster.git
cd 09-mixmaster
npm install
cp .env.example .env.local   # optional — see tiers below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Run modes (pick your tier)

| Mode                      | `.env` needed? | What works                             |
| ------------------------- | -------------- | -------------------------------------- |
| **UI + cocktails**        | No             | Search, detail pages, favorites, about |
| **Newsletter**            | Tier 1         | Subscribe, confirm, unsubscribe emails |
| **Admin**                 | Tier 1 + 2     | Control room, composer, subscribers    |
| **AI assist**             | + Tier 3       | AI draft fill in composer              |
| **Production monitoring** | + Tier 4       | Sentry error tracking                  |

---

## Environment Variables

Copy **[`.env.example`](.env.example)** → **`.env.local`** (Next.js loads this automatically in dev). Nothing from `.env*` is committed (see `.gitignore`).

> **You do not need any environment variables** to explore cocktail search and favorites. Add variables only when you enable the corresponding feature.

### Tier 0 — Branding & URLs (optional)

| Variable                   | Required?                    | Purpose                                            |
| -------------------------- | ---------------------------- | -------------------------------------------------- |
| `NEXT_PUBLIC_APP_TITLE`    | No                           | Browser title / brand (default: MixMaster).        |
| `NEXT_PUBLIC_APP_URL`      | **Yes for production email** | Canonical URL for links in emails and OG metadata. |
| `NEXT_PUBLIC_API_BASE_URL` | No                           | TheCocktailDB base URL (sensible default in code). |

### Tier 1 — Newsletter (Resend + Redis)

| Variable                        | Purpose                       | How to obtain                                                        |
| ------------------------------- | ----------------------------- | -------------------------------------------------------------------- |
| `RESEND_API_KEY`                | Send mail                     | [resend.com](https://resend.com) → API Keys                          |
| `RESEND_FROM_EMAIL`             | From address                  | Verified domain in Resend dashboard                                  |
| `RESEND_REPLY_TO_EMAIL`         | Reply-To header               | Your contact email                                                   |
| `UPSTASH_REDIS_REST_URL`        | Redis REST endpoint           | [console.upstash.com](https://console.upstash.com) → database → REST |
| `UPSTASH_REDIS_REST_TOKEN`      | Redis auth token              | Same Upstash REST tab                                                |
| `NEWSLETTER_UNSUBSCRIBE_SECRET` | HMAC for unsubscribe links    | `openssl rand -base64 48`                                            |
| `NEWSLETTER_CONFIRM_SECRET`     | Optional separate confirm key | Falls back to unsubscribe secret                                     |

### Tier 2 — Admin & cron

| Variable               | Purpose                       | How to obtain                               |
| ---------------------- | ----------------------------- | ------------------------------------------- |
| `ADMIN_DASHBOARD_KEY`  | 6-digit admin passkey         | Any 6 digits locally; strong random in prod |
| `ADMIN_SESSION_SECRET` | Signs httpOnly session cookie | `openssl rand -base64 32`                   |
| `CRON_DIGEST_SECRET`   | Protects weekly digest route  | `openssl rand -base64 32`                   |

### Tier 3 — AI composer assist (optional)

| Variable                                | Purpose                                      |
| --------------------------------------- | -------------------------------------------- |
| `GROQ_API_KEY`                          | First provider (fast inference)              |
| `GEMINI_API_KEY` or `GOOGLE_AI_API_KEY` | Second provider                              |
| `OPENROUTER_API_KEY`                    | Third provider (`:free` models)              |
| `HUGGINGFACE_API_KEY`                   | Fourth provider (optional; skipped if unset) |
| `GROQ_MODEL`, `GEMINI_MODEL`, etc.      | Override default model chains                |

Provider order and model chains: [`docs/LLM_MODEL_SELECTION.md`](docs/LLM_MODEL_SELECTION.md).

### Tier 4 — Sentry (optional, recommended in production)

| Variable                       | Purpose                                            |
| ------------------------------ | -------------------------------------------------- |
| `NEXT_PUBLIC_SENTRY_DSN`       | Client errors — **set at Vercel build time**       |
| `SENTRY_DSN`                   | Optional server alias                              |
| `SENTRY_ORG`, `SENTRY_PROJECT` | Source map upload (project **slug**, not org name) |
| `SENTRY_AUTH_TOKEN`            | CI/build-only auth token                           |

Full setup guide: [`docs/Redis_Sentry_PostHog_INTEGRATION_GUIDE.md`](docs/Redis_Sentry_PostHog_INTEGRATION_GUIDE.md).

---

## NPM Scripts

| Script           | Command            | Description                                         |
| ---------------- | ------------------ | --------------------------------------------------- |
| Dev server       | `npm run dev`      | Next.js dev (Turbopack).                            |
| Production build | `npm run build`    | Optimized build (`NEXT_TELEMETRY_DISABLED=1`).      |
| Start            | `npm run start`    | Run production server locally after build.          |
| Lint             | `npm run lint`     | ESLint over the repo.                               |
| Unit tests       | `npm run test`     | Vitest (newsletter, admin auth, AI model registry). |
| E2E smoke        | `npm run test:e2e` | Playwright — home and about pages.                  |

---

## Project Structure

```text
app/                          # Next.js App Router
  layout.tsx                  # Root layout, metadata, providers, JSON-LD
  page.tsx                    # Home (server prefetch + client search)
  about/ favorites/ newsletter/   # Public pages (RSC shells + *PageContent clients)
  cocktail/[id]/              # Dynamic cocktail detail
  admin/control-room/         # Admin UI (composer, subscribers, api-docs, api-status)
  api/                        # Route handlers (REST JSON)
    newsletter/               # Public subscribe, confirm, unsubscribe, weekly-brief
    admin/                    # Session, control-room, subscribers, AI assist
    monitoring/               # Sentry same-origin tunnel
  robots.ts                   # Crawl policy + AI bot blocks
  global-error.tsx            # Sentry-aware root error boundary

src/
  components/
    pages/                    # Feature page bodies (client where needed)
    admin/                    # Control room UI (composer, dashboard, panels)
    layout/                   # Navbar, footer, app shell
    ui/                       # Reusable primitives (card, badge, safe-image, …)
  context/                    # Newsletter + admin shell React context
  data/                       # Static copy + project-api-registry.ts
  hooks/                      # TanStack Query wrappers, media query
  lib/
    api.ts                    # TheCocktailDB fetch helpers
    newsletter/               # Subscribe flow, mailer, Redis repo, security tokens
    admin/                    # AI composer, provider model chains
    admin-session.ts          # Passkey + HMAC cookie session
    favorites-storage.ts      # localStorage favorites
    sentry-*.ts               # Sentry DSN helpers and noise filters
  providers/                  # QueryClient provider
  types/                      # cocktail, newsletter, admin DTOs

tests/                        # Vitest unit tests
e2e/                          # Playwright smoke specs
docs/                         # Integration guides, styling, LLM selection
.github/workflows/ci.yml      # CI pipeline
```

**Convention:** Route `page.tsx` files stay thin; feature UI in `src/components/*`; business logic in `src/lib/*`.

---

## Routing & Pages

| Path                              | Type         | Description                    |
| --------------------------------- | ------------ | ------------------------------ |
| `/`                               | Dynamic SSR  | Home search; reads `?search=`  |
| `/about`                          | Static shell | Educational copy               |
| `/favorites`                      | Static shell | Saved cocktails (localStorage) |
| `/newsletter`                     | Static shell | Signup form                    |
| `/newsletter/confirm`             | Client page  | Double opt-in confirmation     |
| `/newsletter/unsubscribe`         | Client page  | Unsubscribe with token         |
| `/cocktail/[id]`                  | Dynamic SSR  | Single cocktail detail         |
| `/admin/control-room`             | Protected    | Admin dashboard                |
| `/admin/control-room/composer`    | Protected    | Broadcast composer             |
| `/admin/control-room/subscribers` | Protected    | Subscriber management          |
| `/admin/control-room/explore`     | Protected    | Explore / tools                |
| `/admin/control-room/api-docs`    | Protected    | In-app HTTP API catalog        |
| `/admin/control-room/api-status`  | Protected    | Live diagnostics dashboard     |

---

## API Routes & Backend

All HTTP APIs are **Next.js Route Handlers** under `app/api/**/route.ts`. They return JSON unless noted (CSV export).

### Newsletter (public)

| Method | Path                           | Summary                                                      |
| ------ | ------------------------------ | ------------------------------------------------------------ |
| `POST` | `/api/newsletter`              | Subscribe — validates, rate-limits, sends confirmation email |
| `POST` | `/api/newsletter/confirm`      | Activate subscriber with signed token                        |
| `POST` | `/api/newsletter/unsubscribe`  | Unsubscribe with signed token                                |
| `POST` | `/api/newsletter/weekly-brief` | Cron-protected weekly digest (`CRON_DIGEST_SECRET`)          |

**Example — subscribe:**

```http
POST /api/newsletter
Content-Type: application/json

{
  "firstName": "Ada",
  "lastName": "Lovelace",
  "email": "ada@example.com"
}
```

```json
{ "ok": true, "message": "Check your inbox to confirm your subscription." }
```

### Admin session

| Method | Path                        | Summary                                     |
| ------ | --------------------------- | ------------------------------------------- |
| `POST` | `/api/admin/session/login`  | `{ "passkey": "112233" }` → httpOnly cookie |
| `POST` | `/api/admin/session/logout` | Clears session                              |

### Control room (admin-session required)

| Method                 | Path                                    | Summary                           |
| ---------------------- | --------------------------------------- | --------------------------------- |
| `GET`                  | `/api/admin/control-room/summary`       | Dashboard aggregates              |
| `POST`                 | `/api/admin/control-room/save-draft`    | Save composer draft               |
| `PATCH`/`DELETE`       | `/api/admin/control-room/drafts`        | Edit or delete drafts             |
| `POST`                 | `/api/admin/control-room/send-post`     | Send or schedule broadcast        |
| `GET`/`PATCH`/`DELETE` | `/api/admin/control-room/queue`         | Queue management                  |
| `POST`                 | `/api/admin/control-room/process-queue` | Process due scheduled sends       |
| `DELETE`               | `/api/admin/control-room/history`       | Clear resend history              |
| `POST`                 | `/api/admin/control-room/resend-post`   | Resend from draft/history         |
| `GET`                  | `/api/admin/control-room/export`        | CSV download of subscribers       |
| `GET`                  | `/api/admin/control-room/diagnostics`   | Server probes + integration flags |

### Subscribers & AI

| Method                 | Path                            | Summary                            |
| ---------------------- | ------------------------------- | ---------------------------------- |
| `GET`/`PATCH`/`DELETE` | `/api/admin/subscribers`        | Subscriber CRUD                    |
| `POST`                 | `/api/admin/ai/composer-assist` | AI draft from `{ "brief": "..." }` |

### Monitoring

| Method | Path              | Summary                                        |
| ------ | ----------------- | ---------------------------------------------- |
| `POST` | `/api/monitoring` | Sentry same-origin tunnel (not for manual use) |

**Single source of truth for in-app docs:** [`src/data/project-api-registry.ts`](src/data/project-api-registry.ts).

**Auth pattern:** Admin routes call `assertAdminSession()` which verifies the HMAC-signed httpOnly cookie set at login.

---

## Admin Control Room

1. Visit **`/admin/control-room`**.
2. Enter the **6-digit passkey** matching `ADMIN_DASHBOARD_KEY`.
3. Navigate via sidebar: Overview, Composer, Subscribers, Explore, API Docs, API Status.

**Local learning example** (demo only — use strong secrets in production):

```env
ADMIN_DASHBOARD_KEY=112233
ADMIN_SESSION_SECRET=local-dev-session-secret-change-me
```

Log in with passkey **`112233`**.

Without `ADMIN_DASHBOARD_KEY`, the UI explains that the control room is disabled. Sending mail and persisting drafts additionally require Resend + Upstash configuration.

---

## How Key Features Work

### TheCocktailDB integration

[`src/lib/api.ts`](src/lib/api.ts) builds URLs from `NEXT_PUBLIC_API_BASE_URL` (defaults to the free v1 JSON API). Server components call `fetchCocktails(term)` and `fetchCocktailById(id)` for SSR.

```ts
// Simplified — search by name
const url = `${baseUrl}/search.php?s=${encodeURIComponent(term)}`;
```

No API key is required. Respect TheCocktailDB [terms of use](https://www.thecocktaildb.com/api.php) for production traffic.

### Favorites (client-only state)

[`src/lib/favorites-storage.ts`](src/lib/favorites-storage.ts) wraps `localStorage` with guards so SSR and client renders do not mismatch—read favorites after mount, dispatch sync events across tabs.

### Newsletter security (HMAC tokens)

[`src/lib/newsletter/security.ts`](src/lib/newsletter/security.ts) signs confirm/unsubscribe URLs. Tokens cannot be forged without `NEWSLETTER_*_SECRET` server keys.

**Flow:**

```text
Subscribe → pending record in Redis → confirmation email
    → user clicks link → POST /api/newsletter/confirm → active subscriber
    → welcome email (optional path in service layer)
```

### Broadcast pipeline

Composer → `save-draft` (Redis) → `send-post` or schedule → `queue` → `process-queue` (cron or manual) → Resend batch → `history` for resends.

**Always set `NEXT_PUBLIC_APP_URL` in production** so email links resolve to your real domain.

### Rate limiting

[`src/lib/newsletter/rate-limit.ts`](src/lib/newsletter/rate-limit.ts) uses Upstash Redis sliding windows on public newsletter routes and admin AI assist.

### SEO & crawlers

[`app/layout.tsx`](app/layout.tsx) exports rich metadata (Open Graph, Twitter, JSON-LD). [`app/robots.ts`](app/robots.ts) allows marketing pages, disallows `/api/` for crawlers, and blocks common AI user-agents.

---

## Observability (Sentry)

When `NEXT_PUBLIC_SENTRY_DSN` is set at **build time**, Sentry captures client and server errors. The SDK POSTs to same-origin **`/api/monitoring`** instead of `ingest.sentry.io`, bypassing ad blockers.

- Config: `instrumentation.ts`, `instrumentation-client.ts`, `sentry.server.config.ts`
- Noise filters: `src/lib/sentry-filters.ts` (extensions, transport failures)
- SDK is **disabled when DSN is empty** — safe for local dev without keys

See [`docs/Redis_Sentry_PostHog_INTEGRATION_GUIDE.md`](docs/Redis_Sentry_PostHog_INTEGRATION_GUIDE.md) §2A.

---

## Reusing Components in Other Projects

| Piece                    | File(s)                               | Reuse idea                                                                                                                                 |
| ------------------------ | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Safe image**           | `src/components/ui/safe-image.tsx`    | Next/Image wrapper with fallbacks for broken URLs. Guide: [`docs/SAFE_IMAGE_REUSABLE_COMPONENT.md`](docs/SAFE_IMAGE_REUSABLE_COMPONENT.md) |
| **Ripple button**        | `src/components/ui/ripple-button.tsx` | Accessible button with feedback animation. Guide: [`docs/RIPPLE_BUTTON_EFFECT.md`](docs/RIPPLE_BUTTON_EFFECT.md)                           |
| **Card / Badge / Input** | `src/components/ui/*`                 | Copy into another Tailwind + CVA project.                                                                                                  |
| **Query provider**       | `src/providers/query-provider.tsx`    | Standard TanStack Query + Devtools wiring.                                                                                                 |
| **Newsletter context**   | `src/context/newsletter-context.tsx`  | Client signup state + Sonner toasts pattern.                                                                                               |
| **API registry**         | `src/data/project-api-registry.ts`    | Document your APIs in one typed array; render in-app docs.                                                                                 |
| **AI fallback**          | `src/lib/admin/ai-provider-models.ts` | Portable provider + model chain registry.                                                                                                  |
| **Newsletter lib**       | `src/lib/newsletter/*`                | Adapt double opt-in + HMAC pattern to other products.                                                                                      |

When porting, replace `@/…` imports with your alias and align `tailwind.config.ts` theme tokens.

---

## Testing

```bash
npm run test          # Vitest — newsletter routes, admin auth, AI model registry
npm run test:e2e      # Playwright smoke — / and /about
npm run lint
npm run build
```

| Test file                          | Covers                               |
| ---------------------------------- | ------------------------------------ |
| `tests/newsletter-routes.test.ts`  | Newsletter handler validation        |
| `tests/admin-api-auth.test.ts`     | Admin session gate                   |
| `tests/ai-provider-models.test.ts` | AI model chains and retriable errors |
| `e2e/smoke.spec.ts`                | Basic page loads                     |

CI runs on push/PR to `main`: [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

---

## Deployment (Vercel)

1. Connect [github.com/arnobt78/09-mixmaster](https://github.com/arnobt78/09-mixmaster) to Vercel.
2. Set environment variables per tier (minimum: `NEXT_PUBLIC_APP_URL` for production).
3. Deploy — Node 24.x is used via `engines` in `package.json`.
4. Verify newsletter confirm links and admin login on the production URL.
5. Optional: Sentry DSN at build time, Vercel Firewall per [`docs/VERCEL_PRODUCTION_GUARDRAILS.md`](docs/VERCEL_PRODUCTION_GUARDRAILS.md).

---

## Further Reading

| Resource                                                                                           | Description                                  |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| [`docs/LLM_MODEL_SELECTION.md`](docs/LLM_MODEL_SELECTION.md)                                       | Free-tier AI providers and fallback strategy |
| [`docs/Redis_Sentry_PostHog_INTEGRATION_GUIDE.md`](docs/Redis_Sentry_PostHog_INTEGRATION_GUIDE.md) | Sentry, Redis, observability setup           |
| [`docs/VERCEL_PRODUCTION_GUARDRAILS.md`](docs/VERCEL_PRODUCTION_GUARDRAILS.md)                     | Production checklist                         |
| [`docs/UI_STYLING_GUIDE.md`](docs/UI_STYLING_GUIDE.md)                                             | Design tokens and patterns                   |
| [`SECURITY.md`](SECURITY.md)                                                                       | Private vulnerability reporting              |
| [Next.js Docs](https://nextjs.org/docs)                                                            | App Router reference                         |
| [TheCocktailDB API](https://www.thecocktaildb.com/api.php)                                         | External cocktail data                       |
| [TanStack Query](https://tanstack.com/query/latest)                                                | Server state on the client                   |
| [Resend Docs](https://resend.com/docs)                                                             | Email API                                    |
| [Upstash Redis REST](https://upstash.com/docs/redis)                                               | Serverless Redis                             |

---

## Contributing

Issues and pull requests are welcome: bug fixes, documentation improvements, and small focused features. Please run `npm run lint`, `npm run test`, and `npm run build` before submitting.

For security-sensitive findings, email [contact@arnobmahmud.com](mailto:contact@arnobmahmud.com) per [SECURITY.md](./SECURITY.md)—do not open public issues for vulnerabilities.

---

## Conclusion

**MixMaster** is both a usable cocktail explorer and a structured learning lab for modern full-stack patterns—SSR + client state, typed APIs, email flows, optional AI, and a gated admin surface. Start with zero configuration, then enable environment tiers one at a time until you reach a full newsletter + control room deployment. Adapt the `lib/` modules and UI primitives into your own projects with confidence.

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of the license.

---

## Happy Coding! 🎉

This is an **open-source project** - feel free to use, enhance, and extend this project further!

If you have any questions or want to share your work, reach out via GitHub or my portfolio at [https://www.arnobmahmud.com](https://www.arnobmahmud.com).
