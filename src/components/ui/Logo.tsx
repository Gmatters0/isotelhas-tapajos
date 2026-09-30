export function Logo() {
  return (
    <a
      href="#top"
      className="inline-flex items-center gap-3 transition-opacity duration-200 hover:opacity-80"
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M2 21 L14 6 L26 21"
          stroke="#C35A38"
          strokeWidth="2.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <path
          d="M8 21 L14 13 L20 21"
          stroke="#fff"
          strokeWidth="2.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>
      <span className="font-display leading-none">
        <span className="block text-sm font-bold tracking-tight text-white">ISOTELHAS</span>{" "}
        <span className="block text-[10px] font-medium tracking-[0.3em] text-slate-400">TAPAJÓS</span>
      </span>
    </a>
  );
}
