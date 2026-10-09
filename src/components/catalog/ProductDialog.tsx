"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileText,
  Info,
  Link2,
  MessageCircle,
  X,
} from "lucide-react";
import { categories, imageUrl, segmentLabels, type CatalogProduct } from "@/lib/catalog";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type TabId = "geral" | "versoes" | "especificacoes" | "cores" | "documentos";

interface TabDefinition {
  id: TabId;
  label: string;
  badge?: number;
}

function tabsFor(product: CatalogProduct): TabDefinition[] {
  const tabs: TabDefinition[] = [{ id: "geral", label: "Visão geral" }];
  if (product.variants?.length) tabs.push({ id: "versoes", label: "Versões", badge: product.variants.length });
  tabs.push({ id: "especificacoes", label: "Especificações" });
  if (product.colors?.length) tabs.push({ id: "cores", label: "Cores" });
  if (product.documents.length > 0 || product.officialUrl) tabs.push({ id: "documentos", label: "Documentos" });
  return tabs;
}

// ───────────────────────────── Peças de apresentação ─────────────────────────────

const eyebrowClass = "font-mono text-[11px] uppercase tracking-widest text-slate-500";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h3 className={eyebrowClass}>{title}</h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function TagList({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item} className="border border-brand-border-light bg-brand-surface px-3 py-1.5 text-xs text-slate-700">
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Células com listas ("A · B · C") quebram uma opção por linha, sem partir medidas como "5000 × 5000". */
function Cell({ value }: { value: string }) {
  const parts = value.split(" · ");
  if (parts.length === 1) return <>{value}</>;

  return (
    <>
      {parts.map((part) => (
        <span key={part} className="block whitespace-nowrap">
          {part}
        </span>
      ))}
    </>
  );
}

function Note({ children }: { children: ReactNode }) {
  return (
    <p className="flex gap-2 text-xs leading-relaxed text-slate-500">
      <Info size={14} aria-hidden="true" className="mt-0.5 shrink-0" />
      <span>{children}</span>
    </p>
  );
}

// ───────────────────────────── Galeria ─────────────────────────────

function Gallery({ product }: { product: CatalogProduct }) {
  const [index, setIndex] = useState(0);
  const image = product.images[index] ?? product.images[0];
  if (!image) return null;

  return (
    <div>
      <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
        <Image
          key={image.src}
          src={imageUrl(image, "lg")}
          alt={image.alt}
          fill
          unoptimized
          loading="eager"
          sizes="(min-width: 1024px) 42vw, 100vw"
          className="animate-fade object-cover"
        />
      </div>

      {product.images.length > 1 && (
        <ul className="mt-3 grid grid-cols-4 gap-2">
          {product.images.map((thumb, thumbIndex) => (
            <li key={thumb.src}>
              <button
                type="button"
                onClick={() => setIndex(thumbIndex)}
                aria-label={`Ver imagem ${thumbIndex + 1} de ${product.images.length}`}
                aria-current={thumbIndex === index}
                className={cn(
                  "relative block aspect-4/3 w-full overflow-hidden border-2 bg-slate-100 transition duration-200",
                  thumbIndex === index
                    ? "border-brand-terracotta-deep"
                    : "border-transparent opacity-65 hover:opacity-100"
                )}
              >
                <Image src={imageUrl(thumb, "sm")} alt="" fill unoptimized sizes="120px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Facts({ product, className }: { product: CatalogProduct; className?: string }) {
  return (
    <ul className={cn("grid gap-px border border-brand-border-light bg-brand-border-light sm:grid-cols-3", className)}>
      {product.chips.map((chip) => (
        <li key={chip} className="bg-white p-3 text-xs leading-snug text-slate-700">
          {chip}
        </li>
      ))}
    </ul>
  );
}

// ───────────────────────────── Ações ─────────────────────────────

function Actions({ product, className }: { product: CatalogProduct; className?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const quoteLink = buildWhatsAppLink(
    `Olá! Vim pelo catálogo do site da Isotelhas Tapajós e gostaria de um orçamento: ${product.name}.`
  );

  const copyLink = async () => {
    try {
      const { origin, pathname } = window.location;
      await navigator.clipboard.writeText(`${origin}${pathname}#${encodeURIComponent(product.slug)}`);
      setCopied(true);
    } catch {
      // Sem permissão de área de transferência: o endereço do navegador já contém o link do produto.
    }
  };

  return (
    <div className={cn("flex gap-3 lg:flex-col", className)}>
      <a
        href={quoteLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex flex-[3] items-center justify-center gap-2 bg-brand-terracotta-deep px-4 py-3.5 text-sm font-semibold tracking-wide text-white transition duration-200 hover:bg-brand-terracotta-deep/90 active:scale-[0.98] lg:flex-none lg:px-6"
      >
        <MessageCircle size={18} aria-hidden="true" />
        Solicitar orçamento
      </a>
      <button
        type="button"
        onClick={copyLink}
        className="inline-flex flex-[2] items-center justify-center gap-2 whitespace-nowrap border border-brand-border-light px-3 py-3.5 text-sm font-medium text-brand-slate transition duration-200 hover:border-brand-slate active:scale-[0.98] lg:flex-none lg:px-6"
      >
        {copied ? <Check size={16} aria-hidden="true" /> : <Link2 size={16} aria-hidden="true" />}
        <span aria-live="polite">{copied ? "Link copiado" : "Copiar link"}</span>
      </button>
    </div>
  );
}

// ───────────────────────────── Abas ─────────────────────────────

interface TabsProps {
  tabs: readonly TabDefinition[];
  active: TabId;
  idPrefix: string;
  onChange: (tab: TabId) => void;
}

function Tabs({ tabs, active, idPrefix, onChange }: TabsProps) {
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = tabs.length - 1;
    const next =
      event.key === "ArrowRight"
        ? index === last
          ? 0
          : index + 1
        : event.key === "ArrowLeft"
          ? index === 0
            ? last
            : index - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (next === null) return;

    event.preventDefault();
    onChange(tabs[next].id);
    buttons.current[next]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label="Seções do produto"
      className="-mx-1 flex gap-1 overflow-x-auto border-b border-brand-border-light px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {tabs.map((tab, index) => {
        const selected = tab.id === active;
        return (
          <button
            key={tab.id}
            ref={(element) => {
              buttons.current[index] = element;
            }}
            type="button"
            role="tab"
            id={`${idPrefix}-tab-${tab.id}`}
            aria-selected={selected}
            aria-controls={`${idPrefix}-painel-${tab.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={cn(
              "relative flex shrink-0 items-center gap-2 px-4 py-3 text-sm font-medium transition-colors duration-200 after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:origin-left after:bg-brand-terracotta-deep after:transition-transform after:duration-300",
              selected
                ? "text-brand-slate after:scale-x-100"
                : "text-slate-500 after:scale-x-0 hover:text-brand-slate hover:after:scale-x-50"
            )}
          >
            {tab.label}
            {tab.badge !== undefined && (
              <span className="font-mono text-[10px] text-slate-500" aria-hidden="true">
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ───────────────────────────── Painéis ─────────────────────────────

function OverviewPanel({ product }: { product: CatalogProduct }) {
  return (
    <div className="space-y-8">
      <div className="space-y-4 text-[15px] leading-relaxed text-slate-700">
        {product.description.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <Section title="Destaques">
        <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {product.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-3 text-sm leading-snug text-slate-700">
              <Check size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-brand-terracotta-deep" />
              {highlight}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Aplicações">
        <TagList items={product.applications} />
      </Section>

      <div className="grid gap-8 sm:grid-cols-2">
        <Section title="Segmentos">
          <TagList items={product.segments.map((segment) => segmentLabels[segment])} />
        </Section>
        <Section title="Materiais">
          <TagList items={product.materials} />
        </Section>
      </div>
    </div>
  );
}

function VariantsPanel({ product }: { product: CatalogProduct }) {
  return (
    <ul className="divide-y divide-brand-border-light border-y border-brand-border-light">
      {product.variants?.map((variant) => (
        <li key={variant.name} className="grid gap-1.5 py-5 sm:grid-cols-[minmax(0,13rem)_1fr] sm:gap-8">
          <h3 className="font-display text-base font-semibold leading-snug text-brand-slate">{variant.name}</h3>
          <p className="text-sm leading-relaxed text-slate-600">{variant.summary}</p>
        </li>
      ))}
    </ul>
  );
}

function SpecsPanel({ product }: { product: CatalogProduct }) {
  const { specs, tables, accessories, notes } = product;

  return (
    <div className="space-y-10">
      <dl className="divide-y divide-brand-border-light border-y border-brand-border-light">
        {specs.map(([label, value]) => (
          <div key={label} className="grid gap-1 py-3.5 sm:grid-cols-[minmax(0,12rem)_1fr] sm:gap-8">
            <dt className={cn(eyebrowClass, "pt-0.5")}>{label}</dt>
            <dd className="text-sm leading-relaxed text-brand-slate">{value}</dd>
          </div>
        ))}
      </dl>

      {tables?.map((table) => (
        <figure key={table.title}>
          <figcaption className="font-display text-base font-semibold text-brand-slate">{table.title}</figcaption>
          <div
            role="region"
            tabIndex={0}
            aria-label={`Tabela: ${table.title}`}
            className="mt-3 overflow-x-auto border border-brand-border-light"
          >
            <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
              <thead className="bg-brand-surface">
                <tr>
                  {table.columns.map((column) => (
                    <th
                      key={column}
                      scope="col"
                      className="border-b border-brand-border-light px-4 py-3 align-bottom font-mono text-[11px] font-normal uppercase leading-snug tracking-wider text-slate-500"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border-light">
                {table.rows.map((row) => (
                  <tr key={row.join("|")}>
                    {row.map((cell, cellIndex) =>
                      cellIndex === 0 ? (
                        <th
                          key={cellIndex}
                          scope="row"
                          className="whitespace-nowrap px-4 py-3 text-left align-top font-semibold text-brand-slate"
                        >
                          {cell}
                        </th>
                      ) : (
                        <td key={cellIndex} className="px-4 py-3 align-top text-slate-700">
                          <Cell value={cell} />
                        </td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {table.note && <p className="mt-2 text-xs leading-relaxed text-slate-500">{table.note}</p>}
        </figure>
      ))}

      {accessories && accessories.length > 0 && (
        <Section title="Acessórios e opcionais">
          <ul className="space-y-2 pl-5 text-sm leading-relaxed text-slate-700 marker:text-brand-terracotta-deep [list-style:square]">
            {accessories.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>
      )}

      {notes && notes.length > 0 && (
        <Section title="Observações">
          <div className="space-y-2.5">
            {notes.map((note) => (
              <Note key={note}>{note}</Note>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

function ColorsPanel({ product }: { product: CatalogProduct }) {
  return (
    <div className="space-y-8">
      {product.colors?.map((group) => (
        <section key={group.group}>
          <h3 className={eyebrowClass}>{group.group}</h3>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
            {group.items.map((swatch) => (
              <li key={swatch.name} className="flex items-center gap-3 text-sm text-slate-700">
                <span
                  aria-hidden="true"
                  className="size-8 shrink-0 rounded-full border border-black/15 shadow-inner"
                  style={{ backgroundColor: swatch.hex }}
                />
                {swatch.name}
              </li>
            ))}
          </ul>
        </section>
      ))}
      <Note>
        As cores acima são aproximações das amostras do fabricante: o resultado final varia conforme a superfície
        aplicada. Peça ao consultor o catálogo de cores ou uma amostra antes de fechar o projeto.
      </Note>
    </div>
  );
}

function DocumentsPanel({ product }: { product: CatalogProduct }) {
  const { documents, officialUrl } = product;

  return (
    <div>
      {documents.length > 0 && (
        <ul className="divide-y divide-brand-border-light border-y border-brand-border-light">
          {documents.map((document) => (
            <li key={document.href}>
              <a
                href={document.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 py-4 text-sm text-brand-slate transition-colors duration-200 hover:text-brand-terracotta-deep"
              >
                <span className="flex items-center gap-3">
                  <FileText size={18} aria-hidden="true" className="shrink-0 text-brand-terracotta-deep" />
                  {document.label}
                </span>
                <span className="flex shrink-0 items-center gap-2 font-mono text-[11px] tracking-widest text-slate-500">
                  PDF
                  <ExternalLink size={14} aria-hidden="true" />
                  <span className="sr-only">(abre em nova aba)</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}

      {officialUrl && (
        <a
          href={officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-6 inline-flex items-center gap-2 border border-brand-border-light px-5 py-3 text-sm font-medium text-brand-slate transition duration-200 hover:border-brand-slate"
        >
          Ver página do produto no site do fabricante
          <ArrowUpRight
            size={16}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      )}

      <div className="mt-6">
        <Note>Os documentos são publicados pelo fabricante e abrem em uma nova aba.</Note>
      </div>
    </div>
  );
}

// ───────────────────────────── Conteúdo do modal ─────────────────────────────

interface Position {
  index: number;
  total: number;
}

interface DialogContentProps {
  product: CatalogProduct;
  titleId: string;
  position: Position | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

const iconButtonClass =
  "flex size-10 items-center justify-center text-brand-slate transition-colors duration-200 hover:bg-brand-surface disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent";

function DialogContent({ product, titleId, position, onClose, onPrev, onNext }: DialogContentProps) {
  const [activeTab, setActiveTab] = useState<TabId>("geral");
  const idPrefix = useId();
  const tabs = tabsFor(product);
  const category = categories.find((item) => item.id === product.category);

  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-brand-border-light px-3 py-2 md:px-5">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onPrev}
            disabled={!onPrev}
            aria-label="Produto anterior"
            className={iconButtonClass}
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={!onNext}
            aria-label="Próximo produto"
            className={iconButtonClass}
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
          {position && (
            <p className="ml-2 font-mono text-xs tracking-widest text-slate-500">
              <span className="sr-only">Produto </span>
              {position.index + 1} / {position.total}
            </p>
          )}
        </div>
        <p className="hidden min-w-0 truncate font-mono text-[11px] uppercase tracking-widest text-slate-500 sm:block">
          {category?.label}
        </p>
        <button type="button" onClick={onClose} aria-label="Fechar" className={iconButtonClass}>
          <X size={20} aria-hidden="true" />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:grid-rows-1 lg:overflow-hidden">
        <aside className="border-brand-border-light bg-brand-surface p-4 md:p-6 lg:overflow-y-auto lg:overscroll-contain lg:border-r lg:p-8">
          <Gallery product={product} />

          <Facts product={product} className="mt-5 hidden lg:grid" />

          <Actions product={product} className="mt-5 hidden lg:flex" />
        </aside>

        <div className="p-5 pb-8 md:p-8 lg:overflow-y-auto lg:overscroll-contain lg:p-10">
          <p className={eyebrowClass}>{product.family}</p>
          <h2
            id={titleId}
            data-autofocus
            tabIndex={-1}
            className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-brand-slate outline-none md:text-[2.1rem]"
          >
            {product.name}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-700">{product.summary}</p>

          <Facts product={product} className="mt-6 lg:hidden" />

          <div className="mt-8">
            <Tabs tabs={tabs} active={activeTab} idPrefix={idPrefix} onChange={setActiveTab} />
            <div
              role="tabpanel"
              id={`${idPrefix}-painel-${activeTab}`}
              aria-labelledby={`${idPrefix}-tab-${activeTab}`}
              className="animate-fade pt-8"
            >
              {activeTab === "geral" && <OverviewPanel product={product} />}
              {activeTab === "versoes" && <VariantsPanel product={product} />}
              {activeTab === "especificacoes" && <SpecsPanel product={product} />}
              {activeTab === "cores" && <ColorsPanel product={product} />}
              {activeTab === "documentos" && <DocumentsPanel product={product} />}
            </div>
          </div>
        </div>
      </div>

      <div className="shrink-0 border-t border-brand-border-light bg-white p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
        <Actions product={product} />
      </div>
    </div>
  );
}

// ───────────────────────────── Modal ─────────────────────────────

interface ProductDialogProps {
  product: CatalogProduct | null;
  position: Position | null;
  /** Chamado quando o modal fecha (Esc, botão, clique fora ou botão "voltar" do sistema). */
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export function ProductDialog({ product, position, onClose, onPrev, onNext }: ProductDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pressStartedOnBackdrop = useRef(false);
  const titleId = useId();

  // Mantém o último produto montado enquanto a animação de saída roda.
  const [shown, setShown] = useState<CatalogProduct | null>(product);
  if (product && product !== shown) setShown(product);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (product && !dialog.open) {
      dialog.showModal();
      // Foco inicial no título: leitores de tela anunciam o produto e o teclado começa no topo.
      dialog.querySelector<HTMLElement>("[data-autofocus]")?.focus({ preventScroll: true });
    } else if (!product && dialog.open) {
      dialog.close();
    }
  }, [product]);

  const requestClose = () => dialogRef.current?.close();

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      // O "fundo" do <dialog> modal é o próprio elemento: clicar nele (e não em um filho) significa clicar fora.
      onMouseDown={(event) => {
        pressStartedOnBackdrop.current = event.target === event.currentTarget;
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget && pressStartedOnBackdrop.current) requestClose();
      }}
      className="catalog-dialog on-light m-auto h-dvh max-h-none w-screen max-w-none overflow-hidden bg-white p-0 text-brand-slate shadow-[0_40px_90px_-30px_rgba(0,0,0,0.65)] md:h-[min(92dvh,54rem)] md:w-[min(94vw,76rem)]"
    >
      {shown && (
        <DialogContent
          key={shown.slug}
          product={shown}
          titleId={titleId}
          position={position}
          onClose={requestClose}
          onPrev={onPrev}
          onNext={onNext}
        />
      )}
    </dialog>
  );
}
