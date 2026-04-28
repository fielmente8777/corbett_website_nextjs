import SlidingTitle from "@/components/slider/SlidingTitle";
import { weddingPageData } from "./components/pageData";
import Curated from "./components/Curated";
import Faq from "./components/Faq";
import VideoBanner from "@/components/Banner/VideoBanner";
import Intro from "./components/Intro";
import Venue from "./components/Venue";

function WeddingsPage() {
  return (
    <main>
      <VideoBanner {...weddingPageData.banner} />
      <Intro {...weddingPageData.introData} />
      <SlidingTitle items={weddingPageData.highlightData.items} />
      <Venue {...weddingPageData.venueData} />
      <Curated {...weddingPageData.curatedData} />
      <Faq {...weddingPageData.faqData} />
    </main>
  );
}

export default WeddingsPage;
