"use client";

import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { RiCloseLargeFill, RiMenu3Fill } from "react-icons/ri";
import { LuExternalLink, LuMoon, LuSun } from "react-icons/lu";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import NextImage from "next/image";
import Link from "next/link";

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./navigation-menu";
import { Button } from "./button";
import { cn } from "../lib/utils";
import config from "~/config";

export default function Navbar({ logo = "/logo.png" }) {
  const [opened, setOpened] = useState(false);
  const [hide, setHidden] = useState(true);
  useEffect(() => {
    const navbar = document.querySelector("#navbar");
    const scrollClass = "py-2.5 ms-6 me-6 !bg-background dark:!bg-background-3 shadow-md light:border light:[border:1px_solid_rgba(255,255,255,.1)]";

    window.addEventListener("scroll", () => (window.scrollY >= 50 ? navbar?.classList.add(...scrollClass.split(" ")) : navbar?.classList.remove(...scrollClass.split(" "))), { passive: true });
  });

  function Hamburger({ className }: { className?: string }) {
		return (
			<div className={cn("inset-y-0 left-0 flex items-center sm:hidden", className)}>
				<Button
					aria-label="Menu"
					aria-controls="mobile-menu"
					aria-expanded={opened}
					variant="ghost"
					className="relative inline-flex items-center justify-center rounded-md border-0 p-2 outline-hidden"
					onClick={() => setOpened(!opened)}
				>
					{opened ? (
            <RiCloseLargeFill className={"block h-6 w-6"} />
					) : (
            <RiMenu3Fill className={"block h-6 w-6"} />
					)}
				</Button>
			</div>
		);
	}

  return (
    <nav id={"navbar"} className={"sticky top-[1rem] z-[9] flex list-none flex-col rounded-xl bg-transparent p-[5px] py-4 transition-all delay-150 ease-in-out"}>
      <div className="mx-auto w-full max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Branding */}
          <Link href={"/"} aria-label="Go home" className="ml-4 flex w-4/5 items-center justify-start sm:ml-0 sm:w-fit">
            <span className={"transition-transform hover:scale-110"}>
              <NextImage width={36} height={36} className="rounded-md" src={logo} alt="Icon" />
            </span>
          </Link>

          <div className={"flex flex-row"}>
            {/* Hamburger */}
            <Hamburger />

            {/* Items */}
            <div className="mx-2 flex flex-1 items-center justify-end sm:items-stretch">
              <div className="hidden space-x-4 sm:block">
                <NavItems />
              </div>
            </div>

            <div className={"absolute inset-y-0 right-0 hidden items-center pr-2 sm:static sm:inset-auto sm:block sm:pr-0"}>
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Items (Mobile) */}
      <MotionConfig transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}>
        <AnimatePresence initial={false}>
          {opened && (
            <>
              {/* Backdrop */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} className={"fixed inset-0 z-8 bg-black sm:hidden"} onClick={() => setOpened(false)} />

              {/* Sidebar */}
              <motion.div
                className={cn("bg-background-2 fixed inset-y-0 right-0 z-9 w-64 p-4 shadow-lg sm:hidden")}
                id="mobile-menu"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                variants={{
                  closed: { x: "100%" },
                  open: { x: 0 },
                }}
              >
                <div className="flex gap-2 justify-end w-full">
                  <ModeToggle />
                  <Hamburger className={"justify-end"} />
                </div>

                <div className="flex h-max flex-1 flex-col gap-2 pt-2">
                  <NavItems isMobile />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </MotionConfig>
    </nav>
  );
}

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button aria-label={"toggle theme"} variant={"ghost"} size={"icon"} className={"relative"} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      <LuSun className="absolute h-6 w-6 sm:h-4 sm:w-4 hidden transition-all dark:block" />
      <LuMoon className="h-6 w-6 sm:h-4 sm:w-4 block transition-all dark:hidden" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

export function NavItems({ isMobile }: { isMobile?: boolean }) {
  return (
    <NavigationMenu className={"w-full"}>
      <NavigationMenuList className={cn("flex", isMobile ? "flex-col gap-1" : "flex-row")}>
        {config.navItems.map(item => (
          <NavigationMenuItem key={item.label} className={isMobile ? "w-full" : ""}>
          {item.children ? (<>
              <NavigationMenuTrigger className={cn("bg-transparent items-center justify-center rounded-md px-4 py-2 font-sans text-base font-medium text-black transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 dark:text-white", isMobile ? "w-full justify-start" : "w-max justify-center")}>
                {item.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {item.children.map((component) => (
                    <li key={component.label}>
                        <Link href={component.href} className={"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none hover:no-underline transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent- w-full"} title={component.label}>
                          <div className={"flex items-center gap-1 text-sm font-medium leading-none"}>
                            {component.label}
                            {component.href.startsWith("http") ? <LuExternalLink className={"inline-block align-middle w-3 h-3"} /> : null}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{component.subLabel}</p>
                        </Link>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </>) : (
              <Link href={item.href} passHref>
                <span className={cn("inline-flex h-10 items-center rounded-md px-4 py-2 font-sans text-base font-medium text-black transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 dark:text-white", isMobile ? "w-full justify-start" : "w-max justify-center")}>{item.label}</span>
              </Link>
          )}
        </NavigationMenuItem>))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
