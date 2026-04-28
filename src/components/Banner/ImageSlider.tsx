import Image from "next/image";
import SwiperCarousel from "../slider/SwiperCarousel";
import { Autoplay, EffectFade } from "swiper/modules";

const ImageSlider: React.FC<{ images: string[] }> = ({ images }) => {
  return (
    <>
      <SwiperCarousel
        data={images}
        slidesPerView={1}
        spaceBetween={0}
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        speed={900}
        className="w-full h-full    aspect-auto"
        renderSlide={(src) => (
          <div className="relative w-full aspect-4/5 rounded-t-full overflow-hidden">
            <Image src={src} alt="" fill className="object-cover" />
          </div>
        )}
      />
    </>
  );
};

export default ImageSlider;
