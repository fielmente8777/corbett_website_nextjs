import { NextResponse } from "next/server";

// Lead submit proxy: checks Google reCAPTCHA v2 on the server, then forwards the lead to Eazotel.
// (Old self-hosted captcha in ../captcha is kept as a backup and is not used here.)

const LEAD_API = "https://nexon.eazotel.com/eazotel/addcontacts";
const RECAPTCHA_VERIFY = "https://www.google.com/recaptcha/api/siteverify";

async function verifyRecaptcha(token: unknown, ip: string | null): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    console.error("RECAPTCHA_SECRET_KEY is not set");
    return false;
  }
  if (typeof token !== "string" || !token || token.length > 4096) return false;

  const form = new URLSearchParams({ secret, response: token });
  if (ip) form.append("remoteip", ip);

  try {
    const res = await fetch(RECAPTCHA_VERIFY, { method: "POST", body: form });
    const data = (await res.json()) as { success?: boolean; "error-codes"?: string[] };
    if (!data.success) console.warn("reCAPTCHA failed:", data["error-codes"]);
    return data.success === true;
  } catch (err) {
    console.error("reCAPTCHA verify error:", err);
    return false;
  }
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ Status: false, message: "Invalid request" }, { status: 400 });
  }

  const { captchaToken, ...lead } = body;

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || null;

  if (!(await verifyRecaptcha(captchaToken, ip))) {
    return NextResponse.json({
      Status: false,
      message: "Verification failed. Please tick the box again.",
    });
  }

  try {
    const res = await fetch(LEAD_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    const data = await res
      .json()
      .catch(() => ({ Status: false, message: "Something went wrong. Please try again." }));
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Lead submit error:", err);
    return NextResponse.json(
      { Status: false, message: "Something went wrong. Please try again." },
      { status: 502 }
    );
  }
}
