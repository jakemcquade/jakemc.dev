import type { Metadata, Viewport } from "next";
import { ReactNode } from "react";

import { ThemeProvider } from "../components/theme";
import config from "../config";

import "~/styles/globals.css";
export default async function RootLayout({ children }: Readonly<{ children: ReactNode; }>) {
  return (
    <html lang={"en"} data-theme={"dark"} style={{ colorScheme: "dark", scrollBehavior: "smooth" }} suppressHydrationWarning>
      <head />
      <body className={"bg-background min-h-screen antialiased"}>
        <ThemeProvider children={children} />
      </body>
    </html>
  );
}

export const viewport: Viewport = { themeColor: "#323232" };
export const generateMetadata = async (): Promise<Metadata> => {
  const title = config.meta.title;
  const description = config.meta.description;

  return {
    metadataBase: new URL("https://jakemc.dev"),
    title, description,
    keywords: config.meta.keywords,
    manifest: "/manifest.json",
    creator: "Jake McQuade (jakemc.dev)",
    publisher: "Jake McQuade (jakemc.dev)",
    robots: "index, follow",
    appleWebApp: {
      capable: true,
      title,
      startupImage: "/logo.png",
      statusBarStyle: "black-translucent",
    },
    openGraph: {
      type: "website",
      title, description,
      url: config.meta.site,
      images: config.meta.logo,
    },
    twitter: {
      card: "summary",
      site: "jakemc.dev",
      title, description,
      images: config.meta.logo,
    },
    icons: {
      icon: [{ url: "/icon.png" }],
      shortcut: ["/favicon.ico"],
      apple: [
        { url: "/apple-icon.png" },
        { url: "/apple-icon-x3.png", sizes: "180x180", type: "image/png" },
      ],
      other: [{
        rel: "apple-touch-icon-precomposed",
        url: "/apple-touch-icon-precomposed.png",
      }],
    },
  };
};
