"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Eye, EyeOff, Lock, ShieldCheck } from "lucide-react";
import { TerracotaLogo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { terracota } from "@/lib/clinics";
import { aestheticDoctor } from "@/lib/mock-data";
import { useTheme } from "@/lib/theme-context";

type Role = "patient" | "doctor";

const DEMO_CREDENTIALS = {
  patient: { email: "maria.gonzalez@terracota.mcbo", password: "terracota2026" },
  doctor:  { email: aestheticDoctor.email, password: "terracota2026" },
};

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role");
  const accent = terracota.accent;
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [role, setRole] = useState<Role>(roleParam === "doctor" ? "doctor" : "patient");
  const [email, setEmail] = useState(DEMO_CREDENTIALS.patient.email);
  const [password, setPassword] = useState("terracota2026");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  function switchRole(r: Role) {
    setRole(r);
    setEmail(DEMO_CREDENTIALS[r].email);
    setPassword("terracota2026");
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((res) => setTimeout(res, 900));
    router.push(role === "doctor" ? "/doctor" : "/home");
  }

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-background px-5 py-12">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background: isDark
            ? `radial-gradient(circle at 30% 20%, ${accent}22 0%, transparent 50%), radial-gradient(circle at 70% 80%, ${accent}11 0%, transparent 40%)`
            : `radial-gradient(circle at 30% 20%, rgba(194,178,128,0.25) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(210,180,140,0.15) 0%, transparent 40%)`,
        }}
      />

      <div className="absolute left-6 top-6 z-20 flex items-center gap-2">
        <Link
          href="/"
          className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-muted shadow-sm transition-all hover:border-gold/40 hover:text-charcoal active:scale-95"
        >
          <ArrowLeft className="h-4 w-4" />
          Inicio
        </Link>
        <ThemeToggle compact />
      </div>

      <div className="relative z-10 w-full max-w-[420px]">
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface p-8 shadow-lg">
          <div className="mb-8 text-center">
            <div className="mb-6 flex justify-center">
              <TerracotaLogo size="md" variant={isDark ? "dark" : "light"} />
            </div>
            <h1 className="font-display text-3xl font-black text-charcoal">
              Bienvenida, <span className="italic text-gold">María</span>
            </h1>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Portal Terracota · acceso seguro a citas y expediente.
            </p>
          </div>

          <div className="mb-6 flex rounded-2xl border border-border bg-surface-muted p-1">
            {(["patient", "doctor"] as Role[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => switchRole(r)}
                className={`flex-1 rounded-xl py-2.5 text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${
                  role === r
                    ? "border border-border bg-surface text-charcoal shadow-sm"
                    : "text-muted hover:text-charcoal"
                }`}
              >
                {r === "patient" ? "Paciente" : "Médico"}
              </button>
            ))}
          </div>

          <div className="mb-6 rounded-2xl border border-gold/30 bg-gold-subtle p-4">
            <div className="mb-1 flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
              </span>
              <p className="text-[9px] font-bold uppercase tracking-widest text-gold-dark">
                Acceso Demo
              </p>
            </div>
            <p className="text-xs font-mono tracking-tight text-charcoal">{DEMO_CREDENTIALS[role].email}</p>
            <p className="mt-0.5 text-[11px] font-mono text-muted">Contraseña: terracota2026</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-muted">
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-border bg-surface-muted px-4 py-3 text-sm text-charcoal outline-none transition-all focus:border-gold/50 focus:bg-surface focus:ring-2 focus:ring-gold/10"
                required
              />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-muted">
                  Contraseña
                </label>
                <button type="button" className="text-[10px] font-semibold text-gold-dark transition-colors hover:opacity-80">
                  ¿La olvidaste?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-border bg-surface-muted px-4 py-3 pr-11 text-sm text-charcoal outline-none transition-all focus:border-gold/50 focus:bg-surface focus:ring-2 focus:ring-gold/10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-charcoal"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative mt-2 flex w-full items-center justify-center overflow-hidden rounded-xl py-3.5 text-sm font-bold text-white transition-all active:scale-[0.98] hover:brightness-110 disabled:opacity-70 gold-gradient"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Verificando...
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  Iniciar sesión
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              )}
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-5 border-t border-border pt-6">
            <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-muted">
              <ShieldCheck className="h-4 w-4 text-gold" />
              Conexión Cifrada
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-muted">
              <Lock className="h-4 w-4 text-gold" />
              Área Médica Segura
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-muted">
          ¿No tienes acceso?{" "}
          <span className="cursor-pointer font-semibold text-gold-dark hover:underline">
            Solicitar alta en recepción
          </span>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-background" />}>
      <LoginForm />
    </Suspense>
  );
}
