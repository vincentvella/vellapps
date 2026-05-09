/**
 * One-off: add Pod Haven to the work list.
 *
 *   bun --env-file=.env.local run scripts/addPodHaven.ts
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

const item = {
  slug: "pod-haven",
  title: "Pod Haven",
  tagline: "A local-first podcast listener",
  href: undefined as string | undefined,
  imagePath: "../portfolio-site/public/images/pod-haven-cover.jpeg",
  body: "A minimal podcast listener that doesn't ask you to make an account or care about anyone else's recommendations. Subscribe, listen, resume. Feeds, episodes, and play state all live on your device — nothing syncs to a server, nothing gets sold. iPhone and Android from a single codebase.",
  stack: ["Expo", "React Native", "SQLite", "Drizzle", "TypeScript"],
  order: 6,
};

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
  console.log(item.title);
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

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
