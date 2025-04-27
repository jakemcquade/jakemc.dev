import { twMerge } from "tailwind-merge";
import { ClassValue, Options } from "~/types";

export const getBaseUrl = () => process.env.NEXT_PUBLIC_SITE ?? "http://localhost:3000";
export const getCanonicalUrl = (...pages: string[]) => `${getBaseUrl()}/${pages.join("/")}`;

export const clsx = (...args: ClassValue[]) => args.map(flattenClass).filter(Boolean).join(" ");
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export function cva(base: string, options: Options) {
	return function (props: { [key: string]: string | undefined }) {
		const { variants, defaultVariants } = options;
		let classes = base;

		for (const variant in variants) {
			const value = props[variant] || defaultVariants[variant];
			if (value && variants[variant]?.[value]) {
				classes += ` ${variants[variant]?.[value]}`;
			}
		}

		if (props.className) {
			classes += ` ${props.className}`;
		}

		return classes;
	};
}

function flattenClass(mix: ClassValue): string | number {
	if (typeof mix === "string" || typeof mix === "number") {
		return mix;
	}

	if (Array.isArray(mix)) {
		return mix.map(flattenClass).filter(Boolean).join(" ");
	}

	if (typeof mix === "object" && mix !== null) {
		return Object.keys(mix)
			.filter(key => mix[key])
			.join(" ");
	}

	return "";
}

export function formatDate(date: string) {
  const currentDate = new Date().getTime();
  if (!date.includes("T")) date = `${date}T00:00:00`;

  const targetDate = new Date(date).getTime();
  const timeDifference = Math.abs(currentDate - targetDate);
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const fullDate = new Date(date).toLocaleString("en-us", { month: "long", day: "numeric", year: "numeric" });

  if (daysAgo < 1) {
    return "Today";
  } else if (daysAgo < 7) {
    return `${fullDate} (${daysAgo}d ago)`;
  } else if (daysAgo < 30) {
    const weeksAgo = Math.floor(daysAgo / 7);
    return `${fullDate} (${weeksAgo}w ago)`;
  } else if (daysAgo < 365) {
    const monthsAgo = Math.floor(daysAgo / 30);
    return `${fullDate} (${monthsAgo}mo ago)`;
  } else {
    const yearsAgo = Math.floor(daysAgo / 365);
    return `${fullDate} (${yearsAgo}y ago)`;
  }
}
