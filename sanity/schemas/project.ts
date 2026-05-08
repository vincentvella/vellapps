import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "reference",
      to: [{ type: "client" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Scoping", value: "scoping" },
          { title: "Active", value: "active" },
          { title: "Launched", value: "launched" },
          { title: "Done", value: "done" },
        ],
        layout: "radio",
      },
      initialValue: "scoping",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "quoted",
      title: "Quoted ($)",
      type: "number",
    }),
    defineField({
      name: "billed",
      title: "Billed ($)",
      type: "number",
    }),
    defineField({
      name: "quotedDate",
      title: "Quoted Date",
      type: "date",
    }),
    defineField({
      name: "launchTarget",
      title: "Launch Target",
      type: "date",
    }),
    defineField({
      name: "launchActual",
      title: "Launch Actual",
      type: "date",
    }),
    defineField({
      name: "scope",
      title: "Scope",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "notes",
      title: "Notes",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      clientName: "client.name",
      status: "status",
      quoted: "quoted",
    },
    prepare: ({ title, clientName, status, quoted }) => ({
      title,
      subtitle: `${clientName ?? "no client"} · ${status}${
        quoted ? ` · $${quoted.toLocaleString()}` : ""
      }`,
    }),
  },
});
