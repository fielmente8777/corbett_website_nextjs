import { notFound } from "next/navigation";
import { servicePages, findServicePage } from "@/data/service-pages";
import { pageMetadata } from "@/lib/seo";
import ContentPage from "@/components/Editorial/ContentPage";
export const dynamicParams = false;
export function generateStaticParams() { return servicePages.filter(page => page.path.startsWith("/explore-corbett/")).map(page => ({ slug: page.path.split("/").pop()! })); }
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) { const { slug } = await params; const page = findServicePage("/explore-corbett/" + slug); if (!page) notFound(); return pageMetadata(page.seoTitle, page.description, page.path, page.image); }
export default async function Page({ params }: Props) { const { slug } = await params; const page = findServicePage("/explore-corbett/" + slug); if (!page) notFound(); return <ContentPage page={page} />; }
