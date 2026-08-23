"use client";

/** Interactive about content — static h1 shell is server-rendered in app/about/page.tsx. */
import {
  BookOpenText,
  Layers3,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { aboutText, beginnerTips, featureHighlights } from "@/data/content";

export function AboutPageContent() {
  return (
    <>
      <p className="mb-8 leading-7 text-slate-200">{aboutText}</p>

      <div className="mb-8 grid gap-4 md:grid-cols-2">
        {featureHighlights.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: index % 2 === 0 ? -16 : 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.06 }}
            whileHover={{ y: -4 }}
          >
            <Card className="rounded-xl border border-white/10 bg-white/[0.04] p-4 text-slate-100 transition duration-200 hover:border-emerald-300/35 hover:bg-white/[0.06] hover:shadow-[0_16px_40px_rgba(16,185,129,0.18)]">
              <div className="mb-2 flex items-center gap-2">
                {index % 2 === 0 ? (
                  <Layers3 className="h-4 w-4 text-cyan-200" />
                ) : (
                  <ShieldCheck className="h-4 w-4 text-emerald-200" />
                )}
                <h3 className="text-base font-semibold text-white">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm text-slate-300">{item.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <h2 className="mb-2 inline-flex items-center gap-2 text-2xl font-semibold text-white">
        <BookOpenText className="h-5 w-5 text-cyan-200" />
        Implementation Notes
      </h2>
      <p className="mb-4 text-sm text-slate-300">
        Practical notes for understanding architecture, safety, and production
        behavior.
      </p>
      <ul className="space-y-3">
        {beginnerTips.map((tip, index) => (
          <motion.li
            key={tip}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, delay: index * 0.04 }}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2"
          >
            <Badge className="bg-emerald-400/25 text-emerald-100">{`Tip ${index + 1}`}</Badge>
            <span className="ml-3 text-slate-200">{tip}</span>
          </motion.li>
        ))}
      </ul>
    </>
  );
}
