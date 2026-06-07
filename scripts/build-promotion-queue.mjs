import fs from "node:fs/promises";
import path from "node:path";
import { readAds } from "./read-ads.mjs";

const discoveryDir = path.join(process.cwd(), "data", "discovery");
const curationPath = path.join(process.cwd(), "data", "curation", "decisions.json");
const outputJson = path.join(process.cwd(), "data", "curation", "promotion-queue.json");
const outputMd = path.join(process.cwd(), "data", "curation", "promotion-queue.md");

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
];

const ads = await readAds();
const promotedImageUrls = new Set(ads.map((ad) => ad.image));
const promotedPageUrls = new Set(
  ads.flatMap((ad) => [ad.source, ...ad.links.map((link) => link.href)]),
);

const decisions = await readDecisions();
const candidates = await readCandidates();
const keepIds = new Set(
  Object.entries(decisions.decisions)
    .filter(([, decision]) => decision === "keep")
    .map(([id]) => id),
);

const queue = candidates
  .filter((candidate) => keepIds.has(candidate.id))
  .filter((candidate) => !candidate.alreadyInWall)
  .sort((a, b) => b.score - a.score);

const result = {
  generatedAt: new Date().toISOString(),
  sourceDecisionFile: path.relative(process.cwd(), curationPath),
  keepCount: keepIds.size,
  publishableCount: queue.length,
  skippedAlreadyInWall: candidates.filter(
    (candidate) => keepIds.has(candidate.id) && candidate.alreadyInWall,
  ).length,
  candidates: queue,
};

await fs.mkdir(path.dirname(outputJson), { recursive: true });
await fs.writeFile(outputJson, `${JSON.stringify(result, null, 2)}\n`);
await fs.writeFile(outputMd, renderMarkdown(result));

console.log(
  `Promotion queue built: ${result.publishableCount} candidates from ${result.keepCount} keep decisions.`,
);
console.log(`JSON: ${outputJson}`);
console.log(`Report: ${outputMd}`);

async function readDecisions() {
  try {
    return JSON.parse(await fs.readFile(curationPath, "utf8"));
  } catch {
    return { updatedAt: null, decisions: {} };
  }
}

async function readCandidates() {
  const byImage = new Map();

  for (const file of await getDiscoveryFiles()) {
    const fullPath = path.join(discoveryDir, file);

    if (!(await exists(fullPath))) {
      continue;
    }

    const parsed = JSON.parse(await fs.readFile(fullPath, "utf8"));

    for (const candidate of parsed.candidates ?? []) {
      const imageUrl = candidate.image?.url ?? "";
      const pageUrl = candidate.page?.url ?? "";
      const haystack = `${imageUrl} ${pageUrl}`.toLowerCase();

      if (!imageUrl || weakSignals.some((signal) => haystack.includes(signal))) {
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
          promotedImageUrls.has(imageUrl) || promotedPageUrls.has(pageUrl),
        promotionChecklist: [
          "Open source and image; confirm this is a real period print ad, not a remake or shop poster.",
          "Find year, campaign context, brand, agency/designer if available.",
          "Download a local image copy into public/ads/discovered/ with a stable filename.",
          "Write a minimal, descriptive description and builder lesson before adding to ads.ts.",
          "Run validate:corpus, validate:urls, lint, and build.",
        ],
      });
    }
  }

  return [...byImage.values()].sort((a, b) => b.score - a.score);
}

async function exists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

async function getDiscoveryFiles() {
  if (!(await exists(discoveryDir))) {
    return [];
  }

  const files = (await fs.readdir(discoveryDir)).filter((file) =>
    file.endsWith(".json"),
  );

  return files.sort(asyncSortDiscoveryFiles);
}

function asyncSortDiscoveryFiles(a, b) {
  const priorityDifference = priorityScore(a) - priorityScore(b);

  if (priorityDifference !== 0) {
    return priorityDifference;
  }

  return b.localeCompare(a);
}

function priorityScore(file) {
  const index = priorityReports.indexOf(file);

  if (index >= 0) {
    return index;
  }

  if (file.startsWith("firecrawl-")) {
    return priorityReports.length;
  }

  return priorityReports.length + 1;
}

function renderMarkdown(result) {
  const lines = [
    "# Promotion Queue",
    "",
    `Generated: ${result.generatedAt}`,
    `Keep decisions: ${result.keepCount}`,
    `Ready for promotion review: ${result.publishableCount}`,
    `Skipped because already in wall: ${result.skippedAlreadyInWall}`,
    "",
  ];

  if (result.candidates.length === 0) {
    lines.push(
      "No kept candidates are ready to promote yet.",
      "",
      "Open `/curate`, mark promising cards as `Keep`, click `Save shared`, then run `npm run queue:promotions` again.",
      "",
    );
    return `${lines.join("\n")}\n`;
  }

  for (const [index, candidate] of result.candidates.entries()) {
    lines.push(
      `## ${index + 1}. ${candidate.pageTitle}`,
      "",
      `- Score: ${candidate.score}`,
      `- Candidate ID: \`${candidate.id}\``,
      `- Query: ${candidate.query || "n/a"}`,
      `- Source: ${candidate.pageUrl}`,
      `- Image: ${candidate.imageUrl}`,
      `- Alt/title: ${candidate.alt || "n/a"}`,
      `- Reasons: ${candidate.reasons.join("; ") || "n/a"}`,
      "",
      "Promotion checklist:",
      "",
      ...candidate.promotionChecklist.map((item) => `- [ ] ${item}`),
      "",
    );
  }

  return `${lines.join("\n")}\n`;
}

function normalizeImageUrl(url) {
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

function stableId(input) {
  let hash = 0;

  for (let index = 0; index < input.length; index += 1) {
    hash = (hash * 31 + input.charCodeAt(index)) >>> 0;
  }

  return `candidate-${hash.toString(36)}`;
}
