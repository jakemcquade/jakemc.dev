import Link from "next/link";

import { FaTwitter, FaYoutube, FaGithub, FaDiscord, FaSpotify, FaInstagram } from "react-icons/fa";
import config from "~/config";

const socialClasses = "h-5 w-5 text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400 transition-colors";

export default function Footer() {
  return (
    <footer className="mx-6 my-4 py-6 flex flex-col items-center justify-center gap-2 bg-transparent text-center">
      <p className={"text-base text-gray-500"}>Jake McQuade</p>
      <ul className={"mt-1 flex flex-wrap items-center justify-center space-x-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0"}>
        {config.socials.map((social, i) => (
            <Link key={i} className={"text-white"} aria-label={social.label} href={social.href}>
            {social.label.toLowerCase() === "github" ? (
              <FaGithub className={socialClasses} />
            ) : social.label.toLowerCase() === "discord" ? (
              <FaDiscord className={socialClasses} />
            ) : social.label.toLowerCase() === "youtube" ? (
              <FaYoutube className={socialClasses} />
            ) : social.label.toLowerCase() === "twitter" ? (
              <FaTwitter className={socialClasses} />
            ) : social.label.toLowerCase() === "instagram" ? (
              <FaInstagram className={socialClasses} />
            ) : social.label.toLowerCase() === "spotify" ? (
              <FaSpotify className={socialClasses} />
            ) : null}
            </Link>
        ))}
      </ul>
    </footer>
  );
}
