"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  ChevronDown,
  Clock,
  Flame,
  Heart,
  MapPin,
  MessageCircle,
  Shield,
  Sparkles,
  Syringe,
  Waves,
  Zap,
} from "lucide-react";
import { TerracotaLogo } from "@/components/brand/logo";
import { experiencePillars, promotions, terracota as clinic } from "@/lib/clinics";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useTheme } from "@/lib/theme-context";

const serviceIcons = [Sparkles, Waves, Syringe, Zap, Flame, Heart];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function LandingPage() {
  const [navSolid, setNavSolid] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="landing-page min-h-dvh overflow-x-hidden bg-background text-charcoal">

      <nav
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 transition-all duration-300 ${
          navSolid ? "border-b border-border bg-background/95 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <TerracotaLogo size="sm" variant={isDark ? "dark" : "light"} />
        <div className="flex items-center gap-2">
          <a href="#servicios" className="hidden text-[11px] font-medium uppercase tracking-widest text-muted transition-colors hover:text-gold sm:block">
            Servicios
          </a>
          <a href="#contacto" className="hidden text-[11px] font-medium uppercase tracking-widest text-muted transition-colors hover:text-gold sm:block">
            Contacto
          </a>
          <ThemeToggle compact />
          <Link href="/login">
            <button className="rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-white transition-all hover:brightness-110 gold-gradient">
              Reservar
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex min-h-dvh flex-col justify-end overflow-hidden px-5 pb-12 pt-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="landing-hero-bg absolute inset-0" />
          <div className="sand-texture absolute inset-0 opacity-30" />
          <div className="landing-hero-fade absolute inset-x-0 bottom-0 h-48" />
        </div>

        <div className="landing-hero-ornament" aria-hidden="true">
          <span className="landing-hero-ornament-inner" />
        </div>

        <div className="relative z-10">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold-subtle px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-dark">
              {clinic.category} · Maracaibo
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 font-display text-[3rem] font-black leading-[0.92] tracking-tight text-charcoal sm:text-[3.5rem]">
              Belleza y
              <br />
              <span className="italic text-gold">bienestar</span>
              <br />
              en su máxima
              <br />
              expresión.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-5 max-w-[300px] text-sm leading-relaxed text-muted">
              {clinic.description}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/login">
                <button className="flex w-full items-center justify-between rounded-2xl px-5 py-4 text-sm font-bold text-white transition-all active:scale-[0.98] hover:brightness-110 gold-gradient sm:w-auto sm:min-w-[200px]">
                  Reservar cita
                  <ArrowRight className="h-5 w-5" />
                </button>
              </Link>
              <a href={clinic.linktree} target="_blank" rel="noopener noreferrer">
                <button className="flex w-full items-center justify-between rounded-2xl border border-border bg-surface px-5 py-4 text-sm font-semibold text-charcoal shadow-sm transition-all hover:border-gold/40 hover:bg-gold-subtle sm:w-auto sm:min-w-[200px]">
                  <span>Contactar</span>
                  <MessageCircle className="h-5 w-5 text-gold" />
                </button>
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-12 flex items-center gap-2">
              <div className="h-px flex-1 bg-border" />
              <ChevronDown className="h-4 w-4 text-muted animate-pulse-soft" />
              <div className="h-px flex-1 bg-border" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="px-5 py-16">
        <Reveal>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Tratamientos</p>
          <h2 className="mt-2 font-display text-3xl font-black leading-tight text-charcoal">
            Servicios que
            <br />
            <span className="italic text-muted">transforman</span>
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-3">
          {clinic.services.map((svc, i) => {
            const Icon = serviceIcons[i] ?? Sparkles;
            return (
              <Reveal key={svc.id} delay={i * 50}>
                <div className="group flex gap-4 rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all hover:border-gold/30 hover:shadow-md">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-subtle">
                    <Icon className="h-5 w-5 text-gold-dark" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-charcoal">{svc.label}</p>
                      {svc.tag && (
                        <span className="rounded-full bg-gold px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white">
                          {svc.tag}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{svc.description}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Experiencia */}
      <section className="landing-section-alt border-y px-5 py-16">
        <Reveal>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">La experiencia</p>
          <h2 className="mt-2 font-display text-2xl font-black text-charcoal">Por qué elegir Terracota</h2>
        </Reveal>
        <div className="mt-8 space-y-4">
          {experiencePillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 70}>
              <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
                <p className="font-display text-lg font-bold text-charcoal">{p.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Ubicación */}
      <section id="contacto" className="px-5 py-16">
        <Reveal>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Visítanos</p>
          <h2 className="mt-2 font-display text-2xl font-black text-charcoal">Estamos en Camoruco</h2>
        </Reveal>

        <div className="mt-8 space-y-3">
          <Reveal delay={60}>
            <div className="rounded-2xl border border-gold/25 bg-gold-subtle p-5">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-dark" />
                <div>
                  <p className="font-semibold text-charcoal">{clinic.address}</p>
                  <p className="mt-1 text-sm text-muted">{clinic.city}</p>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold-dark" />
                <div>
                  <p className="font-semibold text-charcoal">Horario de atención</p>
                  <p className="mt-1 text-sm text-muted">{clinic.hours}</p>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={180}>
            <a href={clinic.linktree} target="_blank" rel="noopener noreferrer">
              <button className="flex w-full items-center justify-between rounded-2xl px-5 py-4 text-sm font-bold text-white transition-all active:scale-[0.98] hover:brightness-110 gold-gradient">
                Reserva tu cita en el link
                <ArrowRight className="h-5 w-5" />
              </button>
            </a>
          </Reveal>
        </div>
      </section>

      {/* Promociones */}
      <section className="landing-section-alt border-t px-5 py-16">
        <Reveal>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Promociones</p>
          <h2 className="mt-2 font-display text-2xl font-black text-charcoal">Experiencias destacadas</h2>
        </Reveal>
        <div className="mt-8 space-y-3">
          {promotions.map((promo, i) => (
            <Reveal key={promo.id} delay={i * 60}>
              <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-lg font-bold text-charcoal">{promo.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{promo.desc}</p>
                  </div>
                  {promo.tag && (
                    <span className="shrink-0 rounded-full bg-gold px-2.5 py-0.5 text-[8px] font-bold uppercase text-white">
                      {promo.tag}
                    </span>
                  )}
                </div>
                <a href={clinic.linktree} target="_blank" rel="noopener noreferrer">
                  <button className="mt-4 text-xs font-semibold text-gold-dark transition-opacity hover:opacity-80">
                    Consultar disponibilidad →
                  </button>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Portal */}
      <section className="px-5 py-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-gold/20 p-6 gold-gradient text-white shadow-[var(--shadow-gold)]">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-black/5 blur-2xl" />
            <div className="relative">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/75">Portal del paciente</p>
              <h2 className="mt-2 font-display text-2xl font-black leading-tight text-white">
                Tu historial clínico,
                <br />
                siempre contigo.
              </h2>
              <p className="mt-2 text-sm text-white/85">
                Gestiona citas, evolución y chat con tu equipo desde el móvil.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  { icon: Calendar, text: "Citas" },
                  { icon: Sparkles, text: "Evolución" },
                  { icon: MessageCircle, text: "Chat" },
                  { icon: Shield, text: "Privado" },
                ].map(({ icon: Icon, text }) => (
                  <span key={text} className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm">
                    <Icon className="h-3 w-3" />
                    {text}
                  </span>
                ))}
              </div>
              <Link href="/login">
                <button className="landing-inverse-btn mt-5 flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-sm font-bold">
                  Acceder al portal
                  <ArrowRight className="landing-inverse-btn-icon h-5 w-5" />
                </button>
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-5 pb-10 pt-10">
        <TerracotaLogo size="sm" variant={isDark ? "dark" : "light"} />
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2">
          <Link href="/login" className="text-xs text-muted transition-colors hover:text-gold">Portal Paciente</Link>
          <Link href="/login?role=doctor" className="text-xs text-muted transition-colors hover:text-gold">Portal Médico</Link>
          <a href={clinic.linktree} target="_blank" rel="noopener noreferrer" className="text-xs text-muted transition-colors hover:text-gold">Reservar cita</a>
          <a href={`tel:${clinic.phone}`} className="text-xs text-muted transition-colors hover:text-gold">Llamar</a>
        </div>
        <p className="mt-6 flex items-center gap-1.5 text-[10px] text-muted">
          <MapPin className="h-3 w-3" />
          {clinic.address} · {clinic.city}
        </p>
        <p className="mt-2 text-[10px] text-muted/70">© 2026 Terracota · by Smile More Spa</p>
      </footer>
    </div>
  );
}
