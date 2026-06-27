"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, LogOut, Settings } from "lucide-react";
import { BottomNav } from "./bottom-nav";
import { usePatient } from "@/lib/patient-context";
import { cn } from "@/lib/utils";

function NotificationBell() {
  const { totalUnread } = usePatient();
  return (
    <div className="relative">
      <button className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 transition-colors hover:bg-stone-200">
        <Bell className="h-4 w-4 text-charcoal" />
      </button>
      {totalUnread > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#c4a265] text-[8px] font-bold text-white">
          {totalUnread}
        </span>
      )}
    </div>
  );
}

function TopBar() {
  const { patient } = usePatient();
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  function handleLogout() {
    router.push("/login");
  }

  return (
    <>
      {/* Safe-area spacer */}
      <div className="h-[env(safe-area-inset-top,0px)] bg-white" />

      {/* Top bar */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-white/95 px-4 py-3 backdrop-blur-md">
        {/* Patient avatar + name */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-2.5"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#8f6e3d] to-[#c4a265] text-xs font-bold text-white shadow-sm">
            {patient.initials}
          </div>
          <div className="text-left">
            <p className="text-[11px] font-semibold text-charcoal leading-none">{patient.name.split(" ")[0]} {patient.name.split(" ")[1]}</p>
            <p className="text-[9px] text-muted leading-none mt-0.5">Paciente · {patient.memberSince}</p>
          </div>
        </button>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <NotificationBell />
          <button
            onClick={handleLogout}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 text-muted transition-all hover:bg-red-50 hover:text-danger"
            title="Cerrar sesión"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Dropdown menu */}
      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute left-4 top-[60px] z-50 w-56 animate-scale-in overflow-hidden rounded-2xl border border-border bg-white shadow-lg">
            <div className="border-b border-border bg-stone-50 px-4 py-3">
              <p className="font-semibold text-sm text-charcoal">{patient.name}</p>
              <p className="text-xs text-muted">{patient.email}</p>
            </div>
            <div className="p-1.5">
              <Link
                href="/home"
                onClick={() => setShowMenu(false)}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-charcoal hover:bg-stone-50 transition-colors"
              >
                <Settings className="h-4 w-4 text-muted" />
                Configuración
              </Link>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-danger hover:bg-red-50 transition-colors"
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
