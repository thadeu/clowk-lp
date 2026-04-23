import { createMDX } from 'fumadocs-mdx/next';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.2.137'],
  output: 'export',
  images: { unoptimized: true },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
