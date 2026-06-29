import { cn } from "@/lib/utils";

type LogoProps = {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
  variant?: "light" | "dark";
};

const sizes = {
  sm: { ring: 36, name: "text-sm", sub: "text-[7px]", mark: 18 },
  md: { ring: 48, name: "text-base", sub: "text-[8px]", mark: 22 },
  lg: { ring: 72, name: "text-xl", sub: "text-[9px]", mark: 32 },
};

function BrandMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size * 0.55} viewBox="0 0 32 18" fill="none" aria-hidden>
      <path d="M4 14 Q8 4 16 2 Q24 4 28 14" stroke="white" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
      <path d="M8 14 Q12 7 16 5 Q20 7 24 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.75" />
      <path d="M12 14 Q14 10 16 9 Q18 10 20 14" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

export function TerracotaLogo({
  size = "md",
  showText = true,
  className,
  variant = "dark",
}: LogoProps) {
  const s = sizes[size];
  const isDark = variant === "dark";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className="relative flex shrink-0 flex-col items-center justify-center overflow-hidden rounded-full"
        style={{
          width: s.ring,
          height: s.ring,
          background: "linear-gradient(145deg, #d2b48c 0%, #c2b280 42%, #a39382 100%)",
          boxShadow: "inset 0 2px 8px rgba(255,255,255,0.18), 0 0 0 1px rgba(194,178,128,0.35)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background: "linear-gradient(135deg, transparent 40%, rgba(0,0,0,0.2) 100%)",
          }}
        />
        <BrandMark size={s.mark} />
      </div>

      {showText && (
        <div>
          <p
            className={cn(
              "font-display font-semibold uppercase leading-none tracking-[0.12em]",
              s.name,
              isDark ? "text-white" : "text-charcoal"
            )}
          >
            Terracota
          </p>
          <p
            className={cn(
              "mt-1 uppercase leading-none tracking-[0.28em]",
              s.sub,
              isDark ? "text-white/40" : "text-muted"
            )}
          >
            by Smile More Spa
          </p>
        </div>
      )}
    </div>
  );
}

export const GroupLogo = TerracotaLogo;
