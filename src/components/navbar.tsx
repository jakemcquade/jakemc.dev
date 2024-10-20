"use client";

import { RiCloseLargeFill, RiMenu3Fill } from "react-icons/ri";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import NextImage from "next/image";
import Link from "next/link";

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./navigation-menu";
import { LuMoon, LuSun } from "react-icons/lu";
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
  useEffect(() => {
    const navbar = document.querySelector("#navbar");
    const scrollClass = "py-2.5 ms-6 me-6 !bg-background dark:!bg-background-3 shadow-md light:border light:[border:1px_solid_rgba(255,255,255,.1)]";

    window.addEventListener("scroll", () => window.scrollY >= 50 ? navbar?.classList.add(...scrollClass.split(" ")) : navbar?.classList.remove(...scrollClass.split(" ")), { passive: true });
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
              <Button variant="outline" className="relative inline-flex items-center justify-center rounded-md border-0 bg-background-2 p-2 outline-none hover:bg-gray-800" onClick={() => setOpened(!opened)} aria-controls="mobile-menu">
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
      <div className={`sm:hidden ${opened !== true ? "hidden" : ""}`} id="mobile-menu">
        <div className="flex space-y-1 px-2 pb-3 pt-2">{navItems(true)}</div>
      </div>
    </nav>
  );
}

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button variant={"ghost"} size={"icon"} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      <LuSun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <LuMoon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a ref={ref} className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground", className)} {...props}>
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export function navItems(isMobile: boolean) {
  return (
    <NavigationMenu className={"w-full"}>
      <NavigationMenuList className={cn("flex", isMobile === true ? "flex-col" : "flex-row")}>
        {config.navItems.map((item: { label: string; href: string; children?: [{ label: string; subLabel: string; href: string }] }) =>
          item.children ? (
            <NavigationMenuItem key={item.label}>
              <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {item.children.map((component) => (
                    <ListItem className={"w-full"} key={component.label} title={component.label} href={component.href}>
                      {component.subLabel}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={item.label} className={"w-full"}>
              <Link href={item.href} passHref>
                <span className={"inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 font-sans text-base font-medium text-black transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 dark:text-white"}>{item.label}</span>
              </Link>
            </NavigationMenuItem>
          ),
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
