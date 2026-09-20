import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { Header } from "@/components/header";
import { siteContent } from "@/lib/content";
import { siteUrl } from "@/lib/site";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteContent.meta.title,
    template: `%s | ${siteContent.brand.name}`,
  },
  description: siteContent.meta.description,
  applicationName: siteContent.brand.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteContent.meta.title,
    description: siteContent.meta.description,
    url: "/",
    siteName: siteContent.brand.name,
    locale: "fr_MA",
    type: "website",
    images: [
      {
        url: "/images/product.png",
        width: 1024,
        height: 1536,
        alt: "Collection Hopla pour enfants",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteContent.meta.title,
    description: siteContent.meta.description,
    images: ["/images/product.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
