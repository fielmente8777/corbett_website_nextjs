import { AboutUsBannerProps } from "@/@types/@types";
import {
  Container,
  SectionWithContainer,
} from "@/components/sectionComponants";
import Image from "next/image";
import Section from "../../../components/sectionComponants/Section";
import WeddingImagesSlider from "@/app/weddings/components/WeddingImagesSlider";

const Banner: React.FC<AboutUsBannerProps> = ({
  title,
  description,
  images,
  subtitle,
}) => {
  return (
    <Section className="bg-background lg:space-y-14 space-y-10">
      <Container>
        <div className="space-y-4 text-center">
          <p className="text-primary font-primary text-2xl">{title}</p>
          <h1 className="xl:text-7xl md:text-4xl text-3xl font-primary text-primary">
            {subtitle}
          </h1>
          <WeddingImagesSlider images={images} classname="md:hidden" />
          <p className="text-light lg:text-lg">{description}</p>
        </div>
      </Container>
      <div className="md:grid hidden grid-cols-5 gap-2">
        {images?.map((src, index) => (
          <div
            className="flex items-center justify-center w-full h-full"
            key={index}
          >
            <div
              className={`overflow-hidden rounded-xs hover:border-4  w-full border-white hover:shadow-3xl duration-1000 transition ease-in-out relative  ${index % 2 === 0 ? "aspect-4/6" : "aspect-4/5"}`}
            >
              <Image
                src={src}
                alt="view"
                priority={true}
                fill
                className="w-full h-full object-cover hover:scale-110 duration-1000 transition ease-linear"
              />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Banner;
