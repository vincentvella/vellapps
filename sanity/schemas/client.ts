import { defineField, defineType } from "sanity";

export const client = defineType({
  name: "client",
  title: "Client",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Prospect", value: "prospect" },
          { title: "Active", value: "active" },
          { title: "Paused", value: "paused" },
          { title: "Done", value: "done" },
        ],
        layout: "radio",
      },
      initialValue: "prospect",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "carePlan",
      title: "On Care Plan",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "carePlanStart",
      title: "Care Plan Start",
      type: "date",
      hidden: ({ document }) => !document?.carePlan,
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
    }),
    defineField({
      name: "contactPhone",
      title: "Contact Phone",
      type: "string",
    }),
    defineField({
      name: "commsPreference",
      title: "Comms Preference",
      type: "string",
      options: {
        list: [
          { title: "Email", value: "email" },
          { title: "Text", value: "text" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "domain",
      title: "Domain",
      type: "string",
    }),
    defineField({
      name: "hosting",
      title: "Hosting",
      type: "string",
    }),
    defineField({
      name: "cms",
      title: "CMS",
      type: "string",
    }),
    defineField({
      name: "notes",
      title: "Notes",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  preview: {
    select: { title: "name", status: "status", carePlan: "carePlan" },
    prepare: ({ title, status, carePlan }) => ({
      title,
      subtitle: `${status}${carePlan ? " · Care plan" : ""}`,
    }),
  },
});
