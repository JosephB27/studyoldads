export type SeedThread = {
  label: string;
  url: string;
  status: "seeded" | "needs-manual-review";
  note: string;
};

export type ResearchStep = {
  title: string;
  body: string;
};

export type ResearchSource = {
  name: string;
  url: string;
  use: string;
};

export type CandidateAd = {
  title: string;
  status: "identify" | "source" | "verify" | "write";
  clue: string;
  nextSearches: string[];
};

export const seedThreads: SeedThread[] = [
  {
    label: "Seed thread 01",
    url: "https://x.com/marlouiise/status/2061240137426846054",
    status: "needs-manual-review",
    note: "Use as a taste signal: identify the brands, crops, slogans, and collector accounts visible in the thread.",
  },
  {
    label: "Seed thread 02",
    url: "https://x.com/oneminhnguyen/status/2036494252050620450",
    status: "needs-manual-review",
    note: "Use replies and quote-posts to discover adjacent archive accounts and recurring campaign names.",
  },
];

export const researchSteps: ResearchStep[] = [
  {
    title: "Extract",
    body: "From each social post, capture visible brand names, product type, approximate decade, publication format, slogan fragments, image ratio, and any watermarks or credited archives.",
  },
  {
    title: "Search",
    body: "Query public collections with combinations like brand plus slogan plus year, then follow category pages to neighboring ads from the same decade or publication.",
  },
  {
    title: "Verify",
    body: "Prefer primary collection records over reposts. Store source URL, image URL, year, publication context, rights note, and two corroborating links when the campaign is famous.",
  },
  {
    title: "Write",
    body: "Describe what the print is doing: the behavior it sells, the cultural moment it borrows, the craft decision that makes it memorable, and the lesson a builder can steal.",
  },
];

export const researchSources: ResearchSource[] = [
  {
    name: "Wikimedia Commons",
    url: "https://commons.wikimedia.org/wiki/Category:Advertisements",
    use: "Fast public-domain discovery by year, brand, and media category.",
  },
  {
    name: "Library of Congress",
    url: "https://www.loc.gov/pictures/",
    use: "Primary records for posters, prints, catalog metadata, and rights notes.",
  },
  {
    name: "Internet Archive",
    url: "https://archive.org/",
    use: "Original magazine scans and periodicals when the ad source publication matters.",
  },
  {
    name: "Duke Hartman Center",
    url: "https://guides.library.duke.edu/printads",
    use: "Research guide for major print advertising collections and historical context.",
  },
  {
    name: "Digital Ad Archive",
    url: "https://www.digitaladarchive.com/",
    use: "Broad discovery by brand, decade, style, and commercial category.",
  },
];

export const candidateAds: CandidateAd[] = [
  {
    title: "Volkswagen Think Small",
    status: "source",
    clue: "A known vertical magazine layout from the DDB Beetle campaign; likely to appear in tweet threads about minimal old ads.",
    nextSearches: [
      "\"Volkswagen\" \"Think Small\" \"1959\" \"print ad\"",
      "site:peoplesgdarchive.org \"Think Small\"",
      "site:commons.wikimedia.org Volkswagen Beetle advertisement 1959",
    ],
  },
  {
    title: "Absolut Perfection",
    status: "verify",
    clue: "Canonical bottle-silhouette campaign. Needs rights-safe image source before promotion.",
    nextSearches: [
      "\"Absolut Perfection\" \"1980\" print ad",
      "site:absolutad.com \"Absolut Perfection\"",
      "\"Absolut Vodka\" \"TBWA\" \"print campaign\"",
    ],
  },
  {
    title: "Apple Macintosh launch print",
    status: "identify",
    clue: "The 1984 launch is famous, but the archive needs a vertical print artifact, not just the television commercial.",
    nextSearches: [
      "\"Apple Macintosh\" \"1984\" \"print ad\"",
      "\"Macintosh\" \"Newsweek\" \"1984\" advertisement",
      "site:americanhistory.si.edu Apple Macintosh 1984 advertisement",
    ],
  },
  {
    title: "Nike early Just Do It print",
    status: "source",
    clue: "The campaign begins in 1988; candidate must be an actual period print scan with a stable source.",
    nextSearches: [
      "\"Just Do It\" \"1988\" \"print ad\"",
      "\"Nike\" \"Just Do It\" \"Wieden Kennedy\" print",
      "site:archive.org \"Nike\" \"Just Do It\" magazine",
    ],
  },
];
