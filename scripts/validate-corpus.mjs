import { readAds } from "./read-ads.mjs";

const ads = await readAds();

const failures = [];
const ids = new Set();
const requiredTextFields = [
  "id",
  "brand",
  "title",
  "year",
  "period",
  "category",
  "image",
  "source",
  "sourceLabel",
  "rights",
  "origin",
  "description",
  "lesson",
];

function fail(ad, message) {
  failures.push(`${ad?.id ?? "unknown"}: ${message}`);
}

for (const ad of ads) {
  if (ids.has(ad.id)) {
    fail(ad, "duplicate id");
  }

  ids.add(ad.id);

  for (const field of requiredTextFields) {
    if (typeof ad[field] !== "string" || ad[field].trim().length === 0) {
      fail(ad, `missing ${field}`);
    }
  }

  if (!/^\d{4}$/.test(ad.year)) {
    fail(ad, "year must be a 4-digit string");
  }

  if (!ad.image.startsWith("https://") && !ad.image.startsWith("/")) {
    fail(ad, "image must be an https URL or local public path");
  }

  if (!ad.source.startsWith("https://")) {
    fail(ad, "source must be an https URL");
  }

  if (!["vertical", "near-vertical"].includes(ad.dimensions)) {
    fail(ad, "dimensions must be vertical or near-vertical");
  }

  if (!["seeded", "verified"].includes(ad.researchStatus)) {
    fail(ad, "researchStatus must be seeded or verified");
  }

  if (!Array.isArray(ad.links) || ad.links.length === 0) {
    fail(ad, "needs at least one research link");
  } else {
    for (const link of ad.links) {
      if (!link.label || !link.href?.startsWith("https://")) {
        fail(ad, "all research links need a label and https href");
      }
    }
  }

  if (!Array.isArray(ad.palette) || ad.palette.length !== 3) {
    fail(ad, "palette must contain exactly 3 colors");
  }

  if (!Array.isArray(ad.tags) || ad.tags.length < 2) {
    fail(ad, "needs at least 2 tags");
  }

  if (ad.description.length < 90) {
    fail(ad, "description is too thin");
  }

  if (ad.lesson.length < 24) {
    fail(ad, "lesson is too thin");
  }
}

if (ads.length < 14) {
  failures.push(`corpus: expected at least 14 ads, found ${ads.length}`);
}

if (failures.length > 0) {
  console.error("Corpus validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

const verifiedCount = ads.filter((ad) => ad.researchStatus === "verified").length;
const seededCount = ads.filter((ad) => ad.researchStatus === "seeded").length;

console.log(
  `Corpus validation passed: ${ads.length} ads (${verifiedCount} verified, ${seededCount} seeded).`,
);
