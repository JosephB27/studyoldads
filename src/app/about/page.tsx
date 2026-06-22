import type { Metadata } from "next";
import Link from "next/link";
import { ads, categories, decades } from "@/data/ads";
import { jsonLdScript, breadcrumbJsonLd, SITE_URL } from "@/app/_lib/seo";
import hub from "@/app/_components/hub.module.css";
import styles from "./about.module.css";

const description =
  "What study old ads is: a curated, fact-checked gallery of vintage vertical print advertisements — the brands, campaigns, and copywriting behind classic ads.";

export const metadata: Metadata = {
  title: "About the archive",
  description,
  alternates: { canonical: "/about" },
  openGraph: { type: "website", url: "/about", title: "About study old ads", description },
};

export default function AboutPage() {
  return (
    <main className={hub.page}>
      {jsonLdScript(
        breadcrumbJsonLd([
          { name: "study old ads", url: SITE_URL },
          { name: "About", url: `${SITE_URL}/about` },
        ]),
      )}

      <nav className={hub.bar} aria-label="Breadcrumb">
        <Link href="/">study old ads</Link>
        <span>/</span>
        <span>About</span>
      </nav>

      <header className={hub.header}>
        <h1>About the archive</h1>
      </header>

      <div className={styles.prose}>
        <p>
          <strong>study old ads</strong> is a curated research gallery of vintage vertical print
          advertisements. It currently holds {ads.length} ads spanning {decades().length} decades,
          from early-twentieth-century travel posters to turn-of-the-millennium technology launches.
        </p>
        <p>
          Every entry is more than an image. Each ad has a short, fact-checked note on the brand, the
          campaign, and the idea behind the copy — why the line worked, what it was reacting to, and
          what it changed. The aim is to make old advertising legible: not nostalgia, but a study of
          how persuasion was built before the web.
        </p>
        <p>
          The collection is intentionally spare to browse — a white wall of posters, click any one to
          read its research layer. Ads are sourced from public archives and reference threads, and
          each carries links back to its origin so claims can be checked. Accuracy is valued over
          completeness: an ad is published only when its year, brand, and provenance hold up.
        </p>

        <h2>Browse by category</h2>
        <nav className={styles.facetList} aria-label="Categories">
          {categories().map((c) => (
            <Link key={c.slug} href={`/category/${c.slug}`} className={styles.facet}>
              {c.name} <span className={styles.count}>{c.count}</span>
            </Link>
          ))}
        </nav>

        <h2>Browse by decade</h2>
        <nav className={styles.facetList} aria-label="Decades">
          {decades().map((d) => (
            <Link key={d.slug} href={`/decade/${d.slug}`} className={styles.facet}>
              {d.slug} <span className={styles.count}>{d.count}</span>
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
