import { Metadata } from "next";
import { ReactNode } from "react";
import config from "~/config";

export const metadata: Metadata = {
    title: "Speechify",
    description: "Easily add a speech bubble to any image.",
    keywords: config.meta.keywords.concat(["speechify", "speech bubble meme generator", "image", "speech", "bubble", "chat", "meme", "generator"]),
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
    return children;
};