export type AdLink = {
  label: string;
  href: string;
};

export type Ad = {
  id: string;
  brand: string;
  title: string;
  year: string;
  period: string;
  category: string;
  image: string;
  source: string;
  sourceLabel: string;
  rights: string;
  origin: string;
  dimensions: "vertical" | "near-vertical";
  researchStatus: "seeded" | "verified";
  links: AdLink[];
  description: string;
  lesson: string;
  palette: string[];
  tags: string[];
};

const minhSeed =
  "https://fxtwitter.com/oneminhnguyen/status/2036494252050620450";
const londonSeed =
  "https://fxtwitter.com/marlouiise/status/2061240137426846054";

function seededAd(
  ad: Omit<
    Ad,
    "source" | "sourceLabel" | "rights" | "researchStatus" | "links"
  > & {
    seed: "london" | "minh";
    links?: AdLink[];
  },
): Ad {
  const { seed, links, ...rest } = ad;
  const source = seed === "minh" ? minhSeed : londonSeed;
  const sourceLabel =
    seed === "minh"
      ? "Minh Nguyen seed board"
      : "London Underground seed board";

  return {
    ...rest,
    source,
    sourceLabel,
    rights:
      "Seed-sourced reference crop for studyoldads.com; underlying ad artwork remains with its original brand, agency, artist, or archive.",
    researchStatus: "seeded",
    links: [{ label: "Seed thread", href: source }, ...(links ?? [])],
  };
}

const seedAds: Ad[] = [
  seededAd({
    seed: "minh",
    id: "audemars-piguet-royal-oak",
    brand: "Audemars Piguet",
    title: "It Takes More Than Money",
    year: "1972",
    period: "Luxury sports watch",
    category: "Watch",
    image: "/ads/minh/audemars-piguet-royal-oak.jpg",
    origin: "Royal Oak print advertisement crop from the seed board",
    dimensions: "vertical",
    description:
      "Royal Oak is sold as taste with a gate on it. The watch is barely shown, then made monumental. Money can buy the object; the ad says judgment is the rarer material.",
    lesson: "Premium positioning starts where price stops being the argument.",
    palette: ["#f7f4ea", "#181613", "#b7914e"],
    tags: ["luxury", "watch", "status"],
  }),
  seededAd({
    seed: "minh",
    id: "rolls-royce-simply-best",
    brand: "Rolls-Royce",
    title: "Simply the Best Motor Car",
    year: "1980",
    period: "Quiet luxury",
    category: "Automotive",
    image: "/ads/minh/rolls-royce-best-motor-car.jpg",
    origin: "Rolls-Royce print advertisement crop from the seed board",
    dimensions: "vertical",
    description:
      "The car sits in traffic and somehow traffic becomes the stage. It is not an action shot. It is arrival without noise, confidence parked in the middle of ordinary life.",
    lesson: "Let the world look busy so the product can look inevitable.",
    palette: ["#e9dfcf", "#241f1b", "#b97942"],
    tags: ["automotive", "luxury", "city"],
  }),
  seededAd({
    seed: "minh",
    id: "ipod-1000-songs-pocket",
    brand: "Apple",
    title: "1,000 Songs in Your Pocket",
    year: "2001",
    period: "Digital music",
    category: "Technology",
    image: "/ads/minh/ipod-1000-songs.jpg",
    origin: "iPod launch-era print advertisement crop from the seed board",
    dimensions: "vertical",
    description:
      "One sentence turns a hard drive into a feeling. Not storage, not bitrate, not software. A thousand songs, yours, in a pocket. The product becomes obvious before it becomes common.",
    lesson: "Translate the spec into a human-sized miracle.",
    palette: ["#f4f2ed", "#111111", "#c8c8c3"],
    tags: ["apple", "music", "technology"],
  }),
  seededAd({
    seed: "minh",
    id: "volvo-parliament-speakers",
    brand: "Volvo",
    title: "More Speakers in a Volvo",
    year: "1986",
    period: "Safety and wit",
    category: "Automotive",
    image: "/ads/minh/volvo-parliament.jpg",
    origin: "Volvo print advertisement crop from the seed board",
    dimensions: "vertical",
    description:
      "A small car under Parliament carries a joke with a serious engine. The line is compact, almost thrown away, but it makes the product feel smart before it makes it feel safe.",
    lesson: "A precise joke can move more trust than a paragraph of claims.",
    palette: ["#6b5738", "#f1ead8", "#a8834a"],
    tags: ["volvo", "automotive", "copywriting"],
  }),
  seededAd({
    seed: "minh",
    id: "toyota-previa-lamborghini",
    brand: "Toyota",
    title: "Picks Up Five Times More Women",
    year: "1991",
    period: "Minivan wit",
    category: "Automotive",
    image: "/ads/minh/toyota-previa-lamborghini.jpg",
    origin: "Toyota Previa print advertisement crop from the seed board",
    dimensions: "vertical",
    description:
      "A family van steals the language of desire and uses it cleanly. The joke is instant, but the strategy is deeper: make practicality feel like the cleverest kind of swagger.",
    lesson: "Flip the category insult into the category advantage.",
    palette: ["#f3f0e7", "#111111", "#d6432c"],
    tags: ["toyota", "minivan", "humor"],
  }),
  seededAd({
    seed: "minh",
    id: "apple-ii-simplicity",
    brand: "Apple",
    title: "Simplicity Is the Ultimate Sophistication",
    year: "1977",
    period: "Personal computing",
    category: "Technology",
    image: "/ads/minh/apple-ii-simplicity.jpg",
    origin: "Apple II print advertisement crop from the seed board",
    dimensions: "vertical",
    description:
      "A red apple, a white field, and a sentence that behaves like doctrine. Before the computer explains itself, the brand explains its taste: clarity is the luxury.",
    lesson: "A new category needs a philosophy as much as a product shot.",
    palette: ["#fbfaf6", "#171717", "#d7342c"],
    tags: ["apple", "computer", "minimalism"],
  }),
  seededAd({
    seed: "minh",
    id: "volkswagen-think-small",
    brand: "Volkswagen",
    title: "Think Small",
    year: "1959",
    period: "DDB creative revolution",
    category: "Automotive",
    image: "/ads/minh/volkswagen-think-small.jpg",
    origin: "Volkswagen Beetle print advertisement crop from the seed board",
    dimensions: "vertical",
    description:
      "The Beetle is tiny on the page because that is the whole argument. Confidence becomes white space. The ad wins by refusing the old American car fantasy and making restraint feel modern.",
    lesson: "When the market shouts bigger, own the opposite with calm.",
    palette: ["#f0f0ec", "#151515", "#777777"],
    tags: ["volkswagen", "ddb", "white space"],
  }),
  seededAd({
    seed: "minh",
    id: "volkswagen-easy-to-push",
    brand: "Volkswagen",
    title: "Easy to Push",
    year: "1962",
    period: "Self-deprecating product truth",
    category: "Automotive",
    image: "/ads/minh/volkswagen-easy-to-push.jpg",
    origin: "Volkswagen Beetle print advertisement crop from the seed board",
    dimensions: "vertical",
    description:
      "A man pushing a Beetle turns failure into charm. The car admits a bad day and still comes out stronger, because honesty makes the engineering feel more believable.",
    lesson: "A flaw handled with taste can become proof of confidence.",
    palette: ["#ededeb", "#151515", "#6a6a66"],
    tags: ["volkswagen", "humor", "automotive"],
  }),
  seededAd({
    seed: "minh",
    id: "porsche-nobodys-perfect",
    brand: "Porsche",
    title: "Nobody's Perfect",
    year: "1983",
    period: "Le Mans dominance",
    category: "Automotive",
    image: "/ads/minh/porsche-nobodys-perfect.jpg",
    origin: "Porsche 1983 Le Mans results advertisement crop from seed board",
    dimensions: "vertical",
    description:
      "Porsche lists a near-total victory and lets one imperfection make the whole page human. It is dominance with a wink: performance so complete it can afford humility.",
    lesson: "If the facts are overwhelming, the line should barely move.",
    palette: ["#fbfaf5", "#111111", "#d9d3c5"],
    tags: ["porsche", "racing", "copywriting"],
  }),
  seededAd({
    seed: "minh",
    id: "porsche-investment-million",
    brand: "Porsche",
    title: "He Never Dreamed",
    year: "1984",
    period: "Collector value",
    category: "Automotive",
    image: "/ads/minh/porsche-investment-million.jpg",
    origin: "Porsche print advertisement crop from the seed board",
    dimensions: "vertical",
    description:
      "The car is reframed as a fortune that happened to be beautiful. The headline is almost tabloid-sized, but the promise is elegant: buy the machine, inherit the myth.",
    lesson: "A product with a market history can sell tomorrow as well as today.",
    palette: ["#6b6b69", "#f4efe4", "#7c1f1c"],
    tags: ["porsche", "investment", "collector"],
  }),
  seededAd({
    seed: "minh",
    id: "bmw-very-late-work",
    brand: "BMW",
    title: "Who's Going to Work?",
    year: "1985",
    period: "Driver desire",
    category: "Automotive",
    image: "/ads/minh/bmw-very-late-work.jpg",
    origin: "BMW 3 Series print advertisement crop from the seed board",
    dimensions: "vertical",
    description:
      "Two cars at dawn turn commuting into temptation. BMW does not show speed; it shows the private negotiation before speed, when responsibility loses to the road for a second.",
    lesson: "Sell the moment before the behavior, not only the behavior.",
    palette: ["#262826", "#f0eadc", "#7e8aa0"],
    tags: ["bmw", "driving", "desire"],
  }),
  seededAd({
    seed: "london",
    id: "underground-golders-green",
    brand: "London Underground",
    title: "Golders Green",
    year: "1908",
    period: "Early Underground poster",
    category: "Transit",
    image: "/ads/london/golders-green.jpg",
    origin: "London Underground poster crop from the seed board",
    dimensions: "vertical",
    description:
      "The Underground sells a suburb like a garden you can reach on schedule. Transport becomes not a tunnel, but a promise of escape: flowers, light, and a destination with a name.",
    lesson: "Infrastructure is easier to love when it advertises a life.",
    palette: ["#e9e0c0", "#183927", "#c65337"],
    tags: ["underground", "poster", "place"],
  }),
  seededAd({
    seed: "london",
    id: "underground-keep-warm-travel",
    brand: "London Underground",
    title: "Keep Warm Travel Underground",
    year: "1921",
    period: "Kauffer modernism",
    category: "Transit",
    image: "/ads/london/keep-warm-travel.jpg",
    origin: "London Underground poster crop from the seed board",
    dimensions: "vertical",
    description:
      "A red train glows under a field of winter dots. The poster is almost abstract, but the sell is practical: below the city, warmth and movement are already waiting.",
    lesson: "Make the benefit visible as weather, not as copy.",
    palette: ["#f5f0dc", "#7b842e", "#d61f12"],
    tags: ["underground", "modernism", "winter"],
  }),
  seededAd({
    seed: "london",
    id: "underground-take-cover",
    brand: "London Underground",
    title: "Take Cover Travel Underground",
    year: "1924",
    period: "Storm-proof travel",
    category: "Transit",
    image: "/ads/london/take-cover-travel.jpg",
    origin: "London Underground poster crop from the seed board",
    dimensions: "vertical",
    description:
      "Lightning strikes above; the train carries on below. The image is blunt, graphic, and brilliantly simple: the Tube is not just faster, it is civilization under bad weather.",
    lesson: "A strong contrast can make utility feel heroic.",
    palette: ["#e4d9bc", "#20201c", "#d0bd2e"],
    tags: ["underground", "weather", "transit"],
  }),
  seededAd({
    seed: "london",
    id: "underground-lure",
    brand: "London Underground",
    title: "The Lure of the Underground",
    year: "1927",
    period: "Interwar public life",
    category: "Transit",
    image: "/ads/london/lure-of-the-underground.jpg",
    origin: "London Underground poster crop from the seed board",
    dimensions: "vertical",
    description:
      "The city pours toward the roundel like iron filings toward a magnet. It is a crowd scene, but the center is pure system: everyone moving because the symbol knows where to take them.",
    lesson: "A network becomes a brand when its sign can organize chaos.",
    palette: ["#f0dfb8", "#1d1b18", "#c83e2b"],
    tags: ["underground", "crowd", "roundel"],
  }),
  seededAd({
    seed: "london",
    id: "underground-summer-nights",
    brand: "London Underground",
    title: "Summer Nights",
    year: "1930",
    period: "The city after dark",
    category: "Transit",
    image: "/ads/london/summer-nights.jpg",
    origin: "London Underground poster crop from the seed board",
    dimensions: "vertical",
    description:
      "The poster cuts London into stages: theatre, sky, promenade, moon. The Underground becomes the hinge between them, the quiet machine behind a glamorous night.",
    lesson: "Sell the itinerary, then let the product be the invisible enabler.",
    palette: ["#e4d3ac", "#315a70", "#c76b53"],
    tags: ["underground", "nightlife", "poster"],
  }),
  seededAd({
    seed: "london",
    id: "underground-fly-the-tube",
    brand: "London Underground",
    title: "Fly the Tube",
    year: "1986",
    period: "Heathrow connection",
    category: "Transit",
    image: "/ads/london/fly-the-tube-heathrow-trains.jpg",
    origin: "London Underground Heathrow poster crop from the seed board",
    dimensions: "vertical",
    description:
      "The Tube is drawn as aircraft, stacked and ready. It is literal, almost cheeky, and exactly right: the train becomes the first flight of the journey.",
    lesson: "A transit ad wins when it makes the connection feel seamless.",
    palette: ["#eee5d0", "#111111", "#c32322"],
    tags: ["underground", "airport", "heathrow"],
  }),
];

