import { SectionWithContainer } from "@/components/sectionComponants";
import { policyPageData } from "./components/pageData";
import TextBanner from "@/components/Banner/TextBanner";

interface Params {
  params: {
    sug: string;
  };
}

export async function generateStaticParams({ params }: Params) {
  const page = await policyPageData;

  return page.map((page) => ({
    title: page.title,
    description: page.content,
  }));
}

export async function generateMetadata({ params }: Params) {
  const path = await params;
  const page = await policyPageData.find((page) => page.slug === path.sug);

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: page?.metadata.metaTitle,
    description: page?.metadata.description,
  };
}

export default async function page({ params }: Params) {
  const path = await params;
  const PageData = await policyPageData.find((page) => page.slug === path.sug);
  if (!PageData) {
    return <div>Page Not Found</div>;
  }
  return (
    <main>
      <TextBanner title={PageData.title} />
      <SectionWithContainer >
        <div
          className="content-class"
          dangerouslySetInnerHTML={{ __html: PageData.content }}
        ></div>
      </SectionWithContainer>
    </main>
  );
}
