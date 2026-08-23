import type { ErrorEvent } from "@sentry/core";

/** Shared ignore list for client, server, and edge Sentry runtimes. */
export const SENTRY_IGNORE_ERRORS: Array<string | RegExp> = [
  "ResizeObserver loop limit exceeded",
  "Non-Error promise rejection captured",
  "Script error.",
  /Loading chunk [\d]+ failed/,
  "top.GLOBALS",
  "AbortError",
  // Ad blockers / privacy extensions blocking ingest (tunnel should prevent most of these)
  "ERR_BLOCKED_BY_CLIENT",
  /Failed to fetch/i,
  /NetworkError/i,
  /Load failed/i,
  /Network request failed/i,
  /blocked by client/i,
  // Sentry transport noise when a blocker still intercepts a request
  /ingest\.sentry\.io/i,
  /sentry\.io\/api/i,
];

/** Client-only: do not report errors originating from these URLs. */
export const SENTRY_DENY_URLS: RegExp[] = [
  /extensions\//i,
  /^chrome:\/\//i,
  /^chrome-extension:\/\//i,
  /^moz-extension:\/\//i,
  /ingest\.sentry\.io/i,
  /sentry\.io\/api/i,
];

const THIRD_PARTY_PATTERNS = [
  /chrome-extension:\/\//i,
  /moz-extension:\/\//i,
  /grammarly/i,
  /googletranslate/i,
  /metamask/i,
];

const TRANSPORT_NOISE_PATTERNS = [
  /ERR_BLOCKED_BY_CLIENT/i,
  /blocked by client/i,
  /ingest\.sentry\.io/i,
  /sentry\.io\/api/i,
  /tunnel forward failed/i,
];

function isThirdPartyNoise(text: string): boolean {
  return THIRD_PARTY_PATTERNS.some((pattern) => pattern.test(text));
}

function isTransportNoise(text: string): boolean {
  return TRANSPORT_NOISE_PATTERNS.some((pattern) => pattern.test(text));
}

export function sentryBeforeSend(event: ErrorEvent): ErrorEvent | null {
  const text = JSON.stringify(event.exception ?? event.message ?? "");
  if (isThirdPartyNoise(text) || isTransportNoise(text)) {
    return null;
  }
  return event;
}
