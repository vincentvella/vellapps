import type { SchemaTypeDefinition } from "sanity";
import { client } from "./client";
import { project } from "./project";
import { lead } from "./lead";
import { invoice } from "./invoice";
import { timeEntry } from "./timeEntry";
import { review } from "./review";
import { testimonial } from "./testimonial";
import { service } from "./service";
import { workItem } from "./workItem";
import { processStep } from "./processStep";
import { faq } from "./faq";
import { stackTool } from "./stackTool";

export const schemaTypes: SchemaTypeDefinition[] = [
  client,
  project,
  lead,
  invoice,
  timeEntry,
  review,
  testimonial,
  service,
  workItem,
  processStep,
  faq,
  stackTool,
];
