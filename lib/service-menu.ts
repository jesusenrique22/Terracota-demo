/* ====================================================
   TERRACOTA — Menú de Servicios (brochure)
   ==================================================== */

export interface MenuItem {
  name: string;
  price?: string;
  detail?: string;
}

export interface MenuCategory {
  id: string;
  group: "facial" | "corporal" | "laser" | "spa" | "salud";
  title: string;
  subtitle?: string;
  note?: string;
  items: MenuItem[];
}

export const menuGroups = [
  { id: "facial", label: "Facial" },
  { id: "corporal", label: "Corporal" },
  { id: "laser", label: "Láser" },
  { id: "spa", label: "Spa & masajes" },
  { id: "salud", label: "Salud" },
] as const;

export const serviceMenu: MenuCategory[] = [
  {
    id: "limpieza-facial",
    group: "facial",
    title: "Limpieza facial profunda",
    subtitle: "Protocolo completo",
    items: [
      {
        name: "Limpieza profunda + microdermoabrasión + hidratación + máscara LED",
        price: "40$",
        detail: "Incluye limpieza profunda, microdermoabrasión, hidratación facial y máscara LED.",
      },
    ],
  },
  {
    id: "vitaminas-ncft",
    group: "facial",
    title: "Aplicación vitaminas NCFT",
    items: [
      { name: "Vial completo", price: "150$" },
      { name: "Hydraligh", price: "90$" },
      { name: "Team Glow", price: "60$" },
      { name: "Enzimas PBSerum", price: "160$" },
      { name: "Lemon Bottle", price: "120$" },
    ],
  },
  {
    id: "botox",
    group: "facial",
    title: "Aplicación de bótox",
    subtitle: "G-Tox · Maxitox · Allergan · Dysport",
    items: [{ name: "50 unidades", price: "130$" }],
  },
  {
    id: "pdrn",
    group: "facial",
    title: "Aplicación PDRN",
    items: [
      { name: "PDRN esperma de salmón + HA", price: "90$" },
      { name: "PDRN Cristal (esperma de salmón)", price: "130$" },
      { name: "Exosomas", price: "100$" },
    ],
  },
  {
    id: "fotoage",
    group: "facial",
    title: "Tratamiento fotoage",
    items: [
      { name: "Lámpara de fotoage", price: "30$" },
      { name: "Peeling de fotoage", price: "60$" },
    ],
  },
  {
    id: "laser-picosecond",
    group: "laser",
    title: "Láser picosecond",
    items: [
      { name: "Hollywood Peel", price: "50$" },
      { name: "Barrido de cejas", price: "30$" },
      { name: "Rejuvenecimiento facial", price: "30$" },
      { name: "Eliminación de tatuajes", price: "desde 25$" },
      { name: "Tratamiento de melasma", price: "30$" },
    ],
  },
  {
    id: "depilacion-laser",
    group: "laser",
    title: "Depilación láser",
    subtitle: "Promo DIAMOND · ORO/DIAMOND",
    note: "También trabajamos planes personalizados. Los paquetes cuentan con plan de financiamiento.",
    items: [
      {
        name: "Promo DIAMOND — 8 sesiones axila, pierna completa, bikini completo + interglúteo, bozo y pie",
        price: "8 cuotas de 72$",
      },
    ],
  },
  {
    id: "maderoterapia",
    group: "spa",
    title: "Maderoterapia técnica Golden Girl",
    note: "Cada sesión dura 60 min, excepto marcación abdominal (30–45 min).",
    items: [
      { name: "Drenaje linfático", price: "5 sesiones · 75$" },
      { name: "Maderoterapia", price: "5 sesiones · 70$" },
      { name: "Metalterapia", price: "3 sesiones · 75$" },
    ],
  },
  {
    id: "masajes",
    group: "spa",
    title: "Servicio de masajes",
    note: "Cada sesión dura 60 min, excepto marcación abdominal (30–45 min).",
    items: [
      { name: "Marcación abdominal", price: "3 sesiones · 65$" },
      { name: "Masaje descontracturante", price: "35$" },
      { name: "Descarga muscular", price: "35$" },
      { name: "Masaje relajante", price: "60$" },
      { name: "Masaje relajante en pareja", price: "90$" },
    ],
  },
  {
    id: "post-operatorio",
    group: "spa",
    title: "Masaje post operatorio",
    subtitle: "Con evaluación previa",
    note: "Cada sesión dura 1 hora.",
    items: [{ name: "Paquete de 10 sesiones", price: "200$" }],
  },
  {
    id: "ultracavitacion",
    group: "corporal",
    title: "Ultracavitación y radiofrecuencia",
    items: [{ name: "Paquete de 5 sesiones", price: "90$" }],
  },
  {
    id: "jordi-shape",
    group: "corporal",
    title: "Jordi Shape",
    note: "Cada sesión dura 1 hora.",
    items: [
      { name: "Corporal — sesión individual", price: "60$" },
      { name: "Corporal — 4 sesiones", price: "200$" },
      { name: "Facial — sesión individual", price: "60$" },
      { name: "Facial — 4 sesiones", price: "200$" },
    ],
  },
  {
    id: "em-slim",
    group: "corporal",
    title: "EM Slim",
    note: "Cada sesión dura 1 hora con activación de punto de drenaje.",
    items: [
      { name: "Sesión individual", price: "20$" },
      { name: "Paquete 5 sesiones", price: "90$" },
    ],
  },
  {
    id: "luz-infrarroja",
    group: "corporal",
    title: "Terapia luz infrarroja",
    items: [
      { name: "Sesión individual", price: "25$" },
      { name: "Paquete 5 sesiones", price: "100$" },
    ],
  },
  {
    id: "sueroterapia",
    group: "salud",
    title: "Sueroterapia",
    subtitle: "Servicio de enfermería",
    note: "Consulta disponibilidad y precios según protocolo personalizado.",
    items: [
      { name: "Cóctel Myer + glutation + licina HCL", price: "Consultar" },
      { name: "Cóctel Myer — aumento de energía", price: "Consultar" },
      { name: "Cóctel belleza", price: "Consultar" },
      { name: "Reparación del intestino saludable", price: "Consultar" },
      { name: "Infusión IV para migraña y dolor de cabeza", price: "Consultar" },
      { name: "Recuperación de viaje o jet lag", price: "Consultar" },
      { name: "Pérdida de peso", price: "Consultar" },
      { name: "Goteo NAD", price: "Consultar" },
      { name: "Hidratación", price: "Consultar" },
      { name: "Resfriado y gripe", price: "Consultar" },
      { name: "Náuseas, vómito y diarrea", price: "Consultar" },
      { name: "Inmune", price: "Consultar" },
      { name: "Resaca", price: "Consultar" },
      { name: "Quemaduras de sol", price: "Consultar" },
      { name: "Vitamina C", price: "Consultar" },
      { name: "Infusión de apoyo detox", price: "Consultar" },
      { name: "Infusión de aminoácidos", price: "Consultar" },
    ],
  },
];

export function getMenuByGroup(group: MenuCategory["group"]) {
  return serviceMenu.filter((cat) => cat.group === group);
}

export const menuStats = {
  categories: serviceMenu.length,
  treatments: serviceMenu.reduce((acc, cat) => acc + cat.items.length, 0),
};
