"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { SectionWithContainer } from "@/components/sectionComponants";

// 🔹 Define types
type GalleryImage = {
  src: string;
  alt: string;
};

type Props = {
  galleryImages: GalleryImage[];
};

export default function Gallery({ galleryImages }: Props) {
  const [selected, setSelected] = useState<string>("All");

  // 🔹 categories generate from data
  const categories = useMemo<string[]>(
    () => ["All", ...new Set(galleryImages.map((img) => img.alt))],
    [galleryImages]
  );

  // 🔹 filtering logic
  const filtered: GalleryImage[] =
    selected === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.alt === selected);

  const gridPattern: string[] = [
    "col-span-4 row-span-4",
    "col-span-2 row-span-2",
    "col-span-2 row-span-2",
    "col-span-2 row-span-2",
    "col-span-4 row-span-4",
    "col-span-2 row-span-2",
  ];

  return (
    <SectionWithContainer
      defaultPadding={false}
      sectionClassName="py-6"
      containerClassName="flex flex-col"
    >
      {/* FILTER BUTTONS */}
      <div className="gallery-tabs mb-6 flex flex-wrap gap-3 justify-center">
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => setSelected(cat)}
            className={selected === cat ? "active" : ""}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-6 auto-rows-[9rem] gap-2">
        {filtered.map((img, index) => (
          <div
            key={index}
            className={`relative w-full h-full aspect-auto ${
              gridPattern[index % gridPattern.length]
            }`}
          >
            <Image src={img.src} alt={img.alt} fill className="object-cover" />
          </div>
        ))}
      </div>
    </SectionWithContainer>
  );
}
