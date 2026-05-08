import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Vellapps")
    .items([
      S.listItem()
        .title("📊 Pipeline")
        .child(
          S.list()
            .title("Pipeline")
            .items([
              S.listItem()
                .title("Open leads")
                .child(
                  S.documentList()
                    .title("Open leads")
                    .schemaType("lead")
                    .filter(
                      `_type == "lead" && status in ["new", "contacted", "qualified"]`
                    )
                    .defaultOrdering([
                      { field: "_createdAt", direction: "desc" },
                    ])
                ),
              S.listItem()
                .title("Active clients")
                .child(
                  S.documentList()
                    .title("Active clients")
                    .schemaType("client")
                    .filter(`_type == "client" && status == "active"`)
                ),
              S.listItem()
                .title("Prospects")
                .child(
                  S.documentList()
                    .title("Prospects")
                    .schemaType("client")
                    .filter(`_type == "client" && status == "prospect"`)
                ),
              S.listItem()
                .title("Care plan subscribers")
                .child(
                  S.documentList()
                    .title("Care plan subscribers")
                    .schemaType("client")
                    .filter(`_type == "client" && carePlan == true`)
                ),
            ])
        ),

      S.listItem()
        .title("📁 Projects")
        .child(
          S.list()
            .title("Projects")
            .items([
              S.listItem()
                .title("In flight")
                .child(
                  S.documentList()
                    .title("In flight")
                    .schemaType("project")
                    .filter(
                      `_type == "project" && status in ["scoping", "active"]`
                    )
                ),
              S.listItem()
                .title("Launched")
                .child(
                  S.documentList()
                    .title("Launched")
                    .schemaType("project")
                    .filter(`_type == "project" && status == "launched"`)
                ),
              S.listItem()
                .title("Done")
                .child(
                  S.documentList()
                    .title("Done")
                    .schemaType("project")
                    .filter(`_type == "project" && status == "done"`)
                ),
            ])
        ),

      S.listItem()
        .title("💵 Money")
        .child(
          S.list()
            .title("Money")
            .items([
              S.listItem()
                .title("Open invoices")
                .child(
                  S.documentList()
                    .title("Open invoices")
                    .schemaType("invoice")
                    .filter(
                      `_type == "invoice" && status in ["sent", "overdue"]`
                    )
                    .defaultOrdering([
                      { field: "dueDate", direction: "asc" },
                    ])
                ),
              S.listItem()
                .title("Drafts")
                .child(
                  S.documentList()
                    .title("Draft invoices")
                    .schemaType("invoice")
                    .filter(`_type == "invoice" && status == "draft"`)
                ),
              S.listItem()
                .title("Paid")
                .child(
                  S.documentList()
                    .title("Paid invoices")
                    .schemaType("invoice")
                    .filter(`_type == "invoice" && status == "paid"`)
                    .defaultOrdering([
                      { field: "paidDate", direction: "desc" },
                    ])
                ),
              S.divider(),
              S.listItem()
                .title("Unbilled time")
                .child(
                  S.documentList()
                    .title("Unbilled time entries")
                    .schemaType("timeEntry")
                    .filter(`_type == "timeEntry" && billed != true`)
                    .defaultOrdering([
                      { field: "date", direction: "desc" },
                    ])
                ),
              S.listItem()
                .title("All time entries")
                .child(
                  S.documentList()
                    .title("Time entries")
                    .schemaType("timeEntry")
                    .defaultOrdering([
                      { field: "date", direction: "desc" },
                    ])
                ),
            ])
        ),

      S.listItem()
        .title("📝 Reviews")
        .child(
          S.documentList()
            .title("Monthly reviews")
            .schemaType("review")
            .defaultOrdering([{ field: "month", direction: "desc" }])
        ),

      S.divider(),

      // Everything (default flat document type lists)
      S.documentTypeListItem("client").title("All clients"),
      S.documentTypeListItem("project").title("All projects"),
      S.documentTypeListItem("lead").title("All leads"),
      S.documentTypeListItem("invoice").title("All invoices"),
      S.documentTypeListItem("timeEntry").title("All time entries"),
      S.documentTypeListItem("review").title("All reviews"),
    ]);
