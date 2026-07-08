"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, LogOut } from "lucide-react";
import { BottomNav } from "./bottom-nav";
import { ClinicLogo } from "@/components/brand/clinic-logo";
import { ThemeToggle } from "./theme-toggle";
import { usePatient } from "@/lib/patient-context";
import { useTheme } from "@/lib/theme-context";

function NotificationBell() {
  const { totalUnread } = usePatient();
  return (
    <div className="relative">
      <button className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-muted transition-colors hover:bg-gold-subtle">
        <Bell className="h-4 w-4 text-muted" />
      </button>
      {totalUnread > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[8px] font-bold text-white">
          {totalUnread}
        </span>
      )}
    </div>
  );
}

function TopBar() {
  const { patient, selectedClinic } = usePatient();
  const { theme } = useTheme();
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  function handleLogout() {
    router.push("/login");
  }

  return (
    <>
      <div className="h-[env(safe-area-inset-top,0px)] bg-background" />

      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background/95 px-4 py-3 backdrop-blur-md">
        <button onClick={() => setShowMenu(!showMenu)} className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full gold-gradient text-xs font-bold text-white shadow-sm">
            {patient.initials}
          </div>
          <div className="text-left">
            <p className="text-[11px] font-semibold leading-none text-charcoal">
              {patient.name.split(" ")[0]} {patient.name.split(" ")[1]}
            </p>
            <p className="mt-0.5 text-[9px] leading-none text-muted">
              {selectedClinic?.name ?? "Vita Studio"} · {patient.memberSince}
            </p>
          </div>
        </button>

        <div className="flex items-center gap-2">
          <NotificationBell />
          <button
            onClick={handleLogout}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-muted text-muted transition-all hover:bg-red-500/10 hover:text-danger"
            title="Cerrar sesión"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </header>

      {showMenu && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
          <div className="absolute left-4 top-[60px] z-50 w-64 animate-scale-in overflow-hidden rounded-2xl border border-border bg-surface shadow-lg">
            {selectedClinic && (
              <div className="border-b border-border px-4 py-3">
                <ClinicLogo clinic={selectedClinic} size="sm" variant={theme === "dark" ? "dark" : "light"} />
              </div>
            )}
            <div className="border-b border-border px-4 py-3">
              <p className="text-sm font-semibold text-charcoal">{patient.name}</p>
              <p className="text-xs text-muted">{patient.email}</p>
            </div>
            <div className="space-y-1 p-2">
              <ThemeToggle />
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-danger transition-colors hover:bg-red-500/10"
              >
                <LogOut className="h-4 w-4" />
                Cerrar sesión
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export function MobileShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="phone-frame flex flex-col">
      <TopBar />
      <main className="flex-1 overflow-y-auto pb-[88px]">{children}</main>
      <BottomNav />
    </div>
  );
}
