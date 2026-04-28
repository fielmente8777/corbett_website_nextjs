import { SectionWithContainer } from "@/components/sectionComponants";
import { FaqProps } from "./types";
import Image from "next/image";
import { SectionHeading } from "@/components/typography";
import Accordion from "@/components/accordion/Accordion";

const Faq: React.FC<FaqProps> = ({ title, items, img }) => {
  return (
    <SectionWithContainer>
      <div className="grid lg:grid-cols-2 grid-cols-1 items-center gap-6 ">
        <div className="relative lg:block hidden w-full aspect-4/4.75 overflow-hidden rounded-3xl">
          <Image
            src={img}
            alt={title}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="flex flex-col gap-6">
          <SectionHeading title={title} />
          <div className="relative lg:hidden block w-full aspect-4/4.75 overflow-hidden rounded-3xl">
          <Image
            src={img}
            alt={title}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
          <div className="">
            {items.map((item, index) => (
              <Accordion key={index} {...item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </SectionWithContainer>
  );
};

export default Faq;
