"use client";

import type { CSSProperties, HTMLAttributes } from "react";

import { cn } from "~/lib/utils";

interface BlurFadeProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: unknown;
  duration?: number;
  delay?: number;
  offset?: number;
  direction?: "up" | "down" | "left" | "right";
  inView?: boolean;
  inViewMargin?: string;
  blur?: string;
}

export default function BlurFade({
  children,
  className,
  variant,
  duration = 0.28,
  delay = 0,
  offset = 4,
  direction = "down",
  inView = false,
  inViewMargin = "-50px",
  blur = "4px",
  style,
  ...props
}: BlurFadeProps) {
  const directionSign = direction === "right" || direction === "down" ? -1 : 1;
  const axis = direction === "left" || direction === "right" ? "x" : "y";
  const translatedOffset = `${directionSign * offset}px`;

  return (
    <div
      className={cn("blur-fade", inView && "blur-fade-in-view", className)}
      data-axis={axis}
      style={{
        "--blur-fade-delay": `${delay}s`,
        "--blur-fade-duration": `${duration}s`,
        "--blur-fade-offset": translatedOffset,
        "--blur-fade-blur": blur,
        "--blur-fade-in-view-margin": inViewMargin,
        willChange: "transform, opacity, filter",
        ...style,
      } as CSSProperties}
      {...props}
    >
      {children}
    </div>
  );
}
