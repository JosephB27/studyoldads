import type { MetadataRoute } from "next";
import { ads } from "@/data/ads";

const BASE = "https://studyoldads.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const home: MetadataRoute.Sitemap[number] = {
    url: BASE,
    changeFrequency: "weekly",
    priority: 1,
  };

  const adPages: MetadataRoute.Sitemap = ads.map((ad) => ({
    url: `${BASE}/ad/${ad.id}`,
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  return [home, ...adPages];
}
