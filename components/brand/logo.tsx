import { cn } from "@/lib/utils";

type LogoProps = {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
  variant?: "light" | "dark";
};

const sizes = {
  sm: { icon: 32, text: "text-base", sub: "text-[8px]" },
  md: { icon: 42, text: "text-xl",   sub: "text-[9px]" },
  lg: { icon: 56, text: "text-2xl",  sub: "text-[10px]" },
};

export function VitalCareLogo({
  size = "md",
  showText = true,
  className,
  variant = "light",
}: LogoProps) {
  const s = sizes[size];
  const isDark = variant === "dark";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Imagotipo: dos figuras humanas estilizadas (fiel al Instagram) */}
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 56 56"
        fill="none"
        aria-hidden
        className="shrink-0"
      >
        {/* Fondo circular gradiente dorado */}
        <circle cx="28" cy="28" r="27" fill="url(#logo-gradient)" />
        <circle cx="28" cy="28" r="27" stroke="rgba(196,162,101,0.3)" strokeWidth="0.5" />

        {/* Figura izquierda (cuerpo femenino – nutrición) */}
        {/* Cabeza */}
        <circle cx="20" cy="14" r="4" fill="white" opacity="0.95" />
        {/* Cuerpo / torso con curva */}
        <path
          d="M14 22 Q15 19 20 19 Q25 19 26 22 L24 34 Q22 36 20 36 Q18 36 16 34 Z"
          fill="white"
          opacity="0.95"
        />
        {/* Brazo izquierdo levantado (estilizado) */}
        <path
          d="M14 22 Q10 20 9 16"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.9"
        />
        {/* Brazo derecho */}
        <path
          d="M26 22 Q28 21 29 19"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.9"
        />
        {/* Piernas */}
        <path
          d="M17 36 L15 45M23 36 L25 45"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Figura derecha (cuerpo masculino – estética) */}
        {/* Cabeza */}
        <circle cx="37" cy="13" r="4.5" fill="white" opacity="0.95" />
        {/* Cuerpo más ancho (masculino) */}
        <path
          d="M30 22 Q31 19 37 19 Q43 19 44 22 L42 34 Q40 36 37 36 Q34 36 32 34 Z"
          fill="white"
          opacity="0.9"
        />
        {/* Brazo izquierdo */}
        <path
          d="M30 22 Q27 24 26 28"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.85"
        />
        {/* Brazo derecho levantado */}
        <path
          d="M44 22 Q48 18 49 15"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.9"
        />
        {/* Piernas */}
        <path
          d="M34 36 L32 45M40 36 L42 45"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.85"
        />

        <defs>
          <linearGradient id="logo-gradient" x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7c5a2e" />
            <stop offset="0.45" stopColor="#c4a265" />
            <stop offset="1" stopColor="#dbc07a" />
          </linearGradient>
        </defs>
      </svg>

      {showText && (
        <div>
          <p
            className={cn(
              "font-display font-semibold tracking-wide leading-none",
              s.text,
              isDark ? "text-white" : "text-charcoal"
            )}
          >
            Vital Care
          </p>
          <p
            className={cn(
              "uppercase tracking-[0.3em] leading-none mt-1",
              s.sub,
              isDark ? "text-white/50" : "text-muted"
            )}
          >
            Clínica Estética
          </p>
        </div>
      )}
    </div>
  );
}
