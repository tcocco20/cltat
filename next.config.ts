import type { NextConfig } from "next";
import { NODE_ENV, WP_APP_URL } from "./lib/constants";

const isProd = NODE_ENV === "production";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: isProd ? "https" : "http",
        hostname: WP_APP_URL,
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
