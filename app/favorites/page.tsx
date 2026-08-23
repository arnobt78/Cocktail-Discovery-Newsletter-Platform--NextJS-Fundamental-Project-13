import type { Metadata } from "next";
import { Heart } from "lucide-react";
import { FavoritesPageContent } from "@/components/pages/FavoritesPageContent";

export const metadata: Metadata = {
  title: "My Favorites",
  description:
    "View and manage your saved cocktail favorites in MixMaster.",
};

/** Server shell: stable heading for first paint; list hydration in FavoritesPageContent. */
export default function Favorites() {
  return (
    <section className="mx-auto w-full max-w-9xl px-4 py-8 sm:px-8">
      <div className="glass-panel mb-8 rounded-[26px] border-rose-300/20 p-6 shadow-[0_25px_80px_rgba(244,63,94,0.2)]">
        <div className="inline-flex items-center gap-2 rounded-full border border-rose-300/30 bg-rose-400/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-rose-200">
          <Heart className="h-3.5 w-3.5" aria-hidden />
          Favorites
        </div>
        <h1 className="mt-3 text-2xl font-bold text-white font-heading sm:text-3xl">
          Your Favorite Cocktails
        </h1>
        <p className="mt-2 text-slate-300">
          Saved drinks appear here for faster access and comparison.
        </p>
        <FavoritesPageContent />
      </div>
    </section>
  );
}
