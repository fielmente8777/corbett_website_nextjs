"use client";

import { SectionWithContainer } from "@/components/sectionComponants";

type Props = {
  title: string;
};

export default function GalleryBanner({ title }: Props) {
  return (
    <SectionWithContainer
      sectionClassName="gallery-banner"
      containerClassName="text-center"
    >
      <div className="content-column">
        <h2>{title}</h2>
      </div>
    </SectionWithContainer>
  );
}