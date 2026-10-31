import Image from "next/image";
import Link from "next/link";

export type LinkCard = { title: string; description: string; href: string; image?: string; label?: string };
export default function LinkCards({ title, intro, cards }: { title: string; intro?: string; cards: LinkCard[] }) {
  return <section className="editorial-section"><div className="max_width"><div className="section-intro"><p className="eyebrow">Make it your own</p><h2>{title}</h2>{intro ? <p>{intro}</p> : null}</div><div className="editorial-cards">{cards.map(card => <article key={card.href} className="editorial-card">{card.image ? <Link href={card.href} className="editorial-card-image" tabIndex={-1} aria-hidden="true"><Image src={card.image} alt="" fill sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw" className="object-cover" /></Link> : null}<div className="editorial-card-copy"><h3><Link href={card.href}>{card.title}</Link></h3><p>{card.description}</p><Link className="text-link" href={card.href}>{card.label || "Explore"}<span aria-hidden="true"> ↗</span></Link></div></article>)}</div></div></section>;
}
