export type CategoryId =
  | "telhas-termicas"
  | "telhas-metalicas"
  | "coberturas-especiais"
  | "paredes-paineis"
  | "fachadas-revestimentos"
  | "brises-modulos"
  | "forros-divisorias"
  | "portas"
  | "eps-construcao";

export type SegmentId = "residencial" | "comercial" | "industrial" | "agronegocio";

export type SpecRow = readonly [label: string, value: string];

export interface TechTable {
  title: string;
  columns: readonly string[];
  rows: readonly (readonly string[])[];
  note?: string;
}

export interface Swatch {
  name: string;
  hex: string;
}

export interface ColorGroup {
  group: string;
  items: readonly Swatch[];
}

export interface ProductVariant {
  name: string;
  summary: string;
}

export interface CatalogDocument {
  label: string;
  href: string;
}

/** Dados editoriais de um produto (sem imagens/documentos, que são resolvidos em `index.ts`). */
export interface ProductData {
  slug: string;
  name: string;
  category: CategoryId;
  /** Linha/família exibida como legenda do cartão (ex.: "Isotelha® PIR AP"). */
  family: string;
  summary: string;
  description: readonly string[];
  highlights: readonly string[];
  applications: readonly string[];
  segments: readonly SegmentId[];
  /** Materiais usados como filtro (ex.: "PIR", "Aço galvalume"). */
  materials: readonly string[];
  /** Até 3 fatos curtos exibidos no cartão. */
  chips: readonly string[];
  specs: readonly SpecRow[];
  tables?: readonly TechTable[];
  colors?: readonly ColorGroup[];
  variants?: readonly ProductVariant[];
  accessories?: readonly string[];
  notes?: readonly string[];
  /** Palavras extras para a busca (sinônimos, nomes antigos). */
  keywords?: readonly string[];
  /** Slugs das páginas oficiais usadas para documentos e link do fabricante. */
  sources?: readonly string[];
}

export interface CatalogImage {
  src: string;
  alt: string;
}

export interface CatalogProduct extends Omit<ProductData, "sources"> {
  images: readonly CatalogImage[];
  documents: readonly CatalogDocument[];
  officialUrl?: string;
}

export interface Category {
  id: CategoryId;
  label: string;
  description: string;
}
