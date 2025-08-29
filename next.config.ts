import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    // Disable ESLint during builds to skip styling warnings
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
