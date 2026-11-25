import { NextResponse } from "next/server";
import { createCaptcha } from "./lib";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const theme = new URL(req.url).searchParams.get("theme") === "dark" ? "dark" : "light";
  return NextResponse.json(createCaptcha(theme), {
    headers: { "Cache-Control": "no-store" },
  });
}
