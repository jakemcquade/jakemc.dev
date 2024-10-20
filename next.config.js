/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  env: { NEXT_TELEMETRY_DISABLED: "1" },
  images: {
    domains: ["raw.githubusercontent.com"],
  }
};

export default config;
