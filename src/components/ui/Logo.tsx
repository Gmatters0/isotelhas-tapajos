import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** "horizontal" para a navbar; "stacked" (símbolo sobre o nome) para o rodapé. */
  variant?: "horizontal" | "stacked";
  className?: string;
}

// Versões claras da marca, pensadas para os fundos escuros do site.
const sources = {
  horizontal: { src: "/brand/logo-horizontal-light.png", width: 1378, height: 186 },
  stacked: { src: "/brand/logo-stacked-light.png", width: 1386, height: 422 },
} as const;

export function Logo({ variant = "horizontal", className }: LogoProps) {
  const { src, width, height } = sources[variant];

  return (
    <Link
      href="/"
      aria-label="Isotelhas Tapajós — página inicial"
      className="inline-flex transition-opacity duration-200 hover:opacity-80"
    >
      <Image
        src={src}
        alt="Isotelhas Tapajós · Tecnologia em Coberturas"
        width={width}
        height={height}
        unoptimized
        loading="eager"
        className={cn(variant === "horizontal" ? "h-9 w-auto md:h-11" : "h-24 w-auto", className)}
      />
    </Link>
  );
}
