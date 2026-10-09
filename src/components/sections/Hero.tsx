import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/images";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-titulo"
      className="relative flex min-h-svh flex-col justify-end overflow-hidden bg-brand-slate text-white"
    >
      <Image
        src={images.hero.src}
        alt={images.hero.alt}
        fill
        loading="eager"
        fetchPriority="high"
        sizes="100vw"
        className="object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-brand-slate via-brand-slate/55 to-brand-slate/10" />
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-r from-brand-slate/50 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-between px-6 pb-12 pt-32 md:px-12 md:pb-16">
        <div className="flex animate-enter items-center gap-3">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-terracotta" />
          <p className="font-mono text-[11px] tracking-[0.2em] text-slate-300">
            REPRESENTANTE AUTORIZADO • TECNOLOGIA EM COBERTURAS
          </p>
        </div>

        <div className="mt-auto grid gap-10 md:grid-cols-2 md:items-end md:gap-6">
          <h1
            id="hero-titulo"
            className="animate-enter font-display text-[clamp(2.5rem,6.5vw,5.5rem)] font-semibold leading-[1.03] tracking-tight [animation-delay:120ms]"
          >
            Engenharia e Conforto Térmico para o Clima do Tapajós.
          </h1>

          <div className="animate-enter [animation-delay:280ms] md:pl-6">
            <p className="max-w-md text-sm leading-relaxed text-slate-300 md:text-base">
              Proteção real contra o calor amazônico e o ruído das chuvas torrenciais, com sistemas
              termoacústicos de padrão global aplicados à realidade do Tapajós.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/catalogo"
                className="inline-flex items-center justify-center border border-white/25 px-6 py-3 text-sm font-medium tracking-wide text-white transition duration-200 hover:border-white hover:bg-white hover:text-brand-slate active:scale-[0.98]"
              >
                Explorar Catálogo
              </Link>
              <a
                href="#orcamento"
                className="inline-flex items-center justify-center bg-brand-terracotta-deep px-6 py-3 text-sm font-semibold tracking-wide text-white transition duration-200 hover:bg-brand-terracotta-deep/90 active:scale-[0.98]"
              >
                Orçamento Rápido
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
