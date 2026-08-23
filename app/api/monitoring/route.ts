import { handleTunnelRequest } from "@sentry/core";
import { getAllowedSentryDsns } from "@/lib/sentry-env";

export const runtime = "nodejs";

/**
 * Same-origin Sentry tunnel — complements withSentryConfig tunnelRoute rewrite.
 * Client SDK POSTs here (not ingest.sentry.io) so ad blockers cannot block outbound ingest.
 * Returns 204 when DSN is unset (no false 500 noise in dev/CI).
 */
export async function POST(request: Request): Promise<Response> {
  const allowedDsns = getAllowedSentryDsns();
  if (allowedDsns.length === 0) {
    return new Response(null, { status: 204 });
  }

  try {
    return await handleTunnelRequest({
      request,
      allowedDsns,
    });
  } catch {
    return new Response(null, { status: 502 });
  }
}
