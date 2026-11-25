import { createHmac, randomBytes, randomInt, timingSafeEqual } from "crypto";

// Self-hosted image captcha. No outside service, no account, no cost.
// The code is drawn as SVG lines (not text), so it can't be read from the page source.
// CAPTCHA_SECRET env is optional; the fallback below is server-only and never sent to the browser.

const SECRET = process.env.CAPTCHA_SECRET || "b7e2a750841e5174e2c928c2d3a28b3c4cd26d55748821ab0a31a123a8cb663c";
const TTL_MS = 5 * 60 * 1000; // captcha valid for 5 minutes
const MIN_SOLVE_MS = 1500; // a human needs at least this long to read and type the code
const LENGTH = 5;

const sign = (answer: string, exp: string, nonce: string) =>
  createHmac("sha256", SECRET).update(`${answer}.${exp}.${nonce}`).digest("hex");

// Digits drawn as strokes on a 10 x 16 grid
const GLYPHS: Record<string, number[][][]> = {
  "0": [[[2, 0], [8, 0], [10, 2], [10, 14], [8, 16], [2, 16], [0, 14], [0, 2], [2, 0]]],
  "1": [[[3, 3], [6, 0], [6, 16]], [[2, 16], [10, 16]]],
  "2": [[[0, 2], [2, 0], [8, 0], [10, 2], [10, 6], [0, 16], [10, 16]]],
  "3": [
    [[0, 1], [2, 0], [8, 0], [10, 2], [10, 6], [8, 8], [3, 8]],
    [[8, 8], [10, 10], [10, 14], [8, 16], [2, 16], [0, 15]],
  ],
  "4": [[[7, 16], [7, 0], [0, 11], [10, 11]]],
  "5": [[[10, 0], [0, 0], [0, 7], [7, 7], [10, 9], [10, 14], [8, 16], [0, 16]]],
  "6": [[[9, 0], [3, 0], [0, 4], [0, 14], [2, 16], [8, 16], [10, 14], [10, 10], [8, 8], [0, 8]]],
  "7": [[[0, 0], [10, 0], [4, 16]], [[3, 8], [9, 8]]],
  "8": [
    [[2, 0], [8, 0], [10, 2], [10, 6], [8, 8], [2, 8], [0, 6], [0, 2], [2, 0]],
    [[2, 8], [0, 10], [0, 14], [2, 16], [8, 16], [10, 14], [10, 10], [8, 8]],
  ],
  "9": [[[10, 8], [2, 8], [0, 6], [0, 2], [2, 0], [8, 0], [10, 2], [10, 12], [7, 16], [1, 16]]],
};

const rnd = (min: number, max: number) => min + Math.random() * (max - min);
const pick = <T,>(arr: T[]) => arr[randomInt(arr.length)];
const f = (n: number) => n.toFixed(1);

const W = 160;
const H = 52;

export type CaptchaTheme = "light" | "dark";

// Brand colours (secondary #7B584F, primary #171717). Background is transparent so it blends into the form.
const PALETTE: Record<CaptchaTheme, { ink: string[]; noise: string[] }> = {
  light: { ink: ["#7B584F", "#5C3F38", "#171717", "#8A6A5F"], noise: ["#D9C8C1", "#C9B3AA", "#E3D5CF"] },
  dark: { ink: ["#F3E9E4", "#D8BFB5", "#FFFFFF", "#C9A79C"], noise: ["#4A3B37", "#5A4741", "#3D3230"] },
};

