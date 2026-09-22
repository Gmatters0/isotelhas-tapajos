"use client";

import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink, WHATSAPP_GREETING } from "@/lib/whatsapp";

export function WhatsAppFloatingButton() {
  return (
    <a
      href={buildWhatsAppLink(WHATSAPP_GREETING)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp com a Isotelhas Tapajós"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brand-whatsapp text-white shadow-lg shadow-black/30 transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-slate"
    >
      <MessageCircle size={26} className="text-white" />
    </a>
  );
}
