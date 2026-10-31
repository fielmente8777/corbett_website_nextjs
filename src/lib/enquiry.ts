export interface EnquiryData {
  name: string; phone: string; countryCode: string; email: string;
  intent: "stay" | "wedding" | "corporate" | "general";
  date: string; departure: string; guests: string; rooms: string; room: string;
  message: string; sourceUrl: string;
}

export function validateEnquiry(input: unknown): { data?: EnquiryData; error?: string } {
  if (!input || typeof input !== "object") return { error: "Please check your enquiry details." };
  const source = input as Record<string, unknown>;
  const text = (key: string, max = 200) => typeof source[key] === "string" ? source[key].trim().slice(0, max) : "";
  if (text("website")) return { error: "Unable to submit this enquiry." };
  const name = text("name", 100), phone = text("phone").replace(/[\s()-]/g, ""), countryCode = text("countryCode").replace(/\s/g, ""), email = text("email");
  if (name.length < 2) return { error: "Please enter your full name." };
  if (!/^\+\d{1,4}$/.test(countryCode) || !/^\d{7,15}$/.test(phone) || (countryCode + phone).replace(/\D/g, "").length > 15) return { error: "Please enter a valid country code and phone number." };
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Please enter a valid email address." };
  const rawIntent = text("intent");
  const intent = ["stay", "wedding", "corporate", "general"].includes(rawIntent) ? rawIntent as EnquiryData["intent"] : "general";
  const date = text("date", 10), departure = text("departure", 10);
  const validDate = (value: string) => !value || /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
  if (!validDate(date) || !validDate(departure)) return { error: "Please choose a valid date." };
  if (date && departure && departure <= date) return { error: "Departure must be after arrival." };
  for (const key of ["guests", "rooms"]) if (text(key) && !/^[1-9]\d{0,4}$/.test(text(key))) return { error: "Please enter a valid guest and room count." };
  return { data: { name, phone, countryCode, email, intent, date, departure, guests: text("guests", 5), rooms: text("rooms", 5), room: text("room", 100), message: text("message", 2500), sourceUrl: text("sourceUrl", 2000) } };
}

export function crmPayload(data: EnquiryData, sourceUrl: string) {
  return {
    Domain: "corbettthegrand", Name: data.name, email: data.email, Contact: data.countryCode + data.phone,
    check_in: data.date || undefined, check_out: data.departure || undefined,
    Description: [`Enquiry: ${data.intent}`, data.date && `Preferred date: ${data.date}`, data.departure && `Departure: ${data.departure}`, data.guests && `Guests: ${data.guests}`, data.rooms && `Rooms: ${data.rooms}`, data.room && `Room preference: ${data.room}`, data.message && `Message: ${data.message}`, sourceUrl && `Source: ${sourceUrl}`].filter(Boolean).join("\n"),
    created_from: "webform", source_url: sourceUrl,
  };
}
