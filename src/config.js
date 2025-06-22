export default {
  name: "Jake McQuade",
  description: "I build fast, purposeful tools for developers and creators. My open source work focuses on making people more productive and creative. I was honored to receive the Xerox Award for Innovation and Information Technology for some of this work.",
  initialAnimationDelay: 0.04,
  meta: {
    title: "Jake McQuade",
    logo: "/favicon.ico",
    description: "",
    site: "https://jakemc.dev",
    siteName: "jakemc.dev",
    keywords: ["Jake McQuade", "jake mcquade", "jakemc.dev", "McQuade", "Jake M", "jakemc", "jakemc_dev", "disping", "disping bot", "fastautoclicker", "auto clicker", "fast auto clicker", "open source", "open source software", "open source projects", "open source tools", "open source utilities", "open source applications", "open source programs", "open source apps"],
  },
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
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "Projects",
      href: "/projects",
      children: [{
        label: "Disping",
        subLabel: "Notify your community on YouTube, Twitch, Trovo, Bluesky, Reddit & more—fast and easy with Disping!",
        href: "https://disping.xyz?utm_source=jakemc.dev&utm_medium=link",
      }, {
        label: "FastAutoClicker",
        subLabel: "An open sourced, lightweight, and fast auto clicker designed with a sleek modern interface.",
        href: "https://github.com/jakemcquade/fastautoclicker",
      }, {
        label: "Time",
        subLabel: "An easy-to-use time calculator.",
        href: "/time",
      }, {
        label: "Speechify Image",
        subLabel: "Easily add a speech bubble to any image.",
        href: "/speechify",
      }]
    }
  ],
  projects: [
    {
      name: "Disping",
      description: "Notify your community on YouTube, Twitch, Trovo, Bluesky, Reddit & more—fast and easy with Disping!",
      image: "https://disping.xyz/logo.png",
      links: [
        {
          label: "Website",
          href: "https://disping.xyz?utm_source=jakemc.dev&utm_medium=link",
        }
      ]
    },
    {
      name: "FastAutoClicker",
      description: "An open sourced, lightweight, and fast auto clicker designed with a sleek modern interface.",
      image: "https://raw.githubusercontent.com/jakemcquade/fastautoclicker/728e8e054bdb5d6949c2cb43086be967921f2657/src-tauri/icons/128x128.png",
      links: [
        {
          label: "GitHub",
          href: "https://github.com/jakemcquade/fastautoclicker",
        },
      ],
    },
  ]
};
