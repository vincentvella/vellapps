"use server";

import { headers } from "next/headers";
import {
  assertWriteToken,
  sanityWriteClient,
} from "@/sanity/lib/serverClient";

export type SubmitState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

const MIN_FILL_MS = 1500;

function str(v: FormDataEntryValue | null): string {
  return typeof v === "string" ? v.trim() : "";
}

export async function submitTestimonial(
  _prev: SubmitState,
  formData: FormData,
): Promise<SubmitState> {
  // Honeypot — real users don't see / fill this.
  if (str(formData.get("website")) !== "") {
    return { status: "success" };
  }

  // Timing trap — bots fill instantly, humans don't.
  const renderedAt = Number(str(formData.get("rendered_at")));
  if (
    Number.isFinite(renderedAt) &&
    Date.now() - renderedAt < MIN_FILL_MS
  ) {
    return { status: "success" };
  }

  const name = str(formData.get("name"));
  const role = str(formData.get("role"));
  const company = str(formData.get("company"));
  const email = str(formData.get("email"));
  const body = str(formData.get("body"));
  const consent = formData.get("consent") === "on";

  if (name.length < 2 || name.length > 120) {
    return { status: "error", message: "Please enter your name." };
  }
  if (company.length < 1 || company.length > 160) {
    return { status: "error", message: "Please enter your company." };
  }
  if (body.length < 30) {
    return {
      status: "error",
      message: "Please share at least a sentence or two (30+ characters).",
    };
  }
  if (body.length > 1500) {
    return {
      status: "error",
      message: "That's longer than the form allows — please trim it down.",
    };
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "That email doesn't look valid." };
  }
  if (!consent) {
    return {
      status: "error",
      message:
        "You'll need to agree to public display before I can publish it.",
    };
  }

  try {
    assertWriteToken();
  } catch (err) {
    return {
      status: "error",
      message: err instanceof Error ? err.message : "Server is misconfigured.",
    };
  }

  const headerList = await headers();
  const sourceIp =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip") ||
    undefined;

  try {
    await sanityWriteClient.create({
      _type: "testimonial",
      name,
      role: role || undefined,
      company,
      email: email || undefined,
      body,
      consent,
      status: "pending",
      featured: false,
      submittedAt: new Date().toISOString(),
      sourceIp,
    });
  } catch (err) {
    console.error("Testimonial submission failed", err);
    return {
      status: "error",
      message: "Something went wrong on my end. Try again, or email me.",
    };
  }

  return { status: "success" };
}
