/**
 * One-off: add Northeast Bridal and vincevella.com to the work list.
 * Idempotent — safe to re-run.
 *
 *   bun --env-file=.env.local run scripts/addWorkItems.ts
 */

import { createReadStream, existsSync } from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-05-07";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is required");
if (!token) throw new Error("SANITY_API_WRITE_TOKEN is required");

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

const items = [
  {
    slug: "northeast-bridal",
    title: "Northeast Bridal",
    tagline: "Custom site for a traveling bridal hair team",
    href: "https://nebridal.com",
    imagePath: "../portfolio-site/nebridal-card.png",
    body: "A full rebuild of nebridal.com — taking them off a slow WordPress + page-builder setup onto a fast static Next.js site on Vercel. Inline Calendly booking, accessible portfolio gallery with lightbox, rotating testimonials, and a blog. Old WordPress URLs redirect cleanly so existing links keep working.",
    stack: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Vercel"],
    order: 4,
  },
  {
    slug: "vincevella",
    title: "vincevella.com",
    tagline: "Personal site, blog, and CV",
    href: "https://www.vincevella.com",
    imagePath: "../portfolio-site/vincevella-card.png",
    body: "My own site — portfolio, writing, and a CV page driven by Outstatic so I can update my résumé without touching code. Cookieless analytics via a self-hosted Umami instance proxied as first-party traffic; JSON-LD on people and posts so search engines understand the structure.",
    stack: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Outstatic", "Umami"],
    order: 5,
  },
];

async function uploadImage(filename: string): Promise<string | null> {
  const fullPath = path.resolve(process.cwd(), filename);
  if (!existsSync(fullPath)) {
    console.warn(`  · skipping image (not found): ${fullPath}`);
    return null;
  }
  const stream = createReadStream(fullPath);
  const asset = await client.assets.upload("image", stream, {
    filename: path.basename(filename),
  });
  console.log(`  · uploaded ${path.basename(filename)} → ${asset._id}`);
  return asset._id;
}

async function run() {
  for (const item of items) {
    console.log(`\n${item.title}`);
    const assetId = item.imagePath ? await uploadImage(item.imagePath) : null;

    const _id = `seed-work-${item.slug}`;
    await client.createOrReplace({
      _id,
      _type: "workItem",
      title: item.title,
      slug: { _type: "slug", current: item.slug },
      tagline: item.tagline,
      href: item.href,
      body: item.body,
      stack: item.stack,
      image: assetId
        ? { _type: "image", asset: { _type: "reference", _ref: assetId } }
        : undefined,
      order: item.order,
      visible: true,
    });
    console.log(`  · wrote ${_id}`);
  }
  console.log("\nDone.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
