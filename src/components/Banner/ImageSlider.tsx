import { Navigation } from "swiper/modules";
import SwiperCarousel from "../slider/SwiperCarousel";
import Image from "next/image";

const ImageSlider: React.FC<{ images: string[] }> = ({ images }) => {
  return (
    <>
      <SwiperCarousel
        data={images}
        slidesPerView={1}
        spaceBetween={0}
        modules={[Navigation]}
        loop
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        speed={900}
        className="w-full h-full    aspect-auto"
        renderSlide={(src) => (
          <div className="relative w-full aspect-4/4.25">
            <Image src={src} alt="" fill className="object-cover" />
          </div>
        )}
      />
    </>
  );
};

export default ImageSlider;
