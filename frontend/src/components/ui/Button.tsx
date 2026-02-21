import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

/* ─── Tipos ───────────────────────────────────────────────────────── */
type Variant = "primary" | "secondary" | "ghost";
type Size    = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

/* ─── Estilos base y variantes ────────────────────────────────────── */
const base = [
  /* Layout */
  "inline-flex items-center justify-center gap-2",
  /* Tipografía */
  "font-body font-medium tracking-wide",
  /* Transición */
  "transition-colors duration-150",
  /* Accesibilidad — focus visible WCAG 2.4.7 */
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
  /* Disabled */
  "disabled:pointer-events-none disabled:opacity-40",
  /* Cursor */
  "cursor-pointer select-none",
].join(" ");

const variants: Record<Variant, string> = {
  /* ink bg (#1A1A1A) + white text → 15:1 AAA ✓ */
  primary:
    "bg-ink text-white hover:bg-ink/85 active:bg-ink/70",

  /* blush bg (#FFE0E9) + ink text → 17:1 AAA ✓ */
  secondary:
    "bg-blush text-ink border border-blush-dark hover:bg-blush-dark active:bg-blush-dark/80",

  /* Transparente + ink text → 15:1 AAA ✓ */
  ghost:
    "bg-transparent text-ink border border-ink/20 hover:bg-blush hover:border-blush-dark active:bg-blush-dark/60",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm rounded-sm",
  md: "px-6 py-3 text-base rounded-md",
  lg: "px-8 py-4 text-lg rounded-lg",
};

/* ─── Componente ──────────────────────────────────────────────────── */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", type = "button", children, ...props },
    ref
  ) => (
    <button
      ref={ref}
      type={type}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  )
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps, Variant as ButtonVariant, Size as ButtonSize };
