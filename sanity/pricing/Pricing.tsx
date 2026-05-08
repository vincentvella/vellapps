import {
  Box,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
} from "@sanity/ui";

const TIERS = [
  {
    name: "Hourly",
    rate: "$125",
    notes: "Actual work only — emails / calls / questions don't count",
  },
  {
    name: "Website project",
    rate: "from $3,000",
    notes:
      "Fixed-price after scoping. Includes hosting, CMS, security patches for life of site.",
  },
  {
    name: "App project",
    rate: "from $15,000",
    notes:
      "Fixed-price after scoping. iOS / Android / web from one codebase.",
  },
  {
    name: "Rescue / take-over",
    rate: "$125/hr to assess",
    notes: "Then fixed price for the actual work.",
  },
  {
    name: "Care plan (opt-in)",
    rate: "$100/mo",
    notes:
      "Analytics, security patches, uptime, backups, monthly summary, priority response.",
  },
];

const CARE_PLAN = [
  "Privacy-friendly analytics dashboard (Umami)",
  "Critical security patches + dependency updates",
  "Uptime monitoring + alerts",
  "Daily automated backups",
  "Monthly health summary email",
  "Priority response when something breaks",
];

const CALL_DEFAULTS = [
  "First 30 min of intro call is free",
  "Quote always in writing before any work starts",
  "Project price covers hosting + CMS + critical security for life of site",
  "No mandatory recurring fees — Care plan is always opt-in",
  "Comms: email or text, response within 1 business day",
  "Weekly progress notes during a build",
];

const FLEX_RULES = [
  {
    label: "Friend rate",
    body: "~50–70% of standard. Flag explicitly so it doesn't reset expectations for paying clients.",
  },
  { label: "Rush jobs", body: "Standard + 25% surcharge." },
  {
    label: "Multi-month",
    body: "Consider milestone payments. Don't pre-discount.",
  },
  {
    label: "Care plan paired with new project",
    body: "Consider waiving first month.",
  },
];

export default function Pricing() {
  return (
    <Container width={4} padding={4}>
      <Stack gap={5}>
        <Stack gap={2}>
          <Heading size={3}>Pricing</Heading>
          <Text size={1} muted>
            Internal anchor for quoting calls. Not public on the site.
          </Text>
        </Stack>

        <Card padding={4} radius={3} shadow={1}>
          <Stack gap={4}>
            <Stack gap={3}>
              <Text size={1} weight="semibold">
                Standard tiers
              </Text>
              <Stack gap={2}>
                {TIERS.map((tier) => (
                  <Flex key={tier.name} align="flex-start" gap={3}>
                    <Box style={{ minWidth: 180 }}>
                      <Text size={1} weight="medium">
                        {tier.name}
                      </Text>
                    </Box>
                    <Box style={{ minWidth: 140 }}>
                      <Text size={1}>{tier.rate}</Text>
                    </Box>
                    <Box flex={1} style={{ minWidth: 0 }}>
                      <Text size={1} muted>
                        {tier.notes}
                      </Text>
                    </Box>
                  </Flex>
                ))}
              </Stack>
            </Stack>

            <Grid gridTemplateColumns={[1, 1, 2]} gap={4}>
              <Stack gap={3}>
                <Text size={1} weight="semibold">
                  Care plan — what&apos;s included
                </Text>
                <Stack as="ul" gap={2} style={{ paddingLeft: 18, margin: 0 }}>
                  {CARE_PLAN.map((item) => (
                    <li key={item} style={{ listStyle: "disc" }}>
                      <Text size={1} muted>
                        {item}
                      </Text>
                    </li>
                  ))}
                </Stack>
              </Stack>

              <Stack gap={3}>
                <Text size={1} weight="semibold">
                  Defaults to remember on the call
                </Text>
                <Stack as="ul" gap={2} style={{ paddingLeft: 18, margin: 0 }}>
                  {CALL_DEFAULTS.map((item) => (
                    <li key={item} style={{ listStyle: "disc" }}>
                      <Text size={1} muted>
                        {item}
                      </Text>
                    </li>
                  ))}
                </Stack>
              </Stack>
            </Grid>

            <Stack gap={3}>
              <Text size={1} weight="semibold">
                When to flex
              </Text>
              <Grid gridTemplateColumns={[1, 1, 2]} gap={3}>
                {FLEX_RULES.map((rule) => (
                  <Card
                    key={rule.label}
                    padding={3}
                    radius={2}
                    tone="transparent"
                  >
                    <Stack gap={2}>
                      <Text size={1} weight="medium">
                        {rule.label}
                      </Text>
                      <Text size={1} muted>
                        {rule.body}
                      </Text>
                    </Stack>
                  </Card>
                ))}
              </Grid>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
