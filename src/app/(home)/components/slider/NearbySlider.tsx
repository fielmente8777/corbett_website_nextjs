"use client";
import { NearbyProps } from "@/@types/@types";
import SwiperCarousel from "@/components/slider/SwiperCarousel";
import { Autoplay, Navigation } from "swiper/modules";
import NearByCard from "../cards/NearByCard";

const NearbySlider: React.FC<{ items: NearbyProps["items"] }> = ({ items }) => {
  return (
    <div className="room-card">
      <SwiperCarousel
        data={items || []}
        slidesPerView={1}
        spaceBetween={2}
        modules={[Navigation, Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        speed={1000}
        loop
        navigation={true}
        breakpoints={{
            768: {
                slidesPerView: 2
            },
            1024: {
                slidesPerView: 3
            },
            1280: {
                slidesPerView: 3
            }
        }}
        className="w-full"
        renderSlide={(src) => <NearByCard {...src} />}
      />
    </div>
  );
};

export default NearbySlider;
