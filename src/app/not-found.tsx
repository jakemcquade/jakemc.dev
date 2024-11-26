"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

import BlurFadeText from "~/components/effects/blur-fade-text";
import BlurFade from "~/components/effects/blur-fade";
import { Button } from "~/components/button";
import config from "~/config";

export default function Render() {
  const router = useRouter();

  return (
    <div className={"flex flex-col h-[75dvh] gap-1 relative"}>
      <div className={"h-full w-full m-auto text-center items-center justify-center flex absolute bottom-[25%] z-[-1] inset-0 overflow-visible"}>
        <p className={"text-[14rem] sm:text-[25rem] font-extrabold h-fit w-fit opacity-[0.03] m-auto"}>404</p>
      </div>
      <div className={"flex flex-col gap-1 h-fit text-center m-auto z-50"}>
        <BlurFadeText className={"text-4xl font-bold m-auto text-black dark:text-white"} delay={config.initialAnimationDelay} yOffset={8} text={"404 - Not Found"} />
        <BlurFadeText className={"text-base font-normal m-auto text-black dark:text-white"} delay={config.initialAnimationDelay * 1.5} text={"Sorry, we couldn't find what you were looking for."} />
        <div className={"flex flex-row gap-2 py-2 justify-center"}>
          <Link href={"/"} passHref>
            <BlurFade delay={config.initialAnimationDelay * 2}>
              <Button>Home</Button>
            </BlurFade>
          </Link>
          <BlurFade delay={config.initialAnimationDelay * 2}>
            <Button onClick={() => router.back()}>
              Go Back
            </Button>
          </BlurFade>
        </div>
      </div>
    </div>
  )
}
