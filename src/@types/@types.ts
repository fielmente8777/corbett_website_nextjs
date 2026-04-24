import { JSX } from "react";

export type BtnType = "button" | "link";

export interface CtaBtnPropsType {
  label: string;
  href?: string;
  type: BtnType;
  target?: string;
}

export interface AboutUsBannerProps {
  title: string;
  subtitle: string;
  description: string[];
  images: string[];
}

export interface RoomsTypesProps {
  rooms: {
    images: string[];
    details: string[];
     rating: string,
    name: string;
    size: string;
    description: string;
    amenities: {
      name: string;
      icon: JSX.Element;
    }[];
    cta: {
      label: string;
      href: string;
    };
  }[];
}
