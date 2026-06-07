# Discovery Pipeline

Discovery finds **poster-wall** candidates (lanes 2–6), not newspaper print archives.

London Underground is intentionally **out of scope** for crawls — those posters are already on the wall.

## Taste bar (quick)

Promote only if the image:

- reads at **~230px grid width** without reading body copy;
- is a **poster, launch visual, or strong crop** — not a scanned magazine page;
- has color or graphic force (B&W long-copy essays are cut).

See `docs/curation-taste.md` for the full wall standard.

## Commands

```bash
# Recommended: poster-focused query pack (lanes 2–6)
npm run discover:wall

# Same, with Firecrawl when fetch misses pages
FIRECRAWL_API_KEY=... npm run discover:wall -- --firecrawl --max-queries 8

# Custom crawl
npm run discover:ads -- --queries docs/discovery-queries.txt --no-default-urls --pages 35 --limit 40

# One-off query
npm run discover:ads -- --no-default-urls --query '"BMW" poster campaign' --limit 15
```

Default `npm run discover:ads` (no flags) also loads `docs/discovery-queries.txt` when present.

Outputs land in `data/discovery/` as JSON + Markdown. Nothing ships to the wall automatically.

## Lane 2b: Tweet → analyze → search (recommended for X boards)

When you see a crop on X, don't crawl blind — **read the image, then search what you see**.

```bash
# 1. Pull photo + vision analysis + suggested queries
OPENAI_API_KEY=sk-... npm run discover:tweet -- https://x.com/user/status/123456789

# Optional: pick photo 2 from a multi-image post
npm run discover:tweet -- https://x.com/user/status/123 --photo 2

# 2. Run discovery from those queries
OPENAI_API_KEY=sk-... npm run discover:tweet -- https://x.com/user/status/123 --search

# Or analyze a local crop already saved
npm run discover:tweet -- --image public/ads/inbox/my-crop.jpg
```

Pipeline:

1. **Fetch** — FxTwitter API (`api.fxtwitter.com`) downloads the original attachment to `data/discovery/inbox/`.
2. **Analyze** — Vision extracts brand, headline, visible copy, year guess, `format`, and `wallFit` (`yes` / `maybe` / `no` for newspaper scans).
3. **Search** — Builds 3–8 queries (`"brand" "headline" poster`, Commons, LoC, etc.) and optionally runs `discover-ads`.
4. **Curate** — `/curate` → full-res archival source → `ads.ts`.

Outputs: `data/discovery/from-tweet-{id}-{timestamp}.json` + `.md`.

Without `OPENAI_API_KEY`, the script still downloads the image and uses tweet text + aspect ratio heuristics only.

For **multi-ad collage boards** (like the Minh thread), analyze individual crops: save each plate, run `--image crop.jpg`, or use `/photo/N` when a thread posts one ad per reply.

## Hunt lanes (2–6)

| Lane | What to find | Where to look |
|------|----------------|---------------|
| **2 Taste boards** | Social/layout crops like the Minh seed thread | X/Pinterest/Are.na boards; watch & luxury ad blogs |
| **3 Tech launch** | Product hero + one line (iPod, Mac, Nike poster) | Computer History Museum, brand archives |
| **4 Witty auto** | Single-image humor/status (Volvo, BMW, Porsche) | Ads Library, Digital Tripathi — **cut** full-page text in `/curate` |
| **5 Color beverage** | Brand-system posters (Coke, Absolut, spirits) | Museum shops, campaign history pages |
| **6 Luxury watch** | Photo + headline (Rolex, AP) — **not** Ogilvy essay ads | Watch collecting archives, auction records |

Queries for each lane live in `docs/discovery-queries.txt`.

## Collaborative curation

1. Run `npm run discover:wall` (or a focused `--query` batch).
2. Open `/curate` → **Keep** / **Maybe** / **Cut** (default **Cut** for newspaper scans).
3. **Save shared** → `data/curation/decisions.json`.
4. `npm run queue:promotions` → `data/curation/promotion-queue.md`.
5. Download a **full-res** image to `public/ads/`, write `ads.ts` entry, `npm run validate:corpus`.

## Scoring

`discover-ads.mjs` rewards: `poster`, `billboard`, `launch`, `photography`, vertical-ish ratios, direct image URLs.

It penalizes: newspaper/magazine signals, AHPS/Indie Auto/Swiped listicles, `-thumb` crops, Etsy/Pinterest, wide landscape pages.

Scores are a **sort hint** only — `/curate` is the real filter.
