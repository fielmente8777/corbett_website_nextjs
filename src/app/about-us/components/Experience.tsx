import { SectionWithContainer } from "@/components/sectionComponants";
import Image from "next/image";

interface ExperienceProps {
  title: string;
  description: string[];
  images: string[];
}

const Experience: React.FC<ExperienceProps> = ({
  title,
  description,
  images,
}) => {
  return (
    <SectionWithContainer sectionClassName="bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="relative lg:block hidden w-full aspect-square rounded-3xl border border-secondary overflow-hidden">
          <Image src={images[0]} alt={title} fill className="object-cover " />
        </div>
        <div className="border border-secondary rounded-3xl overflow-hidden lg:px-16 lg:py-14 px-4 py-8 ">
          <h2 className="md:text-4xl text-2xl font-primary mb-4">{title}</h2>
          <div className="lg:hidden block w-full aspect-square relative rounded-2xl overflow-hidden mb-4">
            <Image src={images[0]} alt={title} fill className="object-cover " />
          </div>
          <div className="space-y-4">
            {description.map((item, index) => (
              <p className="md:text-lg text-light" key={index}>
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </SectionWithContainer>
  );
};

export default Experience;
