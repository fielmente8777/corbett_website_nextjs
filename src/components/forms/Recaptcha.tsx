"use client";

import { useEffect, useRef } from "react";

// BACKUP (not used): Google reCAPTCHA v2 ("I'm not a robot" checkbox).
// Server-side check for it: src/app/api/lead/recaptcha.ts. In use now: CaptchaPopup.tsx (number code).

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";
const ONLOAD = "__onRecaptchaLoad";
const SCRIPT_SRC = `https://www.google.com/recaptcha/api.js?render=explicit&onload=${ONLOAD}`;

interface GrecaptchaApi {
  render: (el: HTMLElement, opts: Record<string, unknown>) => number;
}

declare global {
  interface Window {
    grecaptcha?: GrecaptchaApi;
    [ONLOAD]?: () => void;
  }
}

let scriptPromise: Promise<void> | null = null;

const loadScript = () => {
  if (window.grecaptcha?.render) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise<void>((resolve, reject) => {
      window[ONLOAD] = () => resolve();
      const s = document.createElement("script");
      s.src = SCRIPT_SRC;
      s.async = true;
      s.defer = true;
      s.onerror = () => {
        scriptPromise = null;
        reject(new Error("reCAPTCHA script failed to load"));
      };
      document.head.appendChild(s);
    });
  }
  return scriptPromise;
};

interface RecaptchaProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
}

const Recaptcha = ({ onVerify, onExpire, onError }: RecaptchaProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const cb = useRef({ onVerify, onExpire, onError });

  useEffect(() => {
    cb.current = { onVerify, onExpire, onError };
  }, [onVerify, onExpire, onError]);

  useEffect(() => {
    let cancelled = false;
    // Fresh inner element each mount: grecaptcha can render only once per element
    const holder = document.createElement("div");

    loadScript()
      .then(() => {
        if (cancelled || !ref.current || !window.grecaptcha) return;
        ref.current.appendChild(holder);
        window.grecaptcha.render(holder, {
          sitekey: SITE_KEY,
          theme: "light",
          callback: (token: string) => cb.current.onVerify(token),
          "expired-callback": () => cb.current.onExpire?.(),
          "error-callback": () => cb.current.onError?.(),
        });
      })
      .catch((err) => {
        console.error(err);
        cb.current.onError?.();
      });

    return () => {
      cancelled = true;
      holder.remove();
    };
  }, []);

  return <div ref={ref} className="flex min-h-[78px] justify-center" />;
};

export default Recaptcha;
