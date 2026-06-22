import type { MetadataRoute } from "next";
import { ads, categories, decades } from "@/data/ads";

const BASE = "https://studyoldads.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const home: MetadataRoute.Sitemap[number] = {
    url: BASE,
    changeFrequency: "weekly",
    priority: 1,
  };

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/about`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories().map((c) => ({
    url: `${BASE}/category/${c.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const decadePages: MetadataRoute.Sitemap = decades().map((d) => ({
    url: `${BASE}/decade/${d.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const adPages: MetadataRoute.Sitemap = ads.map((ad) => ({
    url: `${BASE}/ad/${ad.id}`,
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  return [home, ...staticPages, ...categoryPages, ...decadePages, ...adPages];
}
