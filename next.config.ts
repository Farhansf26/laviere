import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'lh3.googleusercontent.com',
        protocol: 'https',
      },
      {
        protocol: "https",
        hostname: `${process.env.UPLOADTHING_APP_ID}.ufs.sh`,
        pathname: "/f/*",
      },
    ]
  },
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
