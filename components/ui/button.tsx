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
        "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all active:scale-[0.98] disabled:opacity-50",
        variant === "primary" &&
          "brand-gradient text-white shadow-md shadow-brand-blue/20 hover:shadow-lg",
        variant === "secondary" &&
          "bg-charcoal text-white hover:bg-charcoal/90",
        variant === "ghost" && "bg-transparent text-muted hover:bg-surface-muted",
        variant === "outline" &&
          "border border-border bg-surface text-foreground hover:border-gold/40",
        size === "sm" && "px-4 py-2 text-sm",
        size === "md" && "px-6 py-3 text-sm",
        size === "lg" && "px-8 py-4 text-base",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
