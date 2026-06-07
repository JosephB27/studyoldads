import fs from "node:fs/promises";
import path from "node:path";
import { setTimeout as sleep } from "node:timers/promises";

const outDir = path.join(process.cwd(), "data", "discovery");
const wallQueriesFile = path.join(process.cwd(), "docs", "discovery-queries.txt");
const fallbackQueries = [
  '"iPod" poster "1000 songs"',
  '"Porsche" poster "Nobody\'s Perfect"',
  '"Volvo" witty print poster',
  '"Rolex" poster advertisement photography',
  '"Coca-Cola" vintage poster',
];
const defaultQueries = await readLines(wallQueriesFile).then((lines) =>
  lines.length > 0 ? lines : fallbackQueries,
);
const defaultSeedUrls = [
  "https://www.computerhistory.org/collections/catalog/102637933",
  "https://www.funnyadsclub.com/static-ads/nobodys-perfect",
  "https://www.adslibrary.com/nobody-s-perfect-e5675c06bb7",
  "https://www.digitaltripathi.com/ad-library/daihatsu-hijet-print-ad-picks-up-five-times-more-women-than-a-lamborghini/",
  "https://www.watchcollectinglifestyle.com/home/experience-fourteen-vintage-audemars-piguet-royal-oak-advertisements-from-1972-to-1998",
];

const vibe = {
  positiveTerms: [
    "poster",
    "billboard",
    "campaign",
    "launch",
    "headline",
    "photography",
    "photograph",
    "minimal",
    "graphic",
    "vintage",
    "luxury",
    "watch",
    "porsche",
    "rolex",
    "apple",
    "volvo",
    "bmw",
    "coca-cola",
    "absolut",
    "humor",
    "wit",
  ],
  weakTerms: [
    "etsy",
    "pinterest",
    "redbubble",
    "wallpaper",
    "mockup",
    "template",
    "stock photo",
    "logo",
    "dealer",
    "dealership",
    "newsletter",
    "subscribe",
    "wwdc",
    "wikipedia.org/wiki/",
    "cars.usnews.com",
    "autohistorypreservationsociety",
    "indieauto.org",
    "swiped.co",
    "creativebloq.com/inspiration/print-ads",
    "best print ads",
    "vintag.es",
    "life magazine",
    "newspaper",
    "magazine ad",
    "magazine page",
    "long copy",
    "think small",
    "ogilvy",
    "ddb",
    "thumb.png",
    "-thumb",
  ],
  imageTerms: [
    "poster",
    "campaign",
    "advert",
    "advertisement",
    "print",
    "billboard",
    "porsche",
    "apple",
    "rolex",
    "volvo",
    "bmw",
    "watch",
    "coca",
    "absolut",
  ],
};

const args = parseArgs(process.argv.slice(2));
const limit = Number(args.limit ?? 24);
const pageLimit = Number(args.pages ?? 24);
const minScore = Number(args["min-score"] ?? 25);
const queryLimit = args["max-queries"]
  ? Number(args["max-queries"])
  : Number.POSITIVE_INFINITY;
const useFirecrawl = Boolean(args.firecrawl);
const firecrawlApiKey = process.env.FIRECRAWL_API_KEY;
const queries = args.query
  ? arrayArg(args.query)
  : args.queries
    ? await readLines(args.queries)
    : defaultQueries;
const seedUrls = [
  ...(args["no-default-urls"] ? [] : defaultSeedUrls),
  ...(args.url ? arrayArg(args.url) : []),
];
const timestamp = new Date().toISOString().replaceAll(":", "-").slice(0, 19);
const jsonOut = args.out ?? path.join(outDir, `candidates-${timestamp}.json`);
const mdOut = jsonOut.replace(/\.json$/, ".md");

await fs.mkdir(path.dirname(jsonOut), { recursive: true });

const pageUrls = new Map();
for (const url of seedUrls) {
  pageUrls.set(normalizeUrl(url), { url: normalizeUrl(url), query: "seed-url" });
}

for (const query of queries.slice(0, queryLimit)) {
  const results = useFirecrawl
    ? await searchFirecrawl(query, 8)
    : [...(await searchDuckDuckGo(query, 6)), ...(await searchBing(query, 8))];
  for (const result of results) {
    if (!pageUrls.has(result.url)) {
      pageUrls.set(result.url, { ...result, query });
    }
  }
  await sleep(800);
}

