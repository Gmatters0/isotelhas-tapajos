export interface NavLink {
  label: string;
  href: string;
}

/** Número de WhatsApp (formato internacional, só dígitos) usado em todos os CTAs do site. */
export const WHATSAPP_NUMBER = "559391977944";

// "559391977944" -> "(93) 9197-7944" (aceita 8 ou 9 dígitos após o DDD)
function formatBrPhone(digits: string): string {
  const ddd = digits.slice(2, 4);
  const local = digits.slice(4);
  const split = local.length - 4;
  return `(${ddd}) ${local.slice(0, split)}-${local.slice(split)}`;
}

export const PHONE_DISPLAY = formatBrPhone(WHATSAPP_NUMBER);

/** Domínio oficial (canonical, Open Graph, sitemap, JSON-LD). Fixo: o site só responde em produção neste endereço. */
export const SITE_URL = "https://isotelhastapajos.com.br";

/** Imagem de compartilhamento (1200x630) em /public; caminho relativo, resolvido contra `metadataBase`. */
export const OG_IMAGE = "/og.png";

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
  developer: {
    name: "AWT Development",
    url: "https://awtdevelopment.com",
  },
} as const;

export const navLinks: NavLink[] = [
  { label: "Soluções", href: "/#solucoes" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "KingWall", href: "/#kingwall" },
  { label: "Diferenciais", href: "/#diferenciais" },
  { label: "Showroom", href: "/#showroom" },
];
