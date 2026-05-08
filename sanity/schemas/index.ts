import type { SchemaTypeDefinition } from "sanity";
import { client } from "./client";
import { project } from "./project";
import { lead } from "./lead";
import { invoice } from "./invoice";
import { timeEntry } from "./timeEntry";
import { review } from "./review";

export const schemaTypes: SchemaTypeDefinition[] = [
  client,
  project,
  lead,
  invoice,
  timeEntry,
  review,
];
