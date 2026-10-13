export interface SiteImage {
  src: string;
  alt: string;
}

/** URL base do Unsplash sem parâmetros; o image-loader acrescenta largura e qualidade. */
export const unsplash = (photoId: string): string => `https://images.unsplash.com/photo-${photoId}`;

export const images = {
  hero: {
    src: "/hero-chale-tapajos.webp",
    alt: "Chalé A-Frame com cobertura de telha térmica terracota à beira do rio ao pôr do sol",
  },
  showroom: {
    src: unsplash("1677272292473-babd917423d0"),
    alt: "Sala de atendimento moderna com ripado de madeira no showroom Isotelhas Tapajós",
  },
  quote: {
    src: unsplash("1781231702773-4cf3247fc061"),
    alt: "Fachada de arquitetura contemporânea com varandas e vegetação",
  },
} satisfies Record<string, SiteImage>;

