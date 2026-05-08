import { defineField, defineType } from "sanity";

export const stackTool = defineType({
  name: "stackTool",
  title: "Stack tool",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
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
    select: { name: "name", visible: "visible" },
    prepare: ({ name, visible }) => ({
      title: name,
      subtitle: visible === false ? "hidden" : undefined,
    }),
  },
});
