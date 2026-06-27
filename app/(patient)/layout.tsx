"use client";

import { PatientProvider, usePatient } from "@/lib/patient-context";
import { MobileShell } from "@/components/layout/mobile-shell";
import { CheckCircle2, Info, AlertTriangle } from "lucide-react";

function ToastRenderer() {
  const { toasts, dismissToast } = usePatient();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-28 left-1/2 z-[9999] -translate-x-1/2 flex flex-col gap-2 items-center pointer-events-none">
      {toasts.map((toast) => (
        <button
          key={toast.id}
          onClick={() => dismissToast(toast.id)}
          className={`toast pointer-events-auto animate-toast-in ${
            toast.type === "success" ? "toast-success" :
            toast.type === "warning" ? "bg-warning text-white" :
            "toast-info"
          }`}
        >
          {toast.type === "success" && <CheckCircle2 className="h-4 w-4 shrink-0" />}
          {toast.type === "info"    && <Info className="h-4 w-4 shrink-0" />}
          {toast.type === "warning" && <AlertTriangle className="h-4 w-4 shrink-0" />}
          {toast.icon && <span>{toast.icon}</span>}
          {toast.message}
        </button>
      ))}
    </div>
  );
}

function PatientShell({ children }: { children: React.ReactNode }) {
  return (
    <MobileShell>
      {children}
      <ToastRenderer />
    </MobileShell>
  );
}

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  return (
    <PatientProvider>
      <PatientShell>{children}</PatientShell>
    </PatientProvider>
  );
}
