import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("About Corbett The Grand | Resort in Ramnagar", "Learn about Corbett The Grand in Ramnagar, its hospitality approach and resort setting. Explore accommodation, wedding spaces and experiences for your visit.", "/about-us");
import { aboutPageData } from "./components/pageData";
import Experience from "./components/Experience";
import SlidingTitle from "@/components/slider/SlidingTitle";
import Banner from "./components/Banner";

function AboutPage() {
  return (
    <main id="main-content">
      <Banner {...aboutPageData.bannerData} />
      <SlidingTitle items={aboutPageData.highlightData.items} />
      <Experience {...aboutPageData.experienceData} />
    </main>
  );
}

export default AboutPage;
