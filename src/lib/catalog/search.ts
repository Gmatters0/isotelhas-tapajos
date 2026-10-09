import type { CatalogProduct, Category, CategoryId, SegmentId } from "./types";
import { categories, segmentLabels } from "./categories";

// ───────────────────────────── Facetas ─────────────────────────────

export const materialFacets = [
  "PIR",
  "Aço",
  "Aço inox",
  "Alumínio",
  "EPS",
  "Lã mineral",
  "Policarbonato",
  "Vidro",
  "Outros",
] as const;

export type MaterialFacet = (typeof materialFacets)[number];

/** Agrupa os materiais descritos livremente nos dados em poucas opções de filtro. */
export function materialFacetOf(material: string): MaterialFacet {
  const value = normalize(material);
  if (/inox/.test(value)) return "Aço inox";
  if (/\baco\b/.test(value)) return "Aço";
  if (/aluminio/.test(value)) return "Alumínio";
  if (/pir|inovacel/.test(value)) return "PIR";
  if (/\beps\b/.test(value)) return "EPS";
  if (/la de (rocha|vidro)/.test(value)) return "Lã mineral";
  if (/policarbonato/.test(value)) return "Policarbonato";
  if (/vidro/.test(value)) return "Vidro";
  return "Outros";
}

export type SortMode = "categoria" | "nome";
export type FacetKey = "category" | "segments" | "materials";

export interface CatalogFilters {
  query: string;
  category: CategoryId | "todas";
  segments: readonly SegmentId[];
  materials: readonly MaterialFacet[];
}

export const emptyFilters: CatalogFilters = {
  query: "",
  category: "todas",
  segments: [],
  materials: [],
};

export function countActiveFilters(filters: CatalogFilters): number {
  return (filters.category !== "todas" ? 1 : 0) + filters.segments.length + filters.materials.length;
}

// ───────────────────────────── Busca ─────────────────────────────

/** Minúsculas e sem acentos, para busca tolerante ("cobertura" encontra "Cobertúra"). */
export function normalize(value: string): string {
  return value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

function tokenize(query: string): string[] {
  return normalize(query)
    .split(/[\s,;]+/)
    .filter((token) => token.length > 0);
}

export interface SearchEntry {
  product: CatalogProduct;
  /** Posição no catálogo (desempate e ordenação padrão). */
  order: number;
  name: string;
  head: string;
  body: string;
  materials: ReadonlySet<MaterialFacet>;
}

export function buildIndex(products: readonly CatalogProduct[]): SearchEntry[] {
  const categoryLabels = new Map<CategoryId, string>(categories.map((category) => [category.id, category.label]));

  return products.map((product, order) => {
    const body = [
      product.summary,
      ...product.description,
      ...product.highlights,
      ...product.applications,
      ...product.materials,
      ...product.chips,
      ...product.specs.flat(),
      ...(product.accessories ?? []),
      ...(product.variants ?? []).flatMap((variant) => [variant.name, variant.summary]),
      ...(product.colors ?? []).flatMap((group) => group.items.map((swatch) => swatch.name)),
      ...(product.tables ?? []).flatMap((table) => [table.title, ...table.columns, ...table.rows.flat()]),
      categoryLabels.get(product.category) ?? "",
      ...product.segments.map((segment) => segmentLabels[segment]),
    ].join(" ");

    return {
      product,
      order,
      name: normalize(product.name),
      head: normalize([product.family, ...(product.keywords ?? [])].join(" ")),
      body: normalize(body),
      materials: new Set(product.materials.map(materialFacetOf)),
    };
  });
}

/** Pontuação do produto para os termos da busca; -1 quando algum termo não aparece. */
function scoreEntry(entry: SearchEntry, tokens: readonly string[]): number {
  let score = 0;
  for (const token of tokens) {
    if (entry.name.includes(token)) {
      score += entry.name.startsWith(token) || entry.name.includes(` ${token}`) ? 8 : 6;
    } else if (entry.head.includes(token)) {
      score += 3;
    } else if (entry.body.includes(token)) {
      score += 1;
    } else {
      return -1;
    }
  }
  return score;
}

export interface SearchResult {
  entry: SearchEntry;
  score: number;
}

/** Aplica busca + filtros. `skip` ignora uma faceta (usado para calcular as contagens de cada faceta). */
export function searchEntries(
  entries: readonly SearchEntry[],
  filters: CatalogFilters,
  skip?: FacetKey
): SearchResult[] {
  const tokens = tokenize(filters.query);
  const results: SearchResult[] = [];

  for (const entry of entries) {
    const { product } = entry;
    if (skip !== "category" && filters.category !== "todas" && product.category !== filters.category) continue;
    if (
      skip !== "segments" &&
      filters.segments.length > 0 &&
      !filters.segments.some((s) => product.segments.includes(s))
    )
      continue;
    if (skip !== "materials" && filters.materials.length > 0 && !filters.materials.some((m) => entry.materials.has(m)))
      continue;

    const score = scoreEntry(entry, tokens);
    if (score < 0) continue;
    results.push({ entry, score });
  }

  return results;
}

export function sortResults(results: readonly SearchResult[], mode: SortMode, hasQuery: boolean): CatalogProduct[] {
  const sorted = [...results];

  if (hasQuery) {
    sorted.sort((a, b) => b.score - a.score || a.entry.order - b.entry.order);
  } else if (mode === "nome") {
    sorted.sort((a, b) => a.entry.product.name.localeCompare(b.entry.product.name, "pt-BR", { sensitivity: "base" }));
  } else {
    sorted.sort((a, b) => a.entry.order - b.entry.order);
  }

  return sorted.map((result) => result.entry.product);
}

// ───────────────────────────── Contagens ─────────────────────────────

export interface FacetCounts {
  category: Readonly<Record<CategoryId | "todas", number>>;
  segments: Readonly<Record<SegmentId, number>>;
  materials: Readonly<Record<MaterialFacet, number>>;
}

/** Contagem de cada opção considerando todos os outros filtros ativos (faceta "disjuntiva"). */
export function facetCounts(entries: readonly SearchEntry[], filters: CatalogFilters): FacetCounts {
  const category = Object.fromEntries(categories.map((c) => [c.id, 0])) as Record<CategoryId | "todas", number>;
  const byCategory = searchEntries(entries, filters, "category");
  category.todas = byCategory.length;
  for (const { entry } of byCategory) category[entry.product.category] += 1;

  const segments: Record<SegmentId, number> = { residencial: 0, comercial: 0, industrial: 0, agronegocio: 0 };
  for (const { entry } of searchEntries(entries, filters, "segments")) {
    for (const segment of entry.product.segments) segments[segment] += 1;
  }

  const materials = Object.fromEntries(materialFacets.map((m) => [m, 0])) as Record<MaterialFacet, number>;
  for (const { entry } of searchEntries(entries, filters, "materials")) {
    for (const material of entry.materials) materials[material] += 1;
  }

  return { category, segments, materials };
}

// ───────────────────────────── Agrupamento ─────────────────────────────

export interface CategoryGroup {
  category: Category;
  products: CatalogProduct[];
}

/** Agrupa mantendo a ordem das categorias; categorias sem produtos ficam de fora. */
export function groupByCategory(products: readonly CatalogProduct[]): CategoryGroup[] {
  return categories
    .map((category) => ({ category, products: products.filter((product) => product.category === category.id) }))
    .filter((group) => group.products.length > 0);
}
