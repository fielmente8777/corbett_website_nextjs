import { notFound } from "next/navigation";
import { SectionWithContainer } from "@/components/sectionComponants";
import { policyPageData } from "./components/pageData";
import TextBanner from "@/components/Banner/TextBanner";
import { findServicePage, servicePages } from "@/data/service-pages";
import ContentPage from "@/components/Editorial/ContentPage";
import { pageMetadata } from "@/lib/seo";
type Props = { params: Promise<{ sug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return [...policyPageData.map(page => ({ sug: page.slug })), ...servicePages.filter(page => page.path.split("/").length === 2).map(page => ({ sug: page.path.slice(1) }))]; }
export async function generateMetadata({ params }: Props) {
 const { sug } = await params;
 const page = findServicePage("/" + sug);
 if (page) return pageMetadata(page.seoTitle, page.description, page.path, page.image);
 const policy = policyPageData.find(page => page.slug === sug);
 if (!policy) notFound();
 return pageMetadata(policy.metadata.metaTitle, policy.metadata.description, "/" + sug);
}
export default async function Page({ params }: Props) {
 const { sug } = await params;
 const page = findServicePage("/" + sug);
 if (page) return <ContentPage page={page} />;
 const policy = policyPageData.find(page => page.slug === sug);
 if (!policy) notFound();
 return <main id="main-content"><TextBanner title={policy.title} /><SectionWithContainer><div className="content-class" dangerouslySetInnerHTML={{ __html: policy.content }} /></SectionWithContainer></main>;
}
