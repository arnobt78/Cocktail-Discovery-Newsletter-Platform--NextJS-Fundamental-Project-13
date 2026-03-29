import { Suspense } from "react";
import { NewsletterUnsubscribeClient } from "./unsubscribe-client";

export default function NewsletterUnsubscribePage() {
  return (
    <Suspense
      fallback={
        <section className="mx-auto flex w-full max-w-9xl items-center justify-center px-4 py-12 sm:px-8">
          <div
            className="glass-panel w-full max-w-2xl rounded-2xl border-cyan-300/20 p-8 min-h-[22rem]"
            aria-hidden
          />
        </section>
      }
    >
      <NewsletterUnsubscribeClient />
    </Suspense>
  );
}
