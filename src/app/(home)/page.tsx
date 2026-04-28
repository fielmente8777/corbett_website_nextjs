import SlidingTitle from "@/components/slider/SlidingTitle";
import { homePageData } from "./components/pageData";
import Intro from "./components/Intro";
import Nearby from "./components/Nearby";
import TestimonialSection from "./components/TestimonialSection";
import Wedding from "./components/Wedding";
import BannerWithVideo from "@/components/Banner/BannerWithVideo";
import Experiences from "./components/Experiences";

function HomePage() {
  return (
    <main>
      <BannerWithVideo {...homePageData.bannerData} />
      <Intro {...homePageData.introData} />
      <SlidingTitle items={homePageData.highlightData.items} />
      <Experiences {...homePageData.experiencesData} />
      <Wedding {...homePageData.wedding} />
      <Nearby {...homePageData.nearbyData} />
      <TestimonialSection {...homePageData.testimonialData} />
    </main>
  );
}

export default HomePage;
