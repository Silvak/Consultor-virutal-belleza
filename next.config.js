/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'virtual--belleza-backend-mb2wm.ondigitalocean.app',
				port: '',
				pathname: '/api/v1/files/**',
			},
		],
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
