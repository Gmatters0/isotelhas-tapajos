import { MessageCircle } from "lucide-react";
import { CONSULTANT_LINK } from "@/lib/whatsapp";

export function WhatsAppFloatingButton() {
  return (
    <a
      href={CONSULTANT_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brand-whatsapp text-white shadow-lg shadow-black/30 transition duration-200 hover:scale-110 hover:shadow-xl active:scale-95"
    >
      <MessageCircle size={26} />
    </a>
  );
}
