"use client";

import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";
import { catalog, catalogBySlug, categories, segmentLabels, type CategoryId, type SegmentId } from "@/lib/catalog";
import {
  buildIndex,
  countActiveFilters,
  emptyFilters,
  facetCounts,
  groupByCategory,
  searchEntries,
  sortResults,
  type CatalogFilters,
  type MaterialFacet,
  type SortMode,
} from "@/lib/catalog/search";
import { EmptyState } from "./EmptyState";
import { CatalogToolbar } from "./CatalogToolbar";
import { ProductCard } from "./ProductCard";
import { ProductDialog } from "./ProductDialog";
import { useProductHash } from "./use-product-hash";

const gridClass = "grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4";

function toggleItem<T>(list: readonly T[], item: T): T[] {
  return list.includes(item) ? list.filter((current) => current !== item) : [...list, item];
}

function pluralize(count: number): string {
  return `${count} ${count === 1 ? "produto" : "produtos"}`;
}

interface ActiveFilter {
  key: string;
  label: string;
  remove: () => void;
}

export function CatalogBrowser() {
  const [filters, setFilters] = useState<CatalogFilters>(emptyFilters);
  const [sort, setSort] = useState<SortMode>("categoria");
  const searchRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const { slug, open, close } = useProductHash();

  const entries = useMemo(() => buildIndex(catalog), []);
  const deferredQuery = useDeferredValue(filters.query);
  const hasQuery = deferredQuery.trim() !== "";
  const effectiveFilters = useMemo(() => ({ ...filters, query: deferredQuery }), [filters, deferredQuery]);

  const results = useMemo(() => searchEntries(entries, effectiveFilters), [entries, effectiveFilters]);
  const products = useMemo(() => sortResults(results, sort, hasQuery), [results, sort, hasQuery]);
  const counts = useMemo(() => facetCounts(entries, effectiveFilters), [entries, effectiveFilters]);
  const grouped = !hasQuery && sort === "categoria";
  const groups = useMemo(() => (grouped ? groupByCategory(products) : []), [grouped, products]);
  const rankBySlug = useMemo(() => new Map(products.map((product, index) => [product.slug, index])), [products]);
  const activeFilterCount = countActiveFilters(filters);

  // Atalho "/" foca a busca (como em sites de documentação).
  useEffect(() => {
    const focusSearchOnSlash = (event: KeyboardEvent) => {
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey) return;
      if ((event.target as HTMLElement | null)?.closest("input, textarea, select, [contenteditable], dialog")) return;
      event.preventDefault();
      searchRef.current?.focus();
      searchRef.current?.select();
    };
    window.addEventListener("keydown", focusSearchOnSlash);
    return () => window.removeEventListener("keydown", focusSearchOnSlash);
  }, []);

  const update = (patch: Partial<CatalogFilters>) => setFilters((current) => ({ ...current, ...patch }));

  // Ao mudar o recorte com a página rolada, volta para o início dos resultados.
  const revealResults = () => {
    window.requestAnimationFrame(() => {
      const element = resultsRef.current;
      if (element && element.getBoundingClientRect().top < 0) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  };

  const clearAll = () => {
    setFilters(emptyFilters);
    setSort("categoria");
  };

  const activeFilters: ActiveFilter[] = [
    ...(filters.category !== "todas"
      ? [
          {
            key: "category",
            label: categories.find((category) => category.id === filters.category)?.label ?? filters.category,
            remove: () => update({ category: "todas" }),
          },
        ]
      : []),
    ...filters.segments.map((segment) => ({
      key: `segment-${segment}`,
      label: segmentLabels[segment],
      remove: () => update({ segments: toggleItem(filters.segments, segment) }),
    })),
    ...filters.materials.map((material) => ({
      key: `material-${material}`,
      label: material,
      remove: () => update({ materials: toggleItem(filters.materials, material) }),
    })),
  ];

  // Modal: o produto aberto vem do hash da URL; "anterior/próximo" seguem a ordem exibida na tela.
  const activeProduct = slug ? (catalogBySlug.get(slug) ?? null) : null;
  const activeIndex = activeProduct ? products.findIndex((product) => product.slug === activeProduct.slug) : -1;
  const previous = activeIndex > 0 ? products[activeIndex - 1] : undefined;
  const next = activeIndex >= 0 ? products[activeIndex + 1] : undefined;

  const renderGrid = (items: typeof products) => (
    <ul className={gridClass}>
      {items.map((product) => (
        <li key={product.slug}>
          <ProductCard product={product} onOpen={open} priority={(rankBySlug.get(product.slug) ?? 99) < 3} />
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <CatalogToolbar
        filters={filters}
        counts={counts}
        sort={sort}
        hasQuery={hasQuery}
        activeFilterCount={activeFilterCount}
        resultCount={products.length}
        searchRef={searchRef}
        onQueryChange={(query) => update({ query })}
        onCategoryChange={(category: CategoryId | "todas") => {
          update({ category });
          revealResults();
        }}
        onToggleSegment={(segment: SegmentId) => update({ segments: toggleItem(filters.segments, segment) })}
        onToggleMaterial={(material: MaterialFacet) => update({ materials: toggleItem(filters.materials, material) })}
        onSortChange={setSort}
        onClear={clearAll}
      />

      <section
        ref={resultsRef}
        aria-label="Resultados do catálogo"
        className="on-light scroll-mt-36 bg-brand-surface lg:scroll-mt-52"
      >
        <div className="mx-auto max-w-[1600px] px-6 py-10 md:px-12 md:py-14">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
            <p role="status" aria-live="polite" className="text-sm text-slate-600">
              <span className="font-mono text-xs tracking-widest text-brand-slate">
                {pluralize(products.length).toUpperCase()}
              </span>
              {hasQuery && (
                <>
                  {" "}
                  para <span className="font-medium text-brand-slate">“{deferredQuery.trim()}”</span>
                </>
              )}
            </p>

            {(activeFilters.length > 0 || filters.query) && (
              <ul className="flex flex-wrap items-center gap-2" aria-label="Filtros ativos">
                {activeFilters.map((filter) => (
                  <li key={filter.key}>
                    <button
                      type="button"
                      onClick={filter.remove}
                      aria-label={`Remover filtro ${filter.label}`}
                      className="inline-flex items-center gap-1.5 border border-brand-border-light bg-white px-3 py-1.5 text-xs text-slate-700 transition duration-200 hover:border-brand-slate"
                    >
                      {filter.label}
                      <X size={12} aria-hidden="true" />
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    onClick={clearAll}
                    className="px-2 py-1.5 font-mono text-[11px] tracking-widest text-brand-terracotta-deep underline-offset-4 transition-colors hover:underline"
                  >
                    LIMPAR TUDO
                  </button>
                </li>
              </ul>
            )}
          </div>

          {products.length === 0 ? (
            <EmptyState onClear={clearAll} onSuggest={(term) => update({ query: term })} />
          ) : grouped ? (
            <div className="space-y-16">
              {groups.map(({ category, products: items }) => (
                <section
                  key={category.id}
                  aria-labelledby={`categoria-${category.id}`}
                  className="border-t border-brand-border-light pt-10 first:border-t-0 first:pt-0"
                >
                  <header className="mb-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
                    <div>
                      <p className="font-mono text-xs tracking-widest text-brand-terracotta-deep">
                        {String(categories.findIndex((item) => item.id === category.id) + 1).padStart(2, "0")}
                      </p>
                      <h2
                        id={`categoria-${category.id}`}
                        className="mt-1 font-display text-2xl font-semibold tracking-tight text-brand-slate md:text-3xl"
                      >
                        {category.label}
                      </h2>
                      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">{category.description}</p>
                    </div>
                    <p className="font-mono text-xs tracking-widest text-slate-500">
                      {pluralize(items.length).toUpperCase()}
                    </p>
                  </header>
                  {renderGrid(items)}
                </section>
              ))}
            </div>
          ) : (
            renderGrid(products)
          )}
        </div>
      </section>

      <ProductDialog
        product={activeProduct}
        position={activeIndex >= 0 ? { index: activeIndex, total: products.length } : null}
        onClose={close}
        onPrev={previous ? () => open(previous.slug) : undefined}
        onNext={next ? () => open(next.slug) : undefined}
      />
    </>
  );
}
