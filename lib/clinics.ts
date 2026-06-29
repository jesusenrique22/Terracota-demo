/* ====================================================
   TERRACOTA — by Smile More Spa
   ==================================================== */

export interface ClinicService {
  id: string;
  label: string;
  description: string;
  tag?: string;
}

export interface Clinic {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  handle: string;
  category: string;
  accent: string;
  accentMuted: string;
  description: string;
  services: ClinicService[];
  address: string;
  city: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  linktree?: string;
  hours: string;
  initials: string;
  portalEmailDomain: string;
}

export const terracota: Clinic = {
  id: "terracota",
  slug: "terracota",
  name: "Terracota",
  tagline: "by Smile More Spa",
  handle: "@terracotabysmilemore",
  category: "Salud y belleza",
  accent: "#c2b280",
  accentMuted: "rgba(194, 178, 128, 0.12)",
  description:
    "Centro de estética avanzada y bienestar en Maracaibo. Tratamientos faciales, corporales y terapéuticos con un enfoque premium y resultados reales.",
  services: [
    {
      id: "s1",
      label: "Estética avanzada",
      description: "Protocolos faciales y corporales con tecnología de vanguardia y resultados visibles.",
      tag: "Destacado",
    },
    {
      id: "s2",
      label: "Masajes terapéuticos",
      description: "Sesiones relajantes y descontracturantes, incluyendo experiencias en pareja.",
    },
    {
      id: "s3",
      label: "Bioestimuladores y bótox",
      description: "Rejuvenecimiento natural con medicina estética de precisión.",
    },
    {
      id: "s4",
      label: "Depilación láser",
      description: "Tecnología láser de última generación para una piel suave y duradera.",
    },
    {
      id: "s5",
      label: "Quemadores de grasa",
      description: "Tratamientos corporales en tendencia para moldear y redefinir tu silueta.",
      tag: "En tendencia",
    },
    {
      id: "s6",
      label: "Tratamientos corporales",
      description: "Programas personalizados para tonificar, hidratar y revitalizar.",
    },
  ],
  address: "C.C Camoruco, Piso 1",
  city: "Maracaibo, Venezuela",
  phone: "+58 424 555-0200",
  whatsapp: "https://linktr.ee/terracotamcbo",
  instagram: "https://instagram.com/terracotabysmilemore",
  linktree: "https://linktr.ee/terracotamcbo",
  hours: "Lunes a sábado · 9:00 AM – 6:00 PM",
  initials: "TR",
  portalEmailDomain: "terracota.smilemore",
};

export const clinics = [terracota];
export const defaultClinic = terracota;

export function getClinicBySlug(slug: string): Clinic | undefined {
  return slug === terracota.slug ? terracota : undefined;
}

export function getClinicById(id: string): Clinic | undefined {
  return id === terracota.id ? terracota : undefined;
}

export function getClinicLocationLabel(_clinicId?: string): string {
  return `${terracota.name} · ${terracota.address}`;
}

export const experiencePillars = [
  {
    title: "Ambiente premium",
    desc: "Espacios cálidos con estética terracota, luz suave y atención personalizada en cada visita.",
  },
  {
    title: "Tecnología avanzada",
    desc: "Láser, bioestimuladores y protocolos de estética médica con equipos de última generación.",
  },
  {
    title: "Bienestar integral",
    desc: "Masajes terapéuticos y tratamientos que cuidan tu piel, tu cuerpo y tu tranquilidad.",
  },
];

export const promotions = [
  {
    id: "p1",
    title: "Masaje en pareja",
    desc: "Sesión relajante para dos personas en nuestro espacio premium.",
    tag: "Popular",
  },
  {
    id: "p2",
    title: "Quemadores de grasa",
    desc: "Protocolos corporales en tendencia para moldear y tonificar.",
    tag: "En tendencia",
  },
  {
    id: "p3",
    title: "Paquete estética + spa",
    desc: "Combina facial avanzado con masaje terapéutico en una sola visita.",
  },
];

export const activeTreatments = [
  { id: "t1", name: "Depilación láser", progress: 50, sessions: "3 de 6 sesiones", next: "15 Jul" },
  { id: "t2", name: "Masaje terapéutico", progress: 100, sessions: "Completado", next: null },
  { id: "t3", name: "Bioestimuladores", progress: 25, sessions: "1 de 4 sesiones", next: "28 Jun" },
];
