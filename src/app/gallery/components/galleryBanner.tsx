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
        <h1>{title}</h1>
      </div>
    </SectionWithContainer>
  );
}