import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { DashboardIcon, TagIcon } from "@sanity/icons";
import { schemaTypes } from "./sanity/schemas";
import { structure } from "./sanity/structure";
import Dashboard from "./sanity/dashboard/Dashboard";
import Pricing from "./sanity/pricing/Pricing";
import {
  approveTestimonial,
  rejectTestimonial,
  archiveTestimonial,
} from "./sanity/actions/testimonialActions";
import { apiVersion, dataset, projectId } from "./sanity/env";

export default defineConfig({
  name: "vellapps",
  title: "Vellapps Ops",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  document: {
    actions: (prev, context) => {
      if (context.schemaType !== "testimonial") return prev;
      return [
        approveTestimonial,
        rejectTestimonial,
        archiveTestimonial,
        ...prev,
      ];
    },
  },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  tools: [
    {
      name: "dashboard",
      title: "Dashboard",
      icon: DashboardIcon,
      component: Dashboard,
    },
    {
      name: "pricing",
      title: "Pricing",
      icon: TagIcon,
      component: Pricing,
    },
  ],
});
