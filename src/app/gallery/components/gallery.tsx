"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionWithContainer } from "@/components/sectionComponants";
type GalleryImage = { src: string; alt: string };
const destination = (category: string) => /hall|wedding/i.test(category) ? "/weddings/venues" : /room/i.test(category) ? "/accommodation" : "/facilities";
export default function Gallery({ galleryImages }: { galleryImages: GalleryImage[] }) {
 const [category, setCategory] = useState("All");
 const [limit, setLimit] = useState(18);
 const [photo, setPhoto] = useState<GalleryImage | null>(null);
 const dialog = useRef<HTMLDialogElement>(null);
 const categories = ["All", ...new Set(galleryImages.map(image => image.alt))];
 const filtered = category === "All" ? galleryImages : galleryImages.filter(image => image.alt === category);
 return <SectionWithContainer defaultPadding={false} sectionClassName="py-8">
 <p className="text-center text-light leading-7 max-w-2xl mx-auto">Explore the rooms, wedding settings and facilities at Corbett The Grand. Select a photograph for a closer look, or follow its link to plan your stay or celebration.</p>
 <div className="gallery-tabs" role="group" aria-label="Filter photographs">{categories.map(item => <button key={item} aria-pressed={category === item} className={category === item ? "active capitalize" : "capitalize"} onClick={() => { setCategory(item); setLimit(18); }}>{item}</button>)}</div>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">{filtered.slice(0, limit).map((image, index) => <figure key={image.src} className="bg-white border border-stone-200 rounded-2xl overflow-hidden"><button className="relative block w-full aspect-4/3" aria-label={"View " + image.alt + " photograph " + (index + 1)} onClick={() => { setPhoto(image); dialog.current?.showModal(); }}><Image src={image.src} alt={image.alt + " at Corbett The Grand, photograph " + (index + 1)} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw" className="object-cover" /></button><figcaption className="px-5 py-4 capitalize"><Link href={destination(image.alt)} className="text-link">{image.alt} at Corbett The Grand ↗</Link></figcaption></figure>)}</div>
 {limit < filtered.length ? <div className="text-center mt-8"><button className="site-button-outline" onClick={() => setLimit(value => value + 18)}>Show more photographs</button></div> : null}
 <dialog ref={dialog} className="photo-dialog" aria-label="Resort photograph" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}><button className="absolute right-4 top-2 p-3 text-2xl" aria-label="Close photograph" onClick={() => dialog.current?.close()}>×</button>{photo ? <><div className="photo-dialog-image"><Image src={photo.src} alt={photo.alt + " at Corbett The Grand"} fill sizes="90vw" className="object-contain" /></div><p className="text-center mt-3 capitalize">{photo.alt} at Corbett The Grand</p></> : null}</dialog>
 </SectionWithContainer>;
}
