"use client";

import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { X, Menu, ExternalLink, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "./navigation-menu";
import { Button } from "./button";
import { cn } from "../lib/utils";
import config from "~/config";

export default function Navbar({ logo = "/logo.png" }) {
  const [opened, setOpened] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme");
    const initialTheme = storedTheme === "light" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", initialTheme);
    document.documentElement.style.colorScheme = initialTheme;
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    const navbar = document.querySelector("#navbar");
    const scrollClass = "py-2.5 ms-6 me-6 !bg-background dark:!bg-background-3 shadow-md light:border light:[border:1px_solid_rgba(255,255,255,.1)]";
    const scrollClasses = scrollClass.split(" ");

    const handleScroll = () => {
      if (window.scrollY >= 50) {
        navbar?.classList.add(...scrollClasses);
      } else {
        navbar?.classList.remove(...scrollClasses);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function toggleTheme() {
    setTheme((previousTheme) => {
      const nextTheme = previousTheme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", nextTheme);
      document.documentElement.style.colorScheme = nextTheme;
      window.localStorage.setItem("theme", nextTheme);
      return nextTheme;
    });
  }

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
            <X className={"block h-6 w-6"} />
					) : (
            <Menu className={"block h-6 w-6"} />
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
          <a href={"/"} aria-label="Go home" className="ml-4 flex w-4/5 items-center justify-start sm:ml-0 sm:w-fit">
            <span className={"transition-transform hover:scale-110"}>
              <img src={logo} alt="Icon" className="rounded-md h-9 w-9 object-contain" width={36} height={36} loading="eager" decoding="async" fetchPriority="high" />
            </span>
          </a>

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
              <ModeToggle onToggle={toggleTheme} />
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
                  <ModeToggle onToggle={toggleTheme} />
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

export function ModeToggle({ onToggle }: { onToggle: () => void }) {

  return (
    <Button aria-label={"toggle theme"} variant={"ghost"} size={"icon"} className={"relative"} onClick={onToggle}>
      <Sun className="absolute h-6 w-6 sm:h-4 sm:w-4 hidden transition-all dark:block" />
      <Moon className="h-6 w-6 sm:h-4 sm:w-4 block transition-all dark:hidden" />
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
                        <a href={component.href} className={"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none hover:no-underline transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent- w-full"} title={component.label}>
                          <div className={"flex items-center gap-1 text-sm font-medium leading-none"}>
                            {component.label}
                            {component.href.startsWith("http") ? <ExternalLink className={"inline-block align-middle w-3 h-3"} /> : null}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{component.subLabel}</p>
                        </a>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </>) : (
              <a href={item.href}>
                <span className={cn("inline-flex h-10 items-center rounded-md px-4 py-2 font-sans text-base font-medium text-black transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 dark:text-white", isMobile ? "w-full justify-start" : "w-max justify-center")}>{item.label}</span>
              </a>
          )}
        </NavigationMenuItem>))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
