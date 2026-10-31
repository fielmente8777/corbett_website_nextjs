import type { Metadata } from "next";
import { canonicalOrigin } from "./contact-links";

export function pageMetadata(title: string, description: string, path: string, image = "/home/bnr.png"): Metadata {
  const url = canonicalOrigin + (path === "/" ? "/" : path);
  return {
    title, description,
    alternates: { canonical: url },
    openGraph: { type: "website", title, description, url, siteName: "Corbett The Grand", locale: "en_IN", images: [{ url: canonicalOrigin + image, alt: title }] },
    twitter: { card: "summary_large_image", title, description, images: [canonicalOrigin + image] },
  };
}

export function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export const hotelSchema = {
  "@context": "https://schema.org", "@type": "Hotel", "@id": canonicalOrigin + "/#hotel",
  name: "Corbett The Grand", url: canonicalOrigin, image: canonicalOrigin + "/home/bnr.png",
  telephone: "+91-8958988800", email: "reservation@corbettthegrand.com",
  address: { "@type": "PostalAddress", streetAddress: "Village Santoshpur Choi, Near Hanuman Dham", addressLocality: "Ramnagar", addressRegion: "Uttarakhand", postalCode: "244715", addressCountry: "IN" },
  sameAs: ["https://www.facebook.com/corbettthegrand", "https://www.instagram.com/corbett.the.grand"],
};

export function breadcrumbSchema(items: { label: string; href: string }[]) {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.label, item: canonicalOrigin + item.href })) };
}
