import { Thermometer, VolumeX, Layers, MapPin, type LucideIcon } from "lucide-react";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { ScrollScrubText } from "@/components/ui/ScrollScrubText";
import { Reveal } from "@/components/ui/Reveal";

interface Indicator {
  icon: LucideIcon;
  value: string;
  label: string;
}

const indicators: Indicator[] = [
  { icon: Thermometer, value: "Até -80%", label: "Redução de radiação térmica direta" },
  { icon: VolumeX, value: "Amortecimento Acústico", label: "Silêncio estrutural sob tempestades" },
  {
    icon: Layers,
    value: "Construção Inteligente",
    label: "Sistemas a seco com zero desperdício de cimento",
  },
  {
    icon: MapPin,
    value: "Showroom Santarém",
    label: "Consultoria técnica e estoque regional na Av. Mendonça Furtado",
  },
];

const MANIFESTO_TEXT =
  "O calor amazônico e o ruído da chuva não precisam comprometer o bem-estar do seu espaço. Combinamos engenharia termoacústica de padrão global com a realidade do Tapajós.";

export function ManifestoSection() {
  return (
    <section
      id="diferenciais"
      aria-labelledby="diferenciais-titulo"
      className="scroll-mt-24 bg-brand-surface text-brand-slate"
    >
      <SectionDivider />

      <div className="mx-auto max-w-4xl px-6 py-24 md:px-12 md:py-36">
        <ScrollScrubText
          text={MANIFESTO_TEXT}
          className="font-display text-2xl font-medium leading-snug tracking-tight text-brand-navy md:text-4xl"
        />
      </div>

      <div className="border-t border-brand-border-light">
        <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-12 md:py-20">
          <Reveal className="mb-10 flex items-center gap-3 md:mb-14">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-terracotta" />
            <h2
              id="diferenciais-titulo"
              className="font-mono text-[11px] font-normal tracking-[0.2em] text-slate-600"
            >
              DIFERENCIAIS TÉCNICOS
            </h2>
          </Reveal>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-5">
            {indicators.map((item, i) => (
              <li key={item.value}>
                <Reveal delay={i * 100} className="h-full">
                  <div className="h-full border border-brand-border-light bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand-terracotta/40 hover:shadow-lg md:p-9">
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center border border-brand-terracotta/30 bg-brand-terracotta/10 text-brand-terracotta-deep">
                        <item.icon size={22} strokeWidth={1.75} aria-hidden="true" />
                      </div>
                      <span className="font-mono text-[11px] tracking-widest text-slate-500">{`0${i + 1}`}</span>
                    </div>
                    <h3 className="mt-6 font-display text-2xl font-bold tracking-tight text-brand-navy md:text-3xl">
                      {item.value}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">{item.label}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
