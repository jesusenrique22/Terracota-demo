"use client";

import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { evolutionMetrics } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";

const metrics = [
  { key: "peso", label: "Peso", color: "#c2b280", unit: "kg" },
  { key: "grasa", label: "Grasa", color: "#b45454", unit: "%" },
  { key: "musculo", label: "Músculo", color: "#4a7c59", unit: "%" },
  { key: "cintura", label: "Cintura", color: "#1e1e1e", unit: "cm" },
] as const;

type MetricKey = (typeof metrics)[number]["key"];

export function MetricChart() {
  const [active, setActive] = useState<MetricKey>("peso");
  const current = metrics.find((m) => m.key === active)!;
  const latest = evolutionMetrics[evolutionMetrics.length - 1];
  const first = evolutionMetrics[0];
  const change = Number((latest[active] - first[active]).toFixed(1));

  // Determine if change is positive/negative for UX feedback
  // For muscle, positive is good. For weight/fat/waist, negative is good.
  const isGoodChange = active === "musculo" ? change >= 0 : change <= 0;

  return (
    <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
      
      {/* Metric Selector Tabs */}
      <div className="mb-4 flex gap-1.5 rounded-xl bg-stone-50 p-1">
        {metrics.map((metric) => (
          <button
            key={metric.key}
            onClick={() => setActive(metric.key)}
            className={cn(
              "flex-1 rounded-lg py-2 text-center text-xs font-semibold transition-all",
              active === metric.key
                ? "bg-white text-charcoal shadow-sm"
                : "text-muted hover:text-charcoal"
            )}
          >
            {metric.label}
          </button>
        ))}
      </div>

      {/* Numeric Details */}
      <div className="mb-4 flex items-end justify-between px-1">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-muted">
            Último Registro
          </p>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="font-display text-4xl font-bold text-charcoal">
              {latest[active]}
            </span>
            <span className="text-sm font-semibold text-muted">
              {current.unit}
            </span>
          </div>
        </div>

        {/* Change Indicator */}
        <div
          className={cn(
            "flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold",
            isGoodChange
              ? "bg-[#f0f9f4] text-[#4a7c59]"
              : "bg-red-50 text-danger"
          )}
        >
          {isGoodChange ? (
            <TrendingDown className="h-3.5 w-3.5" />
          ) : (
            <TrendingUp className="h-3.5 w-3.5" />
          )}
          <span>
            {change > 0 ? "+" : ""}
            {change} {current.unit} (12 meses)
          </span>
        </div>
      </div>

      {/* Chart container */}
      <div className="h-44 w-full pr-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={evolutionMetrics} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="4 4" stroke="#f3f0ec" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 10, fill: "#8f6765" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "#8f6765" }}
              axisLine={false}
              tickLine={false}
              domain={["auto", "auto"]}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 16,
                border: "1px solid #e5e1da",
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                fontSize: 11,
                fontWeight: "bold",
                color: "#1e1e1e",
              }}
              labelStyle={{ color: "#6b6765", fontSize: 10 }}
            />
            <Line
              type="monotone"
              dataKey={active}
              stroke={current.color}
              strokeWidth={3}
              dot={{ r: 4, stroke: "#fff", strokeWidth: 1.5, fill: current.color }}
              activeDot={{ r: 6, stroke: "#fff", strokeWidth: 2, fill: current.color }}
              animationDuration={500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
