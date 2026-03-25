import { SiGithub } from "@icons-pack/react-simple-icons";
import { ExternalLink } from "lucide-react";

import Avatar from "~/components/avatar";
import BlurFade from "~/components/effects/blur-fade";
import BlurFadeText from "~/components/effects/blur-fade-text";
import config from "~/config";

export default function HomePage() {
  const introDelay = 0.08;
  const lineStartDelay = 0.2;
  const lineStepDelay = 0.07;
  const contactTitleDelay = 0.46;
  const contactBodyDelay = 0.58;
  const projectsTitleDelay = 0.74;
  const projectsBodyDelay = 0.86;
  const projectsCardStartDelay = 1.0;
  const projectsCardStepDelay = 0.07;

  return (
    <main className="relative min-h-[70vh] flex flex-col items-start justify-start bg-transparent px-8 pt-8">
      <div className="w-full">
        <h1 className="home-hero-title my-2.5 text-4xl font-bold text-black dark:text-white">Hey, I&apos;m Jake</h1>
        {config.description.split("\n").map((line, i) => (
          <BlurFadeText key={line} className="text-base font-normal text-black dark:text-white" delay={lineStartDelay + i * lineStepDelay} duration={0.32} yOffset={5} text={line} />
        ))}
      </div>

      <div className="w-full">
        <BlurFadeText className="my-2.5 text-xl font-bold text-black dark:text-white" delay={contactTitleDelay} duration={0.32} yOffset={5} text="Contact" />
        <BlurFade className="mb-2.5" delay={contactBodyDelay} duration={0.32} offset={4}>
          <span className="text-base font-normal text-black dark:text-white">
            Interested in collaborating, hiring, or just having a chat? Feel free to reach out at <a href="mailto:hello@jakemc.dev">hello@jakemc.dev</a> or connect with me on any of my socials.
          </span>
        </BlurFade>
      </div>

      <div className="w-full">
        <BlurFadeText className="my-2.5 text-xl font-bold text-black dark:text-white" delay={projectsTitleDelay} duration={0.32} yOffset={5} text="Projects" />
        <BlurFadeText className="mb-2.5 text-base font-normal text-black dark:text-white" delay={projectsBodyDelay} duration={0.32} yOffset={5} text="I've made a lot of projects over the years. This is not a complete list, a lot of my projects are private." />
        <div className="flex flex-col space-y-4">
          {config.projects.map((project, i) => (
            <BlurFade key={project.name} delay={projectsCardStartDelay + i * projectsCardStepDelay} duration={0.32} offset={4}>
              <div className="flex items-center rounded-lg bg-transparent">
                <div className="flex-none flex items-center justify-center">
                  <Avatar src={project.image} className="h-12 w-12 bg-black dark:bg-white" fallback={project.name?.at(0)?.toUpperCase()} alt={project.name} />
                </div>
                <div className="ml-4 flex-grow flex flex-col justify-center">
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between gap-x-2 text-base">
                      <h3 className="inline-flex items-center justify-center gap-1 text-lg font-semibold leading-none sm:text-sm text-black dark:text-white">
                        {project.name}
                        <span className="inline-flex gap-1">
                          {project.links.map((social) => (
                            <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} ${social.label}`}>
                              {social.label.toLowerCase() === "github" ? <SiGithub className="h-4 w-4 text-black dark:text-white" /> : <ExternalLink className="h-4 w-4 text-black dark:text-white" />}
                            </a>
                          ))}
                        </span>
                      </h3>
                    </div>
                    <div className="text-base font-normal text-black dark:text-white">{project.description}</div>
                  </div>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </main>
  );
}
