import type { Ad } from "@/data/ads";

export const SITE_URL = "https://studyoldads.com";

type JsonLd = Record<string, unknown>;

/**
 * Render one or more JSON-LD objects as a single <script> tag. Stringify is
 * XSS-hardened by escaping `<` per the Next.js JSON-LD guidance.
 */
export function jsonLdScript(data: JsonLd | JsonLd[]) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/** BreadcrumbList from an ordered list of { name, url } crumbs. */
export function breadcrumbJsonLd(crumbs: { name: string; url: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

/** A CollectionPage whose mainEntity is an ordered ItemList of ad page URLs. */
export function collectionJsonLd({
  name,
  url,
  items,
}: {
  name: string;
  url: string;
  items: Ad[];
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    url,
    isPartOf: { "@type": "WebSite", name: "study old ads", url: SITE_URL },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((ad, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/ad/${ad.id}`,
        name: `${ad.brand}: ${ad.title}`,
      })),
    },
  };
}

/** WebSite + Organization for the homepage (enables sitelinks search box). */
export function siteJsonLd(): JsonLd[] {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "study old ads",
      url: SITE_URL,
      description:
        "A curated research gallery of vintage vertical print advertisements.",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "study old ads",
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
    },
  ];
}
