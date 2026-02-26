/**
 * Next.js configuration.
 *
 * Rewrites proxy /api requests to the Express backend so the frontend
 * can call /api/* without worrying about CORS during development.
 * Update `destination` if you change BACKEND_PORT in .env.
 */

import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  turbopack: {
    root: path.resolve(import.meta.dirname, ".."),
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:4000/api/:path*",
      },
    ];
  },
};

export default nextConfig;
