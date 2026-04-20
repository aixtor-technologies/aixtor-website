import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "172.16.1.159",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
