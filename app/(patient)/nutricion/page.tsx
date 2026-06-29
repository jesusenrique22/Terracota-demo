"use client";

import { Bell, Check, X, Flame } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { usePatient } from "@/lib/patient-context";
import { cn } from "@/lib/utils";

export default function NutricionPage() {
  const {
    meals,
    setMealStatus,
    completedMealsCount,
    totalKcal,
    doneKcal,
    showToast,
  } = usePatient();

  const pct = Math.round((completedMealsCount / meals.length) * 100);
  const kcalPct = Math.round((doneKcal / totalKcal) * 100);

  function handleStatus(id: string, status: "cumplida" | "no_cumplida") {
    setMealStatus(id, status);
    if (status === "cumplida") {
      showToast("¡Comida registrada! 🥗", "success");
    }
  }

  return (
    <div className="animate-fade-up pb-6">
      <PageHeader
        title="Plan del Día"
        subtitle="Viernes 27 Jun · Dra. Jenni Bracho"
        action={
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-botanical-subtle">
            <Bell className="h-4 w-4 text-botanical" />
          </button>
        }
      />

      {/* Summary cards */}
      <div className="mx-5 mb-5 grid grid-cols-2 gap-3">
        {/* Cumplimiento */}
        <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
          <p className="text-xs uppercase tracking-widest text-muted">Cumplimiento</p>
          <p className="font-display text-3xl text-charcoal mt-1">
            {completedMealsCount}
            <span className="text-base text-muted">/{meals.length}</span>
          </p>
          {/* Circular progress */}
          <div className="mt-3 flex items-center gap-2">
            <div className="relative h-10 w-10">
              <svg className="h-10 w-10 -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15" fill="none" stroke="#f3f0ec" strokeWidth="3" />
                <circle
                  cx="18" cy="18" r="15" fill="none"
                  stroke="url(#ring-grad)" strokeWidth="3"
                  strokeDasharray={`${(pct / 100) * 94.2} 94.2`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#a39382" />
                    <stop offset="100%" stopColor="#c2b280" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-charcoal">
                {pct}%
              </span>
            </div>
            <span className="text-xs text-muted">del objetivo</span>
          </div>
        </div>

        {/* Calorías */}
        <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
          <p className="text-xs uppercase tracking-widest text-muted">Calorías</p>
          <p className="font-display text-3xl text-charcoal mt-1">
            {doneKcal}
            <span className="text-base text-muted">/{totalKcal}</span>
          </p>
          <div className="mt-3">
            <div className="h-1.5 overflow-hidden rounded-full bg-stone-100">
              <div
                className="h-full rounded-full gold-gradient transition-all duration-500"
                style={{ width: `${kcalPct}%` }}
              />
            </div>
            <div className="mt-1.5 flex items-center gap-1 text-xs text-muted">
              <Flame className="h-3 w-3 text-orange-400" />
              <span>{kcalPct}% consumidas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Meal cards */}
      <div className="space-y-3 px-5">
        {meals.map((meal) => (
          <div
            key={meal.id}
            className={cn(
              "rounded-2xl border p-4 transition-all duration-200",
              meal.status === "cumplida"
                ? "border-botanical/25 bg-botanical-subtle"
                : meal.status === "no_cumplida"
                  ? "border-red-200 bg-red-50/60"
                  : "border-border bg-surface shadow-sm"
            )}
          >
            <div className="flex items-start gap-3">
              {/* Time badge */}
              <div className={cn(
                "shrink-0 rounded-xl px-2.5 py-1.5 text-center min-w-[52px]",
                meal.status === "cumplida" ? "bg-botanical text-white" :
                meal.status === "no_cumplida" ? "bg-red-400 text-white" :
                "gold-gradient text-white"
              )}>
                <p className="text-[10px] font-bold leading-none">{meal.time.split(":")[0]}</p>
                <p className="text-[9px] opacity-80">{meal.time.split(":")[1]}</p>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-charcoal text-sm">{meal.name}</p>
                  <span className="text-[10px] text-muted">{meal.kcal} kcal</span>
                </div>
                <p className="text-xs text-muted mt-0.5 leading-relaxed">{meal.description}</p>

                {/* Action buttons */}
                {meal.status === "pendiente" && (
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => handleStatus(meal.id, "cumplida")}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold text-white transition-all botanical-gradient"
                    >
                      <Check className="h-3.5 w-3.5" /> Cumplida
                    </button>
                    <button
                      onClick={() => handleStatus(meal.id, "no_cumplida")}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold text-white bg-red-400 transition-all hover:bg-red-500"
                    >
                      <X className="h-3.5 w-3.5" /> No cumplida
                    </button>
                  </div>
                )}
                {meal.status !== "pendiente" && (
                  <button
                    onClick={() => setMealStatus(meal.id, "pendiente")}
                    className="mt-2 text-[10px] text-muted underline"
                  >
                    Deshacer
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reminder */}
      <div className="mx-5 mt-5 rounded-2xl bg-gold-subtle border border-gold/15 px-4 py-3 text-center">
        <p className="text-xs text-muted">
          🔔 Recordatorios push activos · Próxima: Almuerzo 13:00
        </p>
      </div>
    </div>
  );
}
