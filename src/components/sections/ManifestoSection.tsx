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
    <section id="diferenciais" className="scroll-mt-24 bg-brand-surface text-brand-slate">
      <SectionDivider />

      <div className="mx-auto max-w-4xl px-6 py-24 md:px-12 md:py-36">
        <ScrollScrubText
          text={MANIFESTO_TEXT}
          className="font-display text-2xl font-medium leading-snug tracking-tight text-brand-navy md:text-4xl"
        />
      </div>

      <div className="border-t border-brand-border-light">
        <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-12 md:py-20">
          <Reveal>
            <div className="mb-10 flex items-center gap-3 md:mb-14">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-terracotta" />
              <p className="font-mono text-[11px] tracking-[0.2em] text-slate-500">
                DIFERENCIAIS TÉCNICOS
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-5">
            {indicators.map((item, i) => (
              <Reveal key={item.value} delay={i * 100}>
                <div className="h-full border border-brand-border-light bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-md md:p-9">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center border border-brand-terracotta/30 bg-brand-terracotta/10 text-brand-terracotta">
                      <item.icon size={22} strokeWidth={1.75} />
                    </div>
                    <span className="font-mono text-[11px] tracking-widest text-slate-400">{`0${i + 1}`}</span>
                  </div>
                  <p className="mt-6 font-display text-2xl font-bold tracking-tight text-brand-navy md:text-3xl">
                    {item.value}
                  </p>
                  <p className="mt-2 text-sm text-slate-600">{item.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
