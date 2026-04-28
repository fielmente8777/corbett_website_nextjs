import { introProps } from "@/@types/@types";
import { CtaBtn } from "@/components/buttons/CtaBtn";
import { SectionWithContainer } from "@/components/sectionComponants";
import { SectionHeading } from "@/components/typography";
import { LazyLoadedVideo } from "@/components/Video";
import Image from "next/image";

const Intro: React.FC<introProps> = ({
  title,
  description,
  image,
  video,
  link,
}) => {
  return (
    <SectionWithContainer>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] items-center gap-6">
        <div className="flex flex-col gap-6">
          <SectionHeading title={title} />
          <div className="relative w-full lg:hidden block aspect-4/3.75 rounded-3xl overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          {description.map((item, index) => (
            <p key={index} className="text-light md:text-lg">
              {item}
            </p>
          ))}
          <div className="w-full lg:hidden block rounded-3xl overflow-hidden relative aspect-4/6.5">
              <LazyLoadedVideo src={video.src} poster={video.poster} muted />
            </div>
          <CtaBtn
            type="link"
            label={link.label}
            href={link.href}
            icon="arrow"
            iconClass="bg-transparent! text-secondary"
            className="w-fit text-secondary rounded-lg"
          />
        </div>
        <div className="w-full lg:block hidden relative aspect-4/3.25">
          <div className="relative w-full max-w-[68%] aspect-4/3.75 rounded-3xl overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-full">
            <div className="max-w-[40%] w-full rounded-3xl overflow-hidden ml-auto relative aspect-4/6">
              <LazyLoadedVideo src={video.src} poster={video.poster} muted />
            </div>
          </div>
        </div>
      </div>
    </SectionWithContainer>
  );
};

export default Intro;
