export type AppPrivacy = {
  name: string;
  tagline?: string;
  collects?: string[];
  thirdParties?: string[];
  hasAccountDeletion?: boolean;
  /** Overrides the shared date when an app's policy was written later. */
  lastUpdated?: string;
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
  helm: {
    name: "Helm",
    tagline: "Ad-free Android TV remote",
    lastUpdated: "August 14, 2026",
    collects: [
      "Nothing on a server. Helm has no accounts, no backend, and no analytics. It talks to one thing: the TV sitting on your own Wi-Fi network.",
      "Details of the TVs you pair stay on your device — the TV's name, its address on your local network, the client certificate Helm generates for it, and a MAC address if you enter one yourself for Wake-on-LAN. The private key behind that certificate is held in the device's secure storage (iOS Keychain / Android Keystore) and never leaves the phone.",
      "Local Network permission is used only to find Android TV and Google TV devices advertising themselves on your Wi-Fi, and to open the encrypted connection that carries your button presses. Helm does not scan for anything else, does not read your network's traffic, and does not log or transmit anything about your network.",
      "Text you type in keyboard mode goes straight to the TV over that encrypted local connection. It is not stored, logged, or copied anywhere.",
      "Helm never learns what you watch. It sends key presses; it does not receive or record your viewing history.",
      "Removing a TV in Helm erases its certificate and key immediately. Deleting the app removes everything at once. There is no copy anywhere else to ask for.",
    ],
    thirdParties: [],
    hasAccountDeletion: false,
  },
  foreshore: {
    name: "Foreshore",
    tagline: "Eating-window tracker",
    lastUpdated: "August 14, 2026",
    collects: [
      "Nothing on a server. Foreshore has no accounts, no backend, and no analytics — the app makes no network requests to send your data anywhere, because there is nowhere for it to go.",
      "What you log — the time of your first and last bite each day, and the eating window you set — is written to a database file on your device and read back by the app. Nothing else touches it.",
      "Foreshore does not read from or write to Apple Health or Google Fit, and asks for no health permissions.",
      "Reminders are scheduled locally by the operating system from times you chose. There is no push token and no server, so nobody — me included — knows when or whether the app notified you.",
      "On iOS, the widget and Live Activity are handed two numbers: the minute your window opens and the minute it closes. Everything they display is worked out from those and the clock. Your daily log is not shared with them.",
      "If your phone backs itself up to iCloud or Google's backup service, the app's database may be included in that backup under Apple's or Google's own terms. That is a backup of your device that you control, not a transfer to me.",
      "Deleting the app deletes the database and everything recorded in it.",
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
