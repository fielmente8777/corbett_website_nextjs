import SlidingTitle from "@/components/slider/SlidingTitle";
import { homePageData } from "./components/pageData";
import Intro from "./components/Intro";
import Nearby from "./components/Nearby";

function HomePage() {
  return (
    <main>
      <Intro {...homePageData.introData} />
      <SlidingTitle items={homePageData.highlightData.items} />
      <Nearby {...homePageData.nearbyData} />
    </main>
  );
}

export default HomePage;
