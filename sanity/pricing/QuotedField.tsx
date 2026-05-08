import { Stack } from "@sanity/ui";
import type { NumberFieldProps } from "sanity";
import { PricingHint } from "./PricingHint";

export function QuotedField(props: NumberFieldProps) {
  return (
    <Stack gap={3}>
      {props.renderDefault(props)}
      <PricingHint />
    </Stack>
  );
}
