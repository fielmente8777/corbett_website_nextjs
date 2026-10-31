import type { MetadataRoute } from "next";
import { canonicalOrigin } from "@/lib/contact-links";
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/thank-you"] }, sitemap: canonicalOrigin + "/sitemap.xml", host: canonicalOrigin }; }
