"use client";

/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useRef, useState } from "react";
import { ads, type Ad } from "@/data/ads";
import styles from "./page.module.css";

/** Bump when local /ads/* image files change so browsers don't serve stale crops. */
const LOCAL_AD_IMAGE_VERSION = "3";

function adImageSrc(image: string) {
  if (image.startsWith("/ads/")) {
    return `${image}?v=${LOCAL_AD_IMAGE_VERSION}`;
  }

  return image;
}

/** Focus a tile without the browser's instant jump, then ease it into view. */
function focusPlate(button: HTMLButtonElement) {
  button.focus({ preventScroll: true });
  button.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
}

/** Count grid columns by how many tiles share the top row's offset. */
function countColumns(buttons: HTMLButtonElement[]) {
  const firstTop = buttons[0].offsetTop;
  let columns = 0;
  for (const button of buttons) {
    if (button.offsetTop !== firstTop) {
      break;
    }
    columns += 1;
  }
  return columns || 1;
}

export default function Home() {
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);
  const plateRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    function syncSelectionFromHash() {
      const hashId = decodeURIComponent(window.location.hash.replace(/^#/, ""));
      setSelectedAd(ads.find((ad) => ad.id === hashId) ?? null);
    }

    syncSelectionFromHash();
    window.addEventListener("hashchange", syncSelectionFromHash);

    return () => window.removeEventListener("hashchange", syncSelectionFromHash);
  }, []);

  useEffect(() => {
    if (!selectedAd) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedAd]);

  // Arrow-key navigation across the image wall (Enter/Space open via the
  // native button). Disabled while the overlay is open — it handles its own keys.
  useEffect(() => {
    if (selectedAd) {
      return;
    }

    function handleWallKeydown(event: KeyboardEvent) {
      const navKeys = ["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "Home", "End"];
      if (!navKeys.includes(event.key)) {
        return;
      }

      const buttons = plateRefs.current.filter(
        (button): button is HTMLButtonElement => button !== null,
      );
      if (!buttons.length) {
        return;
      }

      event.preventDefault();

      const currentIndex = buttons.indexOf(
        document.activeElement as HTMLButtonElement,
      );
      if (currentIndex === -1) {
        focusPlate(buttons[0]);
        return;
      }

      const columns = countColumns(buttons);
      const last = buttons.length - 1;
      let nextIndex = currentIndex;

      switch (event.key) {
        case "ArrowRight":
          nextIndex = Math.min(currentIndex + 1, last);
          break;
        case "ArrowLeft":
          nextIndex = Math.max(currentIndex - 1, 0);
          break;
        case "ArrowDown":
          nextIndex = Math.min(currentIndex + columns, last);
          break;
        case "ArrowUp":
          nextIndex = Math.max(currentIndex - columns, 0);
          break;
        case "Home":
          nextIndex = 0;
          break;
        case "End":
          nextIndex = last;
          break;
      }

      focusPlate(buttons[nextIndex]);
    }

    window.addEventListener("keydown", handleWallKeydown);
    return () => window.removeEventListener("keydown", handleWallKeydown);
  }, [selectedAd]);

  const selectAd = useCallback((ad: Ad) => {
    setSelectedAd(ad);

    if (window.location.hash !== `#${ad.id}`) {
      window.location.assign(`#${ad.id}`);
    }
  }, []);

  const closeAd = useCallback(() => {
    const closingIndex = selectedAd
      ? ads.findIndex((ad) => ad.id === selectedAd.id)
      : -1;

    setSelectedAd(null);

    if (window.location.hash) {
      window.history.pushState(
        null,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    }

    // Return focus to the tile we came from so arrow keys keep working.
    if (closingIndex !== -1) {
      requestAnimationFrame(() => {
        const button = plateRefs.current[closingIndex];
        if (button) {
          focusPlate(button);
        }
      });
    }
  }, [selectedAd]);

  const moveSelection = useCallback(
    (direction: 1 | -1) => {
      if (!selectedAd) {
        return;
      }

      const currentIndex = ads.findIndex((ad) => ad.id === selectedAd.id);
      const nextIndex = (currentIndex + direction + ads.length) % ads.length;
      selectAd(ads[nextIndex]);
    },
    [selectAd, selectedAd],
  );

  return (
    <main className={styles.shell}>
      <h1 className={styles.srOnly}>studyoldads.com</h1>

      <section className={styles.imageWall} aria-label="Old print ads">
        {ads.map((ad, index) => (
          <button
            type="button"
            key={ad.id}
            ref={(node) => {
              plateRefs.current[index] = node;
            }}
            className={styles.plate}
            onClick={() => selectAd(ad)}
            aria-label={`${ad.brand} ${ad.title}, ${ad.year}`}
          >
            <img src={adImageSrc(ad.image)} alt="" />
          </button>
        ))}
      </section>

      {selectedAd ? (
        <AdOverlay
          ad={selectedAd}
          onClose={closeAd}
          onNext={() => moveSelection(1)}
          onPrevious={() => moveSelection(-1)}
        />
      ) : null}
    </main>
  );
}

function AdOverlay({
  ad,
  onClose,
  onNext,
  onPrevious,
}: {
  ad: Ad;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}) {
  const researchLinks = [
    { label: ad.sourceLabel, href: ad.source },
    ...ad.links,
  ].filter(
    (link, index, links) =>
      links.findIndex((candidate) => candidate.href === link.href) === index,
  );

  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        onNext();
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        onPrevious();
      }
    }

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [onClose, onNext, onPrevious]);

  return (
    <section
      className={styles.overlay}
      aria-label={`${ad.brand} details`}
      aria-modal="true"
      role="dialog"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <button
        className={styles.close}
        onClick={onClose}
        aria-label="Close selected ad"
        type="button"
      >
        X
      </button>

      <div className={styles.focusImage} key={ad.id}>
        <img
          src={adImageSrc(ad.image)}
          alt={`${ad.brand} ${ad.title} print ad`}
        />
      </div>

      <article className={styles.metadata}>
        <p className={styles.code}>{ad.year}</p>
        <h2>{ad.brand}</h2>
        <h3>{ad.title}</h3>
        <p>{ad.description}</p>
        <blockquote>{ad.lesson}</blockquote>

        <dl>
          <div>
            <dt>Origin</dt>
            <dd>{ad.origin}</dd>
          </div>
          <div>
            <dt>Rights</dt>
            <dd>{ad.rights}</dd>
          </div>
          <div>
            <dt>Tags</dt>
            <dd>{ad.tags.join(", ")}</dd>
          </div>
        </dl>

        <div className={styles.links}>
          {researchLinks.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
              {link.label.toUpperCase()}
            </a>
          ))}
        </div>
      </article>
    </section>
  );
}
