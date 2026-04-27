import { NearbyProps } from "@/@types/@types";
import { Section } from "@/components/sectionComponants";
import { SectionHeading } from "@/components/typography";
import NearbySlider from "./slider/NearbySlider";

const Nearby: React.FC<NearbyProps> = ({ title, description, items }) => {
  return (
    <Section defaultPadding={false} className="md:space-y-16 space-y-10">
      <div className="space-y-2 md:pt-16 pt-10 max_width">
        <SectionHeading title={title} textCenter />
        <p className="text-light md:text-lg text-center">{description}</p>
      </div>
      <NearbySlider items={items} />
    </Section>
  );
};

export default Nearby;