const discoveredAds: Ad[] = [
  {
    id: "volkswagen-lemon-1960",
    brand: "Volkswagen",
    title: "Lemon",
    year: "1960",
    period: "DDB Beetle campaign",
    category: "Automotive",
    image: "/ads/discovered/volkswagen-lemon-1960.jpg",
    source:
      "https://autohistorypreservationsociety.org/document/1960-volkswagen-ad-lemon/",
    sourceLabel: "Auto History Preservation Society",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with Volkswagen, DDB, or original rights holders.",
    origin: "Volkswagen Beetle print advertisement discovered via Firecrawl",
    dimensions: "near-vertical",
    researchStatus: "seeded",
    links: [
      {
        label: "AHPS document record",
        href: "https://autohistorypreservationsociety.org/document/1960-volkswagen-ad-lemon/",
      },
      {
        label: "Volkswagen Group archive",
        href: "https://www.volkswagen-group.com/en/images/detail/chronicle-1960-ad-lemon-78559",
      },
    ],
    description:
      "One word makes the car smaller, stranger, and more trustworthy. Volkswagen calls its own product a lemon, then lets inspection turn insult into proof. The white space is not emptiness; it is nerve.",
    lesson: "A brand can own truth by saying the scary word first.",
    palette: ["#eeeeea", "#151515", "#8d8d86"],
    tags: ["volkswagen", "ddb", "self-deprecation"],
  },
  {
    id: "volkswagen-mileage-varies-1960",
    brand: "Volkswagen",
    title: "Why?",
    year: "1960",
    period: "DDB Beetle campaign",
    category: "Automotive",
    image: "/ads/discovered/volkswagen-mileage-varies-1960.jpg",
    source:
      "https://www.indieauto.org/2023/09/20/if-you-ran-vw-in-1959-how-would-you-prepare-for-detroits-compacts/",
    sourceLabel: "Indie Auto discovery source",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with Volkswagen, DDB, or original rights holders.",
    origin: "Volkswagen Beetle print advertisement discovered via Firecrawl",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      {
        label: "Discovery source",
        href: "https://www.indieauto.org/2023/09/20/if-you-ran-vw-in-1959-how-would-you-prepare-for-detroits-compacts/",
      },
    ],
    description:
      "Three Beetles, three numbers, one human question. The page takes a dull mileage claim and makes it conversational, almost philosophical. Economy becomes curiosity instead of arithmetic.",
    lesson: "Turn the spec into a question the buyer wants answered.",
    palette: ["#f0f0ec", "#171717", "#6f6f6a"],
    tags: ["volkswagen", "ddb", "economy"],
  },
  {
    id: "volkswagen-snow-plow-1961",
    brand: "Volkswagen",
    title: "A Volkswagen, Obviously",
    year: "1961",
    period: "DDB Beetle campaign",
    category: "Automotive",
    image: "/ads/discovered/volkswagen-snow-plow-1961.png",
    source:
      "https://www.indieauto.org/2023/09/20/if-you-ran-vw-in-1959-how-would-you-prepare-for-detroits-compacts/",
    sourceLabel: "Indie Auto discovery source",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with Volkswagen, DDB, or original rights holders.",
    origin: "Volkswagen Beetle print advertisement discovered via Firecrawl",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      {
        label: "Discovery source",
        href: "https://www.indieauto.org/2023/09/20/if-you-ran-vw-in-1959-how-would-you-prepare-for-detroits-compacts/",
      },
    ],
    description:
      "A snowplow becomes the testimonial. The car is hidden inside a ridiculous job and somehow gets more believable. Volkswagen sells reliability by making the proof feel like a punchline.",
    lesson: "Show the product earning trust in the least glamorous place.",
    palette: ["#e8e8e5", "#111111", "#bcbcb4"],
    tags: ["volkswagen", "snow", "reliability"],
  },
  {
    id: "volkswagen-never-1961",
    brand: "Volkswagen",
    title: "Never",
    year: "1961",
    period: "DDB Beetle campaign",
    category: "Automotive",
    image: "/ads/discovered/volkswagen-never-1961.png",
    source:
      "https://www.indieauto.org/2023/09/20/if-you-ran-vw-in-1959-how-would-you-prepare-for-detroits-compacts/",
    sourceLabel: "Indie Auto discovery source",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with Volkswagen, DDB, or original rights holders.",
    origin: "Volkswagen Beetle print advertisement discovered via Firecrawl",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      {
        label: "Discovery source",
        href: "https://www.indieauto.org/2023/09/20/if-you-ran-vw-in-1959-how-would-you-prepare-for-detroits-compacts/",
      },
    ],
    description:
      "The Beetle sits alone with one forbidden word underneath it. The ad trusts the reader to lean in. Its power is the pause: a car campaign brave enough to make silence do the selling.",
    lesson: "A small word can carry a large strategy when the image is exact.",
    palette: ["#ededeb", "#151515", "#787873"],
    tags: ["volkswagen", "ddb", "minimal copy"],
  },
  {
    id: "rolls-royce-60mph-1958",
    brand: "Rolls-Royce",
    title: "At 60 Miles an Hour",
    year: "1958",
    period: "Ogilvy long-copy classic",
    category: "Automotive",
    image: "/ads/discovered/rolls-royce-60mph-1958.png",
    source: "https://swiped.co/file/rolls-royce-ad-by-david-ogilvy/",
    sourceLabel: "Swiped / Ogilvy archive",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with Rolls-Royce, Ogilvy, or original rights holders.",
    origin: "Rolls-Royce print advertisement discovered via Firecrawl",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      {
        label: "Discovery source",
        href: "https://swiped.co/file/rolls-royce-ad-by-david-ogilvy/",
      },
    ],
    description:
      "A luxury car is sold through a clock. The headline is technical, quiet, and lethal: silence becomes engineering, engineering becomes taste. The long copy works because the first sentence already won.",
    lesson: "A premium claim is strongest when it sounds measured, not amazed.",
    palette: ["#ece9e0", "#171717", "#8a8a80"],
    tags: ["rolls-royce", "ogilvy", "long copy"],
  },
  {
    id: "apple-macintosh-test-drive",
    brand: "Apple",
    title: "Test Drive a Macintosh",
    year: "1984",
    period: "Macintosh launch era",
    category: "Technology",
    image: "/ads/discovered/apple-macintosh-1984.jpg",
    source: "https://www.playforthoughts.com/blog/the-best-print-ads",
    sourceLabel: "Play For Thoughts discovery source",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with Apple or original rights holders.",
    origin: "Apple Macintosh print advertisement discovered via Firecrawl",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      {
        label: "Discovery source",
        href: "https://www.playforthoughts.com/blog/the-best-print-ads",
      },
    ],
    description:
      "A computer becomes a vehicle you can take for a spin. The glove makes the metaphor physical: new technology, but familiar desire. Apple is selling permission to touch the future.",
    lesson: "When a product feels alien, borrow a ritual people already know.",
    palette: ["#eee2bf", "#201713", "#b75c3d"],
    tags: ["apple", "macintosh", "launch"],
  },
  {
    id: "absolut-perfection",
    brand: "Absolut",
    title: "Absolut Perfection",
    year: "1980",
    period: "Bottle-as-icon campaign",
    category: "Spirits",
    image: "/ads/discovered/absolut-perfection.jpg",
    source:
      "https://www.smartinsights.com/online-brand-strategy/international-marketing/campaign-of-the-week-the-longest-running-print-ad-marketing-campaign-in-history/",
    sourceLabel: "Smart Insights discovery source",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with Absolut, TBWA, or original rights holders.",
    origin: "Absolut Vodka print advertisement discovered via Firecrawl",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      {
        label: "Discovery source",
        href: "https://www.smartinsights.com/online-brand-strategy/international-marketing/campaign-of-the-week-the-longest-running-print-ad-marketing-campaign-in-history/",
      },
    ],
    description:
      "The bottle becomes the whole language. A halo, a shadow, two words. Absolut does not decorate the product; it teaches the world to recognize its silhouette as an idea.",
    lesson: "When the shape is ownable, make the campaign a ritual around it.",
    palette: ["#141414", "#f2f0e7", "#d9d7c7"],
    tags: ["absolut", "minimalism", "silhouette"],
  },
  {
    id: "patek-generations",
    brand: "Patek Philippe",
    title: "You Never Actually Own",
    year: "1996",
    period: "Generations campaign",
    category: "Watch",
    image: "/ads/discovered/patek-generations.jpg",
    source:
      "https://ewanitymarketing.com/how-patek-philippe-could-use-storytelling-marketing/",
    sourceLabel: "Ewanity Marketing discovery source",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with Patek Philippe, Leagas Delaney, or original rights holders.",
    origin: "Patek Philippe Generations print advertisement discovered via Firecrawl",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      {
        label: "Discovery source",
        href: "https://ewanitymarketing.com/how-patek-philippe-could-use-storytelling-marketing/",
      },
    ],
    description:
      "A watch is made too large for one lifetime. The father and son do the selling before the copy arrives. Ownership is reframed as stewardship, which is luxury at its most patient.",
    lesson: "The strongest status object can be sold as responsibility.",
    palette: ["#d8d6d0", "#101010", "#29415f"],
    tags: ["patek", "watch", "inheritance"],
  },
  {
    id: "apple-think-different-ali",
    brand: "Apple",
    title: "Think Different: Muhammad Ali",
    year: "1997",
    period: "Think Different campaign",
    category: "Technology",
    image: "/ads/discovered/apple-think-different-ali.jpg",
    source:
      "https://www.posterama.co/blogs/news/13414153-apple-think-different",
    sourceLabel: "Posterama discovery source",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with Apple, TBWA\\Chiat\\Day, or original rights holders.",
    origin: "Apple Think Different print advertisement discovered via Firecrawl",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      {
        label: "Discovery source",
        href: "https://www.posterama.co/blogs/news/13414153-apple-think-different",
      },
    ],
    description:
      "Apple borrows Ali's fist and makes it a product argument without showing the product. The ad says creativity is not a feature. It is a stance, pointed straight at the viewer.",
    lesson: "A brand can sell identity by choosing its heroes precisely.",
    palette: ["#efeee8", "#141414", "#a8a8a0"],
    tags: ["apple", "think different", "identity"],
  },
  {
    id: "volkswagen-impossible-1961",
    brand: "Volkswagen",
    title: "Impossible",
    year: "1961",
    period: "DDB Beetle campaign",
    category: "Automotive",
    image: "/ads/discovered/volkswagen-impossible-1961.png",
    source:
      "https://autohistorypreservationsociety.org/document/1961-volkswagen-ad-impossible/",
    sourceLabel: "Auto History Preservation Society",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with Volkswagen, DDB, or original rights holders.",
    origin: "Volkswagen Beetle print advertisement, air-cooled engine proof",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      {
        label: "AHPS document record",
        href: "https://autohistorypreservationsociety.org/document/1961-volkswagen-ad-impossible/",
      },
      {
        label: "Indie Auto DDB context",
        href: "https://www.indieauto.org/2023/09/20/if-you-ran-vw-in-1959-how-would-you-prepare-for-detroits-compacts/",
      },
    ],
    description:
      "The headline calls the car's advantage impossible, then explains why with engineering instead of swagger. A Beetle cannot boil over because air cooling removes the failure mode Detroit assumed. The page turns a weird mechanical choice into a calm proof.",
    lesson: "When the product is unconventional, make the mechanism the punchline.",
    palette: ["#ededeb", "#151515", "#6f6f6a"],
    tags: ["volkswagen", "ddb", "engineering"],
  },
  {
    id: "avis-we-try-harder-1962",
    brand: "Avis",
    title: "We Try Harder",
    year: "1963",
    period: "DDB underdog repositioning",
    category: "Automotive",
    image: "/ads/discovered/avis-we-try-harder-1962.jpg",
    source: "https://swiped.co/file/we-try-harder-ad-from-avis/",
    sourceLabel: "Swiped / DDB archive",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with Avis, DDB, or original rights holders.",
    origin: "Avis rent-a-car We Try Harder print advertisement (No. 2 campaign)",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      {
        label: "Swiped campaign archive",
        href: "https://swiped.co/file/we-try-harder-ad-from-avis/",
      },
      {
        label: "Duke Hartman Center writeup",
        href: "https://blogs.library.duke.edu/rubenstein/2017/11/15/try-harder-famous-ad-campaigns-paula-green/",
      },
    ],
    description:
      "Avis admits it is only number two, then makes second place feel like a service promise. The layout is spare, the copy is long, and the honesty does the positioning work Hertz could not copy. Being behind becomes the reason to try harder.",
    lesson: "A weakness confessed early can become the whole brand strategy.",
    palette: ["#f4f2ed", "#111111", "#c8c8c3"],
    tags: ["avis", "ddb", "underdog"],
  },
  {
    id: "apple-think-different-einstein-1997",
    brand: "Apple",
    title: "Think Different: Albert Einstein",
    year: "1997",
    period: "Think Different campaign",
    category: "Technology",
    image: "/ads/discovered/apple-think-different-einstein.jpg",
    source:
      "https://www.posterama.co/blogs/news/13414153-apple-think-different",
    sourceLabel: "Posterama campaign guide",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with Apple, TBWA\\Chiat\\Day, or original rights holders.",
    origin: "Apple Think Different portrait print advertisement",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      {
        label: "Posterama campaign guide",
        href: "https://www.posterama.co/blogs/news/13414153-apple-think-different",
      },
      {
        label: "Think Different campaign history",
        href: "https://en.wikipedia.org/wiki/Think_different",
      },
    ],
    description:
      "Einstein's face fills the page while the product stays absent. Apple is not selling specs; it is recruiting believers in a certain kind of mind. The black-and-white portrait and small logo turn biography into brand permission.",
    lesson: "Borrow a face when you want to sell a worldview, not a feature list.",
    palette: ["#e8e6df", "#141414", "#8a8a84"],
    tags: ["apple", "think different", "portrait"],
  },
  {
    id: "apple-think-different-dylan-1997",
    brand: "Apple",
    title: "Think Different: Bob Dylan",
    year: "1997",
    period: "Think Different campaign",
    category: "Technology",
    image: "/ads/discovered/apple-think-different-dylan.jpg",
    source:
      "https://www.posterama.co/blogs/news/13414153-apple-think-different",
    sourceLabel: "Posterama campaign guide",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with Apple, TBWA\\Chiat\\Day, or original rights holders.",
    origin: "Apple Think Different portrait print advertisement",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      {
        label: "Posterama campaign guide",
        href: "https://www.posterama.co/blogs/news/13414153-apple-think-different",
      },
      {
        label: "Think Different campaign history",
        href: "https://en.wikipedia.org/wiki/Think_different",
      },
    ],
    description:
      "Dylan arrives as attitude before explanation. The campaign treats rebellion as a product attribute by association, not argument. Apple is aligning with people who changed culture, then asking the reader to see themselves in that lineage.",
    lesson: "Casting is strategy when the product has nothing new to photograph.",
    palette: ["#ece9e2", "#121212", "#6e6e68"],
    tags: ["apple", "think different", "music"],
  },
  {
    id: "apple-think-different-chaplin-1997",
    brand: "Apple",
    title: "Think Different: Charlie Chaplin",
    year: "1997",
    period: "Think Different campaign",
    category: "Technology",
    image: "/ads/discovered/apple-think-different-chaplin.jpg",
    source:
      "https://www.posterama.co/blogs/news/13414153-apple-think-different",
    sourceLabel: "Posterama campaign guide",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with Apple, TBWA\\Chiat\\Day, or original rights holders.",
    origin: "Apple Think Different portrait print advertisement",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      {
        label: "Posterama campaign guide",
        href: "https://www.posterama.co/blogs/news/13414153-apple-think-different",
      },
      {
        label: "Think Different campaign history",
        href: "https://en.wikipedia.org/wiki/Think_different",
      },
    ],
    description:
      "Chaplin sells invention through silence and silhouette. The page is almost empty except for a human story and two words at the bottom. Apple is claiming the inventor's chair without showing a computer, which only works if the audience already feels behind.",
    lesson: "A single expressive face can carry an entire product philosophy.",
    palette: ["#f0ede6", "#161616", "#9a9a92"],
    tags: ["apple", "think different", "film"],
  },
  {
    id: "apple-think-different-henson-1997",
    brand: "Apple",
    title: "Think Different: Jim Henson",
    year: "1997",
    period: "Think Different campaign",
    category: "Technology",
    image: "/ads/discovered/apple-think-different-henson.jpg",
    source:
      "https://www.posterama.co/blogs/news/13414153-apple-think-different",
    sourceLabel: "Posterama campaign guide",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with Apple, TBWA\\Chiat\\Day, or original rights holders.",
    origin: "Apple Think Different portrait print advertisement",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      {
        label: "Posterama campaign guide",
        href: "https://www.posterama.co/blogs/news/13414153-apple-think-different",
      },
      {
        label: "Think Different campaign history",
        href: "https://en.wikipedia.org/wiki/Think_different",
      },
    ],
    description:
      "Henson brings play and craft to a campaign about rule-breakers. The portrait feels gentle, but the strategy is sharp: Apple is for people who build worlds, not people who buy beige boxes. Imagination becomes the product proof.",
    lesson: "Choose heroes whose work looks like the customer's ambition.",
    palette: ["#ebe8e1", "#131313", "#7d7d76"],
    tags: ["apple", "think different", "creativity"],
  },
  {
    id: "absolut-warhol-1986",
    brand: "Absolut",
    title: "Absolut Warhol",
    year: "1986",
    period: "Bottle-as-icon campaign",
    category: "Spirits",
    image: "/ads/discovered/absolut-warhol.jpg",
    source:
      "https://www.smartinsights.com/online-brand-strategy/international-marketing/campaign-of-the-week-the-longest-running-print-ad-marketing-campaign-in-history/",
    sourceLabel: "Smart Insights campaign history",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with Absolut, TBWA, Andy Warhol estate, or original rights holders.",
    origin: "Absolut Vodka Warhol artist collaboration print advertisement",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      {
        label: "Smart Insights campaign writeup",
        href: "https://www.smartinsights.com/online-brand-strategy/international-marketing/campaign-of-the-week-the-longest-running-print-ad-marketing-campaign-in-history/",
      },
      {
        label: "Absolut brand history",
        href: "https://www.absolut.com/en-us/blog/vodka-and-spirits/the-story-of-the-absolut-bottle-and-brand/",
      },
    ],
    description:
      "The bottle becomes a canvas for Warhol's color blocks, not a product shot. Absolut keeps the silhouette sacred while letting art history do the flex. It is still minimal, but now the campaign is also a gallery.",
    lesson: "An ownable shape can host collaborators without losing recognition.",
    palette: ["#1a1a1a", "#f2efe6", "#d4a63a"],
    tags: ["absolut", "warhol", "collaboration"],
  },
  {
    id: "iwc-equality-sexes",
    brand: "IWC",
    title: "Equality of the Sexes",
    year: "1990",
    period: "Luxury watch provocation",
    category: "Watch",
    image: "/ads/minh/iwc-equality-sexes.jpg",
    source: minhSeed,
    sourceLabel: "Minh Nguyen seed board",
    rights:
      "Seed-sourced reference crop for studyoldads.com; underlying ad artwork remains with IWC or original rights holders.",
    origin: "IWC print advertisement crop from the seed board",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [{ label: "Seed thread", href: minhSeed }],
    description:
      "A watch ad built like a dare. The line is blunt, almost too sharp, and the product waits at the bottom like evidence. IWC sells masculinity by making the page feel slightly dangerous.",
    lesson: "Provocation only works when the typography has discipline.",
    palette: ["#faf9f3", "#111111", "#b8b8b2"],
    tags: ["iwc", "watch", "provocation"],
  },
];

