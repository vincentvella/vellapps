/**
 * Submit a site (or specific URLs) to IndexNow — pings Bing, Yandex, Naver,
 * Seznam in one call, which downstream covers DuckDuckGo, Yahoo, Ecosia and
 * other Bing-backed engines.
 *
 *   bun run submit https://nebridal.com
 *     # generates a key, prints setup instructions, then submits the sitemap
 *
 *   bun run submit https://nebridal.com /privacy /about
 *     # submits specific paths only
 *
 * Keys are stored per-domain in scripts/.indexnow-keys.json (gitignored).
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { randomBytes } from "node:crypto";
import path from "node:path";

const KEY_STORE = path.resolve(
  path.dirname(new URL(import.meta.url).pathname),
  ".indexnow-keys.json",
);
const ENDPOINT = "https://api.indexnow.org/indexnow";

type KeyStore = Record<string, string>;

function loadKeys(): KeyStore {
  if (!existsSync(KEY_STORE)) return {};
  return JSON.parse(readFileSync(KEY_STORE, "utf8")) as KeyStore;
}

function saveKeys(store: KeyStore): void {
  mkdirSync(path.dirname(KEY_STORE), { recursive: true });
  writeFileSync(KEY_STORE, JSON.stringify(store, null, 2) + "\n");
}

function genKey(): string {
  // 32-byte hex → 64 chars. IndexNow accepts 8–128 chars, hex digits.
  return randomBytes(32).toString("hex");
}

function parseSiteArg(arg: string): URL {
  try {
    const u = new URL(arg);
    if (u.protocol !== "https:" && u.protocol !== "http:") {
      throw new Error(`Unsupported protocol: ${u.protocol}`);
    }
    return u;
  } catch {
    throw new Error(`Invalid site URL: ${arg}`);
  }
}

async function fetchSitemapUrls(siteUrl: URL): Promise<string[]> {
  const sitemapUrl = new URL("/sitemap.xml", siteUrl).toString();
  const res = await fetch(sitemapUrl);
  if (!res.ok) {
    throw new Error(`Sitemap fetch failed (${res.status}): ${sitemapUrl}`);
  }
  const xml = await res.text();
  const matches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)];
  return matches.map((m) => m[1].trim()).filter(Boolean);
}

async function verifyKeyHosted(siteUrl: URL, key: string): Promise<boolean> {
  const keyUrl = new URL(`/${key}.txt`, siteUrl).toString();
  try {
    const res = await fetch(keyUrl);
    if (!res.ok) return false;
    const body = (await res.text()).trim();
    return body === key;
  } catch {
    return false;
  }
}

async function submit(
  host: string,
  key: string,
  keyLocation: string,
  urls: string[],
): Promise<void> {
  if (urls.length === 0) {
    throw new Error("No URLs to submit.");
  }
  const body = JSON.stringify({ host, key, keyLocation, urlList: urls });
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body,
  });
  // 200 = success, 202 = accepted (under verification), others = errors.
  if (res.status !== 200 && res.status !== 202) {
    const text = await res.text().catch(() => "");
    throw new Error(`IndexNow rejected (${res.status}): ${text.slice(0, 400)}`);
  }
  console.log(
    `  → IndexNow ${res.status} ${res.statusText} — ${urls.length} URL${urls.length === 1 ? "" : "s"} submitted to Bing, Yandex, Naver, Seznam`,
  );
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error(
      "Usage: bun run submit <site-url> [path1 path2 ...]\n" +
        "  site-url: e.g. https://nebridal.com\n" +
        "  paths:    optional list of paths or full URLs to submit; if omitted, the site's /sitemap.xml is used.",
    );
    process.exit(1);
  }

  const siteUrl = parseSiteArg(args[0]);
  const host = siteUrl.host;
  const explicitPaths = args.slice(1);

  const store = loadKeys();
  let key = store[host];
  let firstRun = false;

  if (!key) {
    key = genKey();
    store[host] = key;
    saveKeys(store);
    firstRun = true;
  }

  const keyLocation = new URL(`/${key}.txt`, siteUrl).toString();

  if (firstRun) {
    console.log(`First time submitting ${host}.`);
    console.log(`Generated IndexNow key: ${key}\n`);
    console.log("One-time setup:");
    console.log(`  1. Create a file named "${key}.txt" at the root of ${host}.`);
    console.log(`  2. The file's contents should be this exact key:`);
    console.log(`       ${key}`);
    console.log(`  3. Verify it's reachable at: ${keyLocation}`);
    console.log(`\nKey saved to ${KEY_STORE}.`);
    console.log(`Re-run this command once the file is live to submit URLs.\n`);
  }

  console.log(`Verifying ${keyLocation}...`);
  const hosted = await verifyKeyHosted(siteUrl, key);
  if (!hosted) {
    console.error(
      `  ✗ Key file not reachable or doesn't match. Host the file and re-run.`,
    );
    process.exit(firstRun ? 0 : 1);
  }
  console.log(`  ✓ Key verified`);

  let urls: string[];
  if (explicitPaths.length > 0) {
    urls = explicitPaths.map((p) => {
      try {
        return new URL(p).toString();
      } catch {
        return new URL(p, siteUrl).toString();
      }
    });
    console.log(`Submitting ${urls.length} explicit URL${urls.length === 1 ? "" : "s"}...`);
  } else {
    console.log(`Fetching ${new URL("/sitemap.xml", siteUrl)}...`);
    urls = await fetchSitemapUrls(siteUrl);
    console.log(`  Found ${urls.length} URL${urls.length === 1 ? "" : "s"} in sitemap`);
    if (urls.length === 0) {
      console.error("  ✗ Empty sitemap — nothing to submit.");
      process.exit(1);
    }
  }

  await submit(host, key, keyLocation, urls);
  console.log(`\nDone.`);
  console.log(
    `Manual follow-ups (one-time, in a browser):\n` +
      `  • Google Search Console — add property + submit /sitemap.xml: https://search.google.com/search-console\n` +
      `  • Bing Webmaster Tools — add property: https://www.bing.com/webmasters\n` +
      `Once verified there, IndexNow pings forward through them automatically.`,
  );
}

main().catch((err) => {
  console.error(`\nError: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
});
