"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, Lock, ShieldCheck, Stethoscope, User } from "lucide-react";
import { VitalCareLogo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";

type Role = "patient" | "doctor";

const DEMO_CREDENTIALS = {
  patient: { email: "maria.gonzalez@vitalcare.ca", password: "vitalcare2026" },
  doctor:  { email: "dr.bracho@vitalcare.ca",      password: "vitalcare2026" },
};

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole]               = useState<Role>("patient");
  const [email, setEmail]             = useState(DEMO_CREDENTIALS.patient.email);
  const [password, setPassword]       = useState("vitalcare2026");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]         = useState(false);

  // When role changes, update demo email
  function switchRole(r: Role) {
    setRole(r);
    setEmail(DEMO_CREDENTIALS[r].email);
    setPassword("vitalcare2026");
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Simulate auth delay
    await new Promise((res) => setTimeout(res, 900));
    router.push(role === "doctor" ? "/doctor" : "/home");
  }

  return (
    <div className="min-h-dvh flex">
      {/* ── Left Panel: Decorative (hidden on mobile) ── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col items-center justify-center dark-texture">
        {/* Ambient blobs */}
        <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-gold/10 blur-3xl animate-breathe" />
        <div className="absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-botanical/8 blur-3xl animate-breathe delay-300" />

        <div className="relative z-10 max-w-xs text-center">
          <VitalCareLogo size="lg" variant="dark" className="justify-center mb-8" />
          <h2 className="font-display text-3xl text-white leading-snug">
            Su bienestar,<br />
            <span className="font-script text-4xl text-gold">nuestra misión.</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-stone-400">
            Medicina estética avanzada y nutrición metabólica de precisión
            en Maracaibo, Venezuela.
          </p>

          {/* Pilares */}
          <div className="mt-8 flex flex-col gap-2">
            {["Belleza · Salud · Compromiso", "@vitalcare.ca · 26.8K seguidores", "Av 13A, Maracaibo, Venezuela"].map((t) => (
              <p key={t} className="text-xs text-stone-500">{t}</p>
            ))}
          </div>

          {/* Trust badges */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-stone-500">
              <ShieldCheck className="h-3.5 w-3.5 text-botanical" />
              Datos cifrados
            </div>
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-stone-500">
              <Lock className="h-3.5 w-3.5 text-botanical" />
              Confidencialidad médica
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Panel: Form ── */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 bg-white sm:px-10">
        <div className="mx-auto w-full max-w-sm">

          {/* Back link + Logo (mobile) */}
          <div className="mb-8 lg:hidden">
            <VitalCareLogo size="md" />
          </div>
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-charcoal"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>

          {/* Heading */}
          <h1 className="font-display text-4xl text-charcoal leading-tight">
            Bienvenida,<br />
            <span className="font-script text-3xl text-stone-500">María</span>
          </h1>
          <p className="mt-2 text-sm text-muted">
            Acceda a su expediente clínico con total confidencialidad.
          </p>

          {/* Role Toggle */}
          <div className="mt-6 flex rounded-xl border border-stone-200 p-1 bg-stone-50">
            <button
              onClick={() => switchRole("patient")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all ${
                role === "patient"
                  ? "bg-white text-charcoal shadow-sm"
                  : "text-muted hover:text-charcoal"
              }`}
            >
              <User className="h-4 w-4" />
              Paciente
            </button>
            <button
              onClick={() => switchRole("doctor")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all ${
                role === "doctor"
                  ? "bg-white text-charcoal shadow-sm"
                  : "text-muted hover:text-charcoal"
              }`}
            >
              <Stethoscope className="h-4 w-4" />
              Médico
            </button>
          </div>

          {/* Demo credentials hint */}
          <div className="mt-4 rounded-xl border border-botanical-light bg-botanical-subtle px-4 py-3">
            <p className="text-xs font-semibold text-botanical mb-1">
              🎯 Credenciales de demo
            </p>
            <p className="text-xs text-muted font-mono">{DEMO_CREDENTIALS[role].email}</p>
            <p className="text-xs text-muted font-mono">vitalcare2026</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted">
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-charcoal outline-none transition-colors focus:border-gold focus:bg-white focus:ring-2 focus:ring-gold/15"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 pr-11 text-sm text-charcoal outline-none transition-colors focus:border-gold focus:bg-white focus:ring-2 focus:ring-gold/15"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-charcoal transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="mt-1.5 text-right text-xs text-gold-dark hover:underline cursor-pointer">
                ¿Olvidó su contraseña?
              </p>
            </div>

            <Button
              type="submit"
              className="gold-gradient w-full"
              size="lg"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Verificando...
                </span>
              ) : (
                <>
                  Iniciar sesión como {role === "patient" ? "Paciente" : "Médico"}
                </>
              )}
            </Button>
          </form>

          {/* Footer links */}
          <p className="mt-6 text-center text-xs text-muted">
            ¿Primera vez?{" "}
            <span className="font-medium text-gold-dark cursor-pointer hover:underline">
              Crear cuenta segura
            </span>
          </p>

          {/* Trust badges */}
          <div className="mt-8 flex items-center justify-center gap-6 text-muted">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider">
              <ShieldCheck className="h-3.5 w-3.5 text-botanical" />
              Datos cifrados
            </div>
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider">
              <Lock className="h-3.5 w-3.5 text-botanical" />
              Confidencialidad médica
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
