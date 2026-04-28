"use client";
import ImageSlider from "@/components/Banner/ImageSlider";
import LinkButton from "@/components/buttons/LinkButton";
import { SectionWithContainer } from "@/components/sectionComponants";
import SwiperCarousel from "@/components/slider/SwiperCarousel";
import { SectionHeading } from "@/components/typography";
import Image from "next/image";
import { JSX } from "react";
import { EffectFade, Navigation } from "swiper/modules";

interface ExperiencesProps {
  title: string;
  items: {
    title: string;
    description: string;
    images: string[];
    icon: JSX.Element;
  }[];
  link: {
    label: string;
    href: string;
  };
}

const Experiences: React.FC<ExperiencesProps> = ({ title, items, link }) => {
  return (
    <SectionWithContainer sectionClassName="border-b border-secondary exp-section">
      <SwiperCarousel
        data={items}
        slidesPerView={1}
        spaceBetween={2}
        modules={[Navigation, EffectFade]}
        navigation={{
          nextEl: ".exp-next",
          prevEl: ".exp-prev",
        }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={true}
        speed={800}
        renderSlide={(item) => (
          <div className="w-full">
            <div className="grid relative md:grid-cols-[1fr_2fr] grid-cols-1 items-center md:gap-18 gap-4">
              <div className="flex flex-col max-w-100 gap-4 items-center justify-center text-center">
                <SectionHeading
                  title={title}
                  textCenter
                  titleClassName="max-md:text-3xl"
                  wrapperClassName="md:max-w-[300px]"
                />
                <div className="lg:hidden block">
                  <ImageSlider images={item.images} />
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="">{item.icon}</div>
                    <p className="text-3xl font-primary">{item.title}</p>
                  </div>
                  <div className="flex flex-col gap-4 items-center justify-center">
                    <p className="text-light md:text-lg">{item.description}</p>
                    <LinkButton
                      label={link.label}
                      href={link.href}
                      className="w-fit! text-secondary rounded-lg "
                    />
                  </div>
                </div>
              </div>
              <div className="lg:grid hidden grid-cols-[1.2fr_1fr] gap-6">
                <div className="relative w-full aspect-4/5.75 overflow-hidden rounded-t-full">
                  <Image
                    src={item.images[0]}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
                <div className="relative w-full aspect-[4/4.7] mt-auto overflow-hidden rounded-b-full">
                  <Image
                    src={item.images[1]}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
              </div>
              <div className="absolute lg:right-0.5 lg:w-[63%] max-lg:inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between z-20">
                <button className="exp-prev w-10 aspect-square rounded-full flex items-center justify-center box-shadow bg-white cursor-pointer">
                  <BtnPrev />
                </button>
                <button className="exp-next w-10 aspect-square rounded-full flex items-center justify-center box-shadow bg-white cursor-pointer">
                  <BtnNext />
                </button>
              </div>
            </div>
          </div>
        )}
      />
    </SectionWithContainer>
  );
};

export default Experiences;

export const BtnNext = () => (
  <svg
    width={8}
    height={16}
    viewBox="0 0 8 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.02538 16L0 14.8239L5.94925 8L0 1.17612L1.02538 0L8 8L1.02538 16Z"
      fill="#29422C"
    />
  </svg>
);

export const BtnPrev = () => (
  <svg
    width={8}
    height={16}
    viewBox="0 0 8 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.97462 16L8 14.8239L2.05075 8L8 1.17612L6.97462 0L0 8L6.97462 16Z"
      fill="#29422C"
    />
  </svg>
);
