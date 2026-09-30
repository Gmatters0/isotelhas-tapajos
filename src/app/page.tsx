import { Hero } from "@/components/sections/Hero";
import { ManifestoSection } from "@/components/sections/ManifestoSection";
import { ShowcaseSection } from "@/components/sections/ShowcaseSection";
import { ShowroomSection } from "@/components/sections/ShowroomSection";
import { QuoteFormSection } from "@/components/sections/QuoteFormSection";
import { ogImageUrl } from "@/lib/images";
import { products } from "@/lib/products";
import { SITE_URL, siteConfig } from "@/lib/site-config";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": `${SITE_URL}/#empresa`,
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  taxID: siteConfig.cnpj,
  description: siteConfig.description,
  url: SITE_URL,
  image: ogImageUrl,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Mendonça Furtado, 3941",
    addressLocality: siteConfig.address.locality,
    addressRegion: siteConfig.address.region,
    addressCountry: "BR",
  },
  areaServed: { "@type": "City", name: siteConfig.address.locality },
  sameAs: [siteConfig.instagram.url],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Soluções em coberturas e paredes termoacústicas",
    itemListElement: products.map((product) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Product", name: product.name, description: product.description },
    })),
  },
};

export default function Home() {
  return (
    <main id="conteudo" className="overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <ManifestoSection />
      <ShowcaseSection />
      <ShowroomSection />
      <QuoteFormSection />
    </main>
  );
}