// User-submitted board paste, grouped by brand/campaign. Researched but not
// fully archival-verified, so marked "seeded" until promoted to "verified".
const addedAds: Ad[] = [
  // --- Anheuser-Busch beers ---
  {
    id: "budweiser-pick-a-pair-pink",
    brand: "Budweiser",
    title: "Pick a Pair",
    year: "1962",
    period: "Pick a Pair campaign",
    category: "Beverage",
    image: "/ads/added/budweiser-pick-a-pair-pink.png",
    source: "https://propadv.com/alcohol-ad-and-poster-collection/budweiser-ad-and-poster-collection/",
    sourceLabel: "Propaganda & Advertising — Budweiser collection",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with Anheuser-Busch or original rights holders.",
    origin: "Anheuser-Busch Budweiser 'Pick a Pair' print advertisement",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      {
        label: "Budweiser ad collection",
        href: "https://propadv.com/alcohol-ad-and-poster-collection/budweiser-ad-and-poster-collection/",
      },
    ],
    description:
      "Anheuser-Busch turns two words into a buying habit. 'Pick a Pair' makes doubling up feel obvious, almost effortless, and the model's easy smile sells the second six-pack before the shopper has decided to want it.",
    lesson: "A two-word imperative can quietly double the basket size.",
    palette: ["#c5302a", "#e6b4b8", "#f3efe6"],
    tags: ["budweiser", "beer", "pick a pair"],
  },
  {
    id: "budweiser-pick-a-pair-blonde",
    brand: "Budweiser",
    title: "Take Home Two 6-Paks",
    year: "1961",
    period: "Pick a Pair campaign",
    category: "Beverage",
    image: "/ads/added/budweiser-pick-a-pair-blonde.png",
    source: "https://www.vintage-adventures.com/vintage-beer-wine-spirits-ads/4573-1961-budweiser-beer-ad-pick-a-pair.html",
    sourceLabel: "Vintage Adventures — 1961 Budweiser 'Pick a Pair'",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with Anheuser-Busch or original rights holders.",
    origin: "Anheuser-Busch Budweiser 'Pick a Pair' print advertisement",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      {
        label: "1961 Budweiser 'Pick a Pair' listing",
        href: "https://www.vintage-adventures.com/vintage-beer-wine-spirits-ads/4573-1961-budweiser-beer-ad-pick-a-pair.html",
      },
    ],
    description:
      "Same line, new face, more product in frame. 'Take home two 6-Paks of Bud' stacks the cases into a wall of inevitability — the campaign teaching quantity as the default and repetition as the whole strategy.",
    lesson: "Run one line across many faces until the habit reads as consensus.",
    palette: ["#c2302a", "#d9b46a", "#f0e7d2"],
    tags: ["budweiser", "beer", "pick a pair"],
  },
  {
    id: "budweiser-pick-a-pair-blue",
    brand: "Budweiser",
    title: "Smart Way to Buy",
    year: "1963",
    period: "Pick a Pair campaign",
    category: "Beverage",
    image: "/ads/added/budweiser-pick-a-pair-blue.png",
    source: "https://propadv.com/alcohol-ad-and-poster-collection/budweiser-ad-and-poster-collection/",
    sourceLabel: "Propaganda & Advertising — Budweiser collection",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with Anheuser-Busch or original rights holders.",
    origin: "Anheuser-Busch Budweiser 'Pick a Pair' print advertisement",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      {
        label: "Budweiser ad collection",
        href: "https://propadv.com/alcohol-ad-and-poster-collection/budweiser-ad-and-poster-collection/",
      },
    ],
    description:
      "By now the line needs no setup. 'Smart way to buy' flatters the shopper for doing exactly what the campaign always wanted, while the blue dress pops the product cleanly off a field of Budweiser red.",
    lesson: "Once the habit is taught, flatter the buyer for already having it.",
    palette: ["#c4302a", "#2f5f8f", "#e7c98f"],
    tags: ["budweiser", "beer", "pick a pair"],
  },
  {
    id: "michelob-first-class",
    brand: "Michelob",
    title: "Going First Class Is Michelob. Period.",
    year: "1970",
    period: "First-class positioning",
    category: "Beverage",
    image: "/ads/added/michelob-first-class.png",
    source: "https://propadv.com/alcohol-ad-and-poster-collection/michelob-ad-and-poster-collection/",
    sourceLabel: "Propaganda & Advertising — Michelob collection",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with Anheuser-Busch or original rights holders.",
    origin: "Anheuser-Busch Michelob print advertisement",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      {
        label: "Michelob ad collection",
        href: "https://propadv.com/alcohol-ad-and-poster-collection/michelob-ad-and-poster-collection/",
      },
    ],
    description:
      "Three sentences, one of them a single word. Michelob borrows the language of air travel and lands it with 'Period.' — a full stop used as a flex. Premium is asserted, never argued, and the dark glassy product shot agrees.",
    lesson: "A one-word sentence can carry an entire premium claim.",
    palette: ["#0b0b0b", "#e7d9a8", "#c4202a"],
    tags: ["michelob", "beer", "premium"],
  },
  {
    id: "budweiser-social-companion",
    brand: "Budweiser",
    title: "America's Social Companion",
    year: "1937",
    period: "Pre-war Anheuser-Busch illustration",
    category: "Beverage",
    image: "/ads/added/budweiser-social-companion.png",
    source: "https://www.taverntrove.com/menu-sheets-budweiser-beer-fortune-teller-p-70431.html",
    sourceLabel: "Tavern Trove — Budweiser 'Fortune Teller'",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with Anheuser-Busch or original rights holders.",
    origin: "Anheuser-Busch Budweiser 'America's Social Companion' print advertisement",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      {
        label: "Budweiser 'Fortune Teller' record",
        href: "https://www.taverntrove.com/menu-sheets-budweiser-beer-fortune-teller-p-70431.html",
      },
    ],
    description:
      "A fortune teller cradles a glowing Budweiser like a crystal ball. The deco illustration makes beer feel mystical and sociable at once — 'America's Social Companion' sold as prophecy rather than product shot.",
    lesson: "Wrap an everyday product in ritual and it inherits a story.",
    palette: ["#2f8f5e", "#c8201f", "#e0b23a"],
    tags: ["budweiser", "illustration", "art deco"],
  },
  {
    id: "budweiser-wheres-life",
    brand: "Budweiser",
    title: "Where There's Life...There's Bud",
    year: "1959",
    period: "Where There's Life campaign",
    category: "Beverage",
    image: "/ads/added/budweiser-wheres-life.png",
    source: "https://brookstonbeerbulletin.com/beer-in-ads-90-budweisers-where-theres-life/",
    sourceLabel: "Brookston Beer Bulletin — Where There's Life",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with Anheuser-Busch, D'Arcy, or original rights holders.",
    origin: "Anheuser-Busch Budweiser 'Where there's Life...there's Bud' print advertisement",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      {
        label: "Beer In Ads writeup",
        href: "https://brookstonbeerbulletin.com/beer-in-ads-90-budweisers-where-theres-life/",
      },
    ],
    description:
      "A couple shares a beach lunch and a single glass while the beer pours into the good life. 'Where there's Life...there's Bud' sells the brand as proof that you are living, not merely the thing you happen to be drinking.",
    lesson: "Attach the product to the feeling of being alive, not the occasion.",
    palette: ["#3f7fa0", "#efe7d6", "#c0392b"],
    tags: ["budweiser", "beer", "lifestyle"],
  },
  // --- Jell-O 'Now's the time for Jell-O' ---
  {
    id: "jello-cowboys",
    brand: "Jell-O",
    title: "Now's the Time for Jell-O",
    year: "1952",
    period: "Now's the Time campaign",
    category: "Food",
    image: "/ads/added/jello-cowboys.png",
    source: "https://www.vintage-adventures.com/vintage-food-beverage-ads/1332-1952-jell-o-ad-now-s-the-time-for-jell-o.html",
    sourceLabel: "Vintage Adventures — 1952 Jell-O",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with General Foods, Young & Rubicam, or original rights holders.",
    origin: "General Foods Jell-O 'Now's the time for Jell-O' print advertisement",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      {
        label: "1952 Jell-O ad listing",
        href: "https://www.vintage-adventures.com/vintage-food-beverage-ads/1332-1952-jell-o-ad-now-s-the-time-for-jell-o.html",
      },
    ],
    description:
      "Cartoon bandits hold up the icebox for dessert. Jell-O sells itself as the thing even outlaws can't resist, turning a wobbly molded dessert into both the punchline and the prize of a tiny Western.",
    lesson: "A cartoon gag can make a humble product feel irresistible.",
    palette: ["#3a6b8a", "#c43a2e", "#e8d6b0"],
    tags: ["jell-o", "cartoon", "dessert"],
  },
  {
    id: "jello-scale",
    brand: "Jell-O",
    title: "Now's the Time for Jell-O",
    year: "1953",
    period: "Now's the Time campaign",
    category: "Food",
    image: "/ads/added/jello-scale.png",
    source: "https://www.chronicallyvintage.com/2015/10/adventures-in-vintage-advertising-jell.html",
    sourceLabel: "Chronically Vintage — Jell-O advertising",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with General Foods, Young & Rubicam, or original rights holders.",
    origin: "General Foods Jell-O 'Now's the time for Jell-O' print advertisement",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      {
        label: "Jell-O campaign writeup",
        href: "https://www.chronicallyvintage.com/2015/10/adventures-in-vintage-advertising-jell.html",
      },
    ],
    description:
      "Same tagline, opposite anxiety. A heavy man weighs himself while Jell-O waits as the guilt-free reward. The campaign flexes its range: dessert as fun for kids, dessert as permission for dieters.",
    lesson: "One tagline can flex across two opposite anxieties.",
    palette: ["#d9c7a8", "#c43a2e", "#e8a23a"],
    tags: ["jell-o", "cartoon", "diet"],
  },
  // --- Singles ---
  {
    id: "campbells-can-bag",
    brand: "Campbell's",
    title: "The Can Bag",
    year: "1968",
    period: "Pop-art merchandise promotion",
    category: "Food",
    image: "/ads/added/campbells-can-bag.png",
    source: "https://www.atticpaper.com/proddetail.php?prod=1968-campbells-soup-ad-can-bag",
    sourceLabel: "Attic Paper — 1968 Campbell's 'Can Bag'",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with Campbell Soup Company or original rights holders.",
    origin: "Campbell's Soup 'The Can Bag' mail-in offer print advertisement",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      {
        label: "1968 'Can Bag' ad record",
        href: "https://www.atticpaper.com/proddetail.php?prod=1968-campbells-soup-ad-can-bag",
      },
    ],
    description:
      "Campbell's turns its own label into luggage. The soup can becomes a tote, the tote becomes a coupon, and the brand rides its Warhol moment by selling the shelf icon back to you as an object you carry.",
    lesson: "When your packaging is already famous, sell the package itself.",
    palette: ["#b5202a", "#e8e2d4", "#1c2a3a"],
    tags: ["campbells", "pop art", "merchandise"],
  },
  {
    id: "coca-cola-come-over",
    brand: "Coca-Cola",
    title: "Come Over for Coke",
    year: "1951",
    period: "Postwar hospitality",
    category: "Beverage",
    image: "/ads/added/coca-cola-come-over.png",
    source: "https://commons.wikimedia.org/wiki/Category:Coca-Cola_advertisements",
    sourceLabel: "Wikimedia Commons — Coca-Cola advertisements",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with The Coca-Cola Company, D'Arcy, or original rights holders.",
    origin: "Coca-Cola 'Come Over for Coke' print advertisement",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      {
        label: "Coca-Cola ads category",
        href: "https://commons.wikimedia.org/wiki/Category:Coca-Cola_advertisements",
      },
    ],
    description:
      "A painted hostess and one warm line do all the work. Coke is not a drink here; it is an invitation — the social glue 'everybody understands.' The product becomes the manners system you can buy by the bottle.",
    lesson: "Sell the social ritual and the product becomes the price of belonging.",
    palette: ["#a9c6b0", "#b8201f", "#efe7d6"],
    tags: ["coca-cola", "hospitality", "mid-century"],
  },
  {
    id: "coca-cola-no1-in-the-sun",
    brand: "Coca-Cola",
    title: "No.1 in the Sun",
    year: "1969",
    period: "Things Go Better with Coke",
    category: "Beverage",
    image: "/ads/added/coca-cola-no1-in-the-sun.png",
    source: "https://www.coca-colacompany.com/about-us/history/history-of-coca-cola-advertising-slogans",
    sourceLabel: "The Coca-Cola Company — advertising slogans",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with The Coca-Cola Company, McCann-Erickson, or original rights holders.",
    origin: "Coca-Cola 'No.1 in the sun' print advertisement",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      {
        label: "Coca-Cola slogan history",
        href: "https://www.coca-colacompany.com/about-us/history/history-of-coca-cola-advertising-slogans",
      },
      {
        label: "Coca-Cola ads category",
        href: "https://commons.wikimedia.org/wiki/Category:Coca-Cola_advertisements",
      },
    ],
    description:
      "One sweating contour bottle, four words, and a mountain of confidence. 'No.1 in the sun.' lets the silhouette carry the brand while the long copy quietly insists Coke owns the heat, the shade, and the moonlight alike.",
    lesson: "When the silhouette is iconic, let it do the arguing.",
    palette: ["#b5201d", "#355e4a", "#f1ece1"],
    tags: ["coca-cola", "bottle", "mid-century"],
  },
  {
    id: "nutone-music-in-walls",
    brand: "NuTone",
    title: "Put Music In Your Walls!",
    year: "1962",
    period: "Built-in home audio",
    category: "Audio",
    image: "/ads/added/nutone-music-in-walls.png",
    source: "https://en.wikipedia.org/wiki/NuTone",
    sourceLabel: "NuTone (Cincinnati) brand reference",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with NuTone or original rights holders.",
    origin: "NuTone Intercom-Radio 'Put Music In Your Walls!' print advertisement",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      {
        label: "NuTone brand reference",
        href: "https://en.wikipedia.org/wiki/NuTone",
      },
    ],
    description:
      "NuTone sells the wall, not the radio. Music becomes architecture, piped room to room, and the smiling housewife at the dial is the proof: convenience built into the house itself, a step-saver dressed as luxury.",
    lesson: "Reframe a gadget as infrastructure and it stops being optional.",
    palette: ["#c9a063", "#b23a2e", "#efe3c8"],
    tags: ["nutone", "home audio", "mid-century"],
  },
  {
    id: "porsche-fresh-air",
    brand: "Porsche",
    title: "Get More Fresh Air",
    year: "1988",
    period: "Late-80s 911 campaign",
    category: "Automotive",
    image: "/ads/added/porsche-fresh-air.png",
    source: "https://www.porsche.com/international/aboutporsche/christophorusmagazine/",
    sourceLabel: "Porsche 911 Carrera Cabriolet reference",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with Porsche or original rights holders.",
    origin: "Porsche 911 Carrera Cabriolet print advertisement",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      {
        label: "Porsche 911 history",
        href: "https://en.wikipedia.org/wiki/Porsche_911",
      },
    ],
    description:
      "Porsche prescribes itself. The headline poses as a doctor's advice, then reframes a 911 Cabriolet as preventive medicine — a witty long-copy turn that makes pure indulgence sound like sensible health policy.",
    lesson: "Disguise the indulgence as the responsible choice.",
    palette: ["#f2f2f0", "#111111", "#8a8a86"],
    tags: ["porsche", "automotive", "copywriting"],
  },
  {
    id: "apple-sorry-no-beige",
    brand: "Apple",
    title: "Sorry, No Beige",
    year: "1998",
    period: "iMac G3 launch / Think Different",
    category: "Technology",
    image: "/ads/added/apple-sorry-no-beige.png",
    source: "https://en.wikipedia.org/wiki/IMac_G3",
    sourceLabel: "iMac G3 launch reference",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with Apple, TBWA\\Chiat\\Day, or original rights holders.",
    origin: "Apple iMac G3 'Sorry, no beige' print advertisement",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      {
        label: "iMac G3 history",
        href: "https://en.wikipedia.org/wiki/IMac_G3",
      },
      {
        label: "Think Different campaign",
        href: "https://en.wikipedia.org/wiki/Think_different",
      },
    ],
    description:
      "Two words bury an entire industry. The Bondi-blue iMac sits alone while 'Sorry, no beige.' mocks every PC tower ever shipped. Apple sells color as a worldview and makes design the only spec that matters.",
    lesson: "Mock the category default and your difference becomes the argument.",
    palette: ["#eef0f1", "#1a6f86", "#141414"],
    tags: ["apple", "imac", "think different"],
  },
  {
    id: "hp-sauce-good-with-bacon",
    brand: "H.P. Sauce",
    title: "Good with Bacon",
    year: "1930",
    period: "Vintage HP Foods illustration",
    category: "Food",
    image: "/ads/added/hp-sauce.jpg",
    source: "https://www.hatads.org.uk/catalogue/45/hp-foods/hp-foods.aspx",
    sourceLabel: "History of Advertising Trust — HP Foods",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with HP Foods or original rights holders.",
    origin: "H.P. Sauce 'Good with bacon' illustrated print advertisement",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      {
        label: "HP Foods advertising archive",
        href: "https://www.hatads.org.uk/catalogue/45/hp-foods/hp-foods.aspx",
      },
      {
        label: "HP Sauce history",
        href: "https://en.wikipedia.org/wiki/HP_Sauce",
      },
    ],
    description:
      "A thieving boy, a scandalised pig, and three words: 'Good with bacon.' HP sells brown sauce as Britishness with a wink, the painted gag doing what a slogan can't — making a condiment feel like a national in-joke.",
    lesson: "A painted joke can carry a brand further than a flat claim.",
    palette: ["#1a1208", "#c9a23a", "#b23a2e"],
    tags: ["hp sauce", "british", "illustration"],
  },
  // --- Tobacco ---
  {
    id: "winston-flavor-fun",
    brand: "Winston",
    title: "Flavor That Goes with Fun",
    year: "1964",
    period: "Tastes Good Like a Cigarette Should",
    category: "Tobacco",
    image: "/ads/added/winston-flavor-fun.png",
    source: "https://tobacco.stanford.edu/",
    sourceLabel: "Stanford Research into the Impact of Tobacco Advertising",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with R.J. Reynolds or original rights holders.",
    origin: "Winston filter cigarettes print advertisement",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      {
        label: "Stanford tobacco ad archive",
        href: "https://tobacco.stanford.edu/",
      },
      {
        label: "Winston brand history",
        href: "https://en.wikipedia.org/wiki/Winston_(cigarette)",
      },
    ],
    description:
      "Skiers tumble and flirt while a pack of Winstons rides a pair of green ski goggles. The ad sells cigarettes as the accessory to play, and the famous grammar-defying line — 'like a cigarette should' — does the brand burn-in.",
    lesson: "A line people love to repeat outlasts the rule it breaks.",
    palette: ["#c4202a", "#f2efe6", "#8fb0c4"],
    tags: ["winston", "tobacco", "cultural context"],
  },
  {
    id: "chesterfield-pleasure",
    brand: "Chesterfield",
    title: "Pleasure Is a Chesterfield",
    year: "1962",
    period: "21 Great Tobaccos campaign",
    category: "Tobacco",
    image: "/ads/added/chesterfield-pleasure.png",
    source: "https://tobacco.stanford.edu/",
    sourceLabel: "Stanford Research into the Impact of Tobacco Advertising",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with Liggett & Myers or original rights holders.",
    origin: "Chesterfield King cigarettes print advertisement",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      {
        label: "Stanford tobacco ad archive",
        href: "https://tobacco.stanford.edu/",
      },
      {
        label: "1962 Chesterfield King listing",
        href: "https://www.vintage-adventures.com/vintage-tobacco-ads/4838-1962-chesterfield-king-cigarettes-ad-smoke-for-pleasure.html",
      },
    ],
    description:
      "A couple shelters under a coat in the rain while a row of cigarettes lines up like evidence. Chesterfield turns counting into a slogan — '21 great tobaccos make 20 wonderful smokes' — arithmetic offered as reassurance for a habit.",
    lesson: "Turn a product spec into a chant and it sells like a promise.",
    palette: ["#b58a3a", "#b0201d", "#efe6d2"],
    tags: ["chesterfield", "tobacco", "mid-century"],
  },
  // --- Singles ---
  {
    id: "bacardi-mixes-with-everything",
    brand: "Bacardi",
    title: "Mixes with Everything. Except Driving.",
    year: "1985",
    period: "Mixes with Everything campaign",
    category: "Spirits",
    image: "/ads/added/bacardi-mixes-with-everything.png",
    source: "https://en.wikipedia.org/wiki/Bacardi",
    sourceLabel: "Bacardi brand reference",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with Bacardi or original rights holders.",
    origin: "Bacardi rum 'mixes with everything. Except driving.' print advertisement",
    dimensions: "near-vertical",
    researchStatus: "seeded",
    links: [
      {
        label: "Bacardi brand reference",
        href: "https://en.wikipedia.org/wiki/Bacardi",
      },
      {
        label: "Ad scan",
        href: "https://vintagepromotions.tumblr.com/post/675935140938235904/bacardi-rum-mixes-with-everything-except",
      },
    ],
    description:
      "A grid of rival bottle caps, two citrus slices, and a steering wheel. Bacardi claims the entire mixer aisle in one image, then lands a public-service punchline — 'Except driving.' — that makes the brand look generous and responsible at once.",
    lesson: "Claim the whole category, then earn goodwill with the one exception.",
    palette: ["#efe7d6", "#c0392b", "#2f7d4f"],
    tags: ["bacardi", "spirits", "responsible drinking"],
  },
  {
    id: "nike-air-feet-or-face",
    brand: "Nike",
    title: "On Your Feet or in Your Face",
    year: "1985",
    period: "Air Force basketball campaign",
    category: "Footwear",
    image: "/ads/added/nike-air-feet-or-face.png",
    source: "https://en.wikipedia.org/wiki/Nike_Air_Force_1",
    sourceLabel: "Nike Air Force 1 reference",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with Nike or original rights holders.",
    origin: "Nike Air Force basketball shoe print advertisement",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      {
        label: "Nike Air Force 1 history",
        href: "https://en.wikipedia.org/wiki/Nike_Air_Force_1",
      },
    ],
    description:
      "Two high-tops are shot like trophies under a line that plays both ways: they are either on your feet or posterizing someone's face. Nike sells basketball menace — the Air Force as equipment for winning and intimidation alike.",
    lesson: "A double-meaning headline can sell aspiration and attitude at once.",
    palette: ["#141414", "#f2f2f0", "#9a9a96"],
    tags: ["nike", "basketball", "footwear"],
  },
  {
    id: "heinz-ketchup-seasons-best-1939",
    brand: "Heinz",
    title: "The Season's Best",
    year: "1939",
    period: "New Year's holiday illustration",
    category: "Food",
    image: "/ads/added/heinz-ketchup-seasons-best.png",
    source: "https://www.chronicallyvintage.com/2014/11/adventures-in-vintage-advertising-heinz.html",
    sourceLabel: "Chronically Vintage — Heinz advertising",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with the H.J. Heinz Company or original rights holders.",
    origin: "H.J. Heinz Tomato Ketchup 'The Season's Best' Saturday Evening Post print advertisement",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      {
        label: "Chronically Vintage Heinz writeup",
        href: "https://www.chronicallyvintage.com/2014/11/adventures-in-vintage-advertising-heinz.html",
      },
      {
        label: "Heinz: a history in ads",
        href: "https://www.marketingweek.com/heinz-a-history-in-ads/",
      },
    ],
    description:
      "A New Year's cherub brandishes the bottle like a noisemaker over a starry sky and a giant '1939.' Heinz hangs the whole page on a pun — 'The Season's Best and the Best of Seasonings' — making a condiment feel like a holiday toast.",
    lesson: "A well-timed pun can borrow the calendar's mood for free.",
    palette: ["#1f4a4f", "#c0241f", "#e7dcc1"],
    tags: ["heinz", "illustration", "holiday"],
  },
  // --- Gaming & electronics ---
  {
    id: "nintendo-gameboy-keep-it-in-your-pants",
    brand: "Nintendo",
    title: "Keep It in Your Pants",
    year: "1996",
    period: "Game Boy Pocket launch",
    category: "Electronics",
    image: "/ads/added/nintendo-gameboy-keep-it-in-your-pants.png",
    source: "https://en.wikipedia.org/wiki/Game_Boy_Pocket",
    sourceLabel: "Game Boy Pocket — Wikipedia",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with Nintendo or original rights holders.",
    origin: "Nintendo Game Boy Pocket print advertisement",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      {
        label: "Game Boy Pocket overview",
        href: "https://en.wikipedia.org/wiki/Game_Boy_Pocket",
      },
    ],
    description:
      "A denim back pocket and a cheeky double entendre do all the work. By shrinking the headline to a locker-room joke, Nintendo sells the one spec that mattered for the Pocket — it actually fits where you already carry everything else.",
    lesson: "When the product's edge is size, let an everyday object prove it.",
    palette: ["#1c2733", "#5a6b82", "#c8c0a8"],
    tags: ["nintendo", "game boy", "portable"],
  },
  {
    id: "wii-vous-jouez-comme-vous-bougez",
    brand: "Nintendo",
    title: "Vous Jouez Comme Vous Bougez",
    year: "2008",
    period: "Wii motion campaign",
    category: "Electronics",
    image: "/ads/added/wii-vous-jouez-comme-vous-bougez.png",
    source: "https://en.wikipedia.org/wiki/Wii",
    sourceLabel: "Wii — Wikipedia",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with Nintendo or original rights holders.",
    origin: "Nintendo Wii French-market print advertisement",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      {
        label: "Wii overview",
        href: "https://en.wikipedia.org/wiki/Wii",
      },
    ],
    description:
      "Nearly the whole page is empty — until you notice the pale brushstroke of a sword extending from the remote in a real hand. 'You play the way you move' is proven, not stated: the controller becomes the blade, and the negative space becomes the swing.",
    lesson: "Empty space can carry the idea when the gesture finishes the picture.",
    palette: ["#eef3f7", "#9fc6e0", "#2f6f9f"],
    tags: ["nintendo", "wii", "motion"],
  },
  {
    id: "sony-cdr-9-to-5",
    brand: "Sony",
    title: "Take, for Instance, 9 to 5",
    year: "1996",
    period: "Spressa CD-R campaign",
    category: "Electronics",
    image: "/ads/added/sony-cdr-9-to-5.png",
    source: "https://en.wikipedia.org/wiki/CD-R",
    sourceLabel: "CD-R — Wikipedia",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with Sony or original rights holders.",
    origin: "Sony Spressa recordable CD-ROM drive print advertisement",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      {
        label: "CD-R overview",
        href: "https://en.wikipedia.org/wiki/CD-R",
      },
    ],
    description:
      "A defeated office worker is buried under a teetering tower of paperwork that dwarfs his desk. Sony makes 650 megabytes legible as a physical absurdity — the disc is the punchline to a column of paper no human could file.",
    lesson: "Dramatize the problem at human scale and the spec sells itself.",
    palette: ["#1d2326", "#b7b2a6", "#c0241f"],
    tags: ["sony", "storage", "office"],
  },
  {
    id: "playstation-2-sleepless-nights",
    brand: "PlayStation",
    title: "(Sleepless Nights)²",
    year: "2000",
    period: "PlayStation 2 launch",
    category: "Electronics",
    image: "/ads/added/playstation-2-sleepless-nights.png",
    source: "https://en.wikipedia.org/wiki/PlayStation_2",
    sourceLabel: "PlayStation 2 — Wikipedia",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with Sony Interactive Entertainment or original rights holders.",
    origin: "Sony PlayStation 2 launch print advertisement",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      {
        label: "PlayStation 2 overview",
        href: "https://en.wikipedia.org/wiki/PlayStation_2",
      },
    ],
    description:
      "A bloodshot eye fills the frame, its broken capillaries traced into the triangle, circle, cross, and square. PlayStation reframes exhaustion as a badge — the console is so compelling that losing sleep is the expected, almost desirable, side effect.",
    lesson: "Turn the obvious objection into the proof of obsession.",
    palette: ["#c6a08c", "#7a2e22", "#d8d2cf"],
    tags: ["playstation", "gaming", "launch"],
  },
  // --- Cameras, food & fashion ---
  {
    id: "polaroid-sx-70-invents",
    brand: "Polaroid",
    title: "Polaroid Invents the SX-70",
    year: "1972",
    period: "SX-70 launch",
    category: "Camera",
    image: "/ads/added/polaroid-sx-70-invents.png",
    source: "https://en.wikipedia.org/wiki/Polaroid_SX-70",
    sourceLabel: "Polaroid SX-70 — Wikipedia",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with Polaroid or original rights holders.",
    origin: "Polaroid SX-70 Land Camera print advertisement",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      {
        label: "Polaroid SX-70 overview",
        href: "https://en.wikipedia.org/wiki/Polaroid_SX-70",
      },
    ],
    description:
      "A man presses the camera to his eye while a fresh print slides out the front, and the headline simply claims invention outright. Polaroid sells the SX-70 as an event in itself — the folding body and the instant print are framed as proof that the future has just arrived in the hand.",
    lesson: "When the product is genuinely new, naming the invention is the pitch.",
    palette: ["#2a1d14", "#9c8f74", "#7fae9a"],
    tags: ["polaroid", "camera", "instant"],
  },
  {
    id: "campbells-soup-on-the-rocks",
    brand: "Campbell's",
    title: "Soup on the Rocks",
    year: "1968",
    period: "Beef Broth campaign",
    category: "Food",
    image: "/ads/added/campbells-soup-on-the-rocks.png",
    source: "https://en.wikipedia.org/wiki/Campbell_Soup_Company",
    sourceLabel: "Campbell Soup Company — Wikipedia",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with the Campbell Soup Company or original rights holders.",
    origin: "Campbell's Beef Broth 'Soup on the Rocks' print advertisement",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      {
        label: "Campbell Soup Company overview",
        href: "https://en.wikipedia.org/wiki/Campbell_Soup_Company",
      },
    ],
    description:
      "Beef broth poured over ice in a lowball glass reframes soup as a cocktail. Campbell's stretches a pantry staple into a hot-day refreshment, borrowing the ritual of a chilled drink to invent a brand-new occasion for an old can.",
    lesson: "Reframe the serving ritual to open a use case the product never had.",
    palette: ["#c5302a", "#7a1d18", "#efe7d8"],
    tags: ["campbells", "food", "reframe"],
  },
  {
    id: "lacoste-golf-green",
    brand: "Lacoste",
    title: "Life Is a Beautiful Sport — Golf",
    year: "2014",
    period: "Life Is a Beautiful Sport campaign",
    category: "Fashion",
    image: "/ads/added/lacoste-golf-green.png",
    source: "https://en.wikipedia.org/wiki/Lacoste",
    sourceLabel: "Lacoste — Wikipedia",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with Lacoste or original rights holders.",
    origin: "Lacoste 'Life Is a Beautiful Sport' print advertisement",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      {
        label: "Lacoste overview",
        href: "https://en.wikipedia.org/wiki/Lacoste",
      },
    ],
    description:
      "The green polo becomes the putting green: the placket reads as a fairway, the buttons as holes, and a golfer putts across the fabric while the crocodile waits at the edge. Lacoste fuses the garment and the sport into a single image so the logo never has to explain itself.",
    lesson: "Merge the product and its world into one picture and the brand reads instantly.",
    palette: ["#1f8a3b", "#0c4d22", "#7a6cae"],
    tags: ["lacoste", "golf", "fashion"],
  },
  // --- Tobacco, autos & sport ---
  {
    id: "camel-share-a-light",
    brand: "Camel",
    title: "Camel",
    year: "1980",
    period: "Turkish & Domestic Blend campaign",
    category: "Tobacco",
    image: "/ads/added/camel-share-a-light.png",
    source: "https://en.wikipedia.org/wiki/Camel_(cigarette)",
    sourceLabel: "Camel (cigarette) — Wikipedia",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with R.J. Reynolds or original rights holders.",
    origin: "Camel Filter cigarettes print advertisement",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      {
        label: "Camel cigarette overview",
        href: "https://en.wikipedia.org/wiki/Camel_(cigarette)",
      },
    ],
    description:
      "Two silhouettes share a single flame at dusk while camels file across the dune behind them and the pack glows in the corner. Camel sells warmth and intimacy, not nicotine — the cigarette is just the excuse for the closeness the picture is really advertising.",
    lesson: "Sell the moment around the product, not the product.",
    palette: ["#7a3b1d", "#d99a2b", "#2a1810"],
    tags: ["camel", "cigarettes", "mood"],
  },
  {
    id: "porsche-staring-is-rude",
    brand: "Porsche",
    title: "Staring Is Rude",
    year: "2020",
    period: "911 heritage social campaign",
    category: "Automotive",
    image: "/ads/added/porsche-staring-is-rude.png",
    source: "https://en.wikipedia.org/wiki/Porsche_911",
    sourceLabel: "Porsche 911 — Wikipedia",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with Porsche or original rights holders.",
    origin: "Porsche 911 social-era print advertisement",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      {
        label: "Porsche 911 overview",
        href: "https://en.wikipedia.org/wiki/Porsche_911",
      },
    ],
    description:
      "A profile of a classic green 911 sits in clean negative space under a one-line scold — then the fine print grants the exception: 'Unless it's a 911. Then everybody does it.' The ad turns the car's beauty into a social rule worth breaking.",
    lesson: "Set up a rule just to let the product be the exception to it.",
    palette: ["#e7e8e8", "#2f5c3a", "#111111"],
    tags: ["porsche", "911", "minimal"],
  },
  {
    id: "penn-french-open-croissant",
    brand: "Penn",
    title: "Official Ball of the 1988 French Open",
    year: "1988",
    period: "French Open sponsorship",
    category: "Sport",
    image: "/ads/added/penn-french-open-croissant.png",
    source: "https://en.wikipedia.org/wiki/Penn_(tennis)",
    sourceLabel: "Penn (tennis) — Wikipedia",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with Penn or original rights holders.",
    origin: "Penn tennis balls 'Official Ball of the French Open' print advertisement",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      {
        label: "Penn tennis overview",
        href: "https://en.wikipedia.org/wiki/Penn_(tennis)",
      },
    ],
    description:
      "Three tennis balls are arranged on a plate into a perfect croissant, the Penn logo riding the curve. One visual pun says everything the headline needs to imply — an American ball claiming its place at the most French tournament in tennis.",
    lesson: "A single visual pun can localize a brand faster than any copy.",
    palette: ["#d7d000", "#cfc6b4", "#6b6552"],
    tags: ["penn", "tennis", "pun"],
  },
];

