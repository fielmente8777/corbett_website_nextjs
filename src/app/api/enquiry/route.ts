import { NextResponse } from "next/server";
import { validateEnquiry, crmPayload } from "@/lib/enquiry";
import { cleanSourceUrl } from "@/lib/contact-links";

export async function POST(request: Request) {
  try {
    const raw = await request.text();
    if (raw.length > 12000) return NextResponse.json({ error: "Your message is too long." }, { status: 413 });
    let input: unknown;
    try { input = JSON.parse(raw); } catch { return NextResponse.json({ error: "Please check your enquiry details." }, { status: 400 }); }
    const result = validateEnquiry(input);
    if (!result.data) return NextResponse.json({ error: result.error }, { status: 422 });
    const response = await fetch("https://nexon.eazotel.com/eazotel/addcontacts", {
      method: "POST", headers: { "Content-Type": "application/json" }, cache: "no-store", signal: AbortSignal.timeout(12000),
      body: JSON.stringify(crmPayload(result.data, cleanSourceUrl(result.data.sourceUrl))),
    });
    if (!response.ok) throw new Error("Enquiry service unavailable");
    const answer = await response.json();
    if (answer.Status !== true && answer.Status !== "true" && answer.Status !== 1) throw new Error("Enquiry not accepted");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "We could not send your enquiry. Please try again or contact our team by phone or WhatsApp." }, { status: 502 });
  }
}
