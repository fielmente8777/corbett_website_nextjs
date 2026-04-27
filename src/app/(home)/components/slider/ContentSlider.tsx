"use client";

import SwiperCarousel from "@/components/slider/SwiperCarousel";
import { Autoplay } from "swiper/modules";

interface ContentSliderProps {
  testimonials: {
    name: string;
    location: string;
    text: string;
    image: string;
  }[];
}
const ContentSlider: React.FC<ContentSliderProps> = ({ testimonials }) => {
  return (
    <div className="w-full lg:mt-8">
      <SwiperCarousel
        data={testimonials}
        slidesPerView={1}
        spaceBetween={16}
        modules={[Autoplay]}
        loop
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        speed={900}
        renderSlide={(card) => (
          <div className="flex flex-col gap-2">
            <p className="text-[1.125rem]">{card.text}</p>
            <p className="text-[1.375rem] font-bold">{card.name}</p>
          </div>
        )}
      />
    </div>
  );
};

export default ContentSlider;
