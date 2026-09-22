import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-end overflow-hidden bg-brand-slate text-white">
      <Image
        src="https://images.unsplash.com/photo-1733003538511-4a2c0a42d9c6?w=2400&auto=format&fit=crop&q=80"
        alt="Chalé contemporâneo com cobertura metálica termoacústica em estilo A-Frame"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-slate via-brand-slate/55 to-brand-slate/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-slate/50 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-between px-6 pb-12 pt-32 md:px-12 md:pb-16">
        <Reveal direction="down">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-terracotta" />
            <p className="font-mono text-[11px] tracking-[0.2em] text-slate-300">
              REPRESENTANTE AUTORIZADO • TECNOLOGIA EM COBERTURAS
            </p>
          </div>
        </Reveal>

        <div className="mt-auto grid gap-10 md:grid-cols-2 md:items-end md:gap-6">
          <Reveal delay={120}>
            <h1 className="font-display text-[clamp(2.5rem,6.5vw,5.5rem)] font-semibold leading-[1.03] tracking-tight">
              Engenharia e Conforto Térmico para o Clima do Tapajós.
            </h1>
          </Reveal>

          <Reveal delay={280} className="md:pl-6">
            <p className="max-w-md text-sm leading-relaxed text-slate-300 md:text-base">
              Proteção real contra o calor amazônico e o ruído das chuvas torrenciais, com sistemas
              termoacústicos de padrão global aplicados à realidade do Tapajós.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#solucoes"
                className="inline-flex items-center justify-center border border-white/25 px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:border-white hover:bg-white hover:text-brand-slate"
              >
                Explorar Catálogo
              </a>
              <a
                href="#orcamento"
                className="inline-flex items-center justify-center bg-brand-terracotta px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-brand-terracotta/90"
              >
                Orçamento Rápido
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