const canadianaAds: Ad[] = [
  // --- Mid-century consumer print ---
  {
    id: "tootsie-roll-life-of-the-party",
    brand: "Tootsie Roll",
    title: "The Life of the Party",
    year: "1950",
    period: "Comic-book candy advertising",
    category: "Confectionery",
    image: "/ads/canadiana/tootsie-roll-life-of-the-party.png",
    source: "https://www.ebay.com/itm/154119648285",
    sourceLabel: "Original 1950 print-ad listing",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with Tootsie Roll Industries or original rights holders.",
    origin: "Sweets Company of America 'Life of the Party' comic-page ad",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      { label: "1950 Tootsie Roll print-ad listing", href: "https://www.ebay.com/itm/154119648285" },
    ],
    description:
      "A glamorous singer holds a Tootsie Roll like a microphone while a ring of swooning men leans in. The candy is staged as charisma, not sugar — a nickel sweet repositioned as the thing that makes you wanted in a room.",
    lesson: "Sell the social moment the product unlocks, not the product itself.",
    palette: ["#d2382b", "#f2c14a", "#1c1a17"],
    tags: ["tootsie roll", "candy", "comic ad"],
  },
  {
    id: "olands-export-ale-prettier",
    brand: "Oland's Export Ale",
    title: "Suddenly, She Never Looked Prettier",
    year: "1966",
    period: "Maritime brewing advertising",
    category: "Beverage",
    image: "/ads/canadiana/olands-export-ale-prettier.png",
    source: "https://brookstonbeerbulletin.com/beer-in-ads-1738-suddenly-she-never-looked-prettier/",
    sourceLabel: "Brookston Beer Bulletin — Beer In Ads",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with Oland Brewery or original rights holders.",
    origin: "Oland & Son (Halifax, Nova Scotia) Export Ale print advertisement",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      { label: "Beer In Ads #1738", href: "https://brookstonbeerbulletin.com/beer-in-ads-1738-suddenly-she-never-looked-prettier/" },
    ],
    description:
      "A blonde's smile is framed through the bubbles of the very glass she's raising, so the beer literally becomes the lens you see her through. Oland's lets the product flatter the drinker instead of describing the drink.",
    lesson: "When the product reframes the viewer's world, show the world through it.",
    palette: ["#e7b75a", "#c0392b", "#f3ede2"],
    tags: ["olands", "beer", "nova scotia"],
  },
  {
    id: "mobiloil-special-free-flowing",
    brand: "Mobiloil",
    title: "Free Flowing for Instant Protection",
    year: "1955",
    period: "Socony Mobil multi-grade era",
    category: "Automotive",
    image: "/ads/canadiana/mobiloil-special-free-flowing.png",
    source: "https://www.ebid.net/us/for-sale/1955-mobil-mobiloil-special-ad-multi-grade-motor-oil-159187482.htm",
    sourceLabel: "1955 Mobiloil Special ad listing",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with ExxonMobil (Socony Mobil) or original rights holders.",
    origin: "Socony Mobil Oil Co. 'Mobiloil Special' print advertisement",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      { label: "1955 Mobiloil Special listing", href: "https://www.ebid.net/us/for-sale/1955-mobil-mobiloil-special-ad-multi-grade-motor-oil-159187482.htm" },
    ],
    description:
      "The can pours a golden ribbon that becomes a thawed stream cutting through deep winter snow. Mobiloil dramatizes its one technical claim — flows freely in sub-zero cold — by turning a spec into a small landscape miracle.",
    lesson: "Stage the single benefit as a vivid physical event the eye can't argue with.",
    palette: ["#dfe6e6", "#b8472b", "#d9a441"],
    tags: ["mobil", "motor oil", "winter"],
  },
  {
    id: "canada-dry-face-is-america",
    brand: "Canada Dry",
    title: "The Face Is America, the Taste Is Canada Dry",
    year: "1959",
    period: "'Face Is America' campaign",
    category: "Beverage",
    image: "/ads/canadiana/canada-dry-face-is-america.png",
    source: "https://www.vintage-adventures.com/vintage-food-beverage-ads/4843-1962-canada-dry-true-fruit-orange-ad-face-is-america.html",
    sourceLabel: "Vintage Adventures — Canada Dry 'Face Is America'",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with Canada Dry / Keurig Dr Pepper or original rights holders.",
    origin: "Canada Dry Corporation 'Face Is America' campaign (agency J. M. Mathes)",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      { label: "Canada Dry 'Face Is America' listing", href: "https://www.vintage-adventures.com/vintage-food-beverage-ads/4843-1962-canada-dry-true-fruit-orange-ad-face-is-america.html" },
    ],
    description:
      "A sunburned fisherman, fly still hooked in his hat, tips back a can — and the headline turns one ordinary working face into the whole country. Canada Dry borrows plain-American authenticity to certify a soda's taste.",
    lesson: "Anchor a brand claim to a face the audience already trusts as 'us.'",
    palette: ["#8db7cf", "#c43a2e", "#e9d7a8"],
    tags: ["canada dry", "soda", "americana"],
  },
  {
    id: "canada-dry-not-a-kid",
    brand: "Canada Dry",
    title: "Doesn't Treat You Like a Kid",
    year: "1971",
    period: "Adult ginger-ale repositioning",
    category: "Beverage",
    image: "/ads/canadiana/canada-dry-not-a-kid.png",
    source: "https://archive.org/details/dmbb09503",
    sourceLabel: "Duke Libraries / Internet Archive (AdViews)",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with Canada Dry / Keurig Dr Pepper or original rights holders.",
    origin: "Canada Dry Ginger Ale 'doesn't treat you like a kid' campaign",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      { label: "Duke / Internet Archive campaign clip", href: "https://archive.org/details/dmbb09503" },
    ],
    description:
      "A bare hand pulls a sweating green bottle straight from the machine under a headline that picks a fight with every syrupy cola. Canada Dry recasts a mixer as the grown-up's drink by insulting the competition's sweetness.",
    lesson: "Define your product against the category's flaw, then flatter the buyer for outgrowing it.",
    palette: ["#3f6b3a", "#cfd2cf", "#1c1c1a"],
    tags: ["canada dry", "ginger ale", "positioning"],
  },
  // --- Canadian Pacific & travel ---
  {
    id: "canadian-pacific-train-4040",
    brand: "Canadian Pacific",
    title: "Locomotive 4040",
    year: "1950",
    period: "Streamlined diesel era",
    category: "Travel",
    image: "/ads/canadiana/canadian-pacific-train-4040.png",
    source: "https://hoodmuseum.dartmouth.edu/objects/ps.954.40.2",
    sourceLabel: "Hood Museum of Art, Dartmouth College",
    rights:
      "Reference crop for studyoldads.com; underlying poster artwork remains with Canadian Pacific or original rights holders.",
    origin: "Canadian Pacific travel poster by Peter Ewart",
    dimensions: "vertical",
    researchStatus: "verified",
    links: [
      { label: "Hood Museum object record", href: "https://hoodmuseum.dartmouth.edu/objects/ps.954.40.2" },
    ],
    description:
      "Peter Ewart shoots the diesel head-on, nose filling the frame, the mountains shrunk to a backdrop behind the beaver shield. The train isn't traveling through the Rockies; it's looming over them — power photographed like a portrait.",
    lesson: "Frame the machine head-on and oversized to make capability feel like character.",
    palette: ["#8c9aa6", "#c9a227", "#7a2520"],
    tags: ["canadian pacific", "train", "peter ewart"],
  },
  {
    id: "canadian-pacific-moose",
    brand: "Canadian Pacific",
    title: "Canadian Pacific Moose",
    year: "1938",
    period: "Silkscreen wildlife series",
    category: "Travel",
    image: "/ads/canadiana/canadian-pacific-moose.png",
    source: "https://www.allposters.com/-sp/Visit-Canada-Bull-Moose-Canadian-Pacific-Railway-Vintage-Railroad-Travel-Poster-1930s-Posters_i17476588_.htm",
    sourceLabel: "Canadian Pacific wildlife series catalog",
    rights:
      "Reference crop for studyoldads.com; underlying poster artwork remains with Canadian Pacific or original rights holders.",
    origin: "Canadian Pacific 'Visit Canada' silkscreen wildlife poster",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      { label: "Canadian Pacific moose poster record", href: "https://www.allposters.com/-sp/Visit-Canada-Bull-Moose-Canadian-Pacific-Railway-Vintage-Railroad-Travel-Poster-1930s-Posters_i17476588_.htm" },
    ],
    description:
      "Flat silkscreen blocks reduce a bull moose to a black silhouette against a burnt-orange sky, its legs doubling in the water. No train, no schedule — Canadian Pacific sells the wilderness itself as the reason to buy a ticket.",
    lesson: "Sometimes the destination's mood sells the journey better than the vehicle.",
    palette: ["#e8a32d", "#2c2722", "#5a8f7b"],
    tags: ["canadian pacific", "moose", "silkscreen"],
  },
  {
    id: "canadian-pacific-travel-streamliner",
    brand: "Canadian Pacific",
    title: "Travel Canadian Pacific",
    year: "1955",
    period: "Launch of 'The Canadian'",
    category: "Travel",
    image: "/ads/canadiana/canadian-pacific-travel-streamliner.png",
    source: "https://open.library.ubc.ca/collections/chung/chungtext/items/1.0357591",
    sourceLabel: "UBC Library — Chung Collection",
    rights:
      "Reference crop for studyoldads.com; underlying poster artwork remains with Canadian Pacific or original rights holders.",
    origin: "Canadian Pacific poster for the stainless-steel streamliner 'The Canadian'",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      { label: "Chung Collection catalog item", href: "https://open.library.ubc.ca/collections/chung/chungtext/items/1.0357591" },
    ],
    description:
      "A woman in a red hat beams beside the gleaming stainless dome car while the fine print lists trains, ships, planes, hotels and telecommunications. The face sells romance; the footnote sells an empire that moves you any way you like.",
    lesson: "Lead with one warm human image, then quietly reveal the scale behind it.",
    palette: ["#3aa0c4", "#c0392b", "#d8d5cf"],
    tags: ["canadian pacific", "streamliner", "the canadian"],
  },
  {
    id: "canadian-pacific-banff-rockies",
    brand: "Canadian Pacific",
    title: "Banff in the Canadian Rockies",
    year: "1936",
    period: "Golden-age railway tourism",
    category: "Travel",
    image: "/ads/canadiana/canadian-pacific-banff-rockies.png",
    source: "https://www.loc.gov/item/2007676065/",
    sourceLabel: "Library of Congress, Prints & Photographs",
    rights:
      "Reference crop for studyoldads.com; underlying poster artwork remains with Canadian Pacific or original rights holders.",
    origin: "Canadian Pacific 'Banff in the Canadian Rockies' poster by James Crockart",
    dimensions: "vertical",
    researchStatus: "verified",
    links: [
      { label: "Library of Congress record", href: "https://www.loc.gov/item/2007676065/" },
    ],
    description:
      "A well-dressed couple stands inside a dark arched window, looking out at the Bow Valley laid out like a painting below them. The frame within the frame puts the viewer in the hotel suite — the view is sold as something you'd own.",
    lesson: "Place the audience inside the vantage point so the scenery feels already theirs.",
    palette: ["#b6543a", "#3c6b4f", "#e6d6b0"],
    tags: ["canadian pacific", "banff", "james crockart"],
  },
  {
    id: "canadian-pacific-steamships-britishers",
    brand: "Canadian Pacific Steamships",
    title: "Britishers, Bring Your Families to Canada",
    year: "1925",
    period: "Interwar assisted emigration",
    category: "Travel",
    image: "/ads/canadiana/canadian-pacific-steamships-britishers.png",
    source: "https://digitalarchive.tpl.ca/objects/265968/britishers-bring-your-families-to-canada",
    sourceLabel: "Toronto Public Library Digital Archive",
    rights:
      "Reference crop for studyoldads.com; underlying poster artwork remains with Canadian Pacific or original rights holders.",
    origin: "Canadian Pacific Steamships emigration poster, lithographed in Canada 1925",
    dimensions: "vertical",
    researchStatus: "verified",
    links: [
      { label: "Toronto Public Library record", href: "https://digitalarchive.tpl.ca/objects/265968/britishers-bring-your-families-to-canada" },
    ],
    description:
      "A mother and children step down a gangway toward a waiting man's open arms, the ship's hull and a red boat-train framing the welcome. The price headline is huge, but the real pitch is the embrace — emigration sold as arrival, not departure.",
    lesson: "Lead a hard transaction with the warm moment it ends in.",
    palette: ["#2c4a7c", "#b23a2e", "#e8e2d4"],
    tags: ["canadian pacific", "steamships", "emigration"],
  },
  {
    id: "canada-go-greyhound-mountie",
    brand: "Greyhound",
    title: "Canada, Go Greyhound",
    year: "1965",
    period: "Mid-century bus tourism",
    category: "Travel",
    image: "/ads/canadiana/canada-go-greyhound-mountie.png",
    source: "https://chicagovintageposters.com/products/canada-go-greyhound",
    sourceLabel: "Chicago Vintage Posters dealer record",
    rights:
      "Reference crop for studyoldads.com; underlying poster artwork remains with Greyhound Lines or original rights holders.",
    origin: "Greyhound Lines 'Canada' tourism poster by Rod Ruth",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      { label: "Greyhound 'Canada' poster record", href: "https://chicagovintageposters.com/products/canada-go-greyhound" },
    ],
    description:
      "Rod Ruth stacks every Canadian cliché — a scarlet-serge Mountie, a moose, maple leaves, snow peaks and a pink chateau — into one upright icon. Greyhound doesn't sell the bus; it sells the postcard you'll collect by riding it.",
    lesson: "Bundle a place's symbols into one figure when you're selling the access, not the vehicle.",
    palette: ["#c0392b", "#2f5fa6", "#cfe0e8"],
    tags: ["greyhound", "canada", "rod ruth"],
  },
  {
    id: "ontario-vacation-province-camera",
    brand: "Ontario Travel",
    title: "Canada's Vacation Province",
    year: "1950",
    period: "'Vacation Province' campaign",
    category: "Travel",
    image: "/ads/canadiana/ontario-vacation-province-camera.png",
    source: "https://northernontario.travel/best/great-vintage-ontario-tourism-ads",
    sourceLabel: "Northern Ontario Travel — vintage poster feature",
    rights:
      "Reference crop for studyoldads.com; underlying poster artwork remains with the Government of Ontario or original rights holders.",
    origin: "Ontario Department of Travel and Publicity poster",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      { label: "Vintage Ontario tourism ads feature", href: "https://northernontario.travel/best/great-vintage-ontario-tourism-ads" },
    ],
    description:
      "A beaming man with a camera fills half the poster while his family plays at the lakeshore behind a road-sign reading ONTARIO. The province is sold through the tourist's own joy — you're shown the snapshot-maker before the scenery.",
    lesson: "Show the visitor delighted and the destination becomes a foregone conclusion.",
    palette: ["#2f6fb0", "#d8742b", "#e7dfc8"],
    tags: ["ontario", "tourism", "vacation province"],
  },
  {
    id: "ontario-family-variety-vacationland",
    brand: "Ontario Travel",
    title: "Family Variety Vacationland",
    year: "1959",
    period: "'Variety Vacationland' campaign",
    category: "Travel",
    image: "/ads/canadiana/ontario-family-variety-vacationland.png",
    source: "https://goldenageposters.com/products/c-1950s-ontario-canadas-family-friendly-vacationland-canadian-travel",
    sourceLabel: "Golden Age Posters dealer record",
    rights:
      "Reference crop for studyoldads.com; underlying poster artwork remains with the Government of Ontario or original rights holders.",
    origin: "Ontario Department of Travel and Publicity poster, lithographed in Canada",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      { label: "Ontario 'Vacationland' poster record", href: "https://goldenageposters.com/products/c-1950s-ontario-canadas-family-friendly-vacationland-canadian-travel" },
    ],
    description:
      "A whole family grins out of a moving convertible while a lake, cabin and sailboats slide past the birches behind them. Ontario sells motion and togetherness at once — the vacation is already happening, and everyone is in.",
    lesson: "Put the entire buying unit inside the experience, mid-enjoyment, to sell the whole household.",
    palette: ["#1f9fd0", "#e8c23a", "#d23a2c"],
    tags: ["ontario", "tourism", "family travel"],
  },
  {
    id: "ontario-victory-vacation-hunting-fishing",
    brand: "Ontario Travel",
    title: "For Your Victory Vacation",
    year: "1947",
    period: "Postwar tourism revival",
    category: "Travel",
    image: "/ads/canadiana/ontario-victory-vacation-hunting-fishing.png",
    source: "https://northernontario.travel/best/great-vintage-ontario-tourism-ads",
    sourceLabel: "Northern Ontario Travel — vintage poster feature",
    rights:
      "Reference crop for studyoldads.com; underlying poster artwork remains with the Government of Ontario or original rights holders.",
    origin: "Ontario Department of Travel and Publicity 'Victory Vacation' booklet cover",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      { label: "Vintage Ontario tourism ads feature", href: "https://northernontario.travel/best/great-vintage-ontario-tourism-ads" },
    ],
    description:
      "Two men land a fish on the rocks in a green duotone photo, a starburst promising a 'Victory Vacation' over the catch. Ontario reframes a fishing trip as the reward a war-tired country has earned — leisure as a patriotic entitlement.",
    lesson: "Tie the product to the moment's collective feeling and it stops being a luxury.",
    palette: ["#6f9e5a", "#1f1f1d", "#e9efe2"],
    tags: ["ontario", "fishing", "postwar"],
  },
  // --- Rolex: "you'd wear a Rolex" series ---
  seededAd({
    seed: "minh",
    id: "rolex-speaking-tomorrow",
    brand: "Rolex",
    title: "If You Were Speaking Here Tomorrow",
    year: "1978",
    period: "Executive prestige",
    category: "Watch",
    image: "/ads/minh/rolex-speaking-tomorrow.jpg",
    origin: "Rolex print advertisement crop from the seed board",
    dimensions: "vertical",
    description:
      "Rolex makes the watch a passport to rooms where consequences happen. The ad is not about telling time. It is about belonging to the calendar before everyone else arrives.",
    lesson: "Sell the room the product lets a buyer imagine entering.",
    palette: ["#111111", "#f5f0df", "#d2ad45"],
    tags: ["watch", "prestige", "business"],
  }),
  {
    id: "rolex-negotiating-here-tomorrow",
    brand: "Rolex",
    title: "If You Were Negotiating Here Tomorrow",
    year: "1967",
    period: "'You'd Wear a Rolex' campaign",
    category: "Watch",
    image: "/ads/canadiana/rolex-negotiating-here-tomorrow.png",
    source: "https://www.rolexmagazine.com/2013/11/if-you-were-negotiating-here-tomorrow.html",
    sourceLabel: "Rolex Magazine archive",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with Rolex or original rights holders.",
    origin: "American Rolex Watch Corp. Datejust advertisement",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      { label: "Rolex Magazine ad write-up", href: "https://www.rolexmagazine.com/2013/11/if-you-were-negotiating-here-tomorrow.html" },
    ],
    description:
      "A grey aerial of Geneva's Palais des Nations fills the page, the watch a small inset below. The conceit: where world leaders meet, the Datejust is already in the room. Rolex sells belonging to the table before it sells a movement.",
    lesson: "Place the product where the audience aspires to be, then make it the price of admission.",
    palette: ["#2a2a2a", "#d9d6cf", "#9a9388"],
    tags: ["rolex", "datejust", "status"],
  },
  {
    id: "rolex-taming-oil-well-fires",
    brand: "Rolex",
    title: "If Taming Oil Well Fires Were Your Job",
    year: "1969",
    period: "'You'd Wear a Rolex' campaign",
    category: "Watch",
    image: "/ads/canadiana/rolex-taming-oil-well-fires.png",
    source: "https://www.rolexmagazine.com/2020/03/red-adair-oil-well-firefighter.html",
    sourceLabel: "Rolex Magazine archive",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with Rolex or original rights holders.",
    origin: "American Rolex Watch Corp. Day-Date advertisement featuring Red Adair",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      { label: "Rolex Magazine — Red Adair ad", href: "https://www.rolexmagazine.com/2020/03/red-adair-oil-well-firefighter.html" },
    ],
    description:
      "Firefighter Red Adair walks into a wall of burning oil while the gold Day-Date glints in its inset. The watch survives what would kill most men, so the message lands sideways: toughness you'll never test, certified by someone who does.",
    lesson: "Borrow a real expert's danger to vouch for a quality the buyer will never stress.",
    palette: ["#c0461f", "#1b1b1b", "#d6a13a"],
    tags: ["rolex", "day-date", "red adair"],
  },
  {
    id: "rolex-lost-empires",
    brand: "Rolex",
    title: "If You Were Looking for Lost Empires Here Tomorrow",
    year: "1968",
    period: "'You'd Wear a Rolex' campaign",
    category: "Watch",
    image: "/ads/canadiana/rolex-lost-empires.png",
    source: "https://www.adpatina.com/products/1968-rolex-submariner-if-you-were-looking-for-lost-empires-advertisement",
    sourceLabel: "Ad Patina vintage ad archive",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with Rolex or original rights holders.",
    origin: "American Rolex Watch Corp. Submariner advertisement (Chichen Itza diving expedition)",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      { label: "Ad Patina record", href: "https://www.adpatina.com/products/1968-rolex-submariner-if-you-were-looking-for-lost-empires-advertisement" },
    ],
    description:
      "A diver glides over coral hunting treasure in the sacrificial well at Chichen Itza, the Submariner shown as a tool that depends on no one's mercy. The watch is sold as life-support, not jewelry — guaranteed to 660 feet.",
    lesson: "Reframe a luxury good as essential equipment by attaching it to real consequence.",
    palette: ["#1d1d1d", "#cfcdc6", "#6f7a74"],
    tags: ["rolex", "submariner", "diving"],
  },
  {
    id: "rolex-racing-12-meter",
    brand: "Rolex",
    title: "If You Were Racing a 12 Meter Here Tomorrow",
    year: "1970",
    period: "'You'd Wear a Rolex' campaign",
    category: "Watch",
    image: "/ads/canadiana/rolex-racing-12-meter.png",
    source: "https://www.theillustratedwatch.com/products/p/rolex-if-you-were-racing-a-12-meter-here-tomorrowyoud-wear-a-rolex",
    sourceLabel: "The Illustrated Watch archive",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with Rolex or original rights holders.",
    origin: "American Rolex Watch Corp. Date Submariner advertisement (America's Cup yacht Intrepid)",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      { label: "The Illustrated Watch record", href: "https://www.theillustratedwatch.com/products/p/rolex-if-you-were-racing-a-12-meter-here-tomorrowyoud-wear-a-rolex" },
    ],
    description:
      "The America's Cup defender Intrepid heels hard into the spray, crew hiked out on the rail, the Submariner inset below. Rolex keeps running one template — elite arena, ordinary-looking watch — until the watch itself reads as the credential.",
    lesson: "A repeated template across many arenas compounds into a single claim: this is what the capable wear.",
    palette: ["#1c1c1c", "#cdccc6", "#7d8893"],
    tags: ["rolex", "submariner", "sailing"],
  },
  {
    id: "rolex-flying-the-concorde",
    brand: "Rolex",
    title: "If You Were Flying the Concorde Tomorrow",
    year: "1969",
    period: "'You'd Wear a Rolex' campaign",
    category: "Watch",
    image: "/ads/canadiana/rolex-flying-the-concorde.png",
    source: "https://www.adpatina.com/products/1969-rolex-gmt-master-ref-1675-if-you-were-flying-the-concorde-advertisement",
    sourceLabel: "Ad Patina vintage ad archive",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with Rolex or original rights holders.",
    origin: "American Rolex Watch Corp. GMT-Master advertisement (Concorde test pilot Brian Trubshaw)",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      { label: "Ad Patina record", href: "https://www.adpatina.com/products/1969-rolex-gmt-master-ref-1675-if-you-were-flying-the-concorde-advertisement" },
    ],
    description:
      "The Concorde prototype sits on the tarmac as crowds gather around the future of flight, the GMT-Master — built to track two time zones at once — shown below. Rolex ties itself to the fastest thing humans had built and lets the halo transfer.",
    lesson: "Couple the product to a frontier the buyer admires and the newness rubs off.",
    palette: ["#1a1a1a", "#cfcdc7", "#8a6d3b"],
    tags: ["rolex", "gmt-master", "concorde"],
  },
  {
    id: "rolex-one-second-mr-foyt",
    brand: "Rolex",
    title: "One Second, Mr. Foyt",
    year: "1974",
    period: "Day-Date testimonial era",
    category: "Watch",
    image: "/ads/canadiana/rolex-one-second-mr-foyt.png",
    source: "https://www.ebay.com/itm/304628046988",
    sourceLabel: "Vintage Rolex / A.J. Foyt ad listing",
    rights:
      "Reference crop for studyoldads.com; underlying ad artwork remains with Rolex or original rights holders.",
    origin: "American Rolex Watch Corp. Day-Date advertisement featuring A.J. Foyt",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      { label: "A.J. Foyt Rolex ad listing", href: "https://www.ebay.com/itm/304628046988" },
    ],
    description:
      "The whole photograph of A.J. Foyt — desk, helmet, trophy — sits framed inside the shape of a giant gold Day-Date, so the racer who lives by the second is literally held within the watch. Rolex collapses the man and the instrument into one image.",
    lesson: "Frame the hero inside the product's silhouette and the two identities merge.",
    palette: ["#caa23a", "#2a211a", "#d8cbb0"],
    tags: ["rolex", "day-date", "a.j. foyt"],
  },
];

