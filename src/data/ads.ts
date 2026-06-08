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
  origin: string;
  dimensions: "vertical" | "near-vertical";
  researchStatus: "seeded" | "verified";
  links: AdLink[];
  description: string;
  palette: string[];
};

const minhSeed =
  "https://fxtwitter.com/oneminhnguyen/status/2036494252050620450";
const londonSeed =
  "https://fxtwitter.com/marlouiise/status/2061240137426846054";

function seededAd(
  ad: Omit<
    Ad,
    "source" | "sourceLabel" | "researchStatus" | "links"
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
    year: "1992",
    period: "Luxury sports watch",
    category: "Watch",
    image: "/ads/minh/audemars-piguet-royal-oak.jpg",
    origin: "Royal Oak print advertisement crop from the seed board",
    dimensions: "vertical",
    description:
      "Gerald Genta designed the Royal Oak overnight in 1971 for Audemars Piguet, and at launch in 1972 it priced a steel sports watch at 3,300 Swiss francs - on par with gold dress watches and roughly ten times a steel Rolex Submariner. The campaign line 'It takes more than money to wear a Royal Oak' answered the obvious objection head on: instead of justifying steel costing gold money, it reframed the price as a filter, implying the barrier was taste rather than budget.",
    palette: ["#f7f4ea", "#181613", "#b7914e"],
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
      "This mid-1980s Rolls-Royce ad places a Corniche convertible on ordinary London streets and rests on the brand's standing claim to be 'the best motor car in the world.' Rather than argue the point with specs, the layout uses the everyday city backdrop as contrast, letting the car's scale and finish carry the assertion. It trades on the reputation built decades earlier by David Ogilvy's 1958 'electric clock' campaign, which had already made understatement the house style.",
    palette: ["#e9dfcf", "#241f1b", "#b97942"],
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
      "When Steve Jobs unveiled the first iPod in October 2001, the player held a 5GB hard drive - but the ad never says '5GB.' TBWA\\Chiat\\Day copywriter James Vincent reframed that number as '1,000 songs in your pocket,' translating a storage spec competitors were also quoting into a quantity of music a person could actually picture carrying. It worked because rival MP3 players led with megabytes; Apple led with the only figure a buyer cared about.",
    palette: ["#f4f2ed", "#111111", "#c8c8c3"],
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
      "This UK Volvo press ad sells the car's stereo with a single comparison headline - 'There are more speakers in a Volvo than there are in the Houses of Parliament' - rather than listing wattage or speaker counts. The pun on 'speakers' (audio drivers versus the parliamentary post of Speaker) lands the spec as a joke a reader decodes themselves, which both flatters the audience and makes a dry feature memorable. Volvo's long-running UK account sat with Abbott Mead Vickers BBDO in this era.",
    palette: ["#6b5738", "#f1ead8", "#a8834a"],
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
      "This 1996 UK ad for the Daihatsu Hijet people-carrier ran the headline 'Picks up five times more women than a Lamborghini' under a roughly 8,497-pound price. The math is the joke: a two-seat Lamborghini can carry one passenger, the six-seat Hijet five, so the boast about 'picking up women' is literally about seat count. It borrows sports-car bravado to sell a cheap practical van, making frugality read as the smarter flex.",
    palette: ["#f3f0e7", "#111111", "#d6432c"],
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
      "Apple's first Apple II brochure in 1977 carried the headline 'Simplicity is the ultimate sophistication' over a single red apple on white. The line is often attributed to Leonardo da Vinci, but researchers have found no source in his work; the phrasing traces at least to a 1931 novel. Apple's pitch was strategic for the moment: home computers were intimidating hobbyist kits, so leading with simplicity reframed approachability as a high-end virtue rather than a compromise.",
    palette: ["#fbfaf6", "#171717", "#d7342c"],
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
      "At the 1983 Le Mans 24 Hours, Porsche 956s took eight of the top ten places, led by Al Holbert's winning car, but a Sauber broke the streak by finishing among them. Porsche turned that near-sweep into the poster headline 'Nobody's perfect' over the finishing order. The self-deprecating line works because the 'flaw' it admits is failing to win literally every top slot - the humility is a brag about near-total dominance.",
    palette: ["#fbfaf5", "#111111", "#d9d3c5"],
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
      "This Volvo ad is built around Irv Gordon, a New York teacher who bought a Volvo P1800 in 1966 for 4,150 dollars and drove it past a million miles (eventually over three million by 2013). Rather than claim durability, the ad hands over a single owner's odometer as proof, with Gordon present as living evidence. Using a real, checkable record sidesteps the credibility problem every reliability claim faces.",
    palette: ["#6b6b69", "#f4efe4", "#7c1f1c"],
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
      "This mid-1980s BMW ad frames the daily commute as a temptation rather than a chore, with the 'Who's going to work?' line inviting the driver to choose the long, enjoyable route over the direct one. Instead of showing speed, it dramatizes the moment of decision, positioning the car as a reason to want the drive itself. The approach sells driving pleasure by appealing to the reader's own reluctance to behave responsibly.",
    palette: ["#262826", "#f0eadc", "#7e8aa0"],
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
      "Kathleen Stenning designed 'Keep warm - travel Underground' for the Underground Group in 1925, one of a weather-themed series (alongside 'Avoid the wet' and 'Take cover') that turned bad English weather into a reason to ride. The poster reduces winter to a field of snowfall dots with a warm-lit train below, making the practical promise - shelter and movement underground - through pure visual contrast rather than copy. It is held in the London Transport Museum collection.",
    palette: ["#f5f0dc", "#7b842e", "#d61f12"],
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
      "Kathleen Stenning designed this 1925 poster for the Underground Electric Railway Company as one of a four-part weather series (alongside 'Keep Warm,' 'Keep Dry,' and 'Avoid the Wet'). The pitch is a single contrast: a violent thunderstorm rendered in jagged bolts up top, calm seated passengers below. Rather than argue speed or price, it sells the Tube as shelter, recasting Britain's unreliable weather as the reason to go underground.",
    palette: ["#e4d9bc", "#20201c", "#d0bd2e"],
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
      "Alfred Leete drew this 1927 poster for the Underground Group, the same illustrator behind the WWI 'Your Country Needs You' Kitchener recruitment design. He renders the Underground roundel as a vortex sucking crowds toward it while bus and taxi riders look on enviously. The comic device makes a logistics argument visual: the network's speed is the lure, with the brand symbol itself doing the pulling.",
    palette: ["#f0dfb8", "#1d1b18", "#c83e2b"],
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
      "London Transport's 'Fly the Tube' poster sold the Piccadilly line's new airport service, which reached Heathrow when the line was extended there in 1977. The headline borrows the language of aviation - 'It's the only way to fly' - to reframe a subway ride as the start of the flight, positioning the train as a rival to the airport coach and taxi rather than just another Tube journey. It was issued as a lithographic poster in a series printed for the airport extension.",
    palette: ["#eee5d0", "#111111", "#c32322"],
  }),
];

