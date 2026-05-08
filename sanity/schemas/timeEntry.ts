import { defineField, defineType } from "sanity";

export const timeEntry = defineType({
  name: "timeEntry",
  title: "Time Entry",
  type: "document",
  fields: [
    defineField({
      name: "project",
      title: "Project",
      type: "reference",
      to: [{ type: "project" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "hours",
      title: "Hours",
      type: "number",
      validation: (r) => r.required().positive().precision(2),
    }),
    defineField({
      name: "description",
      title: "What did you do",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "billed",
      title: "Billed",
      type: "boolean",
      initialValue: false,
      description: "Has this been included on an invoice?",
    }),
    defineField({
      name: "invoice",
      title: "On Invoice",
      type: "reference",
      to: [{ type: "invoice" }],
      hidden: ({ document }) => !document?.billed,
    }),
  ],
  preview: {
    select: {
      date: "date",
      hours: "hours",
      description: "description",
      projectTitle: "project.title",
      billed: "billed",
    },
    prepare: ({ date, hours, description, projectTitle, billed }) => ({
      title: `${hours}h — ${description}`,
      subtitle: `${date} · ${projectTitle ?? "no project"}${billed ? " · billed" : ""}`,
    }),
  },
  orderings: [
    {
      title: "Newest first",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
});
