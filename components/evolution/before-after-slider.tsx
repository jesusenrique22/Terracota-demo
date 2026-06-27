"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type BeforeAfterSliderProps = {
  beforeLabel?: string;
  afterLabel?: string;
  beforeImage?: string;
  afterImage?: string;
};

export function BeforeAfterSlider({
  beforeLabel = "Antes · Jun 2025",
  afterLabel = "Después · Jun 2026",
  beforeImage = "/gallery-before-1.jpg",
  afterImage = "/gallery-after-1.jpg",
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <div className="relative aspect-[4/5] w-full select-none overflow-hidden bg-stone-100">
        
        {/* BEFORE IMAGE (Default background) */}
        <div className="absolute inset-0">
          <Image
            src={beforeImage}
            alt="Antes del tratamiento"
            fill
            sizes="(max-width: 430px) 100vw"
            className="object-cover"
          />
          {/* Label overlay top-left */}
          <div className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
            Antes
          </div>
        </div>

        {/* AFTER IMAGE (Clipped overlay) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          {/* Force the image to match the size of the container, not the clipped container */}
          <div className="absolute inset-0 aspect-[4/5] w-[428px]">
            <Image
              src={afterImage}
              alt="Después del tratamiento"
              fill
              sizes="(max-width: 430px) 100vw"
              className="object-cover"
            />
          </div>
          {/* Label overlay top-right */}
          <div className="absolute right-3 top-3 rounded-full bg-[#c4a265] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black backdrop-blur-sm">
            Después
          </div>
        </div>

        {/* SLIDER LINE & HANDLE */}
        <div
          className="absolute inset-y-0 z-10 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)]"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        >
          <div className="absolute top-1/2 left-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white bg-black/80 shadow-md text-white backdrop-blur-sm">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-4 4 4 4m8 0l4-4-4-4" />
            </svg>
          </div>
        </div>

        {/* TRANSPARENT RANGE INPUT FOR INTERACTION */}
        <input
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
          aria-label="Comparar antes y después"
        />
      </div>

      {/* FOOTER LEGEND */}
      <div className="flex items-center justify-between border-t border-border bg-stone-50/50 px-4 py-3.5 text-xs text-muted">
        <span className="font-semibold text-charcoal">{beforeLabel}</span>
        <span className="rounded-full bg-[#faf5ec] border border-[#c4a265]/20 px-2 py-0.5 text-[9px] font-bold uppercase text-[#8f6e3d]">
          Desliza
        </span>
        <span className="font-semibold text-charcoal">{afterLabel}</span>
      </div>
    </div>
  );
}
