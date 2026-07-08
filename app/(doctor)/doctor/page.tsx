"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Bell,
  Calendar,
  CheckCircle2,
  Clock,
  LogOut,
  MessageSquare,
  Send,
  Users,
  Video,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { BrandLogo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import {
  doctorUser,
  doctorPatients,
  doctorTodayAppointments,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type Tab = "dashboard" | "patients" | "agenda";

export default function DoctorPage() {
  const [tab, setTab] = useState<Tab>("dashboard");
  const [noteTarget, setNoteTarget] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");
  const [sentNotes, setSentNotes] = useState<string[]>([]);

  function sendNote(patientId: string) {
    if (!noteText.trim()) return;
    setSentNotes((prev) => [...prev, patientId]);
    setNoteText("");
    setNoteTarget(null);
  }

  const totalUnread = doctorPatients.reduce((acc, p) => acc + p.unreadMessages, 0);
  const confirmedToday = doctorTodayAppointments.filter(
    (a) => a.status === "confirmada"
  ).length;

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      {/* ── Header ── */}
      <header className="border-b border-border bg-surface px-5 pt-12 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-stone-200 shadow-sm">
              <Image
                src="/dr-carlos.jpg"
                alt={doctorUser.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-semibold text-charcoal text-sm">{doctorUser.name}</p>
              <p className="text-xs text-muted">{doctorUser.specialty}</p>
              <p className="text-xs text-gold-dark">{doctorUser.instagram}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-stone-100">
              <Bell className="h-4.5 w-4.5 text-charcoal" />
              {totalUnread > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-bold text-white">
                  {totalUnread}
                </span>
              )}
            </div>
            <Link href="/login">
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 transition-colors hover:bg-red-50">
                <LogOut className="h-4 w-4 text-muted hover:text-danger" />
              </button>
            </Link>
          </div>
        </div>

        {/* Tab bar */}
        <div className="mt-4 flex gap-1 rounded-xl border border-stone-200 bg-stone-50 p-1">
          {(["dashboard", "patients", "agenda"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition-all",
                tab === t
                  ? "bg-white text-charcoal shadow-sm"
                  : "text-muted hover:text-charcoal"
              )}
            >
              {t === "dashboard" && <CheckCircle2 className="h-3.5 w-3.5" />}
              {t === "patients"  && <Users className="h-3.5 w-3.5" />}
              {t === "agenda"    && <Calendar className="h-3.5 w-3.5" />}
              {t === "dashboard" ? "Panel" : t === "patients" ? "Pacientes" : "Agenda"}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto pb-10">

        {/* ─── DASHBOARD ─── */}
        {tab === "dashboard" && (
          <div className="space-y-5 px-5 py-5 animate-fade-up">
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Citas hoy",       value: doctorTodayAppointments.length, icon: Calendar,    color: "text-brand-blue" },
                { label: "Confirmadas",      value: confirmedToday,                  icon: CheckCircle2, color: "text-botanical" },
                { label: "Mensajes nuevos",  value: totalUnread,                     icon: MessageSquare, color: "text-gold-dark" },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="rounded-2xl border border-border bg-surface p-3 text-center shadow-sm">
                  <Icon className={cn("mx-auto h-5 w-5 mb-1", color)} strokeWidth={1.5} />
                  <p className="font-display text-2xl text-charcoal">{value}</p>
                  <p className="text-[10px] text-muted leading-tight">{label}</p>
                </div>
              ))}
            </div>

            {/* Today's appointments */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted">
                  Agenda de hoy — 27 Jun
                </h3>
                <button onClick={() => setTab("agenda")} className="text-xs font-medium text-gold-dark">
                  Ver todo →
                </button>
              </div>
              <div className="space-y-2">
                {doctorTodayAppointments.map((apt) => (
                  <div key={apt.id} className="flex items-center gap-3 rounded-xl border border-border bg-surface px-3 py-3 shadow-sm">
                    <div className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                      apt.type === "online" ? "bg-brand-blue-light" : "bg-stone-100"
                    )}>
                      {apt.type === "online"
                        ? <Video className="h-4 w-4 text-brand-blue" />
                        : <MapPin className="h-4 w-4 text-charcoal" />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-charcoal text-sm truncate">{apt.service}</p>
                      <p className="text-xs text-muted">{apt.time} · {apt.type === "online" ? "Telemedicina" : "Presencial"}</p>
                    </div>
                    <span className={cn(
                      "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",
                      apt.status === "confirmada" ? "bg-botanical-light text-botanical" : "bg-gold-light text-gold-dark"
                    )}>
                      {apt.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Patients needing attention */}
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">
                Requieren atención
              </h3>
              <div className="space-y-2">
                {doctorPatients
                  .filter((p) => p.unreadMessages > 0)
                  .map((p) => (
                    <div key={p.id} className="flex items-center gap-3 rounded-xl border border-gold/20 bg-gold-subtle p-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full gold-gradient text-sm font-bold text-white">
                        {p.initials}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-charcoal text-sm">{p.name}</p>
                        <p className="text-xs text-muted">{p.treatment}</p>
                      </div>
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[9px] font-bold text-white">
                        {p.unreadMessages}
                      </span>
                    </div>
                  ))}
                {doctorPatients.every((p) => p.unreadMessages === 0) && (
                  <p className="text-center text-xs text-muted py-4">✅ Sin mensajes pendientes</p>
                )}
              </div>
            </div>

            {/* Quick note */}
            <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">
                Enviar nota a paciente
              </h3>
              <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 mb-3">
                {doctorPatients.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setNoteTarget(p.id)}
                    className={cn(
                      "shrink-0 rounded-xl border px-3 py-2 text-xs transition-all",
                      noteTarget === p.id
                        ? "border-gold bg-gold-subtle font-semibold text-gold-dark"
                        : "border-border bg-stone-50 text-muted"
                    )}
                  >
                    {p.name.split(" ")[0]}
                  </button>
                ))}
              </div>
              {noteTarget && (
                <div className="flex gap-2">
                  <input
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Escriba una nota o recomendación..."
                    className="flex-1 rounded-xl border border-border bg-stone-50 px-3 py-2 text-sm outline-none focus:border-gold"
                    onKeyDown={(e) => e.key === "Enter" && sendNote(noteTarget)}
                  />
                  <button
                    onClick={() => sendNote(noteTarget)}
                    disabled={!noteText.trim()}
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all",
                      noteText.trim() ? "gold-gradient text-white" : "bg-stone-200 text-muted"
                    )}
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              )}
              {sentNotes.length > 0 && (
                <p className="mt-2 text-xs text-botanical">
                  ✓ {sentNotes.length} nota(s) enviada(s) hoy
                </p>
              )}
            </div>
          </div>
        )}

        {/* ─── PATIENTS ─── */}
        {tab === "patients" && (
          <div className="space-y-3 px-5 py-5 animate-fade-up">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted">
                {doctorPatients.length} pacientes activos
              </h3>
            </div>
            {doctorPatients.map((p) => (
              <div key={p.id} className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full gold-gradient text-sm font-bold text-white">
                    {p.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-charcoal text-sm">{p.name}</p>
                      <span className={cn(
                        "rounded-full px-2 py-0.5 text-[9px] font-bold uppercase",
                        p.status === "activa" ? "bg-botanical-light text-botanical" : "bg-gold-light text-gold-dark"
                      )}>
                        {p.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted">{p.treatment}</p>
                    <div className="mt-1 flex items-center gap-3 text-[10px] text-muted">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> Última: {p.lastVisit}
                      </span>
                      {p.nextAppointment && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> Próxima: {p.nextAppointment}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {p.unreadMessages > 0 && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[9px] font-bold text-white">
                        {p.unreadMessages}
                      </span>
                    )}
                    <ChevronRight className="h-4 w-4 text-muted" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ─── AGENDA ─── */}
        {tab === "agenda" && (
          <div className="space-y-4 px-5 py-5 animate-fade-up">
            <div className="rounded-2xl border border-brand-blue-light bg-brand-blue-light/30 px-4 py-3">
              <p className="text-xs font-semibold text-brand-blue">📅 Viernes, 27 de Junio 2026</p>
              <p className="text-xs text-muted mt-0.5">{doctorTodayAppointments.length} citas programadas</p>
            </div>
            {doctorTodayAppointments.map((apt, i) => (
              <div key={apt.id} className="flex gap-3 animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                {/* Time */}
                <div className="w-16 shrink-0 text-right">
                  <p className="text-xs font-semibold text-charcoal">{apt.time.split(" ")[0]}</p>
                  <p className="text-[10px] text-muted">{apt.time.split(" ")[1]}</p>
                </div>
                {/* Dot connector */}
                <div className="flex flex-col items-center">
                  <div className={cn(
                    "h-3 w-3 rounded-full border-2 mt-0.5",
                    apt.status === "confirmada" ? "border-botanical bg-botanical" : "border-gold bg-gold"
                  )} />
                  {i < doctorTodayAppointments.length - 1 && (
                    <div className="flex-1 w-px bg-stone-200 my-1" />
                  )}
                </div>
                {/* Card */}
                <div className="flex-1 rounded-xl border border-border bg-surface p-3 shadow-sm mb-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-charcoal text-sm leading-tight">{apt.service}</p>
                      <div className="mt-1 flex items-center gap-1.5">
                        {apt.type === "online"
                          ? <Video className="h-3 w-3 text-brand-blue" />
                          : <MapPin className="h-3 w-3 text-muted" />
                        }
                        <span className="text-xs text-muted">
                          {apt.type === "online" ? "Telemedicina" : "Presencial"}
                        </span>
                      </div>
                    </div>
                    <span className={cn(
                      "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",
                      apt.status === "confirmada" ? "bg-botanical-light text-botanical" : "bg-gold-light text-gold-dark"
                    )}>
                      {apt.status}
                    </span>
                  </div>
                  {apt.status === "confirmada" && (
                    <Button size="sm" className="mt-2 w-full bg-charcoal text-white hover:bg-charcoal-light">
                      {apt.type === "online" ? "Iniciar videollamada" : "Marcar como atendida"}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-border bg-white/95 px-5 py-3 backdrop-blur-sm">
        <div className="flex items-center justify-center gap-2">
          <BrandLogo size="sm" showText={false} />
          <p className="text-xs text-muted">Portal Médico · Vita Studio · v1.0</p>
        </div>
      </div>
    </div>
  );
}
