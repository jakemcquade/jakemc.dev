import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) };
export const getBaseUrl = () => process.env.NEXT_PUBLIC_SITE ?? "http://localhost:3000";
export const getCanonicalUrl = (...pages: string[]) => `${getBaseUrl()}/${pages.join("/")}`;
export function formToJSON(formData: FormData) {
    const object: { [key: string]: unknown } = {};
    formData.forEach((value, key) => { object[key as string] = value; });

    return object;
};
