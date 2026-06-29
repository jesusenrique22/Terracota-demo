"use client";

import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  ChevronRight,
  Clock,
  Flame,
  Heart,
  MapPin,
  MessageCircle,
  Sparkles,
  Syringe,
  Waves,
  Zap,
} from "lucide-react";
import { activeTreatments, terracota } from "@/lib/clinics";
import { usePatient } from "@/lib/patient-context";
import { cn } from "@/lib/utils";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Buenos días";
  if (h < 19) return "Buenas tardes";
  return "Buenas noches";
}

const quickLinks = [
  { href: "/citas", icon: Calendar, label: "Citas" },
  { href: "/chat", icon: MessageCircle, label: "Chat" },
  { href: "/nutricion", icon: Heart, label: "Plan" },
  { href: "/evolution", icon: Sparkles, label: "Progreso" },
  { href: "/boutique", icon: Zap, label: "Tienda" },
];

export default function HomePage() {
  const { patient, upcomingAppointments, totalUnread, cartCount } = usePatient();
  const nextApt = upcomingAppointments[0];
  const wellnessScore = 82;
  const sessionsThisMonth = 3;

  return (
    <div className="animate-fade-up space-y-5 px-4 pb-6 pt-4">

      {/* Header editorial */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold">{getGreeting()}</p>
        <h1 className="mt-1 font-display text-[1.75rem] font-black leading-tight text-charcoal">
          {patient.name.split(" ")[0]},
          <span className="block text-base font-normal italic text-muted">tu espacio de bienestar</span>
        </h1>
      </div>

      {/* Tarjeta bienestar — identidad Terracota */}
      <div className="relative overflow-hidden rounded-3xl border border-border p-5 gold-gradient text-white">
        <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">Tu bienestar</p>
            <p className="mt-1 font-display text-4xl font-black leading-none">{wellnessScore}%</p>
            <p className="mt-2 text-xs text-white/75">
              {sessionsThisMonth} sesiones este mes · {patient.doctor}
            </p>
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/25 bg-white/10">
            <Heart className="h-7 w-7" strokeWidth={1.5} />
          </div>
        </div>
      </div>

      {/* Próxima cita */}
      {nextApt ? (
        <div className="rounded-3xl border border-border bg-surface p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Próxima cita</p>
            <span className="rounded-full bg-gold-subtle px-2.5 py-0.5 text-[9px] font-bold uppercase text-gold">
              {nextApt.status}
            </span>
          </div>
          <p className="font-display text-xl font-bold leading-tight text-charcoal">{nextApt.service}</p>
          <p className="mt-1 text-sm text-muted">{nextApt.professional}</p>
          <div className="mt-4 flex items-center gap-4 text-xs text-muted">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-gold" />
              {nextApt.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-gold" />
              {nextApt.time}
            </span>
          </div>
          {nextApt.location && (
            <p className="mt-2 flex items-center gap-1.5 text-xs text-muted">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-gold" />
              {nextApt.location}
            </p>
          )}
          <Link href="/citas">
            <button className="mt-4 flex w-full items-center justify-between rounded-2xl bg-surface-muted px-4 py-3 text-sm font-semibold text-charcoal transition-all hover:bg-gold-subtle active:scale-[0.98]">
              Ver detalles
              <ArrowRight className="h-4 w-4 text-gold" />
            </button>
          </Link>
        </div>
      ) : (
        <Link href="/citas">
          <div className="flex items-center justify-between rounded-3xl border border-dashed border-border bg-surface-muted px-5 py-4">
            <div>
              <p className="font-semibold text-charcoal">Sin citas programadas</p>
              <p className="text-xs text-muted">Reserva tu próxima sesión</p>
            </div>
            <ChevronRight className="h-5 w-5 text-gold" />
          </div>
        </Link>
      )}

      {/* Accesos rápidos — scroll horizontal */}
      <div>
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Acceso rápido</p>
        <div className="flex gap-2.5 overflow-x-auto hide-scrollbar pb-1">
          {quickLinks.map(({ href, icon: Icon, label }) => {
            const badge =
              label === "Chat" ? totalUnread :
              label === "Tienda" ? cartCount : 0;
            return (
              <Link
                key={label}
                href={href}
                className="relative flex min-w-[88px] shrink-0 flex-col items-center gap-2 rounded-2xl border border-border bg-surface px-4 py-4 transition-all active:scale-[0.97] hover:border-gold/30"
              >
                {badge > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[8px] font-bold text-white">
                    {badge}
                  </span>
                )}
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-subtle">
                  <Icon className="h-5 w-5 text-gold" strokeWidth={1.6} />
                </div>
                <span className="text-[11px] font-semibold text-charcoal">{label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Tratamientos activos */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Tratamientos activos</p>
          <Link href="/evolution" className="text-[10px] font-semibold text-gold">Ver todo</Link>
        </div>
        <div className="space-y-2.5">
          {activeTreatments.map((t) => (
            <div key={t.id} className="rounded-2xl border border-border bg-surface p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-sm text-charcoal">{t.name}</p>
                  <p className="mt-0.5 text-xs text-muted">{t.sessions}</p>
                </div>
                {t.next && (
                  <span className="shrink-0 rounded-full bg-gold-subtle px-2 py-0.5 text-[9px] font-bold text-gold">
                    {t.next}
                  </span>
                )}
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-muted">
                <div
                  className="h-full rounded-full gold-gradient transition-all duration-700"
                  style={{ width: `${t.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sugerencias Terracota */}
      <div>
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Recomendado para ti</p>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { icon: Waves, label: "Masaje relajante", href: "/citas" },
            { icon: Flame, label: "Quemadores", href: "/citas" },
            { icon: Syringe, label: "Bioestimuladores", href: "/citas" },
            { icon: Sparkles, label: "Depilación láser", href: "/citas" },
          ].map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              href={href}
              className={cn(
                "group flex flex-col gap-3 rounded-2xl border border-border bg-surface-muted p-4",
                "transition-all hover:border-gold/30 hover:bg-gold-subtle active:scale-[0.98]"
              )}
            >
              <Icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
              <p className="text-xs font-semibold leading-snug text-charcoal">{label}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Strip ubicación */}
      <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-subtle">
          <MapPin className="h-4 w-4 text-gold" />
        </div>
        <div>
          <p className="text-xs font-semibold text-charcoal">{terracota.address}</p>
          <p className="text-[11px] text-muted">{terracota.hours}</p>
        </div>
      </div>
    </div>
  );
}
