// Borda em "encaixe" trapezoidal (macho/fêmea): MODULES abas de largura MODULE_WIDTH e altura HEIGHT.
const MODULES = 7;
const MODULE_WIDTH = 10;
const HEIGHT = 16;
const TOTAL_WIDTH = MODULES * MODULE_WIDTH;

function buildInterlockLine(): string {
  const plateau = MODULE_WIDTH * 0.3;
  const rise = MODULE_WIDTH * 0.2;
  let d = "M0,0";

  for (let i = 0; i < MODULES; i++) {
    const x0 = i * MODULE_WIDTH;
    d += ` L${x0 + plateau},0`;
    d += ` L${x0 + plateau + rise},${HEIGHT}`;
    d += ` L${x0 + plateau + rise + plateau},${HEIGHT}`;
    d += ` L${x0 + MODULE_WIDTH},0`;
  }

  return d;
}

const LINE_PATH = buildInterlockLine();
const FILL_PATH = `${LINE_PATH} L${TOTAL_WIDTH},${HEIGHT} L0,${HEIGHT} Z`;

/** Transição da seção escura (hero) para a clara (manifesto). */
export function SectionDivider() {
  return (
    <div className="relative h-12 w-full overflow-hidden bg-brand-slate md:h-20" aria-hidden="true">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${TOTAL_WIDTH} ${HEIGHT}`}
        preserveAspectRatio="none"
      >
        <path d={FILL_PATH} className="fill-brand-surface" />
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
