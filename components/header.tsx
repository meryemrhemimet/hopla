"use client";

import Link from "next/link";
import { Menu, MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { siteContent } from "@/lib/content";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const whatsappHref = buildWhatsAppLink("Bonjour Hopla ! Je souhaite avoir plus d'informations.");

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {announcementVisible ? (
        <div className="bg-primary text-surface">
          <div className="container-shell flex min-h-10 items-center justify-between gap-3 py-2 text-sm font-semibold">
            <p>{siteContent.announcement}</p>
            <button
              type="button"
              className="grid size-8 shrink-0 place-items-center rounded-full hover:bg-white/10"
              aria-label="Fermer l'annonce"
              onClick={() => setAnnouncementVisible(false)}
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      ) : null}
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/86 backdrop-blur-xl">
        <div className="container-shell flex min-h-20 items-center justify-between gap-4">
          <Logo />
          <nav className="hidden items-center gap-1 md:flex" aria-label="Navigation principale">
            {siteContent.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-3 text-sm font-semibold text-muted transition hover:bg-surface hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild className="hidden md:inline-flex">
              <a href={whatsappHref} target="_blank" rel="noreferrer">
                <MessageCircle className="size-5" />
                Contact
              </a>
            </Button>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-full border border-border bg-surface text-foreground md:hidden"
              aria-label="Ouvrir le menu"
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>
      <div
        className={cn(
          "fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm transition md:hidden",
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setMenuOpen(false)}
      />
      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-[min(88vw,24rem)] flex-col bg-surface p-6 shadow-2xl transition-transform duration-300 md:hidden",
          menuOpen ? "translate-x-0" : "translate-x-full",
        )}
        aria-hidden={!menuOpen}
      >
        <div className="flex items-center justify-between">
          <Logo />
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-border"
            aria-label="Fermer le menu"
            onClick={() => setMenuOpen(false)}
          >
            <X className="size-5" />
          </button>
        </div>
        <nav className="mt-10 flex flex-col gap-2" aria-label="Menu mobile">
          {siteContent.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl border border-border bg-white px-5 py-4 text-xl font-semibold"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button asChild className="mt-auto">
          <a href={whatsappHref} target="_blank" rel="noreferrer">
            <MessageCircle className="size-5" />
            Contact WhatsApp
          </a>
        </Button>
      </aside>
    </>
  );
}
