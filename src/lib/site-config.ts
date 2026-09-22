export interface NavLink {
  label: string;
  href: string;
}

/**
 * Placeholder — número de exemplo usado no prompt original do projeto.
 * Substituir pelo número real da Isotelhas Tapajós (formato internacional,
 * ex: "5593912345678") antes do lançamento em produção.
 */
export const WHATSAPP_NUMBER = "5593999999999";

export const siteConfig = {
  name: "Isotelhas Tapajós",
  legalName: "Isotelhas Tapajós LTDA",
  cnpj: "19.188.329/0001-56",
  tagline: "Tecnologia em Coberturas",
  description:
    "Sistemas construtivos termoacústicos e representante autorizado Kingspan Isoeste em Santarém, PA. Engenharia e conforto térmico para o clima do Tapajós.",
  address: {
    line: "Av. Mendonça Furtado, nº 3941",
    city: "Santarém – PA",
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
