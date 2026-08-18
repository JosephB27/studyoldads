"use client";

import { useActionState, useEffect, useRef } from "react";
import { subscribe, type SubscribeState } from "@/app/_lib/subscribe";
import styles from "./subscribeForm.module.css";

const initialState: SubscribeState = { status: "idle" };

// Keys the wall/overlay window listeners hijack for gallery navigation.
// Everything else (Escape, Cmd+K, plain typing) must keep propagating.
const NAV_KEYS = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"];

/**
 * Email capture in two quiet shapes:
 * - "band": colophon section for the foot of the wall / detail / about pages.
 * - "inline": single row for the ad overlay's metadata column.
 */
export function SubscribeForm({ variant }: { variant: "band" | "inline" }) {
  const [state, formAction, isPending] = useActionState(subscribe, initialState);
  const confirmationRef = useRef<HTMLParagraphElement>(null);

  // Keyboard focus was on the submit button inside a form that just
  // unmounted; park it on the confirmation so it doesn't fall to <body>
  // (which would silently re-arm the wall's arrow-key navigation).
  useEffect(() => {
    if (state.status === "ok") {
      confirmationRef.current?.focus();
    }
  }, [state.status]);

  const form =
    state.status === "ok" ? (
      <p className={styles.note} role="status" tabIndex={-1} ref={confirmationRef}>
        {state.message}
      </p>
    ) : (
      <form action={formAction} className={styles.form}>
        {/* Honeypot — hidden from people, tempting to bots. The name must stay
            meaningless to browser autofill so it never fills it for humans. */}
        <input
          type="text"
          name="form_topic"
          className={styles.honeypot}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
        <input
          type="email"
          name="email"
          required
          className={styles.input}
          placeholder="your@email.com"
          // React 19 resets the field after the action round-trip; restore
          // what the reader typed when the server reports an error.
          defaultValue={state.email ?? ""}
          aria-label="Email address"
          autoComplete="email"
          spellCheck={false}
          onKeyDown={(event) => {
            if (NAV_KEYS.includes(event.key) && !event.metaKey && !event.ctrlKey) {
              event.stopPropagation();
            }
          }}
        />
        <button type="submit" className={styles.submit} disabled={isPending}>
          {variant === "band" ? (isPending ? "Sending…" : "Subscribe") : "→"}
        </button>
      </form>
    );

  const errorNote =
    state.status === "error" ? (
      <p className={styles.note} role="alert">
        {state.message}
      </p>
    ) : null;

  if (variant === "inline") {
    return (
      <div className={styles.inline}>
        <p className={styles.kicker}>Three prints, every Sunday —</p>
        {form}
        {errorNote}
      </div>
    );
  }

  return (
    <section className={styles.band} aria-label="Subscribe">
      <p className={styles.kicker}>Three prints, every Sunday</p>
      <h2 className={styles.heading}>From the archive, to your inbox.</h2>
      <p className={styles.body}>
        I run this archive. Every Sunday I send three of my favorite new prints
        — with the stories behind them. Nothing else, no spam. Unsubscribe
        whenever.
      </p>
      {form}
      {errorNote}
    </section>
  );
}
