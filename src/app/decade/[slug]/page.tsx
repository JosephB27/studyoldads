import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { adsByDecade, decades } from "@/data/ads";
import { AdGrid } from "@/app/_components/AdGrid";
import { jsonLdScript, collectionJsonLd, breadcrumbJsonLd } from "@/app/_lib/seo";
import styles from "@/app/_components/hub.module.css";

type Params = { slug: string };

const DECADE_RE = /^\d{4}s$/;

export function generateStaticParams(): Params[] {
  return decades().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!DECADE_RE.test(slug) || adsByDecade(slug).length === 0) {
    return { title: "Decade not found" };
  }
  const count = adsByDecade(slug).length;
  const title = `${slug} print ads`;
  const description = `${count} vintage print advertisements from the ${slug} — a decade of advertising history, brand by brand, in the study old ads archive.`;
  return {
    title,
    description,
    alternates: { canonical: `/decade/${slug}` },
    openGraph: { type: "website", url: `/decade/${slug}`, title, description },
  };
}

export default async function DecadePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const items = adsByDecade(slug);
  if (!DECADE_RE.test(slug) || items.length === 0) notFound();

  const url = `https://studyoldads.com/decade/${slug}`;

  return (
    <main className={styles.page}>
      {jsonLdScript([
        breadcrumbJsonLd([
          { name: "study old ads", url: "https://studyoldads.com" },
          { name: `${slug} ads`, url },
        ]),
        collectionJsonLd({ name: `${slug} print ads`, url, items }),
      ])}

      <nav className={styles.bar} aria-label="Breadcrumb">
        <Link href="/">study old ads</Link>
        <span>/</span>
        <span>{slug}</span>
      </nav>

      <header className={styles.header}>
        <h1>{slug} print ads</h1>
        <p>
          {items.length} vintage {items.length === 1 ? "advertisement" : "advertisements"} from the{" "}
          {slug} — a decade of advertising history, brand by brand.
        </p>
      </header>

      <div className={styles.content}>
        <AdGrid ads={items} />
      </div>

      <nav className={styles.facets} aria-label="All decades">
        <span className={styles.facetsLabel}>Browse by decade</span>
        {decades().map((d) => (
          <Link key={d.slug} href={`/decade/${d.slug}`} className={styles.facet}>
            {d.slug} <span className={styles.facetCount}>{d.count}</span>
          </Link>
        ))}
      </nav>
    </main>
  );
}
