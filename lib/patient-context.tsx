"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import {
  patient,
  appointments as initialAppointments,
  dailyMeals,
  chatMessages as initialChatMessages,
  chatChannels as initialChatChannels,
  type Appointment,
} from "@/lib/mock-data";
import { terracota } from "@/lib/clinics";

/* ====================================================
   TYPES
   ==================================================== */

export type MealStatus = "cumplida" | "no_cumplida" | "pendiente";

export interface MealEntry {
  id: string;
  time: string;
  name: string;
  description: string;
  kcal: number;
  status: MealStatus;
}

export interface ChatMessage {
  id: string;
  from: "user" | "agent" | "doctor";
  text: string;
  time: string;
}

export interface ChatChannel {
  id: string;
  name: string;
  subtitle: string;
  lastMessage: string;
  time: string;
  unread: number;
}

export interface ToastConfig {
  id: string;
  message: string;
  type: "success" | "info" | "warning";
  icon?: string;
}

/* ====================================================
   CONTEXT VALUE
   ==================================================== */

interface PatientContextValue {
  // Paciente
  patient: typeof patient;
  selectedClinicId: string;
  selectedClinic: typeof terracota;
  setSelectedClinicId: (id: string) => void;

  // Citas
  upcomingAppointments: Appointment[];
  pastAppointments: Appointment[];
  addAppointment: (apt: Appointment) => void;
  cancelAppointment: (id: string) => void;

  // Nutrición
  meals: MealEntry[];
  setMealStatus: (id: string, status: MealStatus) => void;
  completedMealsCount: number;
  totalKcal: number;
  doneKcal: number;

  // Carrito
  cart: Record<string, number>;
  updateCart: (id: string, delta: number) => void;
  cartCount: number;
  clearCart: () => void;

  // Chat
  channels: ChatChannel[];
  allMessages: Record<string, ChatMessage[]>;
  sendMessage: (channelId: string, text: string) => void;
  markChannelRead: (channelId: string) => void;
  totalUnread: number;
  isTyping: Record<string, boolean>;

  // Toast
  toasts: ToastConfig[];
  showToast: (message: string, type?: ToastConfig["type"], icon?: string) => void;
  dismissToast: (id: string) => void;
}

/* ====================================================
   CONTEXT
   ==================================================== */

const PatientContext = createContext<PatientContextValue | null>(null);

/* ====================================================
   BOT RESPONSES
   ==================================================== */

const botResponses: Record<string, string[]> = {
  concierge: [
    "Entendido. Verificaré eso de inmediato para usted. 🙏",
    "Por supuesto, con mucho gusto le ayudo con esa solicitud.",
    "Gracias por comunicarse con nosotros. Procesando su petición...",
    "Su cita del 28 Jun está confirmada ✓ ¿Necesita algo más?",
    "Nuestro equipo le atenderá en breve. ¿Tiene alguna otra pregunta?",
  ],
  medical: [
    "María, gracias por su mensaje. Lo revisaré ahora. 🩺",
    "Excelente consulta. La respondo en detalle en la próxima sesión.",
    "Recuerde continuar con su plan de hidratación. ¡Va muy bien!",
    "Sí, puede hacer esa sustitución con moderación. Anotado en su expediente.",
    "Le recomiendo descansar bien esta noche. ¡Su evolución es notable! ⭐",
  ],
};

/* ====================================================
   PROVIDER
   ==================================================== */