const allAds: Ad[] = [
  ...seedAds.slice(0, 12),
  ...discoveredAds,
  ...addedAds,
  ...canadianaAds,
  ...seedAds.slice(12),
  {
    id: "kodak-pocket-1900",
    brand: "Eastman Kodak",
    title: "Pocket Camera",
    year: "1900",
    period: "Turn of the century",
    category: "Photography",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Kodak%20pocket%20camera%20advertisement%201900.JPG",
    source:
      "https://commons.wikimedia.org/wiki/File:Kodak_pocket_camera_advertisement_1900.JPG",
    sourceLabel: "Wikimedia Commons",
    rights: "Public domain in the United States",
    origin: "The Outlook, August 11, 1900",
    dimensions: "vertical",
    researchStatus: "verified",
    links: [
      {
        label: "File record",
        href: "https://commons.wikimedia.org/wiki/File:Kodak_pocket_camera_advertisement_1900.JPG",
      },
      {
        label: "Kodak ads category",
        href: "https://commons.wikimedia.org/wiki/Category:Kodak_advertisements",
      },
    ],
    description:
      "Kodak sells a camera as permission: carry it, open it, keep the day. The page is not loud. It behaves like the product itself, small enough for a pocket and ambitious enough to change memory.",
    lesson:
      "Make the new behavior feel ordinary before the world has words for it.",
    palette: ["#efe6ce", "#1b1a16", "#a93a28"],
    tags: ["camera", "portability", "consumer technology"],
  },
  {
    id: "folding-pocket-kodak",
    brand: "Eastman Kodak",
    title: "Folding Pocket Kodak",
    year: "1900",
    period: "Portable photography",
    category: "Photography",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Folding%20Pocket%20Kodak%20Camera%20ad%201900.jpg",
    source:
      "https://commons.wikimedia.org/wiki/File:Folding_Pocket_Kodak_Camera_ad_1900.jpg",
    sourceLabel: "Wikimedia Commons",
    rights: "Public domain in the United States",
    origin: "Outing, August 1900",
    dimensions: "vertical",
    researchStatus: "verified",
    links: [
      {
        label: "File record",
        href: "https://commons.wikimedia.org/wiki/File:Folding_Pocket_Kodak_Camera_ad_1900.jpg",
      },
    ],
    description:
      "A folding camera turns a technical machine into a personal object. The ad is vertical, composed, almost domestic. It is not selling glass and bellows. It is selling the right to notice.",
    lesson: "When the object is complex, make the invitation simple.",
    palette: ["#ead9b7", "#2d2118", "#7b5032"],
    tags: ["camera", "portable", "magazine"],
  },
  {
    id: "pears-halley",
    brand: "Pears' Soap",
    title: "Halley's Comet",
    year: "1910",
    period: "Comet year",
    category: "Soap",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Advertisement%20for%20Pears%27%20Soap%20illustrated%20with%20Halley%27s%20Comet%20LCCN2002712858.jpg",
    source:
      "https://commons.wikimedia.org/wiki/File:Advertisement_for_Pears%27_Soap_illustrated_with_Halley%27s_Comet_LCCN2002712858.jpg",
    sourceLabel: "Library of Congress / Commons",
    rights: "No known restrictions on publication",
    origin: "Library of Congress Prints and Photographs Division",
    dimensions: "vertical",
    researchStatus: "verified",
    links: [
      {
        label: "LOC catalog",
        href: "https://www.loc.gov/pictures/item/2002712858/",
      },
      {
        label: "File record",
        href: "https://commons.wikimedia.org/wiki/File:Advertisement_for_Pears%27_Soap_illustrated_with_Halley%27s_Comet_LCCN2002712858.jpg",
      },
    ],
    description:
      "Pears borrows a once-in-a-lifetime sky event and makes cleanliness feel cosmic. It is opportunistic, yes, but beautifully so: a bar of soap hitched to a comet's tail.",
    lesson: "A product can enter culture by moving at culture's speed.",
    palette: ["#f4efe2", "#222a3a", "#c9a23a"],
    tags: ["soap", "culture", "Halley's Comet"],
  },
  {
    id: "lucky-strike-1920",
    brand: "Lucky Strike",
    title: "The Duluth Herald",
    year: "1920",
    period: "Postwar mass print",
    category: "Tobacco",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Lucky%20Strike%20-%20Jul%201920%20DH.jpg",
    source:
      "https://commons.wikimedia.org/wiki/File:Lucky_Strike_-_Jul_1920_DH.jpg",
    sourceLabel: "Wikimedia Commons",
    rights: "Public domain in the United States",
    origin: "The Duluth Herald, July 6, 1920",
    dimensions: "vertical",
    researchStatus: "verified",
    links: [
      {
        label: "File record",
        href: "https://commons.wikimedia.org/wiki/File:Lucky_Strike_-_Jul_1920_DH.jpg",
      },
      {
        label: "Category",
        href: "https://commons.wikimedia.org/wiki/Category:Lucky_Strike_advertisements",
      },
    ],
    description:
      "Before the green package became pop language, Lucky Strike worked in newspaper gravity: dense type, direct claim, hard sell. It is a reminder that iconic brands often begin as disciplined repetition.",
    lesson: "A mark becomes memory when it survives ugly media.",
    palette: ["#e5dcc8", "#181818", "#b73525"],
    tags: ["tobacco", "newspaper", "brand repetition"],
  },
  {
    id: "coca-cola-5c",
    brand: "Coca-Cola",
    title: "Drink Coca-Cola 5 Cents",
    year: "1900",
    period: "Early refreshment",
    category: "Beverage",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Cocacola-5cents-1900%20edit2.jpg",
    source:
      "https://commons.wikimedia.org/wiki/File:Cocacola-5cents-1900_edit2.jpg",
    sourceLabel: "Wikimedia Commons",
    rights: "Public domain in the United States",
    origin: "Commercial print, circa 1900",
    dimensions: "vertical",
    researchStatus: "verified",
    links: [
      {
        label: "File record",
        href: "https://commons.wikimedia.org/wiki/File:Cocacola-5cents-1900_edit2.jpg",
      },
      {
        label: "Coca-Cola ads category",
        href: "https://commons.wikimedia.org/wiki/Category:Coca-Cola_advertisements",
      },
    ],
    description:
      "The price is the headline because the ritual is still being taught. Five cents, a script logo, a promise of refreshment. The genius is consistency before scale.",
    lesson: "Teach one habit. Repeat until it feels inherited.",
    palette: ["#f1e2c2", "#981f1d", "#1c4a38"],
    tags: ["beverage", "price", "brand system"],
  },
  {
    id: "prince-albert-1913",
    brand: "Prince Albert",
    title: "Chief Joseph",
    year: "1913",
    period: "Magazine tobacco",
    category: "Tobacco",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Prince%20albert%20and%20chief%20joseph.jpg",
    source:
      "https://commons.wikimedia.org/wiki/File:Prince_albert_and_chief_joseph.jpg",
    sourceLabel: "Wikimedia Commons",
    rights: "Public domain in the United States",
    origin: "Magazine advertisement, 1913",
    dimensions: "vertical",
    researchStatus: "verified",
    links: [
      {
        label: "File record",
        href: "https://commons.wikimedia.org/wiki/File:Prince_albert_and_chief_joseph.jpg",
      },
      {
        label: "1913 ad category",
        href: "https://commons.wikimedia.org/wiki/Category:1913_advertisements",
      },
    ],
    description:
      "A beautiful artifact with uncomfortable machinery inside it. The layout uses portraiture and authority to sell tobacco, revealing how advertising can preserve craft and distortion on the same sheet.",
    lesson: "Study the form. Do not inherit the blind spot.",
    palette: ["#e7d7b7", "#68372a", "#243329"],
    tags: ["tobacco", "portrait", "cultural context"],
  },
  {
    id: "kodak-1916",
    brand: "Kodak",
    title: "Vest Pocket Autographic",
    year: "1916",
    period: "Pocketable image-making",
    category: "Photography",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Kodak%20advertisement.jpg",
    source:
      "https://commons.wikimedia.org/wiki/File:Kodak_advertisement.jpg",
    sourceLabel: "Wikimedia Commons",
    rights: "Public domain",
    origin: "Lectures pour tous, July 15, 1916",
    dimensions: "vertical",
    researchStatus: "verified",
    links: [
      {
        label: "File record",
        href: "https://commons.wikimedia.org/wiki/File:Kodak_advertisement.jpg",
      },
    ],
    description:
      "A small camera is positioned like a passport to modern life. The ad understands that portability is not a spec. It is the moment a tool stops waiting at home.",
    lesson:
      "The strongest feature is often a change in where the product can live.",
    palette: ["#dac9a6", "#15191a", "#bb3d2d"],
    tags: ["camera", "portable", "autographic"],
  },
  {
    id: "kelloggs-1910",
    brand: "Kellogg's",
    title: "Toasted Corn Flakes",
    year: "1910",
    period: "Breakfast modernity",
    category: "Food",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/AdvertisementKelloggsToastedCornFlakesMotherGuess1910.jpg",
    source:
      "https://commons.wikimedia.org/wiki/File:AdvertisementKelloggsToastedCornFlakesMotherGuess1910.jpg",
    sourceLabel: "Wikimedia Commons",
    rights: "Public domain in the United States",
    origin: "Advertisement, 1910",
    dimensions: "vertical",
    researchStatus: "verified",
    links: [
      {
        label: "File record",
        href: "https://commons.wikimedia.org/wiki/File:AdvertisementKelloggsToastedCornFlakesMotherGuess1910.jpg",
      },
      {
        label: "1910 ad category",
        href: "https://commons.wikimedia.org/wiki/Category:1910_advertisements",
      },
    ],
    description:
      "Breakfast becomes branded, boxed, and dependable. The page works because it shrinks a household decision into a name a child can ask for and a parent can recognize.",
    lesson: "Own the repeated morning, and you own a life pattern.",
    palette: ["#f4dfb8", "#233f7a", "#d1462f"],
    tags: ["food", "breakfast", "packaged goods"],
  },
  {
    id: "columbia-phonograph-1910",
    brand: "Columbia",
    title: "Phonograph",
    year: "1910",
    period: "Recorded sound",
    category: "Audio",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Columbia%20Phonograph%20advertisement%2C%201910.jpg",
    source:
      "https://commons.wikimedia.org/wiki/File:Columbia_Phonograph_advertisement,_1910.jpg",
    sourceLabel: "Wikimedia Commons",
    rights: "Public domain in the United States",
    origin: "Advertisement, 1910",
    dimensions: "vertical",
    researchStatus: "verified",
    links: [
      {
        label: "File record",
        href: "https://commons.wikimedia.org/wiki/File:Columbia_Phonograph_advertisement,_1910.jpg",
      },
      {
        label: "1910 ad category",
        href: "https://commons.wikimedia.org/wiki/Category:1910_advertisements",
      },
    ],
    description:
      "The phonograph ad has the posture of furniture and the promise of a portal. It sells sound as status: music not as event, but as possession.",
    lesson: "New media wins when it looks at home in the old room.",
    palette: ["#dfd1af", "#151f24", "#7f2e1f"],
    tags: ["audio", "home", "new media"],
  },
  {
    id: "george-dickel-1913",
    brand: "George Dickel",
    title: "Cascade Tennessee Whisky",
    year: "1913",
    period: "Pre-Prohibition spirits",
    category: "Whiskey",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/George-Dickel-cascade-ad-1913-mountains.jpg",
    source:
      "https://commons.wikimedia.org/wiki/File:George-Dickel-cascade-ad-1913-mountains.jpg",
    sourceLabel: "Wikimedia Commons",
    rights: "Public domain in the United States",
    origin: "Advertisement, 1913",
    dimensions: "vertical",
    researchStatus: "verified",
    links: [
      {
        label: "File record",
        href: "https://commons.wikimedia.org/wiki/File:George-Dickel-cascade-ad-1913-mountains.jpg",
      },
      {
        label: "1913 ad category",
        href: "https://commons.wikimedia.org/wiki/Category:1913_advertisements",
      },
    ],
    description:
      "The mountain scene gives the bottle a geography. This is origin story as sales tool: if the buyer can believe the place, the liquid gains a soul.",
    lesson: "Provenance is not a footnote. It is the stage.",
    palette: ["#e8d2a8", "#254336", "#9b3f20"],
    tags: ["whiskey", "origin", "pre-Prohibition"],
  },
  {
    id: "spalding-bicycles-1900",
    brand: "Spalding",
    title: "Bicycles",
    year: "1900",
    period: "Machine age leisure",
    category: "Sport",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/1900%20spalding%20bicycles%20ad.jpg",
    source:
      "https://commons.wikimedia.org/wiki/File:1900_spalding_bicycles_ad.jpg",
    sourceLabel: "Wikimedia Commons",
    rights: "Public domain in the United States",
    origin: "Advertisement, 1900",
    dimensions: "vertical",
    researchStatus: "verified",
    links: [
      {
        label: "File record",
        href: "https://commons.wikimedia.org/wiki/File:1900_spalding_bicycles_ad.jpg",
      },
      {
        label: "1900 U.S. ads",
        href: "https://commons.wikimedia.org/wiki/Category:1900_advertisements_in_the_United_States",
      },
    ],
    description:
      "The bicycle is sold as a tuned machine and a social signal. Tall type, thin wheels, clean promise: movement made elegant enough to become identity.",
    lesson: "A product that changes motion also changes self-image.",
    palette: ["#efe0bd", "#14242b", "#b14a2f"],
    tags: ["bicycle", "sport", "mobility"],
  },
  {
    id: "britannica-1913",
    brand: "Encyclopaedia Britannica",
    title: "The Eleventh Edition",
    year: "1913",
    period: "Knowledge by mail",
    category: "Publishing",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Ad%20Encyclopaedia-Britannica%2005-1913.jpg",
    source:
      "https://commons.wikimedia.org/wiki/File:Ad_Encyclopaedia-Britannica_05-1913.jpg",
    sourceLabel: "Wikimedia Commons",
    rights: "Public domain in the United States",
    origin: "Magazine advertisement, May 1913",
    dimensions: "vertical",
    researchStatus: "verified",
    links: [
      {
        label: "File record",
        href: "https://commons.wikimedia.org/wiki/File:Ad_Encyclopaedia-Britannica_05-1913.jpg",
      },
      {
        label: "1913 ad category",
        href: "https://commons.wikimedia.org/wiki/Category:1913_advertisements",
      },
    ],
    description:
      "Britannica compresses authority into a card-sized proposition. The promise is not entertainment. It is command of the shelf, the study, the argument.",
    lesson: "A premium product can whisper when the institution is loud.",
    palette: ["#eee3ca", "#20201d", "#85683a"],
    tags: ["publishing", "knowledge", "mail order"],
  },
  {
    id: "pears-sovereign-soap-1901",
    brand: "Pears' Soap",
    title: "The Sovereign Soap",
    year: "1901",
    period: "Edwardian magazine print",
    category: "Soap",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/The%20Sovereign%20Soap%20%28Pears%27%20advertisement%29.jpg",
    source:
      "https://commons.wikimedia.org/wiki/File:The_Sovereign_Soap_(Pears%27_advertisement).jpg",
    sourceLabel: "Wikimedia Commons",
    rights: "Public domain in the United States",
    origin: "McClure's Magazine, December 1901",
    dimensions: "vertical",
    researchStatus: "verified",
    links: [
      {
        label: "File record",
        href: "https://commons.wikimedia.org/wiki/File:The_Sovereign_Soap_(Pears%27_advertisement).jpg",
      },
      {
        label: "Internet Archive source",
        href: "https://archive.org/details/mc-clures-magazine-v-18-n-02-1901-12",
      },
    ],
    description:
      "Pears turns soap into crown and country. The ad is pure hierarchy: a product elevated until the ordinary bathroom object starts behaving like an institution.",
    lesson: "If the category is humble, give it ceremony.",
    palette: ["#eadcc0", "#1c1c1a", "#9d2f22"],
    tags: ["soap", "magazine", "ceremony"],
  },
  {
    id: "cigarette-cyclist-1900",
    brand: "Ogden & Phillip's",
    title: "Cigarette Cyclist",
    year: "1900",
    period: "Turn of the century mobility",
    category: "Tobacco",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Cigarette%20ad%20cyclist%201900.jpg",
    source:
      "https://commons.wikimedia.org/wiki/File:Cigarette_ad_cyclist_1900.jpg",
    sourceLabel: "Wikimedia Commons",
    rights: "Public domain in the United States",
    origin: "Stanford Research into the Impact of Tobacco Advertising collection",
    dimensions: "vertical",
    researchStatus: "verified",
    links: [
      {
        label: "File record",
        href: "https://commons.wikimedia.org/wiki/File:Cigarette_ad_cyclist_1900.jpg",
      },
      {
        label: "Stanford source collection",
        href: "https://tobacco.stanford.edu/",
      },
    ],
    description:
      "A cigarette borrows the bicycle's new freedom and sells itself as part of the same modern body. The print is troubling and precise: vice dressed as motion.",
    lesson: "Advertising often wins by attaching itself to the newest feeling.",
    palette: ["#eee0c7", "#202020", "#b74732"],
    tags: ["tobacco", "bicycle", "women", "mobility"],
  },
];

