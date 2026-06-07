import fs from "node:fs/promises";
import path from "node:path";
import { readAds } from "./read-ads.mjs";

const ads = await readAds();
const outputJson = path.join(process.cwd(), "data", "curation", "corpus-audit.json");
const outputMd = path.join(process.cwd(), "data", "curation", "corpus-audit.md");

const audit = {
  generatedAt: new Date().toISOString(),
  total: ads.length,
  verified: ads.filter((ad) => ad.researchStatus === "verified").length,
  seeded: ads.filter((ad) => ad.researchStatus === "seeded").length,
  localImages: ads.filter((ad) => ad.image.startsWith("/")).length,
  remoteImages: ads.filter((ad) => ad.image.startsWith("https://")).length,
  publicWall: ads.map(auditAd),
};

await fs.mkdir(path.dirname(outputJson), { recursive: true });
await fs.writeFile(outputJson, `${JSON.stringify(audit, null, 2)}\n`);
await fs.writeFile(outputMd, renderMarkdown(audit));

console.log(
  `Corpus audit built: ${audit.total} ads (${audit.verified} verified, ${audit.seeded} seeded).`,
);
console.log(`JSON: ${outputJson}`);
console.log(`Report: ${outputMd}`);

function auditAd(ad) {
  const issues = [];

  if (ad.researchStatus === "seeded") {
    issues.push("needs second-source verification");
  }

  if (ad.source.includes("fxtwitter.com")) {
    issues.push("source is social seed mirror");
  }

  if (ad.links.length < 2 && ad.researchStatus !== "verified") {
    issues.push("needs another research link");
  }

  if (!/\b(19|20)\d{2}\b/.test(`${ad.year} ${ad.period} ${ad.origin}`)) {
    issues.push("year context is thin");
  }

  if (ad.description.length < 130) {
    issues.push("description could carry more context");
  }

  return {
    id: ad.id,
    brand: ad.brand,
    title: ad.title,
    year: ad.year,
    status: ad.researchStatus,
    sourceLabel: ad.sourceLabel,
    linkCount: ad.links.length,
    image: ad.image,
    issues,
  };
}

function renderMarkdown(result) {
  const lines = [
    "# Corpus Audit",
    "",
    `Generated: ${result.generatedAt}`,
    "",
    `- Public ads: ${result.total}`,
    `- Verified: ${result.verified}`,
    `- Seeded: ${result.seeded}`,
    `- Local images: ${result.localImages}`,
    `- Remote images: ${result.remoteImages}`,
    "",
    "## Verification Backlog",
    "",
  ];

  const backlog = result.publicWall.filter((ad) => ad.issues.length > 0);

  if (backlog.length === 0) {
    lines.push("No public-wall audit issues found.", "");
  } else {
    for (const ad of backlog) {
      lines.push(
        `### ${ad.brand} — ${ad.title} (${ad.year})`,
        "",
        `- ID: \`${ad.id}\``,
        `- Status: ${ad.status}`,
        `- Source: ${ad.sourceLabel}`,
        `- Links: ${ad.linkCount}`,
        `- Issues: ${ad.issues.join("; ")}`,
        "",
      );
    }
  }

  lines.push(
    "## Verified Wall Entries",
    "",
    ...result.publicWall
      .filter((ad) => ad.status === "verified")
      .map((ad) => `- ${ad.brand} — ${ad.title} (${ad.year})`),
    "",
  );

  return `${lines.join("\n")}\n`;
}
