import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "study old ads",
    short_name: "study old ads",
    description:
      "A curated research gallery of vintage vertical print advertisements.",
    start_url: "/",
    display: "standalone",
    background_color: "#e9dfca",
    theme_color: "#e9dfca",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
