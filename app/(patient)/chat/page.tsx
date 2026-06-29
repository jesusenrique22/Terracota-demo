"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { usePatient } from "@/lib/patient-context";
import { cn } from "@/lib/utils";

type ChannelId = "concierge" | "medical";

export default function ChatPage() {
  const { channels, allMessages, sendMessage, markChannelRead, isTyping } = usePatient();
  const [activeChannel, setActiveChannel] = useState<ChannelId | null>(null);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages, isTyping]);

  // Mark as read when opening channel
  useEffect(() => {
    if (activeChannel) {
      markChannelRead(activeChannel);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [activeChannel, markChannelRead]);

  function handleSend() {
    if (!activeChannel || !input.trim()) return;
    sendMessage(activeChannel, input);
    setInput("");
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  /* ─── Conversation View ─── */
  if (activeChannel) {
    const channel = channels.find((c) => c.id === activeChannel)!;
    const messages = allMessages[activeChannel] ?? [];
    const typing   = isTyping[activeChannel] ?? false;

    return (
      <div className="flex min-h-dvh flex-col animate-fade-in">
        {/* Header */}
        <header className="flex items-center gap-3 border-b border-border bg-surface/95 backdrop-blur-sm px-4 pb-4 pt-12">
          <button
            onClick={() => setActiveChannel(null)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-muted transition-colors hover:bg-stone-200"
          >
            <ArrowLeft className="h-5 w-5 text-charcoal" />
          </button>
          <div className="flex h-10 w-10 items-center justify-center rounded-full gold-gradient font-display text-lg text-white">
            {activeChannel === "concierge" ? "C" : "M"}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-charcoal text-sm">{channel.name}</p>
            <p className="flex items-center gap-1.5 text-xs text-botanical">
              <span className="h-1.5 w-1.5 rounded-full bg-botanical animate-pulse" />
              {channel.subtitle} · En línea
            </p>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {messages.map((msg) => {
            const isUser = msg.from === "user";
            return (
              <div
                key={msg.id}
                className={cn("flex animate-fade-up", isUser ? "justify-end" : "justify-start")}
              >
                {!isUser && (
                  <div className="mr-2 mt-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-full gold-gradient text-[10px] font-bold text-white">
                    {activeChannel === "concierge" ? "C" : "M"}
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[78%] rounded-2xl px-4 py-2.5 text-sm",
                    isUser
                      ? "rounded-br-md bg-charcoal text-white"
                      : "rounded-bl-md border border-border bg-surface text-charcoal shadow-sm"
                  )}
                >
                  <p className="leading-relaxed">{msg.text}</p>
                  <p className={cn("mt-1 text-[10px]", isUser ? "text-white/50 text-right" : "text-muted")}>
                    {msg.time}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Typing indicator */}
          {typing && (
            <div className="flex justify-start animate-fade-in">
              <div className="mr-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full gold-gradient text-[10px] font-bold text-white">
                {activeChannel === "concierge" ? "C" : "M"}
              </div>
              <div className="rounded-2xl rounded-bl-md border border-border bg-surface px-4 py-3 shadow-sm">
                <div className="flex items-center gap-1">
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-border bg-surface/95 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]">
          <div className="flex items-center gap-2 rounded-full border border-border bg-stone-50 px-4 py-2 focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/10 transition-all">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escriba su mensaje..."
              className="flex-1 bg-transparent text-sm outline-none text-charcoal placeholder:text-muted"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full transition-all",
                input.trim()
                  ? "gold-gradient text-white shadow-sm scale-100"
                  : "bg-stone-200 text-muted scale-90"
              )}
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ─── Channel List View ─── */
  return (
    <div className="animate-fade-up pb-6">
      <PageHeader title="Concierge Digital" subtitle="Asistencia médica en tiempo real" />

      <div className="space-y-3 px-5">
        {channels.map((channel) => (
          <button
            key={channel.id}
            onClick={() => setActiveChannel(channel.id as ChannelId)}
            className="flex w-full items-center gap-4 rounded-2xl border border-border bg-surface p-4 text-left shadow-sm transition-all active:scale-[0.98] hover:shadow-md hover:border-stone-300"
          >
            {/* Avatar */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full gold-gradient font-display text-lg text-white shadow-sm">
              {channel.id === "concierge" ? "C" : "M"}
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold text-charcoal text-sm">{channel.name}</p>
                <span className="shrink-0 text-[10px] text-muted">{channel.time}</span>
              </div>
              <p className="text-xs text-muted">{channel.subtitle}</p>
              <p className="mt-1 truncate text-sm text-muted">{channel.lastMessage}</p>
            </div>

            {/* Badge */}
            {channel.unread > 0 && (
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-[9px] font-bold text-white">
                {channel.unread}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="mx-5 mt-5 rounded-2xl border border-dashed border-gold/30 bg-gold-subtle p-4 text-center">
        <p className="text-xs text-muted">
          💬 Canales separados para citas y soporte médico/nutricional.<br />
          Respuestas en tiempo real de su equipo médico.
        </p>
      </div>
    </div>
  );
}
