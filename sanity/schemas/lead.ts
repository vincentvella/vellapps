import { defineField, defineType } from "sanity";

export const lead = defineType({
  name: "lead",
  title: "Lead",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Contacted", value: "contacted" },
          { title: "Qualified", value: "qualified" },
          { title: "Ghosted", value: "ghosted" },
          { title: "Converted", value: "converted" },
          { title: "Lost", value: "lost" },
        ],
        layout: "radio",
      },
      initialValue: "new",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "source",
      title: "Source",
      description: "How they found me (referral, Google, etc.)",
      type: "string",
    }),
    defineField({
      name: "firstContact",
      title: "First Contact",
      type: "date",
    }),
    defineField({
      name: "nextAction",
      title: "Next Action",
      type: "string",
    }),
    defineField({
      name: "nextActionDate",
      title: "Next Action Date",
      type: "date",
    }),
    defineField({
      name: "budgetSignal",
      title: "Budget Signal",
      description: "Anything they've said about budget",
      type: "string",
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
      name: "whatTheyWant",
      title: "What They Want",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "convertedClient",
      title: "Converted Client",
      description: "Filled in once the lead becomes a client",
      type: "reference",
      to: [{ type: "client" }],
      hidden: ({ document }) => document?.status !== "converted",
    }),
  ],
  preview: {
    select: { title: "name", status: "status", source: "source" },
    prepare: ({ title, status, source }) => ({
      title,
      subtitle: `${status}${source ? ` · ${source}` : ""}`,
    }),
  },
});
