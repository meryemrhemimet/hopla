"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type * as React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  HeartHandshake,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/data/products";
import type { Review } from "@/data/reviews";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { siteContent } from "@/lib/content";
import { siteUrl } from "@/lib/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { cn, formatPrice, normalize } from "@/lib/utils";

type SortValue = "newest" | "price-asc" | "price-desc";

const trustIcons = [MessageCircle, Camera, ShieldCheck, HeartHandshake];
const highlights = ["100% coton", "Facile a rouler", "Lavable en machine"];

function getInitialCatalogState() {
  if (typeof window === "undefined") {
    return { category: "Tous", query: "", sort: "newest" as SortValue, y: undefined as number | undefined };
  }
  const saved = sessionStorage.getItem("hopla.catalog.state");
  const urlCategory = new URLSearchParams(window.location.search).get("category");
  if (!saved) return { category: urlCategory || "Tous", query: "", sort: "newest" as SortValue, y: undefined };
  try {
    const parsed = JSON.parse(saved) as { category?: string; query?: string; sort?: SortValue; y?: number };
    return {
      category: urlCategory || parsed.category || "Tous",
      query: parsed.query || "",
      sort: parsed.sort || ("newest" as SortValue),
      y: parsed.y,
    };
  } catch {
    sessionStorage.removeItem("hopla.catalog.state");
    return { category: "Tous", query: "", sort: "newest" as SortValue, y: undefined };
  }
}

export function HomePage({ products, reviews }: { products: Product[]; reviews: Review[] }) {
  const [category, setCategory] = useState(() => getInitialCatalogState().category);
  const [query, setQuery] = useState(() => getInitialCatalogState().query);
  const [sort, setSort] = useState<SortValue>(() => getInitialCatalogState().sort);
  const categories = useMemo(
    () => ["Tous", ...Array.from(new Set(products.map((product) => product.category)))],
    [products],
  );

  useEffect(() => {
    const { y } = getInitialCatalogState();
    if (typeof y === "number") {
      requestAnimationFrame(() => window.scrollTo({ top: y }));
    }
  }, []);

  useEffect(() => {
    const save = () => {
      sessionStorage.setItem(
        "hopla.catalog.state",
        JSON.stringify({ category, query, sort, y: window.scrollY }),
      );
    };
    window.addEventListener("beforeunload", save);
    return () => {
      save();
      window.removeEventListener("beforeunload", save);
    };
  }, [category, query, sort]);

  const filtered = useMemo(() => {
    const normalizedQuery = normalize(query.trim());
    return products
      .filter((product) => category === "Tous" || product.category === category)
      .filter((product) => {
        if (!normalizedQuery) return true;
        return normalize(`${product.name} ${product.category} ${product.shortDescription}`).includes(
          normalizedQuery,
        );
      })
      .sort((a, b) => {
        if (sort === "price-asc") return (a.price ?? Number.MAX_SAFE_INTEGER) - (b.price ?? Number.MAX_SAFE_INTEGER);
        if (sort === "price-desc") return (b.price ?? -1) - (a.price ?? -1);
        return Date.parse(b.createdAt) - Date.parse(a.createdAt);
      });
  }, [category, products, query, sort]);

  return (
    <>
      <Hero />
      <LifestyleSection />
      <CatalogSection
        categories={categories}
        category={category}
        filtered={filtered}
        query={query}
        setCategory={setCategory}
        setQuery={setQuery}
        setSort={setSort}
        sort={sort}
      />
      <WhyHopla />
      <ReviewsSection reviews={reviews} />
      <FaqSection />
      <FinalCta />
    </>
  );
}

