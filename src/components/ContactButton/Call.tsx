"use client";
import { usePathname } from "next/navigation";
import { FaPhoneAlt } from "react-icons/fa";
import { telephoneLink, intentForPath } from "@/lib/contact-links";
export default function Call() { const path = usePathname(); if (path.replace(/\/$/, "") === "/thank-you") return null; return <a href={telephoneLink(intentForPath(path))} aria-label="Call the Corbett The Grand team" className="fixed bottom-8 left-4 z-40 w-12 h-12 rounded-full flex items-center justify-center bg-secondary text-white shadow-lg"><FaPhoneAlt size={22} aria-hidden="true" /></a>; }
