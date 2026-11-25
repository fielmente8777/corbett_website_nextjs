import { NextResponse } from "next/server";
import { verifyCaptcha } from "../captcha/lib";

// Lead submit proxy: checks the self-hosted number captcha on the server, then forwards the lead to Eazotel.
// Backup (not used): Google reCAPTCHA check in ./recaptcha.ts

const LEAD_API = "https://nexon.eazotel.com/eazotel/addcontacts";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ Status: false, message: "Invalid request" }, { status: 400 });
  }

  const { captchaToken, captchaAnswer, ...lead } = body;

  if (!verifyCaptcha(captchaToken, captchaAnswer)) {
    return NextResponse.json({
      Status: false,
      message: "Incorrect or expired code. Please try the new code.",
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
