import { SectionWithContainer } from "@/components/sectionComponants";
import { CuratedProps } from "./types";
import { SectionHeading } from "@/components/typography";
import Image from "next/image";

const Curated: React.FC<CuratedProps> = ({ title, description, images }) => {
  return (
    <SectionWithContainer sectionClassName="relative">
      <div className="absolute inset-0 bg-secondary -z-20" />
      <div className="grid lg:grid-cols-[1fr_1.31fr] grid-cols-1 gap-6">
        <div className="flex flex-col gap-6">
          <SectionHeading title={title} titleColor="white" />
          {description.map((item, index) => (
            <p className="text-white" key={index}>
              {item}
            </p>
          ))}
          <div className="w-full relative aspect-4/2.5 overflow-hidden rounded-3xl ">
            <Image
              src={images[0]}
              alt={title}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>
        <div className="relative w-full aspect-4/3 overflow-hidden rounded-3xl ">
          <Image
            src={images[1]}
            alt={title}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </div>
    </SectionWithContainer>
  );
};

export default Curated;
