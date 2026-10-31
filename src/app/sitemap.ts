import type { MetadataRoute } from "next";
import { canonicalOrigin } from "@/lib/contact-links";
import { servicePages } from "@/data/service-pages";
import { roomCatalog } from "@/data/rooms";
import { blogs } from "@/data/blogs";
export default function sitemap(): MetadataRoute.Sitemap {
 const paths = ["/", "/about-us", "/accommodation", "/weddings", "/gallery", "/contact", "/privacy-policy", "/terms-and-conditions", "/blogs", ...servicePages.map(page => page.path), ...roomCatalog.map(room => room.path), ...blogs.map(blog => "/blogs/" + blog.slug)];
 return [...new Set(paths)].map(path => ({ url: canonicalOrigin + path }));
}
