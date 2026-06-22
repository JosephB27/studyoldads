import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ads,
  getAdBySlug,
  adAltText,
  adMetaDescription,
  categorySlug,
  decadeSlug,
  relatedAds,
  type Ad,
} from "@/data/ads";
import { imageDimensions } from "@/data/imageDimensions";
import { AdGrid } from "@/app/_components/AdGrid";
import { jsonLdScript, breadcrumbJsonLd, SITE_URL } from "@/app/_lib/seo";
import styles from "./ad.module.css";

type Params = { slug: string };

// Pre-render every ad page at build time so each has crawlable, static HTML.
export function generateStaticParams(): Params[] {
  return ads.map((ad) => ({ slug: ad.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ad = getAdBySlug(slug);
  if (!ad) {
    return { title: "Ad not found" };
  }

  const title = `${ad.brand}: ${ad.title} (${ad.year})`;
  const description = adMetaDescription(ad);
  const url = `/ad/${ad.id}`;

  return {
    title,
    description,
    keywords: [
      ad.brand,
      `${ad.brand} ad`,
      `${ad.brand} advertisement`,
      ad.category,
      `vintage ${ad.category.toLowerCase()} ad`,
      `${ad.year} advertising`,
      "vintage print ad",
      "old advertisement",
    ],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      images: [{ url: ad.image, alt: adAltText(ad) }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ad.image],
    },
  };
}

function dimsFor(image: string) {
  return imageDimensions[image] ?? { width: 800, height: 1000 };
}

function buildJsonLd(ad: Ad) {
  const { width, height } = dimsFor(ad.image);
  const pageUrl = `https://studyoldads.com/ad/${ad.id}`;
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": pageUrl,
    url: pageUrl,
    name: `${ad.brand}: ${ad.title}`,
    headline: ad.title,
    description: ad.description,
    creditText: ad.brand,
    brand: { "@type": "Brand", name: ad.brand },
    datePublished: ad.year,
    genre: ad.category,
    keywords: [ad.brand, ad.category, ad.year, "vintage print advertisement"].join(", "),
    image: {
      "@type": "ImageObject",
      url: `https://studyoldads.com${ad.image}`,
      width,
      height,
      caption: adAltText(ad),
    },
    isPartOf: {
      "@type": "CollectionPage",
      name: "study old ads",
      url: "https://studyoldads.com",
    },
  };
}

export default async function AdPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const ad = getAdBySlug(slug);
  if (!ad) {
    notFound();
  }

  const { width, height } = dimsFor(ad.image);
  const links = [{ label: ad.sourceLabel, href: ad.source }, ...ad.links].filter(
    (link, index, all) => all.findIndex((l) => l.href === link.href) === index,
  );
  const catSlug = categorySlug(ad.category);
  const decSlug = decadeSlug(ad);
  const related = relatedAds(ad);

  return (
    <main className={styles.page}>
      {jsonLdScript([
        buildJsonLd(ad),
        breadcrumbJsonLd([
          { name: "study old ads", url: SITE_URL },
          { name: `${ad.category} ads`, url: `${SITE_URL}/category/${catSlug}` },
          { name: ad.brand, url: `${SITE_URL}/ad/${ad.id}` },
        ]),
      ])}

      <nav className={styles.bar} aria-label="Breadcrumb">
        <Link href="/">← study old ads</Link>
        <Link href={`/category/${catSlug}`}>{ad.category}</Link>
      </nav>

      <div className={styles.layout}>
        <figure className={styles.figure}>
          <Image
            src={ad.image}
            alt={adAltText(ad)}
            width={width}
            height={height}
            sizes="(max-width: 760px) 92vw, 55vw"
            priority
          />
        </figure>

        <article className={styles.meta}>
          <p className={styles.code}>
            {ad.year} · {ad.category}
          </p>
          <h1>{ad.brand}</h1>
          <h2>{ad.title}</h2>
          <p className="body">{ad.description}</p>

          <dl className={styles.facts}>
            <div>
              <dt>Category</dt>
              <dd>
                <Link href={`/category/${catSlug}`}>{ad.category}</Link>
              </dd>
            </div>
            <div>
              <dt>Decade</dt>
              <dd>
                <Link href={`/decade/${decSlug}`}>{decSlug}</Link>
              </dd>
            </div>
            <div>
              <dt>Period</dt>
              <dd>{ad.period}</dd>
            </div>
            <div>
              <dt>Origin</dt>
              <dd>{ad.origin}</dd>
            </div>
            <div>
              <dt>Format</dt>
              <dd>{ad.dimensions === "vertical" ? "Vertical" : "Near-vertical"} print</dd>
            </div>
          </dl>

          {links.length > 0 ? (
            <div className={styles.links}>
              {links.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
          ) : null}
        </article>
      </div>

      {related.length > 0 ? (
        <section className={styles.related} aria-label="Related ads">
          <h2>More to study</h2>
          <AdGrid ads={related} />
        </section>
      ) : null}
    </main>
  );
}
