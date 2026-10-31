import LinkCards from "@/components/Editorial/LinkCards";
import { roomCatalog } from "@/data/rooms";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Rooms and Cottages in Jim Corbett | Corbett The Grand", "Compare rooms and cottages at Corbett The Grand, including private plunge pool options. Explore photographs and features, then enquire about your dates.", "/accommodation");
import { SectionWithContainer } from "@/components/sectionComponants";
import RoomsCard from "./components/cards/RoomsCard";
import { roomsPageData } from "./components/pageData";
import TextBanner from "@/components/Banner/TextBanner";

export default function AccommodationPage() {
  return (
    <main id="main-content">
      <TextBanner {...roomsPageData.bannerData} />
      <div className="max_width py-10"><p className="text-light leading-8 max-w-3xl mx-auto text-center">Choose a room with garden views, a cottage with a private sit-out, a pool-facing setting or a private plunge pool. Compare the categories and ask about the arrangement for your group.</p><div className="comparison-scroll"><table><thead><tr><th scope="col">Room category</th><th scope="col">Setting</th><th scope="col">Published arrangement</th></tr></thead><tbody>{roomCatalog.map(room => <tr key={room.slug}><th scope="row">{room.name}</th><td>{room.setting}</td><td>{room.details.join(" · ")}</td></tr>)}</tbody></table></div></div>
      <SectionWithContainer containerClassName="md:space-y-[40px] space-y-8">
        {roomsPageData.rooms.map((room, index) => (
          <RoomsCard key={index} {...room} index={index} />
        ))}
      </SectionWithContainer>
    <LinkCards title="Make the stay your own" cards={[{ title: "Family stays", description: "Plan room arrangements, meals and time together.", href: "/family-stays" }, { title: "Stay packages", description: "Discuss your dates, preferred room and meal plan.", href: "/offers" }, { title: "Resort facilities", description: "Explore the experiences available during your visit.", href: "/facilities" }]} /></main>
  );
}
