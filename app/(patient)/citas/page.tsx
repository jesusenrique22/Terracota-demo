"use client";

import { useState } from "react";
import {
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  MapPin,
  RefreshCw,
  Video,
  X,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { professionals, services } from "@/lib/mock-data";
import type { Appointment } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { usePatient } from "@/lib/patient-context";

type Tab = "proximas" | "historial" | "reservar";

const slots = ["09:00 AM", "10:30 AM", "02:00 PM", "04:30 PM", "06:00 PM"];
const datesAvailable = [
  { label: "Lun 30 Jun", value: "30 Jun 2026" },
  { label: "Mar 1 Jul",  value: "1 Jul 2026" },
  { label: "Mié 2 Jul",  value: "2 Jul 2026" },
  { label: "Jue 3 Jul",  value: "3 Jul 2026" },
  { label: "Vie 4 Jul",  value: "4 Jul 2026" },
];

export default function CitasPage() {
  const { upcomingAppointments, pastAppointments, addAppointment, cancelAppointment, showToast } =
    usePatient();

  const [tab, setTab]                   = useState<Tab>("proximas");
  const [step, setStep]                 = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [selectedPro, setSelectedPro]   = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [confirmed, setConfirmed]       = useState(false);

  function handleConfirm() {
    const svc = services.find((s) => s.id === selectedService)!;
    const pro = professionals.find((p) => p.id === selectedPro)!;
    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      service: svc.name,
      professional: pro.name,
      date: selectedDate,
      time: selectedSlot,
      type: "presencial",
      location: "Sede Principal · Maracaibo",
      status: "confirmada",
    };
    addAppointment(newApt);
    setConfirmed(true);
    showToast("¡Cita reservada con éxito! 🎉", "success");
    setTimeout(() => {
      setConfirmed(false);
      setTab("proximas");
      setStep(1);
      setSelectedService("");
      setSelectedPro("");
      setSelectedSlot("");
      setSelectedDate("");
    }, 2200);
  }

  return (
    <div className="animate-fade-up pb-6">
      <PageHeader title="Mis Citas" subtitle="Agenda inteligente VitalCare" />

      {/* Tabs */}
      <div className="mb-5 flex gap-2 px-5">
        {(["proximas", "historial", "reservar"] as const).map((key) => (
          <button
            key={key}
            onClick={() => { setTab(key); if (key !== "reservar") setStep(1); }}
            className={cn(
              "rounded-full px-4 py-2 text-xs font-semibold transition-all",
              tab === key
                ? "gold-gradient text-white shadow-sm"
                : "bg-surface-muted text-muted hover:bg-stone-200"
            )}
          >
            {key === "proximas" ? "Próximas" : key === "historial" ? "Historial" : "Reservar"}
          </button>
        ))}
      </div>

      {/* ─── Próximas ─── */}
      {tab === "proximas" && (
        <div className="space-y-3 px-5">
          {upcomingAppointments.length === 0 && (
            <div className="rounded-2xl border border-dashed border-stone-200 p-8 text-center">
              <Calendar className="mx-auto h-10 w-10 text-muted mb-3" strokeWidth={1.5} />
              <p className="text-sm text-muted">No tienes citas próximas</p>
              <button
                onClick={() => setTab("reservar")}
                className="mt-3 text-xs font-semibold text-gold-dark hover:underline"
              >
                Reservar ahora →
              </button>
            </div>
          )}
          {upcomingAppointments.map((apt) => (
            <div key={apt.id} className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-charcoal text-sm">{apt.service}</p>
                  <p className="text-xs text-muted mt-0.5">{apt.professional}</p>
                </div>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[10px] font-bold uppercase",
                    apt.status === "confirmada"
                      ? "bg-botanical-light text-botanical"
                      : "bg-gold-light text-gold-dark"
                  )}
                >
                  {apt.status}
                </span>
              </div>
              <div className="mt-3 space-y-1.5 text-xs text-muted">
                <span className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5" />
                  {apt.date} · {apt.time}
                </span>
                {apt.location && (
                  <span className="flex items-center gap-2">
                    {apt.type === "online"
                      ? <Video className="h-3.5 w-3.5" />
                      : <MapPin className="h-3.5 w-3.5" />
                    }
                    {apt.location}
                  </span>
                )}
              </div>
              <div className="mt-4 flex gap-2">
                <Button size="sm" className="flex-1">
                  <Check className="h-4 w-4" /> Confirmar
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <RefreshCw className="h-4 w-4" /> Reprogramar
                </Button>
                <button
                  onClick={() => {
                    cancelAppointment(apt.id);
                    showToast("Cita cancelada", "info");
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-danger transition-colors hover:bg-red-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── Historial ─── */}
      {tab === "historial" && (
        <div className="space-y-3 px-5">
          {pastAppointments.map((apt) => (
            <div key={apt.id} className="rounded-2xl border border-stone-100 bg-stone-50 p-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-charcoal text-sm">{apt.service}</p>
                <CheckCircle2 className="h-4 w-4 text-botanical" />
              </div>
              <p className="text-xs text-muted mt-0.5">{apt.professional}</p>
              <p className="mt-2 flex items-center gap-2 text-xs text-muted">
                <Clock className="h-3.5 w-3.5" />
                {apt.date} · {apt.time}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ─── Reservar ─── */}
      {tab === "reservar" && (
        <div className="px-5">
          {/* Progress bar */}
          <div className="mb-6 flex items-center gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex flex-1 flex-col items-center gap-1">
                <div className={cn("h-1.5 w-full rounded-full transition-all duration-300", step >= s ? "gold-gradient" : "bg-stone-200")} />
                <span className={cn("text-[9px] uppercase tracking-wide", step >= s ? "text-gold-dark font-semibold" : "text-muted")}>
                  {s === 1 ? "Servicio" : s === 2 ? "Médico" : s === 3 ? "Fecha" : "Hora"}
                </span>
              </div>
            ))}
          </div>

          {/* Success state */}
          {confirmed && (
            <div className="flex flex-col items-center gap-4 py-8 animate-bounce-in">
              <div className="flex h-20 w-20 items-center justify-center rounded-full botanical-gradient">
                <CheckCircle2 className="h-10 w-10 text-white" />
              </div>
              <p className="font-display text-2xl text-charcoal">¡Cita confirmada!</p>
              <p className="text-sm text-muted text-center">Tu reserva ha sido registrada exitosamente.</p>
            </div>
          )}

          {!confirmed && (
            <>
              {/* Step 1: Servicio */}
              {step === 1 && (
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-charcoal">Seleccione el servicio</p>
                  {services.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedService(s.id)}
                      className={cn(
                        "w-full rounded-2xl border p-4 text-left transition-all",
                        selectedService === s.id
                          ? "border-gold bg-gold-subtle shadow-sm"
                          : "border-border bg-surface hover:border-stone-300"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-charcoal text-sm">{s.name}</p>
                        {selectedService === s.id && (
                          <Check className="h-4 w-4 text-gold-dark" />
                        )}
                      </div>
                      <p className="text-xs text-muted mt-1">{s.duration} · {s.price}</p>
                    </button>
                  ))}
                  <Button className="w-full" disabled={!selectedService} onClick={() => setStep(2)}>
                    Continuar
                  </Button>
                </div>
              )}

              {/* Step 2: Profesional */}
              {step === 2 && (
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-charcoal">Elija al profesional</p>
                  {professionals.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPro(p.id)}
                      className={cn(
                        "w-full rounded-2xl border p-4 text-left transition-all",
                        selectedPro === p.id
                          ? "border-gold bg-gold-subtle shadow-sm"
                          : "border-border bg-surface hover:border-stone-300"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full gold-gradient text-sm font-bold text-white">
                          {p.name.split(" ")[1]?.[0]}{p.name.split(" ")[2]?.[0]}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-charcoal text-sm">{p.name}</p>
                            {selectedPro === p.id && <Check className="h-4 w-4 text-gold-dark" />}
                          </div>
                          <p className="text-xs text-muted">{p.specialty}</p>
                          <p className="text-xs text-gold-dark">{p.instagram}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Atrás</Button>
                    <Button className="flex-1" disabled={!selectedPro} onClick={() => setStep(3)}>Continuar</Button>
                  </div>
                </div>
              )}

              {/* Step 3: Fecha */}
              {step === 3 && (
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-charcoal">Seleccione la fecha</p>
                  <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
                    {datesAvailable.map((d) => (
                      <button
                        key={d.value}
                        onClick={() => setSelectedDate(d.value)}
                        className={cn(
                          "shrink-0 rounded-2xl border px-4 py-3 text-center transition-all",
                          selectedDate === d.value
                            ? "gold-gradient text-white border-transparent shadow-sm"
                            : "border-border bg-surface text-charcoal hover:border-stone-300"
                        )}
                      >
                        <p className="text-xs font-semibold">{d.label.split(" ")[0]}</p>
                        <p className="text-sm font-bold">{d.label.split(" ").slice(1).join(" ")}</p>
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>Atrás</Button>
                    <Button className="flex-1" disabled={!selectedDate} onClick={() => setStep(4)}>Continuar</Button>
                  </div>
                </div>
              )}

              {/* Step 4: Hora */}
              {step === 4 && (
                <div className="space-y-4">
                  <p className="text-sm font-semibold text-charcoal">Horarios disponibles · {selectedDate}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {slots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={cn(
                          "rounded-xl border py-3.5 text-sm font-semibold transition-all",
                          selectedSlot === slot
                            ? "gold-gradient text-white border-transparent shadow-sm"
                            : "border-border bg-surface text-charcoal hover:border-stone-300"
                        )}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>

                  {/* Summary */}
                  {selectedSlot && (
                    <div className="rounded-2xl border border-gold/20 bg-gold-subtle p-4 animate-fade-up">
                      <p className="text-xs font-semibold text-gold-dark mb-2 uppercase tracking-wider">Resumen de su cita</p>
                      <p className="text-sm text-charcoal font-medium">{services.find(s => s.id === selectedService)?.name}</p>
                      <p className="text-xs text-muted">{professionals.find(p => p.id === selectedPro)?.name}</p>
                      <p className="text-xs text-muted">{selectedDate} · {selectedSlot}</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={() => setStep(3)}>Atrás</Button>
                    <Button
                      className="flex-1"
                      disabled={!selectedSlot}
                      onClick={handleConfirm}
                    >
                      Confirmar cita
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
