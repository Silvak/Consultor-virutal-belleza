/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
