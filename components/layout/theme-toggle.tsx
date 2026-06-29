"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme-context";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
  compact?: boolean;
};

export function ThemeToggle({ className, compact = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "flex items-center gap-2 rounded-xl border border-border bg-surface-muted transition-all hover:border-gold/40",
        compact ? "h-9 w-9 justify-center" : "w-full px-3 py-2.5",
        className
      )}
      aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-gold" />
      ) : (
        <Moon className="h-4 w-4 text-gold-dark" />
      )}
      {!compact && (
        <span className="text-sm text-charcoal">
          {isDark ? "Modo claro" : "Modo oscuro"}
        </span>
      )}
    </button>
  );
}
