import fs from "node:fs";
import path from "node:path";
import { ads } from "@/data/ads";

export type CurateCandidate = {
  id: string;
  score: number;
  pageTitle: string;
  pageUrl: string;
  query: string;
  imageUrl: string;
  alt: string;
  reasons: string[];
  sourceFile: string;
  alreadyInWall: boolean;
};

type DiscoveryCandidate = {
  score?: number;
  reasons?: string[];
  page?: {
    title?: string;
    url?: string;
    query?: string;
  };
  image?: {
    url?: string;
    alt?: string;
    title?: string;
  };
};

type DiscoveryFile = {
  candidates?: DiscoveryCandidate[];
};

const priorityReports = [
  "firecrawl-amazing-lux-tech.json",
  "firecrawl-amazing-auto.json",
  "firecrawl-ddb-auto.json",
  "firecrawl-porsche.json",
];

const weakSignals = [
  "ebay.",
  "alamy.com",
  "worthpoint.com",
  "marketplace",
  "newsletter",
  "subscribe",
  "counter",
  "base64-image-removed",
  "wide image ratio",
  "autohistorypreservationsociety",
  "indieauto.org",
  "swiped.co",
  "creativebloq.com/inspiration/print-ads",
  "newspaper",
  "magazine page",
  "thumb.png",
  "-thumb",
];

const promotedSourceUrls = new Set(ads.map((ad) => ad.image));
const promotedPageUrls = new Set(
  ads.flatMap((ad) => [ad.source, ...ad.links.map((link) => link.href)]),
);

export function getCurateCandidates(): CurateCandidate[] {
  const discoveryDir = path.join(process.cwd(), "data", "discovery");
  const files = getDiscoveryFiles(discoveryDir);
  const byImage = new Map<string, CurateCandidate>();

  for (const file of files) {
    const parsed = JSON.parse(
      fs.readFileSync(path.join(discoveryDir, file), "utf8"),
    ) as DiscoveryFile;

    for (const candidate of parsed.candidates ?? []) {
      const imageUrl = candidate.image?.url ?? "";
      const pageUrl = candidate.page?.url ?? "";

      if (
        !imageUrl ||
        weakSignals.some((signal) =>
          `${imageUrl} ${pageUrl}`.toLowerCase().includes(signal),
        )
      ) {
        continue;
      }

      const normalized = normalizeImageUrl(imageUrl);
      const score = candidate.score ?? 0;
      const existing = byImage.get(normalized);

      if (existing && existing.score >= score) {
        continue;
      }

      byImage.set(normalized, {
        id: stableId(`${pageUrl}-${normalized}`),
        score,
        pageTitle: candidate.page?.title ?? "Untitled",
        pageUrl,
        query: candidate.page?.query ?? "",
        imageUrl,
        alt: candidate.image?.alt || candidate.image?.title || "",
        reasons: candidate.reasons ?? [],
        sourceFile: file,
        alreadyInWall:
          promotedSourceUrls.has(imageUrl) || promotedPageUrls.has(pageUrl),
      });
    }
  }

  return [...byImage.values()]
    .sort(
      (a, b) =>
        Number(a.alreadyInWall) - Number(b.alreadyInWall) || b.score - a.score,
    )
    .slice(0, 80);
}

function getDiscoveryFiles(discoveryDir: string) {
  if (!fs.existsSync(discoveryDir)) {
    return [];
  }

  const files = fs
    .readdirSync(discoveryDir)
    .filter((file) => file.endsWith(".json"));

  return files.sort((a, b) => {
    const priorityDifference = priorityScore(a) - priorityScore(b);

    if (priorityDifference !== 0) {
      return priorityDifference;
    }

    const aTime = fs.statSync(path.join(discoveryDir, a)).mtimeMs;
    const bTime = fs.statSync(path.join(discoveryDir, b)).mtimeMs;
    return bTime - aTime;
  });
}

function priorityScore(file: string) {
  const index = priorityReports.indexOf(file);

  if (index >= 0) {
    return index;
  }

  if (file.startsWith("firecrawl-")) {
    return priorityReports.length;
  }

  return priorityReports.length + 1;
}

function normalizeImageUrl(url: string) {
  try {
    const parsed = new URL(url);
    parsed.searchParams.delete("width");
    parsed.searchParams.delete("quality");
    parsed.searchParams.delete("resize");
    parsed.searchParams.delete("ssl");
    parsed.searchParams.delete("w");
    parsed.searchParams.delete("q");
    return parsed.href;
  } catch {
    return url;
  }
}

function stableId(input: string) {
  let hash = 0;

  for (let index = 0; index < input.length; index += 1) {
    hash = (hash * 31 + input.charCodeAt(index)) >>> 0;
  }

  return `candidate-${hash.toString(36)}`;
}
