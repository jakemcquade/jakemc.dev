"use client";

import { AnimatePresence, MotionConfig, motion } from "motion/react";
import * as React from "react";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

import { cn } from "~/lib/utils";

type Side = "top" | "bottom" | "left" | "right";
type Align = "start" | "center" | "end";

interface PopoverContextValue {
	open: boolean;
	setOpen: (open: boolean) => void;
	triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

function usePopover() {
	const ctx = useContext(PopoverContext);
	if (!ctx) throw new Error("Popover components must be used within <Popover>");
	return ctx;
}

/* ─── Root ─── */

interface PopoverProps {
	children: React.ReactNode;
	defaultOpen?: boolean;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}

function Popover({ children, defaultOpen = false, open: controlledOpen, onOpenChange }: PopoverProps) {
	const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
	const triggerRef = useRef<HTMLButtonElement>(null);

	const open = controlledOpen ?? uncontrolledOpen;
	const setOpen = useCallback(
		(next: boolean) => {
			if (controlledOpen === undefined) setUncontrolledOpen(next);
			onOpenChange?.(next);
		},
		[controlledOpen, onOpenChange],
	);

	return <PopoverContext.Provider value={{ open, setOpen, triggerRef }}>{children}</PopoverContext.Provider>;
}

/* ─── Trigger ─── */

interface PopoverTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	asChild?: boolean;
}

function PopoverTrigger({ className, children, asChild, ...props }: PopoverTriggerProps) {
	const { open, setOpen, triggerRef } = usePopover();

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		props.onClick?.(event);
		if (!event.defaultPrevented) setOpen(!open);
	};

	if (asChild && React.isValidElement(children)) {
		const child = children as React.ReactElement<React.ButtonHTMLAttributes<HTMLButtonElement>>;
		const childProps = child.props as React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string };

		return React.cloneElement(child, {
			...props,
			...childProps,
			ref: triggerRef,
			type: childProps.type ?? "button",
			"aria-expanded": open,
			"data-state": open ? "open" : "closed",
			className: cn("modal", className, childProps.className),
			onClick: handleClick,
		} as React.ButtonHTMLAttributes<HTMLButtonElement>);
	}

	return (
		<button
			ref={triggerRef}
			type="button"
			aria-expanded={open}
			data-state={open ? "open" : "closed"}
			className={cn("modal", className)}
			onClick={handleClick}
			{...props}
		>
			{children}
		</button>
	);
}

/* ─── Content ─── */

interface PopoverContentProps {
	className?: string;
	children?: React.ReactNode;
	side?: Side;
	align?: Align;
	sideOffset?: number;
}

const sideTransforms: Record<Side, { initial: string; animate: string }> = {
	top: { initial: "translateY(4px)", animate: "translateY(0)" },
	bottom: { initial: "translateY(-4px)", animate: "translateY(0)" },
	left: { initial: "translateX(4px)", animate: "translateX(0)" },
	right: { initial: "translateX(-4px)", animate: "translateX(0)" },
};

function positionClasses(side: Side, align: Align, offset: number): string {
	const classes: string[] = ["absolute", "z-[200]"];

	switch (side) {
		case "bottom":
			classes.push(`top-full mt-[${offset}px]`);
			break;
		case "top":
			classes.push(`bottom-full mb-[${offset}px]`);
			break;
		case "right":
			classes.push(`left-full ml-[${offset}px]`);
			break;
		case "left":
			classes.push(`right-full mr-[${offset}px]`);
			break;
	}

	if (side === "top" || side === "bottom") {
		switch (align) {
			case "start":
				classes.push("left-0");
				break;
			case "center":
				classes.push("left-1/2 -translate-x-1/2");
				break;
			case "end":
				classes.push("right-0");
				break;
		}
	} else {
		switch (align) {
			case "start":
				classes.push("top-0");
				break;
			case "center":
				classes.push("top-1/2 -translate-y-1/2");
				break;
			case "end":
				classes.push("bottom-0");
				break;
		}
	}

	return classes.join(" ");
}

function PopoverContent({ className, children, side = "bottom", align = "center", sideOffset = 8 }: PopoverContentProps) {
	const { open, setOpen, triggerRef } = usePopover();
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!open) return;

		function handleClick(e: MouseEvent) {
			const target = e.target as Node;
			if (contentRef.current?.contains(target) || triggerRef.current?.contains(target)) return;
			setOpen(false);
		}

		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === "Escape") setOpen(false);
		}

		document.addEventListener("mousedown", handleClick);
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("mousedown", handleClick);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [open, setOpen, triggerRef]);

	const transform = sideTransforms[side];

	return (
		<MotionConfig transition={{ type: "tween", ease: "easeInOut", duration: 0.15 }}>
			<AnimatePresence initial={false}>
				{open && (
					<motion.div
						ref={contentRef}
						role="dialog"
						aria-modal="true"
						initial={{ opacity: 0, scale: 0.95, transform: transform.initial }}
						animate={{ opacity: 1, scale: 1, transform: transform.animate }}
						exit={{ opacity: 0, scale: 0.95, transform: transform.initial }}
						className={cn(
							positionClasses(side, align, sideOffset),
							"w-72 rounded-md border border-border bg-background p-4 shadow-md outline-none",
							className,
						)}
					>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</MotionConfig>
	);
}

/* ─── Close ─── */

function PopoverClose({ className, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
	const { setOpen } = usePopover();

	return (
		<button type="button" className={cn("modal", className)} onClick={() => setOpen(false)} {...props}>
			{children}
		</button>
	);
}

Popover.displayName = "Popover";
PopoverTrigger.displayName = "PopoverTrigger";
PopoverContent.displayName = "PopoverContent";
PopoverClose.displayName = "PopoverClose";

export { Popover, PopoverTrigger, PopoverContent, PopoverClose };
