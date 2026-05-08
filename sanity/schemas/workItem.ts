import { defineField, defineType } from "sanity";

export const workItem = defineType({
  name: "workItem",
  title: "Work item",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tagline",
      type: "string",
      description: "Short label under the title.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "url",
      description: "External link if the project is live or has a public page.",
      validation: (r) =>
        r.uri({ allowRelative: false, scheme: ["http", "https"] }),
    }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "body",
      type: "text",
      rows: 5,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "stack",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      validation: (r) => r.required().min(1),
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
    select: {
      title: "title",
      tagline: "tagline",
      image: "image",
      visible: "visible",
    },
    prepare: ({ title, tagline, image, visible }) => ({
      title,
      subtitle: `${tagline}${visible === false ? " · hidden" : ""}`,
      media: image,
    }),
  },
});
