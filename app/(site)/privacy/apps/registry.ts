export type AppPrivacy = {
  name: string;
  tagline?: string;
  collects?: string[];
  thirdParties?: string[];
  hasAccountDeletion?: boolean;
};

// Registered apps. Unknown slugs fall back to a generic stub policy
// using a slug-derived name — useful for first submissions before
// the app collects anything meaningful.
export const APPS: Record<string, AppPrivacy> = {
  caliburr: {
    name: "Caliburr",
    tagline: "Coffee dial-in app",
    collects: [
      "Your account email (via Sign in with Apple or Sign in with Google)",
      "Recipes, equipment entries, and other content you create in the app",
      "Photos you upload to your recipes or equipment listings",
    ],
    thirdParties: [
      "Apple — Sign in with Apple, App Store subscription management",
      "Google — Sign in with Google",
      "Supabase — account, content, and image storage",
      "RevenueCat — subscription management for backer features",
    ],
    hasAccountDeletion: true,
  },
  "stash-note": {
    name: "Stash Note",
    tagline: "Cross-platform notes",
    collects: [
      "Your account email (via Sign in with Apple or Sign in with Google)",
      "Your notes and any media you embed in them",
    ],
    thirdParties: [
      "Apple — Sign in with Apple",
      "Google — Sign in with Google",
      "Supabase — account and note storage, sync",
    ],
    hasAccountDeletion: true,
  },
  "pod-haven": {
    name: "Pod Haven",
    tagline: "Local-first podcast listener",
    collects: [
      "Nothing on a server. Pod Haven is local-first — your subscriptions, episodes, and play state stay on your device.",
    ],
    thirdParties: [],
    hasAccountDeletion: false,
  },
  equipless: {
    name: "Equipless",
    tagline: "Habit-building workout tracker",
    collects: [
      "Your account email (if you choose to sign in)",
      "Workout history and routines you create",
    ],
    thirdParties: [
      "Apple — Sign in with Apple",
      "Google — Sign in with Google",
    ],
    hasAccountDeletion: true,
  },
  bonfire: {
    name: "Bonfire Party Games",
    tagline: "Local-multiplayer party games",
    collects: [
      "Nothing on a server. Bonfire is local-only — the nickname you choose, the role you're dealt, and any game state stay on your device or are broadcast only to other phones in the same room over Bluetooth and your local Wi-Fi network.",
      "An anonymous device id (identifierForVendor on iOS, ANDROID_ID on Android) used by the room's host phone to recognize you across reconnects within a game. The id never leaves the local Bluetooth/Wi-Fi session.",
      "Bluetooth and Local Network permissions are used solely for in-room peer-to-peer play. The app does not scan for nearby people outside an active game lobby, does not log Bluetooth or Wi-Fi data anywhere, and does not transmit any of it off your device.",
    ],
    thirdParties: [],
    hasAccountDeletion: false,
  },
};

export function deriveAppFromSlug(slug: string): AppPrivacy {
  const name = slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
  return { name };
}

export function getApp(slug: string): AppPrivacy {
  return APPS[slug] ?? deriveAppFromSlug(slug);
}
