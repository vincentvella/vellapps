import type { MetadataRoute } from "next";
import { APPS } from "./(site)/privacy/apps/registry";

const BASE_URL = "https://vellapps.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/testimonials`, lastModified: now, changeFrequency: "weekly", priority: 0.5 },
  ];

  const appPrivacyRoutes: MetadataRoute.Sitemap = Object.keys(APPS).map(
    (slug) => ({
      url: `${BASE_URL}/privacy/apps/${slug}`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    }),
  );

  return [...staticRoutes, ...appPrivacyRoutes];
}
