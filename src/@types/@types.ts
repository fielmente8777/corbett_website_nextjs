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
    rating: string;
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

export interface introProps {
  title: string;
  description: string[];
  image: string;
  video: {
    src: string;
    poster: string;
  };
  link: {
    label: string;
    href: string;
  };
}

export interface NearbyProps {
  title: string;
  description: string;
  items: {
    title: string;
    image: string;
  }[];
}


export interface BannerWithVideoProps {
    title: string;
    subtitle: string;
    description: string;
    SocialLinks: {
        label: string;
        href: string;
        icon: JSX.Element;
    }[];
    video: string;
    images: string[];
    actions: {
        label: string;
        href: string;
    }[];
    note: string;
}