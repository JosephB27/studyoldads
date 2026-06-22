import type { MetadataRoute } from "next";

const BASE = "https://studyoldads.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /curate is an internal authoring tool, not public content.
      disallow: ["/curate", "/api/"],
    },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
