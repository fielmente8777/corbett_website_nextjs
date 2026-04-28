export interface CuratedProps {
  title: string;
  description: string[];
  images: string[];
}

export interface FaqProps {
  title: string;
  img: string;
  items: {
    question: string;
    answer: string;
  }[];
}


export interface VenueProps {
  title: string;
  description: string[];
  images: string[];
  link: {
    label: string;
    href: string;
  };
}