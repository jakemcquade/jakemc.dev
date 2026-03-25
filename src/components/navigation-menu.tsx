"use client";

import { AnimatePresence, MotionConfig, motion } from "motion/react";
import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "~/lib/utils";

const CLOSE_DELAY_MS = 140;

interface NavigationMenuItemContextValue {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openMenu: () => void;
  scheduleClose: () => void;
  cancelScheduledClose: () => void;
  triggerId: string;
  contentId: string;
}

const NavigationMenuItemContext = React.createContext<NavigationMenuItemContextValue | null>(null);

function useNavigationMenuItemContext() {
  const context = React.useContext(NavigationMenuItemContext);
  if (!context) {
    throw new Error("NavigationMenuTrigger and NavigationMenuContent must be used within <NavigationMenuItem>");
  }
  return context;
}

const NavigationMenu = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)} {...props} />;
});
NavigationMenu.displayName = "NavigationMenu";

const NavigationMenuList = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(({ className, ...props }, ref) => (
  <ul ref={ref} className={cn("group flex flex-1 list-none items-center justify-center space-x-1", className)} {...props} />
));
NavigationMenuList.displayName = "NavigationMenuList";

const NavigationMenuItem = React.forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement>>(({ className, onMouseLeave, ...props }, ref) => {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLLIElement | null>(null);
  const closeTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerId = React.useId();
  const contentId = React.useId();

  const cancelScheduledClose = React.useCallback(() => {
    if (!closeTimeoutRef.current) return;
    clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = null;
  }, []);

  const scheduleClose = React.useCallback(() => {
    cancelScheduledClose();
    closeTimeoutRef.current = setTimeout(() => {
      setOpen(false);
      closeTimeoutRef.current = null;
    }, CLOSE_DELAY_MS);
  }, [cancelScheduledClose]);

  const openMenu = React.useCallback(() => {
    cancelScheduledClose();
    setOpen(true);
  }, [cancelScheduledClose]);

  const setRefs = React.useCallback(
    (node: HTMLLIElement | null) => {
      containerRef.current = node;
      if (typeof ref === "function") {
        ref(node);
        return;
      }
      if (ref) {
        ref.current = node;
      }
    },
    [ref],
  );

  React.useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      const target = event.target as Node;
      if (!containerRef.current?.contains(target)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  React.useEffect(() => {
    return () => {
      cancelScheduledClose();
    };
  }, [cancelScheduledClose]);

  return (
    <NavigationMenuItemContext.Provider value={{ open, setOpen, openMenu, scheduleClose, cancelScheduledClose, triggerId, contentId }}>
      <li
        ref={setRefs}
        className={cn("relative", className)}
        onMouseEnter={cancelScheduledClose}
        onMouseLeave={(event) => {
          onMouseLeave?.(event);
          if (!event.defaultPrevented) {
            scheduleClose();
          }
        }}
        {...props}
      />
    </NavigationMenuItemContext.Provider>
  );
});
NavigationMenuItem.displayName = "NavigationMenuItem";

const NavigationMenuTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(({ className, children, onClick, onMouseEnter, onFocus, onMouseLeave, onBlur, ...props }, ref) => {
  const { open, setOpen, openMenu, scheduleClose, triggerId, contentId } = useNavigationMenuItemContext();

  return (
    <button
      ref={ref}
      id={triggerId}
      type="button"
      data-state={open ? "open" : "closed"}
      aria-expanded={open}
      aria-controls={contentId}
      className={cn(
        "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
        className,
      )}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          setOpen((current) => !current);
        }
      }}
      onMouseEnter={(event) => {
        onMouseEnter?.(event);
        if (!event.defaultPrevented) {
          openMenu();
        }
      }}
      onMouseLeave={(event) => {
        onMouseLeave?.(event);
        if (!event.defaultPrevented) {
          scheduleClose();
        }
      }}
      onFocus={(event) => {
        onFocus?.(event);
        if (!event.defaultPrevented) {
          openMenu();
        }
      }}
      onBlur={(event) => {
        onBlur?.(event);
        if (!event.defaultPrevented) {
          scheduleClose();
        }
      }}
      {...props}
    >
      {children}
      <ChevronDown
        className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </button>
  );
});
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

const NavigationMenuContent = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof motion.div>>(({ className, onMouseEnter, onMouseLeave, ...props }, ref) => {
  const { open, openMenu, scheduleClose, cancelScheduledClose, triggerId, contentId } = useNavigationMenuItemContext();

  return (
    <MotionConfig transition={{ type: "spring", stiffness: 380, damping: 30, mass: 0.5 }}>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={ref}
            id={contentId}
            role="menu"
            aria-labelledby={triggerId}
            data-state="open"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            onMouseEnter={(event) => {
              onMouseEnter?.(event);
              if (!event.defaultPrevented) {
                cancelScheduledClose();
                openMenu();
              }
            }}
            onMouseLeave={(event) => {
              onMouseLeave?.(event);
              if (!event.defaultPrevented) {
                scheduleClose();
              }
            }}
            className={cn(
              "left-0 top-0 mt-2 w-full rounded-xl border border-border bg-background p-1 shadow-xl ring-1 ring-black/5 dark:ring-white/10 md:absolute md:left-1/2 md:top-full md:w-auto md:-translate-x-1/2",
              className,
            )}
            {...props}
          />
        )}
      </AnimatePresence>
    </MotionConfig>
  );
});
NavigationMenuContent.displayName = "NavigationMenuContent";

const NavigationMenuLink = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(({ className, ...props }, ref) => (
  <a ref={ref} className={className} {...props} />
));
NavigationMenuLink.displayName = "NavigationMenuLink";

const NavigationMenuViewport = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("absolute left-0 top-full flex justify-center", className)} {...props} />
));
NavigationMenuViewport.displayName = "NavigationMenuViewport";

const NavigationMenuIndicator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden", className)} {...props}>
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </div>
));
NavigationMenuIndicator.displayName = "NavigationMenuIndicator";

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
}
