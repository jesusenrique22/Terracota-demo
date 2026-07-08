/* ====================================================
   VITA STUDIO — Mock Data & Types
   ==================================================== */

import { getClinicLocationLabel } from "@/lib/clinics";

/* ---------- Types ---------- */

export type AppointmentType = "online" | "presencial";
export type AppointmentStatus = "confirmada" | "pendiente" | "completada" | "cancelada";

export interface Appointment {
  id: string;
  service: string;
  professional: string;
  date: string;
  time: string;
  type: AppointmentType;
  clinicId?: string;
  location?: string;
  status: AppointmentStatus;
}

/* ---------- Staff (demo) ---------- */

export const nutritionist = {
  name: "Dra. Valentina Morales",
  instagram: "@dra.valentinamorales",
};

export const aestheticDoctor = {
  name: "Dr. Andrés Delgado",
  initials: "AD",
  email: "dr.delgado@vitastudio.demo",
  specialty: "Medicina Estética",
  instagram: "@dr.andresdelgado",
};

/* ---------- Patient ---------- */

export const patient = {
  name: "María González",
  initials: "MG",
  email: "maria.gonzalez@vitastudio.demo",
  doctor: nutritionist.name,
  primaryClinicId: "vita-studio",
  memberSince: "Mar 2024",
  age: 34,
  phone: "+58 412 555-0198",
};

/* ---------- Doctor (for portal) ---------- */

export const doctorUser = {
  name: aestheticDoctor.name,
  initials: aestheticDoctor.initials,
  email: aestheticDoctor.email,
  specialty: aestheticDoctor.specialty,
  instagram: aestheticDoctor.instagram,
};

/* ---------- Appointments ---------- */

export const upcomingAppointment: Appointment = {
  id: "apt-001",
  service: "Consulta Nutricional Metabólica",
  professional: nutritionist.name,
  date: "28 Jun 2026",
  time: "10:30 AM",
  type: "online",
  clinicId: "vita-studio",
  location: "Telemedicina · Vita Studio",
  status: "confirmada",
};

export const appointments = {
  upcoming: [
    upcomingAppointment,
    {
      id: "apt-002",
      service: "Control de Evolución Estética",
      professional: aestheticDoctor.name,
      date: "15 Jul 2026",
      time: "4:00 PM",
      type: "presencial" as AppointmentType,
      clinicId: "vita-studio",
      location: getClinicLocationLabel("vita-studio"),
      status: "pendiente" as AppointmentStatus,
    },
  ] as Appointment[],
  history: [
    {
      id: "apt-h1",
      service: "Aplicación de Bótox · Zona Frontal",
      professional: aestheticDoctor.name,
      date: "12 Dic 2025",
      time: "11:00 AM",
      type: "presencial" as AppointmentType,
      status: "completada" as AppointmentStatus,
    },
    {
      id: "apt-h2",
      service: "Consulta Nutricional",
      professional: nutritionist.name,
      date: "3 Nov 2025",
      time: "9:00 AM",
      type: "online" as AppointmentType,
      status: "completada" as AppointmentStatus,
    },
    {
      id: "apt-h3",
      service: "Sesión HIFU 2.5D · Rostro",
      professional: aestheticDoctor.name,
      date: "5 Sep 2025",
      time: "2:00 PM",
      type: "presencial" as AppointmentType,
      status: "completada" as AppointmentStatus,
    },
  ] as Appointment[],
};

/* ---------- Services & Professionals ---------- */

export const services = [
  { id: "s1", name: "Consulta Nutricional Metabólica", duration: "45 min", price: "$85" },
  { id: "s2", name: "Bótox Facial",         duration: "30 min", price: "$320" },
  { id: "s3", name: "Láser CO2 Fraccionado", duration: "60 min", price: "$450" },
  { id: "s4", name: "HIFU 2.5D · Rostro",   duration: "90 min", price: "$680" },
  { id: "s5", name: "Skin Vision Pro",       duration: "30 min", price: "$60" },
  { id: "s6", name: "Control de Evolución",  duration: "30 min", price: "$60" },
];

