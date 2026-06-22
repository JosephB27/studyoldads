import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  adsByCategory,
  categories,
  categoryName,
  categorySlug,
} from "@/data/ads";
import { AdGrid } from "@/app/_components/AdGrid";
import { jsonLdScript, collectionJsonLd, breadcrumbJsonLd } from "@/app/_lib/seo";
import styles from "@/app/_components/hub.module.css";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return categories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const name = categoryName(slug);
  if (!name) return { title: "Category not found" };

  const count = adsByCategory(slug).length;
  const title = `Vintage ${name} print ads`;
  const description = `${count} classic ${name.toLowerCase()} print advertisements from the study old ads archive — browse the campaigns, brands and copy behind vintage ${name.toLowerCase()} advertising.`;
  return {
    title,
    description,
    alternates: { canonical: `/category/${slug}` },
    openGraph: { type: "website", url: `/category/${slug}`, title, description },
  };
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const name = categoryName(slug);
  if (!name) notFound();

  const items = adsByCategory(slug);
  const url = `https://studyoldads.com/category/${slug}`;
  const lower = name.toLowerCase();

  return (
    <main className={styles.page}>
      {jsonLdScript([
        breadcrumbJsonLd([
          { name: "study old ads", url: "https://studyoldads.com" },
          { name: `${name} ads`, url },
        ]),
        collectionJsonLd({
          name: `Vintage ${name} print ads`,
          url,
          items,
        }),
      ])}

      <nav className={styles.bar} aria-label="Breadcrumb">
        <Link href="/">study old ads</Link>
        <span>/</span>
        <span>{name}</span>
      </nav>

      <header className={styles.header}>
        <h1>Vintage {name} print ads</h1>
        <p>
          {items.length} classic {lower} {items.length === 1 ? "advertisement" : "advertisements"} from the
          archive — the brands, campaigns and copywriting behind vintage {lower} advertising.
        </p>
      </header>

      <div className={styles.content}>
        <AdGrid ads={items} />
      </div>

      <nav className={styles.facets} aria-label="All categories">
        <span className={styles.facetsLabel}>Browse by category</span>
        {categories().map((c) => (
          <Link key={c.slug} href={`/category/${c.slug}`} className={styles.facet}>
            {c.name} <span className={styles.facetCount}>{c.count}</span>
          </Link>
        ))}
      </nav>
    </main>
  );
}
