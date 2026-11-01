import Link from "next/link";
import LinkCards from "@/components/Editorial/LinkCards";
import { blogs } from "@/data/blogs";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Resort in Jim Corbett, Ramnagar | Corbett The Grand", "Discover Corbett The Grand in Ramnagar, with rooms and cottages, resort experiences and destination wedding venues. Enquire about your stay or celebration.", "/");
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
    <main id="main-content">
      <BannerWithVideo {...homePageData.bannerData} />
      <Intro {...homePageData.introData} />
      <SlidingTitle items={homePageData.highlightData.items} />
      <LinkCards title="A stay for every occasion" intro="Choose a cottage for a quiet break, bring your family together or plan an event in Ramnagar." cards={[{ title: "Rooms and cottages", description: "Compare garden settings, pool-facing cottages and private plunge pool options.", href: "/accommodation", image: "/superior-rooms/IMG_8024-1.webp" }, { title: "Destination weddings", description: "Plan your guest stays and celebrations in one resort.", href: "/weddings", image: "/home/wedding.png" }, { title: "Corporate offsites", description: "Bring the team together for focused sessions and time outside the meeting room.", href: "/corporate-offsites", image: "/home/resort-exp/conference-hall-1.png" }]} />
      <Experiences {...{ ...homePageData.experiencesData, items: homePageData.experiencesData.items.filter(item => ["Swimming Pool", "SPA", "Outdoor Kids Zone"].includes(item.title)), link: { label: "Explore all facilities", href: "/facilities" } }} />
      <Wedding {...homePageData.wedding} />
      <Nearby {...homePageData.nearbyData} />
      <TestimonialSection {...homePageData.testimonialData} />
      <LinkCards title="Plan a little more of your Corbett stay" cards={blogs.slice(0, 3).map(blog => ({ title: blog.title, description: blog.description, href: "/blogs/" + blog.slug, image: blog.image, label: "Read the guide" }))} />
      <div className="max_width blog-back-link"><Link href="/blogs" className="site-button-outline">Explore all {blogs.length} Corbett guides ↗</Link></div>
    </main>
  );
}

export default HomePage;
