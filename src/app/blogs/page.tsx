import { blogs } from "@/data/blogs";
import { pageMetadata } from "@/lib/seo";
import PageHero from "@/components/Editorial/PageHero";
import LinkCards from "@/components/Editorial/LinkCards";
export const metadata = pageMetadata("Jim Corbett Travel and Wedding Blog | Corbett The Grand", "Read practical wedding planning, family holiday and Corbett travel articles from Corbett The Grand. Plan your stay, celebration or corporate offsite.", "/blogs");
export default function BlogIndex() { return <main id="main-content"><PageHero title="Plan your time in Corbett" summary="Wedding planning, family breaks and ideas for a stay with time to enjoy it. Explore practical guides from Corbett The Grand." image="/home/bnr.png" breadcrumbs={[{ label: "Blogs", href: "/blogs" }]} /><LinkCards title="Stories and practical guides" intro="Find advice for weddings, family holidays, weekend visits and corporate offsites." cards={blogs.map(blog => ({ title: blog.title, description: blog.description, href: "/blogs/" + blog.slug, image: blog.image, label: "Read the " + blog.category.toLowerCase() + " guide" }))} /></main>; }
