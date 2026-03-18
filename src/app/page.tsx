import BlurFadeText from "~/components/effects/blur-fade-text";
import BlurFade from "~/components/effects/blur-fade";
import BackUp from "~/components/backup";
import Avatar from "~/components/avatar";
import config from "~/config";

import { SiGithub } from "@icons-pack/react-simple-icons";
import { ExternalLink } from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-[100dvh] flex flex-col items-start justify-start bg-transparent px-8 pt-8">
      {/* Hero */}
      <div className={"w-full"}>
        <BlurFadeText className={"my-2.5 text-4xl font-bold text-black dark:text-white"} delay={config.initialAnimationDelay} yOffset={8} animateByCharacter text={"Hey, I'm Jake"} />
        {config.description.split("\n").map((line, i) => (
          <BlurFadeText key={line} className={"text-base font-normal text-black dark:text-white"} delay={config.initialAnimationDelay * 2 + i * 0.05} text={line} />
        ))}
      </div>

      {/* Contact */}
      <div className={"w-full"}>
        <BlurFadeText className={"my-2.5 text-xl font-bold text-black dark:text-white"} delay={config.initialAnimationDelay * 3} text={"Contact"} />
        <BlurFade className="mb-2.5" delay={config.initialAnimationDelay * 4 + 0.05}>
          <span className="text-base font-normal text-black dark:text-white">
            Interested in collaborating, hiring, or just having a chat? Feel free to reach out at <a href="mailto:hello@jakemc.dev">hello@jakemc.dev</a> or connect with me on any of my socials.
          </span>
        </BlurFade>
      </div>

      {/* Experience */}
      {/* <div className="w-full">
        <BlurFadeText
          className="my-2.5 text-xl font-bold text-black dark:text-white"
          delay={config.initialAnimationDelay * 7}
          text="Experience"
        />
        <div className="flex flex-col space-y-4 pb-2.5">
          {config.experience?.map((exp, i) => (
            <BlurFade key={exp.company + exp.role} delay={config.initialAnimationDelay * 7 + i * 0.05}>
              <div className="flex rounded-lg bg-transparent">
              <div className="flex-none flex items-center justify-center">
                <Avatar
                src={exp.image}
                className="h-12 w-12 bg-black dark:bg-white"
                fallback={exp.company?.at(0)?.toUpperCase()}
                alt={exp.company}
                />
              </div>
              <div className="ml-4 flex-grow flex flex-col justify-center">
                <div className="flex items-center gap-x-2">
                <h3 className="text-lg font-semibold leading-none text-black dark:text-white">
                  {exp.role}
                </h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  @{exp.company}
                </span>
                <span className="inline-flex gap-1 ml-2">
                  {exp.links?.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    {social.label.toLowerCase() === "github" ? (
                    <SiGithub className="h-4 w-4 text-black dark:text-white" />
                    ) : (
                    <ExternalLink className="h-4 w-4 text-black dark:text-white" />
                    )}
                  </a>
                  ))}
                </span>
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                {exp.period}
                </div>
                <div className="text-base font-normal text-black dark:text-white mt-1">
                {exp.description}
                </div>
              </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </div> */}

      {/* Projects */}
      <div className={"w-full"}>
        <BlurFadeText className={"my-2.5 text-xl font-bold text-black dark:text-white"} delay={config.initialAnimationDelay * 5} text={"Projects"} />
        <BlurFadeText className={"mb-2.5 text-base font-normal text-black dark:text-white"} delay={config.initialAnimationDelay * 6} text={"I've made a lot of projects over the years. This is not a complete list, a lot of my projects are private."} />
        <div className={"flex flex-col space-y-4"}>
          {config.projects.map((project, i) => (
            <BlurFade key={project.name} delay={config.initialAnimationDelay * 6 + i * 0.05}>
              <div className={"flex items-center rounded-lg bg-transparent"}>
                <div className={"flex-none flex items-center justify-center"}>
                  <Avatar src={project.image} className={"h-12 w-12 bg-black dark:bg-white"} fallback={project.name?.at(0)?.toUpperCase()} alt={project?.name} />
                </div>
                <div className={"ml-4 flex-grow flex flex-col justify-center"}>
                  <div className={"flex flex-col"}>
                    <div className={"flex items-center justify-between gap-x-2 text-base"}>
                      <h3 className={"inline-flex items-center justify-center gap-1 text-lg font-semibold leading-none sm:text-sm text-black dark:text-white"}>
                        {project.name}
                        <span className={"inline-flex gap-1"}>
                          {project.links.map(social => (
                            <a key={social.label} href={social.href} target={"_blank"} rel={"noopener noreferrer"}>
                              {social.label.toLowerCase() === "github" ? <SiGithub className={"h-4 w-4 text-black dark:text-white"} /> : <ExternalLink className={"h-4 w-4 text-black dark:text-white"} />}
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

      {/* Back Up */}
      <BackUp />
    </main>
  )
}
