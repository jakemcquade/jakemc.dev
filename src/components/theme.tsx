"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

import Navbar from "./navbar";
import Footer from "./footer";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence initial={false} mode={"popLayout"}>
      {/* <Navbar /> */}
      <motion.main
        key={pathname}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ ease: [0.25, 0.1, 0.25, 1], duration: 0.2 }}
	  >
        {children}
      </motion.main>
      {/* <Footer /> */}
    </AnimatePresence>
  );
}
