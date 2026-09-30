import Image from "next/image";
import { images } from "@/lib/images";
import { siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/ui/Reveal";

export function ShowroomSection() {
  return (
    <section
      id="showroom"
      aria-labelledby="showroom-titulo"
      className="scroll-mt-24 bg-brand-navy text-white"
    >
      <div className="mx-auto grid max-w-[1600px] gap-12 px-6 py-24 md:grid-cols-2 md:gap-16 md:px-12 md:py-32">
        <Reveal
          direction="left"
          className="relative aspect-[4/3] overflow-hidden border border-brand-border md:aspect-auto md:min-h-120"
        >
          <Image
            src={images.showroom.src}
            alt={images.showroom.alt}
            fill
            sizes="(min-width: 1600px) 800px, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </Reveal>

        <Reveal direction="right" delay={120} className="flex flex-col justify-center">
          <p className="font-mono text-xs tracking-widest text-brand-terracotta-light">
            SHOWROOM &amp; ATENDIMENTO
          </p>
          <h2
            id="showroom-titulo"
            className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl"
          >
            Consultoria técnica com presença física no Tapajós.
          </h2>
          <p className="mt-6 max-w-lg text-slate-300">
            Fornecemos os materiais, damos suporte técnico para arquitetos e engenheiros e indicamos
            instaladores capacitados para garantir a execução correta do seu projeto em Santarém e
            região.
          </p>

          <address className="mt-8 border-t border-brand-border pt-6 not-italic">
            <p className="font-mono text-xs tracking-widest text-slate-400">ENDEREÇO</p>
            <p className="mt-2 text-white">{siteConfig.address.line}</p>
            <p className="text-slate-300">{siteConfig.address.city}</p>
          </address>
        </Reveal>
      </div>
    </section>
  );
}
