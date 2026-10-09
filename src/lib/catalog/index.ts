/**
 * Catálogo: ponto único de montagem dos produtos.
 *
 * Como adicionar/editar um produto:
 *  1. Edite (ou crie) o arquivo da categoria em `data/` — texto editorial escrito à mão (`ProductData`).
 *  2. `sources` lista as páginas oficiais do fabricante; `data/sources.ts` (GERADO, não editar à mão) traz a URL
 *     oficial e os PDFs verificados de cada uma.
 *  3. As imagens vivem em `public/catalogo/<slug>-<n>-sm.webp` (cartão/miniatura, 720x540) e `-lg.webp` (modal,
 *     até 1200x900); `data/images.ts` (GERADO) só guarda quantas existem por produto. A 1ª imagem é a capa e deve
 *     ser a foto "crua" do produto; fotos de obra ficam nas seguintes (aparecem só no modal).
 *  4. A ordem de exibição é a de `categories` e, dentro de cada categoria, a ordem do array.
 */
import type { CatalogDocument, CatalogImage, CatalogProduct, CategoryId, ProductData } from "./types";
import { categories } from "./categories";
import { brisesModulos } from "./data/brises-modulos";
import { coberturasEspeciais } from "./data/coberturas-especiais";
import { epsConstrucao } from "./data/eps-construcao";
import { fachadasRevestimentos } from "./data/fachadas-revestimentos";
import { forrosDivisorias } from "./data/forros-divisorias";
import { productImages } from "./data/images";
import { paredesPaineis } from "./data/paredes-paineis";
import { portas } from "./data/portas";
import { DOCS_BASE, documents, sources } from "./data/sources";
import { telhasMetalicas } from "./data/telhas-metalicas";
import { telhasTermicas } from "./data/telhas-termicas";

export { categories, segmentLabels } from "./categories";
export type * from "./types";

/** Quantidade máxima de documentos exibidos por produto. */
const MAX_DOCUMENTS = 6;

const DOC_RANK: Readonly<Record<string, number>> = {
  Catálogo: 0,
  "Catálogo de produtos": 0,
  "Catálogo de portas": 0,
  Folder: 0,
  "Manual de instalação": 1,
  "Guia rápido de instalação": 2,
  "Catálogo de cores": 3,
  "Desenhos de aprovação": 4,
};

const rawProducts: readonly ProductData[] = [
  ...telhasTermicas,
  ...telhasMetalicas,
  ...coberturasEspeciais,
  ...paredesPaineis,
  ...fachadasRevestimentos,
  ...brisesModulos,
  ...forrosDivisorias,
  ...portas,
  ...epsConstrucao,
];

const categoryOrder = new Map<CategoryId, number>(categories.map((category, index) => [category.id, index]));

function resolveImages(slug: string, name: string): readonly CatalogImage[] {
  const count = productImages[slug] ?? 0;
  return Array.from({ length: count }, (_, index) => ({
    src: `/catalogo/${slug}-${index + 1}`,
    alt: index === 0 ? name : `${name} — imagem ${index + 1}`,
  }));
}

function resolveDocuments(sourceSlugs: readonly string[] = []): readonly CatalogDocument[] {
  const multiple = sourceSlugs.length > 1;
  const seen = new Set<string>();
  const found: { rank: number; order: number; type: string; subject: string; href: string }[] = [];

  for (const slug of sourceSlugs) {
    for (const id of sources[slug]?.docs ?? []) {
      const doc = documents[id];
      if (!doc || seen.has(id)) continue;
      seen.add(id);
      // O catálogo geral (sem assunto) vem depois dos catálogos específicos da família.
      const generic = doc.type === "Catálogo de produtos" && doc.subject === "";
      found.push({
        rank: generic ? 0.5 : (DOC_RANK[doc.type] ?? 9),
        order: found.length,
        type: doc.type,
        subject: doc.subject,
        href: `${DOCS_BASE}${doc.path}`,
      });
    }
  }

  found.sort((a, b) => a.rank - b.rank || a.order - b.order);
  const top = found.slice(0, MAX_DOCUMENTS);

  // O assunto (ex.: "Brises") só entra no rótulo quando ajuda: catálogos, famílias com várias fontes
  // ou quando dois documentos ficariam com o mesmo nome.
  const typeCount = new Map<string, number>();
  for (const doc of top) typeCount.set(doc.type, (typeCount.get(doc.type) ?? 0) + 1);

  return top.map((doc) => {
    const showSubject =
      doc.subject !== "" && (multiple || /^(Catálogo|Folder)/.test(doc.type) || (typeCount.get(doc.type) ?? 0) > 1);
    const label = showSubject ? `${doc.type} · ${doc.subject}` : doc.type;
    return { label: label === "Catálogo de produtos" ? "Catálogo geral de produtos" : label, href: doc.href };
  });
}

function toCatalogProduct(product: ProductData): CatalogProduct {
  const { sources: sourceSlugs, ...data } = product;
  return {
    ...data,
    images: resolveImages(product.slug, product.name),
    documents: resolveDocuments(sourceSlugs),
    officialUrl: sourceSlugs?.[0] ? sources[sourceSlugs[0]]?.url : undefined,
  };
}

/** Todos os produtos, agrupados por categoria na ordem de `categories` (ordem editorial dentro de cada grupo). */
export const catalog: readonly CatalogProduct[] = rawProducts
  .map(toCatalogProduct)
  .sort((a, b) => (categoryOrder.get(a.category) ?? 0) - (categoryOrder.get(b.category) ?? 0));

export const catalogBySlug: ReadonlyMap<string, CatalogProduct> = new Map(
  catalog.map((product) => [product.slug, product])
);

/** Imagens são geradas em dois tamanhos: `sm` (cartões e miniaturas) e `lg` (visualização no modal). */
export function imageUrl(image: CatalogImage, size: "sm" | "lg"): string {
  return `${image.src}-${size}.webp`;
}
