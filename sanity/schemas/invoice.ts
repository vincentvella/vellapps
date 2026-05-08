import { defineField, defineType } from "sanity";

export const invoice = defineType({
  name: "invoice",
  title: "Invoice",
  type: "document",
  fields: [
    defineField({
      name: "number",
      title: "Invoice Number",
      type: "string",
      description: "e.g. INV-2026-001",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "project",
      title: "Project",
      type: "reference",
      to: [{ type: "project" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "amount",
      title: "Amount ($)",
      type: "number",
      validation: (r) => r.required().positive(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Sent", value: "sent" },
          { title: "Paid", value: "paid" },
          { title: "Overdue", value: "overdue" },
          { title: "Cancelled", value: "cancelled" },
        ],
        layout: "radio",
      },
      initialValue: "draft",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "sentDate",
      title: "Sent Date",
      type: "date",
    }),
    defineField({
      name: "dueDate",
      title: "Due Date",
      type: "date",
    }),
    defineField({
      name: "paidDate",
      title: "Paid Date",
      type: "date",
      hidden: ({ document }) => document?.status !== "paid",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Short description of what this invoice covers",
    }),
    defineField({
      name: "notes",
      title: "Internal Notes",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  preview: {
    select: {
      number: "number",
      amount: "amount",
      status: "status",
      projectTitle: "project.title",
    },
    prepare: ({ number, amount, status, projectTitle }) => ({
      title: `${number} · $${amount?.toLocaleString() ?? "?"}`,
      subtitle: `${projectTitle ?? "no project"} · ${status}`,
    }),
  },
});
