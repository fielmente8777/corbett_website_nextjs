"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { useWebContext } from "@/context-api/WebContext";
import { navData } from "./navData";
export default function MobileNav() {
 const { setIsMobileNavOpen, isMobileNavOpen } = useWebContext();
 const dialog = useRef<HTMLDialogElement>(null);
 useEffect(() => { const element = dialog.current; if (!element) return; if (isMobileNavOpen && !element.open) element.showModal(); else if (!isMobileNavOpen && element.open) element.close(); }, [isMobileNavOpen]);
 return <dialog ref={dialog} className="mobile-nav-panel" aria-label="Main navigation" onCancel={() => setIsMobileNavOpen(false)} onClose={() => setIsMobileNavOpen(false)} onClick={event => { if (event.target === event.currentTarget) setIsMobileNavOpen(false); }}>
 <div className="flex items-center justify-between"><p className="font-primary text-xl">Corbett The Grand</p><button onClick={() => setIsMobileNavOpen(false)} aria-label="Close navigation" className="p-3 text-2xl">×</button></div>
 <nav><ul className="flex flex-col gap-2 mt-8">{[...navData.links, { label: "Travel and wedding articles", href: "/blogs" }, { label: "Current stay packages", href: "/offers" }, { label: "How to reach us", href: "/how-to-reach" }].map(item => <li key={item.href}><Link className="block py-3 border-b border-stone-200 text-lg" href={item.href} onClick={() => setIsMobileNavOpen(false)}>{item.label}</Link></li>)}</ul></nav></dialog>;
}
