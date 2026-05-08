import { useEffect, useMemo, useState } from "react";
import { useClient } from "sanity";
import { useRouter } from "sanity/router";
import {
  Box,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Spinner,
  Stack,
  Text,
} from "@sanity/ui";
import { apiVersion } from "../env";

const HOURLY_RATE = 125;

const QUERY = `{
  "openLeads": count(*[_type == "lead" && status in ["new", "contacted", "qualified"]]),
  "newLeadsThisWeek": count(*[_type == "lead" && status == "new" && _createdAt >= $weekAgo]),
  "activeProjects": count(*[_type == "project" && status in ["scoping", "active"]]),
  "carePlanClients": count(*[_type == "client" && carePlan == true && status == "active"]),
  "outstanding": *[_type == "invoice" && status in ["sent", "overdue"]]{
    _id, number, amount, status, dueDate
  },
  "draftInvoices": *[_type == "invoice" && status == "draft"]{
    _id, number, amount
  },
  "unbilledHours": math::sum(*[_type == "timeEntry" && billed != true].hours),
  "monthInvoiced": math::sum(*[_type == "invoice" && status in ["sent", "paid", "overdue"] && sentDate >= $monthStart].amount),
  "monthPaid": math::sum(*[_type == "invoice" && status == "paid" && paidDate >= $monthStart].amount),
  "recentLeads": *[_type == "lead"] | order(_createdAt desc)[0...6]{
    _id, name, status, source, _createdAt
  },
  "recentInvoices": *[_type == "invoice"] | order(_updatedAt desc)[0...6]{
    _id, number, amount, status, _updatedAt
  }
}`;

type Outstanding = {
  _id: string;
  number: string;
  amount: number;
  status: "sent" | "overdue";
  dueDate?: string;
};

type DraftInvoice = {
  _id: string;
  number: string;
  amount: number;
};

type RecentLead = {
  _id: string;
  name: string;
  status: string;
  source?: string;
  _createdAt: string;
};

type RecentInvoice = {
  _id: string;
  number: string;
  amount: number;
  status: string;
  _updatedAt: string;
};

type DashboardData = {
  openLeads: number;
  newLeadsThisWeek: number;
  activeProjects: number;
  carePlanClients: number;
  outstanding: Outstanding[];
  draftInvoices: DraftInvoice[];
  unbilledHours: number | null;
  monthInvoiced: number | null;
  monthPaid: number | null;
  recentLeads: RecentLead[];
  recentInvoices: RecentInvoice[];
};

