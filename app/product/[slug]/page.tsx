import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product-detail";
import { getProductBySlug, getRelatedProducts, products } from "@/data/products";
import { reviews } from "@/data/reviews";
import { siteContent } from "@/lib/content";
import { siteUrl } from "@/lib/site";
import { formatPrice } from "@/lib/utils";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.shortDescription,
    alternates: {
      canonical: `/product/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | ${siteContent.brand.name}`,
      description: product.shortDescription,
      url: `/product/${product.slug}`,
      type: "website",
      images: [
        {
          url: product.images[0].src,
          width: 1024,
          height: 1536,
          alt: product.images[0].alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | ${siteContent.brand.name}`,
      description: product.shortDescription,
      images: [product.images[0].src],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const index = products.findIndex((item) => item.id === product.id);
  const pageUrl = `${siteUrl}/product/${product.slug}`;
  const productReviews = reviews.filter((review) => review.productSlug === product.slug).slice(0, 3);
  const related = getRelatedProducts(product);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images.map((image) => `${siteUrl}${image.src}`),
    description: product.shortDescription,
    brand: {
      "@type": "Brand",
      name: siteContent.brand.name,
    },
    category: product.category,
    offers:
      typeof product.price === "number"
        ? {
            "@type": "Offer",
            priceCurrency: "MAD",
            price: product.price,
            availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            url: pageUrl,
          }
        : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ProductDetail
        product={product}
        related={related}
        reviews={productReviews}
        previous={products[index - 1]}
        next={products[index + 1]}
        pageUrl={pageUrl}
      />
      <span className="sr-only">{formatPrice(product.price)}</span>
    </>
  );
}
