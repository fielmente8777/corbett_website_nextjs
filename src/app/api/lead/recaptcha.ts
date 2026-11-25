// BACKUP (not used): server-side check for Google reCAPTCHA v2 (pairs with components/forms/Recaptcha.tsx).
// To switch back: in route.ts call `await verifyRecaptcha(captchaToken, ip)` instead of verifyCaptcha,
// and set NEXT_PUBLIC_RECAPTCHA_SITE_KEY + RECAPTCHA_SECRET_KEY env vars.

const RECAPTCHA_VERIFY = "https://www.google.com/recaptcha/api/siteverify";

export async function verifyRecaptcha(token: unknown, ip: string | null): Promise<boolean> {
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
