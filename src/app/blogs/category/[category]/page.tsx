import { notFound } from "next/navigation";
import BlogArchive from "@/components/Editorial/BlogArchive";
import { blogCategories, findBlogCategory, categoryPath } from "@/data/blogs";
import { pageMetadata } from "@/lib/seo";
export const dynamicParams = false;
export function generateStaticParams() { return blogCategories.map(category => ({ category: category.slug })); }
type Props = { params: Promise<{ category: string }> };
export async function generateMetadata({ params }: Props) { const { category: slug } = await params; const category = findBlogCategory(slug); if (!category) notFound(); return pageMetadata(category.title + " | Corbett The Grand", category.description, categoryPath(category), category.image); }
export default async function CategoryPage({ params }: Props) { const { category: slug } = await params; const category = findBlogCategory(slug); if (!category) notFound(); return <BlogArchive category={category} />; }
