import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";
import { fileURLToPath } from "node:url";
import config from "./src/config.js";

export default defineConfig({
  site: config.meta.site,
  output: "server",
  adapter: cloudflare({ imageService: "compile" }),
  image: {
    domains: ["disping.xyz", "raw.githubusercontent.com"],
  },
  integrations: [react()],
  vite: {
    resolve: {
      alias: {
        "~": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  },
});