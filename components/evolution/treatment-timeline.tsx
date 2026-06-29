import { treatmentTimeline } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Award, CalendarDays, Sparkles, UserCheck } from "lucide-react";

export function TreatmentTimeline() {
  return (
    <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
      <h3 className="font-display mb-4 text-lg font-bold text-charcoal">
        Historial de Tratamientos
      </h3>
      <div className="relative pl-1">
        {treatmentTimeline.map((item, index) => {
          const isLatest = index === 0;
          return (
            <div key={item.id} className="relative flex gap-3.5 pb-5 last:pb-0">
              {/* Connector line */}
              {index < treatmentTimeline.length - 1 && (
                <div className="absolute left-[7px] top-4 h-full w-px bg-stone-100" />
              )}
              {/* Node indicator */}
              <div
                className={cn(
                  "relative z-10 mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full border-2 transition-all",
                  isLatest
                    ? "border-[#c2b280] bg-[#c2b280]"
                    : "border-stone-200 bg-white"
                )}
              />
              {/* Timeline item body */}
              <div className="min-w-0 flex-1 rounded-xl bg-stone-50/50 p-3 border border-stone-100/30">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "text-[9px] font-bold uppercase tracking-wider",
                    isLatest ? "text-[#a39382]" : "text-muted"
                  )}>
                    {item.label}
                  </span>
                  <span className="rounded-full bg-stone-100 border border-stone-200/50 px-2 py-0.5 text-[8px] font-bold uppercase text-muted ml-auto">
                    {item.category}
                  </span>
                </div>
                <p className="mt-1 text-xs font-semibold text-charcoal leading-snug">{item.title}</p>
                <div className="mt-2 flex items-center gap-1 text-[10px] text-muted">
                  <CalendarDays className="h-3 w-3" />
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
