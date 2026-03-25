"use client";

import type { CSSProperties } from "react";
import { cn } from "../../lib/utils";
import { useMemo } from "react";

interface BlurFadeTextProps {
  text: string;
  className?: string;
  variant?: unknown;
  duration?: number;
  characterDelay?: number;
  delay?: number;
  yOffset?: number;
  animateByCharacter?: boolean;
}

const BlurFadeText = ({
  text,
  className,
  variant,
  characterDelay = 0.03,
  delay = 0,
  duration = 0.26,
  yOffset = 8,
  animateByCharacter = false,
}: BlurFadeTextProps) => {
  const initialBlur = `${Math.max(4, yOffset)}px`;
  const characters = useMemo(() => Array.from(text), [text]);

  if (animateByCharacter) {
    return (
      <div className="flex">
        {characters.map((char, i) => (
          <span
            key={char + i}
            className={cn("inline-block blur-fade-text", className)}
            style={{
              width: char.trim() === "" ? "0.2em" : "auto",
              "--blur-fade-text-delay": `${delay + i * characterDelay}s`,
              "--blur-fade-text-duration": `${duration}s`,
              "--blur-fade-text-offset": `${yOffset}px`,
              "--blur-fade-text-blur": initialBlur,
              willChange: "transform, opacity, filter",
            } as CSSProperties}
          >
            {char}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="flex">
      <span
        className={cn("inline-block blur-fade-text", className)}
        style={{
          "--blur-fade-text-delay": `${delay}s`,
          "--blur-fade-text-duration": `${duration}s`,
          "--blur-fade-text-offset": `${yOffset}px`,
          "--blur-fade-text-blur": initialBlur,
          willChange: "transform, opacity, filter",
        } as CSSProperties}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  );
};

export default BlurFadeText;
