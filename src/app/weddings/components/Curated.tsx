"use client";
import { SectionWithContainer } from "@/components/sectionComponants";
import { CuratedProps } from "./types";
import { SectionHeading } from "@/components/typography";
import Image from "next/image";
import WeddingImagesSlider from "./WeddingImagesSlider";
import SwiperCarousel from "@/components/slider/SwiperCarousel";
import { Autoplay, EffectFade } from "swiper/modules";
import { useRef } from "react";
import { Swiper as SwiperType } from "swiper";

const Curated: React.FC<CuratedProps> = ({ title, description, images }) => {
  const secondSwiperRef = useRef<SwiperType | null>(null);

  return (
    <SectionWithContainer sectionClassName="relative">
      <div className="absolute inset-0 bg-secondary -z-20" />
      <div className="grid lg:grid-cols-7 grid-cols-1 gap-6">
        <div className="flex flex-col gap-4 lg:col-span-3">
          <SectionHeading title={title} titleColor="white" />
          <WeddingImagesSlider images={images} />
          {description.map((item, index) => (
            <p className="text-white" key={index}>
              {item}
            </p>
          ))}
          <div className="w-full lg:block hidden">
            <SwiperCarousel
              data={images}
              slidesPerView={1}
              spaceBetween={20}
              modules={[Autoplay, EffectFade]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              speed={1000}
              loop={true}
              onSlideChange={(swiper) => {
                if (!secondSwiperRef.current) return;

                const nextIndex = (swiper.realIndex + 1) % images.length;

                secondSwiperRef.current.slideToLoop(nextIndex, 1000);
              }}
              renderSlide={(src) => (
                <div className="relative aspect-[4/2.35] overflow-hidden rounded-3xl">
                  <Image
                    src={src}
                    alt={src}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
              )}
            />
          </div>
        </div>
        <div className="w-full lg:block hidden lg:col-span-4">
          {/* <Image
            src={images[1]}
            alt={title}
            fill
            className="object-cover"
            sizes="100vw"
          /> */}
          <SwiperCarousel
            data={images}
            slidesPerView={1}
            spaceBetween={20}
            loop={true}
            modules={[Autoplay, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={1000}
            allowTouchMove={false}
            initialSlide={1}
            onSwiper={(swiper) => {
              secondSwiperRef.current = swiper;
            }}
            renderSlide={(src) => (
              <div className="aspect-[4/2.7] overflow-hidden rounded-3xl relative">
                <Image
                  src={src}
                  alt={src}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            )}
          />
        </div>
      </div>
    </SectionWithContainer>
  );
};

export default Curated;
