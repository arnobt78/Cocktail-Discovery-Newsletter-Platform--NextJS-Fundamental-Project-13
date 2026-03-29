import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function ScrollPanel({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "admin-scroll-panel w-full min-h-0 overflow-y-auto overflow-x-hidden rounded-lg border border-white/10 bg-black/20 p-1.5",
        className,
      )}
    >
      {children}
    </div>
  );
}
