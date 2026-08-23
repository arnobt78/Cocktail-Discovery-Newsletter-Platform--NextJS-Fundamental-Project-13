import * as Sentry from "@sentry/nextjs";
import {
  getClientSentryDsn,
  getTracesSampleRate,
  SENTRY_TUNNEL_ROUTE,
} from "@/lib/sentry-env";
import {
  SENTRY_DENY_URLS,
  SENTRY_IGNORE_ERRORS,
  sentryBeforeSend,
} from "@/lib/sentry-filters";

Sentry.init({
  dsn: getClientSentryDsn(),
  enabled: !!getClientSentryDsn(),
  tunnel: SENTRY_TUNNEL_ROUTE,
  tracesSampleRate: getTracesSampleRate(),
  environment: process.env.NODE_ENV || "development",
  debug: false,
  ignoreErrors: SENTRY_IGNORE_ERRORS,
  denyUrls: SENTRY_DENY_URLS,
  beforeSend: sentryBeforeSend,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
