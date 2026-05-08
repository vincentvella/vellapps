import { defineField, defineType } from "sanity";

export const review = defineType({
  name: "review",
  title: "Monthly Review",
  type: "document",
  fields: [
    defineField({
      name: "month",
      title: "Month",
      type: "string",
      description: "YYYY-MM, e.g. 2026-05",
      validation: (r) =>
        r
          .required()
          .regex(/^\d{4}-(0[1-9]|1[0-2])$/, {
            name: "YYYY-MM",
            invert: false,
          }),
    }),
    defineField({
      name: "leadsIn",
      title: "Leads in",
      type: "number",
    }),
    defineField({
      name: "callsTaken",
      title: "Intro calls taken",
      type: "number",
    }),
    defineField({
      name: "projectsSigned",
      title: "Projects signed",
      type: "number",
    }),
    defineField({
      name: "projectsShipped",
      title: "Projects shipped",
      type: "number",
    }),
    defineField({
      name: "hoursBilled",
      title: "Hours billed",
      type: "number",
    }),
    defineField({
      name: "invoiced",
      title: "Invoiced ($)",
      type: "number",
    }),
    defineField({
      name: "paid",
      title: "Paid ($)",
      type: "number",
    }),
    defineField({
      name: "whatWorked",
      title: "What worked",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "whatDidnt",
      title: "What didn't",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "pattern",
      title: "Pattern I noticed",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "focusNextMonth",
      title: "Focus for next month",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "openThreads",
      title: "Open threads to follow up on",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  preview: {
    select: {
      month: "month",
      invoiced: "invoiced",
      hoursBilled: "hoursBilled",
    },
    prepare: ({ month, invoiced, hoursBilled }) => ({
      title: month,
      subtitle: `${hoursBilled ?? 0}h billed · $${invoiced?.toLocaleString() ?? 0} invoiced`,
    }),
  },
  orderings: [
    {
      title: "Newest first",
      name: "monthDesc",
      by: [{ field: "month", direction: "desc" }],
    },
  ],
});