const discoveredAds: Ad[] = [
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
      "D'Arcy, Anheuser-Busch's longtime agency, ran 'Pick a Pair' through the early 1960s to push multi-unit beer purchases. The headline reframes buying two six-packs as a small, alliterative decision rather than a bulk commitment, and the model holding the cartons stages the act as effortless. The mechanic is anchoring quantity: by naming the unit as a 'pair,' the ad makes twelve cans feel like the normal minimum.",
    palette: ["#c5302a", "#e6b4b8", "#f3efe6"],
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
      "This 1961 entry in D'Arcy's 'Pick a Pair' run spells out the call to action: 'Take home two 6-Paks of Bud.' The visual gag, often a slight woman lifting the cartons with ease, removes the practical objection that two six-packs are heavy or excessive. By restating the same instruction across years of ads, Anheuser-Busch trained shoppers to treat doubling up as routine rather than indulgent.",
    palette: ["#c2302a", "#d9b46a", "#f0e7d2"],
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
      "By 1963 the 'Pick a Pair' line was established enough that Anheuser-Busch and agency D'Arcy could lean on it as shorthand, calling two six-packs the 'smart way to buy.' The copy flatters the shopper for the bulk purchase the campaign had been pushing for years, while the blue dress reads cleanly against Budweiser's signature red packaging. It is repetition as strategy: the line works because buyers had already been taught it.",
    palette: ["#c4302a", "#2f5f8f", "#e7c98f"],
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
      "Anheuser-Busch positioned Michelob as its premium beer, and the 'In beer, going first class is Michelob. Period.' line borrowed the language of air travel to justify the higher price. The trick is the closing 'Period.' used as punctuation-turned-assertion: it ends the argument before one is made, signaling that the premium claim is settled fact. The dark bottle shot supplies the upscale cue the copy refuses to defend.",
    palette: ["#0b0b0b", "#e7d9a8", "#c4202a"],
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
      "This 1937 Anheuser-Busch piece, a 'Fortune Teller' promotional menu sheet rather than a magazine page, came just four years after Prohibition's repeal, when brewers were rebuilding beer's respectability. The Art Deco fortune-teller imagery and the 'America's Social Companion' line frame Budweiser as a wholesome part of sociable life. The mechanic is reassurance: tying beer to fortune and friendship distances it from the saloon-era reputation that Prohibition had cemented.",
    palette: ["#2f8f5e", "#c8201f", "#e0b23a"],
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
      "'Where there's life...there's Bud' launched around 1956 and was the first major campaign to popularize 'Bud' as the brand's nickname; Budweiser overtook the beer market for the No. 1 spot the following year. The campaign broke from stiff studio art by using real photography of ordinary people in casual moments, like this couple sharing a beach lunch. Casting beer into everyday life, rather than onto a pedestal, was the shift that moved volume.",
    palette: ["#3f7fa0", "#efe7d6", "#c0392b"],
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
      "By 1952 Jell-O, owned by General Foods and long billed as 'America's Most Famous Dessert,' was working to widen its audience beyond housewives. This ad stages cartoon cowboys holding up the icebox, with copy joking that 'out in the kitchen where men are men, a cowboy's best friend is a shimmering dish of Jell-O.' The humor disarms the gendered association: framing dessert as something even rugged Western men crave broadens who is allowed to want it.",
    palette: ["#3a6b8a", "#c43a2e", "#e8d6b0"],
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
      "Jell-O ran 'Now's the time for Jell-O' across the early 1950s, a flexible tagline that let one slogan address opposite buyers. Here it leans on the era's selling point for the gelatin dessert: low in calories, so a man checking his weight on the scale can treat himself without breaking a diet. The pitch reframes a sweet course as permission rather than indulgence, the same product sold to dieters that was sold to children as fun.",
    palette: ["#d9c7a8", "#c43a2e", "#e8a23a"],
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
      "Campbell's reprints its own red-and-white can label onto a carry tote, turning the grocery-shelf icon into a wearable object. The timing is the point: Andy Warhol's Campbell's Soup Cans had made the label a Pop Art emblem through the 1960s, and the brand leaned into that fame by selling the design back to shoppers as a fashion item. The label does double duty as packaging and as a logo a customer would parade in public.",
    palette: ["#b5202a", "#e8e2d4", "#1c2a3a"],
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
      "A painted hostess and a single conversational line carry this early-1950s Coke ad, the work of the illustration-heavy house style Coca-Cola favored before photography took over its print work. The headline frames the bottle as the reason to gather rather than as a beverage with attributes, so the product sells sociability instead of taste or refreshment. The warm domestic painting does the persuading; the copy just supplies the invitation.",
    palette: ["#a9c6b0", "#b8201f", "#efe7d6"],
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
      "'No.1 in the sun' was one of Coca-Cola's 1969 slogans, running the same year the brand rolled out its far better-known 'It's the Real Thing.' The four-word line works because the sweating contour bottle is already the most recognizable shape in the cooler, so the copy can claim summer leadership and let the silhouette supply the proof. The visual is the argument; the words just plant the flag.",
    palette: ["#b5201d", "#355e4a", "#f1ece1"],
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
      "NuTone of Cincinnati built radio-intercom systems wired into the house, with speakers in up to ten rooms fed by a master station that also handled AM-FM, records, and door-answering. The headline sells the wiring rather than a radio set: music becomes part of the architecture, a built-in upgrade rather than an appliance you plug in. In the mid-1960s these systems were a status feature in larger homes, the master unit listing around $150.",
    palette: ["#c9a063", "#b23a2e", "#efe3c8"],
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
      "The headline borrows a doctor's stock advice -- 'Didn't your doctor tell you to get more fresh air?' -- and answers it with a 911 Cabriolet. The trick is reframing: an open-top sports car, the definition of a luxury splurge, gets dressed up as sensible health policy, which gives the long copy a straight face while it sells indulgence. The medical setup also flatters the reader as someone whose only problem is not enough open road.",
    palette: ["#f2f2f0", "#111111", "#8a8a86"],
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
      "TBWA\\Chiat\\Day's Bondi-blue iMac campaign ran lines like 'Sorry, no beige' on billboards and print around the 1998 launch, the same agency behind 'Think Different' and the '1984' spot. The two words work as a jab at the PC industry, where beige towers were the unquestioned default, so Apple makes the case for color without listing a single technical spec. The copy turns a styling choice into the product's whole argument against its rivals.",
    palette: ["#eef0f1", "#1a6f86", "#141414"],
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
      "'Good with bacon' was a long-running line for HP, the brown sauce made in Birmingham and named for the Houses of Parliament on its label. The ad pairs the plain three-word claim with a comic painted scene rather than a recipe or a product shot, so the gag carries the message and the slogan just lands the punchline. Selling a breakfast condiment through humor rather than appetite-appeal makes it feel like a shared British joke.",
    palette: ["#1a1208", "#c9a23a", "#b23a2e"],
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
      "The pack rides a pair of ski goggles while skiers play, but the line doing the real work is Winston's slogan from its 1954 launch: 'tastes good like a cigarette should.' William Esty's agency used 'like' instead of the grammatically correct 'as' on purpose, and the error drew protests from teachers and even from Walter Cronkite, who refused to read it as written. The controversy kept the phrase repeated and argued over, which burned the brand name into memory for free.",
    palette: ["#c4202a", "#f2efe6", "#8fb0c4"],
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
      "The line 'pleasure is a Chesterfield' rode atop the brand's real selling number: '21 great tobaccos make 20 wonderful smokes,' a claim that the company blended 21 named tobaccos into every 20-cigarette pack. Liggett & Myers leaned on that arithmetic as a quality cue at a moment when rivals competed on filters and tar; counting ingredients let Chesterfield imply craft rather than chemistry. In a parallel 1962 run, the brand compressed it to '21-20,' borrowing the bust-waist-hip format to pair the slogan with pin-up models.",
    palette: ["#b58a3a", "#b0201d", "#efe6d2"],
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
      "'Bacardi rum mixes with everything' had been the brand's core pitch since the early 1970s, when ads fanned out grids of Coke, Pepsi, and Dr Pepper caps to argue the rum was the one bottle that worked with any mixer. This mid-1980s execution hijacks that established line and appends 'Except driving,' so the punchline only lands because the audience already knows the slogan. Swapping a soda cap for a steering wheel turns the brand's own boast into a drunk-driving warning without abandoning the campaign.",
    palette: ["#efe7d6", "#c0392b", "#2f7d4f"],
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
      "Bruce Kilgore's Air Force 1, launched in late 1982 as the first basketball shoe with Nike Air cushioning, was discontinued after two years, then revived in 1985 when Baltimore retailers sold 3,000 reissued pairs within days and pushed Nike to bring it back for good. An ad shooting the high-tops like trophies fits that comeback moment, selling court dominance: the pun 'on your feet or in your face' frames the shoe as both equipment and a means of posterizing an opponent.",
    palette: ["#141414", "#f2f2f0", "#9a9a96"],
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
      "Heinz had been printing '57 Varieties' since 1896 even though the company already made far more than 57 products; founder H.J. Heinz simply liked the ring of the number. This New Year's page leans on wordplay instead, building the layout around 'The Season's Best and the Best of Seasonings' so a single condiment borrows the goodwill of a holiday toast. The cherub and the oversized '1939' date the ad to a turn-of-year placement rather than a product claim.",
    palette: ["#1f4a4f", "#c0241f", "#e7dcc1"],
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
      "Nintendo's agency Leo Burnett pitched the 1996 Game Boy Pocket to adults, not kids, because gaming was shedding its children's-toy image and the slimmer redesign finally fit an actual pocket. The ad photographs a Game Boy outlined in a denim back pocket under 'Keep it in your pants,' a locker-room double entendre that signals the grown-up target audience while quietly making the only argument that mattered for a 'Pocket' model: it is small enough to carry where you already carry your wallet.",
    palette: ["#1c2733", "#5a6b82", "#c8c0a8"],
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
      "Leo Burnett ran Nintendo's 'Wii would like to play' campaign, and 'Vous jouez comme vous bougez' (you play as you move) is the French-market line for the same motion-control pitch. Rather than state that the remote tracks real movement, the layout leaves most of the page white and renders a faint sword-stroke trailing from a hand holding the controller, so the negative space reads as the swing. The blank field forces the eye to complete the motion, which is the product demo.",
    palette: ["#eef3f7", "#9fc6e0", "#2f6f9f"],
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
      "A blank recordable CD held 650 megabytes, an abstraction the ad makes physical by burying an office worker under a paper tower no person could file. By translating storage capacity into a stack of documents the disc replaces, Sony sidesteps the spec-sheet number entirely and lets the visual gag carry the math. It is the same move every storage ad faces: a buyer cannot picture a megabyte, but can picture the paperwork it eliminates.",
    palette: ["#1d2326", "#b7b2a6", "#c0241f"],
  },
  {
    id: "playstation-2-sleepless-nights",
    brand: "PlayStation",
    title: "(Sleepless Nights)²",
    year: "2001",
    period: "PlayStation 2 launch",
    category: "Electronics",
    image: "/ads/added/playstation-2-sleepless-nights.png",
    source: "https://en.wikipedia.org/wiki/PlayStation_2",
    sourceLabel: "PlayStation 2 — Wikipedia",
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
      "TBWA Paris built the PlayStation 2 'Sleepless Nights' ad around a bloodshot eye whose burst capillaries resolve into the controller's triangle, circle, cross, and square, credited to art director Jorge Carreno and copywriter Eric Helias. The trick is the morph: the buttons are not pasted on but grown from the veins, so the symbol of fatigue and the symbol of the console become the same image. It reframes lost sleep as proof the games are too absorbing to put down.",
    palette: ["#c6a08c", "#7a2e22", "#d8d2cf"],
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
      "The SX-70, released in 1972, was Edwin Land's folding single-lens-reflex camera that ejected a self-developing print with no peeling or timing, and Polaroid hired Charles and Ray Eames to explain it, including an 11-minute film shown to stockholders. The headline 'Polaroid invents the SX-70' treats the launch itself as the news; pairing a man composing through the reflex finder with a print emerging from the front presents the folding body and instant output as the proof the claim needs.",
    palette: ["#2a1d14", "#9c8f74", "#7fae9a"],
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
      "Campbell's pushed 'Soup on the Rocks' as part of a long effort, running from the mid-1950s into the 1970s, to recast canned beef bouillon as a chilled party drink: poured over ice in a rocks glass and sipped like an Old Fashioned. The company seeded the idea by mailing magazine editors and broadcasters care packages with an ice bucket, tongs, a can of bouillon, and a recipe booklet, and even gifted the drink to the Chicago White Sox and Brooklyn Dodgers. The pitch borrowed the cocktail's ritual to invent a new, warm-weather occasion for a pantry staple.",
    palette: ["#c5302a", "#7a1d18", "#efe7d8"],
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
      "Two silhouettes lean into a single flame at dusk while camels file across the dune behind them, the pack glowing in the corner. By staging the shared light as the moment of connection, the ad sells warmth and intimacy and lets the cigarette stand in as the social prop rather than naming nicotine. The desert and camel-caravan imagery had long been Camel's signature, tying R.J. Reynolds' brand back to the exotic Turkish-tobacco association in its name.",
    palette: ["#7a3b1d", "#d99a2b", "#2a1810"],
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
      "Created by Fallon McElligott (Minneapolis) -- art director Houman Pirdavari, copywriter Jarl Olsen -- the ad bends Penn tennis balls into the curve of a croissant and lets the line 'Official Ball of the 1988 French Open' supply the joke's payoff. The single visual pun fuses the most French of pastries with the Paris clay-court major, so an American ball stakes its claim at the tournament without arguing the point. It is frequently cited as a model of surrealist, image-driven advertising.",
    palette: ["#d7d000", "#cfc6b4", "#6b6552"],
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
    origin: "Sweets Company of America 'Life of the Party' comic-page ad",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      { label: "1950 Tootsie Roll print-ad listing", href: "https://www.ebay.com/itm/154119648285" },
    ],
    description:
      "An illustrated woman, glamorous and smiling, is ringed by a cluster of attentive men, with the candy positioned as the reason she is the center of attention. Running in LIFE magazine around 1950, the ad repositions a penny-cheap sweet as social currency rather than sugar, leaning on the era's convention of selling everyday products through romantic popularity. The Tootsie Roll itself dates to 1896, when Leo Hirshfield is said to have named it for his daughter.",
    palette: ["#d2382b", "#f2c14a", "#1c1a17"],
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
    origin: "Oland & Son (Halifax, Nova Scotia) Export Ale print advertisement",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      { label: "Beer In Ads #1738", href: "https://brookstonbeerbulletin.com/beer-in-ads-1738-suddenly-she-never-looked-prettier/" },
    ],
    description:
      "The headline 'Suddenly, She Never Looked Prettier!' does the selling: rather than describe the ale, it credits the beer with improving how the drinker sees the woman beside him, a flattery-by-association play common in 1960s liquor ads. Oland's Export Ale came from the Oland Brewery of Halifax, Nova Scotia, founded in the early 20th century and a staple in Eastern Canada; the family sold the brewery to Labatt in 1971 but kept Moosehead, which they still run.",
    palette: ["#e7b75a", "#c0392b", "#f3ede2"],
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
    origin: "Socony Mobil Oil Co. 'Mobiloil Special' print advertisement",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      { label: "1955 Mobiloil Special listing", href: "https://www.ebid.net/us/for-sale/1955-mobil-mobiloil-special-ad-multi-grade-motor-oil-159187482.htm" },
    ],
    description:
      "The can pours a golden ribbon that thaws into a stream cutting through deep snow, dramatizing the product's one technical claim: Mobiloil Special was an early multi-grade oil that flowed like a thin SAE 10W at 0F yet thickened to SAE 30-grade protection at 210F. Multi-grade oils were a mid-1950s novelty, and the snow visual translates that cold-start viscosity spec into something a winter driver could picture. The brand belonged to Socony-Vacuum, which became Socony Mobil Oil in 1955.",
    palette: ["#dfe6e6", "#b8472b", "#d9a441"],
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
    origin: "Canada Dry Corporation 'Face Is America' campaign (agency J. M. Mathes)",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      { label: "Canada Dry 'Face Is America' listing", href: "https://www.vintage-adventures.com/vintage-food-beverage-ads/4843-1962-canada-dry-true-fruit-orange-ad-face-is-america.html" },
    ],
    description:
      "Part of Canada Dry's 'The Face Is America, the Taste Is Canada Dry' campaign that ran around 1959-1962, the ad pairs a weathered, plainly American face -- here a fisherman -- with a line that lets one ordinary working portrait stand in for the whole country. The rhetorical move borrows down-home American authenticity to vouch for the soda's flavor, a domestic-credibility pitch for a brand whose name points north. Variants of the campaign appeared in LIFE across those years promoting the ginger ale and fruit-flavored sodas.",
    palette: ["#8db7cf", "#c43a2e", "#e9d7a8"],
  },
  {
    id: "canada-dry-not-a-kid",
    brand: "Canada Dry",
    title: "Doesn't Treat You Like a Kid",
    year: "1966",
    period: "Adult ginger-ale repositioning",
    category: "Beverage",
    image: "/ads/canadiana/canada-dry-not-a-kid.png",
    source: "https://archive.org/details/dmbb09503",
    sourceLabel: "Duke Libraries / Internet Archive (AdViews)",
    origin: "Canada Dry Ginger Ale 'doesn't treat you like a kid' campaign",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      { label: "Duke / Internet Archive campaign clip", href: "https://archive.org/details/dmbb09503" },
    ],
    description:
      "Canada Dry's pitch turns on positioning ginger ale as an adult drink: the line 'the only soft drink that doesn't treat you like a kid' frames every sweeter cola as childish, so choosing Canada Dry becomes a marker of grown-up taste rather than a flavor preference. The drink is a mixer by design, and the copy leans on that dryness as proof of maturity instead of apologizing for the lack of sugar.",
    palette: ["#3f6b3a", "#cfd2cf", "#1c1c1a"],
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
    origin: "Canadian Pacific travel poster by Peter Ewart",
    dimensions: "vertical",
    researchStatus: "verified",
    links: [
      { label: "Hood Museum object record", href: "https://hoodmuseum.dartmouth.edu/objects/ps.954.40.2" },
    ],
    description:
      "Peter Ewart painted the FP9A diesel head-on so the locomotive nearly fills the frame, with the Rockies reduced to a backdrop and the beaver-shield logo riding the nose. Ewart designed two dozen posters for Canadian Pacific over a roughly seventeen-year run promoting the self-styled 'World's Greatest Travel System,' and here he sells the railway's modern motive power as the subject itself rather than the scenery it passes through.",
    palette: ["#8c9aa6", "#c9a227", "#7a2520"],
  },
  {
    id: "canadian-pacific-moose",
    brand: "Canadian Pacific",
    title: "Visit Canada",
    year: "1938",
    period: "Silkscreen wildlife series",
    category: "Travel",
    image: "/ads/canadiana/canadian-pacific-moose.png",
    source: "https://www.allposters.com/-sp/Visit-Canada-Bull-Moose-Canadian-Pacific-Railway-Vintage-Railroad-Travel-Poster-1930s-Posters_i17476588_.htm",
    sourceLabel: "Canadian Pacific wildlife series catalog",
    origin: "Canadian Pacific 'Visit Canada' silkscreen wildlife poster",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      { label: "Canadian Pacific moose poster record", href: "https://www.allposters.com/-sp/Visit-Canada-Bull-Moose-Canadian-Pacific-Railway-Vintage-Railroad-Travel-Poster-1930s-Posters_i17476588_.htm" },
    ],
    description:
      "Tom Hall reduces a bull moose to a flat silhouette against a burnt-orange sky, its legs mirrored in shallow water, with no train or timetable anywhere in the design. Hall was one of Canadian Pacific's principal poster artists in the 1930s, and a companion grizzly poster of his won a Transit Advertisers award for best travel-division poster; the moose image works by selling the Canadian wilderness as the destination, leaving the railway to be inferred as the way to reach it.",
    palette: ["#e8a32d", "#2c2722", "#5a8f7b"],
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
    origin: "Canadian Pacific poster for the stainless-steel streamliner 'The Canadian'",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      { label: "Chung Collection catalog item", href: "https://open.library.ubc.ca/collections/chung/chungtext/items/1.0357591" },
    ],
    description:
      "A smiling woman in a red hat sits beside the stainless-steel dome car while the fine print enumerates Canadian Pacific's trains, ships, planes, hotels and telegraph service. That list is the actual argument: CP really did run an integrated transport-and-hospitality network it advertised as the 'World's Greatest Travel System,' so the face supplies the romance while the footnote sells one company that could move and house a traveler end to end.",
    palette: ["#3aa0c4", "#c0392b", "#d8d5cf"],
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
    origin: "Canadian Pacific 'Banff in the Canadian Rockies' poster by James Crockart",
    dimensions: "vertical",
    researchStatus: "verified",
    links: [
      { label: "Library of Congress record", href: "https://www.loc.gov/item/2007676065/" },
    ],
    description:
      "James Crockart frames a well-dressed couple inside a dark window arch looking out over the resort grounds at Banff, the recreation laid out below them. Printed by S.C. Allen & Co. of London and Belfast in 1936 for Canadian Pacific's British market, the device puts the viewer inside the hotel rather than in the landscape, selling the comfort of the company's mountain resort as much as the scenery framed beyond the glass.",
    palette: ["#b6543a", "#3c6b4f", "#e6d6b0"],
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
    origin: "Canadian Pacific Steamships emigration poster, lithographed in Canada 1925",
    dimensions: "vertical",
    researchStatus: "verified",
    links: [
      { label: "Toronto Public Library record", href: "https://digitalarchive.tpl.ca/objects/265968/britishers-bring-your-families-to-canada" },
    ],
    description:
      "A mother and children come down the gangway toward a waiting man's open arms, the ship's hull framing the reunion, with the fare set in large type. The pitch sells emigration as a homecoming rather than a departure: it ran during the era of the 1925 Railway Agreement, under which Canadian Pacific actively recruited British families to settle Canada, so the embrace does the persuading while the price makes the move feel attainable.",
    palette: ["#2c4a7c", "#b23a2e", "#e8e2d4"],
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
    origin: "Greyhound Lines 'Canada' tourism poster by Rod Ruth",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      { label: "Greyhound 'Canada' poster record", href: "https://chicagovintageposters.com/products/canada-go-greyhound" },
    ],
    description:
      "Rod Ruth stacks the standard tourist shorthand for Canada -- a scarlet-tunic Mountie, a moose, snow peaks and a chateau -- into a single upright totem. Ruth was a regular Greyhound illustrator who produced destination posters along the company's routes, and rather than picturing the bus he sells the trip as a collection of recognizable sights, making the ride the means of gathering them.",
    palette: ["#c0392b", "#2f5fa6", "#cfe0e8"],
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
    origin: "Ontario Department of Travel and Publicity poster",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      { label: "Vintage Ontario tourism ads feature", href: "https://northernontario.travel/best/great-vintage-ontario-tourism-ads" },
    ],
    description:
      "A beaming man with a camera fills half the poster while his family plays at a lakeshore behind an ONTARIO road sign. Issued by Ontario's Department of Travel and Publicity, whose mid-century campaigns courted American motorists with the province as a 'Lakeland Playground,' the layout leads with the tourist's own delight before the scenery, so the buyer pictures the satisfied snapshot-taker he is being invited to become.",
    palette: ["#2f6fb0", "#d8742b", "#e7dfc8"],
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
    origin: "Ontario Department of Travel and Publicity poster, lithographed in Canada",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      { label: "Ontario 'Vacationland' poster record", href: "https://goldenageposters.com/products/c-1950s-ontario-canadas-family-friendly-vacationland-canadian-travel" },
    ],
    description:
      "A whole family grins from a moving convertible as a lake, cabin and birches slide past behind them. Produced by Ontario's Department of Travel and Publicity, which spent the postwar years marketing the province to car-owning American families, the poster builds the sell on motion and togetherness at once, so the vacation reads as already underway with everyone aboard.",
    palette: ["#1f9fd0", "#e8c23a", "#d23a2c"],
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
    origin: "Ontario Department of Travel and Publicity 'Victory Vacation' booklet cover",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      { label: "Vintage Ontario tourism ads feature", href: "https://northernontario.travel/best/great-vintage-ontario-tourism-ads" },
    ],
    description:
      "Two men land a fish on a rocky riverbank in a green duotone photo, a starburst promising a 'Victory Vacation' over the catch. Issued in 1947 by Ontario's Department of Travel and Publicity as the province reopened to postwar tourists, the headline reframes a fishing trip as a reward an exhausted, victorious country has earned -- pitching leisure to Americans as something owed rather than merely offered.",
    palette: ["#6f9e5a", "#1f1f1d", "#e9efe2"],
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
      "Part of J. Walter Thompson's 'If you were ___ here tomorrow, you'd wear a Rolex' series that ran in The New Yorker from the late 1960s, this one frames the United Nations General Assembly in New York above a gold Day-Date. The model fit the pitch: it spelled the day out in full and could be ordered in 26 languages, and its tie to heads of state earned it the nickname 'the President.' The format puts the buyer in the seat of a world leader, then offers the watch as the entry ticket.",
    palette: ["#111111", "#f5f0df", "#d2ad45"],
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
    origin: "American Rolex Watch Corp. Datejust advertisement",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      { label: "Rolex Magazine ad write-up", href: "https://www.rolexmagazine.com/2013/11/if-you-were-negotiating-here-tomorrow.html" },
    ],
    description:
      "J. Walter Thompson shoots Geneva's Palais des Nations, the old League of Nations headquarters, then drops in a small inset of an 18ct gold Datejust on a Jubilee bracelet. The 'if you were negotiating here' premise borrows the prestige of the room rather than describing the watch, leaning on the Datejust's existing reputation as a marker of success worn by figures like Eisenhower and Churchill. The transfer is the whole mechanism: status of the setting becomes status of the object.",
    palette: ["#2a2a2a", "#d9d6cf", "#9a9388"],
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
    origin: "American Rolex Watch Corp. Day-Date advertisement featuring Red Adair",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      { label: "Rolex Magazine — Red Adair ad", href: "https://www.rolexmagazine.com/2020/03/red-adair-oil-well-firefighter.html" },
    ],
    description:
      "This entry in J. Walter Thompson's Rolex series swaps a glamorous setting for danger: oil-well firefighter Red Adair and his crew working a blowout, with the gold Day-Date set against an orange field tuned to the color of the flames. Where the rest of the campaign rented borrowed prestige, the Adair ad uses a real professional whose job punishes any equipment that fails. The headline 'If taming oil well fires was your job, you'd wear a Rolex' makes endorsement the argument rather than aspiration.",
    palette: ["#c0461f", "#1b1b1b", "#d6a13a"],
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
    origin: "American Rolex Watch Corp. Submariner advertisement (Chichen Itza diving expedition)",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      { label: "Ad Patina record", href: "https://www.adpatina.com/products/1968-rolex-submariner-if-you-were-looking-for-lost-empires-advertisement" },
    ],
    description:
      "Here J. Walter Thompson trades the dress Day-Date of the campaign's boardroom ads for the dive-spec Submariner, shown with a diver searching underwater ruins in the Yucatan. The copy sells the watch as a 'big, tough, working watch' for a hostile environment rather than a status symbol. The reference shown is the no-date Submariner near the end of its run, before the date-window Ref. 1680 changed the model's look; the 'lost empires' framing turns the watch into expedition equipment.",
    palette: ["#1d1d1d", "#cfcdc6", "#6f7a74"],
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
    origin: "American Rolex Watch Corp. Date Submariner advertisement (America's Cup yacht Intrepid)",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      { label: "The Illustrated Watch record", href: "https://www.theillustratedwatch.com/products/p/rolex-if-you-were-racing-a-12-meter-here-tomorrowyoud-wear-a-rolex" },
    ],
    description:
      "Another J. Walter Thompson 'if you were ___ here tomorrow' layout, this one applied to 12-metre yacht racing, the class then used for the America's Cup. It shows a Submariner (the Ref. 1680 era) rather than a dress watch, matching the wet, physical arena to the brand's tool-watch line. The campaign's discipline is the point: one fixed template, swapping only the elite activity, so repetition across many magazine pages trains the watch itself to read as the credential.",
    palette: ["#1c1c1c", "#cdccc6", "#7d8893"],
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
    origin: "American Rolex Watch Corp. GMT-Master advertisement (Concorde test pilot Brian Trubshaw)",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      { label: "Ad Patina record", href: "https://www.adpatina.com/products/1969-rolex-gmt-master-ref-1675-if-you-were-flying-the-concorde-advertisement" },
    ],
    description:
      "J. Walter Thompson launched this 1969 ad around the Concorde just before the aircraft's maiden flight in March, pairing the supersonic jet with the GMT-Master. The watch fit the brief literally: developed with Pan Am in the 1950s, its extra fourth hand and rotating bezel let a pilot read a second time zone at a glance, useful on transatlantic crossings. So the headline 'If you were flying the Concorde tomorrow' is not pure halo borrowing; the GMT-Master was actual flight-crew equipment.",
    palette: ["#1a1a1a", "#cfcdc7", "#8a6d3b"],
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
    origin: "American Rolex Watch Corp. Day-Date advertisement featuring A.J. Foyt",
    dimensions: "vertical",
    researchStatus: "seeded",
    links: [
      { label: "A.J. Foyt Rolex ad listing", href: "https://www.ebay.com/itm/304628046988" },
    ],
    description:
      "Running in Sports Illustrated in July and October 1974, this Rolex ad steps outside the 'if you were here tomorrow' template and names a real driver, racer A.J. Foyt, in the headline 'One second, Mr. Foyt.' The body copy makes the link explicit: 'The more valuable a man's time, the more he appreciates the value of this watch,' selling the gold Day-Date (then $2,950) on Foyt's living-by-the-stopwatch credibility rather than a prestigious backdrop.",
    palette: ["#caa23a", "#2a211a", "#d8cbb0"],
  },
];

const allAds: Ad[] = [
  ...seedAds.slice(0, 12),
  ...discoveredAds,
  ...addedAds,
  ...canadianaAds,
  ...seedAds.slice(12),
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
      "This turn-of-the-century Coca-Cola card leads with the price, '5 cents,' beside a portrait of stage soprano Hilda Clark, credited as the brand's first print-ad model (she appeared from roughly 1899 to 1903). The nickel was no passing promotion: Coca-Cola held that single price from 1886 to 1959, about 73 years, partly locked in by long-term bottling contracts. Printing the figure so prominently trained a national habit around one memorizable number.",
    palette: ["#f1e2c2", "#981f1d", "#1c4a38"],
  },
];

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
    palette: ["#6b6b69", "#f4efe4", "#7c1f1c"],
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
  .map((ad) => ({ ...ad, ...researchOverrides[ad.id] }));
