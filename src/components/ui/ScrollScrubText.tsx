"use client";

import { Fragment, useEffect, useRef } from "react";

// Opacidade mínima das palavras ainda "não lidas": mantém contraste >= 3:1 (WCAG AA, texto grande).
const MIN_OPACITY = 0.55;
// Janela do efeito: começa quando o topo do parágrafo cruza 85% da tela e termina em 20%.
const START = 0.85;
const END = 0.2;

interface ScrollScrubTextProps {
  text: string;
  className?: string;
}

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function ScrollScrubText({ text, className }: ScrollScrubTextProps) {
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const paragraph = paragraphRef.current;
    if (!paragraph) return;

    const spans = Array.from(paragraph.querySelectorAll<HTMLElement>("[data-word]"));
    let frame = 0;

    const update = () => {
      frame = 0;
      const viewport = window.innerHeight;
      const top = paragraph.getBoundingClientRect().top;
      const progress = clamp((viewport * START - top) / (viewport * (START - END)));

      spans.forEach((span, i) => {
        const wordProgress = clamp(progress * spans.length - i);
        span.style.opacity = String(MIN_OPACITY + (1 - MIN_OPACITY) * wordProgress);
      });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <p ref={paragraphRef} className={className}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span data-word className="inline-block motion-reduce:opacity-100!">
            {word}
          </span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </p>
  );
}
