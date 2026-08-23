/** Next.js instrumentation hook — loads Sentry per runtime without converting layout to client. */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }
  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}

const SENSITIVE_REQUEST_HEADERS = new Set([
  "cookie",
  "authorization",
  "x-cron-secret",
  "x-api-key",
]);

function redactRequestHeaders(
  headers: Record<string, string | string[] | undefined>,
): Record<string, string | string[] | undefined> {
  const redacted: Record<string, string | string[] | undefined> = {};
  for (const [key, value] of Object.entries(headers)) {
    redacted[key] = SENSITIVE_REQUEST_HEADERS.has(key.toLowerCase())
      ? "[Redacted]"
      : value;
  }
  return redacted;
}

export const onRequestError = async (
  error: unknown,
  request: {
    path: string;
    method: string;
    headers: Record<string, string | string[] | undefined>;
  },
  context: { routerKind: string; routePath: string; routeType: string },
) => {
  const Sentry = await import("@sentry/nextjs");
  Sentry.captureException(error, {
    extra: {
      request: {
        path: request.path,
        method: request.method,
        headers: redactRequestHeaders(request.headers),
      },
      context,
    },
  });
};
