import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";
import config from "./src/config.js";

export default defineConfig({
  site: config.meta.site,
  output: "server",
  adapter: cloudflare({ imageService: "compile", prerenderEnvironment: "node" }),
  compressHTML: true,
  image: {
    domains: ["disping.xyz", "raw.githubusercontent.com"],
  },
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "~": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  },
});