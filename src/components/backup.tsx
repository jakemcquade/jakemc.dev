"use client";

import { useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function BackUp() {
  useEffect(() => {
    const button = document.getElementById("top");
    window.onscroll = function () {
      if (document.documentElement.scrollTop > 80) {
        button?.classList.add("opacity-100");
        button?.classList.remove("opacity-0");
      } else {
        button?.classList.remove("opacity-100");
        button?.classList.add("opacity-0");
      }
    };
  }, []);

  return (
    <button id={"top"} onClick={() => window.scrollTo({ behavior: "smooth", top: 0 })} className={"text-dark light:border group fixed bottom-8 right-8 flex h-12 w-12 cursor-pointer items-center justify-center overflow-hidden rounded-full border-none bg-background font-semibold opacity-0 shadow transition-all duration-300 dark:bg-zinc-900 dark:text-white"}>
      <FaArrowUp className={"w-3 transition-all duration-300 group-hover:scale-150"} />
    </button>
  );
}
