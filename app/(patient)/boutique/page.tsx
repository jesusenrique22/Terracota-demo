"use client";

import { useState } from "react";
import Image from "next/image";
import {
  CheckCircle2,
  Minus,
  Plus,
  ShoppingCart,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { orders, products } from "@/lib/mock-data";
import { cn, formatCurrency } from "@/lib/utils";
import { usePatient } from "@/lib/patient-context";

/* ── Payment modal ── */
function PaymentModal({
  total,
  onClose,
  onConfirm,
}: {
  total: number;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const [method, setMethod] = useState<"zelle" | "pago_movil" | "card">("pago_movil");

  const methods = [
    { id: "pago_movil", label: "Pago Móvil", sub: "Banco Venezuela / Mercantil" },
    { id: "zelle",      label: "Zelle",       sub: "Transferencia en USD" },
    { id: "card",       label: "Tarjeta",     sub: "Visa / Mastercard" },
  ] as const;

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-[430px] mx-auto animate-fade-up rounded-t-3xl bg-white p-5 pb-8">
        <div className="mb-4 flex items-center justify-between">
          <p className="font-display text-xl font-bold text-charcoal">Método de pago</p>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-100">
            <X className="h-4 w-4 text-muted" />
          </button>
        </div>
        <p className="mb-4 text-sm text-muted">Total a pagar: <span className="font-bold text-charcoal">{formatCurrency(total)}</span></p>

        <div className="space-y-2 mb-5">
          {methods.map((m) => (
            <button
              key={m.id}
              onClick={() => setMethod(m.id)}
              className={cn(
                "flex w-full items-center justify-between rounded-2xl border p-4 text-left transition-all",
                method === m.id ? "border-[#c2b280] bg-[rgba(194,178,128,0.08)]" : "border-stone-200 bg-stone-50"
              )}
            >
              <div>
                <p className="font-semibold text-sm text-charcoal">{m.label}</p>
                <p className="text-xs text-muted">{m.sub}</p>
              </div>
              {method === m.id && <CheckCircle2 className="h-5 w-5 text-[#c2b280]" />}
            </button>
          ))}
        </div>

        <button
          onClick={onConfirm}
          className="w-full rounded-2xl py-4 text-sm font-bold text-black transition-all active:scale-[0.98]"
          style={{ background: "linear-gradient(135deg, #a39382, #c2b280)" }}
        >
          Confirmar pedido · {formatCurrency(total)}
        </button>
      </div>
    </div>
  );
}

/* ── Main Page ── */
export default function BoutiquePage() {
  const { cart, updateCart, cartCount, clearCart, showToast } = usePatient();
  const [showPayment, setShowPayment] = useState(false);
  const [filter, setFilter] = useState<"Todos" | "Dermatología" | "Suplementos">("Todos");

  const cartItems = Object.entries(cart).filter(([, qty]) => qty > 0);
  const cartTotal = cartItems.reduce((acc, [id, qty]) => {
    const p = products.find((p) => p.id === id);
    return acc + (p?.price ?? 0) * qty;
  }, 0);

  const filteredProducts =
    filter === "Todos" ? products : products.filter((p) => p.category === filter);

  function handleAdd(id: string) {
    updateCart(id, 1);
    const p = products.find((p) => p.id === id);
    showToast(`${p?.name} añadido 🛒`, "success");
  }

  function handleConfirmPayment() {
    setShowPayment(false);
    clearCart();
    showToast("¡Pedido confirmado! Recibirás confirmación por WhatsApp 🎉", "success");
  }

  return (
    <div className="animate-fade-up pb-6">
      <PageHeader
        title="Boutique"
        subtitle="Productos clínicamente recomendados"
        action={
          <button
            onClick={() => cartItems.length > 0 && setShowPayment(true)}
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 transition-colors hover:bg-stone-200"
          >
            <ShoppingCart className="h-5 w-5 text-charcoal" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#c2b280] text-[9px] font-bold text-white animate-bounce-in">
                {cartCount}
              </span>
            )}
          </button>
        }
      />

      {/* ── Cart Summary ── */}
      {cartItems.length > 0 && (
        <div className="mx-4 mb-4 overflow-hidden rounded-2xl border border-[#c2b280]/25 bg-[rgba(194,178,128,0.08)] animate-slide-right">
          <div className="flex items-center justify-between border-b border-[#c2b280]/15 px-4 py-3">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-[#c2b280]" />
              <p className="text-sm font-bold text-charcoal">
                {cartCount} {cartCount === 1 ? "producto" : "productos"} · {formatCurrency(cartTotal)}
              </p>
            </div>
            <button onClick={clearCart} className="text-muted hover:text-danger transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>
          {/* Cart items list */}
          <div className="px-4 py-2">
            {cartItems.map(([id, qty]) => {
              const product = products.find((p) => p.id === id)!;
              return (
                <div key={id} className="flex items-center justify-between py-2 border-b border-[#c2b280]/10 last:border-0">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-white">
                      <Image src={product.image} alt={product.name} fill className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-charcoal">{product.name}</p>
                      <p className="text-[10px] text-muted">{formatCurrency(product.price)} c/u</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    <button
                      onClick={() => updateCart(id, -1)}
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-white border border-stone-200 text-charcoal"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-5 text-center text-sm font-bold text-charcoal">{qty}</span>
                    <button
                      onClick={() => updateCart(id, 1)}
                      className="flex h-6 w-6 items-center justify-center rounded-full text-white"
                      style={{ background: "linear-gradient(135deg, #a39382, #c2b280)" }}
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="px-4 pb-3 pt-1">
            <button
              onClick={() => setShowPayment(true)}
              className="w-full rounded-xl py-3 text-sm font-bold text-black transition-all active:scale-[0.98]"
              style={{ background: "linear-gradient(135deg, #a39382, #c2b280)" }}
            >
              Proceder al pago · {formatCurrency(cartTotal)}
            </button>
          </div>
        </div>
      )}

      {/* ── Doctor Recommended Banner ── */}
      <div className="mx-4 mb-4 flex items-center gap-3 rounded-2xl bg-[#1a1a1a] px-4 py-3.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#c2b280]/20">
          <Sparkles className="h-4 w-4 text-[#c2b280]" />
        </div>
        <div>
          <p className="text-xs font-bold text-white">Recomendados por su médico</p>
          <p className="text-[10px] text-white/50">Seleccionados para tu tratamiento actual</p>
        </div>
      </div>

      {/* ── Category filter ── */}
      <div className="mb-4 flex gap-2 overflow-x-auto hide-scrollbar px-4">
        {(["Todos", "Dermatología", "Suplementos"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-all",
              filter === f
                ? "text-black"
                : "bg-stone-100 text-muted hover:bg-stone-200"
            )}
            style={filter === f ? { background: "linear-gradient(135deg, #a39382, #c2b280)" } : {}}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ── Product Grid ── */}
      <div className="grid grid-cols-2 gap-3 px-4">
        {filteredProducts.map((product) => {
          const qty = cart[product.id] ?? 0;
          return (
            <div
              key={product.id}
              className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm"
            >
              {/* Product image */}
              <div className="relative h-36 w-full bg-stone-50">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                {product.recommended && (
                  <span className="absolute left-2 top-2 rounded-full bg-[#c2b280] px-2 py-0.5 text-[9px] font-bold uppercase text-white">
                    ⭐ Top
                  </span>
                )}
              </div>
              {/* Product info */}
              <div className="p-3">
                <p className="text-[10px] uppercase tracking-wide text-muted">{product.brand}</p>
                <p className="mt-0.5 text-sm font-bold leading-tight text-charcoal">{product.name}</p>
                <p className="text-[10px] text-muted">{product.category}</p>
                <div className="mt-2 flex items-center justify-between">
                  <p className="font-display text-lg font-bold text-charcoal">{formatCurrency(product.price)}</p>
                </div>
                {/* Add/qty controls */}
                {qty > 0 ? (
                  <div className="mt-2 flex items-center justify-between rounded-xl border border-stone-100 bg-stone-50 px-2 py-1.5">
                    <button
                      onClick={() => updateCart(product.id, -1)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-white border border-stone-200 shadow-sm"
                    >
                      <Minus className="h-3.5 w-3.5 text-charcoal" />
                    </button>
                    <span className="text-sm font-bold text-charcoal">{qty} en carrito</span>
                    <button
                      onClick={() => updateCart(product.id, 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-white shadow-sm"
                      style={{ background: "linear-gradient(135deg, #a39382, #c2b280)" }}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAdd(product.id)}
                    className="mt-2 w-full rounded-xl py-2.5 text-xs font-bold text-black transition-all active:scale-[0.98]"
                    style={{ background: "linear-gradient(135deg, #a39382, #c2b280)" }}
                  >
                    Agregar al carrito
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Order History ── */}
      <div className="mt-6 px-4">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-muted">
          Historial de pedidos
        </p>
        <div className="space-y-2">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3 shadow-sm"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-stone-50">
                <CheckCircle2 className="h-5 w-5 text-[#4a7c59]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-charcoal">{formatCurrency(order.total)}</p>
                <p className="text-[10px] text-muted">{order.date} · {order.items} producto(s) · {order.status}</p>
              </div>
              <button
                onClick={() => showToast("Re-compra agregada al carrito 🛒", "info")}
                className="shrink-0 rounded-full border border-[#c2b280]/30 px-3 py-1.5 text-[10px] font-bold text-[#a39382] transition-colors hover:bg-[rgba(194,178,128,0.08)]"
              >
                Repetir
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <PaymentModal
          total={cartTotal}
          onClose={() => setShowPayment(false)}
          onConfirm={handleConfirmPayment}
        />
      )}
    </div>
  );
}
