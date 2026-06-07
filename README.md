# studyoldads.com

A visual-first archive of old vertical print ads.

The public surface is intentionally spare: a white image wall inspired by the current Yeezy site direction. No visible header, filters, captions, or museum chrome. Click an ad to open the research layer: on desktop the print flips into place on the left and metadata appears on the right; on mobile it opens as a top card with a sticky `X`.

## Stack

- Next.js `16.2.7`
- React `19.2.7`
- TypeScript
- CSS modules

## Commands

```bash
npm run dev
npm run validate:corpus
npm run lint
npm run build
```

The app runs at [http://localhost:3000](http://localhost:3000).

## Project Map

- `src/app/page.tsx` renders the image wall and selected-ad overlay.
- `src/app/page.module.css` owns the Yeezy-style white wall and responsive detail card.
- `src/data/ads.ts` is the verified ad corpus.
- `data/discovery/` and `data/curation/` track source discovery, seed threads, candidate ideas, and promotion queues.
- `docs/research-flow.md` describes how social-thread finds become verified archive entries.
- `scripts/validate-corpus.mjs` enforces corpus completeness before new ads ship.

## Corpus Rules

Every published ad must have:

- stable image and source URLs
- year, brand, title, origin, and rights note
- vertical or near-vertical format
- at least one research link
- tags, palette, category, and period
- a bespoke description and builder-level lesson

Run `npm run validate:corpus` before shipping corpus changes.

## Research Flow

The seed threads are taste inputs, not final sources:

- https://x.com/marlouiise/status/2061240137426846054
- https://x.com/oneminhnguyen/status/2036494252050620450

For each candidate, extract visible brand names, slogans, dates, watermarks, and archive clues. Then verify through sources like Wikimedia Commons, Library of Congress, Internet Archive, Duke Hartman Center, and brand or campaign records before promoting it into `src/data/ads.ts`.

The writing standard is minimal but not vague: describe what the ad is doing, why the campaign matters, and what a builder can steal from it.
