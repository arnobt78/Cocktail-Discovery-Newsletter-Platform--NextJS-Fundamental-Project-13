/** Sentry DSN helpers — SDK stays disabled when DSN env vars are empty (safe local dev). */
export function getClientSentryDsn(): string | undefined {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN?.trim();
  return dsn || undefined;
}

export function getServerSentryDsn(): string | undefined {
  const dsn =
    process.env.SENTRY_DSN?.trim() || process.env.NEXT_PUBLIC_SENTRY_DSN?.trim();
  return dsn || undefined;
}

/** DSN allowlist for tunnel forwarding (SSRF protection when using an explicit handler). */
export function getAllowedSentryDsns(): string[] {
  return [getClientSentryDsn(), getServerSentryDsn()].filter(
    (dsn): dsn is string => Boolean(dsn),
  );
}

export function getTracesSampleRate(): number {
  return process.env.NODE_ENV === "production" ? 0.1 : 1.0;
}

/** Same-origin tunnel path — withSentryConfig registers the rewrite at build time. */
export const SENTRY_TUNNEL_ROUTE = "/api/monitoring";
