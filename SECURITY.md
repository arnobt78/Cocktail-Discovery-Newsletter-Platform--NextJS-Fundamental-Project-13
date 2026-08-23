# Security Policy

## Reporting a Vulnerability

If you discover a security issue in MixMaster, please report it **privately**:

- **Email:** [contact@arnobmahmud.com](mailto:contact@arnobmahmud.com)
- **Do not** open a public GitHub issue for security-sensitive findings.

Include:

- Steps to reproduce
- Affected routes, components, or environment variables
- Impact assessment if known (data exposure, auth bypass, etc.)

We aim to acknowledge reports within a reasonable timeframe and will coordinate disclosure responsibly.

## Scope

This policy covers the MixMaster application repository and its deployed instance at [cocktails-newsletter.vercel.app](https://cocktails-newsletter.vercel.app), including:

- Public pages and API routes under `/api/newsletter/*`
- Admin control room (`/admin/control-room`) and `/api/admin/*`
- Sentry monitoring tunnel at `/api/monitoring` (error envelope forwarding only)
- Newsletter, session, and broadcast integrations (Resend, Upstash Redis)
- Optional AI composer assist routes (`/api/admin/ai/composer-assist`)

## Out of Scope

- TheCocktailDB third-party API availability or content
- Issues in dependencies without a demonstrable impact on this application
- Social engineering or physical attacks
- Denial-of-service testing against production without prior written consent

## Secrets and Configuration

- Never commit `.env`, `.env.local`, or real API keys.
- Use [`.env.example`](.env.example) placeholders only in documentation and examples.
- **Admin access:** `ADMIN_DASHBOARD_KEY` (passkey) + HMAC-signed httpOnly session cookie (`ADMIN_SESSION_SECRET`).
- **Newsletter:** confirm/unsubscribe links use server-side HMAC tokens (`NEWSLETTER_*_SECRET`).
- **Cron:** `CRON_DIGEST_SECRET` protects automated digest endpoints.
- **Sentry:** `SENTRY_AUTH_TOKEN` is build/CI-only; never expose to the browser.

## Supported Versions

Security fixes are applied to the active `main` branch and the production Vercel deployment. Older forks or snapshots are not officially supported.

## Safe Harbor

Good-faith security research that avoids privacy violations, data destruction, and service disruption is welcome. Do not access data that is not yours or exceed what is needed to demonstrate a vulnerability.
