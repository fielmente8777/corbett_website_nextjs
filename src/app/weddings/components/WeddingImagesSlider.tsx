"use client";
import SwiperCarousel from "@/components/slider/SwiperCarousel";
import Image from "next/image";
import { Autoplay, EffectFade } from "swiper/modules";

const WeddingImagesSlider: React.FC<{
  images: string[];
  classname?: string;
}> = ({ images, classname }) => {
  return (
    <div className={`w-full lg:hidden block ${classname}`}>
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
          <div className="w-full relative aspect-4/5 rounded-3xl overflow-hidden">
            <Image src={src} alt="" fill className="object-cover" />
          </div>
        )}
      />
    </div>
  );
};

export default WeddingImagesSlider;
