import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { CatalogBrowser } from "@/components/catalog/CatalogBrowser";
import { catalog, categories, segmentLabels } from "@/lib/catalog";
import { OG_IMAGE, SITE_URL, siteConfig } from "@/lib/site-config";
import { CONSULTANT_LINK } from "@/lib/whatsapp";

const title = `Catálogo de Produtos | ${siteConfig.name}`;
const description =
  "Catálogo completo Kingspan Isoeste e Benchmark em Santarém-PA: telhas térmicas e metálicas, painéis, fachadas, forros, portas e EPS. Pesquise, filtre e veja especificações, cores e documentos técnicos.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/catalogo" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/catalogo",
    siteName: siteConfig.name,
    title,
    description,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/catalogo#pagina`,
      url: `${SITE_URL}/catalogo`,
      name: title,
      description,
      inLanguage: "pt-BR",
      isPartOf: { "@id": `${SITE_URL}/#empresa` },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: catalog.length,
        itemListElement: catalog.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: product.name,
          url: `${SITE_URL}/catalogo#${product.slug}`,
        })),
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Catálogo", item: `${SITE_URL}/catalogo` },
      ],
    },
  ],
};

const stats = [
  { value: catalog.length, label: "produtos" },
  { value: categories.length, label: "categorias" },
  { value: Object.keys(segmentLabels).length, label: "segmentos" },
];

export default function CatalogPage() {
  return (
    <main id="conteudo" className="overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <section
        aria-labelledby="catalogo-titulo"
        className="relative overflow-hidden bg-brand-slate pb-14 pt-32 text-white md:pb-20 md:pt-44"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(52rem_26rem_at_90%_-8%,rgba(195,90,56,0.24),transparent_70%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:repeating-linear-gradient(90deg,#fff_0,#fff_1px,transparent_1px,transparent_96px)]"
        />

        <div className="relative mx-auto max-w-[1600px] px-6 md:px-12">
          <nav aria-label="Trilha de navegação" className="animate-enter">
            <ol className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-slate-400">
              <li>
                <Link href="/" className="transition-colors duration-200 hover:text-white">
                  INÍCIO
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-slate-200">
                CATÁLOGO
              </li>
            </ol>
          </nav>

          <div className="mt-8 grid gap-10 md:mt-10 md:grid-cols-[1.4fr_1fr] md:items-end md:gap-6">
            <h1
              id="catalogo-titulo"
              className="animate-enter font-display text-[clamp(2.4rem,5.6vw,4.75rem)] font-semibold leading-[1.04] tracking-tight [animation-delay:120ms]"
            >
              Soluções para cobrir, fechar e revestir.
            </h1>

            <div className="animate-enter [animation-delay:260ms] md:pl-6">
              <p className="max-w-md text-sm leading-relaxed text-slate-300 md:text-base">
                Telhas térmicas e metálicas, painéis, fachadas, forros, portas e EPS dos sistemas Kingspan Isoeste e
                Benchmark. Pesquise, filtre e abra qualquer produto para ver especificações, cores e documentos
                técnicos.
              </p>
              <dl className="mt-8 grid grid-cols-3 gap-6 border-t border-brand-border pt-6">
                {stats.map(({ value, label }) => (
                  <div key={label}>
                    <dt className="sr-only">{label}</dt>
                    <dd className="font-display text-3xl font-semibold tracking-tight md:text-4xl">{value}</dd>
                    <dd className="mt-1 font-mono text-[11px] tracking-widest text-slate-400" aria-hidden="true">
                      {label.toUpperCase()}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <CatalogBrowser />

      <section aria-labelledby="catalogo-cta-titulo" className="bg-brand-navy text-white">
        <div className="mx-auto grid max-w-[1600px] gap-10 px-6 py-20 md:grid-cols-[1.4fr_1fr] md:items-end md:px-12 md:py-24">
          <div>
            <p className="font-mono text-xs tracking-widest text-brand-terracotta-light">ESPECIFICAÇÃO TÉCNICA</p>
            <h2
              id="catalogo-cta-titulo"
              className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl"
            >
              Não encontrou o que procura?
            </h2>
            <p className="mt-5 max-w-xl text-slate-300">
              O portfólio Kingspan Isoeste é maior do que cabe em uma tela. Fale com um consultor para especificar o
              produto certo, com dimensionamento, cores e prazos para a sua obra.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
            <a
              href={CONSULTANT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-brand-terracotta-deep px-6 py-3.5 text-sm font-semibold tracking-wide text-white transition duration-200 hover:bg-brand-terracotta-deep/90 active:scale-[0.98]"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Falar com Consultor
            </a>
            <Link
              href="/#orcamento"
              className="inline-flex items-center justify-center border border-white/25 px-6 py-3.5 text-sm font-medium tracking-wide text-white transition duration-200 hover:border-white hover:bg-white hover:text-brand-slate active:scale-[0.98]"
            >
              Orçamento Rápido
            </Link>
          </div>
        </div>

        <p className="mx-auto max-w-[1600px] border-t border-brand-border px-6 py-6 text-xs leading-relaxed text-slate-400 md:px-12">
          Especificações conforme os catálogos do fabricante (Kingspan Isoeste e Benchmark). Dimensões, cores,
          disponibilidade e prazos podem variar e mudar sem aviso: confirme com um consultor antes de fechar o projeto.
          Imagens ilustrativas.
        </p>
      </section>
    </main>
  );
}
