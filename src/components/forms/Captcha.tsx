"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Self-hosted image captcha (see src/app/api/captcha). No outside service or account needed.

interface CaptchaProps {
  onChange: (token: string, answer: string) => void;
  variant?: "light" | "dark";
}

const CAPTCHA_URL = "/api/captcha";

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

const ShieldIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3Zm-1.2 14.2-3.5-3.5 1.4-1.4 2.1 2.1 4.9-4.9 1.4 1.4-6.3 6.3Z" />
  </svg>
);

const Captcha = ({ onChange, variant = "light" }: CaptchaProps) => {
  const [image, setImage] = useState("");
  const [token, setToken] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const loadCaptcha = useCallback(() => {
    setLoading(true);
    fetch(`${CAPTCHA_URL}?theme=${variant}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data: { token: string; image: string }) => {
        setImage(data.image);
        setToken(data.token);
        setAnswer("");
        onChangeRef.current(data.token, "");
      })
      .catch((err) => console.error("Captcha load error:", err))
      .finally(() => setLoading(false));
  }, [variant]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadCaptcha();
  }, [loadCaptcha]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 5);
    setAnswer(value);
    onChangeRef.current(token, value);
  };

  const codeImage = image ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={image}
      alt="Security code"
      width={160}
      height={52}
      draggable={false}
      className={`select-none pointer-events-none transition-opacity ${loading ? "opacity-30" : ""}`}
    />
  ) : (
    <span className="block w-[160px] h-[52px]" />
  );

  if (variant === "dark") {
    return (
      <div className="flex items-center gap-3">
        <span className="text-white max-md:hidden">
          <ShieldIcon />
        </span>
        <span className="text-sm text-[#9C9C9C] max-md:hidden">Security check</span>
        <div className="shrink-0 flex items-center rounded-md border border-white/15 bg-white/5">
          {codeImage}
          <button
            type="button"
            onClick={loadCaptcha}
            disabled={loading}
            aria-label="Load a new code"
            title="Load a new code"
            className="self-stretch px-2.5 border-l border-white/15 text-[#9C9C9C] hover:text-white transition-colors"
          >
            <RefreshIcon spinning={loading} />
          </button>
        </div>
        <input
          type="text"
          inputMode="numeric"
          autoComplete="off"
          maxLength={5}
          placeholder="Enter code*"
          aria-label="Enter the security code"
          value={answer}
          onChange={handleInput}
          className="outline-none flex-1 min-w-0 md:flex-none md:w-[130px] py-1.5 border-b border-white/25 focus:border-white bg-transparent text-base text-white tracking-[0.25em] placeholder:tracking-normal placeholder:text-[#9C9C9C] transition-colors"
        />
      </div>
    );
  }

  return (
    <div className="flex items-stretch border border-secondary rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-secondary">
      <div className="flex items-center bg-[#FAF6F4] border-r border-secondary/40">
        {codeImage}
      </div>
      <button
        type="button"
        onClick={loadCaptcha}
        disabled={loading}
        aria-label="Load a new code"
        title="Load a new code"
        className="px-3 border-r border-secondary/40 text-secondary hover:bg-[#FAF6F4] transition-colors"
      >
        <RefreshIcon spinning={loading} />
      </button>
      <input
        type="text"
        inputMode="numeric"
        autoComplete="off"
        maxLength={5}
        placeholder="Enter code*"
        aria-label="Enter the security code"
        value={answer}
        onChange={handleInput}
        className="flex-1 min-w-0 px-4 focus:outline-none text-p2 tracking-[0.25em] placeholder:tracking-normal placeholder:text-[#7F7F7F]"
      />
    </div>
  );
};

export default Captcha;
