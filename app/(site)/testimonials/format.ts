export function displayName(full: string): string {
  const cleaned = full.trim().replace(/\s+/g, " ");
  if (!cleaned) return "";
  const parts = cleaned.split(" ");
  if (parts.length === 1) return parts[0];
  const first = parts[0];
  const lastInitial = parts[parts.length - 1][0]?.toUpperCase() ?? "";
  return lastInitial ? `${first} ${lastInitial}.` : first;
}

export function attribution(t: {
  name: string;
  role?: string;
  company?: string;
}): string {
  const who = displayName(t.name);
  const tail = [t.role, t.company].filter(Boolean).join(", ");
  return tail ? `${who} · ${tail}` : who;
}
