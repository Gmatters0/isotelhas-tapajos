"use client";

interface LoaderParams {
  src: string;
  width: number;
  quality?: number;
}

// Export estático não tem otimizador de imagens; delegamos o redimensionamento ao CDN do Unsplash.
export default function unsplashLoader({ src, width, quality }: LoaderParams): string {
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 75));
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "crop");
  return url.toString();
}
