import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";

const inboxDir = path.join(process.cwd(), "data", "discovery", "inbox");
const outDir = path.join(process.cwd(), "data", "discovery");

const args = parseArgs(process.argv.slice(2));
const tweetUrl = args._[0];
const imagePath = args.image;
const runSearch = Boolean(args.search);
const photoIndex = Number(args.photo ?? 1);

if (!tweetUrl && !imagePath) {
  console.error(
    "Usage: node scripts/discover-from-tweet.mjs <tweet-url> [--photo 1] [--search]\n" +
      "       node scripts/discover-from-tweet.mjs --image ./crop.jpg [--tweet <url>]",
  );
  process.exit(1);
}

await fs.mkdir(inboxDir, { recursive: true });

let tweet = null;
let media = null;

if (tweetUrl) {
  tweet = await fetchTweet(tweetUrl);
  media = pickPhoto(tweet, photoIndex);
}

const localImage =
  imagePath ??
  (media ? await downloadMedia(media, tweet?.id ?? "manual") : null);

if (!localImage) {
  console.error("No image found. Pass --image or a tweet URL with a photo.");
  process.exit(1);
}

const vision = await analyzeImage(localImage, {
  tweetText: tweet?.text ?? "",
  author: tweet?.author?.screen_name ?? "",
  width: media?.width,
  height: media?.height,
});

const queries = buildQueries(vision);
const timestamp = new Date().toISOString().replaceAll(":", "-").slice(0, 19);
const stem = tweet?.id ?? path.basename(localImage, path.extname(localImage));
const jsonOut = path.join(outDir, `from-tweet-${stem}-${timestamp}.json`);
const mdOut = jsonOut.replace(/\.json$/, ".md");

const packet = {
  generatedAt: new Date().toISOString(),
  source: {
    tweetUrl: tweet?.url ?? tweetUrl ?? null,
    author: tweet?.author?.screen_name ?? null,
    tweetText: tweet?.text ?? null,
    imagePath: path.relative(process.cwd(), localImage),
    mediaUrl: media?.url ?? null,
    dimensions:
      media?.width && media?.height
        ? { width: media.width, height: media.height }
        : null,
  },
  analysis: vision,
  searchQueries: queries,
  nextSteps: [
    "Review wallFit in analysis — cut if newspaper/magazine long-copy.",
    "Run with --search to crawl these queries into data/discovery/.",
    "Triage at /curate, then promote with a full-res archival image.",
  ],
};

await fs.writeFile(jsonOut, `${JSON.stringify(packet, null, 2)}\n`);
await fs.writeFile(mdOut, renderMarkdown(packet));

console.log(`Analysis written:\n  ${jsonOut}\n  ${mdOut}`);
console.log("\nSuggested queries:");
for (const query of queries) {
  console.log(`  - ${query}`);
}

if (runSearch) {
  await runDiscover(queries);
}

function parseArgs(rawArgs) {
  const parsed = { _: [] };
  for (let index = 0; index < rawArgs.length; index += 1) {
    const part = rawArgs[index];
    if (!part.startsWith("--")) {
      parsed._.push(part);
      continue;
    }
    const [key, inline] = part.slice(2).split("=");
    const value =
      inline ??
      (rawArgs[index + 1]?.startsWith("--") ? true : rawArgs[++index] ?? true);
    parsed[key] = value;
  }
  return parsed;
}

