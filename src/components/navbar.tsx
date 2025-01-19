"use client";

import { RiCloseLargeFill, RiMenu3Fill } from "react-icons/ri";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import NextImage from "next/image";
import Link from "next/link";

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./navigation-menu";
import { LuExternalLink, LuMoon, LuSun } from "react-icons/lu";
import { Button } from "./button";
import { cn } from "../lib/utils";
import config from "~/config";

/**
 * A navigation bar component with a hamburger menu for mobile and a
 * horizontal bar for desktop.
 *
 * @param {object} props
 * @param {string} [props.logo="/logo.png"] The logo of the application.
 * @returns A JSX element representing the navigation bar.
 */
export default function Navbar({ logo = "/logo.png" }) {
  const [opened, setOpened] = useState(false);
  const [hide, setHidden] = useState(true);
  useEffect(() => {
    const navbar = document.querySelector("#navbar");
    const scrollClass = "py-2.5 ms-6 me-6 !bg-background dark:!bg-background-3 shadow-md light:border light:[border:1px_solid_rgba(255,255,255,.1)]";

    window.addEventListener("scroll", () => (window.scrollY >= 50 ? navbar?.classList.add(...scrollClass.split(" ")) : navbar?.classList.remove(...scrollClass.split(" "))), { passive: true });
  });

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
            <div className="flex h-full w-fit items-center justify-end sm:hidden">
              <Button aria-label={"menu"} variant="outline" className="relative inline-flex items-center justify-center rounded-md border-0 p-2 outline-none hover:bg-accent transition-all" onClick={() => { setOpened(!opened); setTimeout(() => setHidden(opened), 300) }} aria-controls="mobile-menu">
                {opened === true ? <RiCloseLargeFill className={"block h-6 w-6"} /> : <RiMenu3Fill className={"block h-6 w-6"} />}
              </Button>
            </div>

            {/* Items */}
            <div className="mx-2 flex flex-1 items-center justify-end sm:items-stretch">
              <div className="hidden space-x-4 sm:block">{navItems(false)}</div>
            </div>

            <div className={"absolute inset-y-0 right-0 hidden items-center pr-2 sm:static sm:inset-auto sm:block sm:pr-0"}>
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Items (Mobile) */}
      <div className={cn("sm:hidden z-10 transition-[max-height,opacity] duration-300 ease-in-out", opened ? "max-h-screen opacity-100" : "max-h-0 opacity-0")} id="mobile-menu">
        <div className={cn("flex flex-col space-y-1 px-2 pb-3 pt-2", hide ? "hidden" : "")}>
          {navItems(true)}
          <div className={"px-2.5 items-center sm:static sm:block sm:pr-0"}>
        <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button aria-label={"toggle theme"} variant={"ghost"} size={"icon"} className={"relative"} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      <LuSun className="absolute h-4 w-4 scale-0 transition-all dark:scale-100" />
      <LuMoon className="h-4 w-4 scale-100 transition-all dark:scale-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

export function navItems(isMobile: boolean) {
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
