import Image from "next/image";
import Link from "next/link";

import { FaTwitter, FaYoutube, FaGithub, FaDiscord, FaSpotify } from "react-icons/fa";
import config from "~/config";

export default function Footer() {
    return <footer className="bg-white rounded-lg shadow my-4 mx-6 dark:bg-background-3">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© Copyright {new Date().getFullYear()} {config.meta.siteName}. All rights reserved.</span>
            <ul className="flex flex-wrap items-center mt-1 space-x-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                <Link aria-label={"GitHub"} href={"https://github.com/jakemcquade"}><FaGithub className="w-5 h-5 hover:fill-gray-400 transition-config.theme.status.colors" /></Link>
                <Link aria-label={"Discord"} href={"https://discord.com/users/1292290091108274219"}><FaDiscord className="w-5 h-5 hover:fill-blue-600 transition-config.theme.status.colors" /></Link>
                <Link aria-label={"YouTube"} href={"https://www.youtube.com/@JakeMcQuade"}><FaYoutube className="w-5 h-5 hover:fill-red-400 transition-config.theme.status.colors" /></Link>
            </ul>
        </div>
    </footer>
}