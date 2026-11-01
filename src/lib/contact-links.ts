export type EnquiryIntent = "stay" | "wedding" | "corporate" | "general";

export const canonicalOrigin = "https://corbettthegrand.com";
// Preserve the configured WhatsApp recipient from the live site's latest commit.
export const whatsappRecipient = "17117459883";
export const phoneNumbers = { stay: "918958988800", wedding: "918958988810", corporate: "919711871016", general: "918958988800" };
export const messages: Record<EnquiryIntent, string> = {
  stay: "Hello, I would like to enquire about a stay at Corbett The Grand. Please help with rooms, meal plans and availability for my dates.",
  wedding: "Hello, I am planning a wedding at Corbett The Grand. Please help with event dates, venues, guest accommodation and a wedding proposal.",
  corporate: "Hello, I would like to plan a corporate offsite at Corbett The Grand. Please help with meeting spaces, group accommodation and a proposal.",
  general: "Hello, I would like to know more about Corbett The Grand. Please connect me with the relevant team.",
};

export function intentForPath(path: string): EnquiryIntent {
  if (/wedding/.test(path)) return "wedding";
  if (/corporate|offsite|conference|team-building/.test(path)) return "corporate";
  return "stay";
}

export function whatsappLink(intent: EnquiryIntent = "stay", recipient = whatsappRecipient) {
  return `https://wa.me/${recipient.replace(/\D/g, "")}?text=${encodeURIComponent(messages[intent])}`;
}

export function telephoneLink(intent: EnquiryIntent = "stay") {
  return `tel:+${phoneNumbers[intent]}`;
}

export function enquiryLink(intent: EnquiryIntent = "stay", room?: string) {
  const query = new URLSearchParams({ intent });
  if (room) query.set("room", room);
  return `/contact?${query.toString()}`;
}

export function cleanSourceUrl(value: string) {
  try {
    const url = new URL(value);
    if (!/^https?:$/.test(url.protocol)) return "";
    const safe = new URL(url.origin + url.pathname);
    for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid"]) {
      const entry = url.searchParams.get(key);
      if (entry) safe.searchParams.set(key, entry.slice(0, 200));
    }
    return safe.toString();
  } catch { return ""; }
}
