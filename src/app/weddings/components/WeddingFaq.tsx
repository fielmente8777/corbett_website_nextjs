import Accordion from "@/components/accordion/Accordion";
import { Section } from "@/components/sectionComponants";
import { SectionHeading } from "@/components/typography";
import AnimateOnScroll from "@/hooks/AnimateOnScroll";
import Image from "next/image";

interface WeddingFaqProps {
  title: string;
  src: string;
  items: {
    question: string;
    answer: string;
  }[];
}

const WeddingFaq: React.FC<WeddingFaqProps> = ({ title, src, items }) => {
  return (
    <Section className="bg-white py-20">
     
      <div className="grid md:grid-cols-2 grid-cols-1 items-start pl-10 max-md:pl-0 ">
        <div className="w-[684px] h-[852px] relative rounded-3xl overflow-hidden shrink-0">
          <Image src={src} alt={title} fill className="object-cover" />
        </div>
        <AnimateOnScroll direction="bottom">
          <div className="flex flex-col pr-6 gap-4 pt-32">

            <h2 className="font-primary text-3xl uppercase tracking-[0.15em] text-[var(--color-primary)] leading-snug">
              {title}
            </h2>
            <div className="flex flex-col">
            {items.map((item, index) => (
              <Accordion {...item} key={index} />
            ))}
            </div>

          </div>
        </AnimateOnScroll>

      </div>
    </Section>
  );
};

export default WeddingFaq;