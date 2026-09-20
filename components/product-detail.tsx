"use client";

import Image from "next/image";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import type * as React from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Heart,
  MessageCircle,
  Ruler,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Product } from "@/data/products";
import type { Review } from "@/data/reviews";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { cn, formatPrice } from "@/lib/utils";

type ProductDetailProps = {
  product: Product;
  related: Product[];
  reviews: Review[];
  previous?: Product;
  next?: Product;
  pageUrl: string;
};

const reassurance = [
  { icon: MessageCircle, title: "Commande directe", body: "Validation simple sur WhatsApp." },
  { icon: Truck, title: "Livraison", body: "Details confirmes avant commande." },
  { icon: ShieldCheck, title: "Conseil Hopla", body: "Posez vos questions avant de choisir." },
];

export function ProductDetail({
  product,
  related,
  reviews,
  previous,
  next,
  pageUrl,
}: ProductDetailProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] ?? "");
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] ?? "");
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return localStorage.getItem(`hopla.favorite.${product.slug}`) === "true";
    } catch {
      return false;
    }
  });
  const carouselRef = useRef<HTMLDivElement>(null);
  const realReviews = reviews.filter((review) => !review.placeholder);

  useEffect(() => {
    document.body.dataset.productPage = "true";
    return () => {
      delete document.body.dataset.productPage;
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (event.key === "ArrowRight") setActiveImage((value) => (value + 1) % product.images.length);
      if (event.key === "ArrowLeft") {
        setActiveImage((value) => (value - 1 + product.images.length) % product.images.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, product.images.length]);

  const variantText = useMemo(() => {
    const parts = [selectedSize, selectedColor].filter(Boolean);
    return parts.length ? ` (${parts.join(" / ")})` : "";
  }, [selectedColor, selectedSize]);

  const orderMessage = `Bonjour Hopla ! Je suis interesse(e) par : ${product.name}${variantText} - ${formatPrice(product.price)}. Lien : ${pageUrl}`;
  const questionMessage = `Bonjour Hopla ! J'ai une question sur : ${product.name}${variantText}. Lien : ${pageUrl}`;

  const share = async () => {
    if (navigator.share) {
      await navigator.share({
        title: product.name,
        text: product.shortDescription,
        url: pageUrl,
      });
      return;
    }
    await navigator.clipboard.writeText(pageUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const toggleFavorite = () => {
    try {
      const nextValue = !saved;
      localStorage.setItem(`hopla.favorite.${product.slug}`, String(nextValue));
      setSaved(nextValue);
    } catch {
      setSaved((value) => !value);
    }
  };

  const updateFromScroll = () => {
    const node = carouselRef.current;
    if (!node) return;
    const index = Math.round(node.scrollLeft / node.clientWidth);
    setActiveImage(Math.min(index, product.images.length - 1));
  };

  return (
    <div className="pb-24 md:pb-16">
      <div className="container-shell pt-6">
        <nav className="mb-5 flex flex-wrap items-center gap-2 text-sm text-muted" aria-label="Fil d'Ariane">
          <Link href="/" className="hover:text-primary-dark">Accueil</Link>
          <span>/</span>
          <Link href="/#shop" className="hover:text-primary-dark">Catalogue</Link>
          <span>/</span>
          <Link href={`/?category=${encodeURIComponent(product.category)}#shop`} className="hover:text-primary-dark">
            {product.category}
          </Link>
        </nav>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)] lg:items-start">
          <ProductGallery
            activeImage={activeImage}
            carouselRef={carouselRef}
            onImageClick={(index) => {
              setActiveImage(index);
              setLightboxOpen(true);
            }}
            product={product}
            setActiveImage={setActiveImage}
            updateFromScroll={updateFromScroll}
          />

          <aside className="lg:sticky lg:top-28">
            <div className="rounded-lg border border-border bg-surface p-5 shadow-[0_18px_48px_rgba(59,46,38,0.1)] sm:p-7">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-blush px-3 py-1 text-xs font-bold uppercase text-primary-dark">
                  {product.category}
                </span>
                {product.badge ? (
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase text-white">
                    {product.badge === "new" ? "New" : "Popular"}
                  </span>
                ) : null}
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-bold",
                    product.inStock ? "bg-soft-green text-foreground" : "bg-border text-muted",
                  )}
                >
                  {product.inStock ? "Disponible" : "Indisponible"}
                </span>
              </div>

              <h1 className="heading-lg mt-5">{product.name}</h1>
              <p className="mt-3 text-2xl font-bold text-primary-dark">{formatPrice(product.price)}</p>
              <p className="mt-4 text-muted">{product.shortDescription}</p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <InfoPill icon={Sparkles} label="Motif" value={product.colors?.join(", ") ?? product.category} />
                <InfoPill icon={Ruler} label="Dimensions" value={product.details?.dimensions ?? "A confirmer"} />
              </div>

              {product.sizes?.length ? (
                <VariantGroup label="Taille" values={product.sizes} selected={selectedSize} onSelect={setSelectedSize} />
              ) : null}
              {product.colors?.length ? (
                <VariantGroup label="Couleur" values={product.colors} selected={selectedColor} onSelect={setSelectedColor} />
              ) : null}

              <div className="mt-6 grid gap-3">
                <Button asChild className="min-h-12">
                  <a href={buildWhatsAppLink(orderMessage)} target="_blank" rel="noreferrer">
                    <MessageCircle className="size-5" />
                    Commander sur WhatsApp
                  </a>
                </Button>
                <div className="grid grid-cols-3 gap-2">
                  <Button asChild variant="secondary" size="sm">
                    <a href={buildWhatsAppLink(questionMessage)} target="_blank" rel="noreferrer">
                      Question
                    </a>
                  </Button>
                  <Button type="button" variant="secondary" size="sm" onClick={share}>
                    {copied ? <Copy className="size-4" /> : <Share2 className="size-4" />}
                    {copied ? "Copie" : "Partager"}
                  </Button>
                  <Button type="button" variant="secondary" size="sm" onClick={toggleFavorite}>
                    <Heart className={cn("size-4", saved && "fill-primary text-primary")} />
                    Save
                  </Button>
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                {reassurance.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex gap-3 rounded-lg border border-border bg-white p-3">
                      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-soft-green text-primary-dark">
                        <Icon className="size-5" />
                      </span>
                      <p className="text-sm">
                        <span className="block font-bold text-foreground">{item.title}</span>
                        <span className="text-muted">{item.body}</span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>
        </section>
      </div>

      <section className="mt-12 bg-powder/45 py-12">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary-dark">Details</p>
            <h2 className="heading-md mt-2">Tout ce qu&apos;il faut verifier.</h2>
          </div>
          <div className="rounded-lg border border-border bg-surface px-5">
            <Accordion type="single" defaultValue="description" collapsible>
              <AccordionItem value="description">
                <AccordionTrigger>Description</AccordionTrigger>
                <AccordionContent>
                  <p>{product.description}</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="details">
                <AccordionTrigger>Composition et dimensions</AccordionTrigger>
                <AccordionContent>
                  <dl className="grid gap-3 text-sm sm:grid-cols-2">
                    {product.ageRange ? <DetailRow label="Age" value={product.ageRange} /> : null}
                    {product.details?.material ? <DetailRow label="Matiere" value={product.details.material} /> : null}
                    {product.details?.dimensions ? <DetailRow label="Dimensions" value={product.details.dimensions} /> : null}
                    {product.details?.color ? <DetailRow label="Couleur" value={product.details.color} /> : null}
                    {product.details?.care ? <DetailRow label="Entretien" value={product.details.care} /> : null}
                  </dl>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="order">
                <AccordionTrigger>Comment commander</AccordionTrigger>
                <AccordionContent>
                  <ol className="grid gap-2 text-sm">
                    <li className="flex gap-2"><Check className="mt-0.5 size-4 text-primary-dark" />Choisissez le modele et la couleur si disponible.</li>
                    <li className="flex gap-2"><Check className="mt-0.5 size-4 text-primary-dark" />Envoyez le message WhatsApp pre-rempli.</li>
                    <li className="flex gap-2"><Check className="mt-0.5 size-4 text-primary-dark" />Confirmez les details directement avec Hopla.</li>
                  </ol>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {realReviews.length ? (
        <section className="container-shell py-12">
          <h2 className="heading-md">Avis sur ce produit</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {realReviews.map((review) => (
              <article key={review.id} className="rounded-lg border border-border bg-surface p-5">
                <div className="flex text-primary" aria-label="5 etoiles">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="mt-3 text-sm text-muted">
                  {review.type === "text" ? review.quote : review.alt}
                </p>
                <p className="mt-4 font-semibold">{review.name}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="container-shell py-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary-dark">A decouvrir aussi</p>
            <h2 className="heading-md mt-2">D&apos;autres favoris Hopla.</h2>
          </div>
          <div className="flex gap-2">
            {previous ? (
              <Link href={`/product/${previous.slug}`} className="grid size-11 place-items-center rounded-full border border-border bg-surface" aria-label="Produit precedent">
                <ArrowLeft className="size-4" />
              </Link>
            ) : null}
            {next ? (
              <Link href={`/product/${next.slug}`} className="grid size-11 place-items-center rounded-full border border-border bg-surface" aria-label="Produit suivant">
                <ArrowRight className="size-4" />
              </Link>
            ) : null}
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {related.map((item) => (
            <RelatedCard key={item.id} product={item} />
          ))}
        </div>
      </section>

      <Lightbox
        activeImage={activeImage}
        lightboxOpen={lightboxOpen}
        product={product}
        setActiveImage={setActiveImage}
        setLightboxOpen={setLightboxOpen}
      />

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/96 px-4 py-3 backdrop-blur md:hidden safe-bottom">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold">{product.name}</p>
            <p className="text-sm text-muted">{formatPrice(product.price)}</p>
          </div>
          <Button asChild size="sm">
            <a href={buildWhatsAppLink(orderMessage)} target="_blank" rel="noreferrer">
              Commander
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

function ProductGallery({
  activeImage,
  carouselRef,
  onImageClick,
  product,
  setActiveImage,
  updateFromScroll,
}: {
  activeImage: number;
  carouselRef: React.RefObject<HTMLDivElement | null>;
  onImageClick: (index: number) => void;
  product: Product;
  setActiveImage: (index: number) => void;
  updateFromScroll: () => void;
}) {
  return (
    <div>
      <div
        ref={carouselRef}
        onScroll={updateFromScroll}
        className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto lg:block lg:overflow-visible"
      >
        {product.images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => onImageClick(index)}
            className={cn(
              "relative aspect-[4/5] min-w-full snap-center overflow-hidden rounded-lg border bg-white lg:hidden",
              activeImage === index ? "border-primary/50" : "border-border",
            )}
            aria-label={`Ouvrir l'image ${index + 1}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </button>
        ))}
        <button
          type="button"
          onClick={() => onImageClick(activeImage)}
          className="relative hidden aspect-[4/5] overflow-hidden rounded-lg border border-border bg-white shadow-[0_18px_48px_rgba(59,46,38,0.1)] lg:block lg:min-h-[40rem] xl:min-h-[46rem]"
          aria-label="Ouvrir la galerie en plein ecran"
        >
          <Image
            src={product.images[activeImage].src}
            alt={product.images[activeImage].alt}
            fill
            priority
            sizes="64vw"
            className="object-cover"
          />
        </button>
      </div>
      <div className="mt-4 flex items-center justify-between gap-4 lg:hidden">
        <div className="flex gap-1" aria-hidden="true">
          {product.images.map((image, index) => (
            <span
              key={image.src}
              className={cn("h-1.5 rounded-full transition-all", index === activeImage ? "w-7 bg-primary" : "w-1.5 bg-border")}
            />
          ))}
        </div>
        <span className="rounded-full bg-surface px-3 py-1 text-sm font-semibold text-muted">
          {activeImage + 1} / {product.images.length}
        </span>
      </div>
      <div className="mt-4 hidden grid-cols-4 gap-3 lg:grid">
        {product.images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActiveImage(index)}
            onMouseEnter={() => setActiveImage(index)}
            className={cn(
              "relative aspect-square overflow-hidden rounded-lg border bg-white transition",
              activeImage === index ? "border-primary shadow-[0_10px_24px_rgba(223,73,58,0.16)]" : "border-border opacity-80 hover:opacity-100",
            )}
            aria-label={`Voir l'image ${index + 1}`}
          >
            <Image src={image.src} alt="" fill sizes="16vw" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

function InfoPill({ icon: Icon, label, value }: { icon: typeof Sparkles; label: string; value: string }) {
  return (
    <div className="flex gap-3 rounded-lg border border-border bg-white p-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-powder text-foreground">
        <Icon className="size-5" />
      </span>
      <p className="min-w-0 text-sm">
        <span className="block font-bold text-foreground">{label}</span>
        <span className="line-clamp-1 text-muted">{value}</span>
      </p>
    </div>
  );
}

function VariantGroup({
  label,
  values,
  selected,
  onSelect,
}: {
  label: string;
  values: string[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="mt-5">
      <p className="mb-2 text-sm font-bold">{label}</p>
      <div className="flex flex-wrap gap-2">
        {values.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => onSelect(value)}
            className={cn(
              "min-h-11 rounded-full border px-4 text-sm font-semibold transition",
              selected === value
                ? "border-primary bg-primary text-white"
                : "border-border bg-white text-foreground hover:border-primary/50",
            )}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-white p-3">
      <dt className="font-semibold text-foreground">{label}</dt>
      <dd className="mt-1 text-muted">{value}</dd>
    </div>
  );
}

function RelatedCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group rounded-lg border border-border bg-surface p-2 transition hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(41,33,28,0.1)]"
    >
      <div className="image-ratio relative overflow-hidden rounded-md bg-white">
        <Image
          src={product.images[0].src}
          alt={product.images[0].alt}
          fill
          sizes="(min-width: 768px) 25vw, 50vw"
          className="object-cover transition group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-2">
        <p className="line-clamp-2 min-h-[2.6rem] font-bold leading-tight">{product.name}</p>
        <p className="mt-1 text-sm text-muted">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}

function Lightbox({
  activeImage,
  lightboxOpen,
  product,
  setActiveImage,
  setLightboxOpen,
}: {
  activeImage: number;
  lightboxOpen: boolean;
  product: Product;
  setActiveImage: React.Dispatch<React.SetStateAction<number>>;
  setLightboxOpen: (open: boolean) => void;
}) {
  return (
    <Dialog.Root open={lightboxOpen} onOpenChange={setLightboxOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-foreground/85" />
        <Dialog.Content className="fixed inset-0 z-50 grid place-items-center p-4">
          <Dialog.Title className="sr-only">Galerie {product.name}</Dialog.Title>
          <button
            type="button"
            onClick={() => setActiveImage((value) => (value - 1 + product.images.length) % product.images.length)}
            className="absolute left-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/92 text-foreground"
            aria-label="Image precedente"
          >
            <ChevronLeft className="size-5" />
          </button>
          <div className="relative h-[82vh] w-[min(100%,58rem)] touch-pinch-zoom overflow-auto rounded-lg bg-white">
            <Image
              src={product.images[activeImage].src}
              alt={product.images[activeImage].alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          <button
            type="button"
            onClick={() => setActiveImage((value) => (value + 1) % product.images.length)}
            className="absolute right-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/92 text-foreground"
            aria-label="Image suivante"
          >
            <ChevronRight className="size-5" />
          </button>
          <Dialog.Close className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white text-foreground" aria-label="Fermer">
            <X className="size-5" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