const hiddenFromWall = new Set([
  "underground-golders-green",
  "underground-summer-nights",
  "kodak-pocket-1900",
  "folding-pocket-kodak",
  "pears-halley",
  "lucky-strike-1920",
  "prince-albert-1913",
  "kodak-1916",
  "kelloggs-1910",
  "columbia-phonograph-1910",
  "george-dickel-1913",
  "spalding-bicycles-1900",
  "britannica-1913",
  "pears-sovereign-soap-1901",
  "cigarette-cyclist-1900",
  "iwc-equality-sexes",
  "apple-think-different-einstein-1997",
  "apple-think-different-dylan-1997",
  "apple-think-different-chaplin-1997",
  "apple-think-different-henson-1997",
  "apple-think-different-ali",
  "absolut-warhol-1986",
  "volkswagen-lemon-1960",
  "volkswagen-mileage-varies-1960",
  "apple-macintosh-test-drive",
  "absolut-perfection",
  "patek-generations",
  // Newspaper / magazine print scans — off the visual wall (see docs/curation-taste.md)
  "rolls-royce-60mph-1958",
  "volkswagen-think-small",
  "volkswagen-easy-to-push",
  "volkswagen-snow-plow-1961",
  "volkswagen-never-1961",
  "volkswagen-impossible-1961",
  "avis-we-try-harder-1962",
]);