function parseTweetUrl(url) {
  const match = String(url).match(
    /(?:twitter\.com|x\.com)\/([^/?#]+)\/status\/(\d+)/i,
  );
  if (!match) {
    throw new Error(`Not a tweet URL: ${url}`);
  }
  return { screenName: match[1], id: match[2] };
}

async function fetchTweet(url) {
  const { screenName, id } = parseTweetUrl(url);
  const apiUrl = `https://api.fxtwitter.com/${screenName}/status/${id}`;
  const response = await fetch(apiUrl, {
    headers: { "user-agent": "studyoldads-discovery/1.0" },
  });

  if (!response.ok) {
    throw new Error(`FxTwitter ${response.status} for ${apiUrl}`);
  }

  const payload = await response.json();
  const tweet = payload.tweet ?? payload.status;
  if (!tweet) {
    throw new Error("FxTwitter response missing tweet object");
  }

  return {
    id: tweet.id ?? id,
    url: tweet.url ?? url,
    text: tweet.text ?? "",
    author: tweet.author ?? {},
    media: tweet.media ?? {},
  };
}

function pickPhoto(tweet, index) {
  const photos = tweet.media?.photos ?? tweet.media?.all?.filter((m) => m.type === "photo") ?? [];
  const photo = photos[index - 1] ?? photos[0];
  if (!photo?.url) {
    throw new Error(
      `Tweet has no photo at index ${index}. Photos found: ${photos.length}`,
    );
  }
  return photo;
}

async function downloadMedia(photo, tweetId) {
  const url = photo.url.includes("name=orig")
    ? photo.url
    : `${photo.url}${photo.url.includes("?") ? "&" : "?"}name=orig`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  const ext = url.includes(".png") ? ".png" : ".jpg";
  const file = path.join(inboxDir, `${tweetId}-photo${ext}`);
  await fs.writeFile(file, buffer);
  return file;
}

async function analyzeImage(file, context) {
  const ratio =
    context.width && context.height
      ? context.width / context.height
      : null;

  const heuristic = {
    brand: null,
    headline: null,
    visibleCopy: context.tweetText || null,
    yearGuess: null,
    format: ratio && ratio > 0.45 && ratio < 0.95 ? "poster-ish" : "unknown",
    wallFit:
      ratio && ratio > 1.2
        ? "probably-no (landscape)"
        : ratio && ratio < 0.45
          ? "maybe (very tall)"
          : "unknown — needs vision or manual review",
    notes: [],
    method: "heuristic",
  };

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    heuristic.notes.push(
      "Set OPENAI_API_KEY for vision extraction (brand, headline, wallFit).",
    );
    return heuristic;
  }

  const imageBuffer = await fs.readFile(file);
  const mime = file.endsWith(".png") ? "image/png" : "image/jpeg";
  const dataUrl = `data:${mime};base64,${imageBuffer.toString("base64")}`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_VISION_MODEL ?? "gpt-4o-mini",
      temperature: 0.2,
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "ad_analysis",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              brand: { type: ["string", "null"] },
              headline: { type: ["string", "null"] },
              visibleCopy: { type: ["string", "null"] },
              yearGuess: { type: ["string", "null"] },
              format: {
                type: "string",
                enum: ["poster", "magazine-print", "photo-crop", "collage", "unknown"],
              },
              wallFit: {
                type: "string",
                enum: ["yes", "maybe", "no"],
              },
              wallFitReason: { type: "string" },
              searchQueries: {
                type: "array",
                items: { type: "string" },
                minItems: 3,
                maxItems: 8,
              },
            },
            required: [
              "brand",
              "headline",
              "visibleCopy",
              "yearGuess",
              "format",
              "wallFit",
              "wallFitReason",
              "searchQueries",
            ],
          },
        },
      },
      messages: [
        {
          role: "system",
          content:
            "You analyze vintage print advertisements for studyoldads.com. " +
            "The wall wants poster-like graphics with one dominant idea readable at thumbnail size. " +
            "Reject full-page newspaper/magazine scans with three columns of body copy (wallFit=no). " +
            "Return exact visible headline words when readable. Years as 4-digit strings when confident.",
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text:
                `Tweet text: ${context.tweetText || "(none)"}\n` +
                `Author: ${context.author || "(unknown)"}\n` +
                (ratio ? `Aspect ratio: ${ratio.toFixed(2)}\n` : ""),
            },
            { type: "image_url", image_url: { url: dataUrl } },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    heuristic.notes.push(`Vision API failed: ${response.status} ${err.slice(0, 200)}`);
    return heuristic;
  }

  const payload = await response.json();
  const raw = payload.choices?.[0]?.message?.content;
  if (!raw) {
    heuristic.notes.push("Vision API returned empty content");
    return heuristic;
  }

  const parsed = JSON.parse(raw);
  return { ...parsed, method: "openai-vision" };
}