const pages = [];
for (const page of [...pageUrls.values()].slice(0, pageLimit)) {
  try {
    const crawled = await crawlPage(page);
    if (crawled) pages.push(crawled);
  } catch (error) {
    console.warn(`Skipping ${page.url}: ${error.message}`);
  }
  await sleep(500);
}

const candidates = [];
for (const page of pages) {
  const images = page.images.slice(0, 16);
  for (const image of images) {
    const scored = scoreCandidate(page, image);
    if (scored.score >= minScore) {
      candidates.push(scored);
    }
  }
}

candidates.sort((a, b) => b.score - a.score);

const result = {
  generatedAt: new Date().toISOString(),
  mode: useFirecrawl ? "firecrawl-v2-vibe-score" : "fetch-search-vibe-score",
  note:
    "Candidates are not automatically publishable. Promote only after year/context/source verification.",
  queries,
  seedUrls,
  vibe,
  pages,
  candidates: candidates.slice(0, limit),
};

await fs.writeFile(jsonOut, `${JSON.stringify(result, null, 2)}\n`);
await fs.writeFile(mdOut, renderMarkdown(result));

console.log(`Discovered ${result.candidates.length} candidate images.`);
console.log(`JSON: ${jsonOut}`);
console.log(`Report: ${mdOut}`);

function parseArgs(rawArgs) {
  const parsed = {};

  for (let index = 0; index < rawArgs.length; index += 1) {
    const part = rawArgs[index];
    if (!part.startsWith("--")) continue;

    const [key, inlineValue] = part.slice(2).split("=");
    const value =
      inlineValue ??
      (rawArgs[index + 1]?.startsWith("--") ? true : rawArgs[++index] ?? true);

    if (parsed[key]) {
      parsed[key] = `${parsed[key]}\n${value}`;
    } else {
      parsed[key] = value;
    }
  }

  return parsed;
}

function arrayArg(value) {
  return String(value)
    .split(/\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

async function readLines(file) {
  const text = await fs.readFile(file, "utf8");
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
}

async function searchDuckDuckGo(query, resultLimit) {
  const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
  const html = await fetchText(url);
  if (!html) return [];

  const links = [...html.matchAll(/<a[^>]+class="result__a"[^>]+href="([^"]+)"[^>]*>(.*?)<\/a>/gis)];

  return links
    .map((match) => ({
      title: cleanText(match[2]),
      url: unwrapDuckUrl(decodeHtml(match[1])),
      query,
    }))
    .filter((result) => result.url.startsWith("https://"))
    .filter((result) => !isWeakUrl(result.url))
    .slice(0, resultLimit);
}

async function searchBing(query, resultLimit) {
  const url = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
  const html = await fetchText(url);
  if (!html) return [];

  return [...html.matchAll(/<li class="b_algo"[\s\S]*?<\/li>/g)]
    .map((match) => {
      const block = match[0];
      const href =
        firstMatch(block, /<h2[^>]*>\s*<a[^>]+href="([^"]+)"/is) ||
        firstMatch(block, /<a[^>]+href="([^"]+)"/is);
      const title =
        cleanText(firstMatch(block, /<h2[^>]*>\s*<a[^>]*>(.*?)<\/a>/is)) ||
        cleanText(firstMatch(block, /<a[^>]*>(.*?)<\/a>/is));

      return {
        title,
        url: unwrapBingUrl(decodeHtml(href)),
        query,
      };
    })
    .filter((result) => result.url.startsWith("https://"))
    .filter((result) => !isWeakUrl(result.url))
    .slice(0, resultLimit);
}

async function searchFirecrawl(query, resultLimit) {
  if (!firecrawlApiKey) {
    throw new Error(
      "FIRECRAWL_API_KEY is required when running with --firecrawl.",
    );
  }

  const response = await firecrawlRequest("/v2/search", {
    query,
    limit: resultLimit,
    sources: ["web"],
    country: "US",
    timeout: 60000,
    ignoreInvalidURLs: true,
    excludeDomains: [
      "pinterest.com",
      "etsy.com",
      "redbubble.com",
      "wikipedia.org",
      "cars.usnews.com",
    ],
    scrapeOptions: {
      formats: ["markdown", "links"],
      onlyMainContent: true,
      removeBase64Images: true,
      timeout: 30000,
    },
  });

  const webResults = Array.isArray(response?.data?.web)
    ? response.data.web
    : Array.isArray(response?.data)
      ? response.data
      : [];

  return webResults
    .map((result) => ({
      title: cleanText(result.title ?? result.metadata?.title ?? ""),
      description: cleanText(
        result.description ?? result.metadata?.description ?? "",
      ),
      url: normalizeUrl(result.url ?? result.metadata?.sourceURL ?? ""),
      markdown: result.markdown ?? "",
      links: Array.isArray(result.links) ? result.links : [],
      query,
    }))
    .filter((result) => result.url.startsWith("https://"))
    .filter((result) => !isWeakUrl(result.url));
}

