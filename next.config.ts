import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
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
