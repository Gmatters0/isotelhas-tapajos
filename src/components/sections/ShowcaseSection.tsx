"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/products";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

export function ShowcaseSection() {
  const [activeId, setActiveId] = useState(products[0].id);

  return (
    <section
      id="solucoes"
      aria-labelledby="solucoes-titulo"
      className="scroll-mt-24 bg-brand-slate text-white"
    >
      <h2 id="solucoes-titulo" className="sr-only">
        Nossas soluções
      </h2>

      <div className="grid md:grid-cols-2">
        <Reveal
          direction="left"
          className="relative h-[50vh] overflow-hidden border-b border-brand-border md:h-auto md:min-h-160 md:border-b-0 md:border-r"
        >
          {products.map(({ id, image }) => (
            <Image
              key={id}
              src={image.src}
              alt={image.alt}
              aria-hidden={id !== activeId}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className={cn(
                "object-cover transition-opacity duration-700 ease-in-out",
                id === activeId ? "opacity-100" : "opacity-0"
              )}
            />
          ))}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-linear-to-t from-brand-slate/50 via-transparent to-transparent" />
        </Reveal>

        <Reveal direction="right" className="flex flex-col justify-center px-6 py-16 md:px-16 md:py-0">
          <ul className="mx-auto w-full max-w-xl">
            {products.map((product) => {
              const isActive = product.id === activeId;
              const dim = isActive ? "opacity-100" : "opacity-60 group-hover:opacity-90";

              return (
                <li
                  key={product.id}
                  id={product.id === "kingwall" ? "kingwall" : undefined}
                  className="group relative scroll-mt-24 border-b border-brand-border"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 bg-brand-terracotta transition-transform duration-300",
                      isActive && "scale-y-100"
                    )}
                  />
                  <div className="py-6 pl-6">
                    <h3>
                      <button
                        type="button"
                        aria-pressed={isActive}
                        onMouseEnter={() => setActiveId(product.id)}
                        onFocus={() => setActiveId(product.id)}
                        onClick={() => setActiveId(product.id)}
                        className="text-left after:absolute after:inset-0 after:cursor-pointer"
                      >
                        <span
                          aria-hidden="true"
                          className="block font-mono text-sm text-brand-terracotta-light"
                        >
                          {product.index}
                        </span>
                        <span
                          className={cn(
                            "mt-1 block font-display text-xl font-semibold tracking-tight transition-opacity duration-300 md:text-2xl",
                            dim
                          )}
                        >
                          {product.name}
                        </span>
                      </button>
                    </h3>
                    <p
                      className={cn(
                        "mt-2 max-w-md overflow-hidden text-sm text-slate-300 transition-[max-height,opacity] duration-300 md:max-h-24",
                        isActive
                          ? "max-h-24 opacity-100"
                          : "max-h-0 opacity-0 md:opacity-60 md:group-hover:opacity-90"
                      )}
                    >
                      {product.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          <Link
            href="/catalogo"
            className="group mx-auto mt-8 inline-flex w-full max-w-xl items-center gap-2 pl-6 font-mono text-xs tracking-widest text-brand-terracotta-light transition-colors duration-200 hover:text-white"
          >
            VER CATÁLOGO COMPLETO
            <ArrowRight size={14} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
