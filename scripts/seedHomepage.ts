/**
 * One-off seeder for homepage content. Run with:
 *   bun run scripts/seedHomepage.ts
 *
 * Requires SANITY_API_WRITE_TOKEN in .env.local (pull from Vercel).
 * Idempotent — re-running replaces existing seeded docs by their _id.
 */

import { createReadStream, existsSync } from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-05-07";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is required");
}
if (!token) {
  throw new Error(
    "SANITY_API_WRITE_TOKEN is required (run `vercel env pull` first)",
  );
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

const services = [
  {
    title: "Build something new",
    summary: "Websites, apps, or both.",
    body: "You have an idea and you want it built — a real website, a real iPhone or Android app, sometimes all three. I do the whole job: design, build, polish, launch. Usually from one shared system so everything stays in sync as you grow.",
  },
  {
    title: "Refresh what's there",
    summary: "Modernize an existing site or app.",
    body: "A site that's looking tired, doesn't work right on phones, or doesn't represent where your business is now. I'll bring it up to date — visually, technically, on mobile — without throwing out the parts that already work.",
  },
  {
    title: "Take over from someone else",
    summary: "When your last developer fell through.",
    body: "Last-minute hosting transfers, half-finished projects, work the previous developer abandoned or stopped responding to. I move quickly, get things back on solid ground, and stick around to keep them running.",
  },
  {
    title: "The small stuff that's been waiting",
    summary: "Quick updates the big firms won't touch.",
    body: "A Google listing that's been stuck in your agency's queue for months. A form that stopped working. A page that needs new photos and copy. Small things that have been sitting too long — I just take care of them.",
  },
];

const work = [
  {
    slug: "caliburr",
    title: "Caliburr",
    tagline: "An app for dialing in your coffee",
    href: "https://caliburr.coffee",
    imagePath: "public/caliburr.png",
    body: "Helps espresso drinkers find the right grind setting for their gear. Anyone can add a grinder or machine, but it stays editable until five other people confirm the details — then it locks in as the canonical reference. The app then averages everyone's recipes so getting started on a new setup feels like guidance from a friend, not guesswork. Same app on iPhone, Android, and the web.",
    stack: ["Expo", "React Native", "Supabase", "Postgres", "RevenueCat", "TypeScript"],
  },
  {
    slug: "stash-note",
    title: "Stash Note",
    tagline: "Notes that work everywhere",
    href: undefined,
    imagePath: "public/stash-note.png",
    body: "A note-taking app with rich formatting, link previews, embedded images, and drawings you can edit inline. Same notes on your phone, tablet, and computer. Stores everything on the device first, so typing never waits on the internet — sync happens quietly in the background.",
    stack: ["Expo", "Lexical", "LegendState", "Supabase", "TypeScript"],
  },
  {
    slug: "velk",
    title: "Velk",
    tagline: "Talk to AI from your terminal",
    href: "https://github.com/vincentvella/velk",
    imagePath: undefined,
    body: "A small command-line tool for chatting with AI models (Claude, GPT) directly from the terminal. Works with the same plugin tools that Claude Code uses, so it's actually useful for real work, not just chat. Installs in one line.",
    stack: ["Zig", "Anthropic API", "OpenAI API", "MCP"],
  },
  {
    slug: "togglez",
    title: "Togglez",
    tagline: "Turn software features on and off safely",
    href: undefined,
    imagePath: undefined,
    body: "A self-hosted way for software teams to switch features on and off without having to redeploy — useful for testing new things with a small group of users before everyone gets them. Most teams pay a vendor for this; Togglez is the free alternative if you'd rather keep your data on your own servers.",
    stack: ["Go", "Postgres", "Keycloak", "Docker"],
  },
];

const processSteps = [
  {
    title: "Intro call",
    body: "30 minutes, free. Tell me what you want to make and I'll tell you honestly whether I'm the right person to help.",
  },
  {
    title: "Quote in writing",
    body: "Before I touch anything, you get a clear scope and price. No surprise bills, no scope creep without a conversation first.",
  },
  {
    title: "Build, with updates",
    body: "Weekly progress notes while I'm building. You'll always know where things stand. Easy to reach by email, text, or call.",
  },
  {
    title: "Launch and stick around",
    body: "I don't disappear once it's live. Fixes, small updates, hosting questions — I'm still here when you need me.",
  },
];

const faqs = [
  {
    question: "How quickly can you start?",
    answer: "Usually within a week or two for small things; bigger projects we'll line up on the call. If something's actively broken — site down, can't reach your old developer — I'll move you up the queue.",
  },
  {
    question: "What's the smallest job you'll take?",
    answer: "No minimum. If it's a 30-minute fix, that's fine. I bill hourly for small things and fixed-price for projects.",
  },
  {
    question: "Can you take over a site someone else built?",
    answer: "Yes — most often WordPress, but also Shopify, Webflow, Squarespace, and custom-built sites. If you've lost access or the previous developer disappeared, that's something I deal with regularly.",
  },
  {
    question: "Will I be able to update my own content?",
    answer: "Yes. Every site I build comes with a content management system, so you can change copy, swap photos, add pages, and update your hours without calling me. I'd rather you be able to do the small stuff yourself — I'm here for the things that actually need a developer.",
  },
  {
    question: "What about hosting and ongoing costs?",
    answer: "Hosting, the CMS, and the critical security patches that keep your site safe are baked into the project price. No mandatory monthly bill from me, no surprise fees — most months, there's nothing to do. If you'd rather keep your current hosting and just give me access to manage things, that works too.",
  },
  {
    question: "Do you offer ongoing care or analytics?",
    answer: "Yes, optionally. If you want a privacy-friendly analytics dashboard, uptime monitoring, automated backups, a monthly health summary, and priority response when something breaks — I offer a Care plan at $100/month. It's opt-in. Most clients don't need it, some find the peace of mind worth it. You can add it any time and cancel any time.",
  },
  {
    question: "How do you bill?",
    answer: "Small fixes are billed hourly for the actual work — emails, calls, and questions don't count. Projects are fixed-price after we scope them together. You'll always see the price in writing before I start, and I don't bill for anything that wasn't agreed.",
  },
  {
    question: "Will I actually be able to reach you?",
    answer: "Yes. Email or text — whichever works better for you. I'm not the kind of person who goes silent for two weeks. Weekly progress notes during a build, and I respond to messages within a day on weekdays.",
  },
];

const stack = [
  "TypeScript",
  "React",
  "Next.js",
  "React Native",
  "Expo",
  "GraphQL",
  "GraphQL Federation",
  "Node.js",
  "Postgres",
  "Supabase",
  "AWS",
  "Kubernetes",
  "Terraform",
  "GitHub Actions",
  "Go",
  "Zig",
];

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function uploadImage(filename: string): Promise<string | null> {
  const fullPath = path.resolve(process.cwd(), filename);
  if (!existsSync(fullPath)) {
    console.warn(`  · skipping image (not found): ${filename}`);
    return null;
  }
  const stream = createReadStream(fullPath);
  const asset = await client.assets.upload("image", stream, {
    filename: path.basename(filename),
  });
  return asset._id;
}

async function seed() {
  const tx = client.transaction();

  console.log("Seeding services…");
  services.forEach((s, i) => {
    const _id = `seed-service-${slugify(s.title)}`;
    tx.createOrReplace({ _id, _type: "service", ...s, order: i, visible: true });
  });

  console.log("Seeding process steps…");
  processSteps.forEach((step, i) => {
    const _id = `seed-process-${slugify(step.title)}`;
    tx.createOrReplace({ _id, _type: "processStep", ...step, order: i });
  });

  console.log("Seeding FAQs…");
  faqs.forEach((q, i) => {
    const _id = `seed-faq-${slugify(q.question).slice(0, 60)}`;
    tx.createOrReplace({ _id, _type: "faq", ...q, order: i, visible: true });
  });

  console.log("Seeding stack…");
  stack.forEach((name, i) => {
    const _id = `seed-stack-${slugify(name)}`;
    tx.createOrReplace({ _id, _type: "stackTool", name, order: i, visible: true });
  });

  console.log("Uploading work item images…");
  const workWithImages = await Promise.all(
    work.map(async (w) => {
      const assetId = w.imagePath ? await uploadImage(w.imagePath) : null;
      return { ...w, assetId };
    }),
  );

  console.log("Seeding work items…");
  workWithImages.forEach((w, i) => {
    const _id = `seed-work-${w.slug}`;
    tx.createOrReplace({
      _id,
      _type: "workItem",
      title: w.title,
      slug: { _type: "slug", current: w.slug },
      tagline: w.tagline,
      href: w.href,
      body: w.body,
      stack: w.stack,
      image: w.assetId
        ? { _type: "image", asset: { _type: "reference", _ref: w.assetId } }
        : undefined,
      order: i,
      visible: true,
    });
  });

  console.log("Committing transaction…");
  await tx.commit({ visibility: "async" });
  console.log("Done.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
