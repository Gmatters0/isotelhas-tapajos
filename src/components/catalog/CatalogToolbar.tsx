"use client";

import { useEffect, useId, useRef, useState, type ReactNode, type RefObject } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { categories, segmentLabels, type CategoryId, type SegmentId } from "@/lib/catalog";
import {
  materialFacets,
  type CatalogFilters,
  type FacetCounts,
  type MaterialFacet,
  type SortMode,
} from "@/lib/catalog/search";
import { cn } from "@/lib/utils";

const segmentIds = Object.keys(segmentLabels) as SegmentId[];

const sortLabels: Record<SortMode, string> = {
  categoria: "Por categoria",
  nome: "Nome (A–Z)",
};

interface CatalogToolbarProps {
  filters: CatalogFilters;
  counts: FacetCounts;
  sort: SortMode;
  /** Há busca por texto: a ordenação passa a ser por relevância. */
  hasQuery: boolean;
  activeFilterCount: number;
  resultCount: number;
  searchRef: RefObject<HTMLInputElement | null>;
  onQueryChange: (query: string) => void;
  onCategoryChange: (category: CategoryId | "todas") => void;
  onToggleSegment: (segment: SegmentId) => void;
  onToggleMaterial: (material: MaterialFacet) => void;
  onSortChange: (sort: SortMode) => void;
  onClear: () => void;
}

interface ToggleProps {
  pressed: boolean;
  count?: number;
  disabled?: boolean;
  compact?: boolean;
  onClick: () => void;
  children: ReactNode;
}

function Toggle({ pressed, count, disabled, compact, onClick, children }: ToggleProps) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex shrink-0 items-center gap-2 border px-3 text-xs transition duration-200 disabled:cursor-not-allowed disabled:opacity-35",
        compact ? "py-1.5" : "py-2",
        pressed
          ? "border-white bg-white text-brand-slate"
          : "border-white/20 text-slate-300 hover:border-white/60 hover:text-white"
      )}
    >
      {children}
      {count !== undefined && (
        <span className={cn("font-mono text-[10px]", pressed ? "text-slate-500" : "text-slate-400")}>{count}</span>
      )}
    </button>
  );
}

