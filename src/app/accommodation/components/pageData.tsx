import { contacts } from "@/utils/constant";
import {
  Coffee,
  ElectronicSafe,
  MiniBar,
  PlungePool,
  Spa,
  Television,
} from "@/utils/roomAmenitiesIcon";
export const roomsPageData = {
  bannerData: {
    title: "Rooms & Cottages",
  },

  rooms: [
    {
      images: [
        "/superior/IMG-20251205-WA0161.webp",
        "/superior/IMG-20251205-WA0165.webp",
        "/superior/IMG-20251205-WA0185.webp",
        "/superior/IMG-20251205-WA0189.webp",
        "/superior/IMG-20251205-WA0223.webp",
      ],
      name: "Superior Rooms",
      details: ["2 Pax", "1 King Bed"],
      size: "480 sq. ft.",
      rating: "4.9",
      description:
        "Our Superior Rooms offer a refined blend of contemporary comfort and natural serenity, featuring spacious interiors with private balconies that overlook lush garden landscapes. Thoughtfully designed for relaxation and functionality, these 390 sq. ft. rooms provide a calm retreat—ideal for unwinding after a day of exploration or enjoying quiet moments immersed in nature’s tranquility.",
      amenities: [
        { name: "Tea/Coffee Maker", icon: <Coffee /> },
        { name: "Plunge Pool", icon: <PlungePool /> },
        { name: "Spa", icon: <Spa /> },
        { name: "Television", icon: <Television /> },
        { name: "Mini Bar", icon: <MiniBar /> },
        { name: "Electronic Safe", icon: <ElectronicSafe /> },
      ],
      cta: { label: "Book Now", href: contacts.WhatsAppCta },
    },
    {
      images: [
        "/classic/DSC_9214.webp",
        "/classic/DSC_9219.webp",
        "/classic/DSC_9221.webp",
        "/classic/DSC_9223.webp",
        "/classic/DSC_9228.webp",
        "/classic/DSC_9236.webp",
        "/classic/DSC_9244.webp",
        "/classic/DSC_9248.webp",
      ],
      name: "Classic Cottages",
      size: "480 sq. ft.",
      rating: "4.9",
      details: ["2 Pax", "1 King Bed"],
      description:
        "Our Classic Cottages offer a seamless blend of plush interiors and private open sit-outs overlooking serene garden views, creating an elegant indoor–outdoor experience. Thoughtfully designed for complete privacy, these cottages are nestled amid rustic surroundings and lush greenery—perfect for unwinding after a jungle safari or enjoying a romantic candlelight evening curated by our butlers",
      amenities: [
        { name: "Tea/Coffee Maker", icon: <Coffee /> },
        { name: "Plunge Pool", icon: <PlungePool /> },
        { name: "Spa", icon: <Spa /> },
        { name: "Television", icon: <Television /> },
        { name: "Mini Bar", icon: <MiniBar /> },
        { name: "Electronic Safe", icon: <ElectronicSafe /> },
      ],
      cta: { label: "Book Now", href: contacts.WhatsAppCta },
    },
    {
      images: [
        "/premium-cottages/Classic-Cottage.webp",
        "/premium-cottages/Classic-Cottage-2.webp",
        "/premium-cottages/Classic-Cottage-3.webp",
        "/premium-cottages/Classic-Cottage-4.webp",
      ],
      name: "Premium Cottages",
      size: "480 sq. ft.",
      rating: "4.9",
      details: ["2 Pax", "1 King Bed"],
      description:
        "Our Premium Cottages elevate the stay experience with expansive interiors and uninterrupted pool-facing views, creating a vibrant yet indulgent ambiance. Designed with sophisticated furnishings and refined detailing, these spacious retreats are ideal for guests seeking upscale comfort—whether lounging by the pool or enjoying relaxed evenings in a stylish, resort-inspired setting.",
      amenities: [
        { name: "Tea/Coffee Maker", icon: <Coffee /> },
        { name: "Plunge Pool", icon: <PlungePool /> },
        { name: "Spa", icon: <Spa /> },
        { name: "Television", icon: <Television /> },
        { name: "Mini Bar", icon: <MiniBar /> },
        { name: "Electronic Safe", icon: <ElectronicSafe /> },
      ],
      cta: { label: "Book Now", href: contacts.WhatsAppCta },
    },
    {
      images: ["/Plunge/pool.png", "/Plunge/Plunge.jpeg"],
      name: "Plunge Pool Cottages",
      size: "700 sq. ft.",
      details: ["2 Pax", "1 King Bed"],
      rating: "4.9",
      description:
        "Our Plunge Pool Cottages redefine luxury and seclusion, offering standalone accommodations with a private plunge pool and exclusive sun deck. Designed for intimate escapes, these 470 sq. ft. cottages combine spacious, high-end interiors with complete privacy—perfect for honeymooners and couples seeking a serene, personalized retreat immersed in nature.",
      amenities: [
        { name: "Tea/Coffee Maker", icon: <Coffee /> },
        { name: "Plunge Pool", icon: <PlungePool /> },
        { name: "Spa", icon: <Spa /> },
        { name: "Television", icon: <Television /> },
        { name: "Mini Bar", icon: <MiniBar /> },
        { name: "Electronic Safe", icon: <ElectronicSafe /> },
      ],
      cta: { label: "Book Now", href: contacts.WhatsAppCta },
    },
  ],
};
