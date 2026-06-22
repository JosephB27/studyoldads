import Image from "next/image";
import Link from "next/link";
import { adAltText, type Ad } from "@/data/ads";
import { imageDimensions } from "@/data/imageDimensions";
import styles from "./adGrid.module.css";

const FALLBACK_DIMS = { width: 800, height: 1000 };

/**
 * A responsive, server-rendered gallery of ads that links to each ad's own
 * page. Used by the category and decade hub pages — crawlable internal links
 * with real images and captions.
 */
export function AdGrid({ ads }: { ads: Ad[] }) {
  return (
    <ul className={styles.grid}>
      {ads.map((ad) => {
        const dims = imageDimensions[ad.image] ?? FALLBACK_DIMS;
        return (
          <li key={ad.id} className={styles.cell}>
            <Link href={`/ad/${ad.id}`} className={styles.tile}>
              <span className={styles.frame}>
                <Image
                  src={ad.image}
                  alt={adAltText(ad)}
                  width={dims.width}
                  height={dims.height}
                  sizes="(max-width: 680px) 44vw, (max-width: 980px) 30vw, 220px"
                />
              </span>
              <span className={styles.caption}>
                <span className={styles.brand}>{ad.brand}</span>
                <span className={styles.year}>{ad.year}</span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
