import { readAds } from "./read-ads.mjs";

const ads = await readAds();
const failures = [];
const urls = new Map();
const requestHeaders = {
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36 studyoldads.com-validator",
};

for (const ad of ads) {
  if (ad.image.startsWith("https://")) {
    urls.set(ad.image, `${ad.id} image`);
  }

  urls.set(ad.source, `${ad.id} source`);

  for (const link of ad.links) {
    urls.set(link.href, `${ad.id} link: ${link.label}`);
  }
}

async function checkUrl(url, label) {
  let lastResponse;

  for (const attempt of [1, 2]) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    try {
      let response = await fetch(url, {
        headers: requestHeaders,
        method: "HEAD",
        redirect: "follow",
        signal: controller.signal,
      });

      if (response.status === 405 || response.status === 403) {
        response = await fetch(url, {
          headers: { ...requestHeaders, range: "bytes=0-0" },
          redirect: "follow",
          signal: controller.signal,
        });
      }

      lastResponse = response;

      if (response.ok) {
        return;
      }

      if (response.status === 429 && attempt === 1) {
        await sleep(2500);
        continue;
      }

      failures.push(`${label}: ${response.status} ${response.statusText} ${url}`);
      return;
    } catch (error) {
      if (attempt === 2) {
        failures.push(`${label}: ${error.message} ${url}`);
        return;
      }
    } finally {
      clearTimeout(timeout);
    }
  }

  failures.push(`${label}: ${lastResponse?.status ?? "unknown"} ${url}`);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

for (const [url, label] of urls.entries()) {
  await checkUrl(url, label);
  await sleep(450);
}

if (failures.length > 0) {
  console.error("Remote URL validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Remote URL validation passed: ${urls.size} URLs reachable.`);
