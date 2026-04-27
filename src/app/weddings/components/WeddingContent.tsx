import Image from "next/image";
import { Section } from "@/components/sectionComponants";

interface WeddingContentProps {
  title: string;
  description: string[];
  images: string[];
}

const WeddingContent: React.FC<WeddingContentProps> = ({ title, description, images }) => {
  return (
    <Section className="bg-[var(--color-secondary)] py-16">

      {/* Floral decorations */}
      <div className="absolute top-0 left-6 w-24 h-24 opacity-60">
        <Image src="/decorations/floral-left.png" alt="" fill className="object-contain" />
      </div>
      <div className="absolute top-0 right-6 w-28 h-28 opacity-60">
        <Image src="" alt="" fill className="object-contain" />
      </div>
     <div className="max-width">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6 items-end">

        {/* LEFT — Title + Description + Small Image */}
        <div className="flex flex-col gap-6">
          <h2 className="font-primary text-4xl uppercase tracking-widest text-white leading-snug">
            {title}
          </h2>
          <p className="text-sm text-white/80 leading-relaxed max-w-sm">
            {description[0]}
          </p>
          <div className="w-full h-[300px] relative rounded-xl overflow-hidden">
            <Image src={images[0]} alt={title} fill className="object-cover" />
          </div>
        </div>

        {/* RIGHT — Large Image */}
        <div className="w-full h-[600px] relative rounded-xl overflow-hidden">
          <Image src={images[1]} alt={title} fill className="object-cover" />
        </div>
       
       </div>
      </div>
    </Section>
  );
};

export default WeddingContent;