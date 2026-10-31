import Link from "next/link";
import { enquiryLink, type EnquiryIntent } from "@/lib/contact-links";
import type { ContentSection, ServicePage } from "@/data/service-pages";
import PageHero from "./PageHero";
import LinkCards from "./LinkCards";
import EnquiryForm from "../Enquiry/EnquiryForm";

export function ContentSections({ sections }: { sections: ContentSection[] }) {
  return <div className="editorial-prose">{sections.map(section => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs?.map((text, index) => <p key={index}>{text}</p>)}{section.items ? <ul>{section.items.map(item => <li key={item}>{item}</li>)}</ul> : null}{section.table ? <div className="comparison-scroll"><table><thead><tr>{section.table.columns.map(column => <th key={column} scope="col">{column}</th>)}</tr></thead><tbody>{section.table.rows.map((row, index) => <tr key={index}>{row.map((cell, i) => i === 0 ? <th key={i} scope="row">{cell}</th> : <td key={i}>{cell}</td>)}</tr>)}</tbody></table></div> : null}</section>)}</div>;
}

export function EnquirySection({ intent = "stay", room = "" }: { intent?: EnquiryIntent; room?: string }) {
  const heading = intent === "wedding" ? "Let us help you plan your celebration" : intent === "corporate" ? "Bring your team to Corbett" : "Make time for your Corbett stay";
  return <section className="enquiry-band" id="enquire"><div className="max_width enquiry-grid"><div><p className="eyebrow">Start a conversation</p><h2 className="font-primary text-3xl md:text-4xl leading-tight">{heading}</h2><p className="text-light leading-8 mt-5">Share your preferred dates and the arrangements you have in mind. Our team will help with availability and a proposal for your visit.</p><Link href="/how-to-reach" className="text-link mt-5 inline-block">Find us in Ramnagar ↗</Link></div><EnquiryForm initialIntent={intent} room={room} /></div></section>;
}

export default function ContentPage({ page }: { page: ServicePage }) {
  const ancestors = page.path.startsWith("/weddings/") ? [{ label: "Weddings", href: "/weddings" }] : page.path.startsWith("/explore-corbett/") ? [{ label: "Explore Corbett", href: "/explore-corbett" }] : [];
  return <main id="main-content"><PageHero title={page.title} summary={page.description} image={page.image} breadcrumbs={[...ancestors, { label: page.title, href: page.path }]} cta={{ href: enquiryLink(page.intent), label: page.intent === "wedding" ? "Request a wedding proposal" : page.intent === "corporate" ? "Plan your offsite" : "Enquire about your stay" }} /><ContentSections sections={page.sections} />
    {page.faqs ? <section className="editorial-section"><div className="max_width"><div className="faq-column"><h2 className="font-primary text-3xl mb-6">Your questions answered</h2>{page.faqs.map(faq => <details key={faq.question} className="guest-faq"><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></div></section> : null}
    <LinkCards title="Plan the next detail" cards={page.related} /><EnquirySection intent={page.intent} /></main>;
}
