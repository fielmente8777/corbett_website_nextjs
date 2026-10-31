import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { roomCatalog } from "@/data/rooms";
import { pageMetadata, jsonLd } from "@/lib/seo";
import { canonicalOrigin, enquiryLink } from "@/lib/contact-links";
import PageHero from "@/components/Editorial/PageHero";
import LinkCards from "@/components/Editorial/LinkCards";
import { EnquirySection } from "@/components/Editorial/ContentPage";
export const dynamicParams = false;
export function generateStaticParams() { return roomCatalog.map(room => ({ slug: room.slug })); }
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
 const { slug } = await params;
 const room = roomCatalog.find(item => item.slug === slug);
 if (!room) notFound();
 return pageMetadata(room.name + " in Jim Corbett | Corbett The Grand", room.summary, room.path, room.images[0]);
}
export default async function RoomPage({ params }: Props) {
 const { slug } = await params;
 const room = roomCatalog.find(item => item.slug === slug);
 if (!room) notFound();
 return <main id="main-content">
  <PageHero title={room.name} summary={room.summary} image={room.images[0]} eyebrow={room.setting} breadcrumbs={[{ label: "Rooms and cottages", href: "/accommodation" }, { label: room.name, href: room.path }]} cta={{ href: enquiryLink("stay", room.name), label: "Enquire about this room" }} />
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd({ "@context": "https://schema.org", "@type": "HotelRoom", name: room.name, url: canonicalOrigin + room.path, image: room.images.slice(0, 4).map(image => canonicalOrigin + image), description: room.summary, containedInPlace: { "@id": canonicalOrigin + "/#hotel" }, amenityFeature: room.amenities.map(name => ({ "@type": "LocationFeatureSpecification", name, value: true })) }) }} />
  <section className="editorial-section"><div className="max_width room-information"><div className="editorial-prose !m-0 !p-0"><h2>Your own space in Corbett</h2><p>{room.setting}. Choose your dates and discuss the room arrangement that suits your visit.</p><ul>{room.features.map(feature => <li key={feature}>{feature}</li>)}</ul><h2>Included room features</h2><ul className="amenity-list">{room.amenities.map(amenity => <li key={amenity}>{amenity}</li>)}</ul><p>Ask about children&apos;s accommodation, extra beds and the occupancy arrangement for your group before confirming. Meal plans, resort experiences and any additional services depend on your selected booking.</p></div><aside className="room-planning"><p className="eyebrow">Before your stay</p><h2 className="font-primary text-2xl">Plan the details</h2><p>Share your arrival and departure dates, number of guests and any room or dietary preferences.</p><Link href="/dining">Explore meal arrangements ↗</Link><Link href="/facilities">Resort facilities and experiences ↗</Link><Link href="/terms-and-conditions">Read the stay terms ↗</Link></aside></div></section>
  <section className="editorial-section"><div className="max_width"><h2 className="font-primary text-3xl mb-7">A closer look at your stay</h2><div className="room-photo-grid">{room.images.slice(1, 7).map((src, index) => <div key={src} className="room-photo"><Image src={src} alt={room.name + " at Corbett The Grand, photograph " + (index + 2)} fill sizes="(max-width: 767px) 100vw, 33vw" className="object-cover" /></div>)}</div></div></section>
  <LinkCards title="Explore the other rooms and cottages" cards={roomCatalog.filter(item => item.slug !== slug).map(item => ({ title: item.name, href: item.path, description: item.summary, image: item.images[0] }))} />
  <EnquirySection room={room.name} />
 </main>;
}
