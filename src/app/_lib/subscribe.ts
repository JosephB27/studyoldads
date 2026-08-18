"use server";

export type SubscribeState = {
  status: "idle" | "ok" | "error";
  message?: string;
  /** Echoed back on errors so the form can restore what the reader typed
      (React 19 resets uncontrolled fields after every action). */
  email?: string;
};

// Pragmatic shape check; the real gate is whether Sunday's email delivers.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Duplicate signups get the same copy as new ones so the endpoint can't be
// used to probe whether an address is on the list.
const SUBSCRIBED: SubscribeState = {
  status: "ok",
  message: "You're in. See you Sunday.",
};
const INVALID_EMAIL = "That email doesn't look right.";
const GENERIC_ERROR = "Something broke — try again in a minute.";

function errorState(message: string, email: string): SubscribeState {
  return { status: "error", message, email };
}

export async function subscribe(
  _prevState: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  // Honeypot: humans never see this field, bots fill it. Pretend it worked.
  const honeypot = formData.get("form_topic");
  if (typeof honeypot === "string" && honeypot) {
    console.warn("subscribe: honeypot tripped");
    return SUBSCRIBED;
  }

  const raw = formData.get("email");
  const email = typeof raw === "string" ? raw.trim().toLowerCase() : "";

  if (!email || email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return errorState(INVALID_EMAIL, email.slice(0, 254));
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    console.error("subscribe: RESEND_API_KEY / RESEND_AUDIENCE_ID not set");
    return errorState(GENERIC_ERROR, email);
  }

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };
  const contactsUrl = `https://api.resend.com/audiences/${audienceId}/contacts`;

  try {
    const response = await fetch(contactsUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({ email, unsubscribed: false }),
      signal: AbortSignal.timeout(8000),
    });

    if (response.ok) {
      return SUBSCRIBED;
    }

    // 409 = contact already exists. Creating again never clears a previous
    // unsubscribe, so flip the flag back — this is a reader re-opting in.
    if (response.status === 409) {
      const patch = await fetch(`${contactsUrl}/${encodeURIComponent(email)}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ unsubscribed: false }),
        signal: AbortSignal.timeout(8000),
      });
      if (!patch.ok) {
        console.error(`subscribe: resubscribe PATCH ${patch.status}: ${await patch.text()}`);
      }
      return SUBSCRIBED;
    }

    console.error(`subscribe: Resend ${response.status}: ${await response.text()}`);
    return errorState(GENERIC_ERROR, email);
  } catch (error) {
    console.error("subscribe: request failed", error);
    return errorState(GENERIC_ERROR, email);
  }
}
