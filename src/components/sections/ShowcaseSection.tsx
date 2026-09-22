"use client";

import { useState } from "react";
import Image from "next/image";
import { products } from "@/lib/products";
import { cn } from "@/lib/utils";

export function ShowcaseSection() {
  const [activeId, setActiveId] = useState(products[0].id);
  const active = products.find((product) => product.id === activeId) ?? products[0];

  return (
    <section id="solucoes" className="scroll-mt-24 bg-brand-slate text-white">
      <div className="grid md:grid-cols-2">
        <div className="relative h-[50vh] overflow-hidden border-b border-brand-border md:h-auto md:min-h-[640px] md:border-b-0 md:border-r">
          {products.map((product) => (
            <Image
              key={product.id}
              src={product.image}
              alt={product.imageAlt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className={cn(
                "object-cover transition-opacity duration-700 ease-in-out",
                product.id === active.id ? "opacity-100" : "opacity-0"
              )}
            />
          ))}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-slate/50 via-transparent to-transparent" />
        </div>

        <div className="flex flex-col justify-center px-6 py-16 md:px-16 md:py-0">
          <ul className="mx-auto w-full max-w-xl">
            {products.map((product) => {
              const isActive = product.id === active.id;
              return (
                <li key={product.id} id={product.id === "kingwall" ? "kingwall" : undefined} className="scroll-mt-24">
                  <button
                    type="button"
                    onMouseEnter={() => setActiveId(product.id)}
                    onFocus={() => setActiveId(product.id)}
                    onClick={() => setActiveId(product.id)}
                    aria-pressed={isActive}
                    className="group relative w-full border-b border-brand-border py-6 text-left"
                  >
                    <span
                      className={cn(
                        "absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-brand-terracotta transition-transform duration-300",
                        isActive && "scale-y-100"
                      )}
                      aria-hidden="true"
                    />
                    <div
                      className={cn(
                        "pl-6 transition-opacity duration-300",
                        isActive ? "opacity-100" : "opacity-40 group-hover:opacity-70"
                      )}
                    >
                      <span className="font-mono text-sm text-brand-terracotta">{product.index}</span>
                      <h3 className="mt-1 font-display text-xl font-semibold tracking-tight md:text-2xl">
                        {product.name}
                      </h3>
                      <p
                        className={cn(
                          "mt-2 max-w-md overflow-hidden text-sm text-slate-400 transition-all duration-300 md:max-h-24 md:opacity-100",
                          isActive ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
                        )}
                      >
                        {product.description}
                      </p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
