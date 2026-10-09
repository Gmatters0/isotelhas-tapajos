import type { Category, SegmentId } from "./types";

export const categories: readonly Category[] = [
  {
    id: "telhas-termicas",
    label: "Telhas Térmicas",
    description: "Isotelhas sanduíche e semi-sanduíche com núcleo em PIR: conforto térmico e cobertura sem forro.",
  },
  {
    id: "telhas-metalicas",
    label: "Telhas Metálicas",
    description: "Telhas em aço galvalume pré-pintado para residências, galpões e fechamentos.",
  },
  {
    id: "coberturas-especiais",
    label: "Coberturas Especiais",
    description: "Coberturas planas, zipadas, translúcidas, solares e sistemas de segurança em altura.",
  },
  {
    id: "paredes-paineis",
    label: "Paredes e Painéis",
    description: "Paredes isotérmicas, painéis frigoríficos, fachadas térmicas e sistemas construtivos.",
  },
  {
    id: "fachadas-revestimentos",
    label: "Fachadas e Revestimentos",
    description: "Painéis térmicos de fachada, perfis ripados em aço, painéis translúcidos e revestimentos lineares.",
  },
  {
    id: "brises-modulos",
    label: "Brises e Módulos Arquitetônicos",
    description:
      "Brises, painéis perfurados e módulos em aço e alumínio para compor fachadas com luz, sombra e volume.",
  },
  {
    id: "forros-divisorias",
    label: "Forros e Divisórias",
    description: "Forros metálicos, painéis acústicos e divisórias internas para ambientes comerciais e corporativos.",
  },
  {
    id: "portas",
    label: "Portas",
    description: "Portas rápidas, de aço, seccionais, frigoríficas e para salas limpas.",
  },
  {
    id: "eps-construcao",
    label: "EPS e Construção",
    description: "Soluções em EPS para lajes, fundações, paredes e peças técnicas.",
  },
];

export const segmentLabels: Record<SegmentId, string> = {
  residencial: "Residencial",
  comercial: "Comercial",
  industrial: "Industrial",
  agronegocio: "Agronegócio",
};
