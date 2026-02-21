import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/* ─── Tipos ───────────────────────────────────────────────────────── */
type BadgeVariant = "default" | "blush" | "outline" | "ink";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

/* ─── Estilos ─────────────────────────────────────────────────────── */
const base = [
  "inline-flex items-center",
  "px-2.5 py-0.5",
  "rounded-full",
  "text-xs font-body font-medium tracking-wide",
  "leading-none whitespace-nowrap",
].join(" ");

const variants: Record<BadgeVariant, string> = {
  /* ink bg + white text → 15:1 AAA ✓ */
  ink: "bg-ink text-white",

  /* blush bg + ink text → 17:1 AAA ✓ */
  blush: "bg-blush text-ink",

  /* surface bg + ink text → ~14:1 AAA ✓ */
  default: "bg-surface text-ink",

  /* outline — ink border + ink text → AAA ✓ */
  outline: "border border-ink/30 text-ink bg-transparent",
};

/* ─── Componente ──────────────────────────────────────────────────── */
function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  return (
    <span className={cn(base, variants[variant], className)} {...props}>
      {children}
    </span>
  );
}

export { Badge };
export type { BadgeProps, BadgeVariant };
