"use client";

import NextImage from "next/image";
import * as React from "react";

import { cn } from "~/lib/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
	src?: string;
	alt?: string;
	fallback?: React.ReactNode;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(({ src, alt, fallback, className, ...props }, ref) => {
	const [imgError, setImgError] = React.useState(false);

	return (
		<div ref={ref} className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)} {...props}>
			{src && !src.includes("null") && !src.includes("undefined") && !imgError ? (
				<NextImage src={src} alt={alt ?? ""} className={"aspect-square"} fill={true} onError={() => setImgError(true)} />
			) : (
				<div className={cn("bg-muted flex h-full w-full items-center justify-center rounded-full text-lg font-medium", className)} style={{ color: "rgba(240,240,255,0.5)" }}>
					{fallback}
				</div>
			)}
		</div>
	);
});

Avatar.displayName = "Avatar";
export default Avatar;
