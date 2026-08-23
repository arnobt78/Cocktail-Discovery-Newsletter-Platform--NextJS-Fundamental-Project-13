# Risk Register — MixMaster C1

<!-- Append-only, cycle-tagged | Format: RISK-ID | Cycle | Category | Severity | Status -->

| ID | Cycle | Category | Description | Likelihood | Impact | Severity | Mitigation | Owner | Status |
|----|-------|----------|-------------|------------|--------|----------|------------|-------|--------|
| RISK-0001 | C1 | Security | `.env` not in `.cursorignore`; secrets may enter AI context | Med | High | **High** | Add `.cursorignore`; never commit `.env` | Agent + User | open |
| RISK-0002 | C1 | Security | `ADMIN_DASHBOARD_KEY` is a short passkey; README documents demo `112233` | Med | Med | **Medium** | Document production hardening; optional rate-limit on login | User | open |
| RISK-0003 | C1 | Process | API registry drift causes wrong admin/integration assumptions | Med | Med | **Medium** | TASK-0004 fix registry; add consistency test | Agent | open |
| RISK-0004 | C1 | Technical | Sentry env vars present but integration missing — false sense of observability | Med | Med | **Medium** | TASK-0009 or remove placeholders until ready | User | open |
| RISK-0005 | C1 | Technical | Admin auth duplicated across routes — inconsistent 401 behavior risk | Low | Med | **Medium** | TASK-0007 centralize on `assertAdminSession` | Agent | open |
| RISK-0006 | C1 | Compliance | No CI — regressions can reach `main` undetected | Med | Med | **Medium** | TASK-0011 GitHub Actions | Agent | open |
| RISK-0007 | C1 | Operational | Vercel bot traffic can exceed free tier (see guardrails doc incident) | Med | High | **High** | Dashboard bot protection (human-action); robots.ts already configured | User | open |
| RISK-0008 | C1 | Technical | Newsletter/rate-limit throws if Redis unset — public POST returns 500 | Low | Med | **Low** | Document Tier 1 env requirement; graceful degradation is future CR | — | accepted |

## Severity Matrix Reference

- Critical: High × High
- High: High × Med or Med × High
- Medium: Med × Med
- Low: otherwise
