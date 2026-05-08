import { Box, Card, Flex, Stack, Text } from "@sanity/ui";

const TIERS = [
  { name: "Hourly", rate: "$125" },
  { name: "Website project", rate: "from $3,000" },
  { name: "App project", rate: "from $15,000" },
  { name: "Rescue / take-over", rate: "$125/hr to assess" },
  { name: "Care plan (opt-in)", rate: "$100/mo" },
];

const FLEX = [
  ["Friend rate", "~50–70% of standard"],
  ["Rush job", "+25% surcharge"],
  ["Multi-month", "Milestone payments, don't pre-discount"],
  ["With new project", "Consider waiving first month of care plan"],
];

export function PricingHint() {
  return (
    <Card padding={3} radius={2} tone="transparent" border>
      <details>
        <summary
          style={{
            cursor: "pointer",
            listStyle: "none",
            outline: "none",
          }}
        >
          <Text size={1} weight="medium">
            Pricing reference ↓
          </Text>
        </summary>

        <Box paddingTop={3}>
          <Stack gap={4}>
            <Stack gap={2}>
              <Text size={0} muted weight="semibold">
                STANDARD TIERS
              </Text>
              <Stack gap={2}>
                {TIERS.map((tier) => (
                  <Flex key={tier.name} align="center" gap={3}>
                    <Box style={{ minWidth: 180 }}>
                      <Text size={1}>{tier.name}</Text>
                    </Box>
                    <Text size={1} muted>
                      {tier.rate}
                    </Text>
                  </Flex>
                ))}
              </Stack>
            </Stack>

            <Stack gap={2}>
              <Text size={0} muted weight="semibold">
                FLEX RULES
              </Text>
              <Stack gap={2}>
                {FLEX.map(([label, body]) => (
                  <Flex key={label} align="flex-start" gap={3}>
                    <Box style={{ minWidth: 180 }}>
                      <Text size={1}>{label}</Text>
                    </Box>
                    <Text size={1} muted>
                      {body}
                    </Text>
                  </Flex>
                ))}
              </Stack>
            </Stack>

            <Text size={0} muted>
              First 30 min free · Quote in writing before work · Includes
              hosting + CMS + critical security for life of site · Care plan
              always opt-in
            </Text>
          </Stack>
        </Box>
      </details>
    </Card>
  );
}
