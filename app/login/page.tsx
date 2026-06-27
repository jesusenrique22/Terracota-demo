"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Eye, EyeOff, Lock, ShieldCheck } from "lucide-react";
import { VitalCareLogo } from "@/components/brand/logo";

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

  function switchRole(r: Role) {
    setRole(r);
    setEmail(DEMO_CREDENTIALS[r].email);
    setPassword("vitalcare2026");
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((res) => setTimeout(res, 900));
    router.push(role === "doctor" ? "/doctor" : "/home");
  }

  return (
    <div className="relative min-h-dvh flex items-center justify-center overflow-hidden bg-[#faf8f5] px-5 py-12 selection:bg-[#c4a265]/20">
      
      {/* Background Image of the clinic with a soft, bright overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-clinic.jpg"
          alt="VitalCare Clínica"
          fill
          priority
          className="object-cover opacity-35 filter blur-[1px]"
        />
        {/* Soft, warm luxury radial gradient to blend the edges */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#faf8f5]/90 via-[#faf8f5]/65 to-[#faf8f5]/30" />
      </div>

      {/* Floating back button outside the form - elegant top-left pill */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-20 flex items-center gap-1.5 rounded-full border border-stone-200/80 bg-white/90 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-stone-600 shadow-sm backdrop-blur-sm transition-all hover:bg-stone-50 hover:text-stone-800 active:scale-95"
      >
        <ArrowLeft className="h-4 w-4" />
        Inicio
      </Link>

      {/* Premium Light-Glass Card */}
      <div className="relative z-10 w-full max-w-[420px]">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/85 p-8 shadow-[0_20px_50px_rgba(139,115,85,0.12)] backdrop-blur-xl">
          
          {/* Brand & Greetings */}
          <div className="mb-8 text-center">
            <div className="mb-6 flex justify-center">
              <VitalCareLogo size="md" />
            </div>
            <h1 className="font-display text-3xl font-black text-charcoal">
              Bienvenida, <span className="font-script text-4xl text-[#c4a265]">María</span>
            </h1>
            <p className="mt-2 text-xs leading-relaxed text-stone-500">
              Accede de forma segura a tu expediente clínico y citas.
            </p>
          </div>

          {/* Role Switcher */}
          <div className="mb-6 flex rounded-2xl bg-stone-100/80 p-1 border border-stone-200/30">
            {(["patient", "doctor"] as Role[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => switchRole(r)}
                className={`flex-1 rounded-xl py-2.5 text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${
                  role === r
                    ? "bg-white text-charcoal shadow-md border border-stone-100"
                    : "text-stone-400 hover:text-stone-600"
                }`}
              >
                {r === "patient" ? "Paciente" : "Médico"}
              </button>
            ))}
          </div>

          {/* Minimal Demo info bar */}
          <div className="mb-6 rounded-2xl border border-[#c4a265]/20 bg-[#c4a265]/5 p-4">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c4a265] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c4a265]"></span>
              </span>
              <p className="text-[9px] font-bold uppercase tracking-widest text-[#c4a265]">
                Acceso Demo
              </p>
            </div>
            <p className="text-xs font-mono text-stone-600 tracking-tight">{DEMO_CREDENTIALS[role].email}</p>
            <p className="text-[11px] font-mono text-stone-400 mt-0.5">Contraseña: vitalcare2026</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-stone-400">
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-stone-200 bg-white/70 px-4 py-3 text-sm text-charcoal outline-none transition-all focus:border-[#c4a265] focus:bg-white focus:ring-2 focus:ring-[#c4a265]/10"
                required
              />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400">
                  Contraseña
                </label>
                <button
                  type="button"
                  className="text-[10px] font-semibold text-[#c4a265] hover:text-[#b39257] transition-colors"
                >
                  ¿La olvidaste?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-stone-200 bg-white/70 px-4 py-3 pr-11 text-sm text-charcoal outline-none transition-all focus:border-[#c4a265] focus:bg-white focus:ring-2 focus:ring-[#c4a265]/10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative mt-2 flex w-full items-center justify-center overflow-hidden rounded-xl bg-[#c4a265] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#c4a265]/25 transition-all hover:bg-[#b39257] active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
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

          {/* Secure connection badges */}
          <div className="mt-8 flex items-center justify-center gap-5 border-t border-stone-100 pt-6 text-stone-400">
            <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-stone-400">
              <ShieldCheck className="h-4 w-4 text-[#c4a265]" />
              Conexión Cifrada
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-stone-400">
              <Lock className="h-4 w-4 text-[#c4a265]" />
              Área Médica Segura
            </div>
          </div>

        </div>

        {/* Outer text */}
        <p className="mt-8 text-center text-xs text-stone-400">
          ¿No tienes acceso?{" "}
          <span className="font-semibold text-[#c4a265] cursor-pointer hover:underline">
            Solicitar alta en recepción
          </span>
        </p>
      </div>

    </div>
  );
}
