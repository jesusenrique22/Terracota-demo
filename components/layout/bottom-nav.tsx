"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  Home,
  LineChart,
  MessageCircle,
  ShoppingBag,
  UtensilsCrossed,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePatient } from "@/lib/patient-context";

const navItems = [
  { href: "/home",      label: "Inicio",    icon: Home,          badgeKey: null },
  { href: "/citas",     label: "Citas",     icon: CalendarDays,  badgeKey: null },
  { href: "/evolution", label: "Evolución", icon: LineChart,     badgeKey: null },
  { href: "/nutricion", label: "Plan",      icon: UtensilsCrossed, badgeKey: "meals" },
  { href: "/chat",      label: "Chat",      icon: MessageCircle, badgeKey: "chat" },
  { href: "/boutique",  label: "Tienda",    icon: ShoppingBag,   badgeKey: "cart" },
] as const;

export function BottomNav() {
  const pathname = usePathname();
  const { totalUnread, cartCount, meals } = usePatient();

  const pendingMeals = meals.filter((m) => m.status === "pendiente").length;

  function getBadge(key: typeof navItems[number]["badgeKey"]): number {
    if (key === "chat")  return totalUnread;
    if (key === "cart")  return cartCount;
    if (key === "meals") return pendingMeals;
    return 0;
  }

  return (
    <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 border-t border-stone-200 bg-white/95 backdrop-blur-xl">
      <div className="flex items-center justify-around px-1 pb-[env(safe-area-inset-bottom,8px)] pt-2">
        {navItems.map(({ href, label, icon: Icon, badgeKey }) => {
          const active  = pathname === href || pathname.startsWith(`${href}/`);
          const badge   = getBadge(badgeKey);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "relative flex min-w-0 flex-1 flex-col items-center gap-0.5 px-1 py-1.5 transition-all",
                active ? "text-gold-dark" : "text-muted"
              )}
            >
              {/* Active indicator */}
              {active && (
                <span className="absolute -top-px left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full gold-gradient" />
              )}

              {/* Icon + badge */}
              <div className="relative">
                <Icon
                  className={cn("h-5 w-5 transition-transform", active && "scale-110")}
                  strokeWidth={active ? 2.5 : 1.8}
                />
                {badge > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-bold text-white">
                    {badge > 9 ? "9+" : badge}
                  </span>
                )}
              </div>

              <span className={cn("truncate text-[9px] font-medium tracking-wide", active && "font-semibold")}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
