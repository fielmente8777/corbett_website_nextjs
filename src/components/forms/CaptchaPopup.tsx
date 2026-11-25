"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// Security-check popup using the self-hosted number captcha (src/app/api/captcha).
// Backup (not used): Recaptcha.tsx (Google reCAPTCHA v2 checkbox).

const LENGTH = 5;

interface CaptchaPopupProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (token: string, answer: string) => void;
  isSubmitting: boolean;
  error?: string;
  /** change this number to load a fresh code (e.g. after a failed try) */
  reloadKey: number;
  captchaUrl?: string;
}

const ShieldIcon = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3Zm-1.2 14.2-3.5-3.5 1.4-1.4 2.1 2.1 4.9-4.9 1.4 1.4-6.3 6.3Z" />
  </svg>
);

const RefreshIcon = ({ spinning }: { spinning: boolean }) => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={spinning ? "animate-spin" : ""}
    aria-hidden="true"
  >
    <path d="M21 12a9 9 0 1 1-2.64-6.36" />
    <path d="M21 3v6h-6" />
  </svg>
);

const LockIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Zm-3 8V7a3 3 0 1 1 6 0v3H9Z" />
  </svg>
);

const CaptchaPopup = ({
  open,
  onClose,
  onSubmit,
  isSubmitting,
  error,
  reloadKey,
  captchaUrl = "/api/captcha",
}: CaptchaPopupProps) => {
  const [image, setImage] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [digits, setDigits] = useState<string[]>(Array(LENGTH).fill(""));
  const [visible, setVisible] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const focusBox = (i: number) => inputs.current[Math.max(0, Math.min(LENGTH - 1, i))]?.focus();

  const loadCaptcha = useCallback(() => {
    setLoading(true);
    setDigits(Array(LENGTH).fill(""));
    fetch(`${captchaUrl}?theme=light`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data: { token: string; image: string }) => {
        setImage(data.image);
        setToken(data.token);
      })
      .catch((err) => console.error("Captcha load error:", err))
      .finally(() => setLoading(false));
  }, [captchaUrl]);

  // put the cursor in the first box once a new code is shown
  useEffect(() => {
    if (open && !loading) inputs.current[0]?.focus();
  }, [open, loading]);

  // fresh code every time the popup opens or a reload is asked for
  useEffect(() => {
    if (!open) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadCaptcha();
  }, [open, reloadKey, loadCaptcha]);

  // fade/scale in + lock page scroll while open
  useEffect(() => {
    if (!open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(false);
      return;
    }
    const raf = requestAnimationFrame(() => setVisible(true));
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  if (!open || typeof document === "undefined") return null;

  const answer = digits.join("");
  const complete = answer.length === LENGTH;

  const submit = () => {
    if (!complete || isSubmitting || loading || !token) return;
    onSubmit(token, answer);
  };

  const fillFrom = (start: number, value: string) => {
    const chars = value.replace(/\D/g, "").slice(0, LENGTH - start).split("");
    if (!chars.length) return;
    setDigits((prev) => {
      const next = [...prev];
      chars.forEach((c, k) => (next[start + k] = c));
      return next;
    });
    focusBox(start + chars.length);
  };

  const handleChange = (i: number, value: string) => {
    let clean = value.replace(/\D/g, "");
    if (!clean) {
      setDigits((prev) => prev.map((d, k) => (k === i ? "" : d)));
      return;
    }
    // typing over a filled box -> keep only the new digit
    if (digits[i] && clean.length === 2 && clean[0] === digits[i]) clean = clean[1];
    fillFrom(i, clean);
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      e.preventDefault();
      setDigits((prev) => prev.map((d, k) => (k === i - 1 ? "" : d)));
      focusBox(i - 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      focusBox(i - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      focusBox(i + 1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      submit();
    }
  };

  const close = () => {
    if (!isSubmitting) onClose();
  };

  return createPortal(
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="captcha-popup-title"
        aria-describedby="captcha-popup-desc"
        className={`relative w-full max-w-[400px] overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all duration-200 ${
          visible ? "translate-y-0 scale-100" : "translate-y-3 scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "Escape") close();
        }}
      >
        {/* Header */}
        <div className="relative bg-secondary px-6 pb-6 pt-7 text-white">
          <button
            type="button"
            onClick={close}
            disabled={isSubmitting}
            aria-label="Close"
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-xl leading-none text-white/80 transition-colors hover:bg-white/15 hover:text-white disabled:opacity-50"
          >
            &times;
          </button>
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25">
              <ShieldIcon />
            </span>
            <div>
              <h3 id="captcha-popup-title" className="text-lg font-semibold leading-tight">
                Security check
              </h3>
              <p id="captcha-popup-desc" className="mt-0.5 text-sm text-white/80">
                One quick step to confirm you&apos;re human
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 pb-6 pt-5">
          <p className="mb-3 text-sm text-gray-600">Type the 5 digits you see below</p>

          <div className="flex items-center justify-between gap-3 rounded-xl border border-secondary/20 bg-[#FAF6F4] px-3 py-2">
            <div className="flex h-[56px] flex-1 items-center justify-center">
              {image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={image}
                  alt="Security code"
                  width={172}
                  height={56}
                  draggable={false}
                  className={`pointer-events-none h-[56px] w-[172px] select-none transition-opacity ${
                    loading ? "opacity-25" : "opacity-100"
                  }`}
                />
              ) : (
                <span className="h-[56px] w-[172px] animate-pulse rounded-md bg-secondary/10" />
              )}
            </div>
            <button
              type="button"
              onClick={loadCaptcha}
              disabled={loading || isSubmitting}
              aria-label="Load a new code"
              title="New code"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-secondary/25 bg-white text-secondary shadow-sm transition-colors hover:bg-secondary hover:text-white disabled:opacity-50"
            >
              <RefreshIcon spinning={loading} />
            </button>
          </div>

          <div className="mt-5 grid grid-cols-5 gap-2.5" role="group" aria-label="Security code">
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputs.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                autoComplete={i === 0 ? "one-time-code" : "off"}
                maxLength={LENGTH}
                value={d}
                aria-label={`Digit ${i + 1}`}
                disabled={isSubmitting}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={(e) => {
                  e.preventDefault();
                  fillFrom(i, e.clipboardData.getData("text"));
                }}
                onFocus={(e) => e.target.select()}
                className={`h-14 w-full rounded-lg border-2 bg-white text-center text-2xl font-semibold text-gray-900 outline-none transition-all focus:border-secondary focus:ring-4 focus:ring-secondary/15 disabled:opacity-60 ${
                  error ? "border-red-300" : d ? "border-secondary/60" : "border-gray-200"
                }`}
              />
            ))}
          </div>

          {error && !isSubmitting && (
            <p role="alert" className="mt-3 flex items-center gap-1.5 text-sm text-red-600">
              <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-2h2v2Zm0-4h-2V7h2v6Z" />
              </svg>
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={submit}
            disabled={!complete || isSubmitting || loading}
            className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-secondary font-medium text-white shadow-md transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
          >
            {isSubmitting ? (
              <>
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Submitting...
              </>
            ) : (
              <>
                <LockIcon size={16} />
                Verify &amp; Submit
              </>
            )}
          </button>

          <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-gray-500">
            <LockIcon size={12} />
            Your details are secure and never shared.
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CaptchaPopup;
