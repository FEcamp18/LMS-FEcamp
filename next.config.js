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
  // For dynamic rendering across all pages
  output: 'standalone',
  experimental: {
    // Modern way to handle dynamic features
    serverActions: {
      bodySizeLimit: '4mb'
    },
  }
};

export default config;
