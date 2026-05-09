import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (r) => r.required().min(2).max(120),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      description: "e.g. Founder, Owner, Marketing Lead",
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
      validation: (r) => r.required().min(1).max(160),
      description:
        "Required so the testimonial can be tied back to a project for display.",
    }),
    defineField({
      name: "email",
      title: "Contact email",
      type: "string",
      description: "Used to verify the submission if needed. Never displayed publicly.",
      validation: (r) =>
        r.custom((value) => {
          if (!value) return true;
          const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
          return ok ? true : "Must be a valid email";
        }),
    }),
    defineField({
      name: "body",
      title: "Testimonial",
      type: "text",
      rows: 5,
      validation: (r) => r.required().min(30).max(1500),
    }),
    defineField({
      name: "consent",
      title: "Public-display consent",
      type: "boolean",
      description:
        "The submitter checked the box agreeing to public display of their name + testimonial.",
      initialValue: false,
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Pending review", value: "pending" },
          { title: "Approved", value: "approved" },
          { title: "Rejected", value: "rejected" },
          { title: "Archived", value: "archived" },
        ],
        layout: "radio",
      },
      initialValue: "pending",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Show prominently on the testimonials page.",
      initialValue: false,
      hidden: ({ document }) => document?.status !== "approved",
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted at",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "approvedAt",
      title: "Approved at",
      type: "datetime",
      readOnly: true,
      hidden: ({ document }) => document?.status !== "approved",
    }),
    defineField({
      name: "sourceIp",
      title: "Source IP",
      type: "string",
      readOnly: true,
      description: "Captured at submission for audit / spam triage.",
    }),
    defineField({
      name: "relatedWork",
      title: "About this project",
      type: "reference",
      to: [{ type: "workItem" }],
      description:
        "Optional. Links the testimonial to the project it's about so the public card can deep-link to the work.",
    }),
    defineField({
      name: "internalNotes",
      title: "Internal notes",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  preview: {
    select: {
      name: "name",
      role: "role",
      company: "company",
      status: "status",
      body: "body",
    },
    prepare: ({ name, role, company, status, body }) => {
      const who = [role, company].filter(Boolean).join(" · ");
      return {
        title: name,
        subtitle: `${status}${who ? ` · ${who}` : ""}`,
        description: body,
      };
    },
  },
  orderings: [
    {
      title: "Submitted (newest first)",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
});
