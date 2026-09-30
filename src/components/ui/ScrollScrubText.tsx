"use client";

import { Fragment, useRef } from "react";
import { useScroll, useTransform, type MotionValue } from "framer-motion";
import * as m from "framer-motion/m";

// Opacidade mínima das palavras ainda "não lidas": mantém contraste >= 3:1 (WCAG AA, texto grande).
const MIN_OPACITY = 0.55;

interface ScrollScrubTextProps {
  text: string;
  className?: string;
}

interface ScrubWordProps {
  word: string;
  start: number;
  end: number;
  progress: MotionValue<number>;
}

function ScrubWord({ word, start, end, progress }: ScrubWordProps) {
  const opacity = useTransform(progress, [start, end], [MIN_OPACITY, 1]);

  return (
    <m.span style={{ opacity }} className="inline-block motion-reduce:opacity-100!">
      {word}
    </m.span>
  );
}

export function ScrollScrubText({ text, className }: ScrollScrubTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "start 0.2"],
  });

  return (
    <p ref={containerRef} className={className}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <ScrubWord
            word={word}
            start={i / words.length}
            end={(i + 1) / words.length}
            progress={scrollYProgress}
          />
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </p>
  );
}
