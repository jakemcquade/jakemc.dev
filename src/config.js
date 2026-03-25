export default {
  name: "Jake McQuade",
  description: "I build fast, purposeful tools for developers and creators. My open source work focuses on making people more productive and creative. I enjoy running, writing code, and playing guitar in my free time.",
  initialAnimationDelay: 0.04,
  meta: {
    title: "Jake McQuade",
    site: "https://jakemc.dev",
    logo: "/favicon.ico",
    description: "I enjoy running, writing code, and playing guitar. I make fast, open source tools for developers and creators.",
    keywords: ["Jake McQuade", "jake mcquade", "jakemc.dev", "McQuade", "Jake M", "jakemc", "jakemc_dev", "disping", "disping bot", "fastautoclicker", "auto clicker", "fast auto clicker", "open source", "open source software", "open source projects", "open source tools", "open source utilities", "open source applications", "open source programs", "open source apps"],
  },
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/jakemcquade",
    },
    {
      label: "YouTube",
      href: "https://www.youtube.com/@jakemcquade",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/jakee.mcquade/",
    },
    {
      label: "Discord",
      href: "https://discord.com/users/1292290091108274219",
    },
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
      children: [
        {
          label: "Disping",
          subLabel: "Notify your community on YouTube, Twitch, Trovo, Bluesky, Reddit & more - fast and easy with Disping!",
          href: "https://disping.xyz?utm_source=jakemc.dev&utm_medium=link",
        },
        {
          label: "FastAutoClicker",
          subLabel: "An open sourced, lightweight, and fast auto clicker designed with a sleek modern interface.",
          href: "https://github.com/jakemcquade/fastautoclicker",
        },
        {
          label: "Time",
          subLabel: "An easy-to-use time calculator.",
          href: "/time",
        },
        {
          label: "Speechify Image",
          subLabel: "Easily add a speech bubble to any image.",
          href: "/speechify",
        },
      ],
    },
  ],
  experience: [
    {
      company: "DiscoTechs",
      description: "A high school robotics team that competes in the FIRST Robotics Competition (FRC). Programmer through 2025, then Programming Specialist. Helped write efficient and effective code robots for regional competitions.",
      image: "/dt_1099.png",
      period: "2023 - Present",
      role: "Programmer",
      links: [
        {
          label: "Website",
          href: "https://sites.google.com/student.brookfieldps.org/discotechs",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Disping",
      description: "Notify your community on YouTube, Twitch, Trovo, Bluesky, Reddit & more - fast and easy with Disping!",
      image: "/projects/disping.png",
      links: [
        {
          label: "Website",
          href: "https://disping.xyz?utm_source=jakemc.dev&utm_medium=link",
        },
      ],
    },
    {
      name: "FastAutoClicker",
      description: "An open sourced, lightweight, and fast auto clicker designed with a sleek modern interface.",
      image: "/projects/fastautoclicker.png",
      links: [
        {
          label: "GitHub",
          href: "https://github.com/jakemcquade/fastautoclicker",
        },
      ],
    },
  ],
};
