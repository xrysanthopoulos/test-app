const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos', 's3-alpha-sig.figma.com'],
  },
  async headers() {
    return [
      {
        // Cache all assets (including API routes) for 1 hour
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
