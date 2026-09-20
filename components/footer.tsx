import Link from "next/link";
import { AtSign, MessageCircle } from "lucide-react";
import { Logo } from "@/components/logo";
import { siteContent } from "@/lib/content";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-surface">
      <div className="container-shell grid gap-8 py-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-muted">{siteContent.brand.shortDescription}</p>
        </div>
        <div>
          <p className="font-semibold">Liens rapides</p>
          <div className="mt-3 flex flex-col gap-2 text-muted">
            {siteContent.nav.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-primary-dark">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-semibold">Nous contacter</p>
          <div className="mt-3 flex gap-3">
            <a
              href={siteContent.brand.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="grid size-11 place-items-center rounded-full border border-border bg-white text-foreground hover:text-primary-dark"
              aria-label="Instagram Hopla"
            >
              <AtSign className="size-5" />
            </a>
            <a
              href={buildWhatsAppLink("Bonjour Hopla ! Je souhaite commander.")}
              target="_blank"
              rel="noreferrer"
              className="grid size-11 place-items-center rounded-full border border-border bg-white text-foreground hover:text-primary-dark"
              aria-label="WhatsApp Hopla"
            >
              <MessageCircle className="size-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="container-shell border-t border-border py-5 text-sm text-muted">
        (c) Hopla
      </div>
    </footer>
  );
}