export const professionals = [
  { id: "p1", name: nutritionist.name,      specialty: "Nutrición Metabólica", instagram: nutritionist.instagram,      clinicIds: ["vita-studio"] },
  { id: "p2", name: aestheticDoctor.name,   specialty: aestheticDoctor.specialty, instagram: aestheticDoctor.instagram, clinicIds: ["vita-studio"] },
  { id: "p3", name: "Lic. Ana Torres",    specialty: "Estética & Masajes",    instagram: "@anatorres.spa",   clinicIds: ["vita-studio"] },
];

/* ---------- Evolution Metrics ---------- */

export const evolutionMetrics = [
  { month: "Jul", peso: 72.4, grasa: 32, musculo: 28, cintura: 88 },
  { month: "Ago", peso: 71.1, grasa: 30, musculo: 29, cintura: 86 },
  { month: "Sep", peso: 70.2, grasa: 29, musculo: 30, cintura: 84 },
  { month: "Oct", peso: 69.5, grasa: 27, musculo: 31, cintura: 82 },
  { month: "Nov", peso: 68.8, grasa: 26, musculo: 32, cintura: 80 },
  { month: "Dic", peso: 68.1, grasa: 25, musculo: 33, cintura: 79 },
  { month: "Ene", peso: 67.6, grasa: 24, musculo: 34, cintura: 78 },
  { month: "Feb", peso: 67.2, grasa: 23, musculo: 34, cintura: 77 },
  { month: "Mar", peso: 66.8, grasa: 22, musculo: 35, cintura: 76 },
  { month: "Abr", peso: 66.4, grasa: 21, musculo: 35, cintura: 75 },
  { month: "May", peso: 66.0, grasa: 20, musculo: 36, cintura: 74 },
  { month: "Jun", peso: 65.6, grasa: 19, musculo: 36, cintura: 73 },
];

export const treatmentTimeline = [
  { id: "t1", date: "Jun 2026", label: "Hoy",           title: "Control mensual de composición corporal", category: "Nutrición" },
  { id: "t2", date: "Dic 2025", label: "Hace 6 meses",  title: "Aplicación de Bótox · Zona periorbital",  category: "Estética" },
  { id: "t3", date: "Sep 2025", label: "Hace 9 meses",  title: "HIFU 2.5D · Tratamiento facial completo",  category: "Estética" },
  { id: "t4", date: "Jul 2025", label: "Hace 11 meses", title: "Plan metabólico personalizado · Fase II",  category: "Nutrición" },
  { id: "t5", date: "Jun 2025", label: "Hace 1 año",    title: "Evaluación inicial · Fotos de referencia", category: "Inicio" },
];

/* ---------- Daily Meals ---------- */

export const dailyMeals = [
  { id: "m1", time: "07:30", name: "Desayuno",    description: "Avena proteica con arándanos y almendras",  kcal: 380, status: "cumplida"  as const },
  { id: "m2", time: "10:30", name: "Merienda AM", description: "Yogurt griego natural + semillas de chía",   kcal: 180, status: "cumplida"  as const },
  { id: "m3", time: "13:00", name: "Almuerzo",    description: "Salmón a la plancha, quinoa y ensalada verde", kcal: 520, status: "pendiente" as const },
  { id: "m4", time: "16:30", name: "Merienda PM", description: "Batido verde · espinaca, pepino, limón",      kcal: 140, status: "pendiente" as const },
  { id: "m5", time: "19:30", name: "Cena",        description: "Pollo orgánico, vegetales al vapor",          kcal: 410, status: "pendiente" as const },
];

/* ---------- Chat ---------- */

export const chatChannels = [
  { id: "concierge", name: "Concierge · Citas", subtitle: "Atención al cliente", lastMessage: "Su cita del 28 Jun está confirmada ✓", time: "09:15", unread: 0 },
  { id: "medical",   name: "Soporte Médico",     subtitle: nutritionist.name,   lastMessage: "Recuerde hidratarse antes de la consulta",  time: "Ayer", unread: 2 },
];

