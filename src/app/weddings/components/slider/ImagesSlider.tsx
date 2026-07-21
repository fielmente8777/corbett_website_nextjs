"use client";
import SwiperCarousel from "@/components/slider/SwiperCarousel";
import Image from "next/image";
import { Autoplay, EffectFade } from "swiper/modules";

const ImagesSlider: React.FC<{ images: string[] }> = ({ images }) => {
  return (
    <div className="w-full block">
      <SwiperCarousel
        data={images}
        slidesPerView={1}
        spaceBetween={16}
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        speed={900}
        renderSlide={(src) => (
          <div className="relative w-full lg:max-w-[68%] aspect-4/3.75 rounded-3xl overflow-hidden">
            <Image src={src} alt="" fill className="object-cover" />
          </div>
        )}
      />
    </div>
  );
};

export default ImagesSlider;
