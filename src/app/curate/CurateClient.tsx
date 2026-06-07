"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useMemo, useState } from "react";
import type { CurateCandidate } from "./candidates";
import styles from "./curate.module.css";

type Decision = "cut" | "keep" | "maybe" | "new";

const storageKey = "studyoldads.curate.decisions.v1";
const apiPath = "/api/curation-decisions";

export function CurateClient({
  candidates,
}: {
  candidates: CurateCandidate[];
}) {
  const [decisions, setDecisions] = useState<Record<string, Decision>>(() => {
    if (typeof window === "undefined") {
      return {};
    }

    const stored = window.localStorage.getItem(storageKey);
    return stored ? (JSON.parse(stored) as Record<string, Decision>) : {};
  });
  const [filter, setFilter] = useState<Decision | "all">("new");
  const [selected, setSelected] = useState<CurateCandidate | null>(null);
  const [syncStatus, setSyncStatus] = useState("local");

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(decisions));
  }, [decisions]);

  useEffect(() => {
    void loadSharedDecisions(false);
  }, []);

  const counts = useMemo(() => {
    return candidates.reduce(
      (memo, candidate) => {
        const decision = decisions[candidate.id] ?? "new";
        memo[decision] += 1;
        return memo;
      },
      { cut: 0, keep: 0, maybe: 0, new: 0 } satisfies Record<Decision, number>,
    );
  }, [candidates, decisions]);

  const visible = candidates.filter((candidate) => {
    const decision = decisions[candidate.id] ?? "new";
    return filter === "all" || filter === decision;
  });

  function decide(candidate: CurateCandidate, decision: Decision) {
    setDecisions((current) => ({ ...current, [candidate.id]: decision }));
    setSyncStatus("unsaved");
  }

  async function loadSharedDecisions(manual: boolean) {
    try {
      const response = await fetch(apiPath);
      if (!response.ok) {
        throw new Error(`Load failed: ${response.status}`);
      }

      const payload = (await response.json()) as {
        decisions?: Record<string, Decision>;
        updatedAt?: string | null;
      };

      if (manual || Object.keys(payload.decisions ?? {}).length > 0) {
        setDecisions((current) => ({ ...current, ...(payload.decisions ?? {}) }));
      }

      setSyncStatus(
        payload.updatedAt ? `loaded ${formatTime(payload.updatedAt)}` : "local",
      );
    } catch {
      setSyncStatus(manual ? "load failed" : "local");
    }
  }

  async function saveSharedDecisions() {
    setSyncStatus("saving");

    try {
      const response = await fetch(apiPath, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decisions }),
      });

      if (!response.ok) {
        throw new Error(`Save failed: ${response.status}`);
      }

      const payload = (await response.json()) as { updatedAt?: string };
      setSyncStatus(
        payload.updatedAt ? `saved ${formatTime(payload.updatedAt)}` : "saved",
      );
    } catch {
      setSyncStatus("save failed");
    }
  }

  return (
    <main className={styles.shell}>
      <header className={styles.header}>
        <div>
          <p className={styles.kicker}>studyoldads.com / curate</p>
          <h1>Excellent, or cut.</h1>
        </div>

        <nav className={styles.filters} aria-label="Candidate filters">
          {(["new", "keep", "maybe", "cut", "all"] as const).map((item) => (
            <button
              key={item}
              type="button"
              className={filter === item ? styles.activeFilter : ""}
              onClick={() => setFilter(item)}
            >
              {item}
              {item !== "all" ? ` ${counts[item]}` : ` ${candidates.length}`}
            </button>
          ))}
        </nav>
      </header>

      <section className={styles.syncBar} aria-label="Shared curation sync">
        <p>{syncStatus}</p>
        <div>
          <button type="button" onClick={() => void saveSharedDecisions()}>
            Save shared
          </button>
          <button type="button" onClick={() => void loadSharedDecisions(true)}>
            Load shared
          </button>
        </div>
      </section>

      <section className={styles.brief} aria-label="Taste brief">
        <p>Keep: one idea, brutal line, white space, luxury nerve, tech made obvious, or poster-grade graphic force.</p>
        <p>Cut: archival filler, horizontal blog art, soft luxury, generic vintage, shop listings, provocative but visually weak.</p>
      </section>

      <section className={styles.grid} aria-label="Discovery candidates">
        {visible.map((candidate) => {
          const decision = decisions[candidate.id] ?? "new";

          return (
            <article
              key={candidate.id}
              className={`${styles.card} ${styles[decision]}`}
            >
              {candidate.alreadyInWall ? (
                <span className={styles.badge}>in wall</span>
              ) : null}

              <button
                type="button"
                className={styles.imageButton}
                onClick={() => setSelected(candidate)}
                aria-label={`Open ${candidate.pageTitle}`}
              >
                <img src={candidate.imageUrl} alt="" loading="lazy" />
              </button>

              <div className={styles.cardMeta}>
                <strong>{candidate.score}</strong>
                <span>{candidate.pageTitle}</span>
              </div>

              <div className={styles.actions}>
                <button type="button" onClick={() => decide(candidate, "keep")}>
                  Keep
                </button>
                <button type="button" onClick={() => decide(candidate, "maybe")}>
                  Maybe
                </button>
                <button type="button" onClick={() => decide(candidate, "cut")}>
                  Cut
                </button>
              </div>
            </article>
          );
        })}
      </section>

      {selected ? (
        <CandidateDialog
          candidate={selected}
          decision={decisions[selected.id] ?? "new"}
          onClose={() => setSelected(null)}
          onDecide={(decision) => decide(selected, decision)}
        />
      ) : null}
    </main>
  );
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function CandidateDialog({
  candidate,
  decision,
  onClose,
  onDecide,
}: {
  candidate: CurateCandidate;
  decision: Decision;
  onClose: () => void;
  onDecide: (decision: Decision) => void;
}) {
  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [onClose]);

  return (
    <section className={styles.dialog} role="dialog" aria-modal="true">
      <button type="button" className={styles.close} onClick={onClose}>
        X
      </button>

      <div className={styles.dialogImage}>
        <img src={candidate.imageUrl} alt={candidate.alt || candidate.pageTitle} />
      </div>

      <article className={styles.dialogMeta}>
        <p className={styles.kicker}>score {candidate.score} / {decision}</p>
        <h2>{candidate.pageTitle}</h2>
        {candidate.alt ? <p>{candidate.alt}</p> : null}

        <ul>
          {candidate.reasons.map((reason) => (
            <li key={reason}>{reason}</li>
          ))}
        </ul>

        <div className={styles.dialogActions}>
          <button type="button" onClick={() => onDecide("keep")}>
            Keep
          </button>
          <button type="button" onClick={() => onDecide("maybe")}>
            Maybe
          </button>
          <button type="button" onClick={() => onDecide("cut")}>
            Cut
          </button>
        </div>

        <div className={styles.links}>
          <a href={candidate.pageUrl} target="_blank" rel="noreferrer">
            Source
          </a>
          <a href={candidate.imageUrl} target="_blank" rel="noreferrer">
            Image
          </a>
        </div>
      </article>
    </section>
  );
}
