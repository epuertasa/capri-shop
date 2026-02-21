/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/capri-shop',
  assetPrefix: '/capri-shop/',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
