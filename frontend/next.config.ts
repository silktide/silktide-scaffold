/**
 * Next.js configuration.
 *
 * Rewrites proxy /api requests to the Express backend so the frontend
 * can call /api/* without worrying about CORS during development.
 * BACKEND_PORT is set automatically by start-dev.js (random port per app).
 */

import type { NextConfig } from "next";
import path from "node:path";

const backendPort = process.env.BACKEND_PORT || "4000";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  turbopack: {
    root: path.resolve(import.meta.dirname, ".."),
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `http://localhost:${backendPort}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
