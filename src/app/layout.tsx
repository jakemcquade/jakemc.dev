import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";

import { ThemeProvider } from "~/components/theme";
import MouseEffect from "~/components/mouse";
import Footer from "~/components/footer";
import config from "~/config";

const font = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const viewport: Viewport = { themeColor: "#323232" };
export const generateMetadata = async (): Promise<Metadata> => {
  const title = config.meta.title;
  const description = config.meta.description;

  return {
    metadataBase: new URL("https://jakemc.dev"),
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    keywords: config.meta.keywords,
    manifest: "/manifest.json",
    creator: "Jake McQuade (jakemc.dev)",
    publisher: "Jake McQuade (jakemc.dev)",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-video-preview": -1,
        "max-image-preview": "large",
      },
    },
    appleWebApp: {
      title,
      capable: true,
      startupImage: "/logo.png",
      statusBarStyle: "black-translucent",
    },
    openGraph: {
      siteName: config.meta.siteName,
      images: config.meta.logo,
      url: config.meta.site,
      title,
      description,
      type: "website",
      locale: "en_US",
    },
    twitter: { card: "summary", title },
    icons: {
      icon: [{ url: "/icon.png" }],
      shortcut: ["/favicon.ico"],
      apple: [{ url: "/apple-icon.png" }, { url: "/apple-icon-x3.png", sizes: "180x180", type: "image/png" }],
      other: [
        {
          rel: "apple-touch-icon-precomposed",
          url: "/apple-touch-icon-precomposed.png",
        },
      ],
    },
  };
};

import "~/styles/globals.css";
export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang={"en"} data-theme={"dark"} style={{ colorScheme: "dark", scrollBehavior: "smooth" }} suppressHydrationWarning>
      <head />
      <body className={"mx-auto min-h-screen max-w-2xl bg-background font-sans antialiased"}>
        <ThemeProvider attribute={"data-theme"} defaultTheme={"dark"} disableTransitionOnChange>
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