function SortSelect({
  value,
  disabled,
  onChange,
  className,
}: {
  value: SortMode;
  disabled: boolean;
  onChange: (sort: SortMode) => void;
  className?: string;
}) {
  return (
    <label className={cn("relative", className)}>
      <span className="sr-only">Ordenar produtos</span>
      <select
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value as SortMode)}
        title={disabled ? "Com uma busca ativa, os resultados são ordenados por relevância" : undefined}
        className="h-10 w-full border border-white/20 bg-brand-slate px-3 text-xs text-slate-200 transition-colors [color-scheme:dark] hover:border-white/50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {Object.entries(sortLabels).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function CatalogToolbar({
  filters,
  counts,
  sort,
  hasQuery,
  activeFilterCount,
  resultCount,
  searchRef,
  onQueryChange,
  onCategoryChange,
  onToggleSegment,
  onToggleMaterial,
  onSortChange,
  onClear,
}: CatalogToolbarProps) {
  const [panelOpen, setPanelOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const filtersButtonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!panelOpen) return;

    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!barRef.current?.contains(event.target as Node)) setPanelOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setPanelOpen(false);
      filtersButtonRef.current?.focus();
    };

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [panelOpen]);

  return (
    <>
      <div ref={barRef} className="sticky top-20 z-30 border-y border-white/10 bg-brand-slate/95 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1600px] items-center gap-3 px-6 md:px-12">
          <div role="search" className="relative min-w-0 flex-1">
            <Search
              size={18}
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              ref={searchRef}
              type="search"
              value={filters.query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Buscar produto, material ou aplicação"
              aria-label="Buscar no catálogo"
              autoComplete="off"
              spellCheck={false}
              enterKeyHint="search"
              className="h-10 w-full appearance-none border border-white/20 bg-white/[0.06] pl-11 pr-11 text-sm text-white transition-colors placeholder:text-slate-400 hover:border-white/40 focus:border-brand-terracotta-light focus:bg-white/10 [&::-webkit-search-cancel-button]:appearance-none"
            />
            {filters.query ? (
              <button
                type="button"
                onClick={() => {
                  onQueryChange("");
                  searchRef.current?.focus();
                }}
                aria-label="Limpar busca"
                className="absolute right-1.5 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center text-slate-300 transition-colors hover:text-white"
              >
                <X size={16} aria-hidden="true" />
              </button>
            ) : (
              <kbd
                aria-hidden="true"
                className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 border border-white/20 px-1.5 py-0.5 font-mono text-[11px] leading-none text-slate-400 md:block"
              >
                /
              </kbd>
            )}
          </div>

          <SortSelect value={sort} disabled={hasQuery} onChange={onSortChange} className="hidden md:block" />

          <button
            ref={filtersButtonRef}
            type="button"
            aria-expanded={panelOpen}
            aria-controls={panelId}
            onClick={() => setPanelOpen((open) => !open)}
            className={cn(
              "inline-flex h-10 shrink-0 items-center gap-2 border px-4 font-mono text-xs tracking-widest transition duration-200",
              panelOpen
                ? "border-white bg-white text-brand-slate"
                : "border-white/20 text-white hover:border-white hover:bg-white hover:text-brand-slate"
            )}
          >
            <SlidersHorizontal size={16} aria-hidden="true" />
            <span className="hidden sm:inline">FILTROS</span>
            <span className="sr-only sm:hidden">Filtros</span>
            {activeFilterCount > 0 && (
              <span className="flex size-5 items-center justify-center bg-brand-terracotta-deep text-[10px] text-white">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        <div
          id={panelId}
          hidden={!panelOpen}
          className="absolute inset-x-0 top-full max-h-[calc(100svh-8.625rem)] overflow-y-auto border-b border-white/10 bg-brand-navy shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]"
        >
          <div className="mx-auto max-w-[1600px] px-6 py-8 md:px-12">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[1fr_1.4fr]">
              <fieldset>
                <legend className="font-mono text-[11px] tracking-widest text-slate-400">SEGMENTO</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {segmentIds.map((segment) => (
                    <Toggle
                      key={segment}
                      pressed={filters.segments.includes(segment)}
                      count={counts.segments[segment]}
                      disabled={counts.segments[segment] === 0 && !filters.segments.includes(segment)}
                      onClick={() => onToggleSegment(segment)}
                    >
                      {segmentLabels[segment]}
                    </Toggle>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="font-mono text-[11px] tracking-widest text-slate-400">MATERIAL</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {materialFacets.map((material) => (
                    <Toggle
                      key={material}
                      pressed={filters.materials.includes(material)}
                      count={counts.materials[material]}
                      disabled={counts.materials[material] === 0 && !filters.materials.includes(material)}
                      onClick={() => onToggleMaterial(material)}
                    >
                      {material}
                    </Toggle>
                  ))}
                </div>
              </fieldset>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
              <SortSelect
                value={sort}
                disabled={hasQuery}
                onChange={onSortChange}
                className="w-full sm:w-64 md:hidden"
              />
              <button
                type="button"
                onClick={onClear}
                disabled={activeFilterCount === 0 && !filters.query}
                className="font-mono text-xs tracking-widest text-slate-300 underline-offset-4 transition-colors hover:text-white hover:underline disabled:cursor-not-allowed disabled:opacity-40 disabled:no-underline"
              >
                LIMPAR TUDO
              </button>
              <button
                type="button"
                onClick={() => {
                  setPanelOpen(false);
                  filtersButtonRef.current?.focus();
                }}
                className="ml-auto inline-flex items-center justify-center bg-brand-terracotta-deep px-6 py-3 text-sm font-semibold tracking-wide text-white transition duration-200 hover:bg-brand-terracotta-deep/90 active:scale-[0.98]"
              >
                Ver {resultCount} {resultCount === 1 ? "produto" : "produtos"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-white/10 bg-brand-slate/95 backdrop-blur-md lg:sticky lg:top-[138px] lg:z-20">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div
            role="group"
            aria-label="Categorias"
            className="-mx-1 flex gap-2 overflow-x-auto px-1 py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <Toggle
              compact
              pressed={filters.category === "todas"}
              count={counts.category.todas}
              onClick={() => onCategoryChange("todas")}
            >
              Todas
            </Toggle>
            {categories.map((category) => (
              <Toggle
                key={category.id}
                compact
                pressed={filters.category === category.id}
                count={counts.category[category.id]}
                disabled={counts.category[category.id] === 0 && filters.category !== category.id}
                onClick={() => onCategoryChange(filters.category === category.id ? "todas" : category.id)}
              >
                <span className="whitespace-nowrap">{category.label}</span>
              </Toggle>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
