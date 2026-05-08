import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      // {
      //   protocol: "http",
      //   hostname: "172.16.1.131",
      //   port: "",
      //   pathname: "/**",
      // },
      {
        protocol: "https",
        hostname: "dev.aixtor.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
