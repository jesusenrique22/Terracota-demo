"use client";

import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  LineChart,
  MessageCircle,
  Shield,
  ShoppingBag,
  Sparkles,
  TrendingDown,
  Utensils,
  Video,
  Zap,
} from "lucide-react";
import { usePatient } from "@/lib/patient-context";
import { cn } from "@/lib/utils";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Buenos días";
  if (h < 19) return "Buenas tardes";
  return "Buenas noches";
}

export default function HomePage() {
  const {
    patient,
    upcomingAppointments,
    completedMealsCount,
    meals,
    doneKcal,
    totalKcal,
    totalUnread,
    cartCount,
  } = usePatient();

  const nextApt = upcomingAppointments[0];
  const kcalPct = Math.round((doneKcal / totalKcal) * 100);
  const pendingMeals = meals.filter((m) => m.status === "pendiente").length;

  return (
    <div className="animate-fade-up space-y-4 pb-6 px-4 pt-3">

      {/* Greeting */}
      <div>
        <p className="text-xs text-muted">{getGreeting()}</p>
        <h1 className="font-display text-2xl font-bold text-charcoal leading-tight">
          {patient.name.split(" ")[0]} {patient.name.split(" ")[1]} ✨
        </h1>
        <p className="text-xs text-muted mt-0.5">Paciente · {patient.doctor}</p>
      </div>

      {/* ── Próxima Cita ── */}
      {nextApt ? (
        <div className="relative overflow-hidden rounded-2xl p-4 text-white"
          style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2d2311 60%, #3d2f0f 100%)" }}>
          <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-[#c4a265]/15 blur-2xl" />
          <div className="relative">
            <div className="mb-2 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c4a265] animate-pulse" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#c4a265]">Próxima cita</p>
            </div>
            <p className="font-display text-lg font-bold leading-tight text-white">{nextApt.service}</p>
            <p className="text-xs text-white/60 mt-0.5">{nextApt.professional}</p>
            <div className="mt-3 flex items-center gap-3 text-xs text-white/70">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {nextApt.date}
              </span>
              <span>{nextApt.time}</span>
              <span className="ml-auto rounded-full border border-[#c4a265]/30 bg-[#c4a265]/10 px-2 py-0.5 text-[9px] font-bold uppercase text-[#c4a265]">
                {nextApt.status}
              </span>
            </div>
            {nextApt.type === "online" && (
              <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#c4a265] py-2.5 text-xs font-bold text-black transition-all active:scale-[0.98]">
                <Video className="h-3.5 w-3.5" /> Unirse a telemedicina
              </button>
            )}
          </div>
        </div>
      ) : (
        <Link href="/citas">
          <div className="flex items-center gap-3 rounded-2xl border border-dashed border-stone-200 bg-stone-50 px-4 py-3.5">
            <Calendar className="h-5 w-5 text-muted" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-semibold text-charcoal">Sin próximas citas</p>
              <p className="text-xs text-muted">Toca para reservar →</p>
            </div>
          </div>
        </Link>
      )}

      {/* ── Stats row ── */}
      <div className="grid grid-cols-3 gap-2.5">
        {/* Calorías */}
        <div className="col-span-2 rounded-2xl border border-border bg-white p-3.5 shadow-sm">
          <p className="text-[10px] uppercase tracking-widest text-muted">Calorías hoy</p>
          <div className="mt-1 flex items-end gap-2">
            <p className="font-display text-2xl font-bold text-charcoal">{doneKcal}</p>
            <p className="pb-0.5 text-xs text-muted">/ {totalKcal} kcal</p>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-stone-100">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${kcalPct}%`, background: "linear-gradient(90deg, #8f6e3d, #c4a265)" }}
            />
          </div>
          <p className="mt-1.5 text-[10px] text-muted">
            {completedMealsCount}/{meals.length} comidas · {kcalPct}%
          </p>
        </div>

        {/* Peso */}
        <div className="rounded-2xl border border-border bg-white p-3.5 shadow-sm">
          <p className="text-[10px] uppercase tracking-widest text-muted">Peso</p>
          <p className="mt-1 font-display text-2xl font-bold text-charcoal">65.6</p>
          <p className="text-[10px] text-muted">kg</p>
          <div className="mt-1.5 flex items-center gap-1 text-[10px] text-botanical font-semibold">
            <TrendingDown className="h-3 w-3" />
            −6.8 kg
          </div>
        </div>
      </div>

      {/* ── Quick access grid ── */}
      <div className="grid grid-cols-2 gap-2.5">
        {[
          { href: "/citas",     icon: Calendar,       label: "Citas",       desc: `${upcomingAppointments.length} próximas`,       badge: 0,            color: "bg-blue-50",    iconColor: "text-blue-600" },
          { href: "/chat",      icon: MessageCircle,  label: "Chat médico", desc: "Soporte en tiempo real",                        badge: totalUnread,   color: "bg-purple-50",  iconColor: "text-purple-600" },
          { href: "/nutricion", icon: Utensils,       label: "Plan del día",desc: `${pendingMeals} pendientes`,                    badge: pendingMeals,  color: "bg-green-50",   iconColor: "text-green-700" },
          { href: "/evolution", icon: LineChart,      label: "Evolución",   desc: "−6.8 kg en 12 meses",                          badge: 0,             color: "bg-amber-50",   iconColor: "text-amber-600" },
          { href: "/boutique",  icon: ShoppingBag,    label: "Boutique",    desc: "Productos recomendados",                        badge: cartCount,     color: "bg-rose-50",    iconColor: "text-rose-600" },
          { href: "/citas",     icon: Zap,            label: "Reservar",    desc: "Nueva cita rápida",                             badge: 0,             color: "bg-stone-50",   iconColor: "text-stone-600" },
        ].map(({ href, icon: Icon, label, desc, badge, color, iconColor }) => (
          <Link
            key={`${href}-${label}`}
            href={href}
            className="relative rounded-2xl border border-border bg-white p-4 shadow-sm transition-all active:scale-[0.97]"
          >
            {badge > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#c4a265] text-[9px] font-bold text-white">
                {badge}
              </span>
            )}
            <div className={cn("mb-2.5 flex h-9 w-9 items-center justify-center rounded-xl", color)}>
              <Icon className={cn("h-4.5 w-4.5", iconColor)} strokeWidth={1.8} />
            </div>
            <p className="text-sm font-semibold text-charcoal">{label}</p>
            <p className="mt-0.5 text-[11px] text-muted">{desc}</p>
          </Link>
        ))}
      </div>

      {/* ── Privacy strip ── */}
      <div className="flex items-center gap-3 rounded-2xl border border-[#4a7c59]/20 bg-[#f0f9f4] px-4 py-3">
        <Shield className="h-5 w-5 shrink-0 text-[#4a7c59]" strokeWidth={1.5} />
        <p className="text-[11px] leading-relaxed text-stone-600">
          Sus datos clínicos están protegidos con cifrado de extremo a extremo y estricta confidencialidad médica.
        </p>
      </div>
    </div>
  );
}
