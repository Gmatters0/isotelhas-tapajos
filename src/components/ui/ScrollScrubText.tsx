"use client";

import { Fragment, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

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
  const opacity = useTransform(progress, [start, end], [0.15, 1]);

  return (
    <motion.span style={{ opacity }} className="inline-block">
      {word}
    </motion.span>
  );
}

export function ScrollScrubText({ text, className }: ScrollScrubTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(" ");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "start 0.2"],
  });

  if (prefersReducedMotion) {
    return (
      <p ref={containerRef} className={className}>
        {text}
      </p>
    );
  }

  return (
    <p ref={containerRef} className={cn(className)}>
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