function buildQueries(analysis) {
  if (Array.isArray(analysis.searchQueries) && analysis.searchQueries.length > 0) {
    return [...new Set(analysis.searchQueries.map((q) => q.trim()).filter(Boolean))];
  }

  const queries = [];
  const brand = analysis.brand?.trim();
  const headline = analysis.headline?.trim();
  const year = analysis.yearGuess?.trim();

  if (brand && headline) {
    queries.push(`"${brand}" "${headline}" poster`);
    queries.push(`"${brand}" "${headline}" advertisement ${year ?? ""}`.trim());
  } else if (brand) {
    queries.push(`"${brand}" vintage poster advertisement`);
  }

  if (brand) {
    queries.push(`site:commons.wikimedia.org/wiki/File: "${brand}" advertisement`);
    queries.push(`site:loc.gov/pictures "${brand}" advertisement`);
  }

  if (analysis.visibleCopy) {
    const snippet = analysis.visibleCopy.split(/\s+/).slice(0, 6).join(" ");
    if (snippet.length > 8) {
      queries.push(`"${brand ?? ""}" "${snippet}" print`.trim());
    }
  }

  return [...new Set(queries)].filter(Boolean).slice(0, 8);
}

function renderMarkdown(packet) {
  const a = packet.analysis;
  const lines = [
    "# Tweet → Image → Search",
    "",
    `Generated: ${packet.generatedAt}`,
    "",
    "## Source",
    `- Tweet: ${packet.source.tweetUrl ?? "—"}`,
    `- Author: ${packet.source.author ?? "—"}`,
    `- Image: \`${packet.source.imagePath}\``,
    `- Media URL: ${packet.source.mediaUrl ?? "—"}`,
    "",
    "## Vision analysis",
    `- Method: ${a.method}`,
    `- Brand: ${a.brand ?? "—"}`,
    `- Headline: ${a.headline ?? "—"}`,
    `- Year guess: ${a.yearGuess ?? "—"}`,
    `- Format: ${a.format ?? "—"}`,
    `- Wall fit: **${a.wallFit ?? "—"}**${a.wallFitReason ? ` — ${a.wallFitReason}` : ""}`,
    "",
    a.visibleCopy ? `Visible copy:\n\n> ${a.visibleCopy}\n` : "",
    a.notes?.length ? `Notes:\n${a.notes.map((n) => `- ${n}`).join("\n")}\n` : "",
    "## Search queries",
    "",
    ...packet.searchQueries.map((q, i) => `${i + 1}. \`${q}\``),
    "",
    "## Next",
    "",
    "```bash",
    `node scripts/discover-from-tweet.mjs ${packet.source.tweetUrl ?? "<tweet>"} --search`,
    "npm run discover:ads -- --queries <paste queries file>",
    "```",
  ];
  return `${lines.filter(Boolean).join("\n")}\n`;
}

function runDiscover(queries) {
  const queryFile = path.join(outDir, `_queries-${Date.now()}.txt`);
  return fs
    .writeFile(queryFile, `${queries.join("\n")}\n`)
    .then(
      () =>
        new Promise((resolve, reject) => {
          const child = spawn(
            "node",
            [
              "scripts/discover-ads.mjs",
              "--queries",
              queryFile,
              "--no-default-urls",
              "--pages",
              "20",
              "--limit",
              "25",
            ],
            { stdio: "inherit", cwd: process.cwd() },
          );
          child.on("close", (code) => {
            if (code === 0) resolve();
            else reject(new Error(`discover-ads exited with ${code}`));
          });
        }),
    );
}