export function PatientProvider({ children }: { children: ReactNode }) {
  const [selectedClinicId, setSelectedClinicId] = useState(terracota.id);
  const selectedClinic = terracota;

  // Citas
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>(
    initialAppointments.upcoming
  );
  const [pastAppointments] = useState<Appointment[]>(initialAppointments.history);

  // Nutrición
  const [meals, setMeals] = useState<MealEntry[]>(
    dailyMeals.map((m) => ({ ...m, status: m.status as MealStatus }))
  );

  // Carrito
  const [cart, setCart] = useState<Record<string, number>>({});

  // Chat
  const [channels, setChannels] = useState<ChatChannel[]>(initialChatChannels);
  const [allMessages, setAllMessages] = useState<Record<string, ChatMessage[]>>(
    initialChatMessages as Record<string, ChatMessage[]>
  );
  const [isTyping, setIsTyping] = useState<Record<string, boolean>>({});
  const botTimerRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  // Toast
  const [toasts, setToasts] = useState<ToastConfig[]>([]);

  /* ---------- Citas ---------- */

  const addAppointment = useCallback((apt: Appointment) => {
    setUpcomingAppointments((prev) => [apt, ...prev]);
  }, []);

  const cancelAppointment = useCallback((id: string) => {
    setUpcomingAppointments((prev) => prev.filter((a) => a.id !== id));
  }, []);

  /* ---------- Nutrición ---------- */

  const setMealStatus = useCallback((id: string, status: MealStatus) => {
    setMeals((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)));
  }, []);

  const completedMealsCount = meals.filter((m) => m.status === "cumplida").length;
  const totalKcal = meals.reduce((acc, m) => acc + m.kcal, 0);
  const doneKcal = meals
    .filter((m) => m.status === "cumplida")
    .reduce((acc, m) => acc + m.kcal, 0);

  /* ---------- Carrito ---------- */

  const updateCart = useCallback((id: string, delta: number) => {
    setCart((prev) => {
      const next = (prev[id] ?? 0) + delta;
      if (next <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: next };
    });
  }, []);

  const clearCart = useCallback(() => setCart({}), []);

  const cartCount = Object.values(cart).reduce((acc, qty) => acc + qty, 0);

  /* ---------- Chat ---------- */

  const sendMessage = useCallback(
    (channelId: string, text: string) => {
      if (!text.trim()) return;
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
      const newMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        from: "user",
        text: text.trim(),
        time: timeStr,
      };

      setAllMessages((prev) => ({
        ...prev,
        [channelId]: [...(prev[channelId] ?? []), newMsg],
      }));

      setChannels((prev) =>
        prev.map((ch) =>
          ch.id === channelId
            ? { ...ch, lastMessage: text.trim(), time: timeStr }
            : ch
        )
      );

      // Simular respuesta del bot
      if (botTimerRef.current[channelId]) {
        clearTimeout(botTimerRef.current[channelId]);
      }

      // Mostrar "escribiendo..."
      setIsTyping((prev) => ({ ...prev, [channelId]: true }));

      botTimerRef.current[channelId] = setTimeout(() => {
        setIsTyping((prev) => ({ ...prev, [channelId]: false }));

        const responses = botResponses[channelId] ?? botResponses.concierge;
        const botText = responses[Math.floor(Math.random() * responses.length)];
        const botTimeStr = `${now.getHours().toString().padStart(2, "0")}:${(
          now.getMinutes() + 1
        ).toString().padStart(2, "0")}`;

        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          from: channelId === "medical" ? "doctor" : "agent",
          text: botText,
          time: botTimeStr,
        };

        setAllMessages((prev) => ({
          ...prev,
          [channelId]: [...(prev[channelId] ?? []), botMsg],
        }));

        setChannels((prev) =>
          prev.map((ch) =>
            ch.id === channelId
              ? { ...ch, lastMessage: botText, time: botTimeStr, unread: ch.unread + 1 }
              : ch
          )
        );
      }, 1600);
    },
    []
  );

  const markChannelRead = useCallback((channelId: string) => {
    setChannels((prev) =>
      prev.map((ch) => (ch.id === channelId ? { ...ch, unread: 0 } : ch))
    );
  }, []);

  const totalUnread = channels.reduce((acc, ch) => acc + ch.unread, 0);

  /* ---------- Toast ---------- */

  const showToast = useCallback(
    (message: string, type: ToastConfig["type"] = "success", icon?: string) => {
      const id = `toast-${Date.now()}`;
      const toast: ToastConfig = { id, message, type, icon };
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3500);
    },
    []
  );

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  /* ---------- Context Value ---------- */

  const value: PatientContextValue = {
    patient,
    selectedClinicId,
    selectedClinic,
    setSelectedClinicId,
    upcomingAppointments,
    pastAppointments,
    addAppointment,
    cancelAppointment,
    meals,
    setMealStatus,
    completedMealsCount,
    totalKcal,
    doneKcal,
    cart,
    updateCart,
    cartCount,
    clearCart,
    channels,
    allMessages,
    sendMessage,
    markChannelRead,
    totalUnread,
    isTyping,
    toasts,
    showToast,
    dismissToast,
  };

  return (
    <PatientContext.Provider value={value}>
      {children}
    </PatientContext.Provider>
  );
}

/* ====================================================
   HOOK
   ==================================================== */

export function usePatient() {
  const ctx = useContext(PatientContext);
  if (!ctx) throw new Error("usePatient must be used inside <PatientProvider>");
  return ctx;
}
