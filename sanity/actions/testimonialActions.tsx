import { useState } from "react";
import {
  CheckmarkCircleIcon,
  CloseCircleIcon,
  ArchiveIcon,
} from "@sanity/icons";
import {
  useDocumentOperation,
  type DocumentActionComponent,
  type DocumentActionDescription,
  type DocumentActionProps,
} from "sanity";

type TestimonialStatus = "pending" | "approved" | "rejected" | "archived";

type TestimonialDoc = {
  _id: string;
  status?: TestimonialStatus;
  approvedAt?: string;
};

function makeStatusAction(
  targetStatus: TestimonialStatus,
  label: string,
  icon: DocumentActionDescription["icon"],
  tone: DocumentActionDescription["tone"],
): DocumentActionComponent {
  return function StatusAction(
    props: DocumentActionProps,
  ): DocumentActionDescription | null {
    const ops = useDocumentOperation(props.id, props.type);
    const [busy, setBusy] = useState(false);

    if (props.type !== "testimonial") return null;

    const doc = (props.draft ?? props.published) as TestimonialDoc | null;
    const currentStatus = doc?.status;
    // Allow re-running Approve when the timestamp is missing (e.g. docs
    // approved before the timestamp logic was wired up correctly).
    const needsTimestampFix =
      targetStatus === "approved" &&
      currentStatus === "approved" &&
      !doc?.approvedAt;
    if (currentStatus === targetStatus && !needsTimestampFix) return null;

    const publishDisabled =
      typeof ops.publish.disabled === "string" ? ops.publish.disabled : false;

    return {
      label: busy ? `${label}…` : label,
      icon,
      tone,
      disabled: busy || Boolean(publishDisabled),
      onHandle: async () => {
        setBusy(true);
        try {
          const patches: Record<string, unknown>[] = [];
          if (targetStatus === "approved") {
            patches.push({
              set: {
                status: targetStatus,
                approvedAt: new Date().toISOString(),
              },
            });
          } else {
            patches.push({ set: { status: targetStatus } });
            patches.push({ unset: ["approvedAt"] });
          }

          ops.patch.execute(patches);
          // The patch is applied to the draft synchronously; publish on the
          // next tick so the state machine sees the updated draft.
          await new Promise((resolve) => setTimeout(resolve, 50));
          ops.publish.execute();
        } finally {
          setBusy(false);
          props.onComplete();
        }
      },
    };
  };
}

export const approveTestimonial = makeStatusAction(
  "approved",
  "Approve",
  CheckmarkCircleIcon,
  "positive",
);

export const rejectTestimonial = makeStatusAction(
  "rejected",
  "Reject",
  CloseCircleIcon,
  "critical",
);

export const archiveTestimonial = makeStatusAction(
  "archived",
  "Archive",
  ArchiveIcon,
  "default",
);
