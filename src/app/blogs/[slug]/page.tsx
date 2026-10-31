import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogs, findBlog } from "@/data/blogs";
import { pageMetadata, jsonLd, breadcrumbSchema } from "@/lib/seo";
import { canonicalOrigin, type EnquiryIntent } from "@/lib/contact-links";
import LinkCards from "@/components/Editorial/LinkCards";
import { EnquirySection } from "@/components/Editorial/ContentPage";
export const dynamicParams = false;
export function generateStaticParams() { return blogs.map(blog => ({ slug: blog.slug })); }
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) { const { slug } = await params; const blog = findBlog(slug); if (!blog) notFound(); return pageMetadata(blog.seoTitle, blog.description, "/blogs/" + blog.slug, blog.image); }
function inline(text: string) {
 return text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, index) => {
  const found = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
  if (!found) return part;
  if (found[2].startsWith("/") && !found[2].startsWith("//")) return <Link key={index} href={found[2]}>{found[1]}</Link>;
  if (found[2].startsWith("https://")) return <a key={index} href={found[2]} target="_blank" rel="noopener noreferrer">{found[1]}</a>;
  return found[1];
 });
}
export default async function Article({ params }: Props) {
 const { slug } = await params; const blog = findBlog(slug); if (!blog) notFound();
 const path = "/blogs/" + blog.slug;
 const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Blogs", href: "/blogs" }, { label: blog.title, href: path }];
 return <main id="main-content"><div className="max_width"><nav aria-label="Breadcrumb" className="breadcrumbs mt-6"><Link href="/">Home</Link><span aria-hidden="true"> / </span><Link href="/blogs">Blogs</Link><span aria-hidden="true"> / </span><span aria-current="page">{blog.category}</span></nav><header className="article-header"><p className="eyebrow">{blog.category} · Corbett The Grand</p><h1>{blog.title}</h1><p className="text-light text-sm"><time dateTime={blog.date}>31 October 2026</time></p></header><div className="article-image"><Image src={blog.image} alt={blog.title} fill priority sizes="(max-width: 767px) 100vw, 1140px" className="object-cover" /></div></div>
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd([breadcrumbSchema(breadcrumbs), { "@context": "https://schema.org", "@type": "BlogPosting", headline: blog.title, description: blog.description, image: canonicalOrigin + blog.image, datePublished: blog.date, dateModified: blog.date, author: { "@type": "Organization", name: "Corbett The Grand", url: canonicalOrigin }, publisher: { "@id": canonicalOrigin + "/#hotel" }, mainEntityOfPage: canonicalOrigin + path }]) }} />
 <article className="editorial-prose">{blog.blocks.map((block, index) => block.kind === "heading" ? <h2 key={index}>{block.text}</h2> : <p key={index}>{inline(block.text)}</p>)}
 <p className="mt-8"><Link href={blog.intent === "wedding" ? "/weddings/packages" : blog.intent === "corporate" ? "/corporate-offsites" : "/accommodation"}>Explore {blog.intent === "wedding" ? "wedding packages and planning" : blog.intent === "corporate" ? "corporate offsites at the resort" : "rooms and cottages"} at Corbett The Grand ↗</Link></p></article>
 <LinkCards title="More to help you plan" cards={blogs.filter(item => item.slug !== slug).sort((a, b) => Number(b.category === blog.category) - Number(a.category === blog.category)).slice(0, 3).map(item => ({ title: item.title, href: "/blogs/" + item.slug, description: item.description, image: item.image }))} />
 <EnquirySection intent={blog.intent as EnquiryIntent} /></main>;
}
