"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import {
  menuGroups,
  serviceMenu,
  type MenuCategory,
} from "@/lib/service-menu";

type ServiceMenuViewProps = {
  compact?: boolean;
  defaultGroup?: MenuCategory["group"] | "all";
};

function MenuDivider() {
  return (
    <div className="my-5 flex items-center gap-3">
      <div className="h-px flex-1 bg-gold/25" />
      <div className="h-1.5 w-1.5 rounded-full bg-gold/40" />
      <div className="h-px flex-1 bg-gold/25" />
    </div>
  );
}

function MenuCategoryCard({ category }: { category: MenuCategory }) {
  return (
    <article
      id={category.id}
      className="scroll-mt-28 rounded-2xl border border-border bg-surface p-5 shadow-sm"
    >
      <div className="mb-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
          {menuGroups.find((g) => g.id === category.group)?.label}
        </p>
        <h3 className="mt-1 font-display text-xl font-black leading-tight text-charcoal">
          {category.title}
        </h3>
        {category.subtitle && (
          <p className="mt-1 text-sm text-muted">{category.subtitle}</p>
        )}
      </div>

      <ul className="space-y-3">
        {category.items.map((item) => (
          <li
            key={`${category.id}-${item.name}`}
            className="flex items-start justify-between gap-4 border-b border-border/60 pb-3 last:border-0 last:pb-0"
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm leading-snug text-charcoal">{item.name}</p>
              {item.detail && (
                <p className="mt-1 text-xs leading-relaxed text-muted">{item.detail}</p>
              )}
            </div>
            {item.price && (
              <span className="shrink-0 rounded-full bg-gold-subtle px-2.5 py-1 text-xs font-bold text-gold-dark">
                {item.price}
              </span>
            )}
          </li>
        ))}
      </ul>

      {category.note && (
        <p className="mt-4 text-xs leading-relaxed text-muted italic">{category.note}</p>
      )}
    </article>
  );
}

export function ServiceMenuView({
  compact = false,
  defaultGroup = "all",
}: ServiceMenuViewProps) {
  const [activeGroup, setActiveGroup] = useState<MenuCategory["group"] | "all">(
    defaultGroup
  );

  const filtered = useMemo(
    () =>
      activeGroup === "all"
        ? serviceMenu
        : serviceMenu.filter((cat) => cat.group === activeGroup),
    [activeGroup]
  );

  return (
    <div>
      {!compact && (
        <div className="sticky top-[72px] z-40 -mx-1 mb-6 overflow-x-auto pb-1">
          <div className="flex min-w-max gap-2 px-1">
            <button
              type="button"
              onClick={() => setActiveGroup("all")}
              className={cn(
                "rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-wider transition-all",
                activeGroup === "all"
                  ? "gold-gradient text-white shadow-sm"
                  : "border border-border bg-surface text-muted hover:border-gold/30"
              )}
            >
              Todo
            </button>
            {menuGroups.map((group) => (
              <button
                key={group.id}
                type="button"
                onClick={() => setActiveGroup(group.id)}
                className={cn(
                  "rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-wider transition-all",
                  activeGroup === group.id
                    ? "gold-gradient text-white shadow-sm"
                    : "border border-border bg-surface text-muted hover:border-gold/30"
                )}
              >
                {group.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className={cn("space-y-4", compact && "space-y-3")}>
        {filtered.map((category, index) => (
          <div key={category.id}>
            {index > 0 && !compact && <MenuDivider />}
            <MenuCategoryCard category={category} />
          </div>
        ))}
      </div>
    </div>
  );
}
