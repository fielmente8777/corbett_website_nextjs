import LinkCards from "@/components/Editorial/LinkCards";
import { EnquirySection } from "@/components/Editorial/ContentPage";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Destination Wedding in Jim Corbett | Corbett The Grand", "Plan a destination wedding at Corbett The Grand in Ramnagar. Explore indoor and outdoor venues, guest accommodation and a proposal for your celebration.", "/weddings");
import SlidingTitle from "@/components/slider/SlidingTitle";
import { weddingPageData } from "./components/pageData";
import Curated from "./components/Curated";
import Faq from "./components/Faq";
import VideoBanner from "@/components/Banner/VideoBanner";
import Intro from "./components/Intro";
import Venue from "./components/Venue";

function WeddingsPage() {
  return (
    <main id="main-content">
      <VideoBanner {...weddingPageData.banner} />
      <div className="max_width py-12 text-center"><p className="eyebrow">Celebrate in Ramnagar</p><h1 className="font-primary text-3xl md:text-5xl mt-4">Destination weddings in Jim Corbett</h1><p className="text-light leading-8 mt-5 max-w-3xl mx-auto">Bring your family together at Corbett The Grand. Explore the settings, plan your guest stays and share your dates for a wedding proposal.</p></div>
      <Intro {...weddingPageData.introData} />
      <SlidingTitle items={weddingPageData.highlightData.items} />
      <Venue {...weddingPageData.venueData} />
      <Curated {...weddingPageData.curatedData} />
      <LinkCards title="Start planning your celebration" cards={[{ title: "Wedding venues", description: "Explore indoor and outdoor settings and discuss the layout for each function.", href: "/weddings/venues", image: "/wedding/img-1.jpg" }, { title: "Wedding packages", description: "Plan guest accommodation, meals and functions around your celebration.", href: "/weddings/packages", image: "/home/wedding.png" }, { title: "Wedding budget guide", description: "Prepare your rooming and function plan before comparing quotations.", href: "/blogs/destination-wedding-cost-jim-corbett", image: "/gallery/hall/20250319_063159000_iOS.jpg" }]} />
      <Faq {...weddingPageData.faqData} />
      <EnquirySection intent="wedding" />
    </main>
  );
}

export default WeddingsPage;
