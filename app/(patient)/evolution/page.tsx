import { PageHeader } from "@/components/layout/page-header";
import { BeforeAfterSlider } from "@/components/evolution/before-after-slider";
import { MetricChart } from "@/components/evolution/metric-chart";
import { TreatmentTimeline } from "@/components/evolution/treatment-timeline";
import { ShieldCheck, Info } from "lucide-react";

export default function EvolutionPage() {
  return (
    <div className="animate-fade-up pb-8">
      <PageHeader
        title="Mi Evolución"
        subtitle="Monitoreo de composición corporal y tratamientos"
      />

      <div className="space-y-5 px-4">
        
        {/* Metric Chart */}
        <MetricChart />

        {/* Private Gallery Section */}
        <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-charcoal">
              Galería Privada
            </h3>
            <span className="flex items-center gap-1 rounded-full bg-[#f0f9f4] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#4a7c59]">
              <ShieldCheck className="h-3 w-3" /> Protegido
            </span>
          </div>
          
          <BeforeAfterSlider />
          
          <div className="mt-3 flex items-start gap-2 rounded-xl bg-stone-50 p-3">
            <Info className="h-4 w-4 shrink-0 text-[#c2b280] mt-0.5" />
            <p className="text-[10px] leading-relaxed text-muted">
              Estas imágenes son estrictamente confidenciales y forman parte de su expediente clínico. Solo son visibles para usted y su equipo médico tratante.
            </p>
          </div>
        </div>

        {/* Treatment Timeline */}
        <TreatmentTimeline />
        
      </div>
    </div>
  );
}
