import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { DashboardIcon } from "@sanity/icons";
import { schemaTypes } from "./sanity/schemas";
import { structure } from "./sanity/structure";
import Dashboard from "./sanity/dashboard/Dashboard";
import { apiVersion, dataset, projectId } from "./sanity/env";

export default defineConfig({
  name: "vellapps",
  title: "Vellapps Ops",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
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
  ],
});
