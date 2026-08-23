import type { Metadata } from "next";
import { FlaskConical, Sparkles } from "lucide-react";
import { AboutPageContent } from "@/components/pages/AboutPageContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how MixMaster combines cocktail discovery, newsletter flows, and admin tooling with Next.js, React, and TypeScript.",
};

/** Server shell: stable heading for first paint; interactive body in AboutPageContent. */
export default function About() {
  return (
    <section className="mx-auto w-full max-w-9xl px-4 py-10 sm:px-8">
      <div className="glass-panel mx-auto max-w-9xl rounded-[26px] border-emerald-300/20 p-6 shadow-[0_25px_80px_rgba(16,185,129,0.2)] sm:p-8">
        <div className="mb-4 flex flex-col items-start gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-emerald-200">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            About
          </div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-white font-heading sm:text-3xl">
            <FlaskConical className="h-8 w-8 text-emerald-200" aria-hidden />
            About Us
          </h1>
        </div>
        <p className="mb-6 text-sm uppercase tracking-[0.25em] text-emerald-200/85">
          Build modern full-stack learning workflows with real product patterns
        </p>
        <AboutPageContent />
      </div>
    </section>
  );
}
