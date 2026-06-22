import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve modern formats (AVIF first, WebP fallback) from the optimizer.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