function renderSvg(code: string, theme: CaptchaTheme): string {
  const { ink, noise } = PALETTE[theme];

  // Global wave applied to every point, so digits are bent, not just rotated
  const ax = rnd(1.5, 2.5), ay = rnd(2, 3.5);
  const fx = rnd(0.05, 0.09), fy = rnd(0.04, 0.07);
  const px = rnd(0, Math.PI * 2), py = rnd(0, Math.PI * 2);
  const warp = (x: number, y: number): [number, number] => [
    x + ax * Math.sin(y * fy + px),
    y + ay * Math.sin(x * fx + py),
  ];

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`;

  for (let i = 0; i < 4; i++) {
    svg += `<path d="M${f(rnd(0, 20))} ${f(rnd(0, H))} Q${f(rnd(0, W))} ${f(rnd(0, H))} ${f(rnd(W - 20, W))} ${f(rnd(0, H))}" stroke="${pick(noise)}" stroke-width="${f(rnd(1, 2))}" fill="none"/>`;
  }
  for (let i = 0; i < 30; i++) {
    svg += `<circle cx="${f(rnd(0, W))}" cy="${f(rnd(0, H))}" r="${f(rnd(0.5, 1.4))}" fill="${pick(noise)}"/>`;
  }

  const mainInk = pick(ink);
  code.split("").forEach((ch, i) => {
    const scale = rnd(1.8, 2.15);
    const angle = (rnd(-20, 20) * Math.PI) / 180;
    const cos = Math.cos(angle), sin = Math.sin(angle);
    const cx = 23 + i * 25.5 + rnd(-2, 2);
    const cy = H / 2 + rnd(-3, 3);

    const place = (x: number, y: number): [number, number] => {
      const lx = (x - 5 + rnd(-0.5, 0.5)) * scale;
      const ly = (y - 8 + rnd(-0.5, 0.5)) * scale;
      return warp(cx + lx * cos - ly * sin, cy + lx * sin + ly * cos);
    };

    const d = GLYPHS[ch]
      .map((stroke) => {
        const pts: [number, number][] = [];
        for (let j = 0; j < stroke.length - 1; j++) {
          const [x1, y1] = stroke[j];
          const [x2, y2] = stroke[j + 1];
          for (let k = 0; k < 3; k++) {
            const t = k / 3;
            pts.push(place(x1 + (x2 - x1) * t, y1 + (y2 - y1) * t));
          }
        }
        const [lx, ly] = stroke[stroke.length - 1];
        pts.push(place(lx, ly));
        return pts.map(([x, y], j) => `${j ? "L" : "M"}${f(x)} ${f(y)}`).join(" ");
      })
      .join(" ");

    const color = Math.random() < 0.6 ? mainInk : pick(ink);
    svg += `<path d="${d}" stroke="${color}" stroke-width="${f(rnd(2.2, 2.9))}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  });

  // Strike line in the same ink as the digits, weaving through them
  let strike = "";
  const baseY = H / 2 + rnd(-6, 6);
  for (let x = 6; x <= W - 6; x += 6) {
    const [wx, wy] = warp(x, baseY + 5 * Math.sin(x * 0.06 + px));
    strike += `${x === 6 ? "M" : "L"}${f(wx)} ${f(wy)} `;
  }
  svg += `<path d="${strike.trim()}" stroke="${mainInk}" stroke-width="1.4" fill="none" stroke-linecap="round" opacity="0.85"/>`;

  return svg + "</svg>";
}

export function createCaptcha(theme: CaptchaTheme = "light") {
  let code = "";
  for (let i = 0; i < LENGTH; i++) code += String(randomInt(10));

  const exp = String(Date.now() + TTL_MS);
  const nonce = randomBytes(12).toString("hex");

  return {
    token: `${exp}.${nonce}.${sign(code, exp, nonce)}`,
    image: `data:image/svg+xml;base64,${Buffer.from(renderSvg(code, theme)).toString("base64")}`,
  };
}

// Each captcha can be tried only once (right or wrong), so it can't be guessed or reused.
const usedNonces = new Map<string, number>();

export function verifyCaptcha(token: unknown, answer: unknown): boolean {
  if (typeof token !== "string" || typeof answer !== "string") return false;

  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [exp, nonce, sig] = parts;

  const now = Date.now();
  const expNum = Number(exp);
  if (!Number.isFinite(expNum) || expNum < now) return false;

  for (const [n, e] of usedNonces) if (e < now) usedNonces.delete(n);
  if (usedNonces.has(nonce)) return false;
  usedNonces.set(nonce, expNum);

  // Filled faster than a human can read it -> bot
  if (now - (expNum - TTL_MS) < MIN_SOLVE_MS) return false;

  const expected = Buffer.from(sign(answer.trim(), exp, nonce), "hex");
  const given = Buffer.from(sig, "hex");
  return given.length === expected.length && timingSafeEqual(given, expected);
}
