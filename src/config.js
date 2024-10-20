import { label } from "framer-motion/client";

export default {
  name: "Jake McQuade",
  description: "I'm a 16 year old high school student. I like running, skiing, and making software in my free time. I first started programming early 2019.\nToday, I know a variety of languages, frameworks, and tools. However, I specialize in software development.",
  initialAnimationDelay: 0.04,
  meta: {
    title: "Jake McQuade",
    logo: "/favicon.ico",
    description: "Entrepeneur. Developer. Designer.",
    site: "https://jakemc.dev",
    siteName: "jakemc.dev",
    keywords: ["Jake McQuade", "jake mcquade", "jakemc.dev", "McQuade", "Jake M", "jakemc"],
  },
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Blog",
      href: "/blog",
    },
  ],
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/jakemcquade",
    },
    {
      label: "YouTube",
      href: "https://www.youtube.com/@JakeMcQuade",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/jakee.mcquade/",
    },
    {
      label: "Discord",
      href: "https://discord.com/users/1292290091108274219",
    }
  ],
  projects: [
    {
      name: "FastAutoClicker",
      description: "An open sourced, lightweight, and fast auto clicker designed with a sleek modern interface.",
      image: "https://raw.githubusercontent.com/jakemcquade/fastautoclicker/728e8e054bdb5d6949c2cb43086be967921f2657/src-tauri/icons/128x128.png",
      links: [
        {
          label: "GitHub",
          href: "https://github.com/jakemcquade/fastautoclicker/tree/main",
        },
      ],
    },
  ],
};
