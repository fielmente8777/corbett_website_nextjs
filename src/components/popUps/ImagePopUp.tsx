"use client";

import { useWebContext } from "@/context-api/WebContext";
import Image from "next/image";
import { MdClose, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useState, useRef, useEffect } from "react";

const ZOOM_SCALE = 2;
const CLICK_THRESHOLD = 5;

const ImagePopUp = () => {
  const {
    isOpenImagePopup,
    setIsOpenImagePopup,
    imgCurrentIndex,
    imageArray,
    setImgCurrentIndex,
  } = useWebContext();

  const currentIndex = imgCurrentIndex ?? 0;
  const src =
    imageArray[currentIndex] ??
    "/WhatsApp-Image-2026-01-09-at-17.20.58.jpeg";

  const [isZoomed, setIsZoomed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const startPos = useRef({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });
  const dragDistance = useRef(0);
  const touchStart = useRef({ x: 0, y: 0 });

  // ================= ZOOM TOGGLE =================

  const toggleZoom = () => {
    setIsZoomed((prev) => !prev);
    setPosition({ x: 0, y: 0 });
  };

  // ================= DESKTOP =================

  const handleMouseDown = (e: React.MouseEvent) => {
    dragDistance.current = 0;

    startPos.current = {
      x: e.clientX,
      y: e.clientY,
    };

    lastPos.current = { ...position };

    if (isZoomed) setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;

    dragDistance.current = Math.hypot(dx, dy);

    if (!isDragging || !isZoomed) return;

    const maxX = (window.innerWidth * (ZOOM_SCALE - 1)) / 4;
    const maxY = (window.innerHeight * (ZOOM_SCALE - 1)) / 4;

    setPosition({
      x: Math.max(Math.min(lastPos.current.x + dx, maxX), -maxX),
      y: Math.max(Math.min(lastPos.current.y + dy, maxY), -maxY),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);

    // CLICK (not drag) → toggle zoom
    if (dragDistance.current < CLICK_THRESHOLD) {
      toggleZoom();
    }
  };

  // ================= TOUCH =================

  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];

    touchStart.current = { x: t.clientX, y: t.clientY };
    lastPos.current = { ...position };
    dragDistance.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const t = e.touches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;

    dragDistance.current = Math.hypot(dx, dy);

    if (!isZoomed) return;

    e.preventDefault();

    const maxX = (window.innerWidth * (ZOOM_SCALE - 1)) / 4;
    const maxY = (window.innerHeight * (ZOOM_SCALE - 1)) / 4;

    setPosition({
      x: Math.max(Math.min(lastPos.current.x + dx, maxX), -maxX),
      y: Math.max(Math.min(lastPos.current.y + dy, maxY), -maxY),
    });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    // TAP → toggle zoom
    if (dragDistance.current < CLICK_THRESHOLD) {
      toggleZoom();
      return;
    }

    // SWIPE (only when not zoomed)
    if (isZoomed) return;

    const deltaX =
      touchStart.current.x - e.changedTouches[0].clientX;

    if (deltaX > 50 && currentIndex < imageArray.length - 1) {
      setImgCurrentIndex(currentIndex + 1);
    }

    if (deltaX < -50 && currentIndex > 0) {
      setImgCurrentIndex(currentIndex - 1);
    }
  };

  // ================= NAV =================

  const handleNextImage = () => {
    if (currentIndex < imageArray.length - 1)
      setImgCurrentIndex(currentIndex + 1);
  };

  const handlePrevImage = () => {
    if (currentIndex > 0)
      setImgCurrentIndex(currentIndex - 1);
  };

  // ================= CLOSE =================

  const handleClose = () => {
    setIsOpenImagePopup(false);
    setImgCurrentIndex(0);
    setIsZoomed(false);
    setPosition({ x: 0, y: 0 });
  };

  // ================= SCROLL LOCK =================

  useEffect(() => {
    document.body.style.overflowY = isOpenImagePopup
      ? "hidden"
      : "unset";

    return () => {
      document.body.style.overflowY = "unset";
    };
  }, [isOpenImagePopup]);

  // ================= RENDER =================

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-all ${
        isOpenImagePopup
          ? "visible opacity-100"
          : "invisible opacity-0"
      }`}
    >
      <div className="relative w-full max-w-7xl flex justify-center">
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-20 text-4xl text-white"
        >
          <MdClose />
        </button>

        {/* Prev */}
        {currentIndex > 0 && (
          <button
            onClick={handlePrevImage}
            className="absolute left-4 top-1/2 hidden -translate-y-1/2 text-5xl text-white md:block"
          >
            <MdChevronLeft />
          </button>
        )}

        {/* Next */}
        {currentIndex < imageArray.length - 1 && (
          <button
            onClick={handleNextImage}
            className="absolute right-4 top-1/2 hidden -translate-y-1/2 text-5xl text-white md:block"
          >
            <MdChevronRight />
          </button>
        )}

        {/* Image */}
        <div
          className="relative w-full max-w-5xl aspect-[4/2.5] overflow-hidden touch-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => setIsDragging(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Image
            src={src}
            alt="Preview"
            fill
            priority
            draggable={false}
            className={`select-none transition-transform duration-300 ${
              isZoomed ? "cursor-grab object-cover" : "cursor-zoom-in object-contain"
            }`}
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${
                isZoomed ? ZOOM_SCALE : 1
              })`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ImagePopUp;
