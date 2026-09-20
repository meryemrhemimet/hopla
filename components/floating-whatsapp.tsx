"use client";

import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  return (
    <a
      href={buildWhatsAppLink("Bonjour Hopla ! Je souhaite avoir plus d'informations.")}
      target="_blank"
      rel="noreferrer"
      className="floating-whatsapp fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-30 grid size-14 place-items-center rounded-full bg-primary text-white shadow-[0_14px_34px_rgba(214,70,52,0.35)] transition hover:bg-primary-dark motion-safe:animate-[pulse_3.4s_ease-in-out_infinite]"
      aria-label="Contacter Hopla sur WhatsApp"
    >
      <MessageCircle className="size-7" />
    </a>
  );
}
