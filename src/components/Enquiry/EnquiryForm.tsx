"use client";
import { Suspense, useId, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { cleanSourceUrl, telephoneLink, whatsappLink, type EnquiryIntent } from "@/lib/contact-links";

type FormProps = { initialIntent?: EnquiryIntent; room?: string; title?: string };
export default function EnquiryForm(props: FormProps) {
  return <Suspense fallback={<div className="enquiry-form" aria-busy="true">Loading enquiry form…</div>}><QueryEnquiryForm {...props} /></Suspense>;
}
function QueryEnquiryForm({ initialIntent = "stay", room = "", title }: FormProps) {
  const query = useSearchParams();
  const value = query.get("intent");
  const intent = value && ["stay", "wedding", "corporate", "general"].includes(value) ? value as EnquiryIntent : initialIntent;
  const preference = query.get("room")?.slice(0, 100) || room;
  return <EnquiryFields key={intent + ":" + preference} initialIntent={intent} room={preference} title={title} />;
}
function EnquiryFields({ initialIntent = "stay", room = "", title = "Tell us what you have in mind" }: FormProps) {
  const id = useId();
  const [intent, setIntent] = useState<EnquiryIntent>(initialIntent);
  const [selectedRoom, setSelectedRoom] = useState(room);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");


  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const fields = Object.fromEntries(new FormData(form).entries());
    setStatus("sending"); setError("");
    try {
      const response = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...fields, intent, room: selectedRoom, sourceUrl: cleanSourceUrl(window.location.href) }) });
      const result = await response.json();
      if (!response.ok || result.success !== true) throw new Error(result.error || "We could not send your enquiry. Please try again.");
      const view = window as Window & { dataLayer?: Record<string, unknown>[] };
      view.dataLayer = view.dataLayer || [];
      view.dataLayer.push({ event: "generate_lead", enquiry_type: intent, page_path: window.location.pathname });
      setStatus("success");
      form.reset();
    } catch (problem) {
      setError(problem instanceof Error ? problem.message : "Please try again or call our team.");
      setStatus("error");
    }
  }

  if (status === "success") return <div className="enquiry-form" role="status"><h2 className="font-primary text-3xl">Thank you for your enquiry</h2><p className="mt-4 leading-7">Our team will review your requirements and contact you using the details you provided.</p><button className="site-button mt-6" onClick={() => setStatus("idle")}>Send another enquiry</button></div>;
  return <form className="enquiry-form" onSubmit={submit} aria-labelledby={id + "-title"}>
    <h2 id={id + "-title"} className="font-primary text-2xl md:text-3xl">{title}</h2>
    <p className="text-light text-sm leading-6 mt-3 mb-6">Share your dates and requirements. Our team will help you plan the details.</p>
    <div className="enquiry-fields">
      <label className="field-wide" htmlFor={id + "-intent"}>I am planning<select id={id + "-intent"} name="intent" value={intent} onChange={event => setIntent(event.target.value as EnquiryIntent)}><option value="stay">A resort stay</option><option value="wedding">A wedding or celebration</option><option value="corporate">A corporate offsite</option><option value="general">A general enquiry</option></select></label>
      <label className="field-wide" htmlFor={id + "-name"}>Full name <span aria-hidden="true">*</span><input id={id + "-name"} name="name" autoComplete="name" required minLength={2} maxLength={100} /></label>
      <label htmlFor={id + "-code"}>Country code <span aria-hidden="true">*</span><input id={id + "-code"} name="countryCode" type="tel" defaultValue="+91" required pattern="\+[0-9]{1,4}" autoComplete="tel-country-code" /></label>
      <label htmlFor={id + "-phone"}>Phone number <span aria-hidden="true">*</span><input id={id + "-phone"} name="phone" type="tel" required inputMode="tel" autoComplete="tel-national" pattern="[0-9 \(\)\-]{7,20}" maxLength={20} /></label>
      <label className="field-wide" htmlFor={id + "-email"}>Email address <span className="field-optional">optional</span><input id={id + "-email"} name="email" type="email" autoComplete="email" maxLength={200} /></label>
      <label htmlFor={id + "-date"}>{intent === "stay" ? "Arrival date" : "Preferred event date"}<input id={id + "-date"} name="date" type="date" /></label>
      {intent === "stay" ? <label htmlFor={id + "-departure"}>Departure date<input id={id + "-departure"} name="departure" type="date" /></label> : <label htmlFor={id + "-rooms"}>Rooms required<input id={id + "-rooms"} name="rooms" type="number" min="1" max="99999" /></label>}
      <label htmlFor={id + "-guests"}>Approximate guests<input id={id + "-guests"} name="guests" type="number" min="1" max="99999" /></label>
      <label htmlFor={id + "-room"}>Room preference<input id={id + "-room"} name="room" value={selectedRoom} onChange={event => setSelectedRoom(event.target.value)} maxLength={100} placeholder="If you have a preference" /></label>
      <label className="field-wide" htmlFor={id + "-message"}>Anything else we should know?<textarea id={id + "-message"} name="message" rows={3} maxLength={2500} placeholder={intent === "wedding" ? "Functions, overnight guests and any date flexibility" : intent === "corporate" ? "Meeting setup, programme and group requirements" : "Children's ages, meal preferences or special requests"} /></label>
      <div className="enquiry-honeypot" aria-hidden="true"><label htmlFor={id + "-website"}>Leave blank<input id={id + "-website"} name="website" tabIndex={-1} autoComplete="off" /></label></div>
    </div>
    {error ? <p role="alert" className="text-red-800 mt-4">{error}</p> : null}
    <p className="text-xs leading-5 text-light mt-5">By sending this enquiry, you agree to be contacted about your request. Read our <Link href="/privacy-policy" className="underline">privacy policy</Link>.</p>
    <button className="site-button w-full mt-5" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending your enquiry…" : "Send enquiry"}</button>
    <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4 text-sm"><a href={telephoneLink(intent)} className="text-secondary underline">Call our team</a><a href={whatsappLink(intent)} target="_blank" rel="noopener noreferrer" className="text-secondary underline">Enquire on WhatsApp</a></div>
  </form>;
}
