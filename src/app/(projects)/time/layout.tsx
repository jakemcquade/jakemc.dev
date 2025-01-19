import { ReactNode } from "react";
import { Metadata } from "next";
import config from "~/config";

export const metadata: Metadata = {
    title: "Time Calculator",
    description: `An easy-to-use time calculator. ${config.description}`,
    keywords: config.meta.keywords.concat(["time", "time calculator", "calculator", "time converter", "time difference", "time difference calculator", "time difference converter"]),
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
    return children;
};