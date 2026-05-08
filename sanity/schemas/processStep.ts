import { defineField, defineType } from "sanity";

export const processStep = defineType({
  name: "processStep",
  title: "Process step",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "body",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Step number — lower comes first.",
      initialValue: 0,
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
    select: { title: "title", order: "order" },
    prepare: ({ title, order }) => ({
      title,
      subtitle: typeof order === "number" ? `Step ${order + 1}` : undefined,
    }),
  },
});
