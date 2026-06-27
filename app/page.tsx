"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Calendar,
  ChevronDown,
  MapPin,
  MessageCircle,
  Phone,
  Shield,
  Sparkles,
  Star,
} from "lucide-react";
import { VitalCareLogo } from "@/components/brand/logo";

/* ============================================================
   INSTAGRAM SVG ICON
   ============================================================ */
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

/* ============================================================
   REVEAL HOOK — Intersection Observer
   ============================================================ */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ============================================================
   SERVICES
   ============================================================ */
const services = [
  { label: "HIFU 2.5D",            sub: "Lifting Facial",       img: "/svc-hifu.jpg",      tag: "Más popular" },
  { label: "Medicina Estética",     sub: "Bótox & Rellenos",     img: "/svc-botox.jpg",     tag: null },
  { label: "Láser CO₂",            sub: "Fraccionado",          img: "/svc-laser.jpg",     tag: null },
  { label: "Nutrición Metabólica",  sub: "Plan personalizado",   img: "/svc-nutrition.jpg", tag: "Novedad" },
];

const doctors = [
  { name: "Dr. Carlos Bracho", role: "Medicina Estética",    handle: "@drcarlosbracho",   img: "/dr-carlos.jpg", years: "15+" },
  { name: "Dra. Jenni Bracho", role: "Nutrición Metabólica", handle: "@dra.jennibracho",  img: "/dr-jenni.jpg",  years: "12+" },
];



/* ============================================================
   REVEAL SECTION WRAPPER
   ============================================================ */
function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ============================================================
   MAIN PAGE
   ============================================================ */
