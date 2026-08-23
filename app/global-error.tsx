"use client";

/** Root error boundary — reports uncaught render errors to Sentry when DSN is configured. */
import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-950 p-6 text-slate-100">
        <h2 className="text-xl font-semibold">Something went wrong</h2>
        <p className="text-sm text-slate-400">An unexpected error occurred. You can try again.</p>
        <button
          type="button"
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500"
          onClick={() => reset()}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
