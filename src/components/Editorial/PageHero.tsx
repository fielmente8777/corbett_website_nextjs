import Image from "next/image";
import Link from "next/link";
import { breadcrumbSchema, jsonLd } from "@/lib/seo";

export default function PageHero({ title, summary, image, eyebrow = "Corbett The Grand · Ramnagar", breadcrumbs = [], cta }: { title: string; summary: string; image: string; eyebrow?: string; breadcrumbs?: { label: string; href: string }[]; cta?: { href: string; label: string } }) {
  const items = [{ label: "Home", href: "/" }, ...breadcrumbs];
  return <section className="editorial-hero"><div className="max_width">
    {breadcrumbs.length ? <><nav aria-label="Breadcrumb" className="breadcrumbs">{items.map((item, index) => <span key={item.href}>{index ? <span aria-hidden="true" className="mx-2">/</span> : null}{index === items.length - 1 ? <span aria-current="page">{item.label}</span> : <Link href={item.href}>{item.label}</Link>}</span>)}</nav><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema(items)) }} /></> : null}
    <div className="editorial-hero-grid"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="editorial-summary">{summary}</p>{cta ? <Link className="site-button mt-7" href={cta.href}>{cta.label}<span aria-hidden="true">↗</span></Link> : null}</div><div className="editorial-hero-image"><Image src={image} alt={title + " at Corbett The Grand"} fill sizes="(max-width: 767px) 100vw, 50vw" priority className="object-cover" /></div></div>
  </div></section>;
}