async function crawlPage(page) {
  if (useFirecrawl) {
    return crawlPageWithFirecrawl(page);
  }

  const html = await fetchText(page.url);
  if (!html) return null;

  const title =
    cleanText(firstMatch(html, /<title[^>]*>(.*?)<\/title>/is)) || page.title || "";
  const description =
    getMeta(html, "description") || getMeta(html, "og:description") || "";
  const bodyText = cleanText(stripTags(html)).slice(0, 5000);
  const baseUrl = new URL(page.url);
  const images = await enrichImages(extractImages(html, baseUrl.href).slice(0, 20));

  return {
    url: page.url,
    query: page.query,
    title,
    description,
    textSample: bodyText.slice(0, 700),
    images,
  };
}

async function crawlPageWithFirecrawl(page) {
  const response = await firecrawlRequest("/v2/scrape", {
    url: page.url,
    formats: ["markdown", "html", "links", "images"],
    onlyMainContent: false,
    removeBase64Images: true,
    blockAds: true,
    proxy: "auto",
    timeout: 60000,
  });
  const data = response?.data;
  if (!data) return null;

  const html = data.html ?? "";
  const markdown = data.markdown ?? page.markdown ?? "";
  const metadata = data.metadata ?? {};
  const title = cleanText(metadata.title ?? page.title ?? "");
  const description = cleanText(
    metadata.description ?? page.description ?? "",
  );
  const pageUrl = metadata.sourceURL ?? page.url;
  const htmlImages = html ? extractImages(html, pageUrl) : [];
  const markdownImages = extractMarkdownImages(markdown, pageUrl);
  const firecrawlImages = Array.isArray(data.images)
    ? data.images.map((url) => ({
        url: absolutize(String(url), pageUrl),
        alt: "",
        title: "",
        width: null,
        height: null,
      }))
    : [];

  const images = await enrichImages(
    dedupeImages([...htmlImages, ...markdownImages, ...firecrawlImages]).slice(
      0,
      24,
    ),
  );

  return {
    url: pageUrl,
    query: page.query,
    title,
    description,
    textSample: cleanText(markdown || stripTags(html)).slice(0, 700),
    images,
  };
}

