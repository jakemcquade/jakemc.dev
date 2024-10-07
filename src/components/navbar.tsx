"use client";

import React, { useEffect, useState } from "react";
import NextImage from "next/image";
import Link from "next/link";

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./navigation-menu";
import css from "~/styles/navbar.module.css";
import { Button } from "./button";
import { cn } from "./utils";
import config from "~/config";

/**
 * A navigation bar component with a hamburger menu for mobile and a
 * horizontal bar for desktop.
 *
 * @param {object} props
 * @param {string} [props.name=config.name] The name of the application.
 * @param {string} [props.logo="/logo.png"] The logo of the application.
 * @returns A JSX element representing the navigation bar.
 */
export default function Navbar({ name = config.name, logo = "/logo.png" }) {
  const [opened, setOpened] = useState(false);
  useEffect(() => {
    if (!css["navbar-no-scroll"] || !css["navbar-scroll"]) return;

    const navbar = document.querySelector(".navbar");
    navbar?.classList.add(css["navbar-no-scroll"]);

    window.addEventListener("scroll", function () {
      if (!css["navbar-no-scroll"] || !css["navbar-scroll"]) return;

      if (window.scrollY >= 50) {
        navbar?.classList.remove(css["navbar-no-scroll"]);
        navbar?.classList.add(css["navbar-scroll"]);
      } else {
        navbar?.classList.remove(css["navbar-scroll"]);
        navbar?.classList.add(css["navbar-no-scroll"]);
      }
    }, { passive: true });
  });

  return (<>
  <nav className={"navbar p-[5px] sticky top-[1rem] z-[9] transition-all delay-150 ease-in-out"}>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Branding */}
          <Link href={"/"} aria-label="Go home" className="flex items-center sm:w-fit justify-start w-4/5">
            <NextImage width={36} height={36} className="rounded-md" src={logo} alt="Icon" />
            <span className="text-xl font-bold ml-2  tracking-wide text-white uppercase">{name.toUpperCase()}</span>
          </Link>

          {/* Hamburger */}
          <div className="inset-y-0 left-0 flex items-center sm:hidden">
            <Button variant="outline" className="relative inline-flex items-center justify-center rounded-md p-2 bg-background-2 hover:bg-gray-800 outline-none border-0" onClick={() => setOpened(!opened)} aria-controls="mobile-menu">
              {opened === true ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </Button>
          </div>

          {/* Items */}
          <div className="flex flex-1 items-center mx-4 justify-start sm:items-stretch">
            <div className="hidden sm:block space-x-4">{navItems(false)}</div>
          </div>
          <div className="absolute inset-y-0 right-0 hidden sm:block items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            
          </div>
        </div>
      </div>

      {/* Items (Mobile) */}
      <div className={`sm:hidden${opened !== true ? " hidden" : ""}`} id="mobile-menu">
        <div className="flex space-y-1 px-2 pb-3 pt-2">{navItems(true)}</div>
      </div>
    </nav>
  </>)
};

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(({ className, title, children, ...props }, ref) => {
  return <li>
    <NavigationMenuLink asChild>
      <a ref={ref}
        className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground", className)} {...props}>
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </a>
    </NavigationMenuLink>
  </li>
}); ListItem.displayName = "ListItem";

export function navItems(isMobile: boolean) {
  return (<NavigationMenu className={"w-full"}>
    <NavigationMenuList className={cn("flex", isMobile === true ? "flex-col" : "flex-row")}>
      {config.navItems.map((item: {
        label: string,
        href: string,
        children?: [{ label: string, subLabel: string, href: string }]
      }) => item.children ? (<>
        <NavigationMenuItem key={item.label}>
          <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {item.children.map(component => (
                <ListItem className={"w-full"} key={component.label} title={component.label} href={component.href}>
                  {component.subLabel}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </>) : <NavigationMenuItem key={item.label} className={"w-full"}>
          <NavigationMenuLink href={item.href} className={"inline-flex h-10 w-max items-center justify-center font-sans rounded-md px-4 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"}>
            {item.label}
          </NavigationMenuLink>
        </NavigationMenuItem>)}
    </NavigationMenuList>
  </NavigationMenu>)
}