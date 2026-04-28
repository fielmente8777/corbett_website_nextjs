"use client";
import SwiperCarousel from "@/components/slider/SwiperCarousel";
import { VenueProps } from "./types";
import { Autoplay } from "swiper/modules";

const ContentSlider: React.FC<{ d: VenueProps["description"]}> = ({d}) => {
  return (
    <div className="w-full">
        <SwiperCarousel
          data={d}
          slidesPerView={1}
          spaceBetween={16}
          modules={[Autoplay]}
          loop
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          speed={900}
          renderSlide={(item) => (
            <div>
              <p className="md:text-[1.125rem] text-center">{item}</p>
            </div>
          )}
        />
    </div>
  );
};

export default ContentSlider;