function Hero() {
  return (
    <section className="container-shell pb-12 pt-8 md:pb-16 md:pt-12">
      <motion.div
        className="mx-auto max-w-4xl text-center"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <p className="mb-4 inline-flex rounded-full bg-blush px-4 py-2 text-sm font-bold text-foreground">
          {siteContent.hero.eyebrow}
        </p>
        <h1 className="heading-xl">{siteContent.hero.title}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted">{siteContent.hero.body}</p>
        <div className="mt-7 flex flex-wrap justify-center gap-2">
          {highlights.map((item) => (
            <span
              key={item}
              className="inline-flex min-h-9 items-center gap-2 rounded-full border border-border bg-surface px-3 text-sm font-semibold text-foreground"
            >
              <CheckCircle2 className="size-4 text-primary-dark" />
              {item}
            </span>
          ))}
        </div>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild>
            <a href="#shop">
              Voir le catalogue
              <ArrowRight className="size-5" />
            </a>
          </Button>
          <Button asChild variant="secondary">
            <a
              href={buildWhatsAppLink("Bonjour Hopla ! Je souhaite decouvrir la collection.")}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="size-5" />
              WhatsApp
            </a>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}

function LifestyleSection() {
  return (
    <section className="bg-powder/60 py-12 md:py-16">
      <div className="container-shell grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div className="relative overflow-hidden rounded-lg bg-white shadow-[0_18px_48px_rgba(59,79,84,0.12)]">
          <div className="relative aspect-[1024/661]">
            <Image
              src="/images/product2.png"
              alt="Tapis de sieste Hopla motif marin"
              fill
              sizes="(min-width: 1024px) 54vw, 92vw"
              className="object-cover object-center"
            />
          </div>
        </div>
        <div>
          <SectionHeading eyebrow="Le petit coin Hopla" title="Un petit cocon pour grandes aventures." />
          <p className="mt-5 max-w-xl text-lg text-muted">
            A la maison, chez les grands-parents ou en sortie, Hopla garde un espace familier pour se reposer,
            jouer et bouger sans compliquer le quotidien.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {[
              ["57 x 120 cm", "Tapis"],
              ["67 x 120 cm", "Couverture"],
              ["Machine", "Entretien simple"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-lg border border-border bg-surface p-4">
                <p className="text-xl font-bold text-foreground">{value}</p>
                <p className="mt-1 text-sm text-muted">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CatalogSection({
  categories,
  category,
  filtered,
  query,
  setCategory,
  setQuery,
  setSort,
  sort,
}: {
  categories: string[];
  category: string;
  filtered: Product[];
  query: string;
  setCategory: (value: string) => void;
  setQuery: (value: string) => void;
  setSort: (value: SortValue) => void;
  sort: SortValue;
}) {
  return (
    <section id="shop" className="container-shell py-14 md:py-16">
      <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
        <SectionHeading eyebrow="Catalogue" title="Tous les modeles Hopla au meme endroit." />
        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted" />
            <span className="sr-only">Rechercher un produit</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Rechercher un motif..."
              className="min-h-12 w-full rounded-full border border-border bg-surface py-3 pl-12 pr-4 text-foreground placeholder:text-muted"
            />
          </label>
          <label className="block">
            <span className="sr-only">Trier les produits</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortValue)}
              className="min-h-12 w-full rounded-full border border-border bg-surface px-4 text-sm font-semibold text-foreground"
            >
              <option value="newest">Plus recents</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix decroissant</option>
            </select>
          </label>
        </div>
      </div>
      <div className="scrollbar-none mt-7 flex gap-3 overflow-x-auto pb-2">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={cn(
              "min-h-10 shrink-0 rounded-full border px-4 text-sm font-bold transition",
              category === item
                ? "border-foreground bg-foreground text-white"
                : "border-border bg-surface text-muted hover:border-primary/40 hover:text-foreground",
            )}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm font-semibold text-muted">
        {filtered.length} modele{filtered.length > 1 ? "s" : ""} affiche{filtered.length > 1 ? "s" : ""}
      </p>
      {filtered.length ? (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product, index) => (
            <ProductCard key={product.id} product={product} priority={index < 2} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-lg border border-border bg-surface p-8 text-center">
          <p className="heading-md">Aucun modele trouve</p>
          <p className="mt-3 text-muted">Essayez une autre categorie ou un autre mot-cle.</p>
        </div>
      )}
    </section>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary-dark">{eyebrow}</p>
      <h2 className="heading-lg mt-2">{title}</h2>
    </div>
  );
}

function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const router = useRouter();
  const href = `/product/${product.slug}`;
  const orderHref = buildWhatsAppLink(
    `Bonjour Hopla ! Je suis interesse(e) par : ${product.name} - ${formatPrice(product.price)}. Lien : ${siteUrl}${href}`,
  );

  const open = () => router.push(href);
  const keyOpen = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      open();
    }
  };

  return (
    <article
      role="link"
      tabIndex={0}
      onClick={open}
      onKeyDown={keyOpen}
      className="group cursor-pointer rounded-lg border border-border bg-surface p-2 transition duration-200 hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(41,33,28,0.1)]"
      aria-label={`Voir ${product.name}`}
    >
      <div className="image-ratio relative overflow-hidden rounded-md bg-white">
        <Image
          src={product.images[0].src}
          alt={product.images[0].alt}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="object-cover transition duration-300 group-hover:scale-[1.02]"
        />
        {product.images[1] ? (
          <Image
            src={product.images[1].src}
            alt=""
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="hidden object-cover opacity-0 transition duration-300 group-hover:opacity-100 md:block"
          />
        ) : null}
        {product.badge ? (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
            {product.badge === "new" ? "New" : "Popular"}
          </span>
        ) : null}
        <span className="absolute bottom-3 left-1/2 hidden -translate-x-1/2 rounded-full bg-white/92 px-3 py-1 text-xs font-bold text-foreground opacity-0 transition group-hover:opacity-100 md:block">
          Voir details
        </span>
      </div>
      <div className="p-2.5">
        {product.images.length > 1 ? (
          <div className="mb-2 flex gap-1 md:hidden" aria-hidden="true">
            {product.images.map((image) => (
              <span key={image.src} className="size-1.5 rounded-full bg-primary/45" />
            ))}
          </div>
        ) : null}
        <h3 className="line-clamp-2 min-h-[3.1rem] text-[0.98rem] font-bold leading-tight text-foreground">
          {product.name}
        </h3>
        <p className="mt-1 text-sm font-semibold text-muted">{formatPrice(product.price)}</p>
        <a
          href={orderHref}
          target="_blank"
          rel="noreferrer"
          onClick={(event) => event.stopPropagation()}
          onKeyDown={(event) => event.stopPropagation()}
          className="mt-3 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-full bg-primary px-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
        >
          <MessageCircle className="size-4" />
          Commander
        </a>
      </div>
    </article>
  );
}

function WhyHopla() {
  return (
    <section id="about" className="bg-surface py-14 md:py-16">
      <div className="container-shell">
        <SectionHeading eyebrow="Pourquoi Hopla" title="Simple, doux, direct." />
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {siteContent.trust.map((item, index) => {
            const Icon = trustIcons[index] ?? Sparkles;
            return (
              <div key={item.title} className="rounded-lg border border-border bg-white p-5">
                <div className="grid size-11 place-items-center rounded-full bg-soft-green">
                  <Icon className="size-5 text-primary-dark" />
                </div>
                <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ReviewsSection({ reviews }: { reviews: Review[] }) {
  const realReviews = reviews.filter((review) => !review.placeholder);

  return (
    <section id="avis" className="container-shell py-14 md:py-16">
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <SectionHeading eyebrow="Avis" title="Des petits mots qui rassurent." />
          <p className="mt-4 max-w-md text-muted">
            Des retours imagines pour donner le ton doux et pratique de Hopla.
          </p>
          <Button asChild variant="secondary" size="sm" className="mt-6">
            <a
              href={buildWhatsAppLink("Bonjour Hopla ! Je souhaite partager mon experience.")}
              target="_blank"
              rel="noreferrer"
            >
              Partager mon experience
            </a>
          </Button>
        </div>
        {realReviews.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {realReviews.map((review) => (
              <article key={review.id} className="rounded-lg border border-border bg-surface p-5">
                <div className="flex text-primary" aria-label="5 etoiles">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-foreground">
                  {review.type === "text" ? review.quote : review.alt}
                </p>
                <p className="mt-5 font-semibold">
                  {review.name}
                  {review.city ? <span className="block text-sm font-normal text-muted">{review.city}</span> : null}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-primary/30 bg-blush/55 p-6">
            <p className="text-xl font-bold text-foreground">Aucun faux avis affiche.</p>
            <p className="mt-2 text-muted">
              Quand vous aurez de vrais messages clients, ils pourront s&apos;afficher ici sans changer la mise en page.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="bg-powder/45 py-14 md:py-16">
      <div className="container-shell grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
        <SectionHeading eyebrow="FAQ" title="Les questions utiles avant de commander." />
        <Accordion type="single" collapsible className="rounded-lg border border-border bg-surface px-5">
          {siteContent.faq.map((item, index) => (
            <AccordionItem key={item.question} value={`item-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="container-shell pb-14 pt-10">
      <div className="grid gap-6 rounded-lg bg-foreground p-7 text-surface sm:p-10 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blush">Une question ?</p>
          <h2 className="heading-md mt-2 max-w-2xl">Parlez-nous du modele que vous aimez.</h2>
        </div>
        <Button asChild variant="secondary" className="bg-surface text-foreground">
          <a
            href={buildWhatsAppLink("Bonjour Hopla ! Je souhaite commander ou poser une question.")}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle className="size-5" />
            WhatsApp
          </a>
        </Button>
      </div>
    </section>
  );
}
