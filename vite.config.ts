
import { defineConfig } from "vite";
import vinext from "vinext";
import rsc from "@vitejs/plugin-rsc";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
    build: {
        sourcemap: true,
        // Enable sourcemaps for better error reporting
},
    plugins: [
        vinext(),
      cloudflare({
      viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
    }),
  ],
})
