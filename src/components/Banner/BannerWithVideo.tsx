"use client";

import { useEffect, useRef, useState } from "react";
import { BannerWithVideoProps } from "@/@types/@types";
import Image from "next/image";
import { Section } from "../sectionComponants";
import SwiperCarousel from "../slider/SwiperCarousel";
import { Navigation, Autoplay } from "swiper/modules";
import Link from "next/link";
import { LazyLoadedVideo } from "../Video";
import type { Swiper as SwiperType } from "swiper";

const BannerWithVideo: React.FC<BannerWithVideoProps> = ({
  images,
  actions,
  title,
  subtitle,
  description,
  SocialLinks,
  video,
}) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  /* ---------------- Swiper Control ---------------- */
  useEffect(() => {
    if (!swiperRef.current) return;

    if (isVideoOpen) {
      swiperRef.current.autoplay?.stop();
    } else {
      swiperRef.current.autoplay?.start();
    }
  }, [isVideoOpen]);

  // /* ---------------- Lock Scroll ---------------- */
  // useEffect(() => {
  //   document.body.style.overflow = isVideoOpen ? "hidden" : "";
  // }, [isVideoOpen]);

  return (
    <Section defaultPadding={false} className="md:px-6 px-4">
      <div className="relative w-full lg:aspect-[4/1.74] aspect-4/6 rounded-4xl overflow-hidden">

        {/* ---------------- Swiper ---------------- */}
        <SwiperCarousel
          data={images}
          slidesPerView={1}
          spaceBetween={0}
          modules={[Navigation, Autoplay]}
          loop
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          speed={900}
          className="w-full h-full"
          renderSlide={(src) => (
            <div className="relative w-full h-full">
              <Image src={src} alt="" fill className="object-cover" />
            </div>
          )}
        />

        {/* ---------------- VIDEO OVERLAY ---------------- */}
        {isVideoOpen && (
          <div className="absolute inset-0 z-30 bg-black">
            <LazyLoadedVideo
              src={video} 
              autoPlay
            />

            {/* Close Button */}
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-6 right-6 text-white text-3xl z-40"
            >
              ✕
            </button>
          </div>
        )}

        {/* ---------------- MAIN CONTENT ---------------- */}
        {!isVideoOpen && (
          <>
            {/* Center Content */}
            <div className="absolute inset-0 z-10 flex items-center justify-center max-sm:px-3">
              <div className="max-w-4xl w-full relative after:absolute after:bg-white/5 after:inset-x-0 after:-inset-y-4 after:-z-10 md:after:rounded-full after:rounded-2xl after:backdrop-blur-[2px]">
                <h1 className="text-4xl md:text-7xl font-primary text-center text-white">
                  {title}
                  {subtitle && <span className="block">{subtitle}</span>}
                </h1>

                <p className="mt-4 text-center md:text-lg text-white">
                  {description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 mt-4 md:max-w-90 max-w-fit mx-auto gap-4">

                  {/* PLAY VIDEO BUTTON */}
                  <button
                    onClick={() => setIsVideoOpen(true)}
                    className="px-4 py-3 border border-white text-white flex items-center justify-center gap-2 rounded-lg"
                  >
                    <VideoPlayButton />
                    {actions[0].label}
                  </button>

                  {/* SECOND BUTTON */}
                  <Link
                    href={actions[1].href}
                    className="px-4 py-3 border border-background bg-background text-secondary flex items-center justify-center gap-2 rounded-lg"
                  >
                    {actions[1].label}
                  </Link>
                </div>
              </div>
            </div>

            {/* Scroll */}
            <Link
              href="#explore"
              className="absolute lg:block hidden bottom-6 text-white left-1/2 -translate-x-1/2 z-20"
            >
              <span className="flex flex-col items-center gap-2">
                <span className="animate-bounce">
                  <ScrollToExplore />
                </span>
                scroll to explore
              </span>
            </Link>

            {/* Call Button */}
            <Link
              href={actions[2].href}
              target="_blank"
              rel="noreferrer"
              style={{ writingMode: "vertical-lr" }}
              className="absolute md:block hidden top-1/2 -translate-y-1/2 left-0 z-20 rotate-180 py-2 px-3 rounded-l-2xl bg-white"
            >
              {actions[2].label}
            </Link>

            {/* Social Links */}
            <ul className="md:flex hidden flex-col bg-white items-center  gap-4 px-2 py-3 absolute top-1/2 -translate-y-1/2 rounded-l-2xl right-0 z-20">
              {SocialLinks.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="flex items-center justify-center w-8 aspect-square"
                  >
                    {item.icon}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </Section>
  );
};

export default BannerWithVideo;

export const ScrollToExplore = () => (
  <svg
    width={30}
    height={46}
    viewBox="0 0 30 46"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <rect width={30} height="45.33" fill="url(#pattern0_2084_2400)" />
    <defs>
      <pattern
        id="pattern0_2084_2400"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <use
          xlinkHref="#image0_2084_2400"
          transform="scale(0.0222222 0.0147059)"
        />
      </pattern>
      <image
        id="image0_2084_2400"
        width={45}
        height={68}
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAABECAMAAAAiP0w6AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABXUExURUxpcf///////////////////////////////////////////////////////////////////////////////////////////////////////////////7+puwEAAAAcdFJOUwCg74A/MCDAEEDQv8/fYHDwUOCfkH9fj7BPr2/1sIGvAAABT0lEQVRIx+2W226DMBBE13Z9B0PCJUk7//+dtXMrpCFspT60EvMCso6WtY09Q3SXO3WxxlxVPJzoiUyHJR3cA+sOedQ23jyMa68CIIc5XAHC0HMZC8RJeS0RNC3Lt6jutZyEdfRKJqBy9zYsrcgFvF/eegS3RpNpoc5PQNO6PGSpKSCII1uKO8CwaI+aaLc+xav2uWOBhkn3uRULz6R3OFLNbLs0bglgwqRR/YAu6J+mdRdjp7l0KIfxyKUvZ3ejp2oLvOfSqtANe+ed9+4f/oMbvdEb/at08bTAygQ3mu+uKTtAj55JF4/32TN5ksW1W2Yr6XyRKkQWXSOVK7LFjgE31zu6gdSM5bvVFKjXQlvOl+rLTleqezmJas5CfryIjkNOuW628qjHBXbMoVw9hKZ99pr3YXybaxxiidrfdySFhbBu0/NvJiXsXEKlacOfpEssW8F9Q2cAAAAASUVORK5CYII="
      />
    </defs>
  </svg>
);

export const VideoPlayButton = () => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.5 15.5842V8.41616C9.50015 8.32648 9.52442 8.23848 9.57026 8.1614C9.61611 8.08432 9.68184 8.02099 9.76057 7.97804C9.83931 7.9351 9.92814 7.91412 10.0178 7.91731C10.1074 7.9205 10.1945 7.94773 10.27 7.99616L15.846 11.5792C15.9166 11.6244 15.9747 11.6867 16.0149 11.7602C16.0552 11.8338 16.0763 11.9163 16.0763 12.0002C16.0763 12.084 16.0552 12.1665 16.0149 12.2401C15.9747 12.3137 15.9166 12.3759 15.846 12.4212L10.27 16.0052C10.1945 16.0536 10.1074 16.0808 10.0178 16.084C9.92814 16.0872 9.83931 16.0662 9.76057 16.0233C9.68184 15.9803 9.61611 15.917 9.57026 15.8399C9.52442 15.7628 9.50015 15.6748 9.5 15.5852V15.5842Z"
      fill="white"
    />
    <path
      d="M1 12C1 5.925 5.925 1 12 1C18.075 1 23 5.925 23 12C23 18.075 18.075 23 12 23C5.925 23 1 18.075 1 12ZM12 2.5C9.48044 2.5 7.06408 3.50089 5.28249 5.28249C3.50089 7.06408 2.5 9.48044 2.5 12C2.5 14.5196 3.50089 16.9359 5.28249 18.7175C7.06408 20.4991 9.48044 21.5 12 21.5C14.5196 21.5 16.9359 20.4991 18.7175 18.7175C20.4991 16.9359 21.5 14.5196 21.5 12C21.5 9.48044 20.4991 7.06408 18.7175 5.28249C16.9359 3.50089 14.5196 2.5 12 2.5Z"
      fill="white"
    />
  </svg>
);
