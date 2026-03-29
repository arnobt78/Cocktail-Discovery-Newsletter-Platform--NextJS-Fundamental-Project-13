"use client";

import { SafeImage } from "@/components/ui/safe-image";

const CARD_THUMB = 400;

const CONTAIN_IMG_CLASS =
  "h-auto w-auto max-h-full max-w-full object-contain object-center";

const CONTAIN_IMG_STYLE = {
  width: "auto",
  height: "auto",
  maxWidth: "100%",
  maxHeight: "100%",
} as const;

/**
 * Fixed-height card image: background blur uses fill; foreground uses intrinsic
 * size + max bounds + flex min-w-0 so layout does not briefly expand to full width.
 */
export function CocktailCardMedia({
  src,
  alt,
  sizes = "(max-width: 1200px) 100vw, 33vw",
}: {
  src: string;
  alt: string;
  sizes?: string;
}) {
  return (
    <div className="relative h-56 w-full min-w-0 overflow-hidden bg-gradient-to-br from-slate-900/70 via-slate-800/60 to-emerald-950/40">
      <SafeImage
        src={src}
        alt=""
        fill
        className="object-cover blur-sm scale-110 opacity-45"
        sizes={sizes}
        aria-hidden
      />
      <div className="absolute inset-0 z-[1] flex min-h-0 min-w-0 items-center justify-center p-2">
        <div className="flex h-full max-h-full w-full max-w-full min-w-0 items-center justify-center">
          <SafeImage
            src={src}
            alt={alt}
            width={CARD_THUMB}
            height={CARD_THUMB}
            className={CONTAIN_IMG_CLASS}
            style={CONTAIN_IMG_STYLE}
            sizes={sizes}
          />
        </div>
      </div>
    </div>
  );
}

const HERO_THUMB = 700;

export function CocktailHeroMedia({
  src,
  alt,
  sizes = "(max-width: 1024px) 100vw, 50vw",
}: {
  src: string;
  alt: string;
  sizes?: string;
}) {
  return (
    <div className="relative h-[20rem] w-full min-w-0 overflow-hidden sm:h-[26rem]">
      <SafeImage
        src={src}
        alt=""
        fill
        className="object-cover blur-sm scale-110 opacity-45"
        sizes={sizes}
        priority
        aria-hidden
      />
      <div className="absolute inset-0 z-[1] flex min-h-0 min-w-0 items-center justify-center p-2">
        <div className="flex h-full max-h-full w-full max-w-full min-w-0 items-center justify-center">
          <SafeImage
            src={src}
            alt={alt}
            width={HERO_THUMB}
            height={HERO_THUMB}
            className={CONTAIN_IMG_CLASS}
            style={CONTAIN_IMG_STYLE}
            sizes={sizes}
            priority
          />
        </div>
      </div>
    </div>
  );
}