async function firecrawlRequest(endpoint, body) {
  if (!firecrawlApiKey) {
    throw new Error("Missing FIRECRAWL_API_KEY.");
  }

  const response = await fetch(`https://api.firecrawl.dev${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${firecrawlApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(90000),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `Firecrawl ${endpoint} failed: ${response.status} ${text.slice(0, 240)}`,
    );
  }

  return response.json();
}

async function fetchText(url) {
  try {
    const response = await fetch(url, {
      headers: {
        "accept":
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 studyoldads.com-discovery",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
    });

    const type = response.headers.get("content-type") ?? "";
    if (!response.ok || !type.includes("text/html")) return "";

    return await response.text();
  } catch {
    return "";
  }
}

function extractImages(html, pageUrl) {
  const imageMap = new Map();

  for (const match of html.matchAll(/<img\b([^>]*)>/gis)) {
    const attrs = attrsFrom(match[1]);
    const rawSrc = attrs.src || attrs["data-src"] || attrs["data-lazy-src"];
    const srcset = attrs.srcset || attrs["data-srcset"];
    const src = absolutize(bestSrc(rawSrc, srcset), pageUrl);

    if (!src || imageMap.has(src) || isWeakImage(src)) continue;

    imageMap.set(src, {
      url: src,
      alt: cleanText(attrs.alt ?? ""),
      title: cleanText(attrs.title ?? ""),
      width: Number(attrs.width) || null,
      height: Number(attrs.height) || null,
    });
  }

  for (const property of ["og:image", "twitter:image"]) {
    const src = absolutize(getMeta(html, property), pageUrl);
    if (src && !imageMap.has(src) && !isWeakImage(src)) {
      imageMap.set(src, {
        url: src,
        alt: property,
        title: "",
        width: null,
        height: null,
      });
    }
  }

  return [...imageMap.values()];
}

function extractMarkdownImages(markdown, pageUrl) {
  return [...String(markdown).matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)]
    .map((match) => ({
      url: absolutize(match[2], pageUrl),
      alt: cleanText(match[1]),
      title: "",
      width: null,
      height: null,
    }))
    .filter((image) => image.url && !isWeakImage(image.url));
}

function dedupeImages(images) {
  const imageMap = new Map();

  for (const image of images) {
    if (!image.url || imageMap.has(image.url) || isWeakImage(image.url)) {
      continue;
    }

    imageMap.set(image.url, image);
  }

  return [...imageMap.values()];
}

async function enrichImages(images) {
  const enriched = [];

  for (const image of images) {
    if (image.width && image.height) {
      enriched.push(image);
      continue;
    }

    enriched.push(await readImageMetadata(image));
    await sleep(80);
  }

  return enriched;
}

async function readImageMetadata(image) {
  try {
    const response = await fetch(image.url, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 studyoldads.com-discovery",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) return image;

    const length = Number(response.headers.get("content-length"));
    if (length > 8_000_000) return image;

    const sharp = (await import("sharp")).default;
    const buffer = Buffer.from(await response.arrayBuffer());
    const metadata = await sharp(buffer).metadata();

    return {
      ...image,
      width: metadata.width ?? image.width,
      height: metadata.height ?? image.height,
    };
  } catch {
    return image;
  }
}

function scoreCandidate(page, image) {
  const haystack = [
    page.title,
    page.description,
    image.alt,
    image.title,
    image.url,
  ]
    .join(" ")
    .toLowerCase();
  const pageHaystack = [page.title, page.description, page.textSample]
    .join(" ")
    .toLowerCase();
  const imageHaystack = [image.alt, image.title, image.url]
    .join(" ")
    .toLowerCase();

  const reasons = [];
  let score = 0;

  for (const term of vibe.positiveTerms) {
    if (imageHaystack.includes(term)) {
      score += 7;
      reasons.push(`image matches "${term}"`);
    } else if (pageHaystack.includes(term)) {
      score += 2;
      reasons.push(`page matches "${term}"`);
    }
  }

  for (const term of vibe.weakTerms) {
    if (haystack.includes(term)) {
      score -= 12;
      reasons.push(`weak source signal "${term}"`);
    }
  }

  const hasImageSpecificAdSignal = vibe.imageTerms.some((term) =>
    imageHaystack.includes(term),
  );

  if (hasImageSpecificAdSignal) {
    score += 12;
    reasons.push("image URL looks ad-related");
  } else {
    score -= 15;
    reasons.push("image lacks ad/poster-specific signal");
  }

  if (image.width && image.height) {
    if (image.width < 220 || image.height < 220) {
      score -= 30;
      reasons.push("image is probably too small");
    }

    const ratio = image.width / image.height;
    if (ratio > 0.45 && ratio < 0.9) {
      score += 22;
      reasons.push(`vertical-ish image ratio ${ratio.toFixed(2)}`);
    } else if (ratio > 0.9 && ratio < 1.35) {
      score += 8;
      reasons.push(`near-square board/crop ratio ${ratio.toFixed(2)}`);
    } else if (ratio >= 1.35) {
      score -= 8;
      reasons.push(`wide image ratio ${ratio.toFixed(2)}`);
    }
  } else {
    score += 4;
    reasons.push("needs dimension check");
  }

  if (/\b(19[5-9]\d|20[0-1]\d|1908|1921|1927|1930|1986)\b/.test(haystack)) {
    score += 8;
    reasons.push("has plausible period/year clue");
  }

  if (image.url.match(/\.(jpg|jpeg|png|webp)(\?|$)/i)) {
    score += 5;
    reasons.push("direct raster image URL");
  }

  return {
    score,
    reasons: [...new Set(reasons)].slice(0, 10),
    page: {
      title: page.title,
      url: page.url,
      query: page.query,
      description: page.description,
    },
    image,
    promotionChecklist: [
      "Wall test: readable at ~230px wide without reading body copy.",
      "Reject full-page B&W magazine/newspaper scans (three-column copy).",
      "Confirm period poster or strong crop, not a listicle thumb or remake.",
      "Find year and campaign context from source text or a second source.",
      "Check reuse rights; write description/lesson before adding to ads.ts.",
    ],
  };
}

function renderMarkdown(result) {
  const lines = [
    "# Discovery Candidates",
    "",
    `Generated: ${result.generatedAt}`,
    "",
    "These are vibe matches, not finished corpus entries.",
    "",
  ];

  for (const [index, candidate] of result.candidates.entries()) {
    lines.push(
      `## ${index + 1}. Score ${candidate.score}: ${candidate.page.title || "Untitled"}`,
      "",
      `- Page: ${candidate.page.url}`,
      `- Image: ${candidate.image.url}`,
      `- Query: ${candidate.page.query}`,
      `- Alt/title: ${candidate.image.alt || candidate.image.title || "n/a"}`,
      `- Reasons: ${candidate.reasons.join("; ")}`,
      "",
    );
  }

  return `${lines.join("\n")}\n`;
}

