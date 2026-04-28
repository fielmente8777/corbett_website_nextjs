"use client";
import { RoomsTypesProps } from "@/@types/@types";
import { CtaBtn } from "@/components/buttons/CtaBtn";
import SwiperCarousel from "@/components/slider/SwiperCarousel";
import Image from "next/image";
import { Fragment } from "react/jsx-runtime";
import { FreeMode, Navigation } from "swiper/modules";

const RoomsCard: React.FC<RoomsTypesProps["rooms"][0] & { index: number }> = ({
  images,
  name,
  description,
  amenities,
  cta,
  index,
  details,
  rating,
}) => {
  return (
    <div className="w-full grid md:grid-cols-8 grid-cols-1 gap-6 items-center">
      <div
        className={`md:col-span-5 md:block hidden ${index % 2 === 0 ? "" : "md:order-2"} room-card`}
      >
        <SwiperCarousel
          data={images}
          slidesPerView={1}
          spaceBetween={16}
          modules={[Navigation, FreeMode]}
          freeMode={true}
          autoplay={{
            delay: 100,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          loop
          navigation={true}
          className="w-full"
          renderSlide={(src) => (
            <div className="w-full relative md:aspect-4/2.75 aspect-4/3">
              <Image
                src={src}
                alt="Image"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
          )}
        />
      </div>
      <div
        className={`md:col-span-3 lg:px-6 lg:py-8 py-6 px-4 border border-secondary box-shadow rounded-3xl bg-background overflow-hidden flex flex-col gap-4 ${index % 2 === 0 ? "" : "md:order-1"}`}
      >
        <div className="flex items-center justify-between gap-2">
          {/* room name */}
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-primary uppercase text-primary">
              {name}
            </h2>
            <ul className="flex items-center text-dark text-lg gap-2">
              {details.map((detail, index) => (
                <Fragment key={index}>
                  <li className="">{detail}</li>
                  {index < details.length - 1 && (
                    <span className="text-primary">|</span>
                  )}
                </Fragment>
              ))}
            </ul>
          </div>
          {/* rating */}
          <p
            key={index}
            className="text-white rounded-lg py-1 px-2 flex items-center gap-1.5  bg-[#00800A]"
          >
            <span>★</span>
            {rating}
          </p>
        </div>

        <div className="w-full md:hidden block room-card">
          <SwiperCarousel
            data={images}
            slidesPerView={1}
            spaceBetween={16}
            modules={[Navigation, FreeMode]}
            freeMode={true}
            autoplay={{
              delay: 100,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            loop
            navigation={true}
            className="w-full"
            renderSlide={(src) => (
              <div className="w-full relative md:aspect-4/2.75 aspect-4/3">
                <Image
                  src={src}
                  alt="Image"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
            )}
          />
        </div>
        <p className="md:text-[1.063rem] text-light">{description}</p>
        <ul className="grid md:grid-cols-2 bg-white grid-cols-1 gap-4 border border-secondary rounded-2xl p-4">
          {amenities.map((amenity, index) => (
            <li
              key={index}
              className="md:text-[1.063rem] text-light flex items-center gap-2"
            >
              <span>{amenity.icon}</span>
              {amenity.name}
            </li>
          ))}
        </ul>
        <CtaBtn
          type="link"
          target="_blank"
          rel="noopener noreferrer"
          icon="arrow"
          iconClass="bg-secondary! text-white"
          href={cta.href}
          label={cta.label}
          className="bg-secondary text-white w-full justify-center rounded-lg gap-6"
        />
      </div>
    </div>
  );
};

export default RoomsCard;
