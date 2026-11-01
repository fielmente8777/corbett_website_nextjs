import { notFound } from "next/navigation";
import BlogArchive from "@/components/Editorial/BlogArchive";
import { blogPageCount, blogIndexPath } from "@/data/blogs";
import { pageMetadata } from "@/lib/seo";
export const dynamicParams = false;
export function generateStaticParams() { return Array.from({ length: blogPageCount - 1 }, (_, index) => ({ page: String(index + 2) })); }
type Props = { params: Promise<{ page: string }> };
function validPage(value: string) { const page = Number(value); return /^\d+$/.test(value) && String(page) === value && page >= 2 && page <= blogPageCount ? page : null; }
export async function generateMetadata({ params }: Props) { const { page: value } = await params; const page = validPage(value); if (!page) notFound(); return pageMetadata("Corbett Planning Guides: Page " + page + " | Corbett The Grand", "Continue browsing practical Corbett travel, wedding, safari, family stay and corporate offsite articles on page " + page + " of the guide collection.", blogIndexPath(page)); }
export default async function BlogIndexPage({ params }: Props) { const { page: value } = await params; const page = validPage(value); if (!page) notFound(); return <BlogArchive page={page} />; }