function attrsFrom(rawAttrs) {
  const attrs = {};

  for (const match of rawAttrs.matchAll(/([\w:-]+)(?:=(["'])(.*?)\2|=([^\s"'>]+))?/gis)) {
    attrs[match[1].toLowerCase()] = decodeHtml(match[3] ?? match[4] ?? "");
  }

  return attrs;
}

function bestSrc(src, srcset) {
  if (srcset) {
    const candidates = srcset
      .split(",")
      .map((part) => part.trim().split(/\s+/)[0])
      .filter(Boolean);

    if (candidates.length > 0) return candidates.at(-1);
  }

  return src;
}

function absolutize(rawUrl, pageUrl) {
  if (!rawUrl || rawUrl.startsWith("data:")) return "";

  try {
    return new URL(rawUrl, pageUrl).href;
  } catch {
    return "";
  }
}

function unwrapDuckUrl(rawUrl) {
  try {
    const url = new URL(rawUrl);
    const uddg = url.searchParams.get("uddg");
    return uddg ? normalizeUrl(uddg) : normalizeUrl(rawUrl);
  } catch {
    return normalizeUrl(rawUrl);
  }
}

function unwrapBingUrl(rawUrl) {
  try {
    const url = new URL(rawUrl);
    const encoded = url.searchParams.get("u");
    if (!encoded) return normalizeUrl(rawUrl);

    const normalized = encoded.startsWith("a1") ? encoded.slice(2) : encoded;
    return normalizeUrl(Buffer.from(normalized, "base64url").toString("utf8"));
  } catch {
    return normalizeUrl(rawUrl);
  }
}

function normalizeUrl(url) {
  try {
    const parsed = new URL(url);
    parsed.hash = "";
    return parsed.href;
  } catch {
    return url;
  }
}

function isWeakUrl(url) {
  return vibe.weakTerms.some((term) => url.toLowerCase().includes(term));
}

function isWeakImage(url) {
  const lower = url.toLowerCase();
  return (
    isWeakUrl(lower) ||
    lower.includes("avatar") ||
    lower.includes("logo") ||
    lower.includes("sprite") ||
    lower.includes("icon") ||
    lower.includes("counter") ||
    lower.endsWith(".svg") ||
    lower.includes(".svg/") ||
    lower.endsWith(".gif")
  );
}

function getMeta(html, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return (
    firstMatch(
      html,
      new RegExp(
        `<meta[^>]+(?:name|property)=["']${escaped}["'][^>]+content=["']([^"']+)["'][^>]*>`,
        "is",
      ),
    ) ||
    firstMatch(
      html,
      new RegExp(
        `<meta[^>]+content=["']([^"']+)["'][^>]+(?:name|property)=["']${escaped}["'][^>]*>`,
        "is",
      ),
    )
  );
}

function firstMatch(text, regex) {
  return decodeHtml(text.match(regex)?.[1] ?? "");
}

function stripTags(html) {
  return html
    .replace(/<script\b[^>]*>.*?<\/script>/gis, " ")
    .replace(/<style\b[^>]*>.*?<\/style>/gis, " ")
    .replace(/<[^>]+>/g, " ");
}

function cleanText(text) {
  return decodeHtml(text)
    .replace(/\s+/g, " ")
    .trim();
}

function decodeHtml(text) {
  return String(text ?? "")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&nbsp;", " ");
}
