import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/_/u.js",
        destination: "https://umami.vellapps.dev/script.js",
      },
      {
        source: "/_/u/api/send",
        destination: "https://umami.vellapps.dev/api/send",
      },
    ];
  },
};

export default nextConfig;
