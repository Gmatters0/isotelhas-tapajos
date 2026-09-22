import { cn } from "@/lib/utils";

const MODULES = 7;
const MODULE_WIDTH = 10;
const HEIGHT = 16;
const TOTAL_WIDTH = MODULES * MODULE_WIDTH;

function buildInterlockLine(modules: number, moduleWidth: number, height: number): string {
  const plateau = moduleWidth * 0.3;
  const rise = moduleWidth * 0.2;
  let d = "M0,0";

  for (let i = 0; i < modules; i++) {
    const x0 = i * moduleWidth;
    d += ` L${x0 + plateau},0`;
    d += ` L${x0 + plateau + rise},${height}`;
    d += ` L${x0 + plateau + rise + plateau},${height}`;
    d += ` L${x0 + moduleWidth},0`;
  }

  return d;
}

const LINE_PATH = buildInterlockLine(MODULES, MODULE_WIDTH, HEIGHT);
const FILL_PATH = `${LINE_PATH} L${TOTAL_WIDTH},${HEIGHT} L0,${HEIGHT} Z`;

interface SectionDividerProps {
  className?: string;
  /** Cor de fundo do bloco — deve casar com a seção logo acima do divisor. */
  bgClassName?: string;
  /** Cor de preenchimento das "abas" trapezoidais — deve casar com a seção logo abaixo. */
  fillClassName?: string;
}

export function SectionDivider({
  className,
  bgClassName = "bg-brand-slate",
  fillClassName = "fill-brand-surface",
}: SectionDividerProps) {
  return (
    <div
      className={cn("relative h-12 w-full overflow-hidden md:h-20", bgClassName, className)}
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${TOTAL_WIDTH} ${HEIGHT}`}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={FILL_PATH} className={fillClassName} />
        <path
          d={LINE_PATH}
          className="stroke-brand-terracotta"
          strokeWidth={0.5}
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
