import { ReactNode } from "react";
import { Metadata } from "next";
import config from "~/config";

export const metadata: Metadata = {
    title: "Speechify",
    description: `Easily add a speech bubble to any image. ${config.meta.description}`,
    keywords: config.meta.keywords.concat(["speechify", "speech bubble meme generator", "image", "speech", "bubble", "chat", "meme", "generator"]),
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
    return children;
};