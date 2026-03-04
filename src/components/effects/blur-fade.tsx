"use client";

import { motion, useInView, UseInViewOptions, Variants, MotionProps } from "motion/react";
import { useMemo, useRef } from "react";

type MarginType = UseInViewOptions["margin"];

interface BlurFadeProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
  };
  duration?: number;
  delay?: number;
  offset?: number;
  direction?: "up" | "down" | "left" | "right";
  inView?: boolean;
  inViewMargin?: MarginType;
  blur?: string;
}

export default function BlurFade({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  offset = 6,
  direction = "down",
  inView = false,
  inViewMargin = "-50px",
  blur = "6px",
  ...props
}: BlurFadeProps) {
  const ref = useRef(null);
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin });
  const isInView = !inView || inViewResult;
  const defaultVariants: Variants = useMemo(
    () => ({
      hidden: {
        [direction === "left" || direction === "right" ? "x" : "y"]:
          direction === "right" || direction === "down" ? -offset : offset,
        opacity: 0,
        filter: `blur(${blur})`,
      },
      visible: {
        [direction === "left" || direction === "right" ? "x" : "y"]: 0,
        opacity: 1,
        filter: "blur(0px)",
      },
    }),
    [blur, direction, offset],
  );

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variant || defaultVariants}
      transition={{
        delay: 0.04 + delay,
        duration,
        ease: "easeOut",
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
