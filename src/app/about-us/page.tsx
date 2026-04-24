import { aboutPageData } from "./components/pageData";
import Experience from "./components/Experience";
import SlidingTitle from "@/components/slider/SlidingTitle";
import Banner from "./components/Banner";

function AboutPage() {
  return (
    <main>
      <Banner {...aboutPageData.bannerData} />
      <SlidingTitle items={aboutPageData.highlightData.items} />
      <Experience {...aboutPageData.experienceData} />
    </main>
  );
}

export default AboutPage;
