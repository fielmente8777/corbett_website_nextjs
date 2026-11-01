import Link from "next/link";
import PageHero from "./PageHero";
import LinkCards from "./LinkCards";
import { blogs, blogCategories, categoryPath, blogIndexPath, orderedBlogs, blogPageCount, BLOG_PAGE_SIZE, type BlogCategoryInfo } from "@/data/blogs";
import { canonicalOrigin } from "@/lib/contact-links";
import { jsonLd } from "@/lib/seo";

export default function BlogArchive({ page = 1, category }: { page?: number; category?: BlogCategoryInfo }) {
 const matching = category ? blogs.filter(blog => blog.category === category.label) : orderedBlogs;
 const shown = category ? matching : matching.slice((page - 1) * BLOG_PAGE_SIZE, page * BLOG_PAGE_SIZE);
 const path = category ? categoryPath(category) : blogIndexPath(page);
 const title = category?.title ?? (page === 1 ? "Plan your time in Corbett" : "Corbett planning guides: page " + page);
 const summary = category?.description ?? "Explore " + blogs.length + " practical guides to destination weddings, resort stays, safaris, local visits and corporate offsites in Jim Corbett.";
 const breadcrumbs = category ? [{ label: "Blogs", href: "/blogs" }, { label: category.label, href: path }] : page === 1 ? [{ label: "Blogs", href: "/blogs" }] : [{ label: "Blogs", href: "/blogs" }, { label: "Page " + page, href: path }];
 return <main id="main-content">
  <PageHero title={title} summary={summary} image={category?.image ?? "/home/bnr.png"} breadcrumbs={breadcrumbs} />
  <nav className="max_width blog-topic-nav" aria-label="Guide topics"><Link href="/blogs" aria-current={!category && page === 1 ? "page" : undefined}>All {blogs.length} guides</Link>{blogCategories.map(item => <Link key={item.slug} href={categoryPath(item)} aria-current={category?.slug === item.slug ? "page" : undefined}>{item.label}<span>{blogs.filter(blog => blog.category === item.label).length}</span></Link>)}</nav>
  {category ? <div className="max_width"><div className="blog-category-intro"><p>{category.intro}</p><Link className="text-link" href={category.serviceHref}>{category.serviceLabel} ↗</Link></div></div> : null}
  <LinkCards title={category ? matching.length + " guides for " + category.label.toLowerCase() : "Stories and practical guides"} intro={category ? "Choose the question you are working on next." : "Showing " + ((page - 1) * BLOG_PAGE_SIZE + 1) + "–" + Math.min(page * BLOG_PAGE_SIZE, matching.length) + " of " + matching.length + " articles. Browse a topic above or continue through the index."} cards={shown.map(blog => ({ title: blog.title, description: blog.description, href: "/blogs/" + blog.slug, image: blog.image, label: "Read the guide" }))} />
  {!category ? <nav className="max_width blog-pagination" aria-label="Article index pages">{page > 1 ? <Link rel="prev" href={blogIndexPath(page - 1)}>← Previous</Link> : null}{Array.from({ length: blogPageCount }, (_, index) => index + 1).map(number => number === page ? <span key={number} aria-current="page" aria-label={"Page " + number}>{number}</span> : <Link key={number} href={blogIndexPath(number)} aria-label={"Page " + number}>{number}</Link>)}{page < blogPageCount ? <Link rel="next" href={blogIndexPath(page + 1)}>Next →</Link> : null}</nav> : null}
  {!category && page === 1 ? <LinkCards title="Find your next planning guide" intro="Browse the complete collection by the kind of trip or celebration you have in mind." cards={blogCategories.map(item => ({ title: item.label, description: item.description, href: categoryPath(item), image: item.image, label: "Browse " + blogs.filter(blog => blog.category === item.label).length + " guides" }))} /> : null}
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd({ "@context": "https://schema.org", "@type": "CollectionPage", name: title, url: canonicalOrigin + path, description: summary, mainEntity: { "@type": "ItemList", numberOfItems: shown.length, itemListElement: shown.map((blog, index) => ({ "@type": "ListItem", position: category ? index + 1 : (page - 1) * BLOG_PAGE_SIZE + index + 1, item: { "@type": "BlogPosting", headline: blog.title, url: canonicalOrigin + "/blogs/" + blog.slug } })) } }) }} />
 </main>;
}
