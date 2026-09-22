export interface Product {
  id: string;
  index: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
}

export const products: Product[] = [
  {
    id: "colonial",
    index: "01",
    name: "Isotelha Colonial",
    description:
      "O charme da estética tradicional em terracota com núcleo isolante térmico. Indicada para residências nobres e chalés.",
    image:
      "https://images.unsplash.com/photo-1600612707884-c424a2ba812e?w=1600&auto=format&fit=crop&q=80",
    imageAlt: "Telhado colonial em telhas terracota cercado por vegetação",
  },
  {
    id: "trapezoidal",
    index: "02",
    name: "Isotelha Trapezoidal",
    description:
      "Máxima eficiência estrutural, grandes vãos e estanqueidade para galpões, indústrias e comércios.",
    image:
      "https://images.unsplash.com/photo-1771164211037-d89b54554a14?w=1600&auto=format&fit=crop&q=80",
    imageAlt: "Cobertura metálica trapezoidal em edificação industrial",
  },
  {
    id: "kingwall",
    index: "03",
    name: "Sistema Modular KingWall",
    description:
      "Painéis isotérmicos Kingspan Isoeste para paredes limpas que aceitam pintura, gesso, cerâmica e texturas.",
    image:
      "https://images.unsplash.com/photo-1769490315790-5de4012634f8?w=1600&auto=format&fit=crop&q=80",
    imageAlt: "Parede interna moderna com painéis modulares canelados",
  },
  {
    id: "metalicas",
    index: "04",
    name: "Telhas Metálicas Simples",
    description:
      "Soluções resistentes em aço perfilado para obras industriais com foco em durabilidade.",
    image:
      "https://images.unsplash.com/photo-1787672357866-08ca3827c144?w=1600&auto=format&fit=crop&q=80",
    imageAlt: "Estrutura interna de telhado metálico industrial com vigas de aço",
  },
];
