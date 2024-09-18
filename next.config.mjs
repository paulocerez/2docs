/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname:
          "/a/ACg8ocLz8-2cZxCU8KItod_2AUEC2P99I8NVHkIvpGmGgT81KqLKlA=s96-c",
      },
    ],
    domains: ["lh3.googleusercontent.com"],
  },
};

export default nextConfig;
