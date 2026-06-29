import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all active:scale-[0.98] disabled:opacity-50",
        variant === "primary" &&
          "gold-gradient text-white shadow-md hover:brightness-110",
        variant === "secondary" &&
          "border border-[var(--taupe)] bg-[var(--taupe-muted)] text-white hover:border-[var(--gold)]",
        variant === "ghost" && "bg-transparent text-muted hover:bg-surface-muted hover:text-white",
        variant === "outline" &&
          "border border-white/15 bg-transparent text-white/80 hover:border-[var(--gold)] hover:text-white",
        size === "sm" && "px-4 py-2 text-sm",
        size === "md" && "px-6 py-3 text-sm",
        size === "lg" && "px-8 py-4 text-base",
        className
      )}
      style={variant === "primary" ? { boxShadow: "var(--shadow-gold)" } : undefined}
      {...props}
    >
      {children}
    </button>
  );
}