export default function LandingPage() {
  const [navSolid, setNavSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="landing-page min-h-dvh overflow-x-hidden bg-[#0a0a0a]">

      {/* ====================================================
          NAV — floating → solid on scroll
          ==================================================== */}
      <nav
        className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 transition-all duration-300"
        style={{
          background: navSolid ? "rgba(10,10,10,0.95)" : "transparent",
          backdropFilter: navSolid ? "blur(16px)" : "none",
          borderBottom: navSolid ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <VitalCareLogo size="sm" variant="dark" />
        <Link href="/login">
          <button className="rounded-full border border-white/20 bg-white/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-white/90 backdrop-blur-sm transition-all hover:bg-white/15 hover:border-white/30">
            Acceder
          </button>
        </Link>
      </nav>

      {/* ====================================================
          HERO — Full-screen dark cinematic
          ==================================================== */}
      <section className="relative min-h-dvh overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/hero-dark.jpg"
            alt="VitalCare Clínica Estética Maracaibo"
            fill
            priority
            className="object-cover"
          />
          {/* Multi-layer overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
        </div>

        {/* Ambient glow */}
        <div className="absolute bottom-1/3 right-1/4 h-64 w-64 rounded-full bg-[#c4a265]/10 blur-3xl pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 flex min-h-dvh flex-col justify-end px-6 pb-10 pt-24">
          {/* Badge */}
          <div className="mb-5 animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#c4a265]/30 bg-[#c4a265]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#c4a265] backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c4a265] animate-pulse" />
              Clínica Estética Avanzada
            </span>
          </div>

          {/* Headline — BIG editorial */}
          <div className="animate-fade-up delay-100">
            <h1 className="font-display text-[3.25rem] font-black leading-[0.95] tracking-tight text-white">
              Transforma
              <br />
              <span className="italic text-[#c4a265]">tu piel.</span>
              <br />
              Renueva tu
              <br />
              <span className="italic">vida.</span>
            </h1>
          </div>

          <p className="mt-5 max-w-[260px] text-sm leading-relaxed text-white/60 animate-fade-up delay-200">
            Medicina estética avanzada y nutrición metabólica de precisión.
          </p>

          {/* CTAs */}
          <div className="mt-7 flex flex-col gap-3 animate-fade-up delay-300">
            <Link href="/login">
              <button className="flex w-full items-center justify-between rounded-2xl bg-[#c4a265] px-5 py-4 font-bold text-black transition-all active:scale-[0.98] hover:bg-[#d4b275]">
                <span className="text-sm">Agendar Cita</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </Link>
            <a href="#tratamientos">
              <button className="flex w-full items-center justify-between rounded-2xl border border-white/15 bg-white/5 px-5 py-4 backdrop-blur-sm transition-all active:scale-[0.98] hover:bg-white/10">
                <span className="text-sm font-semibold text-white">Explorar Tratamientos</span>
                <ArrowRight className="h-5 w-5 text-white/50" />
              </button>
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="mt-10 flex items-center gap-2 animate-fade-up delay-400">
            <div className="h-px flex-1 bg-white/10" />
            <ChevronDown className="h-4 w-4 text-white/30 animate-pulse-soft" />
            <div className="h-px flex-1 bg-white/10" />
          </div>
        </div>
      </section>



      {/* ====================================================
          SERVICES — Cards con imagen
          ==================================================== */}
      <section id="tratamientos" className="bg-[#0a0a0a] px-5 py-14">
        <Reveal>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.3em] text-[#c4a265]">
            Tratamientos
          </p>
          <h2 className="font-display text-3xl font-black text-white leading-tight">
            Experiencias de
            <br />
            <span className="italic text-white/60">excelencia</span>
          </h2>
        </Reveal>

        <div className="mt-7 space-y-3">
          {services.map((svc, i) => (
            <Reveal key={svc.label} delay={i * 80}>
              <div className="group relative h-40 overflow-hidden rounded-2xl">
                <Image
                  src={svc.img}
                  alt={svc.label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-between px-5">
                  <div>
                    {svc.tag && (
                      <span className="mb-1.5 inline-block rounded-full bg-[#c4a265] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-black">
                        {svc.tag}
                      </span>
                    )}
                    <p className="font-display text-xl font-bold text-white leading-tight">{svc.label}</p>
                    <p className="text-xs text-white/55">{svc.sub}</p>
                  </div>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
                    <ArrowRight className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Skin Vision Pro highlight */}
        <Reveal delay={400}>
          <div className="mt-3 relative overflow-hidden rounded-2xl border border-[#c4a265]/20 bg-[#c4a265]/5 p-5">
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#c4a265]/10 blur-2xl" />
            <div className="relative">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.25em] text-[#c4a265]">Tecnología</p>
              <p className="font-display text-xl font-bold text-white">Skin Vision Pro</p>
              <p className="mt-1 text-xs leading-relaxed text-white/50">Análisis cutáneo de alta precisión con imagen espectral avanzada.</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ====================================================
          PHILOSOPHY — Tipografía gigante
          ==================================================== */}
      <section className="relative overflow-hidden bg-[#111111] py-16">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <p className="select-none font-display text-[22vw] font-black uppercase text-white/3 leading-none">
            VC
          </p>
        </div>
        <div className="relative px-6">
          <Reveal>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#c4a265]">
              Nuestra filosofía
            </p>
          </Reveal>
          <div className="space-y-5">
            {[
              { word: "Belleza", desc: "Resultados visibles con precisión médica y elegancia natural." },
              { word: "Salud",   desc: "Ciencia de vanguardia y nutrición personalizada de precisión." },
              { word: "Compromiso", desc: "Acompañamiento cercano en cada etapa de tu transformación." },
            ].map((p, i) => (
              <Reveal key={p.word} delay={i * 120}>
                <div className="border-b border-white/6 pb-5">
                  <p className="font-display text-4xl font-black italic text-white">{p.word}</p>
                  <p className="mt-1.5 text-sm text-white/45">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          DOCTORS
          ==================================================== */}
      <section className="bg-[#0a0a0a] px-5 py-14">
        <Reveal>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.3em] text-[#c4a265]">
            Equipo médico
          </p>
          <h2 className="font-display text-3xl font-black text-white leading-tight">
            Profesionales de
            <br />
            <span className="italic text-white/60">confianza</span>
          </h2>
        </Reveal>

        <div className="mt-7 space-y-4">
          {doctors.map((doc, i) => (
            <Reveal key={doc.name} delay={i * 100}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/6 bg-[#141414]">
                <div className="flex gap-4 p-4">
                  {/* Photo */}
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={doc.img}
                      alt={doc.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  {/* Info */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="font-display text-lg font-bold text-white leading-tight">{doc.name}</p>
                      <p className="text-xs text-white/50">{doc.role}</p>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <a
                        href={`https://instagram.com/${doc.handle.replace("@","")}`}
                        target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-[10px] text-[#c4a265] font-semibold"
                      >
                        <InstagramIcon className="h-3 w-3" />
                        {doc.handle}
                      </a>
                      <span className="rounded-full border border-[#c4a265]/25 px-2 py-0.5 text-[9px] font-bold text-[#c4a265]">
                        {doc.years} años
                      </span>
                    </div>
                  </div>
                </div>
                {/* Bottom accent */}
                <div className="h-0.5 w-0 bg-gradient-to-r from-[#c4a265] to-transparent transition-all duration-500 group-hover:w-full" />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Instagram link */}
        <Reveal delay={200}>
          <a
            href="https://instagram.com/vitalcare.ca"
            target="_blank" rel="noopener noreferrer"
            className="mt-5 flex items-center justify-center gap-2 text-xs text-white/30 hover:text-[#c4a265] transition-colors"
          >
            <InstagramIcon className="h-3.5 w-3.5" />
            @vitalcare.ca · 26.8K seguidores
          </a>
        </Reveal>
      </section>



      {/* ====================================================
          PORTAL CTA — Premium card
          ==================================================== */}
      <section className="px-5 py-14 bg-[#0a0a0a]">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-[#c4a265] p-6">
            {/* Background pattern */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <div className="pointer-events-none absolute -left-5 bottom-0 h-28 w-28 rounded-full bg-black/10 blur-xl" />

            <div className="relative">
              <span className="mb-3 inline-block rounded-full bg-black/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black/70">
                Portal exclusivo
              </span>
              <h2 className="font-display text-3xl font-black leading-tight text-black">
                Tu experiencia
                <br />
                VitalCare, digital.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-black/65">
                Citas, evolución clínica, nutrición y chat con tu médico — todo en tu teléfono.
              </p>

              {/* Feature pills */}
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  { icon: Calendar,    text: "Agenda" },
                  { icon: Sparkles,    text: "Evolución" },
                  { icon: MessageCircle, text: "Chat médico" },
                  { icon: Shield,      text: "Confidencial" },
                ].map(({ icon: Icon, text }) => (
                  <span key={text} className="flex items-center gap-1.5 rounded-full bg-black/10 px-3 py-1.5 text-[11px] font-semibold text-black/70">
                    <Icon className="h-3 w-3" strokeWidth={2} />
                    {text}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-2.5">
                <Link href="/login">
                  <button className="flex w-full items-center justify-between rounded-xl bg-black px-4 py-3.5 font-bold text-[#c4a265] transition-all active:scale-[0.98]">
                    <span className="text-sm">Acceder al portal</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </Link>
                <a href="https://wa.link/vc3axb" target="_blank" rel="noopener noreferrer">
                  <button className="flex w-full items-center justify-between rounded-xl bg-white/20 px-4 py-3.5 font-bold text-black/70 transition-all active:scale-[0.98] hover:bg-white/30">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span className="text-sm">WhatsApp</span>
                    </div>
                    <span className="text-xs">wa.link/vc3axb</span>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ====================================================
          FOOTER
          ==================================================== */}
      <footer className="border-t border-white/6 bg-[#0a0a0a] px-5 pb-10 pt-8">
        <div className="flex items-center justify-between">
          <VitalCareLogo size="sm" variant="dark" />
          <a
            href="https://instagram.com/vitalcare.ca"
            target="_blank" rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/40 transition-colors hover:border-[#c4a265]/40 hover:text-[#c4a265]"
          >
            <InstagramIcon className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2">
          <Link href="/login" className="text-xs text-white/30 hover:text-white/60 transition-colors">Portal Paciente</Link>
          <Link href="/login?role=doctor" className="text-xs text-white/30 hover:text-white/60 transition-colors">Portal Médico</Link>
          <a href="https://wa.link/vc3axb" target="_blank" rel="noopener noreferrer" className="text-xs text-white/30 hover:text-white/60 transition-colors">WhatsApp</a>
          <a href="https://instagram.com/vitalcare.ca" target="_blank" rel="noopener noreferrer" className="text-xs text-white/30 hover:text-white/60 transition-colors">Instagram</a>
        </div>

        <div className="mt-6 flex items-center gap-1.5 text-[10px] text-white/20">
          <MapPin className="h-3 w-3 shrink-0" />
          Clínica Estética y Nutrición Metabólica
        </div>

        <p className="mt-3 text-[10px] text-white/15">© 2026 Vital Care C.A. · Clínica Estética</p>
      </footer>

    </div>
  );
}
