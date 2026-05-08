import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

const token = process.env.SANITY_API_WRITE_TOKEN;

export const sanityWriteClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
  perspective: "published",
});

export function assertWriteToken() {
  if (!token) {
    throw new Error(
      "Missing SANITY_API_WRITE_TOKEN — needed for server-side writes. Set it in Vercel and pull with `vercel env pull`.",
    );
  }
}
