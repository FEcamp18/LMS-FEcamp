/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

// /** @type {import("next").NextConfig} */
// const config = {};

// export default config;

/** @type {import("next").NextConfig} */
const config = {
  output: "standalone",
  experimental: {
    // Modern way to handle dynamic features
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  // Add this to disable symlinks
  skipTrailingSlashRedirect: true,
  skipMiddlewareUrlNormalize: true,
};

export default config;
