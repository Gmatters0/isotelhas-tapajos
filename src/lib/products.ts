import type { SiteImage } from "@/lib/images";

export interface Product {
  id: string;
  index: string;
  name: string;
  description: string;
  image: SiteImage;
}

export const products: Product[] = [
  {
    id: "colonial",
    index: "01",
    name: "Isotelha Colonial",
    description:
      "O charme da estética tradicional em terracota com núcleo isolante térmico. Indicada para residências nobres e chalés.",
    image: {
      src: "/catalogo/isotelha-colonial-5-ondas-3-lg.webp",
      alt: "Casa com cobertura Isotelha Colonial em terracota vista de cima",
    },
  },
  {
    id: "trapezoidal",
    index: "02",
    name: "Isotelha Trapezoidal",
    description:
      "Máxima eficiência estrutural, grandes vãos e estanqueidade para galpões, indústrias e comércios.",
    image: {
      src: "/catalogo/isotelha-trapezoidal-2-lg.webp",
      alt: "Residência com cobertura Isotelha Trapezoidal em aço galvalume",
    },
  },
  {
    id: "kingwall",
    index: "03",
    name: "Sistema Modular KingWall",
    description:
      "Painéis isotérmicos Kingspan Isoeste para paredes limpas que aceitam pintura, gesso, cerâmica e texturas.",
    image: {
      src: "/catalogo/kingwall-3-lg.webp",
      alt: "Sala com parede limpa em painéis KingWall",
    },
  },
  {
    id: "metalicas",
    index: "04",
    name: "Telhas Metálicas Simples",
    description:
      "Soluções resistentes em aço perfilado para obras industriais com foco em durabilidade.",
    image: {
      src: "/home-telhas-metalicas.webp",
      alt: "Casa moderna com cobertura em telhas metálicas escuras",
    },
  },
];
