/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['media.graphassets.com'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'urchin-app-2-5mn4h.ondigitalocean.app',
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
