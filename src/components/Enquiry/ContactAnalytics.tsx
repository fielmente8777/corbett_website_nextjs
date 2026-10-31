"use client";
import { useEffect } from "react";
import { intentForPath } from "@/lib/contact-links";

export default function ContactAnalytics() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const element = event.target instanceof Element ? event.target.closest("a") : null;
      const href = element?.getAttribute("href") || "";
      const name = href.startsWith("tel:") ? "click_call" : href.startsWith("https://wa.me/") ? "click_whatsapp" : null;
      if (!name) return;
      const view = window as Window & { dataLayer?: Record<string, unknown>[] };
      view.dataLayer = view.dataLayer || [];
      view.dataLayer.push({ event: name, enquiry_type: intentForPath(window.location.pathname), page_path: window.location.pathname });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
