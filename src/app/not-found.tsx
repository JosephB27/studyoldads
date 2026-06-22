import type { Metadata } from "next";
import Link from "next/link";
import { categories, decades } from "@/data/ads";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <p className={styles.code}>404</p>
        <h1>This page is out of print.</h1>
        <p className={styles.lead}>
          The ad you’re looking for isn’t here. Browse the wall, or pick up a category or decade.
        </p>

        <p className={styles.home}>
          <Link href="/">← Back to the wall</Link>
        </p>

        <nav className={styles.facets} aria-label="Browse">
          {categories()
            .slice(0, 8)
            .map((c) => (
              <Link key={c.slug} href={`/category/${c.slug}`} className={styles.facet}>
                {c.name}
              </Link>
            ))}
          {decades().map((d) => (
            <Link key={d.slug} href={`/decade/${d.slug}`} className={styles.facet}>
              {d.slug}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
