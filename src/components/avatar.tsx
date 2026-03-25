"use client";

import * as React from "react";

import { cn } from "~/lib/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
	src?: string;
	alt?: string;
	fallback?: React.ReactNode;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(({ src, alt, fallback, className, ...props }, ref) => {
	const [imgError, setImgError] = React.useState(false);

	React.useEffect(() => {
		setImgError(false);
	}, [src]);

	const fallbackContent = fallback ?? alt?.trim()?.charAt(0)?.toUpperCase() ?? "?";

	return (
		<div
			ref={ref}
			className={cn(
				"relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-linear-to-br from-zinc-100 to-zinc-200 ring-1 ring-black/10 shadow-sm dark:from-zinc-800 dark:to-zinc-900 dark:ring-white/15",
				className,
			)}
			{...props}
		>
			{src && !src.includes("null") && !src.includes("undefined") && !imgError ? (
				<img src={src} alt={alt ?? ""} className={"h-full w-full object-cover"} onError={() => setImgError(true)} loading={"eager"} fetchPriority={"high"} decoding={"async"} width={40} height={40} />
			) : (
				<div className={"flex h-full w-full items-center justify-center rounded-full bg-linear-to-br from-zinc-100 to-zinc-200 text-[0.8rem] font-semibold text-zinc-700 dark:from-zinc-800 dark:to-zinc-900 dark:text-zinc-200"}>
					{fallbackContent}
				</div>
			)}
		</div>
	);
});

Avatar.displayName = "Avatar";
export default Avatar;
