import { CtaBtn } from "@/components/buttons/CtaBtn";
import { Section } from "@/components/sectionComponants";
import Image from "next/image";

interface WeddingProps {
  link: {
    label: string;
    href: string;
  };
  images: string[];
}

const Wedding: React.FC<WeddingProps> = ({ link, images }) => {
  return (
    <Section className="px-4">
      <div className="overflow-hidden relative rounded-4xl aspect-[4/1.9]">
        <Image
          src={images[1]}
          alt="Wedding"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 z-10 bg-[#514942]/50 backdrop-blur-[2px]" />
        <div className="absolute inset-2 z-20 border-2 border-white rounded-3xl overflow-hidden">
          <div className="w-full h-full relative aspect-auto">
            <Image
              src={images[0]}
              alt="Wedding"
              fill
              className="object-cover object-bottom"
              sizes="100vw"
            />
            <CtaBtn
              type="link"
              href={link.href}
              label={link.label}
              icon="arrow"
              iconClass="bg-transparent! text-white"
              className="absolute bottom-56 left-1/2 -translate-x-1/2 text-white rounded-lg"
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Wedding;
