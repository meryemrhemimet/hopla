import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...products.map((product) => ({
      url: `${siteUrl}/product/${product.slug}`,
      lastModified: new Date(product.createdAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
