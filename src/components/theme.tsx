"use client";

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes"
import Navbar from "./navbar";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <Navbar />
      {children}
    </NextThemesProvider>
  );
}
