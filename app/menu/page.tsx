"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { TerracotaLogo } from "@/components/brand/logo";
import { ServiceMenuView } from "@/components/menu/service-menu-view";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { menuStats } from "@/lib/service-menu";
import { terracota as clinic } from "@/lib/clinics";
import { useTheme } from "@/lib/theme-context";

export default function MenuPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="landing-page min-h-dvh bg-background text-charcoal">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="flex items-center justify-between px-5 py-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted transition-colors hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" />
            Inicio
          </Link>
          <ThemeToggle compact />
        </div>
      </header>

      {/* Portada estilo brochure */}
      <section className="relative overflow-hidden px-5 pb-10 pt-8">
        <div className="pointer-events-none absolute inset-0 gold-gradient opacity-[0.92]" />
        <div className="sand-texture pointer-events-none absolute inset-0 opacity-20" />
        <div className="relative text-center text-white">
          <div className="flex justify-center">
            <TerracotaLogo size="md" variant="dark" />
          </div>
          <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.35em] text-white/75">
            Brochure digital
          </p>
          <h1 className="mt-3 font-display text-4xl font-black uppercase leading-none tracking-tight">
            Menú de
            <br />
            servicios
          </h1>
          <p className="mx-auto mt-4 flex max-w-xs items-center justify-center gap-1.5 text-xs text-white/80">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            {clinic.address}
          </p>
          <div className="mx-auto mt-6 flex max-w-sm justify-center gap-3">
            <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider">
              {menuStats.categories} categorías
            </span>
            <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider">
              {menuStats.treatments}+ tratamientos
            </span>
          </div>
        </div>
      </section>

      <section className="px-5 py-10">
        <ServiceMenuView />

        <div className="mt-10 rounded-2xl border border-gold/25 bg-gold-subtle p-5">
          <p className="font-display text-lg font-bold text-charcoal">
            ¿Quieres reservar algún tratamiento?
          </p>
          <p className="mt-2 text-sm text-muted">
            Escríbenos por WhatsApp o reserva directamente en nuestro link de citas.
          </p>
          <a
            href={clinic.linktree}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-sm font-bold text-white transition-all hover:brightness-110 gold-gradient"
          >
            Reservar cita
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </section>

      <footer className="border-t border-border px-5 pb-10 pt-8">
        <TerracotaLogo size="sm" variant={isDark ? "dark" : "light"} />
        <p className="mt-4 text-xs text-muted">
          Precios referenciales del brochure Terracota · {clinic.city}
        </p>
      </footer>
    </div>
  );
}
