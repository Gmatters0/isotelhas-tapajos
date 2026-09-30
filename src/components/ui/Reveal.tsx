"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Atraso em ms antes de iniciar a animação, útil para escalonar listas. */
  delay?: number;
  direction?: "up" | "left" | "right";
}

// Um único listener compartilhado. Revela tudo que já passou da linha de revelação,
// inclusive blocos "pulados" por rolagem rápida ou âncoras (um IntersectionObserver os perderia).
const REVEAL_OFFSET = 60;
const pending = new Set<HTMLElement>();
let frame = 0;

function revealVisible() {
  frame = 0;
  const limit = window.innerHeight - REVEAL_OFFSET;

  for (const el of pending) {
    if (el.getBoundingClientRect().top < limit) {
      el.dataset.reveal = "shown";
      pending.delete(el);
    }
  }

  if (pending.size === 0) stopListening();
}

function onViewportChange() {
  if (!frame) frame = requestAnimationFrame(revealVisible);
}

function stopListening() {
  window.removeEventListener("scroll", onViewportChange);
  window.removeEventListener("resize", onViewportChange);
}

function watch(el: HTMLElement) {
  pending.add(el);
  window.addEventListener("scroll", onViewportChange, { passive: true });
  window.addEventListener("resize", onViewportChange, { passive: true });
}

function unwatch(el: HTMLElement) {
  pending.delete(el);
  if (pending.size === 0) stopListening();
}

export function Reveal({ children, className, delay = 0, direction = "up" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Já na tela (ou acima dela) no carregamento: não esconde, evitando "piscar".
    if (!el.dataset.reveal) {
      if (el.getBoundingClientRect().top < window.innerHeight) return;
      el.dataset.reveal = "hidden";
    }

    watch(el);
    return () => unwatch(el);
  }, []);

  return (
    <div
      ref={ref}
      data-direction={direction}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
      className={cn("reveal", className)}
    >
      {children}
    </div>
  );
}
