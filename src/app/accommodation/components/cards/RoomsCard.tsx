"use client";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "swiper/modules";
import { RoomsTypesProps } from "@/@types/@types";
import SwiperCarousel from "@/components/slider/SwiperCarousel";
import { enquiryLink } from "@/lib/contact-links";
export default function RoomsCard({ images, name, description, amenities, index, details }: RoomsTypesProps["rooms"][0] & { index: number }) {
 const slug = name.toLowerCase().replace(/\s+/g, "-");
 return <div id={slug} className="grid md:grid-cols-8 grid-cols-1 gap-6 items-center scroll-mt-8">
 <div className={"md:col-span-5 min-w-0 room-card " + (index % 2 ? "md:order-2" : "")}><SwiperCarousel data={images} slidesPerView={1} spaceBetween={16} modules={[Navigation]} navigation className="w-full" renderSlide={(src, photoIndex) => <div className="w-full relative aspect-4/3"><Image src={src} alt={name + " at Corbett The Grand, photograph " + ((photoIndex || 0) + 1)} fill sizes="(max-width: 767px) 100vw, 60vw" className="object-cover rounded-2xl" /></div>} /></div>
 <div className={"md:col-span-3 p-6 border border-secondary rounded-3xl bg-background flex flex-col gap-5 " + (index % 2 ? "md:order-1" : "")}><h2 className="text-2xl md:text-3xl font-primary"><Link href={"/accommodation/" + slug}>{name}</Link></h2><p className="text-light text-sm">{details.join(" · ")}</p><p className="text-light leading-7">{description}</p><ul className="grid grid-cols-2 gap-3 text-sm">{amenities.map(amenity => <li key={amenity.name}>{amenity.name}</li>)}</ul><Link href={"/accommodation/" + slug} className="site-button">Explore this room ↗</Link><Link href={enquiryLink("stay", name)} className="text-link">Ask about availability ↗</Link></div></div>;
}
