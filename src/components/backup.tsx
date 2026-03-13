"use client";

import { useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function BackUp() {
  useEffect(() => {
    const button = document.getElementById("top");

    const onScroll = () => {
      if (!button) return;

      const isVisible = document.documentElement.scrollTop > 80;
      button.classList.toggle("opacity-100", isVisible);
      button.classList.toggle("opacity-0", !isVisible);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <button id={"top"} aria-label={"top"} onClick={() => window.scrollTo({ behavior: "smooth", top: 0 })} className={"text-dark light:border group fixed bottom-8 right-8 flex h-12 w-12 cursor-pointer items-center justify-center overflow-hidden rounded-full border-none bg-background font-semibold opacity-0 shadow transition-all duration-300 dark:bg-zinc-900 dark:text-white"}>
      <ArrowUp className={"w-3 transition-all duration-300 group-hover:scale-150"} />
    </button>
  );
}