const researchOverrides: Record<string, Partial<Ad>> = {
  "audemars-piguet-royal-oak": {
    source:
      "https://www.watchcollectinglifestyle.com/home/experience-fourteen-vintage-audemars-piguet-royal-oak-advertisements-from-1972-to-1998",
    sourceLabel: "Watch Collecting Lifestyle archive",
    researchStatus: "verified",
    links: [
      {
        label: "Vintage Royal Oak ads archive",
        href: "https://www.watchcollectinglifestyle.com/home/experience-fourteen-vintage-audemars-piguet-royal-oak-advertisements-from-1972-to-1998",
      },
      {
        label: "Audemars Piguet Royal Oak history",
        href: "https://apchronicles.audemarspiguet.com/en/article/birth-of-an-icon",
      },
      { label: "Seed thread", href: minhSeed },
    ],
  },
  "ipod-1000-songs-pocket": {
    source: "https://www.apple.com/newsroom/2001/10/23Apple-Presents-iPod/",
    sourceLabel: "Apple Newsroom",
    researchStatus: "verified",
    links: [
      {
        label: "Apple iPod launch release",
        href: "https://www.apple.com/newsroom/2001/10/23Apple-Presents-iPod/",
      },
      { label: "Seed thread", href: minhSeed },
    ],
  },
  "rolls-royce-simply-best": {
    year: "1985",
    source:
      "https://sirjacks.com/products/framed-rolls-royce-simply-the-best-advertisement",
    sourceLabel: "Sir Jack's vintage ad listing",
    researchStatus: "verified",
    links: [
      {
        label: "Vintage ad listing",
        href: "https://sirjacks.com/products/framed-rolls-royce-simply-the-best-advertisement",
      },
      { label: "Seed thread", href: minhSeed },
    ],
  },
  "volvo-parliament-speakers": {
    source:
      "https://www.hobbydb.com/marketplaces/hobbydb/catalog_items/there-are-more-speakers-in-a-volvo-than-there-are-in-the-houses-of-parliament",
    sourceLabel: "hobbyDB print ad record",
    researchStatus: "verified",
    links: [
      {
        label: "hobbyDB print ad record",
        href: "https://www.hobbydb.com/marketplaces/hobbydb/catalog_items/there-are-more-speakers-in-a-volvo-than-there-are-in-the-houses-of-parliament",
      },
      { label: "Seed thread", href: minhSeed },
    ],
  },
  "toyota-previa-lamborghini": {
    brand: "Daihatsu",
    title: "Picks Up Five Times More Women",
    year: "1996",
    period: "Hijet MPV provocation",
    image: "/ads/minh/toyota-previa-lamborghini.jpg",
    source:
      "https://www.digitaltripathi.com/ad-library/daihatsu-hijet-print-ad-picks-up-five-times-more-women-than-a-lamborghini/",
    sourceLabel: "Digital Tripathi ad library",
    origin: "Daihatsu Hijet MPV print advertisement crop from the seed board",
    researchStatus: "verified",
    links: [
      {
        label: "Digital Tripathi ad library",
        href: "https://www.digitaltripathi.com/ad-library/daihatsu-hijet-print-ad-picks-up-five-times-more-women-than-a-lamborghini/",
      },
      {
        label: "American Marketing Association context",
        href: "https://www.ama.org/marketing-news/shattering-gendered-marketing/",
      },
      {
        label: "Academic advertising example",
        href: "https://publications-prairial.fr/elad-silda/index.php?id=851&lang=en",
      },
      { label: "Seed thread", href: minhSeed },
    ],
    tags: ["daihatsu", "hijet", "mpv", "humor"],
  },
  "volkswagen-think-small": {
    source:
      "https://peoplesgdarchive.org/item/16761/think-small-advertising-campaign",
    sourceLabel: "People's Graphic Design Archive",
    researchStatus: "verified",
    links: [
      {
        label: "People's Graphic Design Archive",
        href: "https://peoplesgdarchive.org/item/16761/think-small-advertising-campaign",
      },
      {
        label: "The Drum campaign history",
        href: "https://www.thedrum.com/news/marketing-moment-86-vw-changes-course-advertising-its-think-small-campaign",
      },
      { label: "Seed thread", href: minhSeed },
    ],
  },
  "rolex-speaking-tomorrow": {
    year: "1967",
    period: "Day-Date leadership campaign",
    source:
      "https://www.deathrowads.com/product-page/1967-rolex-day-date-president-ref-1803-ad-if-you-were-speaking-here-tomorrow",
    sourceLabel: "Deathrowads vintage ad archive",
    researchStatus: "verified",
    links: [
      {
        label: "Vintage ad listing",
        href: "https://www.deathrowads.com/product-page/1967-rolex-day-date-president-ref-1803-ad-if-you-were-speaking-here-tomorrow",
      },
      {
        label: "Original advert listing",
        href: "https://www.thenostalgiashop.co.uk/products/rolex-day-date-united-nations-original-advert-1969-ref-ad11207",
      },
      { label: "Seed thread", href: minhSeed },
    ],
  },
  "volkswagen-easy-to-push": {
    source: "https://swipefile.com/classic-volkswagen-beetle-ads",
    sourceLabel: "Swipefile Beetle ad archive",
    researchStatus: "verified",
    links: [
      {
        label: "Swipefile Beetle ad archive",
        href: "https://swipefile.com/classic-volkswagen-beetle-ads",
      },
      { label: "Seed thread", href: minhSeed },
    ],
  },
  "volkswagen-lemon-1960": {
    source:
      "https://www.volkswagen-group.com/en/images/detail/chronicle-1960-ad-lemon-78559",
    sourceLabel: "Volkswagen Group archive",
    researchStatus: "verified",
    links: [
      {
        label: "Volkswagen Group archive",
        href: "https://www.volkswagen-group.com/en/images/detail/chronicle-1960-ad-lemon-78559",
      },
      {
        label: "Luerzer's Archive",
        href: "https://www.luerzersarchive.com/en/magazine/print-detail/vw-volkswagen-12400.html",
      },
      {
        label: "Discovery source",
        href: "https://www.indieauto.org/2023/09/20/if-you-ran-vw-in-1959-how-would-you-prepare-for-detroits-compacts/",
      },
    ],
  },
  "volkswagen-snow-plow-1961": {
    source:
      "https://autohistorypreservationsociety.org/document/1961-volkswagen-ad-a-volkswagen-obviously/",
    sourceLabel: "Auto History Preservation Society",
    researchStatus: "verified",
    links: [
      {
        label: "Auto History Preservation Society",
        href: "https://autohistorypreservationsociety.org/document/1961-volkswagen-ad-a-volkswagen-obviously/",
      },
      {
        label: "Discovery source",
        href: "https://www.indieauto.org/2023/09/20/if-you-ran-vw-in-1959-how-would-you-prepare-for-detroits-compacts/",
      },
    ],
  },
  "volkswagen-never-1961": {
    source:
      "https://autohistorypreservationsociety.org/document/1961-volkswagen-ad-never/",
    sourceLabel: "Auto History Preservation Society",
    researchStatus: "verified",
    links: [
      {
        label: "Auto History Preservation Society",
        href: "https://autohistorypreservationsociety.org/document/1961-volkswagen-ad-never/",
      },
      {
        label: "Discovery source",
        href: "https://www.indieauto.org/2023/09/20/if-you-ran-vw-in-1959-how-would-you-prepare-for-detroits-compacts/",
      },
    ],
  },
  "apple-ii-simplicity": {
    source:
      "https://www.duxburysystems.org/downloads/library/texas/apple/history/museum/ads/simplicity.html",
    sourceLabel: "Apple II History Museum",
    researchStatus: "verified",
    links: [
      {
        label: "Apple II History Museum",
        href: "https://www.duxburysystems.org/downloads/library/texas/apple/history/museum/ads/simplicity.html",
      },
      { label: "Seed thread", href: minhSeed },
    ],
  },
  "porsche-nobodys-perfect": {
    source: "https://www.adslibrary.com/nobody-s-perfect-e5675c06bb7",
    sourceLabel: "Ads Library",
    researchStatus: "verified",
    links: [
      {
        label: "Ads Library entry",
        href: "https://www.adslibrary.com/nobody-s-perfect-e5675c06bb7",
      },
      {
        label: "Porsche 956 race context",
        href: "https://www.stuttcars.com/porsche-956/",
      },
      { label: "Seed thread", href: minhSeed },
    ],
  },
  "porsche-investment-million": {
    brand: "Volvo",
    title: "He Never Dreamed His Investment Would Make a Million",
    year: "1987",
    period: "P1800 million-mile proof",
    source: "https://www.media.volvocars.com/us/en-us/media/pressreleases/732/",
    sourceLabel: "Volvo Cars newsroom",
    origin: "Volvo P1800 mileage print advertisement crop from the seed board",
    researchStatus: "verified",
    links: [
      {
        label: "Volvo Cars two-million-mile newsroom story",
        href: "https://www.media.volvocars.com/us/en-us/media/pressreleases/732/",
      },
      {
        label: "Volvo P1800 three-million-mile context",
        href: "https://www.volvocars.com/us/media/press-releases/B611073CD6A225F6",
      },
      {
        label: "UPI one-million-mile report",
        href: "https://www.upi.com/Archives/1987/10/25/One-million-miles-and-still-running/6447562132800/",
      },
      { label: "Seed thread", href: minhSeed },
    ],
    description:
      "A $4,150 coupe becomes a million-mile argument. The page does not sell collector value; it sells proof you can count on, with Irv Gordon standing beside the car like the warranty became a person.",
    lesson: "Longevity lands harder when the customer becomes the evidence.",
    palette: ["#6b6b69", "#f4efe4", "#7c1f1c"],
    tags: ["volvo", "p1800", "longevity", "irv gordon"],
  },
  "rolls-royce-60mph-1958": {
    researchStatus: "verified",
    links: [
      {
        label: "Swiped archive",
        href: "https://swiped.co/file/rolls-royce-ad-by-david-ogilvy/",
      },
    ],
  },
  "volkswagen-mileage-varies-1960": {
    source:
      "https://autohistorypreservationsociety.org/document/1960-volkswagen-ad-why/",
    sourceLabel: "Auto History Preservation Society",
    researchStatus: "verified",
    links: [
      {
        label: "Auto History Preservation Society",
        href: "https://autohistorypreservationsociety.org/document/1960-volkswagen-ad-why/",
      },
      {
        label: "Discovery source",
        href: "https://www.indieauto.org/2023/09/20/if-you-ran-vw-in-1959-how-would-you-prepare-for-detroits-compacts/",
      },
    ],
  },
  "apple-macintosh-test-drive": {
    source: "https://www.cultofmac.com/apple-history/test-drive-a-macintosh",
    sourceLabel: "Cult of Mac campaign history",
    researchStatus: "verified",
    links: [
      {
        label: "Campaign history",
        href: "https://www.cultofmac.com/apple-history/test-drive-a-macintosh",
      },
      {
        label: "Stanford Macintosh marketing archive",
        href: "https://stanford.edu/dept/SUL/sites/mac/market.html",
      },
    ],
  },
  "absolut-perfection": {
    source:
      "https://www.absolut.com/en-us/blog/vodka-and-spirits/the-story-of-the-absolut-bottle-and-brand/",
    sourceLabel: "Absolut brand history",
    researchStatus: "verified",
    links: [
      {
        label: "Absolut brand history",
        href: "https://www.absolut.com/en-us/blog/vodka-and-spirits/the-story-of-the-absolut-bottle-and-brand/",
      },
      {
        label: "Marketing Millennials campaign writeup",
        href: "https://themarketingmillennials.com/articles/2023-07-05/this-campaign-was-absolut-perfection/",
      },
    ],
  },
  "apple-think-different-ali": {
    researchStatus: "verified",
    links: [
      {
        label: "Posterama campaign guide",
        href: "https://www.posterama.co/blogs/news/13414153-apple-think-different",
      },
      {
        label: "Internet Archive internal campaign video",
        href: "https://archive.org/details/introducing-campaign-to-apple-internal",
      },
    ],
  },
  "underground-keep-warm-travel": {
    year: "1925",
    period: "Kathleen Stenning weather series",
    source:
      "https://www.ltmuseumshop.co.uk/keep-warm-travel-underground-kathleen-stenning-1925",
    sourceLabel: "London Transport Museum",
    researchStatus: "verified",
    links: [
      {
        label: "London Transport Museum poster record",
        href: "https://www.ltmuseumshop.co.uk/keep-warm-travel-underground-kathleen-stenning-1925",
      },
      {
        label: "Google Arts & Culture",
        href: "https://artsandculture.google.com/asset/keep-warm-travel-underground-kathleen-stenning/PAE9M-oVkIzSpw?hl=en",
      },
      { label: "Seed thread", href: londonSeed },
    ],
  },
  "underground-take-cover": {
    year: "1925",
    period: "Kathleen Stenning weather series",
    source: "https://www.tooveys.com/sale-results/prints-maps-and-posters/2124/1/",
    sourceLabel: "Toovey's auction record",
    researchStatus: "verified",
    links: [
      {
        label: "Toovey's auction record",
        href: "https://www.tooveys.com/sale-results/prints-maps-and-posters/2124/1/",
      },
      { label: "Seed thread", href: londonSeed },
    ],
  },
  "underground-lure": {
    source:
      "https://www.ltmuseumshop.co.uk/posters/collections/transport/the-lure-of-the-underground-poster",
    sourceLabel: "London Transport Museum",
    researchStatus: "verified",
    links: [
      {
        label: "London Transport Museum poster record",
        href: "https://www.ltmuseumshop.co.uk/posters/collections/transport/the-lure-of-the-underground-poster",
      },
      {
        label: "People's Graphic Design Archive",
        href: "https://peoplesgdarchive.org/item/18755/the-lure-of-the-underground",
      },
      {
        label: "Google Arts & Culture",
        href: "https://artsandculture.google.com/asset/the-lure-of-the-underground-alfred-leete/VQHHQKc67IUr4w?hl=en",
      },
      { label: "Seed thread", href: londonSeed },
    ],
  },
  "underground-fly-the-tube": {
    year: "1978",
    period: "Circa 1978 Heathrow Central extension",
    source:
      "https://www.dominicwinter.co.uk/Auction/Lot/259-london-transport-fly-the-tube-take-the-piccadilly-line-to-heathrow-airport-its-the-only-way-to-fly-circa-1978/?lot=393468&sd=1",
    sourceLabel: "Dominic Winter auction record",
    researchStatus: "verified",
    links: [
      {
        label: "Original poster auction record",
        href: "https://www.dominicwinter.co.uk/Auction/Lot/259-london-transport-fly-the-tube-take-the-piccadilly-line-to-heathrow-airport-its-the-only-way-to-fly-circa-1978/?lot=393468&sd=1",
      },
      {
        label: "London Transport Museum reprint note",
        href: "https://www.goblin.no/p/fly-the-tube-poster2/",
      },
      { label: "Seed thread", href: londonSeed },
    ],
  },
};

export const ads: Ad[] = allAds
  .filter((ad) => !hiddenFromWall.has(ad.id))
  .map((ad) => ({ ...ad, ...researchOverrides[ad.id] }));
