import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "summary",
      type: "string",
      description: "Short label under the title.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "body",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Lower numbers appear first.",
      initialValue: 0,
    }),
    defineField({
      name: "visible",
      type: "boolean",
      description: "Show on the homepage.",
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: "Manual order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", summary: "summary", visible: "visible" },
    prepare: ({ title, summary, visible }) => ({
      title,
      subtitle: `${summary}${visible === false ? " · hidden" : ""}`,
    }),
  },
});
