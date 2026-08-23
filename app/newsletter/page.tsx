import type { Metadata } from "next";
import { MailCheck, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { NewsletterPageContent } from "@/components/pages/NewsletterPageContent";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Subscribe to the MixMaster weekly digest for cocktail picks, UI craft notes, and production-ready tips.",
};

/** Server shell: stable hero for first paint; signup form in NewsletterPageContent. */
export default function Newsletter() {
  return (
    <section className="mx-auto w-full max-w-9xl px-4 py-10 sm:px-8">
      <div className="mb-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-cyan-200">
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          Weekly digest
        </div>
        <Badge className="border border-emerald-300/35 bg-emerald-500/15 text-emerald-100">
          Free · opt-in required
        </Badge>
      </div>

      <h1 className="flex flex-wrap items-center gap-2 text-2xl font-bold text-white font-heading sm:text-3xl">
        <MailCheck className="h-8 w-8 shrink-0 text-cyan-200" aria-hidden />
        MixMaster dispatch
      </h1>

      <p className="mt-2 text-base font-medium leading-relaxed text-slate-200">
        One email a week for people who care about craft drinks and polished
        frontends—short, practical, and easy to skim on a Friday afternoon.
      </p>

      <p className="mt-3 text-sm uppercase tracking-[0.22em] text-cyan-200/90">
        Cocktail finds · interface craft · ship-with-confidence checklists
      </p>

      <p className="mt-4 text-sm leading-relaxed text-slate-400">
        Small batch updates from the same team building this app: what we
        are pouring, how we structure complex UI, and the strategies we use
        before every production deploy.
      </p>

      <NewsletterPageContent />
    </section>
  );
}