export const chatMessages: Record<string, { id: string; from: "user" | "agent" | "doctor"; text: string; time: string }[]> = {
  concierge: [
    { id: "c1", from: "agent", text: "Buenos días, María. ¿En qué podemos ayudarle hoy?",                           time: "09:10" },
    { id: "c2", from: "user",  text: "Quisiera confirmar mi cita de telemedicina",                                   time: "09:12" },
    { id: "c3", from: "agent", text: "Su cita del 28 Jun está confirmada ✓ Recibirá el enlace 15 min antes.",        time: "09:15" },
  ],
  medical: [
    { id: "m1", from: "doctor", text: "María, revisé su registro de ayer. ¡Excelente cumplimiento! 🌟",              time: "18:40" },
    { id: "m2", from: "user",   text: "Gracias doctora. ¿Puedo sustituir la merienda por fruta?",                    time: "18:52" },
    { id: "m3", from: "doctor", text: "Recuerde hidratarse bien antes de la consulta. Sí, puede usar manzana verde.",time: "19:05" },
  ],
};

/* ---------- Boutique Products ---------- */

export const products = [
  { id: "prod-1", name: "Serum Vitamina C 20%",        brand: "SkinCeuticals",  price: 98,  category: "Dermatología", recommended: true,  image: "/product-serum.jpg" },
  { id: "prod-2", name: "Colágeno Hidrolizado Premium", brand: "Vita Lab", price: 54,  category: "Suplementos",  recommended: true,  image: "/product-collagen.jpg" },
  { id: "prod-3", name: "Crema Retinol 0.5%",           brand: "Obagi",          price: 112, category: "Dermatología", recommended: false, image: "/product-cream.jpg" },
  { id: "prod-4", name: "Omega-3 Metabólico",           brand: "Vita Lab", price: 42,  category: "Suplementos",  recommended: true,  image: "/product-omega.jpg" },
];

export const orders = [
  { id: "ord-001", date: "10 Jun 2026", total: 152, items: 2, status: "Entregado" },
  { id: "ord-002", date: "22 May 2026", total: 98,  items: 1, status: "Entregado" },
];

/* ---------- Doctor Portal — Patients List ---------- */

export const doctorPatients = [
  { id: "dp1", name: "María González",    initials: "MG", lastVisit: "12 Jun 2026", nextAppointment: "28 Jun 2026", treatment: "Nutrición Metabólica", unreadMessages: 2, status: "activa" },
  { id: "dp2", name: "Sofía Rodríguez",   initials: "SR", lastVisit: "08 Jun 2026", nextAppointment: "02 Jul 2026", treatment: "Bótox + HIFU",         unreadMessages: 0, status: "activa" },
  { id: "dp3", name: "Carmen Montoya",    initials: "CM", lastVisit: "01 Jun 2026", nextAppointment: "18 Jul 2026", treatment: "Láser CO2",             unreadMessages: 1, status: "activa" },
  { id: "dp4", name: "Isabella Ríos",     initials: "IR", lastVisit: "25 May 2026", nextAppointment: null,          treatment: "Skin Vision Pro",       unreadMessages: 0, status: "pendiente" },
];

export const doctorTodayAppointments: Appointment[] = [
  { id: "da-1", service: "Consulta Nutricional Metabólica", professional: nutritionist.name, date: "27 Jun 2026", time: "09:00 AM", type: "online",     status: "confirmada" },
  { id: "da-2", service: "Aplicación de Bótox · Zona Frontal", professional: aestheticDoctor.name, date: "27 Jun 2026", time: "11:30 AM", type: "presencial", status: "confirmada" },
  { id: "da-3", service: "Control de Evolución",           professional: aestheticDoctor.name, date: "27 Jun 2026", time: "02:00 PM", type: "presencial", status: "pendiente" },
  { id: "da-4", service: "HIFU 2.5D · Rostro",            professional: aestheticDoctor.name, date: "27 Jun 2026", time: "04:30 PM", type: "presencial", status: "pendiente" },
];
