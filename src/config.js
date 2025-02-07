export default {
  name: "Jake McQuade",
  description: "This is just a site for the stuff I make.",
  contact: "You can contact me at any of the socials listed at the bottom of this page.",
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
        label: "Time",
        subLabel: "An easy-to-use time calculator.",
        href: "/time",
      }, {
        label: "Speechify Image",
        subLabel: "Easily add a speech bubble to any image.",
        href: "/speechify",
      }, {
        label: "Weather",
        subLabel: "A super simple weather app.",
        href: "/weather"
      }, {
        label: "FastAutoClicker",
        subLabel: "An open sourced, lightweight, and fast auto clicker designed with a sleek modern interface.",
        href: "https://github.com/jakemcquade/fastautoclicker",
      }]
    }
  ],
  projects: [
    {
      name: "Disping",
      description: "Notify your community on YouTube and Twitch— fast and effortlessly. That's Disping.",
      image: "https://disping.xyz/logo.png",
      links: []
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
  ],
};
