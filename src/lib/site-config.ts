export interface NavLink {
  label: string;
  href: string;
}

/** Número de WhatsApp (formato internacional, só dígitos) usado em todos os CTAs do site. */
export const WHATSAPP_NUMBER = "559381221155";

/**
 * URL pública do site (canonical, Open Graph, sitemap). Em produção vem de
 * NEXT_PUBLIC_SITE_URL ou, na Vercel, do domínio de produção do projeto.
 */
export const SITE_URL: string =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const siteConfig = {
  name: "Isotelhas Tapajós",
  legalName: "Isotelhas Tapajós LTDA",
  cnpj: "19.188.329/0001-56",
  tagline: "Tecnologia em Coberturas",
  title: "Isotelhas Tapajós | Telhas Termoacústicas em Santarém-PA",
  description:
    "Telhas e painéis termoacústicos Kingspan Isoeste (KingWall) em Santarém-PA. Menos calor, menos ruído de chuva e obra a seco. Peça seu orçamento no WhatsApp.",
  address: {
    line: "Av. Mendonça Furtado, nº 3941",
    city: "Santarém – PA",
    locality: "Santarém",
    region: "PA",
  },
  instagram: {
    handle: "@isotelhastapajos",
    url: "https://www.instagram.com/isotelhastapajos",
  },
} as const;

export const navLinks: NavLink[] = [
  { label: "Soluções", href: "#solucoes" },
  { label: "KingWall", href: "#kingwall" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Showroom", href: "#showroom" },
];
