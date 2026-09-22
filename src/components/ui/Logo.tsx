import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
}

export function Logo({ className, variant = "light" }: LogoProps) {
  const isLight = variant === "light";

  return (
    <a
      href="#top"
      className={cn("group inline-flex items-center gap-3", className)}
      aria-label="Isotelhas Tapajós — página inicial"
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
          stroke="currentColor"
          className={isLight ? "text-white" : "text-brand-slate"}
          strokeWidth="2.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>
      <span className="font-display leading-none">
        <span
          className={cn(
            "block text-sm font-bold tracking-tight",
            isLight ? "text-white" : "text-brand-slate"
          )}
        >
          ISOTELHAS
        </span>
        <span
          className={cn(
            "block text-[10px] font-medium tracking-[0.3em]",
            isLight ? "text-slate-400" : "text-slate-500"
          )}
        >
          TAPAJÓS
        </span>
      </span>
    </a>
  );
}
