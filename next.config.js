/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["media.graphassets.com"],
  },
  /*
  async redirects() {
    return [
      {
        source: "/old-route",
        destination: "/home",
        permanent: true,
      },
      // ... oter redirections
    ];
  },
  experimental: {
    appDir: true,
  },*/
};

module.exports = nextConfig;
