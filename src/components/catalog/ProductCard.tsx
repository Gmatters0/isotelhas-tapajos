import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { imageUrl, type CatalogProduct } from "@/lib/catalog";

interface ProductCardProps {
  product: CatalogProduct;
  onOpen: (slug: string) => void;
  /** Primeiros cartões da página: carregam a imagem sem esperar a rolagem. */
  priority?: boolean;
}

export function ProductCard({ product, onOpen, priority = false }: ProductCardProps) {
  const { slug, name, family, summary, chips, images } = product;
  const cover = images[0];

  return (
    <article
      id={slug}
      className="group relative flex h-full scroll-mt-48 flex-col border border-brand-border-light bg-white transition duration-300 hover:-translate-y-0.5 hover:border-brand-terracotta hover:shadow-[0_22px_40px_-26px_rgba(10,17,24,0.5)] has-[button:focus-visible]:outline-2 has-[button:focus-visible]:outline-offset-2 has-[button:focus-visible]:outline-brand-terracotta-deep"
    >
      <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
        {cover && (
          <Image
            src={imageUrl(cover, "sm")}
            alt=""
            fill
            unoptimized
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            sizes="(min-width: 1600px) 370px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500">{family}</p>
        <h3 className="mt-2 font-display text-lg font-semibold leading-snug tracking-tight text-brand-slate">
          <button
            type="button"
            onClick={() => onOpen(slug)}
            className="text-left outline-none after:absolute after:inset-0 after:cursor-pointer"
          >
            {name}
          </button>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">{summary}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Destaques">
          {chips.map((chip) => (
            <li
              key={chip}
              className="border border-brand-border-light px-2 py-1 text-[11px] leading-none text-slate-600"
            >
              {chip}
            </li>
          ))}
        </ul>

        <span
          aria-hidden="true"
          className="mt-auto inline-flex items-center gap-1.5 pt-5 font-mono text-[11px] tracking-widest text-brand-terracotta-deep"
        >
          VER DETALHES
          <ArrowUpRight
            size={14}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </article>
  );
}
