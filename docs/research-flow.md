# studyoldads.com Research Flow

This archive starts with taste signals, then promotes only verified artifacts into the product.

## Seed Threads

- https://x.com/marlouiise/status/2061240137426846054
- https://x.com/oneminhnguyen/status/2036494252050620450

Treat these as discovery inputs, not final sources. For each image in a thread, capture:

- visible brand or product name
- slogan fragments
- approximate year or decade
- publication format, if visible
- image ratio and whether it fits the vertical-print constraint
- repost account, watermark, archive credit, or reply context

## Reverse-Engineering Queries

Useful query shapes:

- `"[brand]" "[slogan]" advertisement [year]`
- `site:commons.wikimedia.org/wiki/File: "[brand]" advertisement`
- `site:loc.gov/pictures "[brand]" advertisement`
- `site:archive.org "[magazine]" "[brand]" advertisement`
- `"[brand]" "print campaign" "[agency]"`
- `"[category]" "vintage advertisement" "public domain"`

When a good artifact appears, follow the category pages around it. Year categories, brand categories, and publication categories are currently the fastest path to more adjacent vertical prints.

## Promotion Rules

An ad can enter `src/data/ads.ts` when it has:

- a stable image URL
- a primary source or collection record
- a year, approximate year, or publication issue date
- a rights note
- a source label and at least one relevant link
- enough context to write a specific editorial description

Avoid adding an ad when the only source is a social repost, marketplace listing, or unsourced blog image. Those can stay in a candidate queue until verified.

## Seeded vs Verified

`seeded` means the ad is good enough to study visually, but still needs stronger source work. This is acceptable for the working wall while the corpus is being shaped.

`verified` means the entry has:

- a stable image source or local image copy;
- at least one source that identifies the ad, campaign, year, or publication context;
- preferably a second corroborating source when the first source is a blog or social mirror;
- a rights note that matches the source;
- enough context that the description is about the real campaign, not just the visible layout.

Run the audit to see what still needs verification:

```bash
npm run audit:corpus
```

The audit writes `data/curation/corpus-audit.md` and separates visual curation from research debt.

## Writing Standard

The copy should be minimal, but not vague. Write the way a great product launch sounds after it has been stripped to the bone:

- name the behavior the ad is selling
- describe the visual move that makes it work
- place the campaign in its cultural or technical moment
- end with a builder-level lesson

Good descriptions should feel calm, exact, and a little dangerous. No generic nostalgia. No museum plaque voice.
