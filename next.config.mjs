/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Edge runtime で Node.js ポリフィルを使わない
    nodePolyfills: false,
  },
};

export default nextConfig;
