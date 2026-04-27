import Image from "next/image";
import { SectionWithContainer } from "@/components/sectionComponants";
import { SectionHeading } from "@/components/typography";
import { CtaBtn } from "@/components/buttons/CtaBtn";
import ContentSlider from "./slider/ContentSlider";

interface TestimonialSectionProps {
  title: string;
  testimonials: {
    name: string;
    location: string;
    text: string;
    image: string;
  }[];
  image: string;
}
const TestimonialSection: React.FC<TestimonialSectionProps> = ({
  title,
  image,
  testimonials,
}) => {
  return (
    <SectionWithContainer sectionClassName="relative">
      <div className="absolute lg:left-1/2 left-0 bg-background-1 lg:w-1/2 w-full z-[-2] inset-y-0 transform  border-l border-primary" />

      <div className="grid lg:grid-cols-2 grid-cols-1 items-center py-8">
        <div className="relative aspect-4/3 w-full md:w-[90%] lg:block hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover md:rounded-3xl rounded-2xl"
          />
        </div>
        <div className="flex flex-col lg:gap-4 gap-6 lg:p-6 lg:ml-10">
          <SectionHeading title={title} />
          <div className="relative aspect-4/3 w-full lg:hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover md:rounded-3xl rounded-2xl"
            />
          </div>
          {testimonials && <ContentSlider testimonials={testimonials} />}
        </div>
      </div>
      
    </SectionWithContainer>
  );
};

export default TestimonialSection;
