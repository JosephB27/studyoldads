import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve modern formats (AVIF first, WebP fallback) from the optimizer.
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },
  // PostHog API endpoints use trailing slashes; don't redirect them away.
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
