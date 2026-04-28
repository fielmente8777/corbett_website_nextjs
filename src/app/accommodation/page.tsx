import { SectionWithContainer } from "@/components/sectionComponants";
import RoomsCard from "./components/cards/RoomsCard";
import { roomsPageData } from "./components/pageData";
import TextBanner from "@/components/Banner/TextBanner";

export default function AccommodationPage() {
  return (
    <main>
      <TextBanner {...roomsPageData.bannerData} />
      <SectionWithContainer containerClassName="md:space-y-[40px] space-y-8">
        {roomsPageData.rooms.map((room, index) => (
          <RoomsCard key={index} {...room} index={index} />
        ))}
      </SectionWithContainer>
    </main>
  );
}
