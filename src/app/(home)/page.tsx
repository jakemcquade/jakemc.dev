import Image from "next/image";
import Link from "next/link";

import BlurFadeText from "~/components/effects/blur-fade-text";
import BackUp from "../../components/backup";
import config from "~/config";
import BlurFade from "~/components/effects/blur-fade";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/avatar";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

export default function Home() {
  return (
    <main className="relative min-h-[100dvh] items-center justify-center bg-transparent px-8 pt-8">
      {/* Hero */}
      <div className={"w-full"}>
        <BlurFadeText
          className={"my-2.5 text-4xl font-bold"}
          delay={config.initialAnimationDelay}
          yOffset={8}
          animateByCharacter={true}
          text={"Hey, I'm Jake 👋"}
        />
        {config.description.split("\n").map((line, i) => (
          <BlurFadeText
            key={i}
            className={"my-2.5 text-base font-normal"}
            delay={config.initialAnimationDelay * 2 + 1 * 0.05}
            text={line}
          />
        ))}
      </div>

      {/* Contact */}
      <div className={"w-full"}>
        <BlurFadeText
          className={"my-2.5 text-xl font-bold"}
          delay={config.initialAnimationDelay * 3}
          text={"Contact"}
        />
        <BlurFadeText
          className={"mb-2.5 text-base font-normal"}
          delay={config.initialAnimationDelay * 4}
          text={
            'You can contact me by either sending an email to <a href="mailto:hello@jakemc.dev">hello@jakemc.dev</a>, or by any of the socials listed at the bottom of this page.'
          }
        />
      </div>

      {/* Projects */}
      <div className={"w-full"}>
        <BlurFadeText
          className={"my-2.5 text-xl font-bold"}
          delay={config.initialAnimationDelay * 5}
          text={"Projects"}
        />
        <BlurFadeText
          className={"mb-2.5 text-base font-normal"}
          delay={config.initialAnimationDelay * 6}
          text={
            "I've made a lot of projects over the years. This is not a complete list, a lot of my projects are private."
          }
        />
        <div className={"flex flex-col space-y-4"}>
          {config.projects.map((project, i) => (
            <BlurFade key={i} delay={config.initialAnimationDelay * 6 + i * 0.05}>
              <div className={"flex rounded-lg bg-transparent"}>
                <div className={"flex-none"}>
                  <Avatar className={"h-12 w-12"}>
                    <AvatarImage src={project.image} />
                    <AvatarFallback
                      className={"text-lg font-medium"}
                      style={{ color: "rgba(240,240,255,0.5)" }}
                    >
                      {project.name?.at(0)?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className={"ml-4 flex-grow flex-col items-center"}>
                  <div className={"flex flex-col"}>
                    <div className={"flex items-center justify-between gap-x-2 text-base"}>
                      <h3
                        className={
                          "inline-flex items-center justify-center gap-2 text-lg font-semibold leading-none sm:text-sm"
                        }
                      >
                        {project.name}
                        <span className={"inline-flex gap-1"}>
                          {project.links.map((social, i) => (
                            <a key={i} href={social.href}>
                              {social.label.toLowerCase() === "github" ? (
                                <FaGithub className={"h-5 w-5"} />
                              ) : (
                                <FaExternalLinkAlt className={"h-5 w-5"} />
                              )}
                            </a>
                          ))}
                        </span>
                      </h3>
                    </div>
                    <div className="text-base">{project.description}</div>
                  </div>
                </div>
                {/* <div className={"flex w-fit max-h-full mx-4 justify-center items-center"}>
                    <IoIosArrowForward className={"w-6 h-6 group-hover:scale-150 transition-transform"} />
                  </div> */}
              </div>
            </BlurFade>
          ))}
        </div>
      </div>

      {/* Back Up */}
      <BackUp />
    </main>
  );
}