const fmtMoney = (n: number | null | undefined) =>
  `$${(n ?? 0).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

const isOverdue = (dueDate?: string) =>
  dueDate ? new Date(dueDate) < new Date() : false;

export default function Dashboard() {
  const client = useClient({ apiVersion });
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const params = useMemo(() => {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
      .toISOString()
      .slice(0, 10);
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    return { monthStart, weekAgo };
  }, []);

  useEffect(() => {
    let cancelled = false;
    client
      .fetch<DashboardData>(QUERY, params)
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((err: unknown) => {
        if (!cancelled)
          setError(err instanceof Error ? err.message : "Failed to load");
      });
    return () => {
      cancelled = true;
    };
  }, [client, params]);

  if (error) {
    return (
      <Container width={4} padding={4}>
        <Card padding={4} radius={3} tone="critical">
          <Text>Couldn&apos;t load dashboard: {error}</Text>
        </Card>
      </Container>
    );
  }

  if (!data) {
    return (
      <Flex align="center" justify="center" padding={6}>
        <Spinner muted />
      </Flex>
    );
  }

  const outstandingTotal = data.outstanding.reduce(
    (sum, inv) => sum + inv.amount,
    0,
  );
  const overdueInvoices = data.outstanding.filter(
    (inv) => inv.status === "overdue" || isOverdue(inv.dueDate),
  );
  const overdueTotal = overdueInvoices.reduce(
    (sum, inv) => sum + inv.amount,
    0,
  );
  const draftTotal = data.draftInvoices.reduce(
    (sum, inv) => sum + inv.amount,
    0,
  );
  const unbilledHours = data.unbilledHours ?? 0;
  const unbilledDollars = unbilledHours * HOURLY_RATE;
  const carePlanMRR = data.carePlanClients * 100;

  const goToList = (paneId: string) => {
    router.navigateUrl({ path: `/structure/${paneId}` });
  };

  return (
    <Container width={4} padding={4}>
      <Stack space={5}>
        <Stack space={2}>
          <Heading size={3}>Dashboard</Heading>
          <Text size={1} muted>
            Snapshot of the pipeline, money, and recent activity.
          </Text>
        </Stack>

        <Grid columns={[1, 2, 4]} gap={3}>
          <Stat
            label="Open leads"
            value={String(data.openLeads)}
            sublabel={`${data.newLeadsThisWeek} new this week`}
            tone="primary"
          />
          <Stat
            label="Active projects"
            value={String(data.activeProjects)}
            sublabel="scoping + active"
          />
          <Stat
            label="Care plan"
            value={String(data.carePlanClients)}
            sublabel={`${fmtMoney(carePlanMRR)}/mo MRR`}
          />
          <Stat
            label="This month paid"
            value={fmtMoney(data.monthPaid)}
            sublabel={`${fmtMoney(data.monthInvoiced)} invoiced`}
            tone="positive"
          />
        </Grid>

        <Grid columns={[1, 1, 3]} gap={3}>
          <Stat
            label="Outstanding AR"
            value={fmtMoney(outstandingTotal)}
            sublabel={`${data.outstanding.length} invoice${data.outstanding.length === 1 ? "" : "s"}${
              overdueInvoices.length
                ? ` · ${overdueInvoices.length} overdue (${fmtMoney(overdueTotal)})`
                : ""
            }`}
            tone={overdueInvoices.length ? "caution" : "default"}
          />
          <Stat
            label="Draft invoices"
            value={fmtMoney(draftTotal)}
            sublabel={`${data.draftInvoices.length} draft${data.draftInvoices.length === 1 ? "" : "s"}`}
          />
          <Stat
            label="Unbilled time"
            value={`${unbilledHours.toFixed(1)}h`}
            sublabel={`~${fmtMoney(unbilledDollars)} at $${HOURLY_RATE}/hr`}
            tone={unbilledHours > 0 ? "caution" : "default"}
          />
        </Grid>

        <Grid columns={[1, 1, 2]} gap={3}>
          <Card padding={4} radius={3} shadow={1}>
            <Stack space={3}>
              <Flex align="center" justify="space-between">
                <Heading size={1}>Recent leads</Heading>
                <button
                  type="button"
                  onClick={() => goToList("__edit__lead")}
                  style={linkStyle}
                >
                  All leads →
                </button>
              </Flex>
              {data.recentLeads.length === 0 ? (
                <Text size={1} muted>
                  No leads yet.
                </Text>
              ) : (
                <Stack space={2}>
                  {data.recentLeads.map((lead) => (
                    <Row
                      key={lead._id}
                      title={lead.name}
                      subtitle={`${lead.status}${lead.source ? ` · ${lead.source}` : ""}`}
                      meta={fmtDate(lead._createdAt)}
                    />
                  ))}
                </Stack>
              )}
            </Stack>
          </Card>

          <Card padding={4} radius={3} shadow={1}>
            <Stack space={3}>
              <Flex align="center" justify="space-between">
                <Heading size={1}>Recent invoices</Heading>
                <button
                  type="button"
                  onClick={() => goToList("__edit__invoice")}
                  style={linkStyle}
                >
                  All invoices →
                </button>
              </Flex>
              {data.recentInvoices.length === 0 ? (
                <Text size={1} muted>
                  No invoices yet.
                </Text>
              ) : (
                <Stack space={2}>
                  {data.recentInvoices.map((inv) => (
                    <Row
                      key={inv._id}
                      title={inv.number}
                      subtitle={inv.status}
                      meta={fmtMoney(inv.amount)}
                    />
                  ))}
                </Stack>
              )}
            </Stack>
          </Card>
        </Grid>
      </Stack>
    </Container>
  );
}

const linkStyle: React.CSSProperties = {
  background: "none",
  border: 0,
  color: "var(--card-link-color)",
  cursor: "pointer",
  font: "inherit",
  fontSize: 12,
  padding: 0,
};

function Stat({
  label,
  value,
  sublabel,
  tone = "default",
}: {
  label: string;
  value: string;
  sublabel?: string;
  tone?: "default" | "primary" | "positive" | "caution";
}) {
  return (
    <Card padding={4} radius={3} shadow={1} tone={tone}>
      <Stack space={3}>
        <Text size={1} muted weight="medium">
          {label}
        </Text>
        <Heading size={4}>{value}</Heading>
        {sublabel ? (
          <Text size={1} muted>
            {sublabel}
          </Text>
        ) : null}
      </Stack>
    </Card>
  );
}

function Row({
  title,
  subtitle,
  meta,
}: {
  title: string;
  subtitle: string;
  meta: string;
}) {
  return (
    <Flex align="center" justify="space-between" gap={3}>
      <Box flex={1} style={{ minWidth: 0 }}>
        <Stack space={1}>
          <Text size={1} weight="medium" textOverflow="ellipsis">
            {title}
          </Text>
          <Text size={0} muted textOverflow="ellipsis">
            {subtitle}
          </Text>
        </Stack>
      </Box>
      <Text size={1} muted>
        {meta}
      </Text>
    </Flex>
  );
}
