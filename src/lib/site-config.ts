export interface NavLink {
  label: string;
  href: string;
}

/** Número de WhatsApp (formato internacional, só dígitos) usado em todos os CTAs do site. */
export const WHATSAPP_NUMBER = "559391977944";

/**
 * Telefone exibido no site. Difere de WHATSAPP_NUMBER de propósito: o wa.me funciona sem o nono dígito,
 * mas a exibição segue o formato atual de celular (com o 9 inicial).
 */
export const PHONE_DISPLAY = "(93) 99197-7944";

/** Domínio oficial (canonical, Open Graph, sitemap, JSON-LD). Fixo: o site só responde em produção neste endereço. */
export const SITE_URL = "https://isotelhastapajos.com.br";

/** Imagem de compartilhamento (1200x630) em /public; caminho relativo, resolvido contra `metadataBase`. */
export const OG_IMAGE = "/og.jpg";

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
  { label: "Showroom", href: "/#showroom" },
];
