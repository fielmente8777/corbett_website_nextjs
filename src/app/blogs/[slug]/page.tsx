import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogs, findBlog, categoryForBlog, categoryPath, relatedBlogs, blogWordCount, articleDate, type BlogBlock } from "@/data/blogs";
import { pageMetadata, jsonLd, breadcrumbSchema } from "@/lib/seo";
import { canonicalOrigin } from "@/lib/contact-links";
import LinkCards from "@/components/Editorial/LinkCards";
import { EnquirySection } from "@/components/Editorial/ContentPage";
export const dynamicParams = false;
export function generateStaticParams() { return blogs.map(blog => ({ slug: blog.slug })); }
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) { const { slug } = await params; const blog = findBlog(slug); if (!blog) notFound(); const base = pageMetadata(blog.seoTitle, blog.description, "/blogs/" + blog.slug, blog.image); return { ...base, openGraph: { ...base.openGraph, type: "article", publishedTime: blog.date, section: blog.category } }; }
function inline(text: string) {
 return text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, index) => {
  const found = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
  if (!found) return part;
  if (found[2].startsWith("/") && !found[2].startsWith("//")) return <Link key={index} href={found[2]}>{found[1]}</Link>;
  if (found[2].startsWith("https://")) return <a key={index} href={found[2]} target="_blank" rel="noopener noreferrer">{found[1]}</a>;
  return found[1];
 });
}
function Block({ block, index }: { block: BlogBlock; index: number }) {
 if (block.kind === "heading") return <h2 id={"section-" + index}>{block.text}</h2>;
 if (block.kind === "list") return <ul>{block.items.map((item, itemIndex) => <li key={itemIndex}>{inline(item)}</li>)}</ul>;
 if (block.kind === "table") return <div className="comparison-scroll"><table><caption className="sr-only">{block.caption}</caption><thead><tr>{block.columns.map(column => <th key={column} scope="col">{column}</th>)}</tr></thead><tbody>{block.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{inline(cell)}</td>)}</tr>)}</tbody></table></div>;
 return <p>{inline(block.text)}</p>;
}
export default async function Article({ params }: Props) {
 const { slug } = await params; const blog = findBlog(slug); if (!blog) notFound();
 const path = "/blogs/" + blog.slug; const category = categoryForBlog(blog); const wordCount = blogWordCount(blog);
 const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Blogs", href: "/blogs" }, { label: category.label, href: categoryPath(category) }, { label: blog.title, href: path }];
 return <main id="main-content"><div className="max_width">
  <nav aria-label="Breadcrumb" className="breadcrumbs mt-6"><Link href="/">Home</Link><span aria-hidden="true"> / </span><Link href="/blogs">Blogs</Link><span aria-hidden="true"> / </span><Link href={categoryPath(category)}>{category.label}</Link><span aria-hidden="true"> / </span><span aria-current="page">{blog.title}</span></nav>
  <header className="article-header"><Link className="eyebrow" href={categoryPath(category)}>{blog.category} guides</Link><h1>{blog.title}</h1><p className="text-light text-sm article-meta"><span>By <Link href="/about-us">Corbett The Grand</Link></span><time dateTime={blog.date}>{articleDate(blog.date)}</time><span>{Math.ceil(wordCount / 200)} min read</span></p></header>
  <div className="article-image"><Image src={blog.image} alt={blog.title} fill priority sizes="(max-width: 767px) 100vw, 1140px" className="object-cover" /></div></div>
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd([breadcrumbSchema(breadcrumbs), { "@context": "https://schema.org", "@type": "BlogPosting", headline: blog.title, description: blog.description, image: canonicalOrigin + blog.image, datePublished: blog.date, dateModified: blog.date, author: { "@type": "Organization", name: "Corbett The Grand", url: canonicalOrigin + "/about-us" }, publisher: { "@id": canonicalOrigin + "/#hotel" }, mainEntityOfPage: canonicalOrigin + path, articleSection: blog.category, wordCount, citation: blog.sources?.map(source => source.url) }]) }} />
  <article className="editorial-prose"><p className="blog-standfirst">{blog.description}</p>
   <nav className="article-contents" aria-label="In this guide"><p className="eyebrow">In this guide</p><ul>{blog.blocks.map((block, index) => block.kind === "heading" ? <li key={index}><a href={"#section-" + index}>{block.text}</a></li> : null)}</ul></nav>
   {blog.blocks.map((block, index) => <Block key={index} block={block} index={index} />)}
   {blog.sources?.length ? <section className="article-sources" aria-label="Sources and visitor updates"><h2>Sources and visitor updates</h2>{blog.sourceChecked ? <p>Visitor information checked on <time dateTime={blog.sourceChecked}>{articleDate(blog.sourceChecked)}</time>. Confirm current access, booking conditions and operating information through the relevant official source.</p> : null}<ul>{blog.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label}</a></li>)}</ul></section> : null}
   <p className="mt-8"><Link href={category.serviceHref}>{category.serviceLabel} at Corbett The Grand ↗</Link></p>
  </article>
  <LinkCards title="More to help you plan" cards={relatedBlogs(blog).map(item => ({ title: item.title, href: "/blogs/" + item.slug, description: item.description, image: item.image, label: "Read the guide" }))} />
  <div className="max_width blog-back-link"><Link className="text-link" href={categoryPath(category)}>Browse all {blog.category.toLowerCase()} guides ↗</Link><Link className="text-link" href="/blogs">Explore all {blogs.length} articles ↗</Link></div>
  <EnquirySection intent={blog.intent} /></main>;
}
