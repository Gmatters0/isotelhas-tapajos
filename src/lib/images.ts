export interface SiteImage {
  src: string;
  alt: string;
}

/** URL base do Unsplash sem parâmetros; o image-loader acrescenta largura e qualidade. */
export const unsplash = (photoId: string): string => `https://images.unsplash.com/photo-${photoId}`;

export const images = {
  hero: {
    src: unsplash("1733003538511-4a2c0a42d9c6"),
    alt: "Chalé contemporâneo com cobertura metálica termoacústica em estilo A-Frame",
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

