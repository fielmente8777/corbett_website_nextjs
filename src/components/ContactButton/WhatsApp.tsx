"use client";
import { usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";
import { intentForPath, whatsappLink } from "@/lib/contact-links";
export default function Whatsapp() { const path = usePathname(); if (path.replace(/\/$/, "") === "/thank-you") return null; return <a href={whatsappLink(intentForPath(path))} aria-label="Enquire on WhatsApp" target="_blank" rel="noopener noreferrer" className="fixed bottom-24 left-4 z-40 w-12 h-12 rounded-full flex items-center justify-center bg-green-700 text-white shadow-lg hover:bg-green-800"><FaWhatsapp size={28} aria-hidden="true" /></a>; }
