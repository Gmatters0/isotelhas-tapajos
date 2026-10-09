import type { Metadata, Viewport } from "next";
import { Marcellus, Outfit, JetBrains_Mono } from "next/font/google";
import { preconnect } from "react-dom";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloatingButton } from "@/components/layout/WhatsAppFloatingButton";
import { OG_IMAGE, SITE_URL, siteConfig } from "@/lib/site-config";

// Substitutas gratuitas da identidade visual: Marcellus (romana clássica, no lugar de Classic Roman)
// e Outfit (geométrica, no lugar de Stolzl). Para usar as fontes licenciadas, troque por next/font/local.
const displayFont = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display-raw",
  display: "swap",
});

const bodyFont = Outfit({
  subsets: ["latin"],
  variable: "--font-body-raw",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono-raw",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: siteConfig.title,
  description: siteConfig.description,
  applicationName: siteConfig.name,
  category: "construction",
  // Telefone e endereço já estão em texto/JSON-LD; impede o iOS de transformar números soltos em links.
  formatDetection: { telephone: false },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [OG_IMAGE],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a1118",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  preconnect("https://images.unsplash.com");

  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${displayFont.variable} ${bodyFont.variable} ${jetBrainsMono.variable}`}
    >
      <body className="min-h-screen bg-brand-surface font-sans text-brand-slate antialiased">
        <a
          href="#conteudo"
          className="sr-only z-60 bg-brand-terracotta-deep px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Pular para o conteúdo
        </a>
        <Navbar />
        {children}
        <Footer />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
